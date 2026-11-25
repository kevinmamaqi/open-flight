# Flight Book services on Cloudflare Pages

The public workshop and offline kit include the free Flight Book and individual sheets. The bundled service configuration is inactive. Hosted checkout and metrics can be enabled independently on a configured HTTPS origin.

## Prepare the Pages build

1. The release build was verified with Node 24.18.0 and Bun 1.4.2. In the public source checkout, install the dependencies with `npm ci --ignore-scripts` and run `npm run build:cloudflare`. The publishable files go into `dist/cloudflare`.
2. The Cloudflare build places the [Functions route template](../public-release/flight-book-routes.json) at `dist/cloudflare/_routes.json`. This sends only the service configuration, event and confirmation endpoints through Pages Functions.
3. Use the public checkout as the Pages project root, with `npm run build:cloudflare` as the build command and `dist/cloudflare` as its output. Keep the [Functions source](../functions/_flight-book.js) and editor modules available to the bundler. If you choose Direct Upload, use Wrangler from the source checkout root so it bundles the Functions with the static folder. [Pages routing](https://developers.cloudflare.com/pages/functions/routing/) · [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)

The production workshop is hosted on Cloudflare Pages at openflight.design. The Git-connected project `openflight-design` watches `main` in `kevinmamaqi/open-flight`. Its root directory is `docs`, build command is `node ../scripts/prepare_pages.mjs` and output directory is `.pages-output`. It deploys the reviewed static release with each main-branch push. The apex and `www` are proxied CNAME records pointing to `openflight-design.pages.dev`. The `www` hostname redirects to the apex. [Public workshop](https://openflight.design/) · [Cloudflare Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/)

Older printed QR codes and shared bookmarks still work through the GitHub Pages copy. A link in the workshop footer opens that copy in the same browser to recover earlier saved models and book drafts. Browser storage is tied to the origin where the work was saved. New printed certificate links use the custom domain. [Open the earlier workshop](https://kevinmamaqi.github.io/open-flight/?previous=1)

For an offline compilation check, run `wrangler pages functions build --outdir /tmp/open-flight-functions` from the source root. Wrangler's generated routes should agree with the template above.

## Configure authorized services

| Pages binding | Value |
| --- | --- |
| `FLIGHT_BOOK_ORIGIN` | The one eligible HTTPS origin, without a trailing slash or path. Leave previews unconfigured unless they have separately authorized settings. |
| `FLIGHT_BOOK_LINKS` | A JSON object with any of `"3"`, `"5"`, `"10"` and `"other"`. Values are public hosted HTTPS checkout links. Each fixed amount must lead to a checkout for that exact EUR amount. Use `"other"` for a generic or flexible checkout. |
| `FLIGHT_BOOK_STRIPE_PAYMENT_LINKS` | Comma-separated Stripe Payment Link IDs from the project's account, in `plink_…` format. These identifiers are distinct from public checkout URLs. |
| `STRIPE_SECRET_KEY` | Optional Cloudflare secret. Use a restricted live Stripe key with read access to Checkout Sessions for return verification. |
| `FLIGHT_BOOK_METRICS` | Set to `true` to enable counters when D1 is also bound. |
| `FLIGHT_BOOK_DB` | Optional D1 binding. Apply [the metrics schema](../public-release/flight-book-metrics.sql) to the intended database before enabling metrics. |

After adding bindings, redeploy the Pages project. A Stripe Payment Link can redirect to `https://<eligible-origin>/book.html?paid={CHECKOUT_SESSION_ID}`. Use EUR checkout for these links. The confirmation handler retrieves the session and requires a completed, paid, live EUR payment for an allowlisted Payment Link. A flexible hosted link can be enabled separately without automatic return verification. [Pages bindings](https://developers.cloudflare.com/pages/functions/bindings/) · [Stripe Payment Link redirects](https://docs.stripe.com/payment-links/post-payment) · [Stripe Checkout Sessions](https://docs.stripe.com/api/checkout/sessions/object)

The public config endpoint exposes only the eligible origin, enabled public links and feature flags. D1 stores daily totals for home visits, book visits, downloads and verified paid returns. A SHA-256 digest of each verified Stripe session ID lets D1 count a repeated return once. The counters accept no user identifiers and collect no pilot names, URLs or cookies. Paid totals count verified returns that reached the site. Use Stripe for settlement, delayed payment and refund reconciliation.

## Verify and disable

Run `node --test tests/flight-book-services.test.js` for local fixture verification, including the SQLite schema. Check the deployed config on the eligible origin and a preview origin. Check free download with every optional binding absent, then check the configured amounts and Stripe return only after authorization for the relevant environment. Removing the links disables paid options. Removing `FLIGHT_BOOK_METRICS` stops new counter writes.
