var Qn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var mt=Qn(function($r){$r.byteLength=Rr;$r.toByteArray=Or;$r.fromByteArray=Ur;var ne=[],q=[],Lr=typeof Uint8Array<"u"?Uint8Array:Array,fn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(he=0,gn=fn.length;he<gn;++he)ne[he]=fn[he],q[fn.charCodeAt(he)]=he;var he,gn;q[45]=62;q[95]=63;function ht(t){var e=t.length;if(e%4>0)throw Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");if(n===-1)n=e;var r=n===e?0:4-n%4;return[n,r]}function Rr(t){var e=ht(t),n=e[0],r=e[1];return(n+r)*3/4-r}function Dr(t,e,n){return(e+n)*3/4-n}function Or(t){var e,n=ht(t),r=n[0],o=n[1],i=new Lr(Dr(t,r,o)),a=0,s=o>0?r-4:r,c;for(c=0;c<s;c+=4)e=q[t.charCodeAt(c)]<<18|q[t.charCodeAt(c+1)]<<12|q[t.charCodeAt(c+2)]<<6|q[t.charCodeAt(c+3)],i[a++]=e>>16&255,i[a++]=e>>8&255,i[a++]=e&255;if(o===2)e=q[t.charCodeAt(c)]<<2|q[t.charCodeAt(c+1)]>>4,i[a++]=e&255;if(o===1)e=q[t.charCodeAt(c)]<<10|q[t.charCodeAt(c+1)]<<4|q[t.charCodeAt(c+2)]>>2,i[a++]=e>>8&255,i[a++]=e&255;return i}function jr(t){return ne[t>>18&63]+ne[t>>12&63]+ne[t>>6&63]+ne[t&63]}function Nr(t,e,n){var r,o=[];for(var i=e;i<n;i+=3)r=(t[i]<<16&16711680)+(t[i+1]<<8&65280)+(t[i+2]&255),o.push(jr(r));return o.join("")}function Ur(t){var e,n=t.length,r=n%3,o=[],i=16383;for(var a=0,s=n-r;a<s;a+=i)o.push(Nr(t,a,a+i>s?s:a+i));if(r===1)e=t[n-1],o.push(ne[e>>2]+ne[e<<4&63]+"==");else if(r===2)e=(t[n-2]<<8)+t[n-1],o.push(ne[e>>10]+ne[e>>4&63]+ne[e<<2&63]+"=");return o.join("")}});var ft=Qn(function(Gr){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Gr.read=function(t,e,n,r,o){var i,a,s=o*8-r-1,c=(1<<s)-1,l=c>>1,d=-7,p=n?o-1:0,h=n?-1:1,u=t[e+p];p+=h,i=u&(1<<-d)-1,u>>=-d,d+=s;for(;d>0;i=i*256+t[e+p],p+=h,d-=8);a=i&(1<<-d)-1,i>>=-d,d+=r;for(;d>0;a=a*256+t[e+p],p+=h,d-=8);if(i===0)i=1-l;else if(i===c)return a?NaN:(u?-1:1)*(1/0);else a=a+Math.pow(2,r),i=i-l;return(u?-1:1)*a*Math.pow(2,i-r)};Gr.write=function(t,e,n,r,o,i){var a,s,c,l=i*8-o-1,d=(1<<l)-1,p=d>>1,h=o===23?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:i-1,f=r?1:-1,g=e<0||e===0&&1/e<0?1:0;if(e=Math.abs(e),isNaN(e)||e===1/0)s=isNaN(e)?1:0,a=d;else{if(a=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-a))<1)a--,c*=2;if(a+p>=1)e+=h/c;else e+=h*Math.pow(2,1-p);if(e*c>=2)a++,c/=2;if(a+p>=d)s=0,a=d;else if(a+p>=1)s=(e*c-1)*Math.pow(2,o),a=a+p;else s=e*Math.pow(2,p-1)*Math.pow(2,o),a=0}for(;o>=8;t[n+u]=s&255,u+=f,s/=256,o-=8);a=a<<o|s,l+=o;for(;l>0;t[n+u]=a&255,u+=f,a/=256,l-=8);t[n+u-f]|=g*128}});var vr=(t)=>t/4294967296|0,Mr=(t)=>t>>>0;function Zn(t,e,n,r){let o=vr(n),i=Mr(n);t.setUint32(e,r?i:o,r),t.setUint32(e+4,r?o:i,r)}function et(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in t&&t.BYTES_PER_ELEMENT===1}var pn=(t)=>t?`"${t}" `:"";function Br(t,e=""){if(typeof t!=="number")throw TypeError(pn(e)+"expected number, got "+typeof t);if(!Number.isSafeInteger(t)||t<0)throw RangeError(pn(e)+"expected integer >= 0, got "+t);return t}function ze(t,e,n=""){if(et(t)&&(e===void 0||t.length===e))return t;if(e!==void 0)Br(e,"length");let r=et(t),o=e!==void 0?` of length ${e}`:"",i=r?`length=${t.length}`:`type=${typeof t}`,a=pn(n)+"expected Uint8Array"+o+", got "+i;if(!r)throw TypeError(a);throw RangeError(a)}var Sr=(t,e)=>{if(t===null||typeof t!=="object"||Array.isArray(t))throw TypeError((e==="object"?"":`"${e}" `)+"expected object, got type="+typeof t)},nt=(t,e)=>{Sr(t,e);let n=Object.getPrototypeOf(t);if(n!==Object.prototype&&n!==null)throw TypeError(`"${e}" expected plain object`);if(Object.hasOwn(t,"__proto__"))throw TypeError(`"${e}.__proto__" is not allowed`)};function un(t,e=!0){if(t.destroyed)throw Error("hash was destroyed");if(e&&t.finished)throw Error("digest() was already called")}function tt(t,e){ze(t,void 0,"output");let n=e.outputLen;if(!(t.length>=n))throw RangeError('"output" expected length >= '+n)}function hn(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function Ge(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function J(t,e){return t<<32-e|t>>>e}var Pr=(()=>typeof Uint8Array.from([]).toHex==="function"&&typeof Uint8Array.fromHex==="function")(),Ir=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function rt(t){if(ze(t),Pr)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=Ir[t[n]];return e}function Tr(t,e,n="opts"){if(nt(t,"defaults"),e!==void 0)nt(e,n);return Object.assign(Object.create(null),t,e)}function ot(t,e={}){if(typeof t!=="function")throw TypeError('"hashCons" expected function, got type='+typeof t);e=Tr({},e,"info");let n=(o,i)=>t(i).update(o).digest(),r=t(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=(o)=>t(o),Object.assign(n,e),Object.freeze(n)}var it=(t)=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,t])});function at(t,e,n){return t&e^~t&n}function st(t,e,n){return t&e^t&n^e&n}class mn{blockLen;outputLen;canXOF=!1;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(t,e,n,r){this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=r,this.buffer=new Uint8Array(t),this.view=Ge(this.buffer)}update(t){un(this),ze(t);let{view:e,buffer:n,blockLen:r}=this,o=t.length,i=!1;for(let a=0;a<o;){let s=Math.min(r-this.pos,o-a);if(s===r){let c=Ge(t);for(;r<=o-a;a+=r)this.process(c,a);i=!0;continue}if(n.set(a===0&&s===o?t:t.subarray(a,a+s),this.pos),this.pos+=s,a+=s,this.pos===r)this.process(e,0),this.pos=0,i=!0}if(this.length+=t.length,i)this.roundClean();return this}digestInto(t){un(this),tt(t,this),this.finished=!0;let{buffer:e,view:n,blockLen:r,isLE:o}=this,{pos:i}=this;if(e[i++]=128,e.fill(0,i),this.padOffset>r-i)this.process(n,0),e.fill(0);Zn(n,r-8,this.length*8,o),this.process(n,0),this.roundClean();let a=t===e?n:Ge(t),s=this.outputLen,c=s/4,l=this.get();if(s%4||c>l.length)throw Error("invalid outputLen");for(let d=0;d<c;d++)a.setUint32(4*d,l[d],o)}digest(){let{buffer:t,outputLen:e}=this;this.digestInto(t);let n=t.slice(0,e);return this.destroy(),n}_cloneIntoMeta(t){let{buffer:e,length:n,finished:r,destroyed:o,pos:i}=this;if(t.destroyed=o,t.finished=r,t.length=n,t.pos=i,i)t.buffer.set(e);return t}clone(){return this._cloneInto()}}var lt=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var Cr=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),ue=new Uint32Array(64);class ct extends mn{A=0;B=0;C=0;D=0;E=0;F=0;G=0;H=0;constructor(t,e){super(64,t,8,!1);this.A=e[0]|0,this.B=e[1]|0,this.C=e[2]|0,this.D=e[3]|0,this.E=e[4]|0,this.F=e[5]|0,this.G=e[6]|0,this.H=e[7]|0}get(){let{A:t,B:e,C:n,D:r,E:o,F:i,G:a,H:s}=this;return[t,e,n,r,o,i,a,s]}set(t,e,n,r,o,i,a,s){this.A=t|0,this.B=e|0,this.C=n|0,this.D=r|0,this.E=o|0,this.F=i|0,this.G=a|0,this.H=s|0}_cloneInto(t){return(t||=new this.constructor).set(...this.get()),this._cloneIntoMeta(t)}process(t,e){for(let d=0;d<16;d++,e+=4)ue[d]=t.getUint32(e,!1);for(let d=16;d<64;d++){let p=ue[d-15],h=ue[d-2],u=J(p,7)^J(p,18)^p>>>3,f=J(h,17)^J(h,19)^h>>>10;ue[d]=f+ue[d-7]+u+ue[d-16]|0}let{A:n,B:r,C:o,D:i,E:a,F:s,G:c,H:l}=this;for(let d=0;d<64;d++){let p=J(a,6)^J(a,11)^J(a,25),h=l+p+at(a,s,c)+Cr[d]+ue[d]|0,f=(J(n,2)^J(n,13)^J(n,22))+st(n,r,o)|0;l=c,c=s,s=a,a=i+h|0,i=o,o=r,r=n,n=h+f|0}n=n+this.A|0,r=r+this.B|0,o=o+this.C|0,i=i+this.D|0,a=a+this.E|0,s=s+this.F|0,c=c+this.G|0,l=l+this.H|0,this.set(n,r,o,i,a,s,c,l)}roundClean(){hn(ue)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),hn(this.buffer)}}class dt extends ct{constructor(){super(32,lt)}}var pt=ot(()=>new dt,it(1));function ut(){let t=pt.create();return{update(e){return t.update(typeof e==="string"?new TextEncoder().encode(e):e),this},digest(){return rt(t.digest())}}}/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var bn=mt(),Ae=ft(),gt=typeof Symbol==="function"&&typeof Symbol.for==="function"?Symbol.for("nodejs.util.inspect.custom"):null;var Q=m;var Tt=50;var yn=2147483647;m.TYPED_ARRAY_SUPPORT=Vr();if(!m.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error==="function")console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function Vr(){try{let t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),t.foo()===42}catch(t){return!1}}Object.defineProperty(m.prototype,"parent",{enumerable:!0,get:function(){if(!m.isBuffer(this))return;return this.buffer}});Object.defineProperty(m.prototype,"offset",{enumerable:!0,get:function(){if(!m.isBuffer(this))return;return this.byteOffset}});function le(t){if(t>yn)throw RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,m.prototype),e}function m(t,e,n){if(typeof t==="number"){if(typeof e==="string")throw TypeError('The "string" argument must be of type string. Received type number');return Fn(t)}return xt(t,e,n)}m.poolSize=8192;function xt(t,e,n){if(typeof t==="string")return Xr(t,e);if(ArrayBuffer.isView(t))return Jr(t);if(t==null)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(te(t,ArrayBuffer)||t&&te(t.buffer,ArrayBuffer))return xn(t,e,n);if(typeof SharedArrayBuffer<"u"&&(te(t,SharedArrayBuffer)||t&&te(t.buffer,SharedArrayBuffer)))return xn(t,e,n);if(typeof t==="number")throw TypeError('The "value" argument must not be of type number. Received type number');let r=t.valueOf&&t.valueOf();if(r!=null&&r!==t)return m.from(r,e,n);let o=Qr(t);if(o)return o;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]==="function")return m.from(t[Symbol.toPrimitive]("string"),e,n);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}m.from=function(t,e,n){return xt(t,e,n)};Object.setPrototypeOf(m.prototype,Uint8Array.prototype);Object.setPrototypeOf(m,Uint8Array);function _t(t){if(typeof t!=="number")throw TypeError('"size" argument must be of type number');else if(t<0)throw RangeError('The value "'+t+'" is invalid for option "size"')}function Kr(t,e,n){if(_t(t),t<=0)return le(t);if(e!==void 0)return typeof n==="string"?le(t).fill(e,n):le(t).fill(e);return le(t)}m.alloc=function(t,e,n){return Kr(t,e,n)};function Fn(t){return _t(t),le(t<0?0:kn(t)|0)}m.allocUnsafe=function(t){return Fn(t)};m.allocUnsafeSlow=function(t){return Fn(t)};function Xr(t,e){if(typeof e!=="string"||e==="")e="utf8";if(!m.isEncoding(e))throw TypeError("Unknown encoding: "+e);let n=Ft(t,e)|0,r=le(n),o=r.write(t,e);if(o!==n)r=r.slice(0,o);return r}function wn(t){let e=t.length<0?0:kn(t.length)|0,n=le(e);for(let r=0;r<e;r+=1)n[r]=t[r]&255;return n}function Jr(t){if(te(t,Uint8Array)){let e=new Uint8Array(t);return xn(e.buffer,e.byteOffset,e.byteLength)}return wn(t)}function xn(t,e,n){if(e<0||t.byteLength<e)throw RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw RangeError('"length" is outside of buffer bounds');let r;if(e===void 0&&n===void 0)r=new Uint8Array(t);else if(n===void 0)r=new Uint8Array(t,e);else r=new Uint8Array(t,e,n);return Object.setPrototypeOf(r,m.prototype),r}function Qr(t){if(m.isBuffer(t)){let e=kn(t.length)|0,n=le(e);if(n.length===0)return n;return t.copy(n,0,0,e),n}if(t.length!==void 0){if(typeof t.length!=="number"||An(t.length))return le(0);return wn(t)}if(t.type==="Buffer"&&Array.isArray(t.data))return wn(t.data)}function kn(t){if(t>=yn)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+yn.toString(16)+" bytes");return t|0}m.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==m.prototype};m.compare=function(e,n){if(te(e,Uint8Array))e=m.from(e,e.offset,e.byteLength);if(te(n,Uint8Array))n=m.from(n,n.offset,n.byteLength);if(!m.isBuffer(e)||!m.isBuffer(n))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===n)return 0;let r=e.length,o=n.length;for(let i=0,a=Math.min(r,o);i<a;++i)if(e[i]!==n[i]){r=e[i],o=n[i];break}if(r<o)return-1;if(o<r)return 1;return 0};m.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};m.concat=function(e,n){if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return m.alloc(0);let r;if(n===void 0){n=0;for(r=0;r<e.length;++r)n+=e[r].length}let o=m.allocUnsafe(n),i=0;for(r=0;r<e.length;++r){let a=e[r];if(te(a,Uint8Array))if(i+a.length>o.length){if(!m.isBuffer(a))a=m.from(a);a.copy(o,i)}else Uint8Array.prototype.set.call(o,a,i);else if(!m.isBuffer(a))throw TypeError('"list" argument must be an Array of Buffers');else a.copy(o,i);i+=a.length}return o};function Ft(t,e){if(m.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||te(t,ArrayBuffer))return t.byteLength;if(typeof t!=="string")throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let n=t.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&n===0)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return _n(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return It(t).length;default:if(o)return r?-1:_n(t).length;e=(""+e).toLowerCase(),o=!0}}m.byteLength=Ft;function Zr(t,e,n){let r=!1;if(e===void 0||e<0)e=0;if(e>this.length)return"";if(n===void 0||n>this.length)n=this.length;if(n<=0)return"";if(n>>>=0,e>>>=0,n<=e)return"";if(!t)t="utf8";while(!0)switch(t){case"hex":return co(this,e,n);case"utf8":case"utf-8":return Et(this,e,n);case"ascii":return so(this,e,n);case"latin1":case"binary":return lo(this,e,n);case"base64":return io(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return po(this,e,n);default:if(r)throw TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}m.prototype._isBuffer=!0;function be(t,e,n){let r=t[e];t[e]=t[n],t[n]=r}m.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<e;n+=2)be(this,n,n+1);return this};m.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<e;n+=4)be(this,n,n+3),be(this,n+1,n+2);return this};m.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<e;n+=8)be(this,n,n+7),be(this,n+1,n+6),be(this,n+2,n+5),be(this,n+3,n+4);return this};m.prototype.toString=function(){let e=this.length;if(e===0)return"";if(arguments.length===0)return Et(this,0,e);return Zr.apply(this,arguments)};m.prototype.toLocaleString=m.prototype.toString;m.prototype.equals=function(e){if(!m.isBuffer(e))throw TypeError("Argument must be a Buffer");if(this===e)return!0;return m.compare(this,e)===0};m.prototype.inspect=function(){let e="",n=Tt;if(e=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n)e+=" ... ";return"<Buffer "+e+">"};if(gt)m.prototype[gt]=m.prototype.inspect;m.prototype.compare=function(e,n,r,o,i){if(te(e,Uint8Array))e=m.from(e,e.offset,e.byteLength);if(!m.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(n===void 0)n=0;if(r===void 0)r=e?e.length:0;if(o===void 0)o=0;if(i===void 0)i=this.length;if(n<0||r>e.length||o<0||i>this.length)throw RangeError("out of range index");if(o>=i&&n>=r)return 0;if(o>=i)return-1;if(n>=r)return 1;if(n>>>=0,r>>>=0,o>>>=0,i>>>=0,this===e)return 0;let a=i-o,s=r-n,c=Math.min(a,s),l=this.slice(o,i),d=e.slice(n,r);for(let p=0;p<c;++p)if(l[p]!==d[p]){a=l[p],s=d[p];break}if(a<s)return-1;if(s<a)return 1;return 0};function kt(t,e,n,r,o){if(t.length===0)return-1;if(typeof n==="string")r=n,n=0;else if(n>2147483647)n=2147483647;else if(n<-2147483648)n=-2147483648;if(n=+n,An(n))n=o?0:t.length-1;if(n<0)n=t.length+n;if(n>=t.length)if(o)return-1;else n=t.length-1;else if(n<0)if(o)n=0;else return-1;if(typeof e==="string")e=m.from(e,r);if(m.isBuffer(e)){if(e.length===0)return-1;return bt(t,e,n,r,o)}else if(typeof e==="number"){if(e=e&255,typeof Uint8Array.prototype.indexOf==="function")if(o)return Uint8Array.prototype.indexOf.call(t,e,n);else return Uint8Array.prototype.lastIndexOf.call(t,e,n);return bt(t,[e],n,r,o)}throw TypeError("val must be string, number or Buffer")}function bt(t,e,n,r,o){let i=1,a=t.length,s=e.length;if(r!==void 0){if(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le"){if(t.length<2||e.length<2)return-1;i=2,a/=2,s/=2,n/=2}}function c(d,p){if(i===1)return d[p];else return d.readUInt16BE(p*i)}let l;if(o){let d=-1;for(l=n;l<a;l++)if(c(t,l)===c(e,d===-1?0:l-d)){if(d===-1)d=l;if(l-d+1===s)return d*i}else{if(d!==-1)l-=l-d;d=-1}}else{if(n+s>a)n=a-s;for(l=n;l>=0;l--){let d=!0;for(let p=0;p<s;p++)if(c(t,l+p)!==c(e,p)){d=!1;break}if(d)return l}}return-1}m.prototype.includes=function(e,n,r){return this.indexOf(e,n,r)!==-1};m.prototype.indexOf=function(e,n,r){return kt(this,e,n,r,!0)};m.prototype.lastIndexOf=function(e,n,r){return kt(this,e,n,r,!1)};function eo(t,e,n,r){n=Number(n)||0;let o=t.length-n;if(!r)r=o;else if(r=Number(r),r>o)r=o;let i=e.length;if(r>i/2)r=i/2;let a;for(a=0;a<r;++a){let s=parseInt(e.substr(a*2,2),16);if(An(s))return a;t[n+a]=s}return a}function no(t,e,n,r){return Ye(_n(e,t.length-n),t,n,r)}function to(t,e,n,r){return Ye(fo(e),t,n,r)}function ro(t,e,n,r){return Ye(It(e),t,n,r)}function oo(t,e,n,r){return Ye(go(e,t.length-n),t,n,r)}m.prototype.write=function(e,n,r,o){if(n===void 0)o="utf8",r=this.length,n=0;else if(r===void 0&&typeof n==="string")o=n,r=this.length,n=0;else if(isFinite(n))if(n=n>>>0,isFinite(r)){if(r=r>>>0,o===void 0)o="utf8"}else o=r,r=void 0;else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let i=this.length-n;if(r===void 0||r>i)r=i;if(e.length>0&&(r<0||n<0)||n>this.length)throw RangeError("Attempt to write outside buffer bounds");if(!o)o="utf8";let a=!1;for(;;)switch(o){case"hex":return eo(this,e,n,r);case"utf8":case"utf-8":return no(this,e,n,r);case"ascii":case"latin1":case"binary":return to(this,e,n,r);case"base64":return ro(this,e,n,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return oo(this,e,n,r);default:if(a)throw TypeError("Unknown encoding: "+o);o=(""+o).toLowerCase(),a=!0}};m.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function io(t,e,n){if(e===0&&n===t.length)return bn.fromByteArray(t);else return bn.fromByteArray(t.slice(e,n))}function Et(t,e,n){n=Math.min(t.length,n);let r=[],o=e;while(o<n){let i=t[o],a=null,s=i>239?4:i>223?3:i>191?2:1;if(o+s<=n){let c,l,d,p;switch(s){case 1:if(i<128)a=i;break;case 2:if(c=t[o+1],(c&192)===128){if(p=(i&31)<<6|c&63,p>127)a=p}break;case 3:if(c=t[o+1],l=t[o+2],(c&192)===128&&(l&192)===128){if(p=(i&15)<<12|(c&63)<<6|l&63,p>2047&&(p<55296||p>57343))a=p}break;case 4:if(c=t[o+1],l=t[o+2],d=t[o+3],(c&192)===128&&(l&192)===128&&(d&192)===128){if(p=(i&15)<<18|(c&63)<<12|(l&63)<<6|d&63,p>65535&&p<1114112)a=p}}}if(a===null)a=65533,s=1;else if(a>65535)a-=65536,r.push(a>>>10&1023|55296),a=56320|a&1023;r.push(a),o+=s}return ao(r)}var yt=4096;function ao(t){let e=t.length;if(e<=yt)return String.fromCharCode.apply(String,t);let n="",r=0;while(r<e)n+=String.fromCharCode.apply(String,t.slice(r,r+=yt));return n}function so(t,e,n){let r="";n=Math.min(t.length,n);for(let o=e;o<n;++o)r+=String.fromCharCode(t[o]&127);return r}function lo(t,e,n){let r="";n=Math.min(t.length,n);for(let o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function co(t,e,n){let r=t.length;if(!e||e<0)e=0;if(!n||n<0||n>r)n=r;let o="";for(let i=e;i<n;++i)o+=bo[t[i]];return o}function po(t,e,n){let r=t.slice(e,n),o="";for(let i=0;i<r.length-1;i+=2)o+=String.fromCharCode(r[i]+r[i+1]*256);return o}m.prototype.slice=function(e,n){let r=this.length;if(e=~~e,n=n===void 0?r:~~n,e<0){if(e+=r,e<0)e=0}else if(e>r)e=r;if(n<0){if(n+=r,n<0)n=0}else if(n>r)n=r;if(n<e)n=e;let o=this.subarray(e,n);return Object.setPrototypeOf(o,m.prototype),o};function S(t,e,n){if(t%1!==0||t<0)throw RangeError("offset is not uint");if(t+e>n)throw RangeError("Trying to access beyond buffer length")}m.prototype.readUintLE=m.prototype.readUIntLE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)S(e,n,this.length);let o=this[e],i=1,a=0;while(++a<n&&(i*=256))o+=this[e+a]*i;return o};m.prototype.readUintBE=m.prototype.readUIntBE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)S(e,n,this.length);let o=this[e+--n],i=1;while(n>0&&(i*=256))o+=this[e+--n]*i;return o};m.prototype.readUint8=m.prototype.readUInt8=function(e,n){if(e=e>>>0,!n)S(e,1,this.length);return this[e]};m.prototype.readUint16LE=m.prototype.readUInt16LE=function(e,n){if(e=e>>>0,!n)S(e,2,this.length);return this[e]|this[e+1]<<8};m.prototype.readUint16BE=m.prototype.readUInt16BE=function(e,n){if(e=e>>>0,!n)S(e,2,this.length);return this[e]<<8|this[e+1]};m.prototype.readUint32LE=m.prototype.readUInt32LE=function(e,n){if(e=e>>>0,!n)S(e,4,this.length);return(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};m.prototype.readUint32BE=m.prototype.readUInt32BE=function(e,n){if(e=e>>>0,!n)S(e,4,this.length);return this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};m.prototype.readBigUInt64LE=me(function(e){e=e>>>0,ve(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)Re(e,this.length-8);let o=n+this[++e]*256+this[++e]*65536+this[++e]*16777216,i=this[++e]+this[++e]*256+this[++e]*65536+r*16777216;return BigInt(o)+(BigInt(i)<<BigInt(32))});m.prototype.readBigUInt64BE=me(function(e){e=e>>>0,ve(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)Re(e,this.length-8);let o=n*16777216+this[++e]*65536+this[++e]*256+this[++e],i=this[++e]*16777216+this[++e]*65536+this[++e]*256+r;return(BigInt(o)<<BigInt(32))+BigInt(i)});m.prototype.readIntLE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)S(e,n,this.length);let o=this[e],i=1,a=0;while(++a<n&&(i*=256))o+=this[e+a]*i;if(i*=128,o>=i)o-=Math.pow(2,8*n);return o};m.prototype.readIntBE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)S(e,n,this.length);let o=n,i=1,a=this[e+--o];while(o>0&&(i*=256))a+=this[e+--o]*i;if(i*=128,a>=i)a-=Math.pow(2,8*n);return a};m.prototype.readInt8=function(e,n){if(e=e>>>0,!n)S(e,1,this.length);if(!(this[e]&128))return this[e];return(255-this[e]+1)*-1};m.prototype.readInt16LE=function(e,n){if(e=e>>>0,!n)S(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};m.prototype.readInt16BE=function(e,n){if(e=e>>>0,!n)S(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};m.prototype.readInt32LE=function(e,n){if(e=e>>>0,!n)S(e,4,this.length);return this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};m.prototype.readInt32BE=function(e,n){if(e=e>>>0,!n)S(e,4,this.length);return this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};m.prototype.readBigInt64LE=me(function(e){e=e>>>0,ve(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)Re(e,this.length-8);let o=this[e+4]+this[e+5]*256+this[e+6]*65536+(r<<24);return(BigInt(o)<<BigInt(32))+BigInt(n+this[++e]*256+this[++e]*65536+this[++e]*16777216)});m.prototype.readBigInt64BE=me(function(e){e=e>>>0,ve(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)Re(e,this.length-8);let o=(n<<24)+this[++e]*65536+this[++e]*256+this[++e];return(BigInt(o)<<BigInt(32))+BigInt(this[++e]*16777216+this[++e]*65536+this[++e]*256+r)});m.prototype.readFloatLE=function(e,n){if(e=e>>>0,!n)S(e,4,this.length);return Ae.read(this,e,!0,23,4)};m.prototype.readFloatBE=function(e,n){if(e=e>>>0,!n)S(e,4,this.length);return Ae.read(this,e,!1,23,4)};m.prototype.readDoubleLE=function(e,n){if(e=e>>>0,!n)S(e,8,this.length);return Ae.read(this,e,!0,52,8)};m.prototype.readDoubleBE=function(e,n){if(e=e>>>0,!n)S(e,8,this.length);return Ae.read(this,e,!1,52,8)};function D(t,e,n,r,o,i){if(!m.isBuffer(t))throw TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw RangeError('"value" argument is out of bounds');if(n+r>t.length)throw RangeError("Index out of range")}m.prototype.writeUintLE=m.prototype.writeUIntLE=function(e,n,r,o){if(e=+e,n=n>>>0,r=r>>>0,!o){let s=Math.pow(2,8*r)-1;D(this,e,n,r,s,0)}let i=1,a=0;this[n]=e&255;while(++a<r&&(i*=256))this[n+a]=e/i&255;return n+r};m.prototype.writeUintBE=m.prototype.writeUIntBE=function(e,n,r,o){if(e=+e,n=n>>>0,r=r>>>0,!o){let s=Math.pow(2,8*r)-1;D(this,e,n,r,s,0)}let i=r-1,a=1;this[n+i]=e&255;while(--i>=0&&(a*=256))this[n+i]=e/a&255;return n+r};m.prototype.writeUint8=m.prototype.writeUInt8=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,1,255,0);return this[n]=e&255,n+1};m.prototype.writeUint16LE=m.prototype.writeUInt16LE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,2,65535,0);return this[n]=e&255,this[n+1]=e>>>8,n+2};m.prototype.writeUint16BE=m.prototype.writeUInt16BE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,2,65535,0);return this[n]=e>>>8,this[n+1]=e&255,n+2};m.prototype.writeUint32LE=m.prototype.writeUInt32LE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,4,4294967295,0);return this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=e&255,n+4};m.prototype.writeUint32BE=m.prototype.writeUInt32BE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,4,4294967295,0);return this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};function At(t,e,n,r,o){Pt(e,r,o,t,n,7);let i=Number(e&BigInt(4294967295));t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i;let a=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=a,a=a>>8,t[n++]=a,a=a>>8,t[n++]=a,a=a>>8,t[n++]=a,n}function vt(t,e,n,r,o){Pt(e,r,o,t,n,7);let i=Number(e&BigInt(4294967295));t[n+7]=i,i=i>>8,t[n+6]=i,i=i>>8,t[n+5]=i,i=i>>8,t[n+4]=i;let a=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=a,a=a>>8,t[n+2]=a,a=a>>8,t[n+1]=a,a=a>>8,t[n]=a,n+8}m.prototype.writeBigUInt64LE=me(function(e,n=0){return At(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))});m.prototype.writeBigUInt64BE=me(function(e,n=0){return vt(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))});m.prototype.writeIntLE=function(e,n,r,o){if(e=+e,n=n>>>0,!o){let c=Math.pow(2,8*r-1);D(this,e,n,r,c-1,-c)}let i=0,a=1,s=0;this[n]=e&255;while(++i<r&&(a*=256)){if(e<0&&s===0&&this[n+i-1]!==0)s=1;this[n+i]=(e/a>>0)-s&255}return n+r};m.prototype.writeIntBE=function(e,n,r,o){if(e=+e,n=n>>>0,!o){let c=Math.pow(2,8*r-1);D(this,e,n,r,c-1,-c)}let i=r-1,a=1,s=0;this[n+i]=e&255;while(--i>=0&&(a*=256)){if(e<0&&s===0&&this[n+i+1]!==0)s=1;this[n+i]=(e/a>>0)-s&255}return n+r};m.prototype.writeInt8=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,1,127,-128);if(e<0)e=255+e+1;return this[n]=e&255,n+1};m.prototype.writeInt16LE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,2,32767,-32768);return this[n]=e&255,this[n+1]=e>>>8,n+2};m.prototype.writeInt16BE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,2,32767,-32768);return this[n]=e>>>8,this[n+1]=e&255,n+2};m.prototype.writeInt32LE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,4,2147483647,-2147483648);return this[n]=e&255,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24,n+4};m.prototype.writeInt32BE=function(e,n,r){if(e=+e,n=n>>>0,!r)D(this,e,n,4,2147483647,-2147483648);if(e<0)e=4294967295+e+1;return this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};m.prototype.writeBigInt64LE=me(function(e,n=0){return At(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});m.prototype.writeBigInt64BE=me(function(e,n=0){return vt(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function Mt(t,e,n,r,o,i){if(n+r>t.length)throw RangeError("Index out of range");if(n<0)throw RangeError("Index out of range")}function Bt(t,e,n,r,o){if(e=+e,n=n>>>0,!o)Mt(t,e,n,4,340282346638528860000000000000000000000,-340282346638528860000000000000000000000);return Ae.write(t,e,n,r,23,4),n+4}m.prototype.writeFloatLE=function(e,n,r){return Bt(this,e,n,!0,r)};m.prototype.writeFloatBE=function(e,n,r){return Bt(this,e,n,!1,r)};function St(t,e,n,r,o){if(e=+e,n=n>>>0,!o)Mt(t,e,n,8,179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,-179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);return Ae.write(t,e,n,r,52,8),n+8}m.prototype.writeDoubleLE=function(e,n,r){return St(this,e,n,!0,r)};m.prototype.writeDoubleBE=function(e,n,r){return St(this,e,n,!1,r)};m.prototype.copy=function(e,n,r,o){if(!m.isBuffer(e))throw TypeError("argument should be a Buffer");if(!r)r=0;if(!o&&o!==0)o=this.length;if(n>=e.length)n=e.length;if(!n)n=0;if(o>0&&o<r)o=r;if(o===r)return 0;if(e.length===0||this.length===0)return 0;if(n<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(o<0)throw RangeError("sourceEnd out of bounds");if(o>this.length)o=this.length;if(e.length-n<o-r)o=e.length-n+r;let i=o-r;if(this===e&&typeof Uint8Array.prototype.copyWithin==="function")this.copyWithin(n,r,o);else Uint8Array.prototype.set.call(e,this.subarray(r,o),n);return i};m.prototype.fill=function(e,n,r,o){if(typeof e==="string"){if(typeof n==="string")o=n,n=0,r=this.length;else if(typeof r==="string")o=r,r=this.length;if(o!==void 0&&typeof o!=="string")throw TypeError("encoding must be a string");if(typeof o==="string"&&!m.isEncoding(o))throw TypeError("Unknown encoding: "+o);if(e.length===1){let a=e.charCodeAt(0);if(o==="utf8"&&a<128||o==="latin1")e=a}}else if(typeof e==="number")e=e&255;else if(typeof e==="boolean")e=Number(e);if(n<0||this.length<n||this.length<r)throw RangeError("Out of range index");if(r<=n)return this;if(n=n>>>0,r=r===void 0?this.length:r>>>0,!e)e=0;let i;if(typeof e==="number")for(i=n;i<r;++i)this[i]=e;else{let a=m.isBuffer(e)?e:m.from(e,o),s=a.length;if(s===0)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-n;++i)this[i+n]=a[i%s]}return this};var Ee={};function En(t,e,n){Ee[t]=class extends n{constructor(){super();Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(o){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:o,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}En("ERR_BUFFER_OUT_OF_BOUNDS",function(t){if(t)return`${t} is outside of buffer bounds`;return"Attempt to access memory outside buffer bounds"},RangeError);En("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError);En("ERR_OUT_OF_RANGE",function(t,e,n){let r=`The value of "${t}" is out of range.`,o=n;if(Number.isInteger(n)&&Math.abs(n)>4294967296)o=wt(String(n));else if(typeof n==="bigint"){if(o=String(n),n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))o=wt(o);o+="n"}return r+=` It must be ${e}. Received ${o}`,r},RangeError);function wt(t){let e="",n=t.length,r=t[0]==="-"?1:0;for(;n>=r+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function uo(t,e,n){if(ve(e,"offset"),t[e]===void 0||t[e+n]===void 0)Re(e,t.length-(n+1))}function Pt(t,e,n,r,o,i){if(t>n||t<e){let a=typeof e==="bigint"?"n":"",s;if(i>3)if(e===0||e===BigInt(0))s=`>= 0${a} and < 2${a} ** ${(i+1)*8}${a}`;else s=`>= -(2${a} ** ${(i+1)*8-1}${a}) and < 2 ** ${(i+1)*8-1}${a}`;else s=`>= ${e}${a} and <= ${n}${a}`;throw new Ee.ERR_OUT_OF_RANGE("value",s,t)}uo(r,o,i)}function ve(t,e){if(typeof t!=="number")throw new Ee.ERR_INVALID_ARG_TYPE(e,"number",t)}function Re(t,e,n){if(Math.floor(t)!==t)throw ve(t,n),new Ee.ERR_OUT_OF_RANGE(n||"offset","an integer",t);if(e<0)throw new Ee.ERR_BUFFER_OUT_OF_BOUNDS;throw new Ee.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}var ho=/[^+/0-9A-Za-z-_]/g;function mo(t){if(t=t.split("=")[0],t=t.trim().replace(ho,""),t.length<2)return"";while(t.length%4!==0)t=t+"=";return t}function _n(t,e){e=e||1/0;let n,r=t.length,o=null,i=[];for(let a=0;a<r;++a){if(n=t.charCodeAt(a),n>55295&&n<57344){if(!o){if(n>56319){if((e-=3)>-1)i.push(239,191,189);continue}else if(a+1===r){if((e-=3)>-1)i.push(239,191,189);continue}o=n;continue}if(n<56320){if((e-=3)>-1)i.push(239,191,189);o=n;continue}n=(o-55296<<10|n-56320)+65536}else if(o){if((e-=3)>-1)i.push(239,191,189)}if(o=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,n&63|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw Error("Invalid code point")}return i}function fo(t){let e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n)&255);return e}function go(t,e){let n,r,o,i=[];for(let a=0;a<t.length;++a){if((e-=2)<0)break;n=t.charCodeAt(a),r=n>>8,o=n%256,i.push(o),i.push(r)}return i}function It(t){return bn.toByteArray(mo(t))}function Ye(t,e,n,r){let o;for(o=0;o<r;++o){if(o+n>=e.length||o>=t.length)break;e[o+n]=t[o]}return o}function te(t,e){return t instanceof e||t!=null&&t.constructor!=null&&t.constructor.name!=null&&t.constructor.name===e.name}function An(t){return t!==t}var bo=function(){let e=Array(256);for(let n=0;n<16;++n){let r=n*16;for(let o=0;o<16;++o)e[r+o]="0123456789abcdef"[n]+"0123456789abcdef"[o]}return e}();function me(t){return typeof BigInt>"u"?yo:t}function yo(){throw Error("BigInt not supported")}var vn={"/packages/geometry/butterfly.ts":`import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

export const model = JSON.parse(
  readFileSync(new URL('../../designs/butterfly-001/model.json', import.meta.url), 'utf8'),
)
export const sha256 = (bytes: string | Uint8Array) => createHash('sha256').update(bytes).digest('hex')
export function canonical(value: unknown): string {
  return JSON.stringify(value, (_key, part) => {
    if (part && typeof part === 'object' && !Array.isArray(part)) {
      return Object.fromEntries(
        Object.keys(part)
          .sort()
          .map((key) => [key, part[key]]),
      )
    }
    return part
  })
}
export const generator = 'butterfly-b1-' + sha256(readFileSync(new URL(import.meta.url))).slice(0, 16)
export type Point = [number, number]
export type Line = {
  id: string
  points: Point[]
  closed?: boolean
  fill?: string
  stroke?: string
  weight?: number
  dash?: number[]
}
export type Label = { x: number; y: number; text: string; size: number; color?: string }
export type Drawing = { width: number; height: number; lines: Line[]; labels: Label[] }
export const rounded = (n: number) => Math.round(n * 1000) / 1000

export function editable(design_id: string, revision_id: string, span: number, appearance: string) {
  return {
    design_id,
    revision_id,
    generator_revision: generator,
    model,
    parameters: { span_mm: span },
    appearance_id: appearance,
    units: 'mm',
  }
}

// Sample each original cubic at equal parameter intervals. Both export formats cut this same polyline.
export function outline(span: number): Point[] {
  const half: Point[] = [[0, 0]]
  let [x, y] = model.half_outline_start
  const scale = span / (2 * model.half_span_mm)
  for (const [cx1, cy1, cx2, cy2, endX, endY] of model.half_outline_segments) {
    for (let i = 1; i <= 16; i++) {
      const t = i / 16,
        u = 1 - t
      const blend = (a: number, b: number, c: number, d: number) =>
        u ** 3 * a + 3 * u * u * t * b + 3 * u * t * t * c + t ** 3 * d
      half.push([rounded(scale * blend(x, cx1, cx2, endX)), rounded(blend(y, cy1, cy2, endY))])
    }
    ;[x, y] = [endX, endY]
  }
  const other: Point[] = half
    .slice(1, -1)
    .reverse()
    .map(([x, y]) => [-x, y])
  return [...half, ...other]
}

export function metrics(span: number) {
  const points = outline(span)
  let twiceArea = 0
  points.forEach(([x, y], i) => {
    const [nextX, nextY] = points[(i + 1) % points.length]
    twiceArea += x * nextY - nextX * y
  })
  return {
    span_mm: span,
    planform_area_mm2: rounded(Math.abs(twiceArea) / 2),
    classification: 'computed_geometry',
  }
}

const palettes: Record<string, string[]> = {
  blank: ['#ffffff'],
  meadow: ['#d5e8d9', '#408a78', '#f2d8a1'],
  apricot: ['#fae1cc', '#bb695e', '#f5bb77'],
}
export function butterfly(span: number, appearance: string, center: number, top: number) {
  const scale = span / (2 * model.half_span_mm)
  const place = ([x, y]: Point): Point => [rounded(center + x), rounded(top + y)]
  const colors = palettes[appearance]
  const lines: Line[] = [
    {
      id: 'cut',
      points: outline(span).map(place),
      closed: true,
      fill: colors[0],
      stroke: '#20382f',
      weight: 0.44,
    },
  ]
  const labels: Label[] = []
  for (const side of [-1, 1]) {
    const wing = (x: number, y: number): Point => place([side * scale * x, y])
    // The colored insets are decorative. The single continuous outer path is the cut line.
    if (appearance !== 'blank') {
      for (const [i, patch] of [
        [
          [10, 22],
          [33, 15],
          [61, 9],
          [73, 11],
          [55, 23],
          [26, 33],
          [13, 33],
        ],
        [
          [15, 42],
          [36, 30],
          [69, 19],
          [76, 21],
          [72, 30],
          [53, 41],
          [32, 47],
        ],
        [
          [14, 57],
          [33, 57],
          [54, 64],
          [59, 72],
          [51, 80],
          [35, 76],
          [21, 65],
        ],
      ].entries()) {
        lines.push({
          id: 'patch-' + side + '-' + i,
          points: patch.map(([x, y]) => wing(x, y)),
          closed: true,
          fill: colors[i === 1 ? 2 : 1],
        })
      }
    }
    const [start, end] = model.root_fold_y_mm
    lines.push({
      id: 'fold-' + side,
      points: [wing(model.root_x_mm, start), wing(model.root_x_mm, end)],
      stroke: '#35423b',
      weight: 0.35,
      dash: [2, 1.4],
    })
    lines.push({
      id: 'trim-' + side,
      points: model.trim_segment_mm.map(([x, y]: Point) => wing(x, y)),
      stroke: '#35423b',
      weight: 0.32,
      dash: [0.7, 1.0],
    })
  }
  for (const [station, y] of Object.entries(model.clip_stations_mm_from_nose) as [string, number][]) {
    lines.push({
      id: 'clip-' + station,
      points: [place([-3, y]), place([3, y])],
      stroke: '#20382f',
      weight: 0.35,
    })
    labels.push({ x: center + 10 * scale, y: top + y + 3.5, text: station, size: 3, color: '#152d22' })
  }
  return { lines, labels }
}
`,"/packages/geometry/workshop.ts":`import { readFileSync } from 'node:fs'
import { rounded, sha256, type Line, type Point } from './butterfly.ts'
import { toPaper, trimGeometry, wingArt, wingShape } from './workshop-art.ts'
import { type WorkshopModel, type WorkshopParameters } from './workshop-models.ts'

export { workshopModels, type WorkshopModel, type WorkshopParameters } from './workshop-models.ts'

// Bind editable records to the complete original airframe and artwork implementation.
const geometrySources = ['workshop.ts', 'workshop-art.ts', 'workshop-models.ts']
export const workshopGenerator =
  'butterfly-workshop-w1-' +
  sha256(
    Buffer.concat(geometrySources.map((file) => readFileSync(new URL(file, import.meta.url)))),
  ).slice(0, 16)

export function workshopEditable(
  model: WorkshopModel,
  design_id: string,
  revision_id: string,
  parameters: WorkshopParameters,
  appearance_id: string,
) {
  return {
    design_id,
    revision_id,
    generator_revision: workshopGenerator,
    model,
    parameters,
    appearance_id,
    units: 'mm',
    coordinates:
      'Nose at top. Edge control x is percent half-span. Edge control y is millimetres. Left and right are seen looking forward from the tail. Positive tab angles bend upward from their own wing.',
  }
}

export function workshopMetrics(model: WorkshopModel, parameters: Pick<WorkshopParameters, 'span_mm'>) {
  const outline = wingShape(model).outline.map((p) => toPaper(p, parameters.span_mm))
  let twiceArea = 0
  for (let i = 0; i < outline.length; i++) {
    const [x, y] = outline[i],
      [u, v] = outline[(i + 1) % outline.length]
    twiceArea += x * v - u * y
  }
  const area = Math.abs(twiceArea) / 2
  return {
    span_mm: parameters.span_mm,
    planform_area_mm2: rounded(area),
    aspect_ratio: rounded(parameters.span_mm ** 2 / area),
    classification: 'computed_geometry' as const,
  }
}

export function wingtipHeight(model: WorkshopModel, span: number) {
  return (
    (span / 2 - (span * model.geometry.root_x) / 200) *
    Math.sin((model.geometry.target_dihedral_deg * Math.PI) / 180)
  )
}

export function tabHeight(model: WorkshopModel, span: number, angle: number) {
  const shape = wingShape(model)
  const { hinges } = trimGeometry(model, shape.trailing)
  // The fold axis slopes slightly on the hindwing. Perpendicular depth sets the true rise.
  const dx = ((hinges[1][0] - hinges[0][0]) * span) / 200,
    dy = hinges[1][1] - hinges[0][1]
  return ((model.geometry.tab_depth_mm * dx) / Math.hypot(dx, dy)) * Math.sin((angle * Math.PI) / 180)
}

export function workshopArt(
  model: WorkshopModel,
  parameters: WorkshopParameters,
  appearance: string,
  forPrint = false,
) {
  const shape = wingShape(model)
  const span = parameters.span_mm
  const lines = wingArt(model, appearance, span, shape)
  const g = model.geometry,
    tab = trimGeometry(model, shape.trailing)
  const c = model.palettes[appearance as keyof typeof model.palettes]
  const ink = '#272239',
    pale = '#FFFEF4'
  if (!forPrint && (parameters.left_trim_deg || parameters.right_trim_deg)) {
    // Top-down orthographic rotation about each real, slightly sloped hinge.
    const [a, b] = tab.hinges.map((p) => toPaper(p, span))
    const dx = b[0] - a[0],
      dy = b[1] - a[1],
      length = Math.hypot(dx, dy),
      normal: Point = [-dy / length, dx / length]
    const liftLoss = [parameters.left_trim_deg, parameters.right_trim_deg].map(
      (angle) => 1 - Math.cos((angle * Math.PI) / 180),
    )
    const project = ([x, y]: Point): Point => {
      const absX = Math.abs(x),
        index = x < 0 ? 0 : 1
      if (!liftLoss[index] || absX < a[0] || absX > b[0]) return [x, y]
      const loss = ((absX - a[0]) * normal[0] + (y - a[1]) * normal[1]) * liftLoss[index]
      if (loss <= 0) return [x, y]
      return [rounded(Math.sign(x) * (absX - loss * normal[0])), rounded(y - loss * normal[1])]
    }
    for (const line of lines) line.points = line.points.map(project)
  }
  const markings = (id: string, points: Point[], dash?: number[]) => {
    lines.push(
      { id: id + '-halo', points, stroke: pale, weight: 1.42 },
      { id, points, stroke: ink, weight: 0.43, dash },
    )
  }
  if (forPrint) {
    lines.push({
      id: 'cut',
      points: shape.outline.map((p) => toPaper(p, span)),
      closed: true,
      stroke: ink,
      weight: 0.53,
    })
    const station = g.nose_y + g.clip_rear_from_nose_mm
    markings('clip-rear', [
      toPaper([-g.root_x + 0.4, station], span),
      toPaper([g.root_x - 0.4, station], span),
    ])
    markings('clip-cross', [toPaper([0, station - 2.0], span), toPaper([0, station + 2.0], span)])
  }
  for (const side of [-1, 1]) {
    const id = side < 0 ? 'left' : 'right'
    const paper = (p: Point) => toPaper(p, span, side)
    const angle = side < 0 ? parameters.left_trim_deg : parameters.right_trim_deg
    if (forPrint) {
      markings(
        'root-fold-' + id,
        [
          [g.root_x, g.fore_root_y],
          [g.root_x, g.hind_root_y],
        ].map((p) => paper(p as Point)),
        [2.9, 1.6],
      )
      for (let i = 0; i < 2; i++)
        markings('tab-slit-' + id + '-' + i, [tab.ends[i], tab.hinges[i]].map(paper))
      markings('tab-hinge-' + id, tab.hinges.map(paper), [0.55, 0.85])
    } else if (angle !== 0) {
      // Light catches an upturned hinge; a turned-under edge casts a shadow.
      const rise = Math.abs(tabHeight(model, span, angle))
      const gleam = appearance === 'coloring' ? '#80788C' : angle > 0 ? c.gleam : c.ink
      const lip = [
        tab.fromHinge(0.02, 0.18),
        tab.fromHinge(0.98, 0.18),
        tab.fromHinge(0.97, rise + 0.32),
        tab.fromHinge(0.04, rise + 0.35),
      ]
      lines.push(
        { id: 'creased-tab-' + id, points: lip.map(paper), closed: true, fill: gleam },
        {
          id: 'tab-relief-' + id,
          points: tab.hinges.map(paper),
          stroke: angle > 0 ? c.ink : c.gleam,
          weight: 0.26,
        },
      )
    }
  }
  return {
    lines,
    tab,
    minY: Math.min(...shape.outline.map((p) => p[1])),
    maxY: Math.max(...shape.outline.map((p) => p[1])),
  }
}

export function placeArt(lines: Line[], cx: number, top: number): Line[] {
  return lines.map((line) => ({
    ...line,
    points: line.points.map(([x, y]): Point => [rounded(cx + x), rounded(top + y)]),
  }))
}
`,"/packages/geometry/workshop-art.ts":`import { rounded, type Line, type Point } from './butterfly.ts'
import type { Segment, WorkshopModel, WingColors } from './workshop-models.ts'

function cubic(start: Point, segment: Segment, t: number): Point {
  const [cx, cy, dx, dy, ex, ey] = segment
  const u = 1 - t
  return [
    u ** 3 * start[0] + 3 * u ** 2 * t * cx + 3 * u * t ** 2 * dx + t ** 3 * ex,
    u ** 3 * start[1] + 3 * u ** 2 * t * cy + 3 * u * t ** 2 * dy + t ** 3 * ey,
  ]
}

function curves(start: Point, segments: Segment[]): Point[] {
  const points = [start]
  for (const segment of segments) {
    const from = points.at(-1)!
    for (let i = 1; i <= 14; i++) points.push(cubic(from, segment, i / 14))
  }
  return points
}

type Edge = { points: Point[]; distance: number[]; length: number }
function edge(points: Point[]): Edge {
  const distance = [0]
  for (let i = 1; i < points.length; i++) {
    distance.push(
      distance[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]),
    )
  }
  return { points, distance, length: distance.at(-1)! }
}
function interpolate(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function pointBetween(a: Point, b: Point, t: number): Point {
  return [interpolate(a[0], b[0], t), interpolate(a[1], b[1], t)]
}
function along(path: Edge, fraction: number): Point {
  const distance = Math.max(0, Math.min(1, fraction)) * path.length
  let hi = path.distance.length - 1,
    lo = 0
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2)
    if (distance > path.distance[mid]) lo = mid
    else hi = mid
  }
  return pointBetween(
    path.points[lo],
    path.points[hi],
    (distance - path.distance[lo]) / (path.distance[hi] - path.distance[lo]),
  )
}
function sample<T>(count: number, fn: (t: number) => T): T[] {
  return Array.from({ length: count + 1 }, (_, i) => fn(i / count))
}

export function wingShape(model: WorkshopModel) {
  const g = model.geometry
  const fore = curves([g.root_x, g.fore_root_y], g.fore_edge)
  const hind = curves(fore.at(-1)!, g.hind_edge)
  const head = curves(
    [0, g.nose_y],
    [
      [2.4, g.nose_y, 3.8, g.nose_y + 1.0, 4.6, g.nose_y + 3.6],
      [5.2, g.nose_y + 6.5, g.root_x - 0.3, g.fore_root_y - 4, g.root_x, g.fore_root_y],
    ],
  )
  const tail = curves(hind.at(-1)!, [
    [g.root_x - 0.4, g.hind_root_y + 5, 3, g.abdomen_y, 0, g.abdomen_y],
  ])
  const half = [...head, ...fore.slice(1), ...hind.slice(1), ...tail.slice(1)]
  const outline = [
    ...half,
    ...half
      .slice(1, -1)
      .reverse()
      .map(([x, y]): Point => [-x, y]),
  ]
  // The swallowtail's narrow black streamer has no fan of colored scales.
  const coloredHind =
    model.species === 'swallowtail'
      ? curves(fore.at(-1)!, [
          ...g.hind_edge.slice(0, 4),
          [57, 73, 55, 74, 51, 74],
          ...g.hind_edge.slice(7),
        ])
      : hind
  return { outline, fore: edge(fore), hind: edge(coloredHind), trailing: hind }
}
export function toPaper(point: Point, span: number, side = 1): Point {
  const x = point[0] * side
  return [x === 0 ? 0 : Math.sign(x) * rounded((Math.abs(x) * span) / 200), rounded(point[1])]
}

// Intersect the actual cut polyline so both slits start exactly at the printed edge.
function trailingPoint(points: Point[], x: number): Point {
  const ys: number[] = []
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1],
      [x2, y2] = points[i]
    if (x1 !== x2 && x >= Math.min(x1, x2) && x <= Math.max(x1, x2))
      ys.push(interpolate(y1, y2, (x - x1) / (x2 - x1)))
  }
  if (!ys.length) throw Error('Trim station is outside the trailing edge')
  return [x, Math.max(...ys)]
}
export function trimGeometry(model: WorkshopModel, trailing: Point[]) {
  const [inner, outer] = model.geometry.tab_x.map((x) => trailingPoint(trailing, x))
  const depth = model.geometry.tab_depth_mm
  const hinges: [Point, Point] = [
    [inner[0], inner[1] - depth],
    [outer[0], outer[1] - depth],
  ]
  const fromHinge = (t: number, offset: number): Point => {
    const p = pointBetween(hinges[0], hinges[1], t)
    return [p[0], p[1] + offset]
  }
  return { hinges, ends: [inner, outer], fromHinge }
}
function surface(path: Edge, origin: Point, fore: boolean) {
  return (t: number, r: number): Point => {
    const [x, y] = pointBetween(origin, along(path, t), r)
    // Both fans curve around the indentation where the forewing overlaps the hindwing.
    const distance = fore ? (1 - t) / 0.1 : t / 0.38
    return [x, y + 11.5 * Math.exp(-(distance ** 2)) * Math.sin(Math.PI * r)]
  }
}
type MapWing = ReturnType<typeof surface>
type Add = (name: string, points: Point[], fill?: string, stroke?: string, weight?: number) => void

function strip(
  map: MapWing,
  start: number,
  end: number,
  inner: (t: number) => number,
  outer: (t: number) => number,
  count = 40,
): Point[] {
  const rail = (r: (t: number) => number) =>
    sample(count, (i) => {
      const t = interpolate(start, end, i)
      return map(t, r(t))
    })
  const side = (t: number, from: number, to: number) =>
    sample(10, (s) => map(t, interpolate(from, to, s))).slice(1, -1)
  return [
    ...rail(inner),
    ...side(end, inner(end), outer(end)),
    ...rail(outer).reverse(),
    ...side(start, outer(start), inner(start)),
  ]
}
const fixed = (n: number) => (_t: number) => n
function spot(map: MapWing, t: number, r: number, dt: number, dr: number, skew = 0): Point[] {
  return sample(20, (i) => {
    const a = i * Math.PI * 2,
      x = Math.cos(a),
      y = Math.sin(a)
    return map(t + dt * x + skew * y, r + dr * y)
  })
}
function ellipse(cx: number, cy: number, rx: number, ry: number): Point[] {
  return sample(
    26,
    (t) => [cx + rx * Math.cos(t * 2 * Math.PI), cy + ry * Math.sin(t * 2 * Math.PI)] as Point,
  )
}
function vein(map: MapWing, t0: number, t1: number, r0: number, r1: number, bow = 0): Point[] {
  return sample(18, (u) =>
    map(interpolate(t0, t1, u) + bow * Math.sin(Math.PI * u), interpolate(r0, r1, u)),
  )
}
function blend(a: string, b: string, weight: number) {
  let color = '#'
  for (let i = 1; i < 7; i += 2) {
    const channel = interpolate(parseInt(a.slice(i, i + 2), 16), parseInt(b.slice(i, i + 2), 16), weight)
    color += Math.round(channel).toString(16).padStart(2, '0')
  }
  return color.toUpperCase()
}

function ramp(stops: [number, string][], position: number) {
  let i = 1
  while (i < stops.length - 1 && position > stops[i][0]) i++
  const [from, a] = stops[i - 1],
    [to, b] = stops[i]
  return blend(a, b, Math.max(0, Math.min(1, (position - from) / (to - from))))
}

function monarch(map: MapWing, fore: boolean, c: WingColors, inkOnly: boolean, add: Add) {
  const rim = fore
    ? (t: number) => 0.93 - 0.15 * Math.exp(-((t - 0.55) ** 2) / 0.026) - 0.04 * Math.sin(Math.PI * t)
    : (t: number) => 0.9 - 0.055 * Math.sin(Math.PI * t)
  add('ground', strip(map, 0, 1, fixed(0.01), rim), c.base, inkOnly ? c.ink : undefined, 0.34)
  if (!inkOnly) {
    const stops: [number, string][] = [
      [0, blend(c.mid, c.shade, 0.3)],
      [0.28, c.mid],
      [0.53, c.base],
      [0.82, c.sun],
      [1, blend(c.sun, c.base, 0.45)],
    ]
    for (let i = 0; i < 16; i++) {
      const arc = (r: number) => (t: number) =>
        rim(t) * (r + 0.035 * Math.sin(Math.PI * r) * Math.sin(5 * t))
      add(
        'amber-scale-layer-' + i,
        strip(map, 0, 1, arc(i / 16), arc(Math.min(1, (i + 1.05) / 16))),
        ramp(stops, (i + 0.5) / 16),
      )
    }
    for (let k = 0; k < 10; k++)
      for (let j = 0; j < 4; j++) {
        const t = 0.19 + k * 0.078 + 0.009 * Math.sin(k + j),
          r = 0.27 + j * 0.124 + 0.037 * Math.sin(k * 1.73 + j)
        add(
          'pollen-glint-' + k + '-' + j,
          spot(map, t, r, 0.0045, 0.012, 0.001),
          blend(c.gleam, c.sun, 0.5 + 0.2 * Math.sin(k + j)),
        )
      }
  }
  const bone = (id: string, pts: Point[], width: number) =>
    add(id, pts, undefined, c.ink, inkOnly ? 0.32 : width)
  const branch = (id: string, t0: number, r0: number, t1: number, width: number) => {
    bone(id, vein(map, t0, t1, r0, rim(t1) + 0.006, 0.006), width)
  }
  if (fore) {
    // All secondaries spring from the same closed discal cell or its lower main vein.
    const top = 0.319,
      bottom = 0.735
    bone(
      'upper-main-vein',
      sample(30, (r) => map(top, r * (rim(top) + 0.008))),
      0.81,
    )
    bone(
      'lower-main-vein',
      sample(30, (r) => map(bottom, r * (rim(bottom) + 0.008))),
      0.95,
    )
    const cell = (u: number): [number, number] => [
      interpolate(top, bottom, u),
      0.49 + 0.11 * Math.sin(Math.PI * u),
    ]
    bone(
      'discal-crossvein',
      sample(32, (u) => map(...cell(u))),
      0.64,
    )
    for (const [i, u] of [0.12, 0.36, 0.61, 0.84].entries()) {
      const [t, r] = cell(u)
      branch('secondary-' + i, t, r, 0.39 + 0.085 * i, 0.67)
    }
    for (const [i, r] of [0.55, 0.35, 0.16].entries())
      branch('lower-fork-' + i, bottom, r, 0.81 + 0.066 * i, 0.72)
  } else
    for (let i = 0; i < 8; i++) {
      const t = 0.16 + i * 0.111
      bone(
        'hind-vein-' + i,
        vein(map, t * 0.48 + 0.18, t, 0, rim(t) + 0.006, -0.038),
        i % 3 === 0 ? 0.78 : 0.63,
      )
    }
  const stationCount = fore ? 19 : 17
  for (let i = 0; i < stationCount; i++) {
    const t = (fore ? 0.33 : 0.1) + i * (fore ? 0.034 : 0.049),
      border = rim(t)
    const radius = 0.0085 + 0.002 * Math.sin(i * 1.1)
    add(
      'milkspot-' + i,
      spot(map, t, border + (1 - border) * 0.64, radius, Math.min(0.02, (1 - border) * 0.19)),
      c.spot,
      inkOnly ? c.ink : undefined,
      0.2,
    )
    if (i > 0 && i < stationCount - 1)
      add(
        'milkspot-inner-' + i,
        spot(
          map,
          t + 0.006,
          border + (1 - border) * 0.29,
          radius * 0.9,
          Math.min(0.019, (1 - border) * 0.19),
        ),
        i % 4 === 0 ? c.gleam : c.spot,
        inkOnly ? c.ink : undefined,
        0.2,
      )
  }
  if (fore)
    for (let i = 0; i < 4; i++) {
      const t = 0.406 + i * 0.046
      add(
        'apical-window-' + i,
        spot(map, t, rim(t) - 0.014, 0.011, 0.032, 0.002),
        i % 2 ? c.spot : c.gleam,
        inkOnly ? c.ink : undefined,
        0.25,
      )
    }
}

function morpho(map: MapWing, fore: boolean, c: WingColors, inkOnly: boolean, add: Add) {
  const rim = (t: number) =>
    0.94 - 0.06 * Math.sin(Math.PI * t) - (fore ? 0.045 * Math.exp(-((t - 0.52) ** 2) / 0.018) : 0)
  add('ground', strip(map, 0, 1, fixed(0.01), rim), c.shade, inkOnly ? c.ink : undefined, 0.34)
  if (!inkOnly) {
    const stops: [number, string][] = [
      [0, c.shade],
      [0.18, c.base],
      [0.39, c.sun],
      [0.56, blend(c.gleam, c.sun, 0.45)],
      [0.71, c.sun],
      [0.84, c.mid],
      [1, c.base],
    ]
    const arc = (r: number) => (t: number) =>
      rim(t) * (r + 0.11 * Math.sin(Math.PI * r) * Math.sin(4.8 * t + (fore ? 0.1 : 1)))
    for (let i = 0; i < 28; i++) {
      add(
        'structural-blue-' + i,
        strip(map, 0, 1, arc(i / 28), arc(Math.min(1, (i + 1.08) / 28))),
        ramp(stops, (i + 0.5) / 28),
      )
    }
    for (let ray = 0; ray < 12; ray++)
      for (let i = 0; i < 5; i++) {
        const start = 0.15 + ray * 0.066 + 0.009 * Math.cos(i * 2),
          r = 0.23 + i * 0.12 + 0.035 * Math.cos(ray * 1.7)
        add(
          'scale-' + ray + '-' + i,
          sample(4, (u) => map(start + 0.01 * u, r + 0.006 * Math.sin(u * Math.PI))),
          undefined,
          blend(i % 2 ? c.gleam : c.base, c.sun, 0.45),
          0.19,
        )
      }
  }
  const cellPoint = (u: number): [number, number] => [
    0.335 + 0.311 * u,
    0.48 + 0.055 * Math.sin(Math.PI * u),
  ]
  for (let i = 0; i < 9; i++) {
    const tip = 0.18 + i * 0.093
    // The middle forewing veins branch from the discal crossvein; the others reach the wing joint.
    const [start, r0] = fore && i >= 2 && i <= 5 ? cellPoint((i - 2) / 3) : [tip * 0.79 + 0.065, 0.012]
    if (!inkOnly)
      add(
        'vein-sheen-' + i,
        vein(map, start + 0.004, tip + 0.005, r0, rim(tip), -0.025),
        undefined,
        c.gleam,
        0.24,
      )
    add(
      'vein-' + i,
      vein(map, start, tip, r0, rim(tip) + 0.007, -0.025),
      undefined,
      inkOnly ? c.ink : c.shade,
      inkOnly ? 0.3 : 0.42,
    )
  }
  if (fore) {
    add(
      'discal-crossvein',
      sample(20, (u) => map(...cellPoint(u))),
      undefined,
      inkOnly ? c.ink : c.shade,
      0.46,
    )
    for (const u of [0, 1]) {
      const [t, r] = cellPoint(u)
      add(
        'discal-rail-' + u,
        vein(map, t * 0.67 + 0.08, t, 0.012, r, 0.007),
        undefined,
        inkOnly ? c.ink : c.shade,
        0.43,
      )
    }
    for (let i = 0; i < 5; i++) {
      const t = 0.39 + i * 0.039
      add(
        'ivory-apex-' + i,
        spot(map, t, rim(t) + 0.045, 0.008, 0.013),
        c.spot,
        inkOnly ? c.ink : undefined,
        0.22,
      )
    }
  } else
    for (let i = 0; i < 9; i++) {
      const t = 0.22 + i * 0.075
      add(
        'edge-scale-' + i,
        spot(map, t, rim(t) + 0.019, 0.009, 0.01),
        inkOnly ? c.spot : c.mid,
        inkOnly ? c.ink : undefined,
        0.22,
      )
    }
}

function swallowtail(map: MapWing, fore: boolean, c: WingColors, inkOnly: boolean, add: Add) {
  const rim = (t: number) =>
    fore ? 0.91 - 0.1 * Math.exp(-((t - 0.58) ** 2) / 0.055) : 0.78 - 0.065 * Math.sin(Math.PI * t)
  add('ground', strip(map, 0, 1, fixed(0.01), rim), c.base, inkOnly ? c.ink : undefined, 0.34)
  if (!inkOnly) {
    const stops: [number, string][] = [
      [0, c.mid],
      [0.29, c.gleam],
      [0.62, c.sun],
      [1, c.base],
    ]
    for (let i = 0; i < 15; i++) {
      const arc = (r: number) => (t: number) =>
        rim(t) * (r + 0.09 * Math.sin(r * Math.PI) * Math.sin(5 * t))
      add(
        'butter-scales-' + i,
        strip(map, 0, 1, arc(i / 15), arc(Math.min(1, (i + 1.05) / 15))),
        ramp(stops, (i + 0.5) / 15),
      )
    }
    for (let k = 0; k < 11; k++)
      for (let j = 0; j < 4; j++) {
        const t = 0.16 + 0.069 * k + 0.012 * Math.sin(j + k),
          r = 0.24 + 0.128 * j + 0.029 * Math.cos(k * 1.7 + j)
        add('dusting-' + k + '-' + j, spot(map, t, r, 0.004, 0.008), blend(c.gleam, c.base, 0.35))
      }
  }
  if (fore) {
    // Black costal bars taper away from the leading edge and stop before the hind margin.
    for (const [i, [t, r, reach]] of [
      [0.24, 0.51, 0.6],
      [0.34, 0.6, 0.65],
      [0.44, 0.68, 0.71],
    ].entries()) {
      const a = sample(25, (u) =>
        map(interpolate(t, reach, u), interpolate(0.96, r, u) - 0.067 * Math.sin(u * Math.PI)),
      )
      const b = sample(25, (u) =>
        map(interpolate(reach, t - 0.066, u), interpolate(r, 0.97, u) + 0.035 * Math.sin(u * Math.PI)),
      )
      add('tiger-bar-' + i, [...a, ...b], inkOnly ? '#FFFFFF' : c.ink, inkOnly ? c.ink : undefined, 0.32)
    }
  }
  for (let i = 0; i < (fore ? 7 : 8); i++) {
    const t = 0.24 + i * (fore ? 0.105 : 0.095)
    add(
      'vein-' + i,
      vein(map, t * 0.67 + 0.07, t, 0.012, rim(t) + 0.005, 0.013),
      undefined,
      c.ink,
      inkOnly ? 0.3 : fore ? 0.52 : 0.72,
    )
  }
  const amount = fore ? 10 : 9
  for (let i = 0; i < amount; i++) {
    const t = (fore ? 0.415 : 0.175) + i * (fore ? 0.055 : 0.081)
    const r = rim(t)
    // Crescents follow the black hindwing margin; a second row sits nearer its scalloped edge.
    const cresc = (center: number, wide: number, deep: number) => [
      ...sample(14, (u) => map(t + wide * (u - 0.5), center + deep * Math.sin(Math.PI * u))),
      ...sample(14, (u) =>
        map(t + wide * (0.5 - u), center + deep * 0.16 * Math.sin(Math.PI * u) - 0.006),
      ),
    ]
    add(
      'crescent-' + i,
      cresc(r + (1 - r) * (fore ? 0.45 : 0.34), fore ? 0.038 : 0.056, fore ? 0.041 : 0.059),
      fore ? c.gleam : c.spot,
      inkOnly ? c.ink : undefined,
      0.24,
    )
    if (!fore)
      add(
        'yellow-moon-' + i,
        cresc(r + (1 - r) * 0.74, 0.05, 0.034),
        c.sun,
        inkOnly ? c.ink : undefined,
        0.22,
      )
  }
  if (!fore) {
    const t = 0.84
    add('red-eyespot-rim', spot(map, t, 0.735, 0.043, 0.073), c.ink)
    add('red-eyespot', spot(map, t, 0.735, 0.029, 0.05), c.blush, inkOnly ? c.ink : undefined, 0.22)
    add('eyespot-glint', spot(map, t - 0.008, 0.721, 0.012, 0.011), c.gleam)
  }
}

export function wingArt(
  model: WorkshopModel,
  appearance: string,
  span: number,
  shape: ReturnType<typeof wingShape>,
): Line[] {
  const c = model.palettes[appearance as keyof typeof model.palettes]
  if (!c) throw Error('Unknown workshop appearance')
  const inkOnly = appearance === 'coloring'
  const lines: Line[] = [
    {
      id: 'silhouette',
      points: shape.outline.map((p) => toPaper(p, span)),
      closed: true,
      fill: inkOnly ? '#FFFFFF' : c.ink,
      stroke: c.ink,
      weight: 0.44,
    },
  ]
  const painters = { monarch, morpho, swallowtail }
  for (const side of [-1, 1]) {
    for (const lobe of ['hind', 'fore'] as const) {
      const fore = lobe === 'fore'
      const origin = fore ? model.geometry.fore_origin : model.geometry.hind_origin
      const map = surface(shape[lobe], origin, fore)
      const add: Add = (name, points, fill, stroke, weight = 0) => {
        lines.push({
          id: (side < 0 ? 'left-' : 'right-') + lobe + '-' + name,
          points: points.map((p) => toPaper(p, span, side)),
          closed: !!fill,
          fill,
          stroke,
          weight,
        })
      }
      painters[model.species](map, fore, c, inkOnly, add)
    }
  }
  const g = model.geometry,
    thorax = g.fore_root_y + 5
  const art = (id: string, points: Point[], fill?: string, stroke?: string, weight = 0) => {
    lines.push({ id, points: points.map((p) => toPaper(p, span)), closed: !!fill, fill, stroke, weight })
  }
  const bodyInk = inkOnly ? '#FFFFFF' : blend(c.ink, '#000000', 0.22)
  const abdomen = curves(
    [0, thorax],
    [
      [5.5, thorax + 3, 5.3, g.hind_root_y + 2, 0, g.abdomen_y - 2],
      [-5.3, g.hind_root_y + 2, -5.5, thorax + 3, 0, thorax],
    ],
  )
  art('abdomen', abdomen, bodyInk, c.ink, 0.37)
  for (let i = 0; i < 5; i++) {
    const y = thorax + 10 + i * 5,
      width = 3.6 - i * 0.42
    art(
      'abdomen-segment-' + i,
      curves([-width, y], [[-0.7, y + 0.9, 0.7, y + 0.9, width, y]]),
      undefined,
      inkOnly ? c.ink : blend(c.ink, c.sun, 0.62),
      0.48,
    )
  }
  art('thorax', ellipse(0, thorax, 4.3, 7.6), bodyInk, c.ink, 0.35)
  art('head', ellipse(0, thorax - 8.8, 3.6, 3.65), bodyInk, c.ink, 0.35)
  for (const side of [-1, 1]) {
    const mirror = (p: Point): Point => [p[0] * side, p[1]]
    art(
      'antenna-' + side,
      curves([1.55, thorax - 11], [[3, thorax - 14, 4.4, g.nose_y + 9, 3.7, g.nose_y + 5]]).map(mirror),
      undefined,
      inkOnly ? c.ink : c.sun,
      0.52,
    )
    art('antenna-club-' + side, ellipse(side * 3.7, g.nose_y + 5, 0.62, 1.55), inkOnly ? c.ink : c.sun)
    art(
      'thorax-stripe-' + side,
      curves(
        [side * 1.8, thorax - 4.8],
        [[side * 3.1, thorax - 1.7, side * 2.5, thorax + 3, side * 1.2, thorax + 5.1]],
      ),
      undefined,
      inkOnly ? c.ink : c.sun,
      0.58,
    )
    art('eye-' + side, ellipse(side * 2.3, thorax - 9.1, 0.62, 0.83), inkOnly ? c.ink : c.spot)
    if (model.species === 'monarch') {
      for (const [i, [x, y]] of [
        [2.6, -5.7],
        [3.0, -2.2],
        [2.8, 1.8],
        [2.1, 4.8],
      ].entries())
        art(
          'thorax-milkspot-' + side + '-' + i,
          ellipse(side * x, thorax + y, 0.38, 0.54),
          inkOnly ? c.ink : c.spot,
        )
    }
  }
  return lines
}
`,"/packages/geometry/workshop-models.ts":`import type { Point } from './butterfly.ts'

export type Species = 'monarch' | 'morpho' | 'swallowtail'
export type Segment = [number, number, number, number, number, number]
export type WorkshopParameters = { span_mm: number; left_trim_deg: number; right_trim_deg: number }
export type WingColors = {
  ink: string
  shade: string
  base: string
  mid: string
  sun: string
  gleam: string
  spot: string
  blush: string
}
export type Shape = {
  // x is a percentage of half-span. y is full-size paper millimetres from the drawing datum.
  nose_y: number
  abdomen_y: number
  root_x: number
  fore_root_y: number
  hind_root_y: number
  fore_edge: Segment[]
  hind_edge: Segment[]
  fore_origin: Point
  hind_origin: Point
  tab_x: [number, number]
  tab_depth_mm: number
  clip_rear_from_nose_mm: number
  target_dihedral_deg: number
}

const definition = (
  name: string,
  unit: 'mm' | 'degrees',
  minimum: number,
  maximum: number,
  step: number,
  description: string,
) => ({ name, unit, minimum, maximum, step, description })
const parameter_definitions = [
  definition(
    'span_mm',
    'mm',
    148,
    184,
    2,
    'Width between the two cut wingtips. Chord and body length stay fixed.',
  ),
  definition(
    'left_trim_deg',
    'degrees',
    -12,
    12,
    2,
    'Left trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail.',
  ),
  definition(
    'right_trim_deg',
    'degrees',
    -12,
    12,
    2,
    'Right trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail.',
  ),
]
const appearances = [
  {
    appearance_id: 'natural',
    title: 'Field colors',
    ink_usage: 'full',
    description: 'Colors and markings inspired by the real butterfly.',
  },
  {
    appearance_id: 'carnival',
    title: 'Carnival',
    ink_usage: 'full',
    description: 'Candy-bright wings with a contrasting accent.',
  },
  {
    appearance_id: 'twilight',
    title: 'Twilight',
    ink_usage: 'full',
    description: 'Jewel tones and luminous pale markings.',
  },
  {
    appearance_id: 'coloring',
    title: 'Color your own',
    ink_usage: 'low',
    description: 'White wing cells with printable outlines to color by hand.',
  },
]

function colors(
  ink: string,
  shade: string,
  base: string,
  mid: string,
  sun: string,
  gleam: string,
  spot: string,
  blush: string,
): WingColors {
  return { ink, shade, base, mid, sun, gleam, spot, blush }
}
const coloring = colors(
  '#4D4351',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
)
const shared = {
  baseline_revision: 'w1',
  units: 'mm',
  parameter_definitions,
  appearance_id: 'natural',
  appearances,
  rights: {
    license_expression: 'CERN-OHL-W-2.0',
    license_url: 'https://spdx.org/licenses/CERN-OHL-W-2.0.html',
    attribution:
      'Open Flight contributors. Original paper airframes under CERN-OHL-W-2.0. Wing artwork and learning text under CC BY-SA 4.0.',
    status: 'original_with_license',
  },
}
type AirframeInput = {
  species: Species
  name: string
  span: number
  geometry: Shape
  palettes: Record<'natural' | 'carnival' | 'twilight', WingColors>
}
function airframe({ species, name, span, geometry, palettes }: AirframeInput) {
  return {
    ...shared,
    model: 'butterfly-' + species,
    species,
    name,
    geometry,
    parameters: { span_mm: span, left_trim_deg: 0, right_trim_deg: 0 },
    palettes: { ...palettes, coloring },
  }
}
export type WorkshopModel = ReturnType<typeof airframe>

export const workshopModels: WorkshopModel[] = [
  airframe({
    species: 'monarch',
    name: 'Monarch',
    span: 172,
    geometry: {
      nose_y: 9,
      abdomen_y: 84,
      root_x: 6,
      fore_root_y: 25,
      hind_root_y: 69,
      fore_origin: [6.2, 36.5],
      hind_origin: [6.2, 37.6],
      fore_edge: [
        [21, 21, 47, 13, 65, 8],
        [79, 3.5, 90, 0.8, 94, 2],
        [98, 3, 100, 7, 100, 12],
        [100, 22, 95, 29, 87, 35],
        [76, 43, 64, 47, 54, 50],
      ],
      hind_edge: [
        [62, 48, 73, 46, 78, 51],
        [83, 57, 75, 67, 67, 73],
        [58, 80, 49, 84, 39, 83],
        [26, 83, 14, 73, 6, 69],
      ],
      tab_x: [28, 51],
      tab_depth_mm: 10,
      clip_rear_from_nose_mm: 17,
      target_dihedral_deg: 12,
    },
    palettes: {
      natural: colors(
        '#23192C',
        '#9B3625',
        '#FF7916',
        '#F65B1B',
        '#FFAF29',
        '#FFE174',
        '#FFF6CF',
        '#E8553D',
      ),
      carnival: colors(
        '#3C1943',
        '#9B285D',
        '#F04685',
        '#F8466F',
        '#FF9870',
        '#FFE78F',
        '#FFF9E0',
        '#48D6BC',
      ),
      twilight: colors(
        '#261D49',
        '#543469',
        '#A86BED',
        '#8851C6',
        '#DE9CED',
        '#FFD09C',
        '#FFF1CB',
        '#EF91B7',
      ),
    },
  }),
  airframe({
    species: 'morpho',
    name: 'Blue Morpho',
    span: 160,
    geometry: {
      nose_y: 8,
      abdomen_y: 94,
      root_x: 6,
      fore_root_y: 25,
      hind_root_y: 79,
      fore_origin: [6.3, 40],
      hind_origin: [6.3, 41.4],
      fore_edge: [
        [20, 18.5, 34, 12, 53, 7],
        [69, 2, 87, 0, 94, 5],
        [98, 8, 100, 18, 100, 26],
        [100, 39, 93, 48, 80, 51],
        [75, 53, 70, 54.5, 68, 55.5],
      ],
      hind_edge: [
        [77, 54.5, 85, 54, 89, 59],
        [97, 70, 89, 81, 78, 87],
        [64, 95, 48, 100, 35, 96],
        [20, 92, 12, 86, 6, 79],
      ],
      tab_x: [32, 57],
      tab_depth_mm: 12,
      clip_rear_from_nose_mm: 18,
      target_dihedral_deg: 16,
    },
    palettes: {
      natural: colors(
        '#192840',
        '#2147A1',
        '#1558DB',
        '#337FF7',
        '#18BFEB',
        '#66F4F3',
        '#F4F5DD',
        '#3EEDFA',
      ),
      carnival: colors(
        '#322B58',
        '#6744AE',
        '#8157EF',
        '#A66DF4',
        '#70DED8',
        '#BAFBE3',
        '#FFF4E5',
        '#C9FF9E',
      ),
      twilight: colors(
        '#211F4B',
        '#3C3989',
        '#525AD3',
        '#777DEF',
        '#5AC6CB',
        '#ADFFE0',
        '#FEF0CA',
        '#79EBD6',
      ),
    },
  }),
  airframe({
    species: 'swallowtail',
    name: 'Swallowtail',
    span: 180,
    geometry: {
      nose_y: 9.5,
      abdomen_y: 81,
      root_x: 6,
      fore_root_y: 25,
      hind_root_y: 69,
      fore_origin: [6.25, 36],
      hind_origin: [6.25, 37.4],
      fore_edge: [
        [26, 21, 56, 10, 80, 5],
        [90, 2, 96, 0.7, 100, 1.5],
        [100, 7, 95, 17, 91, 22],
        [88, 24, 88, 27, 86, 29],
        [81, 30, 80, 33, 78, 35],
        [73, 36, 71, 39, 68, 41],
        [62, 42, 59, 45, 51, 48],
      ],
      hind_edge: [
        [63, 44, 76, 44, 80, 49],
        [80, 54, 78, 57, 74, 60],
        [71, 59, 70, 62, 68, 65],
        [64, 64, 63, 67, 61, 69],
        [60, 75, 59, 88, 56, 92],
        [54, 94, 52, 91, 52.8, 88],
        [54, 81, 53, 75, 51, 74],
        [47, 73, 47, 77, 44, 78],
        [40, 76, 38, 81, 34, 81],
        [30, 80, 28, 83, 25, 82],
        [17, 81, 10, 75, 6, 69],
      ],
      tab_x: [21, 41],
      tab_depth_mm: 9,
      clip_rear_from_nose_mm: 17,
      target_dihedral_deg: 10,
    },
    palettes: {
      natural: colors(
        '#24243C',
        '#B98229',
        '#FFDB3A',
        '#F1BB32',
        '#FFE766',
        '#FFF6A0',
        '#42C8D3',
        '#FC6F44',
      ),
      carnival: colors(
        '#43233D',
        '#BD6744',
        '#FF8340',
        '#FF9E52',
        '#FFC46A',
        '#FFE3A0',
        '#50E3CE',
        '#EA4B81',
      ),
      twilight: colors(
        '#271E4B',
        '#7650AA',
        '#BE92E8',
        '#A479DE',
        '#D8B5F3',
        '#EFD7FD',
        '#7DDBE5',
        '#FF9E8F',
      ),
    },
  }),
]
`,"/designs/butterfly-001/model.json":`{
  "model": "butterfly-001",
  "baseline_revision": "b1",
  "name": "Butterfly Glider",
  "units": "mm",
  "parameters": { "span_mm": 172 },
  "parameter_definitions": [
    { "name": "span_mm", "unit": "mm", "minimum": 148, "maximum": 184, "step": 2, "description": "Width of the flat cut outline. These bounds fit both sheets. Flight performance is unmeasured." }
  ],
  "appearance_id": "blank",
  "appearances": [
    { "appearance_id": "blank", "title": "Drawing paper", "ink_usage": "low", "description": "White wings with construction marks." },
    { "appearance_id": "meadow", "title": "Meadow", "ink_usage": "full", "description": "Mint and deep teal with original wing patches." },
    { "appearance_id": "apricot", "title": "Apricot", "ink_usage": "full", "description": "Warm peach and brick with the same cut outline." }
  ],
  "half_span_mm": 86,
  "half_outline_start": [0, 0],
  "half_outline_segments": [
    [2, 0, 4, 0, 6, 0], [6, 5, 6, 11, 6, 16],
    [21, 13, 48, 0, 67, 3], [77, 4, 86, 13, 86, 24],
    [86, 38, 70, 48, 48, 52], [59, 55, 69, 66, 66, 75],
    [63, 89, 47, 96, 35, 91], [22, 86, 13, 77, 6, 76],
    [6, 83, 5, 92, 3, 94], [2, 95, 1, 95, 0, 95]
  ],
  "root_x_mm": 6,
  "root_fold_y_mm": [16, 76],
  "clip_stations_mm_from_nose": { "A": 16, "B": 22 },
  "trim_segment_mm": [[29, 83], [44, 88]],
  "material_hypothesis": "One unlaminated sheet of plain copier paper, nominally 90 g/m² if available, and one small blunt paper clip. Record actual stock and clip.",
  "rights": {
    "license_expression": "CERN-OHL-W-2.0",
    "license_url": "https://spdx.org/licenses/CERN-OHL-W-2.0.html",
    "attribution": "Open Flight contributors, original Butterfly Glider b1. Wing artwork and learning text: CC BY-SA 4.0.",
    "status": "original_with_license"
  }
}
`,"/packages/field-guide/species.json":`[
  {
    "id": "monarch",
    "scientific_name": "Danaus plexippus",
    "photo": {
      "url": "https://pixabay.com/photos/monarch-butterfly-pink-flowers-60824/",
      "creator": "JamesDeMers",
      "local_path": "/assets/field-guide/monarch.jpg"
    },
    "natural_history": {
      "url": "https://www.fws.gov/species/monarch-danaus-plexippus",
      "source": "U.S. Fish & Wildlife Service"
    },
    "en": {
      "common_name": "Monarch",
      "observation": "Follow a black vein through the orange wing all the way to the edge. The dark rim has two rows of tiny white spots. Look for both details on the paper wings.",
      "flight_question": "Does this long-winged glider travel farther than the broad-winged morpho when you release both the same way?",
      "photo_alt": "An orange and black monarch hangs from pink flowers with its spotted wing edges folded together.",
      "steps": [
        {
          "id": "scale",
          "title": "Check the print size",
          "body": "Gather paper, scissors, a ruler and one small blunt paper clip. Print the flight sheet at 100% or Actual size. Measure the 50 mm bar. If it is longer or shorter, check the print setting.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Cut the outline and tab slits",
          "body": "Cut around the solid outside edge. Follow the tips of the long front wings around to the rounded back wings. Cut the two short solid lines beside each back tab. Stop at the dotted hinge so each tab stays attached. Ask for help with the small cuts.",
          "diagram": "/assets/field-guide/cut-monarch.svg"
        },
        {
          "id": "fold",
          "title": "Lift both wings",
          "body": "Point the nose away, printed side up. Keep the middle strip flat on the table and lift both wings along the long dashed lines. From behind, hold a ruler upright next to the outermost point of each wing. Match both heights to the millimetre target on your sheet (12°).",
          "diagram": "/assets/field-guide/fold-monarch.svg"
        },
        {
          "id": "clip",
          "title": "Balance the nose",
          "body": "Slide one small paper clip over the front of the middle strip. Stop when the back end reaches the cross. Keep that clip in place while you compare wing settings.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Set the little back tabs",
          "body": "Point the nose away from you. Left and right are now your left and right. Bend each tab at its dotted line to match your sheet. Positive angles lift it above the wing, negative angles bend it below, and 0° leaves it flat.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Try a gentle glide",
          "body": "Find a clear space. Hold the middle strip, keep the nose level and give a gentle push. Try five glides with flat tabs. Change only one tab, then make five more from the same place and height. Mark the first landing each time.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "ru": {
      "common_name": "Монарх",
      "observation": "Проследи за чёрной жилкой от середины оранжевого крыла до самого края. На тёмной кайме два ряда белых точек. Найди и жилки, и точки на бумажных крыльях.",
      "flight_question": "Какая модель пролетит дальше при одинаковом запуске — длиннокрылый монарх или ширококрылый морфо?",
      "photo_alt": "Оранжево-чёрный монарх сидит на розовых цветках. На сложенных крыльях видна кайма в белую крапинку.",
      "steps": [
        {
          "id": "scale",
          "title": "Проверь масштаб",
          "body": "Приготовь бумагу, ножницы, линейку и одну небольшую скрепку с закруглёнными концами. Напечатай выкройку в масштабе 100%. Измерь отрезок 50 мм. Если длина другая, проверь настройки печати.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Вырежи контур и надрежь язычки",
          "body": "Вырежи бабочку по внешней сплошной линии. Обведи ножницами кончики длинных передних крыльев, затем округлые задние крылья. По бокам каждого заднего язычка сделай два коротких надреза по сплошным линиям. Остановись у линии из точек, чтобы язычок остался на крыле. Если трудно, позови взрослого.",
          "diagram": "/assets/field-guide/cut-monarch.svg"
        },
        {
          "id": "fold",
          "title": "Приподними оба крыла",
          "body": "Положи бабочку рисунком вверх, носом от себя. Прижми среднюю полоску к столу и подними оба крыла по длинным штриховым линиям. Смотри сзади: поставь линейку вертикально рядом с самым дальним краем каждого крыла. Сверь обе высоты с отметкой в миллиметрах на выкройке (12°).",
          "diagram": "/assets/field-guide/fold-monarch.svg"
        },
        {
          "id": "clip",
          "title": "Надень скрепку на нос",
          "body": "Надень небольшую скрепку спереди на среднюю полоску. Её задний конец должен дойти до крестика. Пока сравниваешь положения язычков, оставляй скрепку на месте.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Настрой задние язычки",
          "body": "Разверни бабочку носом от себя. Теперь слева и справа — как у тебя. Согни каждый язычок по линии из точек на угол, указанный на выкройке. Плюс означает вверх от крыла, минус — вниз, а 0° — вровень с крылом.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Запусти планер",
          "body": "Найди свободное место. Возьми планер за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сделай пять запусков с ровными язычками. Отогни только один язычок и сделай ещё пять запусков с того же места и высоты. Каждый раз отмечай место первого касания.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "trim_reference": {
      "url": "https://www.nasa.gov/pdf/205703main_Delta_Wing_Glider.pdf",
      "source": "NASA · Delta Wing Glider"
    },
    "es": {
      "common_name": "Monarca",
      "observation": "Sigue una vena negra del ala naranja hasta el borde. En el borde oscuro hay dos filas de puntitos blancos. Busca estos detalles en las alas de papel.",
      "flight_question": "Si los lanzas igual, ¿planea más lejos la monarca de alas largas o el morfo de alas anchas?",
      "photo_alt": "Mariposa monarca naranja y negra sobre flores rosas, con puntitos blancos en los bordes de las alas.",
      "steps": [
        {
          "id": "scale",
          "title": "Comprueba el tamaño de impresión",
          "body": "Prepara papel, tijeras, una regla y un clip pequeño con extremos redondeados. Imprime al 100 % o en «Tamaño real». La línea debe medir 50 mm. Si mide otra cosa, corrige el ajuste y vuelve a imprimir.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Recorta el contorno y los cortes cortos",
          "body": "Recorta por el borde continuo. Haz los dos cortes cortos de cada aleta de cola. Para al llegar a los puntos y deja esa línea unida al ala. Pide ayuda con los cortes pequeños.",
          "diagram": "/assets/field-guide/cut-monarch.svg"
        },
        {
          "id": "fold",
          "title": "Levanta las dos alas",
          "body": "Pon el lado impreso hacia arriba y la punta lejos de ti. Deja la franja central plana sobre la mesa y levanta ambas alas por las líneas largas de trazos. Desde atrás, pon la regla de pie junto al extremo de cada ala. Iguala las dos alturas con la medida en milímetros de la hoja (12°).",
          "diagram": "/assets/field-guide/fold-monarch.svg"
        },
        {
          "id": "clip",
          "title": "Coloca el clip en la punta",
          "body": "Desliza el clip por la punta de la franja central. Para cuando el extremo de atrás llegue a la cruz. Deja el mismo clip en su sitio durante las pruebas.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Ajusta las aletas de cola",
          "body": "Apunta la punta lejos de ti y mira desde atrás. Así encuentras tu izquierda y tu derecha. Dobla cada aleta por los puntos según tu hoja. El signo + indica arriba del ala, el signo − indica abajo y 0° indica que queda plana.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Prueba un planeo suave",
          "body": "Busca un espacio despejado. Sujeta la franja central, mantén la punta a nivel y empuja suavemente hacia delante. Haz cinco planeos con las aletas planas. Cambia solo una aleta y haz otros cinco desde el mismo sitio y a la misma altura. Marca dónde toca el suelo por primera vez.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    }
  },
  {
    "id": "morpho",
    "scientific_name": "Morpho peleides",
    "photo": {
      "url": "https://pixabay.com/photos/blue-morpho-butterfly-morpho-peleides-947714/",
      "creator": "Meli1670",
      "local_path": "/assets/field-guide/morpho.jpg"
    },
    "natural_history": {
      "url": "https://www.cambridgebutterfly.com/mpeleides/",
      "source": "Cambridge Butterfly Conservatory"
    },
    "en": {
      "common_name": "Blue morpho",
      "observation": "See the dark rim around the blue? On a living morpho the blue flashes as the light changes. When its wings close, the brown undersides show a row of eyespots.",
      "flight_question": "Try the broad wings with both tabs flat. If one wing starts just a little lower, does the butterfly rock back toward level?",
      "photo_alt": "A blue morpho rests on a pale sign with its wings spread. Turquoise panels shine between dark veins and rims.",
      "steps": [
        {
          "id": "scale",
          "title": "Check the print size",
          "body": "Gather paper, scissors, a ruler and one small blunt paper clip. Print the flight sheet at 100% or Actual size. Measure the 50 mm bar. If it is longer or shorter, check the print setting.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Cut the outline and tab slits",
          "body": "Cut around the solid outside edge. Turn the sheet as you cut around the broad, rounded wings. Cut the two short solid lines beside each back tab. Stop at the dotted hinge so each tab stays attached. Ask for help with the small cuts.",
          "diagram": "/assets/field-guide/cut-morpho.svg"
        },
        {
          "id": "fold",
          "title": "Lift both wings",
          "body": "Point the nose away, printed side up. Keep the middle strip flat on the table and lift both wings along the long dashed lines. From behind, hold a ruler upright next to the outermost point of each wing. Match both heights to the millimetre target on your sheet (16°).",
          "diagram": "/assets/field-guide/fold-morpho.svg"
        },
        {
          "id": "clip",
          "title": "Balance the nose",
          "body": "Slide one small paper clip over the front of the middle strip. Stop when the back end reaches the cross. Keep that clip in place while you compare wing settings.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Set the little back tabs",
          "body": "Point the nose away from you. Left and right are now your left and right. Bend each tab at its dotted line to match your sheet. Positive angles lift it above the wing, negative angles bend it below, and 0° leaves it flat.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Try a gentle glide",
          "body": "Find a clear space. Hold the middle strip, keep the nose level and give a gentle push. Try five glides with flat tabs. Change only one tab, then make five more from the same place and height. Mark the first landing each time.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "ru": {
      "common_name": "Голубой морфо",
      "observation": "Видишь тёмный край голубого крыла? У живого морфо синий цвет переливается на свету. Когда крылья складываются, видна коричневая изнанка с узором из глазков.",
      "flight_question": "Оставь оба язычка на широких крыльях ровными. Если при запуске одно крыло чуть ниже другого, выровняется ли модель в воздухе?",
      "photo_alt": "Голубой морфо раскрыл крылья на светлой табличке. Между тёмными жилками и каймой переливаются бирюзовые участки.",
      "steps": [
        {
          "id": "scale",
          "title": "Проверь масштаб",
          "body": "Приготовь бумагу, ножницы, линейку и одну небольшую скрепку с закруглёнными концами. Напечатай выкройку в масштабе 100%. Измерь отрезок 50 мм. Если длина другая, проверь настройки печати.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Вырежи контур и надрежь язычки",
          "body": "Вырежи бабочку по внешней сплошной линии. Поворачивай лист, пока вырезаешь широкие округлые крылья. По бокам каждого заднего язычка сделай два коротких надреза по сплошным линиям. Остановись у линии из точек, чтобы язычок остался на крыле. Если трудно, позови взрослого.",
          "diagram": "/assets/field-guide/cut-morpho.svg"
        },
        {
          "id": "fold",
          "title": "Приподними оба крыла",
          "body": "Положи бабочку рисунком вверх, носом от себя. Прижми среднюю полоску к столу и подними оба крыла по длинным штриховым линиям. Смотри сзади: поставь линейку вертикально рядом с самым дальним краем каждого крыла. Сверь обе высоты с отметкой в миллиметрах на выкройке (16°).",
          "diagram": "/assets/field-guide/fold-morpho.svg"
        },
        {
          "id": "clip",
          "title": "Надень скрепку на нос",
          "body": "Надень небольшую скрепку спереди на среднюю полоску. Её задний конец должен дойти до крестика. Пока сравниваешь положения язычков, оставляй скрепку на месте.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Настрой задние язычки",
          "body": "Разверни бабочку носом от себя. Теперь слева и справа — как у тебя. Согни каждый язычок по линии из точек на угол, указанный на выкройке. Плюс означает вверх от крыла, минус — вниз, а 0° — вровень с крылом.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Запусти планер",
          "body": "Найди свободное место. Возьми планер за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сделай пять запусков с ровными язычками. Отогни только один язычок и сделай ещё пять запусков с того же места и высоты. Каждый раз отмечай место первого касания.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "trim_reference": {
      "url": "https://www.nasa.gov/pdf/205703main_Delta_Wing_Glider.pdf",
      "source": "NASA · Delta Wing Glider"
    },
    "es": {
      "common_name": "Morfo azul",
      "observation": "Fíjate en el borde oscuro alrededor del azul. En el morfo vivo el brillo azul cambia con la luz. Con las alas cerradas se ven manchas redondas en la cara marrón.",
      "flight_question": "Si un ala baja al salir, ¿se endereza el morfo durante el planeo?",
      "photo_alt": "Mariposa morfo con las alas azules abiertas y un borde oscuro.",
      "steps": [
        {
          "id": "scale",
          "title": "Comprueba el tamaño de impresión",
          "body": "Prepara papel, tijeras, una regla y un clip pequeño con extremos redondeados. Imprime al 100 % o en «Tamaño real». La línea debe medir 50 mm. Si mide otra cosa, corrige el ajuste y vuelve a imprimir.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Recorta el contorno y los cortes cortos",
          "body": "Recorta por el borde continuo. Haz los dos cortes cortos de cada aleta de cola. Para al llegar a los puntos y deja esa línea unida al ala. Pide ayuda con los cortes pequeños.",
          "diagram": "/assets/field-guide/cut-morpho.svg"
        },
        {
          "id": "fold",
          "title": "Levanta las dos alas",
          "body": "Pon el lado impreso hacia arriba y la punta lejos de ti. Deja la franja central plana sobre la mesa y levanta ambas alas por las líneas largas de trazos. Desde atrás, pon la regla de pie junto al extremo de cada ala. Iguala las dos alturas con la medida en milímetros de la hoja (16°).",
          "diagram": "/assets/field-guide/fold-morpho.svg"
        },
        {
          "id": "clip",
          "title": "Coloca el clip en la punta",
          "body": "Desliza el clip por la punta de la franja central. Para cuando el extremo de atrás llegue a la cruz. Deja el mismo clip en su sitio durante las pruebas.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Ajusta las aletas de cola",
          "body": "Apunta la punta lejos de ti y mira desde atrás. Así encuentras tu izquierda y tu derecha. Dobla cada aleta por los puntos según tu hoja. El signo + indica arriba del ala, el signo − indica abajo y 0° indica que queda plana.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Prueba un planeo suave",
          "body": "Busca un espacio despejado. Sujeta la franja central, mantén la punta a nivel y empuja suavemente hacia delante. Haz cinco planeos con las aletas planas. Cambia solo una aleta y haz otros cinco desde el mismo sitio y a la misma altura. Marca dónde toca el suelo por primera vez.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    }
  },
  {
    "id": "swallowtail",
    "scientific_name": "Papilio machaon",
    "photo": {
      "url": "https://pixabay.com/photos/macaon-papilio-machaon-butterfly-1710213/",
      "creator": "makamuki0",
      "local_path": "/assets/field-guide/swallowtail.jpg"
    },
    "natural_history": {
      "url": "https://www.norfolkwildlifetrust.org.uk/wildlife-explorer/swallowtail",
      "source": "Norfolk Wildlife Trust"
    },
    "en": {
      "common_name": "Old World swallowtail",
      "observation": "Find the little tail on each back wing. Follow the row of blue marks beside it to the red spot. The black lines split the yellow front wings into patches.",
      "flight_question": "Which wing dips first when you lift one tab on this tapered glider? Flatten it and try the same bend on the other side.",
      "photo_alt": "A yellow and black swallowtail rests among yellow flowers. The scalloped hindwings have blue marks, red accents and long tails.",
      "steps": [
        {
          "id": "scale",
          "title": "Check the print size",
          "body": "Gather paper, scissors, a ruler and one small blunt paper clip. Print the flight sheet at 100% or Actual size. Measure the 50 mm bar. If it is longer or shorter, check the print setting.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Cut the outline and tab slits",
          "body": "Cut around the solid outside edge. Keep both narrow swallowtail tips attached as you cut. Cut the two short solid lines beside each back tab. Stop at the dotted hinge so each tab stays attached. Ask for help with the small cuts.",
          "diagram": "/assets/field-guide/cut-swallowtail.svg"
        },
        {
          "id": "fold",
          "title": "Lift both wings",
          "body": "Point the nose away, printed side up. Keep the middle strip flat on the table and lift both wings along the long dashed lines. From behind, hold a ruler upright next to the outermost point of each wing. Match both heights to the millimetre target on your sheet (10°).",
          "diagram": "/assets/field-guide/fold-swallowtail.svg"
        },
        {
          "id": "clip",
          "title": "Balance the nose",
          "body": "Slide one small paper clip over the front of the middle strip. Stop when the back end reaches the cross. Keep that clip in place while you compare wing settings.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Set the little back tabs",
          "body": "Point the nose away from you. Left and right are now your left and right. Bend each tab at its dotted line to match your sheet. Positive angles lift it above the wing, negative angles bend it below, and 0° leaves it flat.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Try a gentle glide",
          "body": "Find a clear space. Hold the middle strip, keep the nose level and give a gentle push. Try five glides with flat tabs. Change only one tab, then make five more from the same place and height. Mark the first landing each time.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "ru": {
      "common_name": "Махаон",
      "observation": "Найди хвостик на каждом заднем крыле. Рядом тянется ряд синих пятнышек и виднеется красное пятно. Чёрные линии делят жёлтые передние крылья на ячейки.",
      "flight_question": "Какое крыло опустится первым, если отогнуть один язычок вверх? Расправь его и повтори опыт с другой стороны.",
      "photo_alt": "Жёлто-чёрный махаон сидит среди жёлтых цветов. На фигурном крае задних крыльев видны хвостики, синие и красные пятнышки.",
      "steps": [
        {
          "id": "scale",
          "title": "Проверь масштаб",
          "body": "Приготовь бумагу, ножницы, линейку и одну небольшую скрепку с закруглёнными концами. Напечатай выкройку в масштабе 100%. Измерь отрезок 50 мм. Если длина другая, проверь настройки печати.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Вырежи контур и надрежь язычки",
          "body": "Вырежи бабочку по внешней сплошной линии. Осторожно обойди ножницами оба узких хвостика махаона. По бокам каждого заднего язычка сделай два коротких надреза по сплошным линиям. Остановись у линии из точек, чтобы язычок остался на крыле. Если трудно, позови взрослого.",
          "diagram": "/assets/field-guide/cut-swallowtail.svg"
        },
        {
          "id": "fold",
          "title": "Приподними оба крыла",
          "body": "Положи бабочку рисунком вверх, носом от себя. Прижми среднюю полоску к столу и подними оба крыла по длинным штриховым линиям. Смотри сзади: поставь линейку вертикально рядом с самым дальним краем каждого крыла. Сверь обе высоты с отметкой в миллиметрах на выкройке (10°).",
          "diagram": "/assets/field-guide/fold-swallowtail.svg"
        },
        {
          "id": "clip",
          "title": "Надень скрепку на нос",
          "body": "Надень небольшую скрепку спереди на среднюю полоску. Её задний конец должен дойти до крестика. Пока сравниваешь положения язычков, оставляй скрепку на месте.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Настрой задние язычки",
          "body": "Разверни бабочку носом от себя. Теперь слева и справа — как у тебя. Согни каждый язычок по линии из точек на угол, указанный на выкройке. Плюс означает вверх от крыла, минус — вниз, а 0° — вровень с крылом.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Запусти планер",
          "body": "Найди свободное место. Возьми планер за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сделай пять запусков с ровными язычками. Отогни только один язычок и сделай ещё пять запусков с того же места и высоты. Каждый раз отмечай место первого касания.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "trim_reference": {
      "url": "https://www.nasa.gov/pdf/205703main_Delta_Wing_Glider.pdf",
      "source": "NASA · Delta Wing Glider"
    },
    "es": {
      "common_name": "Cola de golondrina",
      "observation": "Busca las dos colas delgadas y las franjas oscuras sobre las alas amarillas. Busca los mismos detalles en la figura de papel.",
      "flight_question": "Si levantas una sola aleta de cola, ¿qué ala baja primero?",
      "photo_alt": "Mariposa amarilla con marcas negras y dos colas delgadas.",
      "steps": [
        {
          "id": "scale",
          "title": "Comprueba el tamaño de impresión",
          "body": "Prepara papel, tijeras, una regla y un clip pequeño con extremos redondeados. Imprime al 100 % o en «Tamaño real». La línea debe medir 50 mm. Si mide otra cosa, corrige el ajuste y vuelve a imprimir.",
          "diagram": "/assets/field-guide/scale.svg"
        },
        {
          "id": "cut",
          "title": "Recorta el contorno y los cortes cortos",
          "body": "Recorta por el borde continuo. Haz los dos cortes cortos de cada aleta de cola. Para al llegar a los puntos y deja esa línea unida al ala. Pide ayuda con los cortes pequeños.",
          "diagram": "/assets/field-guide/cut-swallowtail.svg"
        },
        {
          "id": "fold",
          "title": "Levanta las dos alas",
          "body": "Pon el lado impreso hacia arriba y la punta lejos de ti. Deja la franja central plana sobre la mesa y levanta ambas alas por las líneas largas de trazos. Desde atrás, pon la regla de pie junto al extremo de cada ala. Iguala las dos alturas con la medida en milímetros de la hoja (10°).",
          "diagram": "/assets/field-guide/fold-swallowtail.svg"
        },
        {
          "id": "clip",
          "title": "Coloca el clip en la punta",
          "body": "Desliza el clip por la punta de la franja central. Para cuando el extremo de atrás llegue a la cruz. Deja el mismo clip en su sitio durante las pruebas.",
          "diagram": "/assets/field-guide/clip.svg"
        },
        {
          "id": "trim",
          "title": "Ajusta las aletas de cola",
          "body": "Apunta la punta lejos de ti y mira desde atrás. Así encuentras tu izquierda y tu derecha. Dobla cada aleta por los puntos según tu hoja. El signo + indica arriba del ala, el signo − indica abajo y 0° indica que queda plana.",
          "diagram": "/assets/field-guide/trim.svg"
        },
        {
          "id": "launch",
          "title": "Prueba un planeo suave",
          "body": "Busca un espacio despejado. Sujeta la franja central, mantén la punta a nivel y empuja suavemente hacia delante. Haz cinco planeos con las aletas planas. Cambia solo una aleta y haz otros cinco desde el mismo sitio y a la misma altura. Marca dónde toca el suelo por primera vez.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    }
  }
]
`,"/node_modules/dejavu-fonts-ttf/LICENSE":`Fonts are (c) Bitstream (see below). DejaVu changes are in public domain.
Glyphs imported from Arev fonts are (c) Tavmjong Bah (see below)


Bitstream Vera Fonts Copyright
------------------------------

Copyright (c) 2003 by Bitstream, Inc. All Rights Reserved. Bitstream Vera is
a trademark of Bitstream, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of the fonts accompanying this license ("Fonts") and associated
documentation files (the "Font Software"), to reproduce and distribute the
Font Software, including without limitation the rights to use, copy, merge,
publish, distribute, and/or sell copies of the Font Software, and to permit
persons to whom the Font Software is furnished to do so, subject to the
following conditions:

The above copyright and trademark notices and this permission notice shall
be included in all copies of one or more of the Font Software typefaces.

The Font Software may be modified, altered, or added to, and in particular
the designs of glyphs or characters in the Fonts may be modified and
additional glyphs or characters may be added to the Fonts, only if the fonts
are renamed to names not containing either the words "Bitstream" or the word
"Vera".

This License becomes null and void to the extent applicable to Fonts or Font
Software that has been modified and is distributed under the "Bitstream
Vera" names.

The Font Software may be sold as part of a larger software package but no
copy of one or more of the Font Software typefaces may be sold by itself.

THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT,
TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL BITSTREAM OR THE GNOME
FOUNDATION BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING
ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE
FONT SOFTWARE.

Except as contained in this notice, the names of Gnome, the Gnome
Foundation, and Bitstream Inc., shall not be used in advertising or
otherwise to promote the sale, use or other dealings in this Font Software
without prior written authorization from the Gnome Foundation or Bitstream
Inc., respectively. For further information, contact: fonts at gnome dot
org.

Arev Fonts Copyright
------------------------------

Copyright (c) 2006 by Tavmjong Bah. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining
a copy of the fonts accompanying this license ("Fonts") and
associated documentation files (the "Font Software"), to reproduce
and distribute the modifications to the Bitstream Vera Font Software,
including without limitation the rights to use, copy, merge, publish,
distribute, and/or sell copies of the Font Software, and to permit
persons to whom the Font Software is furnished to do so, subject to
the following conditions:

The above copyright and trademark notices and this permission notice
shall be included in all copies of one or more of the Font Software
typefaces.

The Font Software may be modified, altered, or added to, and in
particular the designs of glyphs or characters in the Fonts may be
modified and additional glyphs or characters may be added to the
Fonts, only if the fonts are renamed to names not containing either
the words "Tavmjong Bah" or the word "Arev".

This License becomes null and void to the extent applicable to Fonts
or Font Software that has been modified and is distributed under the 
"Tavmjong Bah Arev" names.

The Font Software may be sold as part of a larger software package but
no copy of one or more of the Font Software typefaces may be sold by
itself.

THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL
TAVMJONG BAH BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.

Except as contained in this notice, the name of Tavmjong Bah shall not
be used in advertising or otherwise to promote the sale, use or other
dealings in this Font Software without prior written authorization
from Tavmjong Bah. For further information, contact: tavmjong @ free
. fr.

TeX Gyre DJV Math
-----------------
Fonts are (c) Bitstream (see below). DejaVu changes are in public domain.

Math extensions done by B. Jackowski, P. Strzelczyk and P. Pianowski
(on behalf of TeX users groups) are in public domain.

Letters imported from Euler Fraktur from AMSfonts are (c) American
Mathematical Society (see below).
Bitstream Vera Fonts Copyright
Copyright (c) 2003 by Bitstream, Inc. All Rights Reserved. Bitstream Vera
is a trademark of Bitstream, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of the fonts accompanying this license (“Fonts”) and associated
documentation
files (the “Font Software”), to reproduce and distribute the Font Software,
including without limitation the rights to use, copy, merge, publish,
distribute,
and/or sell copies of the Font Software, and to permit persons  to whom
the Font Software is furnished to do so, subject to the following
conditions:

The above copyright and trademark notices and this permission notice
shall be
included in all copies of one or more of the Font Software typefaces.

The Font Software may be modified, altered, or added to, and in particular
the designs of glyphs or characters in the Fonts may be modified and
additional
glyphs or characters may be added to the Fonts, only if the fonts are
renamed
to names not containing either the words “Bitstream” or the word “Vera”.

This License becomes null and void to the extent applicable to Fonts or
Font Software
that has been modified and is distributed under the “Bitstream Vera”
names.

The Font Software may be sold as part of a larger software package but
no copy
of one or more of the Font Software typefaces may be sold by itself.

THE FONT SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT,
TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL BITSTREAM OR THE GNOME
FOUNDATION
BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL,
SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN
ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR
INABILITY TO USE
THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.
Except as contained in this notice, the names of GNOME, the GNOME
Foundation,
and Bitstream Inc., shall not be used in advertising or otherwise to promote
the sale, use or other dealings in this Font Software without prior written
authorization from the GNOME Foundation or Bitstream Inc., respectively.
For further information, contact: fonts at gnome dot org.

AMSFonts (v. 2.2) copyright

The PostScript Type 1 implementation of the AMSFonts produced by and
previously distributed by Blue Sky Research and Y&Y, Inc. are now freely
available for general use. This has been accomplished through the
cooperation
of a consortium of scientific publishers with Blue Sky Research and Y&Y.
Members of this consortium include:

Elsevier Science IBM Corporation Society for Industrial and Applied
Mathematics (SIAM) Springer-Verlag American Mathematical Society (AMS)

In order to assure the authenticity of these fonts, copyright will be
held by
the American Mathematical Society. This is not meant to restrict in any way
the legitimate use of the fonts, such as (but not limited to) electronic
distribution of documents containing these fonts, inclusion of these fonts
into other public domain or commercial font collections or computer
applications, use of the outline data to create derivative fonts and/or
faces, etc. However, the AMS does require that the AMS copyright notice be
removed from any derivative versions of the fonts which have been altered in
any way. In addition, to ensure the fidelity of TeX documents using Computer
Modern fonts, Professor Donald Knuth, creator of the Computer Modern faces,
has requested that any alterations which yield different font metrics be
given a different name.

$Id$
`,"/content/en/butterfly-001/build.md":`# Build the Butterfly Glider

Use the sheet with your design ID, revision and source hash. These instructions fit the b1 generator and its supported spans. The printed outline is an experimental pattern.

1. Choose one sheet of plain copier paper. About 90 g/m² is a starting hypothesis. Record the stock you actually use, its thickness or stated weight if known, and the paper clip you select.
2. Print at actual size on the selected A4 or US Letter paper. Turn off “Fit to page”. Measure the 50 mm line with a separate ruler and record the reading. If it misses 50 mm by more than 0.5 mm, correct the print settings and reprint before building.
3. Cut only the solid outer silhouette. Leave the central strip and all the interior markings intact. Ask an adult to help with scissors if needed.
4. With the printed face up, crease each long dashed wing root so the tips rise equally above the flat body. For the first build, try raising each tip 8 mm above the tabletop while holding the body flat. Record the actual height. Leave the dotted trim guides flat.
5. Slide one small blunt paper clip onto the front edge of the central strip. Align the rear end of the clip with A, 16 mm from the nose. Check that it grips the strip without twisting a wing. If it slips at either station, record the fit and try another clip before starting a comparison.
6. Predict how moving the same clip from A to B, 22 mm from the nose, might affect where the glider first touches down. Use the same build, fold, grip and gentle level release for both settings. Record five attempts per setting, including dives, tumbles and invalid launches.

Record masses, release height and distances only when measured. Keep the print sheet, source hash and trial log together.

Original Open Flight learning text. CC BY-SA 4.0.
`,"/content/ru/butterfly-001/build.md":`# Соберите планер-бабочку

На листе указаны идентификатор модели, версия и хеш исходника. Инструкция подходит для генератора b1 и доступных в нём вариантов размаха. Выкройка экспериментальная.

1. Возьмите лист обычной офисной бумаги. Для первой пробы предлагается бумага плотностью около 90 г/м². Запишите, какую бумагу и скрепку вы использовали. Укажите плотность, если она известна.
2. Печатайте на выбранном листе A4 или US Letter в масштабе 100%. Отключите подгонку под страницу. Измерьте отдельной линейкой контрольный отрезок длиной 50 мм и запишите результат. Если расхождение больше 0,5 мм, исправьте масштаб и распечатайте лист заново.
3. Вырежьте бабочку только по сплошному внешнему контуру. Сохраните центральную полоску и все внутренние линии. При необходимости попросите взрослого помочь с ножницами.
4. Положите лист рисунком вверх. Согните крылья по длинным штриховым линиям так, чтобы обе законцовки поднялись одинаково. Для первой пробы прижмите корпус к столу и попробуйте поднять каждую законцовку на 8 мм. Запишите фактическую высоту. Линии мелкого пунктира оставьте плоскими.
5. Наденьте небольшую скрепку с закруглённым концом на передний край центральной полоски. Совместите задний конец скрепки с меткой A в 16 мм от носа. Если скрепка сползает или перекашивает крыло в любом из двух положений, запишите это и подберите другую до начала сравнения.
6. Предскажите, как изменится место первого касания пола, если передвинуть ту же скрепку к метке B в 22 мм от носа. Сохраняйте те же сгибы, захват и мягкий горизонтальный запуск. Сделайте по пять попыток в каждом положении. Записывайте также пикирования, кувырки и неудачные запуски.

Массу, высоту запуска и дальность указывайте по результатам измерения. Храните выкройку, хеш исходника и журнал испытаний вместе.

Учебный текст Open Flight. Лицензия CC BY-SA 4.0.
`,"/content/es/butterfly-001/build.md":`# Construye el planeador mariposa

Usa la hoja con el identificador, la revisión y el hash de tu diseño. Estas instrucciones sirven para el generador b1 y sus envergaduras disponibles. El patrón es experimental.

1. Elige una hoja de papel normal de impresora. Puedes empezar con papel de unos 90 g/m². Anota el papel que uses, su grosor o gramaje si lo conoces, y el clip elegido.
2. Imprime en «Tamaño real» en papel A4 o tamaño carta. Desactiva «Ajustar a la página». Mide la línea de 50 mm con otra regla y anota la lectura. Si se desvía más de 0,5 mm, corrige el ajuste y vuelve a imprimir.
3. Recorta solo el contorno continuo. Deja intactas la franja central y las marcas interiores. Pide ayuda a un adulto si la necesitas.
4. Con el lado impreso hacia arriba, dobla por las dos líneas largas de trazos. Sujeta la franja central sobre la mesa y eleva los dos extremos a la misma altura. Para el primer montaje, prueba con 8 mm. Anota la altura que midas. Deja planas las aletas marcadas con puntos.
5. Desliza un clip pequeño y con extremos redondeados sobre la punta. Alinea el extremo de atrás del clip con A, a 16 mm de la punta. Comprueba que el clip sujeta la franja sin torcer el ala. Si se desliza de alguna posición, anótalo y prueba otro clip antes de comparar.
6. Predice cómo cambiará el primer punto de contacto con el suelo al pasar el mismo clip de A a B, a 22 mm de la punta. Usa el mismo planeador, pliegue y agarre. Lanza suave y a nivel. Registra cinco intentos por ajuste, incluidos los picados, las volteretas y los lanzamientos inválidos.

Anota masa, altura de lanzamiento y distancias cuando las hayas medido. Guarda juntos la hoja impresa, el hash del diseño y el registro.

Texto didáctico original de Open Flight. CC BY-SA 4.0.
`,"/games/garden-gate/en.md":`# Garden Gate

Make one wide gate from two upright markers. Put a paper flower on the floor beyond it. Choose a clear space, mark the release line and measure the gate width, its distance from the line and the position of the flower. The first builder chooses these dimensions after observing the baseline glide.

Predict which clip setting will put the first landing closer to the flower. Alternate A and B until you have five attempts at each. Hold the release height, direction, glider and clip mass fixed. For every attempt, record whether the glider crossed between the markers before touching down. Separately measure the distance in centimetres from the first ground contact to the flower centre. Mark any contact with an obstacle or invalid launch and keep the row.

Compare gate passes out of five and the spread of landing errors at each setting. What would you keep the same for the next builder?

Original Open Flight game, first trial pending. CC BY-SA 4.0.
`,"/games/garden-gate/ru.md":`# Садовые ворота

Поставьте две стойки, чтобы получились широкие ворота. За ними положите на пол бумажный цветок. Выберите свободное место и отметьте линию запуска. Измерьте ширину ворот, расстояние до линии и положение цветка. Для первого опыта выберите эти размеры после пробного планирования.

Предскажите, при каком положении скрепки планер впервые коснётся пола ближе к цветку. Чередуйте A и B, пока не наберётся по пять попыток на каждую метку. Сохраняйте ту же высоту и направление запуска, тот же планер и ту же скрепку. Для каждой попытки запишите, пролетел ли планер между стойками до касания пола. Отдельно измерьте в сантиметрах расстояние от места первого касания пола до центра цветка. Отмечайте столкновения и ошибки запуска. Сохраните каждую запись.

Сравните число проходов из пяти и разброс расстояний до цветка. Какие условия вы сохраните для следующего участника?

Игра Open Flight. Первое испытание ещё предстоит. Лицензия CC BY-SA 4.0.
`,"/games/garden-gate/es.md":`# La puerta del jardín

Haz una puerta ancha con dos marcas verticales. Coloca detrás una flor de papel en el suelo. Busca un espacio despejado, marca la línea de lanzamiento y mide el ancho de la puerta, su distancia a la línea y la posición de la flor. Decide esas medidas después de ver un primer planeo.

Predice en cuál de las dos posiciones del clip aterrizarás más cerca de la flor. Alterna A y B hasta tener cinco intentos en cada posición. Mantén la altura y la dirección del lanzamiento, el planeador y el clip. Anota si pasa entre las marcas antes de tocar el suelo. Mide en centímetros la distancia desde el primer contacto con el suelo hasta el centro de la flor. Si toca un obstáculo o el lanzamiento falla, regístralo en su fila.

Compara cuántas veces de cinco pasa por la puerta y cómo se reparten las distancias a la flor. ¿Qué mantendrías igual para la próxima persona?

Juego original de Open Flight, pendiente de primera prueba. CC BY-SA 4.0.
`},Me=new Map,Mn,Lt=(t)=>new URL(t,import.meta.url);function Ct(t,e){if(!Me.has(t)){let n=fetch(Lt(e)).then(async(r)=>{if(!r.ok)throw Error("Cannot load print resource "+e);let o=Q.from(await r.arrayBuffer());return Me.set(t,o),o}).catch((r)=>{throw Me.delete(t),r});Me.set(t,n)}return Me.get(t)}async function wo(){if(globalThis.jspdf)return;Mn??=new Promise((t,e)=>{let n=document.createElement("script");n.src=Lt("assets/planes/vendor/jspdf.js"),n.onload=t,n.onerror=()=>{Mn=void 0,e(Error("Unable to load the PDF tools."))},document.head.append(n)}),await Mn}async function Bn(t,e){let n=[];if(e.includes("pdf"))n.push(wo(),Ct("/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","assets/planes/vendor/DejaVuSans.ttf"));if(t&&e.includes("illustrated_guide")){let r=[t.photo.local_path,...t.en.steps.map((o)=>o.diagram)].filter(Boolean);for(let o of new Set(r))n.push(Ct("/apps/editor"+o,o.slice(1)))}await Promise.all(n)}function W(t,e){let n=t.pathname;if(Object.hasOwn(vn,n))return e==="utf8"?vn[n]:Q.from(vn[n]);let r=Me.get(n);if(!Q.isBuffer(r))throw Error("Unavailable print resource "+n);return e==="utf8"?r.toString("utf8"):r}var z=JSON.parse(W(new URL("../../designs/butterfly-001/model.json","https://print.invalid/packages/geometry/butterfly.ts"),"utf8")),V=(t)=>ut("sha256").update(t).digest("hex");function qe(t){return JSON.stringify(t,(e,n)=>{if(n&&typeof n==="object"&&!Array.isArray(n))return Object.fromEntries(Object.keys(n).sort().map((r)=>[r,n[r]]));return n})}var Sn="butterfly-b1-"+V(W(new URL("https://print.invalid/packages/geometry/butterfly.ts"))).slice(0,16),_=(t)=>Math.round(t*1000)/1000;function Rt(t,e,n,r){return{design_id:t,revision_id:e,generator_revision:Sn,model:z,parameters:{span_mm:n},appearance_id:r,units:"mm"}}function Dt(t){let e=[[0,0]],[n,r]=z.half_outline_start,o=t/(2*z.half_span_mm);for(let[a,s,c,l,d,p]of z.half_outline_segments){for(let h=1;h<=16;h++){let u=h/16,f=1-u,g=(y,b,k,w)=>f**3*y+3*f*f*u*b+3*f*u*u*k+u**3*w;e.push([_(o*g(n,a,c,d)),_(g(r,s,l,p))])}[n,r]=[d,p]}let i=e.slice(1,-1).reverse().map(([a,s])=>[-a,s]);return[...e,...i]}function Ot(t){let e=Dt(t),n=0;return e.forEach(([r,o],i)=>{let[a,s]=e[(i+1)%e.length];n+=r*s-a*o}),{span_mm:t,planform_area_mm2:_(Math.abs(n)/2),classification:"computed_geometry"}}var xo={blank:["#ffffff"],meadow:["#d5e8d9","#408a78","#f2d8a1"],apricot:["#fae1cc","#bb695e","#f5bb77"]};function Pn(t,e,n,r){let o=t/(2*z.half_span_mm),i=([l,d])=>[_(n+l),_(r+d)],a=xo[e],s=[{id:"cut",points:Dt(t).map(i),closed:!0,fill:a[0],stroke:"#20382f",weight:0.44}],c=[];for(let l of[-1,1]){let d=(u,f)=>i([l*o*u,f]);if(e!=="blank")for(let[u,f]of[[[10,22],[33,15],[61,9],[73,11],[55,23],[26,33],[13,33]],[[15,42],[36,30],[69,19],[76,21],[72,30],[53,41],[32,47]],[[14,57],[33,57],[54,64],[59,72],[51,80],[35,76],[21,65]]].entries())s.push({id:"patch-"+l+"-"+u,points:f.map(([g,y])=>d(g,y)),closed:!0,fill:a[u===1?2:1]});let[p,h]=z.root_fold_y_mm;s.push({id:"fold-"+l,points:[d(z.root_x_mm,p),d(z.root_x_mm,h)],stroke:"#35423b",weight:0.35,dash:[2,1.4]}),s.push({id:"trim-"+l,points:z.trim_segment_mm.map(([u,f])=>d(u,f)),stroke:"#35423b",weight:0.32,dash:[0.7,1]})}for(let[l,d]of Object.entries(z.clip_stations_mm_from_nose))s.push({id:"clip-"+l,points:[i([-3,d]),i([3,d])],stroke:"#20382f",weight:0.35}),c.push({x:n+10*o,y:r+d+3.5,text:l,size:3,color:"#152d22"});return{lines:s,labels:c}}function _o(t,e,n){let[r,o,i,a,s,c]=e,l=1-n;return[l**3*t[0]+3*l**2*n*r+3*l*n**2*i+n**3*s,l**3*t[1]+3*l**2*n*o+3*l*n**2*a+n**3*c]}function ce(t,e){let n=[t];for(let r of e){let o=n.at(-1);for(let i=1;i<=14;i++)n.push(_o(o,r,i/14))}return n}function jt(t){let e=[0];for(let n=1;n<t.length;n++)e.push(e[n-1]+Math.hypot(t[n][0]-t[n-1][0],t[n][1]-t[n-1][1]));return{points:t,distance:e,length:e.at(-1)}}function G(t,e,n){return t+(e-t)*n}function In(t,e,n){return[G(t[0],e[0],n),G(t[1],e[1],n)]}function Fo(t,e){let n=Math.max(0,Math.min(1,e))*t.length,r=t.distance.length-1,o=0;while(r-o>1){let i=Math.floor((o+r)/2);if(n>t.distance[i])o=i;else r=i}return In(t.points[o],t.points[r],(n-t.distance[o])/(t.distance[r]-t.distance[o]))}function O(t,e){return Array.from({length:t+1},(n,r)=>e(r/t))}function ye(t){let e=t.geometry,n=ce([e.root_x,e.fore_root_y],e.fore_edge),r=ce(n.at(-1),e.hind_edge),o=ce([0,e.nose_y],[[2.4,e.nose_y,3.8,e.nose_y+1,4.6,e.nose_y+3.6],[5.2,e.nose_y+6.5,e.root_x-0.3,e.fore_root_y-4,e.root_x,e.fore_root_y]]),i=ce(r.at(-1),[[e.root_x-0.4,e.hind_root_y+5,3,e.abdomen_y,0,e.abdomen_y]]),a=[...o,...n.slice(1),...r.slice(1),...i.slice(1)],s=[...a,...a.slice(1,-1).reverse().map(([l,d])=>[-l,d])],c=t.species==="swallowtail"?ce(n.at(-1),[...e.hind_edge.slice(0,4),[57,73,55,74,51,74],...e.hind_edge.slice(7)]):r;return{outline:s,fore:jt(n),hind:jt(c),trailing:r}}function j(t,e,n=1){let r=t[0]*n;return[r===0?0:Math.sign(r)*_(Math.abs(r)*e/200),_(t[1])]}function ko(t,e){let n=[];for(let r=1;r<t.length;r++){let[o,i]=t[r-1],[a,s]=t[r];if(o!==a&&e>=Math.min(o,a)&&e<=Math.max(o,a))n.push(G(i,s,(e-o)/(a-o)))}if(!n.length)throw Error("Trim station is outside the trailing edge");return[e,Math.max(...n)]}function Tn(t,e){let[n,r]=t.geometry.tab_x.map((s)=>ko(e,s)),o=t.geometry.tab_depth_mm,i=[[n[0],n[1]-o],[r[0],r[1]-o]];return{hinges:i,ends:[n,r],fromHinge:(s,c)=>{let l=In(i[0],i[1],s);return[l[0],l[1]+c]}}}function Eo(t,e,n){return(r,o)=>{let[i,a]=In(e,Fo(t,r),o),s=n?(1-r)/0.1:r/0.38;return[i,a+11.5*Math.exp(-(s**2))*Math.sin(Math.PI*o)]}}function Se(t,e,n,r,o,i=40){let a=(c)=>O(i,(l)=>{let d=G(e,n,l);return t(d,c(d))}),s=(c,l,d)=>O(10,(p)=>t(c,G(l,d,p))).slice(1,-1);return[...a(r),...s(n,r(n),o(n)),...a(o).reverse(),...s(e,o(e),r(e))]}var Cn=(t)=>(e)=>t;function re(t,e,n,r,o,i=0){return O(20,(a)=>{let s=a*Math.PI*2,c=Math.cos(s),l=Math.sin(s);return t(e+r*c+i*l,n+o*l)})}function De(t,e,n,r){return O(26,(o)=>[t+n*Math.cos(o*2*Math.PI),e+r*Math.sin(o*2*Math.PI)])}function Be(t,e,n,r,o,i=0){return O(18,(a)=>t(G(e,n,a)+i*Math.sin(Math.PI*a),G(r,o,a)))}function de(t,e,n){let r="#";for(let o=1;o<7;o+=2){let i=G(parseInt(t.slice(o,o+2),16),parseInt(e.slice(o,o+2),16),n);r+=Math.round(i).toString(16).padStart(2,"0")}return r.toUpperCase()}function Ln(t,e){let n=1;while(n<t.length-1&&e>t[n][0])n++;let[r,o]=t[n-1],[i,a]=t[n];return de(o,a,Math.max(0,Math.min(1,(e-r)/(i-r))))}function Ao(t,e,n,r,o){let i=e?(l)=>0.93-0.15*Math.exp(-((l-0.55)**2)/0.026)-0.04*Math.sin(Math.PI*l):(l)=>0.9-0.055*Math.sin(Math.PI*l);if(o("ground",Se(t,0,1,Cn(0.01),i),n.base,r?n.ink:void 0,0.34),!r){let l=[[0,de(n.mid,n.shade,0.3)],[0.28,n.mid],[0.53,n.base],[0.82,n.sun],[1,de(n.sun,n.base,0.45)]];for(let d=0;d<16;d++){let p=(h)=>(u)=>i(u)*(h+0.035*Math.sin(Math.PI*h)*Math.sin(5*u));o("amber-scale-layer-"+d,Se(t,0,1,p(d/16),p(Math.min(1,(d+1.05)/16))),Ln(l,(d+0.5)/16))}for(let d=0;d<10;d++)for(let p=0;p<4;p++){let h=0.19+d*0.078+0.009*Math.sin(d+p),u=0.27+p*0.124+0.037*Math.sin(d*1.73+p);o("pollen-glint-"+d+"-"+p,re(t,h,u,0.0045,0.012,0.001),de(n.gleam,n.sun,0.5+0.2*Math.sin(d+p)))}}let a=(l,d,p)=>o(l,d,void 0,n.ink,r?0.32:p),s=(l,d,p,h,u)=>{a(l,Be(t,d,h,p,i(h)+0.006,0.006),u)};if(e){a("upper-main-vein",O(30,(h)=>t(0.319,h*(i(0.319)+0.008))),0.81),a("lower-main-vein",O(30,(h)=>t(0.735,h*(i(0.735)+0.008))),0.95);let p=(h)=>[G(0.319,0.735,h),0.49+0.11*Math.sin(Math.PI*h)];a("discal-crossvein",O(32,(h)=>t(...p(h))),0.64);for(let[h,u]of[0.12,0.36,0.61,0.84].entries()){let[f,g]=p(u);s("secondary-"+h,f,g,0.39+0.085*h,0.67)}for(let[h,u]of[0.55,0.35,0.16].entries())s("lower-fork-"+h,0.735,u,0.81+0.066*h,0.72)}else for(let l=0;l<8;l++){let d=0.16+l*0.111;a("hind-vein-"+l,Be(t,d*0.48+0.18,d,0,i(d)+0.006,-0.038),l%3===0?0.78:0.63)}let c=e?19:17;for(let l=0;l<c;l++){let d=(e?0.33:0.1)+l*(e?0.034:0.049),p=i(d),h=0.0085+0.002*Math.sin(l*1.1);if(o("milkspot-"+l,re(t,d,p+(1-p)*0.64,h,Math.min(0.02,(1-p)*0.19)),n.spot,r?n.ink:void 0,0.2),l>0&&l<c-1)o("milkspot-inner-"+l,re(t,d+0.006,p+(1-p)*0.29,h*0.9,Math.min(0.019,(1-p)*0.19)),l%4===0?n.gleam:n.spot,r?n.ink:void 0,0.2)}if(e)for(let l=0;l<4;l++){let d=0.406+l*0.046;o("apical-window-"+l,re(t,d,i(d)-0.014,0.011,0.032,0.002),l%2?n.spot:n.gleam,r?n.ink:void 0,0.25)}}function vo(t,e,n,r,o){let i=(s)=>0.94-0.06*Math.sin(Math.PI*s)-(e?0.045*Math.exp(-((s-0.52)**2)/0.018):0);if(o("ground",Se(t,0,1,Cn(0.01),i),n.shade,r?n.ink:void 0,0.34),!r){let s=[[0,n.shade],[0.18,n.base],[0.39,n.sun],[0.56,de(n.gleam,n.sun,0.45)],[0.71,n.sun],[0.84,n.mid],[1,n.base]],c=(l)=>(d)=>i(d)*(l+0.11*Math.sin(Math.PI*l)*Math.sin(4.8*d+(e?0.1:1)));for(let l=0;l<28;l++)o("structural-blue-"+l,Se(t,0,1,c(l/28),c(Math.min(1,(l+1.08)/28))),Ln(s,(l+0.5)/28));for(let l=0;l<12;l++)for(let d=0;d<5;d++){let p=0.15+l*0.066+0.009*Math.cos(d*2),h=0.23+d*0.12+0.035*Math.cos(l*1.7);o("scale-"+l+"-"+d,O(4,(u)=>t(p+0.01*u,h+0.006*Math.sin(u*Math.PI))),void 0,de(d%2?n.gleam:n.base,n.sun,0.45),0.19)}}let a=(s)=>[0.335+0.311*s,0.48+0.055*Math.sin(Math.PI*s)];for(let s=0;s<9;s++){let c=0.18+s*0.093,[l,d]=e&&s>=2&&s<=5?a((s-2)/3):[c*0.79+0.065,0.012];if(!r)o("vein-sheen-"+s,Be(t,l+0.004,c+0.005,d,i(c),-0.025),void 0,n.gleam,0.24);o("vein-"+s,Be(t,l,c,d,i(c)+0.007,-0.025),void 0,r?n.ink:n.shade,r?0.3:0.42)}if(e){o("discal-crossvein",O(20,(s)=>t(...a(s))),void 0,r?n.ink:n.shade,0.46);for(let s of[0,1]){let[c,l]=a(s);o("discal-rail-"+s,Be(t,c*0.67+0.08,c,0.012,l,0.007),void 0,r?n.ink:n.shade,0.43)}for(let s=0;s<5;s++){let c=0.39+s*0.039;o("ivory-apex-"+s,re(t,c,i(c)+0.045,0.008,0.013),n.spot,r?n.ink:void 0,0.22)}}else for(let s=0;s<9;s++){let c=0.22+s*0.075;o("edge-scale-"+s,re(t,c,i(c)+0.019,0.009,0.01),r?n.spot:n.mid,r?n.ink:void 0,0.22)}}function Mo(t,e,n,r,o){let i=(s)=>e?0.91-0.1*Math.exp(-((s-0.58)**2)/0.055):0.78-0.065*Math.sin(Math.PI*s);if(o("ground",Se(t,0,1,Cn(0.01),i),n.base,r?n.ink:void 0,0.34),!r){let s=[[0,n.mid],[0.29,n.gleam],[0.62,n.sun],[1,n.base]];for(let c=0;c<15;c++){let l=(d)=>(p)=>i(p)*(d+0.09*Math.sin(d*Math.PI)*Math.sin(5*p));o("butter-scales-"+c,Se(t,0,1,l(c/15),l(Math.min(1,(c+1.05)/15))),Ln(s,(c+0.5)/15))}for(let c=0;c<11;c++)for(let l=0;l<4;l++){let d=0.16+0.069*c+0.012*Math.sin(l+c),p=0.24+0.128*l+0.029*Math.cos(c*1.7+l);o("dusting-"+c+"-"+l,re(t,d,p,0.004,0.008),de(n.gleam,n.base,0.35))}}if(e)for(let[s,[c,l,d]]of[[0.24,0.51,0.6],[0.34,0.6,0.65],[0.44,0.68,0.71]].entries()){let p=O(25,(u)=>t(G(c,d,u),G(0.96,l,u)-0.067*Math.sin(u*Math.PI))),h=O(25,(u)=>t(G(d,c-0.066,u),G(l,0.97,u)+0.035*Math.sin(u*Math.PI)));o("tiger-bar-"+s,[...p,...h],r?"#FFFFFF":n.ink,r?n.ink:void 0,0.32)}for(let s=0;s<(e?7:8);s++){let c=0.24+s*(e?0.105:0.095);o("vein-"+s,Be(t,c*0.67+0.07,c,0.012,i(c)+0.005,0.013),void 0,n.ink,r?0.3:e?0.52:0.72)}let a=e?10:9;for(let s=0;s<a;s++){let c=(e?0.415:0.175)+s*(e?0.055:0.081),l=i(c),d=(p,h,u)=>[...O(14,(f)=>t(c+h*(f-0.5),p+u*Math.sin(Math.PI*f))),...O(14,(f)=>t(c+h*(0.5-f),p+u*0.16*Math.sin(Math.PI*f)-0.006))];if(o("crescent-"+s,d(l+(1-l)*(e?0.45:0.34),e?0.038:0.056,e?0.041:0.059),e?n.gleam:n.spot,r?n.ink:void 0,0.24),!e)o("yellow-moon-"+s,d(l+(1-l)*0.74,0.05,0.034),n.sun,r?n.ink:void 0,0.22)}if(!e)o("red-eyespot-rim",re(t,0.84,0.735,0.043,0.073),n.ink),o("red-eyespot",re(t,0.84,0.735,0.029,0.05),n.blush,r?n.ink:void 0,0.22),o("eyespot-glint",re(t,0.832,0.721,0.012,0.011),n.gleam)}function Oe(t,e,n,r){let o=t.palettes[e];if(!o)throw Error("Unknown workshop appearance");let i=e==="coloring",a=[{id:"silhouette",points:r.outline.map((u)=>j(u,n)),closed:!0,fill:i?"#FFFFFF":o.ink,stroke:o.ink,weight:0.44}],s={monarch:Ao,morpho:vo,swallowtail:Mo};for(let u of[-1,1])for(let f of["hind","fore"]){let g=f==="fore",y=g?t.geometry.fore_origin:t.geometry.hind_origin,b=Eo(r[f],y,g),k=(w,L,E,B,Y=0)=>{a.push({id:(u<0?"left-":"right-")+f+"-"+w,points:L.map((Fe)=>j(Fe,n,u)),closed:!!E,fill:E,stroke:B,weight:Y})};s[t.species](b,g,o,i,k)}let c=t.geometry,l=c.fore_root_y+5,d=(u,f,g,y,b=0)=>{a.push({id:u,points:f.map((k)=>j(k,n)),closed:!!g,fill:g,stroke:y,weight:b})},p=i?"#FFFFFF":de(o.ink,"#000000",0.22),h=ce([0,l],[[5.5,l+3,5.3,c.hind_root_y+2,0,c.abdomen_y-2],[-5.3,c.hind_root_y+2,-5.5,l+3,0,l]]);d("abdomen",h,p,o.ink,0.37);for(let u=0;u<5;u++){let f=l+10+u*5,g=3.6-u*0.42;d("abdomen-segment-"+u,ce([-g,f],[[-0.7,f+0.9,0.7,f+0.9,g,f]]),void 0,i?o.ink:de(o.ink,o.sun,0.62),0.48)}d("thorax",De(0,l,4.3,7.6),p,o.ink,0.35),d("head",De(0,l-8.8,3.6,3.65),p,o.ink,0.35);for(let u of[-1,1]){let f=(g)=>[g[0]*u,g[1]];if(d("antenna-"+u,ce([1.55,l-11],[[3,l-14,4.4,c.nose_y+9,3.7,c.nose_y+5]]).map(f),void 0,i?o.ink:o.sun,0.52),d("antenna-club-"+u,De(u*3.7,c.nose_y+5,0.62,1.55),i?o.ink:o.sun),d("thorax-stripe-"+u,ce([u*1.8,l-4.8],[[u*3.1,l-1.7,u*2.5,l+3,u*1.2,l+5.1]]),void 0,i?o.ink:o.sun,0.58),d("eye-"+u,De(u*2.3,l-9.1,0.62,0.83),i?o.ink:o.spot),t.species==="monarch")for(let[g,[y,b]]of[[2.6,-5.7],[3,-2.2],[2.8,1.8],[2.1,4.8]].entries())d("thorax-milkspot-"+u+"-"+g,De(u*y,l+b,0.38,0.54),i?o.ink:o.spot)}return a}var Rn=(t,e,n,r,o,i)=>({name:t,unit:e,minimum:n,maximum:r,step:o,description:i}),Bo=[Rn("span_mm","mm",148,184,2,"Width between the two cut wingtips. Chord and body length stay fixed."),Rn("left_trim_deg","degrees",-12,12,2,"Left trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail."),Rn("right_trim_deg","degrees",-12,12,2,"Right trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail.")],So=[{appearance_id:"natural",title:"Field colors",ink_usage:"full",description:"Colors and markings inspired by the real butterfly."},{appearance_id:"carnival",title:"Carnival",ink_usage:"full",description:"Candy-bright wings with a contrasting accent."},{appearance_id:"twilight",title:"Twilight",ink_usage:"full",description:"Jewel tones and luminous pale markings."},{appearance_id:"coloring",title:"Color your own",ink_usage:"low",description:"White wing cells with printable outlines to color by hand."}];function oe(t,e,n,r,o,i,a,s){return{ink:t,shade:e,base:n,mid:r,sun:o,gleam:i,spot:a,blush:s}}var Po=oe("#4D4351","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"),Io={baseline_revision:"w1",units:"mm",parameter_definitions:Bo,appearance_id:"natural",appearances:So,rights:{license_expression:"CERN-OHL-W-2.0",license_url:"https://spdx.org/licenses/CERN-OHL-W-2.0.html",attribution:"Open Flight contributors. Original paper airframes under CERN-OHL-W-2.0. Wing artwork and learning text under CC BY-SA 4.0.",status:"original_with_license"}};function Dn({species:t,name:e,span:n,geometry:r,palettes:o}){return{...Io,model:"butterfly-"+t,species:t,name:e,geometry:r,parameters:{span_mm:n,left_trim_deg:0,right_trim_deg:0},palettes:{...o,coloring:Po}}}var K=[Dn({species:"monarch",name:"Monarch",span:172,geometry:{nose_y:9,abdomen_y:84,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.2,36.5],hind_origin:[6.2,37.6],fore_edge:[[21,21,47,13,65,8],[79,3.5,90,0.8,94,2],[98,3,100,7,100,12],[100,22,95,29,87,35],[76,43,64,47,54,50]],hind_edge:[[62,48,73,46,78,51],[83,57,75,67,67,73],[58,80,49,84,39,83],[26,83,14,73,6,69]],tab_x:[28,51],tab_depth_mm:10,clip_rear_from_nose_mm:17,target_dihedral_deg:12},palettes:{natural:oe("#23192C","#9B3625","#FF7916","#F65B1B","#FFAF29","#FFE174","#FFF6CF","#E8553D"),carnival:oe("#3C1943","#9B285D","#F04685","#F8466F","#FF9870","#FFE78F","#FFF9E0","#48D6BC"),twilight:oe("#261D49","#543469","#A86BED","#8851C6","#DE9CED","#FFD09C","#FFF1CB","#EF91B7")}}),Dn({species:"morpho",name:"Blue Morpho",span:160,geometry:{nose_y:8,abdomen_y:94,root_x:6,fore_root_y:25,hind_root_y:79,fore_origin:[6.3,40],hind_origin:[6.3,41.4],fore_edge:[[20,18.5,34,12,53,7],[69,2,87,0,94,5],[98,8,100,18,100,26],[100,39,93,48,80,51],[75,53,70,54.5,68,55.5]],hind_edge:[[77,54.5,85,54,89,59],[97,70,89,81,78,87],[64,95,48,100,35,96],[20,92,12,86,6,79]],tab_x:[32,57],tab_depth_mm:12,clip_rear_from_nose_mm:18,target_dihedral_deg:16},palettes:{natural:oe("#192840","#2147A1","#1558DB","#337FF7","#18BFEB","#66F4F3","#F4F5DD","#3EEDFA"),carnival:oe("#322B58","#6744AE","#8157EF","#A66DF4","#70DED8","#BAFBE3","#FFF4E5","#C9FF9E"),twilight:oe("#211F4B","#3C3989","#525AD3","#777DEF","#5AC6CB","#ADFFE0","#FEF0CA","#79EBD6")}}),Dn({species:"swallowtail",name:"Swallowtail",span:180,geometry:{nose_y:9.5,abdomen_y:81,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.25,36],hind_origin:[6.25,37.4],fore_edge:[[26,21,56,10,80,5],[90,2,96,0.7,100,1.5],[100,7,95,17,91,22],[88,24,88,27,86,29],[81,30,80,33,78,35],[73,36,71,39,68,41],[62,42,59,45,51,48]],hind_edge:[[63,44,76,44,80,49],[80,54,78,57,74,60],[71,59,70,62,68,65],[64,64,63,67,61,69],[60,75,59,88,56,92],[54,94,52,91,52.8,88],[54,81,53,75,51,74],[47,73,47,77,44,78],[40,76,38,81,34,81],[30,80,28,83,25,82],[17,81,10,75,6,69]],tab_x:[21,41],tab_depth_mm:9,clip_rear_from_nose_mm:17,target_dihedral_deg:10},palettes:{natural:oe("#24243C","#B98229","#FFDB3A","#F1BB32","#FFE766","#FFF6A0","#42C8D3","#FC6F44"),carnival:oe("#43233D","#BD6744","#FF8340","#FF9E52","#FFC46A","#FFE3A0","#50E3CE","#EA4B81"),twilight:oe("#271E4B","#7650AA","#BE92E8","#A479DE","#D8B5F3","#EFD7FD","#7DDBE5","#FF9E8F")}})];var To=["workshop.ts","workshop-art.ts","workshop-models.ts"],On="butterfly-workshop-w1-"+V(Q.concat(To.map((t)=>W(new URL(t,"https://print.invalid/packages/geometry/workshop.ts"))))).slice(0,16);function Ve(t,e,n,r,o){return{design_id:e,revision_id:n,generator_revision:On,model:t,parameters:r,appearance_id:o,units:"mm",coordinates:"Nose at top. Edge control x is percent half-span. Edge control y is millimetres. Left and right are seen looking forward from the tail. Positive tab angles bend upward from their own wing."}}function Nt(t,e){let n=ye(t).outline.map((i)=>j(i,e.span_mm)),r=0;for(let i=0;i<n.length;i++){let[a,s]=n[i],[c,l]=n[(i+1)%n.length];r+=a*l-c*s}let o=Math.abs(r)/2;return{span_mm:e.span_mm,planform_area_mm2:_(o),aspect_ratio:_(e.span_mm**2/o),classification:"computed_geometry"}}function Ke(t,e){return(e/2-e*t.geometry.root_x/200)*Math.sin(t.geometry.target_dihedral_deg*Math.PI/180)}function jn(t,e,n){let r=ye(t),{hinges:o}=Tn(t,r.trailing),i=(o[1][0]-o[0][0])*e/200,a=o[1][1]-o[0][1];return t.geometry.tab_depth_mm*i/Math.hypot(i,a)*Math.sin(n*Math.PI/180)}function Nn(t,e,n,r=!1){let o=ye(t),i=e.span_mm,a=Oe(t,n,i,o),s=t.geometry,c=Tn(t,o.trailing),l=t.palettes[n],d="#272239",p="#FFFEF4";if(!r&&(e.left_trim_deg||e.right_trim_deg)){let[u,f]=c.hinges.map((E)=>j(E,i)),g=f[0]-u[0],y=f[1]-u[1],b=Math.hypot(g,y),k=[-y/b,g/b],w=[e.left_trim_deg,e.right_trim_deg].map((E)=>1-Math.cos(E*Math.PI/180)),L=([E,B])=>{let Y=Math.abs(E),Fe=E<0?0:1;if(!w[Fe]||Y<u[0]||Y>f[0])return[E,B];let Ce=((Y-u[0])*k[0]+(B-u[1])*k[1])*w[Fe];if(Ce<=0)return[E,B];return[_(Math.sign(E)*(Y-Ce*k[0])),_(B-Ce*k[1])]};for(let E of a)E.points=E.points.map(L)}let h=(u,f,g)=>{a.push({id:u+"-halo",points:f,stroke:"#FFFEF4",weight:1.42},{id:u,points:f,stroke:"#272239",weight:0.43,dash:g})};if(r){a.push({id:"cut",points:o.outline.map((f)=>j(f,i)),closed:!0,stroke:"#272239",weight:0.53});let u=s.nose_y+s.clip_rear_from_nose_mm;h("clip-rear",[j([-s.root_x+0.4,u],i),j([s.root_x-0.4,u],i)]),h("clip-cross",[j([0,u-2],i),j([0,u+2],i)])}for(let u of[-1,1]){let f=u<0?"left":"right",g=(b)=>j(b,i,u),y=u<0?e.left_trim_deg:e.right_trim_deg;if(r){h("root-fold-"+f,[[s.root_x,s.fore_root_y],[s.root_x,s.hind_root_y]].map((b)=>g(b)),[2.9,1.6]);for(let b=0;b<2;b++)h("tab-slit-"+f+"-"+b,[c.ends[b],c.hinges[b]].map(g));h("tab-hinge-"+f,c.hinges.map(g),[0.55,0.85])}else if(y!==0){let b=Math.abs(jn(t,i,y)),k=n==="coloring"?"#80788C":y>0?l.gleam:l.ink,w=[c.fromHinge(0.02,0.18),c.fromHinge(0.98,0.18),c.fromHinge(0.97,b+0.32),c.fromHinge(0.04,b+0.35)];a.push({id:"creased-tab-"+f,points:w.map(g),closed:!0,fill:k},{id:"tab-relief-"+f,points:c.hinges.map(g),stroke:y>0?l.ink:l.gleam,weight:0.26})}}return{lines:a,tab:c,minY:Math.min(...o.outline.map((u)=>u[1])),maxY:Math.max(...o.outline.map((u)=>u[1]))}}function Un(t,e,n){return t.map((r)=>({...r,points:r.points.map(([o,i])=>[_(e+o),_(n+i)])}))}function Ut(t){return new globalThis.jspdf.jsPDF(t)}var we={A4:[210,297],US_LETTER:[215.9,279.4]},Co={en:["Butterfly Glider","Experimental paper glider","Print at 100% / actual size. Measure the line before cutting.","Solid outline: cut. Dashed roots: fold both wings up equally.","Dotted trim marks: leave flat for the first comparison.","Slide the same paper clip onto the nose. Align its rear end with A or B.","Try plain copier paper. Record the actual paper and clip used.","Calibration","Flat span","Source"],ru:["Планер-бабочка","Экспериментальный бумажный планер","Печатайте в масштабе 100%. Измерьте линию перед вырезанием.","Вырежьте по контуру. По штриховым линиям одинаково поднимите крылья.","Линии мелкого пунктира оставьте плоскими для первого опыта.","Наденьте скрепку на нос. Совместите её задний конец с меткой A или B.","Возьмите офисную бумагу. Запишите, какую бумагу и скрепку использовали.","Контроль масштаба","Размах развёртки","Исходник"],es:["Planeador mariposa","Planeador de papel experimental","Imprime al 100 % en tamaño real. Mide la línea antes de recortar.","Recorta por el contorno continuo. Levanta ambas alas por las líneas de trazos.","Deja planas las aletas marcadas con puntos para la primera comparación.","Desliza el mismo clip por la punta. Alinea su extremo trasero con A o B.","Prueba con papel normal de impresora. Anota el papel y el clip que uses.","Control de escala","Envergadura en plano","Archivo fuente"]};function Ht(t,e,n){let[r,o]=we[e],i=Co[n],{ref:a,parameters:s,appearance_id:c}=t,{lines:l,labels:d}=Pn(s.span_mm,c,r/2,54),p=(h,u,f,g,y="#23362e")=>d.push({x:h,y:u,text:f,size:g,color:y});p(14,17,"OPEN FLIGHT",3.6,"#486456"),p(14,31,i[0],8.5),p(14,40,i[1]+"  /  "+a.design_id+"  /  "+a.revision_id,3.2),p(14,165,i[8]+"  "+s.span_mm+" mm",3.7),i.slice(3,7).forEach((h,u)=>p(14,177+u*6,h,3.15)),p(14,211,i[7]+"  /  50 mm",3.6),l.push({id:"ruler",points:[[14,218],[64,218]],stroke:"#20382f",weight:0.42});for(let h=0;h<=50;h+=5)l.push({id:"tick-"+h,points:[[14+h,218],[14+h,h%10===0?214.8:216.3]],stroke:"#20382f",weight:0.32});return p(14,227,i[2],3.1),p(14,o-17,i[9]+" SHA-256",2.8),p(14,o-12,a.source_sha256,2.7),p(14,o-7,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",2.5),{width:r,height:o,lines:l,labels:d}}function Lo(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function ie(t){let{width:e,height:n,lines:r,labels:o}=t,i=r.map((s)=>{let c="M"+s.points.map((l)=>l.join(" ")).join(" L")+(s.closed?" Z":"");return'<path id="'+s.id+'" d="'+c+'" fill="'+(s.fill??"none")+'" stroke="'+(s.stroke??"none")+'" stroke-width="'+(s.weight??0)+'"'+(s.dash?' stroke-dasharray="'+s.dash.join(" ")+'"':"")+"/>"}),a=o.map((s)=>'<text x="'+s.x+'" y="'+s.y+'" font-size="'+s.size+'" fill="'+(s.color??"#23362e")+'">'+Lo(s.text)+"</text>");return Q.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+e+'mm" height="'+n+'mm" viewBox="0 0 '+e+" "+n+'" font-family="DejaVu Sans, sans-serif" stroke-linejoin="round">'+[...i,...a].join(`
`)+`</svg>
`)}function Wt(t){return ie({width:200,height:110,...Pn(t.parameters.span_mm,t.appearance_id,100,7)})}var Ro=new URL("../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","https://print.invalid/packages/print-export/sheets.ts"),Do=W(new URL("../../node_modules/dejavu-fonts-ttf/LICENSE","https://print.invalid/packages/print-export/sheets.ts"),"utf8"),$t;function Pe(t,e=[]){let n=new Ut({unit:"mm",format:[t.width,t.height],compress:!0,putOnlyUsedFonts:!0,precision:5});n.setCreationDate("D:20000101000000+00'00'");let r=e.length?[t,...e]:t;if(n.setFileId(V(JSON.stringify(r)).slice(0,32)),t.locale)n.setLanguage(t.locale);n.setProperties({title:"Open Flight - Butterfly Glider",author:"Open Flight contributors",subject:`Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. Embedded font notices:
`+Do}),$t??=W(Ro).toString("base64"),n.addFileToVFS("DejaVuSans.ttf",$t),n.addFont("DejaVuSans.ttf","DejaVu","normal"),n.setFont("DejaVu","normal");for(let[o,i]of[t,...e].entries()){if(o)n.addPage([i.width,i.height]);n.setLineJoin("round");for(let a of i.lines){if(a.stroke)n.setDrawColor(a.stroke);if(a.fill)n.setFillColor(a.fill);n.setLineWidth(a.weight??0),n.setLineDashPattern(a.dash??[],0);let s=a.points.map((c,l)=>({op:l?"l":"m",c}));if(n.path(s),a.closed)n.close();if(a.fill&&a.stroke)n.fillStroke();else if(a.fill)n.fill();else n.stroke()}for(let a of i.labels)n.setFontSize(a.size*72/25.4),n.setTextColor(a.color??"#23362e"),n.text(a.text,a.x,a.y)}return Q.from(n.output("arraybuffer"))}var Oo={en:{lab:"BUTTERFLY WORKSHOP",names:{monarch:"Monarch",morpho:"Blue Morpho",swallowtail:"Swallowtail"},flatSpan:"flat wingspan",scale:"Measure this line",print:"Print at 100% / actual size",legend:["Cut","Wing fold","Tab fold"],heading:"Build your butterfly",step:["Cut out the shape","Lift both wings","Clip the nose","Set each tail tab"],cut:["Follow the outside edge and the","two solid slits on each rear tab.","Stop at the dots. Keep the hinge."],fold:["Print side up, nose away. Keep the","center flat. Measure both outer tips."],clip:["Slide one small, blunt paper clip","onto the nose. Stop its back end","at the cross. Keep the clip in place."],tabs:["Read left and right from behind.","Bend each tab from its own wing."],side:["Left","Right"],flat:"flat",up:"up",down:"down",launch:"Launch gently and level in a clear space.",compare:"Try five level glides with flat tabs. Change one tab, then compare five more.",materials:"Use one sheet of plain copier paper and one small paper clip. Record which ones you use.",note:"Experimental paper glider",source:"Source",mm:"mm",sideMark:["L","R"]},ru:{lab:"МАСТЕРСКАЯ БАБОЧЕК",names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},flatSpan:"размах развёртки",scale:"Измерь эту линию",print:"Печать в масштабе 100%",legend:["Разрез","Сгиб крыла","Сгиб закрылка"],heading:"Собери свою бабочку",step:["Вырежи контур","Подними крылья","Надень скрепку","Отогни язычки"],cut:["Вырежи бабочку по контуру.","Сделай по два надреза на закрылках.","Остановись у точек. Сохрани сгиб."],fold:["Рисунком вверх, носом от себя.","Измерь высоту краёв над столом."],clip:["Надень на нос небольшую скрепку","с тупым концом. Совмести её задний","край с крестиком. Оставь её на месте."],tabs:["Смотри на бабочку сзади.","Отгибай закрылок от плоскости крыла."],side:["Левый","Правый"],flat:"ровно",up:"вверх",down:"вниз",launch:"Запускай мягко и ровно на свободном месте.",compare:"Сделай пять запусков с плоскими закрылками. Отогни один и сравни ещё пять полётов.",materials:"Возьми лист обычной офисной бумаги и небольшую скрепку. Запиши, какие именно.",note:"Экспериментальный планер",source:"Исходник",mm:"мм",sideMark:["Л","П"]},es:{lab:"TALLER DE MARIPOSAS",names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Cola de golondrina"},flatSpan:"de envergadura en plano",scale:"Mide esta línea",print:"Imprime al 100 %",legend:["Corte","Pliegue del ala","Pliegue de la aleta"],heading:"Construye tu mariposa",step:["Recorta la forma","Levanta las dos alas","Coloca el clip","Ajusta las aletas"],cut:["Recorta el borde y los dos cortes","cortos de cada aleta de cola.","Para en los puntos. Deja el pliegue."],fold:["Dibujo arriba, punta lejos de ti.","Mide los dos extremos desde la mesa."],clip:["Desliza un clip pequeño por la punta.","Alinea el extremo de atrás con la cruz.","Deja el clip en el mismo sitio."],tabs:["Mira desde atrás para ver los lados.","Dobla cada aleta desde su ala."],side:["Izquierda","Derecha"],flat:"plana",up:"arriba",down:"abajo",launch:"Lanza suave y a nivel en un espacio despejado.",compare:"Haz cinco planeos con las aletas planas. Cambia una aleta y compara otros cinco.",materials:"Usa papel normal de impresora y un clip pequeño. Anota cuáles usaste.",note:"Planeador de papel experimental",source:"Archivo fuente",mm:"mm",sideMark:["I","D"]}},jo={monarch:"Danaus plexippus",morpho:"Morpho peleides",swallowtail:"Papilio machaon"},P="#252339",Z="#525767",je="#345C58",$n="#FFFEF6";function Ie(t,e,n,r){return Array.from({length:27},(o,i)=>{let a=2*Math.PI*i/26;return[_(t+Math.cos(a)*n),_(e+Math.sin(a)*r)]})}function No(t,e){let n=String(Math.round(t*10)/10);return e==="en"?n:n.replace(".",",")}function zt(t,e,n){let r=Nn(t,e,n),o=1.75,i=e.span_mm+3.5,a=_(r.maxY-r.minY+3.5);return ie({width:i,height:a,lines:Un(r.lines,i/2,1.75-r.minY),labels:[]})}function Xe(t,e,n,r){let[o,i]=we[n],a=Oo[r],s=t.geometry,{parameters:c,appearance_id:l,ref:d}=e,p=Nn(t,c,l,!0),h=45-p.minY,u=Un(p.lines,o/2,h),f=[],g=(x,F,A=P,ee=0.4,X)=>u.push({id:x,points:F,stroke:A,weight:ee,dash:X}),y=(x,F,A,ee,X=0.28)=>u.push({id:x,points:F,closed:!0,fill:A,stroke:ee,weight:X}),b=(x,F,A,ee=3.1,X=P)=>f.push({x,y:F,text:A,size:ee,color:X}),k=(x,F,A,ee=4.9)=>A.forEach((X,ge)=>b(x,F+ge*ee,X,3.05)),w=(x,F,A)=>{y("number-ring-"+x,Ie(F+2.6,A-1.3,2.65,2.65),P),b(F+1.71,A-0.23,String(x+1),2.9,"#FFFFFF"),b(F+7.3,A,a.step[x],4.05)},L=t.palettes[l].sun,E=l==="coloring"?P:t.palettes.natural.shade;b(13,12.8,"OPEN FLIGHT",3.35,P),g("brand-divider",[[39,10],[39,13]],Z,0.28),b(42,12.8,a.lab,2.8,Z),b(12.6,27.1,a.names[t.species],8),b(13,35,jo[t.species]+"   /   "+c.span_mm+" "+a.mm+" "+a.flatSpan,3.3,Z);let B=o-64;b(B,14.3,a.scale+"  ·  50 "+a.mm,3.1),g("ruler",[[B,23.5],[B+50,23.5]],P,0.5);for(let x=0;x<=50;x+=5)g("ruler-tick-"+x,[[B+x,23.5],[B+x,x%10===0?19.6:21.5]],P,0.34);b(B,31.1,a.print,2.95,Z),g("masthead-rule",[[13,39.3],[o-13,39.3]],"#C1C8C4",0.28);for(let[x,F]of[-1,1].entries()){let[A,ee]=p.tab.fromHinge(0.5,s.tab_depth_mm*0.48),X=o/2+F*A*c.span_mm/200,ge=h+ee;y("tab-badge-"+x,Ie(X,ge,1.9,1.9),$n),b(X-0.92,ge+0.95,a.sideMark[x],2.65)}let Y=150,Fe=[13,77,o-72],Ce=[void 0,[2.9,1.6],[0.55,0.85]];Fe.forEach((x,F)=>{g("legend-"+F,[[x,Y-1],[x+9.5,Y-1]],P,0.55,Ce[F]),b(x+12,Y,a.legend[F],3.15)}),g("instruction-rule",[[13,154.8],[o-13,154.8]],"#B7C1BF",0.35),b(13,163.3,a.heading,5.5);let ke=o/2+3;w(0,13,172.4),k(13,179,a.cut),g("diagram-tab-trailing",[[16,196.2],[46,196.2]],P,0.42),g("diagram-tab-slit-one",[[21,196.2],[21,192.2]],P,0.52),g("diagram-tab-slit-two",[[39.5,196.2],[39.5,192.2]],P,0.52),g("diagram-tab-fold",[[21,192.2],[39.5,192.2]],je,0.48,[0.55,0.85]);for(let[x,F]of[21,39.5].entries())y("diagram-slit-stop-"+x,Ie(F,192.2,0.84,0.84),$n,P,0.4);w(1,ke,172.4);let _r=s.target_dihedral_deg*Math.PI/180,R=ke+27,U=183.5,H=17,Le=H*Math.tan(_r);g("front-view-datum",[[R-3.2-H,U],[R+3.2+H,U]],Z,0.25,[1,1]),g("front-view-fold",[[R-3.2-H,U-Le],[R-3.2,U],[R+3.2,U],[R+3.2+H,U-Le]],E,0.9),g("front-view-rise",[[R+5.2+H,U-Le],[R+5.2+H,U]],P,0.32),g("front-view-rise-left",[[R-5.2-H,U-Le],[R-5.2-H,U]],P,0.32);for(let[x,F]of[R-3.2-H,R+3.2+H].entries())y("diagram-outer-tip-"+x,Ie(F,U-Le,0.75,0.75),$n,P,0.35);b(R+8+H,U-1.2,s.target_dihedral_deg+"°",3.3),b(R+8+H,U+3.9,"≈ "+Math.round(Ke(t,c.span_mm))+" "+a.mm,3.1,je),k(ke,189.8,a.fold),g("row-rule",[[13,199],[o-13,199]],"#D1D7D1",0.27),w(3,ke,208);for(let[x,F]of[c.left_trim_deg,c.right_trim_deg].entries()){let A=ke+x*42,ge=F*Math.PI/180,kr=[A+3+20*Math.cos(ge),220-20*Math.sin(ge)];g("gauge-neutral-"+x,[[A,220],[A+26,220]],Z,0.31,[1.3,1]),g("gauge-tab-"+x,[[A+3,220],kr],E,0.55),y("gauge-hinge-"+x,Ie(A+3,220,0.75,0.75),P),b(A,215,a.side[x]+"  "+(F>0?"+":"")+F+"°",3.05);let Er=Math.abs(jn(t,c.span_mm,F)),Ar=F===0?a.flat:No(Er,r)+" "+a.mm+" "+(F>0?a.up:a.down);b(A,226,Ar,2.95,je)}k(ke,232,a.tabs),w(2,13,208),k(13,215,a.clip);let v=24,M=228.2;g("nose-schematic",[[v-3.5,M+10],[v-3.5,M],[v+3.5,M],[v+3.5,M+10]],Z,0.34),g("nose-target",[[v-5.1,M+7],[v+5.1,M+7]],je,0.4,[1.1,0.8]),g("nose-cross",[[v,M+5.7],[v,M+8.3]],je,0.38),g("clip-illustration",[[v+1.5,M+2],[v+1.5,M-1.1],[v+0.9,M-2.1],[v-1.05,M-2.1],[v-1.9,M-1.1],[v-1.9,M+5.8],[v-1.3,M+7],[v+1.4,M+7],[v+2.1,M+5.8],[v+2.1,M+0.9]],E,0.48),y("clip-color-key",Ie(v+8,M+6.8,0.8,0.8),L,P,0.22),b(v+10,M+7.8,s.clip_rear_from_nose_mm+" "+a.mm,2.95),g("test-rule",[[13,242],[o-13,242]],"#B7C1BF",0.35),b(13,247.5,a.launch,3.1),b(13,252,a.compare,3.1),b(13,256.5,a.materials,2.85,Z);let Fr="/v1/designs/"+d.design_id+"/revisions/"+d.revision_id;return b(13,i-17.7,a.source+"  "+Fr,2.6,Z),b(13,i-12.8,"SHA-256  "+d.source_sha256,2.55,Z),b(13,i-7.8,a.note+"   /   CERN-OHL-W-2.0   /   CC BY-SA 4.0",2.55,Z),{width:o,height:i,lines:u,labels:f,locale:r}}var pe=(t)=>Error(t);function Ne(t){if(t===void 0)return;let e=K.find((n)=>n.species===t);if(!e)throw pe("This butterfly model is unavailable.");return e}var Gt=[z,...K],Hn=(t)=>Ne(t)??z,Je=(t)=>t===void 0?Sn:On;function Qe(t){return{span_mm:t.span_mm,left_trim_deg:t.left_trim_deg??0,right_trim_deg:t.right_trim_deg??0}}function Ze(t,e,n){let r=Ne(n.species_id),{parameters:o,appearance_id:i}=n,a=r?Ve(r,t,e,Qe(o),i):Rt(t,e,o.span_mm,i);return qe(a)}function en(t){let e=Ne(t.species_id);return e?Nt(e,Qe(t.parameters)):Ot(t.parameters.span_mm)}function Yt(t){let e=Ne(t.species_id);return e?zt(e,Qe(t.parameters),t.appearance_id):Wt(t)}function qt(t,e,n){let r=Ne(t.species_id);return r?Xe(r,{...t,parameters:Qe(t.parameters)},e,n):Ht(t,e,n)}function Wn(t,e={},n){let r=Hn(t.species_id),o=r.parameter_definitions;for(let[a,s]of Object.entries(e)){let c=o.find((l)=>l.name===a);if(!c)throw pe("Unknown parameter for this butterfly: "+a);if(!Number.isFinite(s)||s<c.minimum||s>c.maximum||!Number.isInteger((s-c.minimum)/c.step))throw pe(`Choose ${a} from ${c.minimum} to ${c.maximum} in increments of ${c.step}.`)}let i=n??t.appearance_id;if(!r.appearances.some((a)=>a.appearance_id===i))throw pe("Select an appearance available for this butterfly.");return{parameters:{...t.parameters,...e},appearance_id:i}}var Uo={en:{title:"Picture guide",span:"Flat wingspan",left:"Left tab",right:"Right tab",paint:"Colors",up:"up",down:"down",flat:"flat",palette:{natural:"Field colors",carnival:"Carnival",twilight:"Twilight",coloring:"Color your own"},look:"Look from behind the tail toward the nose.",page2:"Fold, tune and try",question:"Flight experiment",mm:"mm",reference:"In the wild",model:"Template",source:"Source",photo:"Photo",folds:"Build steps",tipHeight:"Target height at each outer tip",buildNote:"Optional build note: write down which steps needed help and the two tip heights you measured."},ru:{title:"Инструкция с рисунками",span:"Размах развёртки",left:"Левый язычок",right:"Правый язычок",paint:"Цвета",up:"вверх",down:"вниз",flat:"ровно",palette:{natural:"Окрас бабочки",carnival:"Карнавал",twilight:"Сумерки",coloring:"Раскрась сам"},look:"Смотри от хвоста к носу.",page2:"Сложи, настрой и запусти",question:"Опыт с полётом",mm:"мм",reference:"В природе",model:"Шаблон",source:"Исходник",photo:"Фото",folds:"Шаги сборки",tipHeight:"Высота края каждого крыла",buildNote:"По желанию запиши, на каких шагах понадобилась помощь и какой получилась высота с каждой стороны."},es:{title:"Guía ilustrada",span:"Envergadura en plano",left:"Aleta izquierda",right:"Aleta derecha",paint:"Colores",up:"arriba",down:"abajo",flat:"plana",palette:{natural:"Colores naturales",carnival:"Carnaval",twilight:"Atardecer",coloring:"Para colorear"},look:"Mira desde la cola hacia la punta.",page2:"Coloca el clip, ajusta y planea",question:"Experimento de vuelo",mm:"mm",reference:"En la naturaleza",model:"Patrón",source:"Archivo fuente",photo:"Foto",folds:"Pasos de montaje",tipHeight:"Altura de cada extremo",buildNote:"Si quieres, anota en qué pasos necesitaste ayuda y cuánto medía cada extremo."}},I=(t)=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");function Vt(t){let e=/^\/assets\/field-guide\/([a-z0-9-]+\.(svg|jpg))$/.exec(t);if(!e)throw Error("Unknown field-guide illustration");let n=W(new URL("../../apps/editor/assets/field-guide/"+e[1],"https://print.invalid/packages/print-export/build-guide.ts"));return"data:"+(e[2]==="svg"?"image/svg+xml":"image/jpeg")+";base64,"+n.toString("base64")}function Kt(t,e,n,r){let o=t[r],i=Uo[r],a=(b)=>b===0?"0° · "+i.flat:Math.abs(b)+"° "+(b>0?i.up:i.down),s=e.parameters,c=i.palette[e.appearance_id]??e.appearance_id,l=(b,k)=>"<div><dt>"+b+"</dt><dd>"+I(k)+"</dd></div>",d=[l(i.span,s.span_mm+" "+i.mm),l(i.left,a(s.left_trim_deg)),l(i.right,a(s.right_trim_deg)),l(i.paint,c)].join(""),p=K.find((b)=>b.species===t.id),h=Math.round(Ke(p,s.span_mm)),u=o.steps.map((b,k)=>`<section class="step"><span class="number">${k+1}</span>
    <div><h3>${I(b.title)}</h3><p>${I(b.body)}</p>${b.id==="fold"?`<p><strong>${i.tipHeight} · ≈ ${h} ${i.mm}</strong></p>`:""}</div>
    <img src="${Vt(b.diagram)}" alt=""></section>`),f=t.photo.local_path?`<img class="photo" src="${Vt(t.photo.local_path)}" alt="${I(o.photo_alt)}">`:"",g=I(o.common_name),y=I(e.ref.design_id)+" / "+I(e.ref.revision_id);return`<!doctype html><html lang="${r}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${g} · ${i.title} · Open Flight</title><style>
@page{size:${n==="A4"?"A4":"Letter"};margin:13mm}*{box-sizing:border-box}
body{background:#f2eee7;color:#29233a;font:16px/1.45 system-ui,sans-serif;margin:0}
article{max-width:780px;margin:20px auto;padding:32px 38px;background:white;border-radius:16px}
header{display:flex;align-items:center;justify-content:space-between;font-size:.8em;font-weight:700;color:#5e456d;border-bottom:2px solid #604479;padding-bottom:8px}
h1{font-size:2.5em;margin:14px 0 0;line-height:1.04}h2{font-size:1.45em;margin:17px 0 8px}h3{font-size:1.05em;margin:0}p{margin:4px 0 9px}
dl{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #bfb3c6;border-radius:9px;padding:10px 12px;margin:14px 0 4px;gap:9px}
dt{font-size:.75em}dd{font-size:1em;font-weight:700;margin:0}.step{display:grid;grid-template-columns:28px 1fr 34%;gap:11px;align-items:center;padding:10px 0;border-bottom:1px solid #dfd9e3;break-inside:avoid}
.number{display:grid;place-items:center;border:1px solid #7c5791;border-radius:50%;width:26px;height:26px;font-weight:700;color:#603979}.step img{display:block;width:100%;height:83px;object-fit:contain}
.nature{display:flex;align-items:center;gap:15px;margin-top:16px}.photo{width:28%;height:95px;border-radius:8px;object-fit:cover}
footer{font-size:.74em;color:#50485b;margin-top:11px;overflow-wrap:anywhere} a{color:#543474}
@media(max-width:540px){article{padding:16px;margin:8px}dl{grid-template-columns:1fr 1fr}.step{grid-template-columns:25px 1fr}.step img{grid-column:2}.nature{align-items:flex-start}}
@media print{body{background:white;font-size:10.5pt}article{max-width:none;margin:0;padding:0;break-after:page}article:last-of-type{break-after:auto}.step{padding:3.5mm 0}.step img{height:24mm}.nature img{height:24mm}h1{font-size:26pt}}
</style><article><header><b>Open Flight</b><span>${i.title} · 1 / 2</span></header>
<h1>${g}</h1><p><i>${I(t.scientific_name)}</i></p><dl>${d}</dl><p>${i.look}</p>
<h2>${i.folds}</h2>${u.slice(0,3).join("")}
<div class="nature">${f}<div><h3>${i.reference}</h3><p>${I(o.observation)}</p><small>${i.photo} · <a href="${I(t.photo.url)}">${I(t.photo.creator)} · Pixabay</a></small></div></div>
<footer>${i.model} · ${y}</footer></article>
<article><header><b>Open Flight · ${g}</b><span>${i.title} · 2 / 2</span></header><h2>${i.page2}</h2>
${u.slice(3).join("")}<h2>${i.question}</h2><p>${I(o.flight_question)}</p><p>${i.buildNote}</p>
<footer><a href="${I(t.trim_reference.url)}">${I(t.trim_reference.source)}</a> · <a href="${I(t.natural_history.url)}">${I(t.natural_history.source)}</a><br>${i.model} · ${y}<br>${i.source} SHA-256 · ${I(e.ref.source_sha256)}</footer></article></html>`}var Xt={monarch:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 12° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 12° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}},morpho:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 16° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 16° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}},swallowtail:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 10° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 10° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}}};var xe=JSON.parse(W(new URL("../field-guide/species.json","https://print.invalid/packages/product-core/content.ts"),"utf8")),$o=[["build-en","en","lesson","Build the Butterfly Glider","Cut, fold and set the clip.","content/en/butterfly-001/build.md"],["build-ru","ru","lesson","Соберите планер-бабочку","Вырежьте планер, согните крылья и установите скрепку.","content/ru/butterfly-001/build.md"],["build-es","es","lesson","Construye el planeador mariposa","Recorta, dobla y coloca el clip.","content/es/butterfly-001/build.md"],["garden-gate-en","en","game","Garden Gate","Count gate passes and measure landing error.","games/garden-gate/en.md"],["garden-gate-ru","ru","game","Садовые ворота","Считайте проходы и измеряйте расстояние до цветка.","games/garden-gate/ru.md"],["garden-gate-es","es","game","La puerta del jardín","Cuenta los cruces por la puerta y mide la distancia hasta la flor.","games/garden-gate/es.md"]],Ho=$o.map(([t,e,n,r,o,i])=>{let a=W(new URL("../../"+i,"https://print.invalid/packages/product-core/content.ts"),"utf8");return{ref:{activity_id:t,revision_id:"a1",content_sha256:V(a)},kind:n,title:r,locale:e,aircraft_kinds:["butterfly_glider"],summary:o,content_markdown:a,evidence_classification:n==="game"?"untested_activity":"instruction"}});function Jt(t,e,n){let r=t[e],o=n==="w1"&&e!=="es"?Xt[t.id][e]:void 0,i={en:"Build the ",ru:"Соберите планер «",es:"Construye la mariposa "}[e]+r.common_name+(e==="ru"?"»":""),a=["# "+i,r.observation,...r.steps.map((s,c)=>{let l=o&&(s.id==="fold"||s.id==="launch")?o[s.id]:s.body;return"## "+(c+1)+". "+s.title+`

`+l}),r.flight_question,"["+t.photo.creator+" · Pixabay]("+t.photo.url+")","["+t.trim_reference.source+"]("+t.trim_reference.url+")"].join(`

`)+`
`;return{ref:{activity_id:"workshop-"+t.id+"-"+e,revision_id:n,content_sha256:V(a)},kind:"lesson",title:i,locale:e,aircraft_kinds:["butterfly_glider"],summary:r.flight_question,evidence_classification:"instruction",content_markdown:a,species_id:t.id}}var Wo=xe.flatMap((t)=>["en","ru","es"].map((e)=>Jt(t,e,"w2"))),zo=xe.flatMap((t)=>["en","ru"].map((e)=>Jt(t,e,"w1"))),Qt=[...Ho,...Wo].sort((t,e)=>t.ref.activity_id<e.ref.activity_id?-1:t.ref.activity_id>e.ref.activity_id?1:0);function Zt(t,e){let n=(r)=>r.ref.activity_id===t&&r.ref.revision_id===e;return Qt.find(n)??zo.find(n)}function nn(t,e){return Qt.filter((n)=>(!e||n.locale===e)&&(n.kind==="game"||("species_id"in n?n.species_id===t:t===void 0)))}function er(t,e,n="en"){let r=e?.species_id,o=e?.parameters;return{schema_version:1,record_type:"flight_test",test_id:t.design_id+"-"+t.revision_id+"-planned",status:"planned",is_example:!1,evidence_kind:"physical",design:{design_id:t.design_id,revision:t.revision_id,source_sha256:t.source_sha256},protocol:{protocol_id:r?"wing-trim":"clip-position",revision:r?"w1":"b1",acceptance_rule:null,defined_at:null},setup:{aircraft_instance_id:null,material_spec:null,finished_mass_g:null,balance_mm_from_nose:null,launch_method:null,release_height_m:null,environment:null},performed_at:null,performed_by:null,trials:[],evidence_artifacts:[],review:{decision:"pending",reviewer:null,reviewed_at:null},notes:r&&o?n==="ru"?`Размах развёртки ${o.span_mm} мм. Если смотреть сзади, левый клапан ${o.left_trim_deg}°, правый ${o.right_trim_deg}°. Плюс означает сгиб вверх. Сравните плоские клапаны с одним изменённым. Чередуйте настройки по пять бросков с одной высоты. Используйте те же бумагу и скрепку. Запишите направление и место посадки при каждой попытке.`:n==="es"?`Montaje previsto de ${r}, envergadura en plano de ${o.span_mm} mm. Desde atrás, aleta izquierda ${o.left_trim_deg}° y derecha ${o.right_trim_deg}°. El signo + indica hacia arriba. Empieza con las aletas planas. Compara cinco lanzamientos con cada ajuste, cambiando una sola aleta. Mantén el mismo papel, clip y altura. Anota la dirección y el primer contacto con el suelo en cada intento.`:`Planned ${r} build, ${o.span_mm} mm flat span. Set left trim to ${o.left_trim_deg}° and right trim to ${o.right_trim_deg}°, viewed from behind (positive up). Start with flat tabs and change one tab. Alternate five gentle releases of each configuration with the same paper, clip and height. Record every landing and observed direction.`:{en:"Plan only. Record the actual station, stock, print calibration and launch conditions with the raw observations.",ru:"Запишите положение скрепки, бумагу, контроль масштаба и условия запуска вместе с наблюдениями.",es:"Anota la posición del clip, el papel, la escala de impresión y las condiciones de lanzamiento junto con las observaciones."}[n]}}function zn(t,e,n,r,o,i,a,s,c){let l=Hn(c),d={parameters:r,appearance_id:o,species_id:c},p=Ze(t,e,d),h={design_id:t,revision_id:e,source_sha256:V(p)};return{source:p,dto:{ref:h,head_revision_id:e,name:n,kind:"butterfly_glider",...c?{species_id:c}:{},visibility:i?"private":"public",parameters:r,parameter_definitions:l.parameter_definitions,appearance_id:o,supported_appearances:l.appearances,evidence_state:i?"modified_experiment":"concept",evidence_record_ids:[],geometry:en(d),created_at:s,provenance:{origin:a,parent:i,generator_revision:Je(c),rights:l.rights}}}}function nr(t,e,n){let{dto:r,source:o}=t,i=nn(r.species_id,e.locale),a=(e.activities??[]).map((c)=>{let l=i.find((d)=>d.ref.activity_id===c.activity_id&&d.ref.revision_id===c.revision_id&&d.ref.content_sha256===c.content_sha256);if(!l)throw pe("Select an exact activity revision in the requested language.");return l}),s=e.formats.some((c)=>c==="pdf"||c==="svg")?qt(r,e.page_size,e.locale):void 0;for(let c of e.formats)switch(c){case"svg":n("print-svg","image/svg+xml",ie(s));break;case"pdf":n("print-pdf","application/pdf",Pe(s));break;case"source_json":n("source","application/json",o);break;case"trial_sheet":n("trial","application/json",JSON.stringify(er(r.ref,r,e.locale),null,2)+`
`);break;case"illustrated_guide":{let l=xe.find((p)=>p.id===r.species_id);if(!l)throw pe("The picture guide is available for the three workshop butterflies.");let d=i.find((p)=>p.kind==="lesson");n("guide","text/html",Kt(l,r,e.page_size,e.locale),[d.ref]);break}case"instructions":case"activity_assets":{let l=c==="instructions"?"lesson":"game",p=(a.length?a:i).filter((h)=>h.kind===l);if(!p.length)throw pe("Select a matching "+l+" for "+c+" or omit the activity filter.");for(let h of new Set(p)){let u=r.ref.design_id+" / "+r.ref.revision_id+" / "+r.ref.source_sha256+`

`;n(l,"text/markdown",u+h.content_markdown,[h.ref])}break}}}var rr=["cut","center","wings","table","clip","launch"],Gn={en:[["Cut out your butterfly","Start with the colors up and the nose pointing away. Cut only around the outside edge. Keep the paper between the wings whole. Ask a helper to cut around the tight corners.","The butterfly is one piece, with three fold lines down the middle."],["Bring the wingtips together","Lift both wings until the tips meet and the colored faces touch. Pinch the dotted center crease from nose to tail.","The tips line up and the colors are inside."],["Fold each wing back","Ask a helper to pinch the folded strip, or hold it with one hand. Fold one whole wing out along its dash-dot line, then the other.","Each wing has its own crease, and the two layers of the strip still touch."],["Set the wings flat","Place the butterfly color-side down on a flat table. Keep the folded strip standing straight up as you gently press both wings onto the table.","Both wings touch the table. The folded strip stands between them."],["Turn over and add the clip","Turn it color-side up, with the folded strip underneath. Slide a small rounded paper clip (about 6–8 mm wide) onto the nose so it grips both layers. Look from the side and stop with the back of the clip directly under the dots by the folds.","The clip holds both layers. Both wings sit at the same height."],["Let it glide","Hold the folded strip just behind the clip. Point the nose straight ahead with both wings level, then let go with a gentle forward push.","Watch where it touches down first. Point to that spot, or mark it and compare five launches."]],es:[["Recorta tu mariposa","Pon los colores hacia arriba y apunta la punta hacia delante. Recorta solo el borde de fuera. Deja entera la parte entre las alas. Pide ayuda para recortar las esquinas más cerradas.","La mariposa queda en una sola pieza, con tres líneas de doblez en el centro."],["Junta las puntas de las alas","Levanta las dos alas hasta juntar sus puntas y las caras de color. Marca con los dedos el doblez central de puntos, de la punta a la cola.","Las puntas coinciden y el color queda dentro."],["Dobla cada ala hacia fuera","Pide ayuda para sujetar la tira doblada o sujétala con una mano. Dobla un ala entera hacia fuera por su línea de rayas y puntos, y luego la otra.","Cada ala tiene su propio doblez y las dos capas de la tira siguen juntas."],["Apoya las alas en la mesa","Pon la mariposa con el color hacia abajo sobre una mesa plana. Mantén la tira doblada de pie y presiona suavemente las dos alas contra la mesa.","Las dos alas tocan la mesa. La tira doblada queda de pie entre ellas."],["Dale la vuelta y pon el clip","Dale la vuelta para dejar el color arriba y la tira doblada debajo. Desliza un clip pequeño y redondeado (de unos 6–8 mm de ancho) en la punta, abrazando las dos capas. Mira de lado y deja el extremo trasero del clip justo debajo de los puntos junto a los dobleces.","El clip agarra las dos capas. Las alas quedan a la misma altura."],["Deja que planee","Sujeta la tira doblada justo detrás del clip. Apunta la punta hacia delante con las alas a la misma altura, y suelta la mariposa con un empujón suave.","Mira dónde toca el suelo por primera vez. Señala ese lugar, o márcalo y compara cinco lanzamientos."]],ru:[["Вырежи бабочку","Положи лист цветной стороной вверх, носом от себя. Вырежи бабочку только по внешнему краю. Оставь бумагу между крыльями целой. Попроси взрослого помочь с крутыми поворотами.","Бабочка осталась целой, а в центре видны три линии сгиба."],["Соедини кончики крыльев","Подними оба крыла, чтобы их кончики совпали, а цветные стороны соприкоснулись. Прижми пальцами сгиб по точкам от носа до хвоста.","Кончики совпадают, цветные стороны внутри."],["Отогни каждое крыло","Попроси взрослого придержать сложенную полоску или зажми её одной рукой. Отогни одно крыло целиком наружу по линии из штрихов и точек, потом второе.","У каждого крыла свой сгиб, а слои полоски прижаты друг к другу."],["Уложи крылья на стол","Положи бабочку цветной стороной вниз на ровный стол. Держи сложенную полоску торчком и мягко прижми оба крыла к столу.","Оба крыла касаются стола. Сложенная полоска стоит между ними."],["Переверни и надень скрепку","Переверни бабочку цветной стороной вверх, чтобы сложенная полоска оказалась снизу. Надень на нос маленькую закруглённую скрепку шириной около 6–8 мм, захватив оба слоя. Посмотри сбоку. Задний край скрепки должен быть прямо под точками у сгибов.","Скрепка держит оба слоя. Крылья на одной высоте."],["Отпусти бабочку в полёт","Держи сложенную полоску сразу за скрепкой. Направь нос прямо перед собой, выровняй крылья и отпусти бабочку лёгким толчком вперёд.","Заметь, где бабочка впервые коснулась пола. Покажи это место или отметь его и сравни пять запусков."]]},Go={en:{pattern:"Printed side up",center:"Center fold",wings:"Wing folds",rear:"From tail toward nose",side:"Side view",start:"Start",finish:"Finish",table:"Table",strip:"Folded strip",mark:"Back of clip",grip:"Hold here",nose:"Nose",mm:"mm"},es:{pattern:"Color hacia arriba",center:"Doblez central",wings:"Dobleces de las alas",rear:"De la cola a la punta",side:"Vista lateral",start:"Inicio",finish:"Final",table:"Mesa",strip:"Tira doblada",mark:"Parte trasera del clip",grip:"Sujeta aquí",nose:"Punta",mm:"mm"},ru:{pattern:"Цветом вверх",center:"Сгиб в центре",wings:"Сгибы крыльев",rear:"Вид от хвоста к носу",side:"Вид сбоку",start:"Начало",finish:"Конец",table:"Стол",strip:"Сложенная полоска",mark:"Задний край скрепки",grip:"Держи здесь",nose:"Нос",mm:"мм"}};function or(t="en"){return(Object.hasOwn(Gn,t)?Gn[t]:Gn.en).map(([n,r,o],i)=>({id:rr[i],title:n,action:r,check:o}))}var ae="#222432",tr="#17664d",Yn="#963512",ir="1 5",qn="8 4 1 4",Yo="#eadac4",Vn=(t)=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;"),_e=([t,e])=>`${t.toFixed(2)},${e.toFixed(2)}`,Te=(t)=>`M ${t.map(_e).join(" L ")}`,C=(t,e,n,r="middle")=>`<text x="${t}" y="${e}" text-anchor="${r}">${Vn(n)}</text>`,Ue=(t,e)=>`<path d="${Te(t)}" fill="none" stroke="${ae}" stroke-width="2" stroke-linecap="round" stroke-dasharray="${e}"/>`;function fe(t,e,n){let r=Math.atan2(n[1]-e[1],n[0]-e[0]),o=[-0.52,0.52].map((i)=>[n[0]-Math.cos(r+i)*9,n[1]-Math.sin(r+i)*9]);return`<path d="M ${_e(t)} Q ${_e(e)} ${_e(n)} M ${_e(o[0])} L ${_e(n)} L ${_e(o[1])}" fill="none" stroke="${Yn}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`}function qo(t,e){let n=t.replace("<svg ",'<svg x="20" y="25" width="360" height="184" aria-hidden="true" ').replaceAll(' id="',' id="lesson-');return`${C(200,17,e.pattern)}
    ${n}
    ${Ue([[20,223],[46,223]],ir)}${C(53,228,e.center,"start")}
    ${Ue([[211,223],[237,223]],qn)}${C(244,228,e.wings,"start")}`}function tn(t,e,n,r,o,i,a,s){let c=i?1:-1,l=e+c*s*Math.sin(r),d=Math.max(2,s*Math.cos(r));return[-1,1].map((p)=>{let h=[t+p*d,l],u=[h[0]+p*n*Math.cos(o),l+c*n*Math.sin(o)],f=[h,u].map(([g,y])=>[g-1.3*p*Math.sin(o),y+1.3*c*Math.cos(o)]);return`<path d="${Te([[t,e],h])}" fill="none" stroke="${ae}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="${Te([h,u])}" fill="none" stroke="${ae}" stroke-width="6" stroke-linecap="round"/>
      <path d="${Te([h,u])}" fill="none" stroke="#fff9ec" stroke-width="3.4" stroke-linecap="round"/>
      <path d="${Te(f)}" fill="none" stroke="${a}" stroke-width="1.7" stroke-linecap="round"/>`}).join("")}function Vo(t,e,n,r){let o=Math.PI/2,i=t===1;return`${C(200,30,e.rear)}
    ${C(100,69,e.start)}${C(300,69,e.finish)}
    <path d="M200 55v145" stroke="#ddd2c1"/>
    ${tn(100,174,62,i?0:o,i?0:o,!1,n,r)}
    ${tn(300,174,62,o,i?o:0,!1,n,r)}
    ${i?`
      ${fe([31,162],[31,129],[64,113])}${fe([169,162],[169,129],[136,113])}
      ${Ue([[100,182],[100,200]],ir)}${C(100,219,e.center)}
    `:`
      ${fe([91,101],[55,96],[43,132])}${fe([109,101],[145,96],[157,132])}
      ${Ue([[74,169],[91,160]],qn)}${Ue([[126,169],[109,160]],qn)}
      ${C(100,219,e.wings)}
    `}`}function Ko(t,e,n){return`${C(200,30,t.rear)}
    <path d="M28 145 H372 V186 H28 Z" fill="#eadac4"/>
    <path d="M28 145 H372" stroke="${ae}" stroke-width="2"/>
    ${tn(200,145-n,121,Math.PI/2,0,!0,e,n)}
    ${fe([75,83],[75,102],[75,125])}${fe([325,83],[325,102],[325,125])}
    <path d="M200 117V89" fill="none" stroke="${ae}" stroke-width="1.4"/>
    ${C(200,82,t.strip)}${C(200,173,t.table)}`}function Xo(t,e,n,r,o){let i=t===5,a=82,s=143,c=Math.min(3.15,280/n.body_length_mm),l=82+n.clip_station_mm*c,d=82+n.body_length_mm*c,p=n.keel_depth_mm*c,h=i?l+32:l;return`${C(200,27,e.rear)}
    ${tn(200,86,110,Math.PI/2,0,!1,r,o)}
    <path d="M196 75v10q4 10 8 0v-10" fill="none" stroke="${Yn}" stroke-width="2.4"/>
    ${C(200,121,e.side)}
    <path d="${Te([[82,143],[d,143],[d,143+p],[82,143+p]])} Z" fill="${Yo}" stroke="${ae}" stroke-width="1.8"/>
    <path d="M82 143H${d}" stroke="${r}" stroke-width="4"/>
    ${i?"":`<circle cx="${l}" cy="143" r="3" fill="${tr}"/><path d="M${l} 147v15" stroke="${tr}" stroke-dasharray="2 2"/>`}
    <path d="M${l} 161H85a6 6 0 0 1 0 -12h${l-82-10}a3 3 0 0 1 0 6h-${l-82-17}" fill="none" stroke="${ae}" stroke-width="2.5" stroke-linecap="round"/>
    ${i?`<circle cx="${h}" cy="156" r="7" fill="${Yn}"/>${fe([74,155],[56,155],[34,155])}`:`${fe([31,155],[52,155],[74,155])}`}
    <path d="M${h} 171v18h9" fill="none" stroke="${ae}" stroke-width="1.4"/>
    ${C(h+13,194,i?e.grip:e.mark,"start")}
    ${i?C(79,124,e.nose):`<path d="M82 209v8m0-4h${l-82}m0-4v8" stroke="${ae}"/>${C(l+10,218,`${n.clip_station_mm} ${e.mm}`,"start")}`}`}function ar(t,e,n,r){let o=t.locale,i=Number.isInteger(e)&&e>=0&&e<rr.length?e:0,a=Go[o],{title:s,action:c,check:l}=t.steps[i],d=1.875*t.keel_depth_mm,p;if(i===0)p=qo(r(),a);else if(i<3)p=Vo(i,a,n,d);else if(i===3)p=Ko(a,n,d);else p=Xo(i,a,t,n,d);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" role="img" lang="${o}" aria-label="${Vn(`${s}. ${c} ${l}`)}" font-family="system-ui, sans-serif" font-size="14" fill="${ae}">
    <title>${Vn(s)}</title>
    <rect width="400" height="240" rx="12" fill="#fffdf7"/>
    ${p}
  </svg>`}var sr=8,Kn=K[0].parameter_definitions.find(({name:t})=>t==="span_mm"),Jo=K.map(({species:t})=>t);function cr(t){let{minimum:e,maximum:n,step:r}=Kn;return Number.isInteger(t)&&t>=e&&t<=n&&(t-e)%r===0}var Qo="experimental_unvalidated",N="#272239",dr="#005A8D",$e="#813842",T="#254A36",lr="#FFFEF4",Zo=[0.65,1.05],ei=[2.8,0.9,0.55,0.9];function on(t){let e=K.find((n)=>n.species===t);if(!e)throw Error("Unknown folded butterfly species");return e}function pr(t={},e="en"){let{format:n="open-flight-folded-butterfly",revision:r="k1",species:o="monarch",appearance_id:i="natural",paper:a="A4"}=t;if(n!=="open-flight-folded-butterfly")throw Error("Unknown folded butterfly source format");if(r!=="k1")throw Error("Unknown folded butterfly revision");let s=on(o),{span_mm:c=s.parameters.span_mm}=t;if(!cr(c)){let{minimum:h,maximum:u,step:f}=Kn;throw Error(`Finished span must be from ${h} to ${u} mm in ${f} mm increments`)}if(!Object.hasOwn(s.palettes,i))throw Error("Unknown butterfly appearance");if(!Object.hasOwn(we,a))throw Error("Unknown paper size");if(!Object.hasOwn(sn,e))throw Error("Unknown print locale");let{nose_y:l,abdomen_y:d,clip_rear_from_nose_mm:p}=s.geometry;return{format:n,revision:r,species:o,span_mm:c,appearance_id:i,paper:a,locale:e,keel_depth_mm:sr,flat_span_mm:c+2*sr,clip_station_mm:p,body_length_mm:d-l,nose_y_mm:l,abdomen_y_mm:d,evidence:Qo,steps:or(e)}}function an(t){let e=on(t.species),n=ye(e),{nose_y_mm:r,abdomen_y_mm:o,keel_depth_mm:i,clip_station_mm:a}=t,s=(w)=>([L,E])=>[_(L+w*i),E],c=n.outline.map((w)=>j(w,t.span_mm)),l=c.findIndex(([w,L])=>w===0&&L===o),d=c.slice(0,l+1).map(s(1)),p=[c[l],...c.slice(l+1),c[0]].map(s(-1)),h=[...d,...p],u=[[-i,r],[i,r],[i,o],[-i,o]],f=[-i,0,i].map((w)=>({id:w===0?"center-valley":w<0?"left-mountain":"right-mountain",points:[[w,r],[w,o]],dash:w===0?Zo:ei,stroke:w===0?dr:$e,weight:0.46})),g=[-1,1].map((w)=>({id:w<0?"left-clip-stop":"right-clip-stop",points:[[w,r+a],[w*(i-1),r+a]],stroke:T,weight:0.56})),y=[-1,1].map((w)=>({id:w<0?"left-clip-shoulder":"right-clip-shoulder",points:Array.from({length:16},(L,E)=>{let B=E*Math.PI/8;return[_(w*(i+2.3)+0.65*Math.cos(B)),_(r+a+0.65*Math.sin(B))]}),closed:!0,fill:T,stroke:lr,weight:0.45})),b=Oe(e,t.appearance_id,t.span_mm,n),k=[{id:"paper-web",points:u,closed:!0,fill:"#FFFFFF"},{...b[0],id:"wing-background",points:d,stroke:void 0},{...b[0],id:"wing-background-left",points:p,stroke:void 0}];for(let w of b.slice(1))for(let L of[-1,1]){let E=ni(w,L);for(let[B,Y]of E.entries())k.push({...w,id:w.id+(L<0?"-l-":"-r-")+B,points:Y.map(s(L))})}for(let w of[...f,...g])k.push({...w,id:w.id+"-halo",weight:1.25,stroke:lr,dash:void 0},w);return k.push(...y),k.push({id:"cut",points:h,closed:!0,stroke:N,weight:0.52}),{outline:h,web:u,left:p,right:d,originalOutline:c,creases:f,clipStops:g,shoulders:y,lines:k}}function ni(t,e){let n=t.points,r=([s])=>s*e>=0;if(n.every(r))return[n];if(!n.some(([s])=>s*e>0))return[];let o=([s,c],[l,d])=>[0,_(c-(d-c)*s/(l-s))];if(t.closed){let s=n.flatMap((c,l)=>{let d=n[(l+n.length-1)%n.length],p=r(d)===r(c)?[]:[o(d,c)];if(r(c))p.push(c);return p});return s.length>=3?[s]:[]}let i=[],a=r(n[0])?[n[0]]:[];for(let s=1;s<n.length;s++){let c=n[s-1],l=n[s];if(r(c)!==r(l)){if(a.push(o(c,l)),!r(l)){if(a.length>1)i.push(a);a=[]}}if(r(l))a.push(l)}if(a.length>1)i.push(a);return i}var sn={en:{names:{monarch:"Monarch",morpho:"Blue morpho",swallowtail:"Swallowtail"},note:"Experimental folded body · Physical build and flight trials pending",print:"Print at 100% / actual size. Measure this line before cutting.",labels:["Cut","Center valley","Wing mountains","Clip stop"],build:"Build with scissors and one small rounded paper clip",span:"finished span",flat:"flat span",rear:"View from tail toward nose",guide:"How to build and launch",next:"Open page 2 for illustrated steps.",gauge:"Full-size nose and clip gauge",gaugeHelp:"Place the folded body on its side. Match its nose to the left line.",gaugeStop:"The back end of the clip should meet the green line.",nose:"Nose",clip:"Back of clip",assembledTop:"Assembled · top view",assembledRear:"Tail view · both wings level",keelLayers:"Two layers touch"},es:{names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Cola de golondrina"},note:"Cuerpo plegado experimental · Pendiente de probar en papel y en vuelo",print:"Imprime al 100 % en tamaño real. Mide esta línea antes de recortar.",labels:["Corte","Doblez central","Dobleces de alas","Tope del clip"],build:"Construye con tijeras y un clip pequeño y redondeado",span:"envergadura final",flat:"envergadura en plano",rear:"Vista de la cola a la punta",guide:"Cómo construir y lanzar",next:"Consulta la página 2 para ver los pasos ilustrados.",gauge:"Guía del clip a tamaño real",gaugeHelp:"Apoya de lado el cuerpo plegado. Alinea su punta con la línea izquierda.",gaugeStop:"El extremo trasero del clip debe llegar a la línea verde.",nose:"Punta",clip:"Extremo trasero",assembledTop:"Plegada · vista superior",assembledRear:"Desde la cola · alas al mismo nivel",keelLayers:"Las dos capas se tocan"},ru:{names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},note:"Опытный сложенный корпус · Сборку и полёт ещё предстоит испытать",print:"Печатай в масштабе 100%. Перед вырезанием измерь эту линию.",labels:["Разрез","Сгиб в центре","Сгибы крыльев","Метка скрепки"],build:"Для сборки нужны ножницы и небольшая закруглённая скрепка",span:"размах крыльев",flat:"размах развёртки",rear:"Вид от хвоста к носу",guide:"Сборка и запуск",next:"На странице 2 — пошаговые рисунки.",gauge:"Шкала для скрепки в натуральную величину",gaugeHelp:"Положи сложенный корпус набок. Совмести нос с левой линией.",gaugeStop:"Задний край скрепки должен совпасть с зелёной линией.",nose:"Нос",clip:"Задний край",assembledTop:"В сборе · вид сверху",assembledRear:"Вид с хвоста · крылья на одном уровне",keelLayers:"Два слоя соприкасаются"}};function He(t,e,n,r=1){return t.map((o)=>({...o,points:o.points.map(([i,a])=>[_(e+r*i),_(n+r*a)])}))}function rn(t,e){let n=[],r="";for(let o of t.split(" ")){let i=r?r+" "+o:o;if(r&&i.length>e)n.push(r),r=o;else r=i}if(r)n.push(r);return n}function ur(t,e,n){let r=[],o=(a,s,c=N,l=0.48)=>r.push({id:t+"-"+a,points:s,stroke:c,weight:l}),i=(a,s)=>{o(a,s,$e);let[c,l]=s.at(-1),[d,p]=s.at(-2),h=Math.atan2(l-p,c-d),u=(f)=>[c-1.45*Math.cos(h+f),l-1.45*Math.sin(h+f)];o(a+"-tip",[u(0.48),[c,l],u(-0.48)],$e)};if(t==="cut"){let s=Math.min(...n.outline.map((c)=>c[1]));o("shape",n.outline.map(([c,l])=>[c*0.11,(l-s)*0.11])),r[0].closed=!0;for(let c of n.creases)o(c.id,c.points.map(([l,d])=>[l*0.11,(d-s)*0.11]),c.stroke,0.32)}else if(t==="center")o("paper",[[-12,5],[-4,5],[0,5],[4,5],[12,5]]),o("valley",[[0,4.45],[0,5.55]],dr,0.85),i("left-arrow",[[-12,4],[-10,1.8],[-7,0.5]]),i("right-arrow",[[12,4],[10,1.8],[7,0.5]]);else if(t==="wings")o("pinched",[[-1,7],[-1,2],[-1,0]],N),o("pinched-other",[[1,7],[1,2],[1,0]],N),o("crease",[[-1,3],[1,3]],$e,0.65),i("left-arrow",[[-2,1],[-6,1.5],[-10,4]]),i("right-arrow",[[2,1],[6,1.5],[10,4]]);else if(t==="table")o("table",[[-15,6.5],[15,6.5]],"#66736F",0.7),o("paper",[[-12,6],[-0.55,6],[-0.55,0.5],[0.55,0.5],[0.55,6],[12,6]]),i("left-press",[[-8,0],[-8,4.9]]),i("right-press",[[8,0],[8,4.9]]);else if(t==="clip"){let s=-12+e.clip_station_mm*0.69;o("wall",[[-12,0.5],[13,0.5],[13,7.5],[-12,7.5],[-12,0.5]]),o("stop",[[s,1.1],[s,6.9]],T,0.52),o("clip",[[-13.8,4.6],[s-1.2,4.6],[s,3.8],[s-1.2,3],[-12.65,3]],$e,0.62)}else o("level",[[-12,1.5],[0,1.5],[12,1.5]]),o("grip",[[-0.48,1.5],[-0.48,7.1],[0.48,7.1],[0.48,1.5]]),o("finger-left",[[-3.2,4.7],[-2.1,6.15],[-0.55,6.15]],T),o("finger-right",[[3.2,4.7],[2.1,6.15],[0.55,6.15]],T);return r}function hr(t,e,n=!1){let[r,o]=we[t.paper],i=sn[t.locale],a=He(e.lines,r/2,29),s=[],c=(d,p,h,u,f=N)=>s.push({x:d,y:p,text:h,size:u,color:f});c(9,10,"OPEN FLIGHT  /  K1",3.2,T),c(9,18,i.names[t.species],6.1),c(9,24,i.note,2.8),c(9,28.6,`${t.span_mm} mm ${i.span}  ·  ${t.flat_span_mm} mm ${i.flat}`,2.6);let l=[{id:"key-cut",stroke:N,weight:0.52},{...e.creases[1],id:"key-center"},{...e.creases[0],id:"key-wings"},{...e.clipStops[0],id:"key-clip"}];for(let[d,p]of l.entries()){let h=9+d*((r-18)/l.length);a.push({...p,points:[[h,132],[h+10,132]]}),c(h+12,133,i.labels[d],2.6)}a.push({id:"ruler",points:[[9,143],[59,143]],stroke:N,weight:0.44});for(let d=0;d<=50;d+=5)a.push({id:"ruler-tick-"+d,points:[[9+d,143],[9+d,d%10===0?140.2:141.3]],stroke:N,weight:0.32});if(c(62,143.5,"50 mm  ·  "+i.print,2.85),c(9,151,i.build,3.45,T),n){c(9,157,i.next,3.35,T);let d=(r-18)/2;t.steps.forEach((f,g)=>c(9+g%2*d,169+Math.floor(g/2)*9,g+1+". "+f.title,3.8));let p=10,h=218,u=p+t.clip_station_mm;a.push({id:"gauge-wall",points:[[p,h],[p+39,h],[p+39,h+8],[p,h+8]],closed:!0,fill:"#E6EEEB",stroke:"#788F84",weight:0.29},{id:"gauge-nose",points:[[p,h-1.3],[p,h+9.3]],stroke:N,weight:0.44},{id:"gauge-clip-stop",points:[[u,h-1.3],[u,h+9.3]],stroke:T,weight:0.62}),c(p,202,i.gauge,4.5),c(p,h+15,i.nose,2.75),c(u,h+15,i.clip,2.75,T),c(p,h+21,t.clip_station_mm+" mm",3.2),c(58,h+2.1,i.gaugeHelp,3.3),c(58,h+8.1,i.gaugeStop,3.3)}else{c(9,155.5,i.rear+" (2–4, 6)",2.35);let d=(r-18)/2;for(let[p,h]of t.steps.entries()){let u=9+p%2*d,f=163+Math.floor(p/2)*36;a.push(...He(ur(h.id,t,e),u+17,f-4.7)),c(u,f+9,p+1+". "+h.title,3);let g=f+13.7;for(let y of rn(h.action,67))c(u,g,y,2.43),g+=3.25;g+=0.5;for(let y of rn(h.check,67))c(u,g,y,2.43,T),g+=3.25}}return c(9,o-5.5,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",2.2),{width:r,height:o,lines:a,labels:s,locale:t.locale}}function mr(t,e){let[n,r]=we[t.paper],o=sn[t.locale],i=[],a=[{x:9,y:10,text:"OPEN FLIGHT  /  K1",size:3.2,color:T},{x:9,y:20,text:o.guide,size:6.1},{x:9,y:26.5,text:o.rear+" (2–4, 6)",size:3.15}],s=33;for(let[c,l]of t.steps.entries()){i.push({id:"step-rule-"+c,points:[[9,s],[n-9,s]],stroke:"#B7C7C0",weight:0.32},...He(ur(l.id,t,e),34,s+10,1.48));let d=62;a.push({x:d,y:s+7.45,text:c+1+". "+l.title,size:4.12,color:T});let p=s+13.7;for(let h of rn(l.action,65))a.push({x:d,y:p,text:h,size:3.53}),p+=4.75;p+=1.15;for(let h of rn(l.check,65))a.push({x:d,y:p,text:h,size:3.53,color:T}),p+=4.75;s=Math.max(s+34,p-0.5)}return a.push({x:9,y:r-5.5,text:"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",size:2.2}),{width:n,height:r,lines:i,labels:a}}function fr(t,e=!1){return ie(hr(t,an(t),e)).toString("utf8")}function ti(t){return ie(mr(t,an(t))).toString("utf8")}function gr(t){let e=an(t);return Pe(hr(t,e,!0),[mr(t,e)])}function br(t){let{format:e,revision:n,species:r,span_mm:o,appearance_id:i,paper:a}=t;return JSON.stringify({format:e,revision:n,species:r,span_mm:o,appearance_id:i,paper:a},null,2)+`
`}function yr(t){let e=an(t),n=e.outline.map((s)=>s[1]),r=Math.min(...n),o=Math.max(...n),i=t.flat_span_mm+6,a=_(o-r+6);return ie({width:i,height:a,lines:He(e.lines,i/2,3-r),labels:[]}).toString("utf8").replace(` width="${i}mm" height="${a}mm"`,"")}function ri(t,e){let n=on(t.species).palettes[t.appearance_id].base;return ar(t,e,n,()=>yr(t))}function oi(t){let e=on(t.species),n=ye(e),r=sn[t.locale],o=Oe(e,t.appearance_id,t.span_mm,n),i=n.outline.map((b)=>b[1]),a=12-Math.min(...i),s=Math.max(...i)+a,c=t.span_mm+12,l=c/2,d=_(s+23),p=_(d+t.keel_depth_mm),h=_(p+7),u=e.palettes[t.appearance_id],f=He(o.map((b)=>({...b,id:"assembled-"+b.id})),l,a),g=[{id:"rear-wing-plane",points:[[6,d],[c-6,d]],stroke:N,weight:0.76},{id:"rear-color-left",points:[[6,d-0.47],[l,d-0.47]],stroke:u.base,weight:0.47},{id:"rear-color-right",points:[[l,d-0.47],[c-6,d-0.47]],stroke:u.base,weight:0.47},{id:"rear-wall-left",points:[[l-0.31,d],[l-0.31,p]],stroke:N,weight:0.62},{id:"rear-wall-right",points:[[l+0.31,d],[l+0.31,p]],stroke:"#53596C",weight:0.62},{id:"rear-center-crease",points:[[l-0.31,p],[l+0.31,p]],stroke:N,weight:0.61},{id:"rear-depth-mark",points:[[l+4,d],[l+6,d],[l+6,p],[l+4,p]],stroke:T,weight:0.46}],y=[{x:6,y:7.5,text:r.assembledTop,size:3.65,color:N},{x:6,y:d-5.5,text:r.assembledRear,size:3.25,color:N},{x:l+9,y:p-2.6,text:t.keel_depth_mm+" mm",size:3.2,color:T},{x:l+9,y:p+1.7,text:r.keelLayers,size:2.7,color:T}];return ie({width:c,height:h,lines:[...f,...g],labels:y}).toString("utf8").replace(` width="${c}mm" height="${h}mm"`,"")}function ii(t){let e=K.find((l)=>l.species===t.species),n={...e.parameters,span_mm:t.span_mm},r=t.span_mm===e.parameters.span_mm&&t.appearance_id===e.appearance_id,o=r?e.model:"comparison-"+t.species+"-"+t.span_mm+"-"+t.appearance_id,i=r?e.baseline_revision:"pair1",a=Ve(e,o,i,n,t.appearance_id),s={design_id:o,revision_id:i,source_sha256:V(qe(a))},c=Xe(e,{ref:s,parameters:n,appearance_id:t.appearance_id},t.paper,t.locale);if(!r){let l=c.labels.find((d)=>d.text.includes("/v1/designs/"));if(l)l.text="Open Flight · W1 / "+e.species+" / "+t.span_mm+" mm / "+t.appearance_id}return Pe(c)}var Oa=()=>Bn(null,["pdf"]),ln=new Map(Gt.map((t)=>{let e=zn(t.model,t.baseline_revision,t.name,t.parameters,t.appearance_id,null,"original","2026-11-23T00:00:00Z",t.species);return[t.model,e]})),cn=new Map,Xn=new Map,ai="open-flight-designs-v1:"+new URL(".",import.meta.url).pathname,Jn=new Promise((t,e)=>{let n=indexedDB.open(ai,1);n.onupgradeneeded=()=>{n.result.createObjectStore("records"),n.result.createObjectStore("heads"),n.result.createObjectStore("receipts")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)}),We=(t)=>new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)}),se=(t)=>Response.json(t);async function xr(t,e,n){if(ln.has(t)&&ln.get(t).dto.ref.revision_id===e)return ln.get(t);let r=n??(await Jn).transaction(["records","heads"]),[o,i]=await Promise.all([We(r.objectStore("records").get([t,e])),We(r.objectStore("heads").get(t))]);if(!o||!i)throw Error("This design is unavailable on this device.");return{source:o.source,dto:{...o.dto,head_revision_id:i.ref.revision_id}}}async function dn(t,e){let n=await xr(t.design_id,t.revision_id,e);if(n.dto.ref.source_sha256!==t.source_sha256||n.dto.provenance.generator_revision!==Je(n.dto.species_id)||n.source!==Ze(t.design_id,t.revision_id,n.dto))throw Error("The saved source differs from this revision.");return n}async function si(t,e,n){let o=(await Jn).transaction(["records","heads","receipts"],"readwrite"),i=new Promise((l,d)=>{o.oncomplete=l,o.onerror=o.onabort=()=>d(o.error??Error("Save interrupted"))}),a=o.objectStore("receipts"),s=n.headers["Idempotency-Key"],c=JSON.stringify([t,n.headers["If-Match"],e]);try{let l=await We(a.get(s));if(l){if(l.fingerprint!==c)throw Error("This save key belongs to a different edit.");return await i,l.dto}let d,p,h;if(t){let g=await We(o.objectStore("heads").get(t));if(!g||n.headers["If-Match"]!=='"'+g.ref.revision_id+'"'){let y=Error("Reload the current revision before saving.");throw y.code="revision_conflict",y}d=(await dn(g.ref,o)).dto,p="r"+(Number(g.ref.revision_id.slice(1))+1),h=d.name}else{if(d=(await dn(e.source,o)).dto,h=String(e.name??"").trim(),!h||h.length>120)throw Error("Choose a name of up to 120 characters.");t="d-"+crypto.randomUUID(),p="r1"}let u=Wn(d,e.parameters,e.appearance_id),f=zn(t,p,h,u.parameters,u.appearance_id,d.ref,p==="r1"?"fork":"revision",new Date().toISOString(),d.species_id);return o.objectStore("records").add(f,[t,p]),o.objectStore("heads").put(f.dto,t),a.add({fingerprint:c,dto:f.dto},s),await i,f.dto}catch(l){try{o.abort()}catch{}throw await i.catch(()=>{}),l}}function wr(t,e,n){let r=t+"-"+crypto.randomUUID();return cn.set(r,new Blob([n],{type:e})),{artifact_id:r}}async function ja(t,e={}){try{e.signal?.throwIfAborted();let n=new URL(t,location.origin),[,,r,o,i,a]=n.pathname.split("/"),s=e.body?JSON.parse(e.body):{};switch(r){case"capabilities":return se({enabled_operations:["previewDraft","previewDesign","forkDesign","reviseDesign","startExport","listDesigns","listActivities","getDesignRevision","getFieldGuide"]});case"field-guide":return se({species:xe});case"designs":{if(e.method==="POST")return se(await si(o,s,e));if(o)return se((await xr(o,a)).dto);let c=await We((await Jn).transaction("heads").objectStore("heads").getAll());return se({items:[...ln.values()].map((l)=>l.dto).concat(c),next_cursor:null})}case"activities":{if(o)return se(Zt(o,a));let c=n.searchParams.get("species_id");return se({items:nn(c==="legacy"?void 0:c,n.searchParams.get("locale")),next_cursor:null})}case"previews":{let c=(await dn(s.design)).dto,l={...c,...Wn(c,s.parameters,s.appearance_id)},d=Yt(l),p=o==="draft"?d.toString("utf8"):wr("preview","image/svg+xml",d);return se({svg:p,geometry:en(l),is_flight_simulation:!1})}case"exports":{let c=await dn(s.design);await Bn(xe.find((p)=>p.id===c.dto.species_id),s.formats);let l=[];nr(c,s,(p,h,u)=>l.push(wr(p,h,u).artifact_id));let d={job_id:"job-"+crypto.randomUUID(),status:"succeeded",artifact_ids:l};return Xn.set(d.job_id,d),se(d)}case"jobs":if(Xn.has(o))return se(Xn.get(o));break;case"artifacts":if(cn.has(o)){let c=cn.get(o);return cn.delete(o),new Response(c,{headers:{"Content-Type":c.type}})}break}return Response.json({message:"Unknown workshop resource."},{status:404})}catch(n){if(n.name==="AbortError")throw n;return Response.json({code:n.code,message:n.message},{status:400})}}export{ii as classicComparisonPdf,oi as foldedFinishedPreview,ti as foldedGuideSvg,ri as foldedLessonSvg,gr as foldedPdf,yr as foldedPreview,br as foldedSource,Kn as foldedSpanSpec,Jo as foldedSpecies,fr as foldedSvg,cr as isFoldedSpan,pr as makeFoldedButterfly,Oa as prepareFoldedPdf,ja as publicRequest};
