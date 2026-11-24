const byId = (id) => document.getElementById(id);

export function mountBookReader({ readyPDF }) {
  const cover = byId("book-cover");
  const poster = byId("cover-poster");
  const coverCanvas = byId("cover-canvas");
  const picker = byId("reader-select");
  const stack = byId("reader-stack");
  const message = byId("reader-status");
  const pdfLink = byId("reader-pdf");
  const turn = byId("read-next");
  const surfaces = new Map();
  let session;
  let planKey;
  let selected = 1;
  let scrollFrame = 0;

  function syncPicker(number) {
    selected = number;
    picker.value = String(number);
    if (session?.href) pdfLink.href = `${session.href}#page=${number}`;
  }

  function goTo(number, { focus = true, address = true } = {}) {
    const target = surfaces.get(number)?.focus;
    if (!target) return;
    if (focus) target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start" });
    syncPicker(number);
    if (address) {
      const url = new URL(location.href);
      if (number === 1) url.searchParams.delete("p");
      else url.searchParams.set("p", String(number));
      history.replaceState(null, "", url);
    }
  }

  function watchReadingPosition() {
    scrollFrame = 0;
    let current;
    const line = Math.min(230, innerHeight / 3);
    for (const [number, { element }] of surfaces) {
      const bounds = element.getBoundingClientRect();
      if (bounds.top > line && current) break;
      if (bounds.bottom > 0) current = number;
    }
    if (current) syncPicker(current);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollFrame)
        scrollFrame = requestAnimationFrame(watchReadingPosition);
    },
    { passive: true },
  );
  picker.addEventListener("change", () => goTo(Number(picker.value)));
  turn.addEventListener("click", (event) => {
    event.preventDefault();
    goTo(2);
  });

  function makePage({ number, label, source }, ratio, copy) {
    const figure = document.createElement("figure");
    figure.className = "reader-page";
    figure.id = `book-page-${number}`;
    const caption = document.createElement("figcaption");
    const title = document.createElement("h3");
    title.className = "page-title";
    title.tabIndex = -1;
    title.textContent = `${number} · ${label}`;
    caption.append(title);
    const links = document.createElement("div");
    links.className = "page-links";
    const contents = document.createElement("a");
    contents.href = "#reader";
    contents.textContent = copy.pageMenu;
    contents.addEventListener("click", (event) => {
      event.preventDefault();
      goTo(1);
      picker.focus({ preventScroll: true });
    });
    const pdf = document.createElement("a");
    pdf.target = "_blank";
    pdf.rel = "noopener";
    pdf.hidden = true;
    pdf.textContent = copy.openPDF;
    links.append(pdf, contents);
    if (source) {
      const original = document.createElement("a");
      original.href = source;
      original.target = "_blank";
      original.rel = "noopener";
      original.textContent = copy.openSheet;
      links.append(original);
    }
    const element = document.createElement("div");
    element.className = "paper";
    element.style.setProperty("--page-ratio", ratio);
    const canvas = document.createElement("canvas");
    canvas.hidden = true;
    const loading = document.createElement("p");
    loading.className = "placeholder";
    loading.textContent = copy.loadingPage;
    element.append(canvas, loading);
    caption.append(links);
    figure.append(caption, element);
    surfaces.set(number, { element, canvas, focus: title, loading, pdf });
    return figure;
  }

  const observer = new IntersectionObserver(
    (items) => {
      for (const item of items) {
        const page = Number(item.target.dataset.page);
        const surface = surfaces.get(page);
        if (surface?.element !== item.target) continue;
        surface.near = item.isIntersecting;
        if (surface.near) {
          queuePage(session, page, surface);
        } else if (page !== 1) {
          surface.canvas.hidden = true;
          surface.canvas.width = surface.canvas.height = 1;
          surface.loading.hidden = false;
          surface.drawn = undefined;
        }
      }
    },
    { rootMargin: "900px 0px" },
  );

  function queuePage(current, number, surface) {
    if (
      !current ||
      current.failed ||
      surface.queued === current ||
      surface.drawn === current
    )
      return;
    surface.queued = current;
    current.queue = current.queue.then(async () => {
      try {
        if (current !== session || !surface.near) return;
        const doc = await current.doc;
        if (current !== session || !surface.near) return;
        const page = await doc.getPage(number);
        if (current !== session || !surface.near) return;
        const base = page.getViewport({ scale: 1 });
        const width = Math.min(
          1470,
          Math.ceil(
            surface.element.clientWidth * Math.min(devicePixelRatio, 2),
          ),
        );
        const viewport = page.getViewport({
          scale: Math.max(1.2, width / base.width),
        });
        const temp = document.createElement("canvas");
        temp.width = Math.ceil(viewport.width);
        temp.height = Math.ceil(viewport.height);
        await page.render({ canvas: temp, viewport }).promise;
        if (current !== session || !surface.near) return;
        const { canvas } = surface;
        canvas.width = temp.width;
        canvas.height = temp.height;
        canvas.getContext("2d").drawImage(temp, 0, 0);
        canvas.setAttribute("role", "img");
        canvas.setAttribute("aria-label", current.items[number - 1].label);
        canvas.hidden = false;
        surface.element.setAttribute("aria-busy", "false");
        surface.drawn = current;
        if (number === 1) poster.hidden = true;
        if (surface.loading) surface.loading.hidden = true;
        page.cleanup();
      } catch {
        if (current !== session) return;
        surface.element.setAttribute("aria-busy", "false");
        if (surface.loading)
          surface.loading.textContent = current.copy.peekError;
        message.textContent = current.copy.peekError;
        message.hidden = false;
      } finally {
        if (surface.queued === current) surface.queued = undefined;
      }
    });
  }

  let lastWidth;
  new ResizeObserver(([entry]) => {
    const width = Math.round(entry.contentRect.width);
    if (lastWidth !== undefined && width !== lastWidth && session) {
      for (const [number, surface] of surfaces) {
        if (!surface.near) continue;
        surface.drawn = undefined;
        queuePage(session, number, surface);
      }
    }
    lastWidth = width;
  }).observe(cover);

  function dispose() {
    if (!session) return;
    clearTimeout(session.timer);
    session.release?.();
    session.task?.destroy().catch(() => {});
    if (session.href) URL.revokeObjectURL(session.href);
  }

  function render(book, items, copy, { coverLabel, lazy } = {}) {
    const key = JSON.stringify(book);
    if (session?.key === key && !session.failed) return;
    const hadBook = Boolean(session);
    dispose();
    session = undefined;
    message.hidden = true;
    pdfLink.hidden = true;
    picker.disabled = !book;
    cover.hidden = !book;
    turn.hidden = !book;
    if (!book) {
      observer.disconnect();
      surfaces.clear();
      stack.replaceChildren();
      picker.replaceChildren(new Option(copy.coverPage, "1"));
      planKey = null;
      return;
    }

    const ratio = book.paper === "A4" ? "210 / 297" : "8.5 / 11";
    const structure = JSON.stringify([book.lang, book.paper, items]);
    const rebuild = planKey !== structure;
    if (rebuild) {
      planKey = structure;
      observer.disconnect();
      surfaces.clear();
      surfaces.set(1, {
        element: cover,
        focus: byId("reader"),
        canvas: coverCanvas,
        near: true,
      });
      const pages = items.slice(1).map((item) => makePage(item, ratio, copy));
      stack.replaceChildren(...pages);
      picker.replaceChildren(
        ...items.map(
          ({ number, label }) => new Option(`${number} · ${label}`, number),
        ),
      );
      cover.style.setProperty("--page-ratio", ratio);
      poster.src = `./assets/atlas/book-cover-${book.lang}.png`;
      for (const [number, { element }] of surfaces) {
        element.dataset.page = number;
        observer.observe(element);
      }
    }
    selected = Math.min(selected, items.length);
    syncPicker(selected);
    if (!hadBook) {
      coverCanvas.hidden = true;
      poster.hidden = false;
    }
    items = items.map((item) =>
      item.number === 1 ? { ...item, label: coverLabel } : item,
    );
    for (const { element, canvas, loading, pdf } of surfaces.values()) {
      element.setAttribute("aria-busy", "true");
      if (loading) {
        canvas.hidden = true;
        loading.textContent = copy.loadingPage;
        loading.hidden = false;
      }
      if (pdf) pdf.hidden = true;
    }

    const current = { key, items, copy, queue: Promise.resolve() };
    session = current;
    current.doc = (async () => {
      await new Promise((resolve) => {
        current.timer = setTimeout(resolve, lazy ? 200 : 0);
        current.release = resolve;
      });
      if (current !== session) return;
      const [file, pdfjs] = await Promise.all([
        readyPDF(book),
        import("./assets/book/pdf.min.mjs"),
      ]);
      if (current !== session) return;
      current.href = URL.createObjectURL(file);
      syncPicker(selected);
      pdfLink.hidden = false;
      for (const [number, { pdf }] of surfaces) {
        if (!pdf) continue;
        pdf.href = `${current.href}#page=${number}`;
        pdf.hidden = false;
      }
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "./assets/book/pdf.worker.min.mjs",
        import.meta.url,
      ).href;
      const data = new Uint8Array(await file.arrayBuffer());
      if (current !== session) return;
      current.task = pdfjs.getDocument({ data, isEvalSupported: false });
      return current.task.promise;
    })();
    current.doc.catch(() => {
      current.failed = true;
    });
    for (const [number, surface] of surfaces) {
      if (surface.near) queuePage(current, number, surface);
    }
  }

  return {
    render,
    goTo,
    get page() {
      return selected;
    },
  };
}
