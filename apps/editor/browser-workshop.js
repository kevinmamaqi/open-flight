var Uo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var or=Uo(function(_a){_a.byteLength=ha;_a.toByteArray=fa;_a.fromByteArray=ya;var ve=[],we=[],ma=typeof Uint8Array<"u"?Uint8Array:Array,jn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(We=0,Nn=jn.length;We<Nn;++We)ve[We]=jn[We],we[jn.charCodeAt(We)]=We;var We,Nn;we[45]=62;we[95]=63;function nr(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");if(n===-1)n=t;var o=n===t?0:4-n%4;return[n,o]}function ha(e){var t=nr(e),n=t[0],o=t[1];return(n+o)*3/4-o}function ua(e,t,n){return(t+n)*3/4-n}function fa(e){var t,n=nr(e),o=n[0],r=n[1],i=new ma(ua(e,o,r)),a=0,s=r>0?o-4:o,l;for(l=0;l<s;l+=4)t=we[e.charCodeAt(l)]<<18|we[e.charCodeAt(l+1)]<<12|we[e.charCodeAt(l+2)]<<6|we[e.charCodeAt(l+3)],i[a++]=t>>16&255,i[a++]=t>>8&255,i[a++]=t&255;if(r===2)t=we[e.charCodeAt(l)]<<2|we[e.charCodeAt(l+1)]>>4,i[a++]=t&255;if(r===1)t=we[e.charCodeAt(l)]<<10|we[e.charCodeAt(l+1)]<<4|we[e.charCodeAt(l+2)]>>2,i[a++]=t>>8&255,i[a++]=t&255;return i}function ga(e){return ve[e>>18&63]+ve[e>>12&63]+ve[e>>6&63]+ve[e&63]}function ba(e,t,n){var o,r=[];for(var i=t;i<n;i+=3)o=(e[i]<<16&16711680)+(e[i+1]<<8&65280)+(e[i+2]&255),r.push(ga(o));return r.join("")}function ya(e){var t,n=e.length,o=n%3,r=[],i=16383;for(var a=0,s=n-o;a<s;a+=i)r.push(ba(e,a,a+i>s?s:a+i));if(o===1)t=e[n-1],r.push(ve[t>>2]+ve[t<<4&63]+"==");else if(o===2)t=(e[n-2]<<8)+e[n-1],r.push(ve[t>>10]+ve[t>>4&63]+ve[t<<2&63]+"=");return r.join("")}});var rr=Uo(function(Fa){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Fa.read=function(e,t,n,o,r){var i,a,s=r*8-o-1,l=(1<<s)-1,c=l>>1,d=-7,p=n?r-1:0,h=n?-1:1,m=e[t+p];p+=h,i=m&(1<<-d)-1,m>>=-d,d+=s;for(;d>0;i=i*256+e[t+p],p+=h,d-=8);a=i&(1<<-d)-1,i>>=-d,d+=o;for(;d>0;a=a*256+e[t+p],p+=h,d-=8);if(i===0)i=1-c;else if(i===l)return a?NaN:(m?-1:1)*(1/0);else a=a+Math.pow(2,o),i=i-c;return(m?-1:1)*a*Math.pow(2,i-o)};Fa.write=function(e,t,n,o,r,i){var a,s,l,c=i*8-r-1,d=(1<<c)-1,p=d>>1,h=r===23?Math.pow(2,-24)-Math.pow(2,-77):0,m=o?0:i-1,u=o?1:-1,f=t<0||t===0&&1/t<0?1:0;if(t=Math.abs(t),isNaN(t)||t===1/0)s=isNaN(t)?1:0,a=d;else{if(a=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-a))<1)a--,l*=2;if(a+p>=1)t+=h/l;else t+=h*Math.pow(2,1-p);if(t*l>=2)a++,l/=2;if(a+p>=d)s=0,a=d;else if(a+p>=1)s=(t*l-1)*Math.pow(2,r),a=a+p;else s=t*Math.pow(2,p-1)*Math.pow(2,r),a=0}for(;r>=8;e[n+m]=s&255,m+=u,s/=256,r-=8);a=a<<r|s,c+=r;for(;c>0;e[n+m]=a&255,m+=u,a/=256,c-=8);e[n+m-u]|=f*128}});var ra=(e)=>e/4294967296|0,ia=(e)=>e>>>0;function Ho(e,t,n,o){let r=ra(n),i=ia(n);e.setUint32(t,o?i:r,o),e.setUint32(t+4,o?r:i,o)}function zo(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in e&&e.BYTES_PER_ELEMENT===1}var On=(e)=>e?`"${e}" `:"";function aa(e,t=""){if(typeof e!=="number")throw TypeError(On(t)+"expected number, got "+typeof e);if(!Number.isSafeInteger(e)||e<0)throw RangeError(On(t)+"expected integer >= 0, got "+e);return e}function Vt(e,t,n=""){if(zo(e)&&(t===void 0||e.length===t))return e;if(t!==void 0)aa(t,"length");let o=zo(e),r=t!==void 0?` of length ${t}`:"",i=o?`length=${e.length}`:`type=${typeof e}`,a=On(n)+"expected Uint8Array"+r+", got "+i;if(!o)throw TypeError(a);throw RangeError(a)}var sa=(e,t)=>{if(e===null||typeof e!=="object"||Array.isArray(e))throw TypeError((t==="object"?"":`"${t}" `)+"expected object, got type="+typeof e)},Wo=(e,t)=>{sa(e,t);let n=Object.getPrototypeOf(e);if(n!==Object.prototype&&n!==null)throw TypeError(`"${t}" expected plain object`);if(Object.hasOwn(e,"__proto__"))throw TypeError(`"${t}.__proto__" is not allowed`)};function $n(e,t=!0){if(e.destroyed)throw Error("hash was destroyed");if(t&&e.finished)throw Error("digest() was already called")}function Ko(e,t){Vt(e,void 0,"output");let n=t.outputLen;if(!(e.length>=n))throw RangeError('"output" expected length >= '+n)}function Dn(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function Jt(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function ke(e,t){return e<<32-t|e>>>t}var la=(()=>typeof Uint8Array.from([]).toHex==="function"&&typeof Uint8Array.fromHex==="function")(),ca=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function Go(e){if(Vt(e),la)return e.toHex();let t="";for(let n=0;n<e.length;n++)t+=ca[e[n]];return t}function da(e,t,n="opts"){if(Wo(e,"defaults"),t!==void 0)Wo(t,n);return Object.assign(Object.create(null),e,t)}function qo(e,t={}){if(typeof e!=="function")throw TypeError('"hashCons" expected function, got type='+typeof e);t=da({},t,"info");let n=(r,i)=>e(i).update(r).digest(),o=e(void 0);return n.outputLen=o.outputLen,n.blockLen=o.blockLen,n.canXOF=o.canXOF,n.create=(r)=>e(r),Object.assign(n,t),Object.freeze(n)}var Yo=(e)=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])});function Vo(e,t,n){return e&t^~e&n}function Jo(e,t,n){return e&t^e&n^t&n}class Rn{blockLen;outputLen;canXOF=!1;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(e,t,n,o){this.blockLen=e,this.outputLen=t,this.padOffset=n,this.isLE=o,this.buffer=new Uint8Array(e),this.view=Jt(this.buffer)}update(e){$n(this),Vt(e);let{view:t,buffer:n,blockLen:o}=this,r=e.length,i=!1;for(let a=0;a<r;){let s=Math.min(o-this.pos,r-a);if(s===o){let l=Jt(e);for(;o<=r-a;a+=o)this.process(l,a);i=!0;continue}if(n.set(a===0&&s===r?e:e.subarray(a,a+s),this.pos),this.pos+=s,a+=s,this.pos===o)this.process(t,0),this.pos=0,i=!0}if(this.length+=e.length,i)this.roundClean();return this}digestInto(e){$n(this),Ko(e,this),this.finished=!0;let{buffer:t,view:n,blockLen:o,isLE:r}=this,{pos:i}=this;if(t[i++]=128,t.fill(0,i),this.padOffset>o-i)this.process(n,0),t.fill(0);Ho(n,o-8,this.length*8,r),this.process(n,0),this.roundClean();let a=e===t?n:Jt(e),s=this.outputLen,l=s/4,c=this.get();if(s%4||l>c.length)throw Error("invalid outputLen");for(let d=0;d<l;d++)a.setUint32(4*d,c[d],r)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let n=e.slice(0,t);return this.destroy(),n}_cloneIntoMeta(e){let{buffer:t,length:n,finished:o,destroyed:r,pos:i}=this;if(e.destroyed=r,e.finished=o,e.length=n,e.pos=i,i)e.buffer.set(t);return e}clone(){return this._cloneInto()}}var Xo=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var pa=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),ze=new Uint32Array(64);class Zo extends Rn{A=0;B=0;C=0;D=0;E=0;F=0;G=0;H=0;constructor(e,t){super(64,e,8,!1);this.A=t[0]|0,this.B=t[1]|0,this.C=t[2]|0,this.D=t[3]|0,this.E=t[4]|0,this.F=t[5]|0,this.G=t[6]|0,this.H=t[7]|0}get(){let{A:e,B:t,C:n,D:o,E:r,F:i,G:a,H:s}=this;return[e,t,n,o,r,i,a,s]}set(e,t,n,o,r,i,a,s){this.A=e|0,this.B=t|0,this.C=n|0,this.D=o|0,this.E=r|0,this.F=i|0,this.G=a|0,this.H=s|0}_cloneInto(e){return(e||=new this.constructor).set(...this.get()),this._cloneIntoMeta(e)}process(e,t){for(let d=0;d<16;d++,t+=4)ze[d]=e.getUint32(t,!1);for(let d=16;d<64;d++){let p=ze[d-15],h=ze[d-2],m=ke(p,7)^ke(p,18)^p>>>3,u=ke(h,17)^ke(h,19)^h>>>10;ze[d]=u+ze[d-7]+m+ze[d-16]|0}let{A:n,B:o,C:r,D:i,E:a,F:s,G:l,H:c}=this;for(let d=0;d<64;d++){let p=ke(a,6)^ke(a,11)^ke(a,25),h=c+p+Vo(a,s,l)+pa[d]+ze[d]|0,u=(ke(n,2)^ke(n,13)^ke(n,22))+Jo(n,o,r)|0;c=l,l=s,s=a,a=i+h|0,i=r,r=o,o=n,n=h+u|0}n=n+this.A|0,o=o+this.B|0,r=r+this.C|0,i=i+this.D|0,a=a+this.E|0,s=s+this.F|0,l=l+this.G|0,c=c+this.H|0,this.set(n,o,r,i,a,s,l,c)}roundClean(){Dn(ze)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),Dn(this.buffer)}}class Qo extends Zo{constructor(){super(32,Xo)}}var er=qo(()=>new Qo,Yo(1));function tr(){let e=er.create();return{update(t){return e.update(typeof t==="string"?new TextEncoder().encode(t):t),this},digest(){return Go(e.digest())}}}/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var Un=or(),dt=rr(),ir=typeof Symbol==="function"&&typeof Symbol.for==="function"?Symbol.for("nodejs.util.inspect.custom"):null;var ee=b;var xr=50;var Hn=2147483647;b.TYPED_ARRAY_SUPPORT=va();if(!b.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error==="function")console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function va(){try{let e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),e.foo()===42}catch(e){return!1}}Object.defineProperty(b.prototype,"parent",{enumerable:!0,get:function(){if(!b.isBuffer(this))return;return this.buffer}});Object.defineProperty(b.prototype,"offset",{enumerable:!0,get:function(){if(!b.isBuffer(this))return;return this.byteOffset}});function Oe(e){if(e>Hn)throw RangeError('The value "'+e+'" is invalid for option "size"');let t=new Uint8Array(e);return Object.setPrototypeOf(t,b.prototype),t}function b(e,t,n){if(typeof e==="number"){if(typeof t==="string")throw TypeError('The "string" argument must be of type string. Received type number');return Gn(e)}return cr(e,t,n)}b.poolSize=8192;function cr(e,t,n){if(typeof e==="string")return Aa(e,t);if(ArrayBuffer.isView(e))return Sa(e);if(e==null)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(Ee(e,ArrayBuffer)||e&&Ee(e.buffer,ArrayBuffer))return Wn(e,t,n);if(typeof SharedArrayBuffer<"u"&&(Ee(e,SharedArrayBuffer)||e&&Ee(e.buffer,SharedArrayBuffer)))return Wn(e,t,n);if(typeof e==="number")throw TypeError('The "value" argument must not be of type number. Received type number');let o=e.valueOf&&e.valueOf();if(o!=null&&o!==e)return b.from(o,t,n);let r=La(e);if(r)return r;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof e[Symbol.toPrimitive]==="function")return b.from(e[Symbol.toPrimitive]("string"),t,n);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}b.from=function(e,t,n){return cr(e,t,n)};Object.setPrototypeOf(b.prototype,Uint8Array.prototype);Object.setPrototypeOf(b,Uint8Array);function dr(e){if(typeof e!=="number")throw TypeError('"size" argument must be of type number');else if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function Ea(e,t,n){if(dr(e),e<=0)return Oe(e);if(t!==void 0)return typeof n==="string"?Oe(e).fill(t,n):Oe(e).fill(t);return Oe(e)}b.alloc=function(e,t,n){return Ea(e,t,n)};function Gn(e){return dr(e),Oe(e<0?0:qn(e)|0)}b.allocUnsafe=function(e){return Gn(e)};b.allocUnsafeSlow=function(e){return Gn(e)};function Aa(e,t){if(typeof t!=="string"||t==="")t="utf8";if(!b.isEncoding(t))throw TypeError("Unknown encoding: "+t);let n=pr(e,t)|0,o=Oe(n),r=o.write(e,t);if(r!==n)o=o.slice(0,r);return o}function zn(e){let t=e.length<0?0:qn(e.length)|0,n=Oe(t);for(let o=0;o<t;o+=1)n[o]=e[o]&255;return n}function Sa(e){if(Ee(e,Uint8Array)){let t=new Uint8Array(e);return Wn(t.buffer,t.byteOffset,t.byteLength)}return zn(e)}function Wn(e,t,n){if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(n||0))throw RangeError('"length" is outside of buffer bounds');let o;if(t===void 0&&n===void 0)o=new Uint8Array(e);else if(n===void 0)o=new Uint8Array(e,t);else o=new Uint8Array(e,t,n);return Object.setPrototypeOf(o,b.prototype),o}function La(e){if(b.isBuffer(e)){let t=qn(e.length)|0,n=Oe(t);if(n.length===0)return n;return e.copy(n,0,0,t),n}if(e.length!==void 0){if(typeof e.length!=="number"||Vn(e.length))return Oe(0);return zn(e)}if(e.type==="Buffer"&&Array.isArray(e.data))return zn(e.data)}function qn(e){if(e>=Hn)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Hn.toString(16)+" bytes");return e|0}b.isBuffer=function(t){return t!=null&&t._isBuffer===!0&&t!==b.prototype};b.compare=function(t,n){if(Ee(t,Uint8Array))t=b.from(t,t.offset,t.byteLength);if(Ee(n,Uint8Array))n=b.from(n,n.offset,n.byteLength);if(!b.isBuffer(t)||!b.isBuffer(n))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===n)return 0;let o=t.length,r=n.length;for(let i=0,a=Math.min(o,r);i<a;++i)if(t[i]!==n[i]){o=t[i],r=n[i];break}if(o<r)return-1;if(r<o)return 1;return 0};b.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};b.concat=function(t,n){if(!Array.isArray(t))throw TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return b.alloc(0);let o;if(n===void 0){n=0;for(o=0;o<t.length;++o)n+=t[o].length}let r=b.allocUnsafe(n),i=0;for(o=0;o<t.length;++o){let a=t[o];if(Ee(a,Uint8Array))if(i+a.length>r.length){if(!b.isBuffer(a))a=b.from(a);a.copy(r,i)}else Uint8Array.prototype.set.call(r,a,i);else if(!b.isBuffer(a))throw TypeError('"list" argument must be an Array of Buffers');else a.copy(r,i);i+=a.length}return r};function pr(e,t){if(b.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||Ee(e,ArrayBuffer))return e.byteLength;if(typeof e!=="string")throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);let n=e.length,o=arguments.length>2&&arguments[2]===!0;if(!o&&n===0)return 0;let r=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return Kn(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return wr(e).length;default:if(r)return o?-1:Kn(e).length;t=(""+t).toLowerCase(),r=!0}}b.byteLength=pr;function Ba(e,t,n){let o=!1;if(t===void 0||t<0)t=0;if(t>this.length)return"";if(n===void 0||n>this.length)n=this.length;if(n<=0)return"";if(n>>>=0,t>>>=0,n<=t)return"";if(!e)e="utf8";while(!0)switch(e){case"hex":return Ua(this,t,n);case"utf8":case"utf-8":return hr(this,t,n);case"ascii":return ja(this,t,n);case"latin1":case"binary":return Na(this,t,n);case"base64":return Da(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ha(this,t,n);default:if(o)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),o=!0}}b.prototype._isBuffer=!0;function Ze(e,t,n){let o=e[t];e[t]=e[n],e[n]=o}b.prototype.swap16=function(){let t=this.length;if(t%2!==0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<t;n+=2)Ze(this,n,n+1);return this};b.prototype.swap32=function(){let t=this.length;if(t%4!==0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<t;n+=4)Ze(this,n,n+3),Ze(this,n+1,n+2);return this};b.prototype.swap64=function(){let t=this.length;if(t%8!==0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<t;n+=8)Ze(this,n,n+7),Ze(this,n+1,n+6),Ze(this,n+2,n+5),Ze(this,n+3,n+4);return this};b.prototype.toString=function(){let t=this.length;if(t===0)return"";if(arguments.length===0)return hr(this,0,t);return Ba.apply(this,arguments)};b.prototype.toLocaleString=b.prototype.toString;b.prototype.equals=function(t){if(!b.isBuffer(t))throw TypeError("Argument must be a Buffer");if(this===t)return!0;return b.compare(this,t)===0};b.prototype.inspect=function(){let t="",n=xr;if(t=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n)t+=" ... ";return"<Buffer "+t+">"};if(ir)b.prototype[ir]=b.prototype.inspect;b.prototype.compare=function(t,n,o,r,i){if(Ee(t,Uint8Array))t=b.from(t,t.offset,t.byteLength);if(!b.isBuffer(t))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(n===void 0)n=0;if(o===void 0)o=t?t.length:0;if(r===void 0)r=0;if(i===void 0)i=this.length;if(n<0||o>t.length||r<0||i>this.length)throw RangeError("out of range index");if(r>=i&&n>=o)return 0;if(r>=i)return-1;if(n>=o)return 1;if(n>>>=0,o>>>=0,r>>>=0,i>>>=0,this===t)return 0;let a=i-r,s=o-n,l=Math.min(a,s),c=this.slice(r,i),d=t.slice(n,o);for(let p=0;p<l;++p)if(c[p]!==d[p]){a=c[p],s=d[p];break}if(a<s)return-1;if(s<a)return 1;return 0};function mr(e,t,n,o,r){if(e.length===0)return-1;if(typeof n==="string")o=n,n=0;else if(n>2147483647)n=2147483647;else if(n<-2147483648)n=-2147483648;if(n=+n,Vn(n))n=r?0:e.length-1;if(n<0)n=e.length+n;if(n>=e.length)if(r)return-1;else n=e.length-1;else if(n<0)if(r)n=0;else return-1;if(typeof t==="string")t=b.from(t,o);if(b.isBuffer(t)){if(t.length===0)return-1;return ar(e,t,n,o,r)}else if(typeof t==="number"){if(t=t&255,typeof Uint8Array.prototype.indexOf==="function")if(r)return Uint8Array.prototype.indexOf.call(e,t,n);else return Uint8Array.prototype.lastIndexOf.call(e,t,n);return ar(e,[t],n,o,r)}throw TypeError("val must be string, number or Buffer")}function ar(e,t,n,o,r){let i=1,a=e.length,s=t.length;if(o!==void 0){if(o=String(o).toLowerCase(),o==="ucs2"||o==="ucs-2"||o==="utf16le"||o==="utf-16le"){if(e.length<2||t.length<2)return-1;i=2,a/=2,s/=2,n/=2}}function l(d,p){if(i===1)return d[p];else return d.readUInt16BE(p*i)}let c;if(r){let d=-1;for(c=n;c<a;c++)if(l(e,c)===l(t,d===-1?0:c-d)){if(d===-1)d=c;if(c-d+1===s)return d*i}else{if(d!==-1)c-=c-d;d=-1}}else{if(n+s>a)n=a-s;for(c=n;c>=0;c--){let d=!0;for(let p=0;p<s;p++)if(l(e,c+p)!==l(t,p)){d=!1;break}if(d)return c}}return-1}b.prototype.includes=function(t,n,o){return this.indexOf(t,n,o)!==-1};b.prototype.indexOf=function(t,n,o){return mr(this,t,n,o,!0)};b.prototype.lastIndexOf=function(t,n,o){return mr(this,t,n,o,!1)};function Ia(e,t,n,o){n=Number(n)||0;let r=e.length-n;if(!o)o=r;else if(o=Number(o),o>r)o=r;let i=t.length;if(o>i/2)o=i/2;let a;for(a=0;a<o;++a){let s=parseInt(t.substr(a*2,2),16);if(Vn(s))return a;e[n+a]=s}return a}function Ta(e,t,n,o){return Xt(Kn(t,e.length-n),e,n,o)}function Ca(e,t,n,o){return Xt(Ga(t),e,n,o)}function Oa(e,t,n,o){return Xt(wr(t),e,n,o)}function $a(e,t,n,o){return Xt(qa(t,e.length-n),e,n,o)}b.prototype.write=function(t,n,o,r){if(n===void 0)r="utf8",o=this.length,n=0;else if(o===void 0&&typeof n==="string")r=n,o=this.length,n=0;else if(isFinite(n))if(n=n>>>0,isFinite(o)){if(o=o>>>0,r===void 0)r="utf8"}else r=o,o=void 0;else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let i=this.length-n;if(o===void 0||o>i)o=i;if(t.length>0&&(o<0||n<0)||n>this.length)throw RangeError("Attempt to write outside buffer bounds");if(!r)r="utf8";let a=!1;for(;;)switch(r){case"hex":return Ia(this,t,n,o);case"utf8":case"utf-8":return Ta(this,t,n,o);case"ascii":case"latin1":case"binary":return Ca(this,t,n,o);case"base64":return Oa(this,t,n,o);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return $a(this,t,n,o);default:if(a)throw TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),a=!0}};b.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Da(e,t,n){if(t===0&&n===e.length)return Un.fromByteArray(e);else return Un.fromByteArray(e.slice(t,n))}function hr(e,t,n){n=Math.min(e.length,n);let o=[],r=t;while(r<n){let i=e[r],a=null,s=i>239?4:i>223?3:i>191?2:1;if(r+s<=n){let l,c,d,p;switch(s){case 1:if(i<128)a=i;break;case 2:if(l=e[r+1],(l&192)===128){if(p=(i&31)<<6|l&63,p>127)a=p}break;case 3:if(l=e[r+1],c=e[r+2],(l&192)===128&&(c&192)===128){if(p=(i&15)<<12|(l&63)<<6|c&63,p>2047&&(p<55296||p>57343))a=p}break;case 4:if(l=e[r+1],c=e[r+2],d=e[r+3],(l&192)===128&&(c&192)===128&&(d&192)===128){if(p=(i&15)<<18|(l&63)<<12|(c&63)<<6|d&63,p>65535&&p<1114112)a=p}}}if(a===null)a=65533,s=1;else if(a>65535)a-=65536,o.push(a>>>10&1023|55296),a=56320|a&1023;o.push(a),r+=s}return Ra(o)}var sr=4096;function Ra(e){let t=e.length;if(t<=sr)return String.fromCharCode.apply(String,e);let n="",o=0;while(o<t)n+=String.fromCharCode.apply(String,e.slice(o,o+=sr));return n}function ja(e,t,n){let o="";n=Math.min(e.length,n);for(let r=t;r<n;++r)o+=String.fromCharCode(e[r]&127);return o}function Na(e,t,n){let o="";n=Math.min(e.length,n);for(let r=t;r<n;++r)o+=String.fromCharCode(e[r]);return o}function Ua(e,t,n){let o=e.length;if(!t||t<0)t=0;if(!n||n<0||n>o)n=o;let r="";for(let i=t;i<n;++i)r+=Ya[e[i]];return r}function Ha(e,t,n){let o=e.slice(t,n),r="";for(let i=0;i<o.length-1;i+=2)r+=String.fromCharCode(o[i]+o[i+1]*256);return r}b.prototype.slice=function(t,n){let o=this.length;if(t=~~t,n=n===void 0?o:~~n,t<0){if(t+=o,t<0)t=0}else if(t>o)t=o;if(n<0){if(n+=o,n<0)n=0}else if(n>o)n=o;if(n<t)n=t;let r=this.subarray(t,n);return Object.setPrototypeOf(r,b.prototype),r};function Q(e,t,n){if(e%1!==0||e<0)throw RangeError("offset is not uint");if(e+t>n)throw RangeError("Trying to access beyond buffer length")}b.prototype.readUintLE=b.prototype.readUIntLE=function(t,n,o){if(t=t>>>0,n=n>>>0,!o)Q(t,n,this.length);let r=this[t],i=1,a=0;while(++a<n&&(i*=256))r+=this[t+a]*i;return r};b.prototype.readUintBE=b.prototype.readUIntBE=function(t,n,o){if(t=t>>>0,n=n>>>0,!o)Q(t,n,this.length);let r=this[t+--n],i=1;while(n>0&&(i*=256))r+=this[t+--n]*i;return r};b.prototype.readUint8=b.prototype.readUInt8=function(t,n){if(t=t>>>0,!n)Q(t,1,this.length);return this[t]};b.prototype.readUint16LE=b.prototype.readUInt16LE=function(t,n){if(t=t>>>0,!n)Q(t,2,this.length);return this[t]|this[t+1]<<8};b.prototype.readUint16BE=b.prototype.readUInt16BE=function(t,n){if(t=t>>>0,!n)Q(t,2,this.length);return this[t]<<8|this[t+1]};b.prototype.readUint32LE=b.prototype.readUInt32LE=function(t,n){if(t=t>>>0,!n)Q(t,4,this.length);return(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216};b.prototype.readUint32BE=b.prototype.readUInt32BE=function(t,n){if(t=t>>>0,!n)Q(t,4,this.length);return this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])};b.prototype.readBigUInt64LE=Ke(function(t){t=t>>>0,pt(t,"offset");let n=this[t],o=this[t+7];if(n===void 0||o===void 0)At(t,this.length-8);let r=n+this[++t]*256+this[++t]*65536+this[++t]*16777216,i=this[++t]+this[++t]*256+this[++t]*65536+o*16777216;return BigInt(r)+(BigInt(i)<<BigInt(32))});b.prototype.readBigUInt64BE=Ke(function(t){t=t>>>0,pt(t,"offset");let n=this[t],o=this[t+7];if(n===void 0||o===void 0)At(t,this.length-8);let r=n*16777216+this[++t]*65536+this[++t]*256+this[++t],i=this[++t]*16777216+this[++t]*65536+this[++t]*256+o;return(BigInt(r)<<BigInt(32))+BigInt(i)});b.prototype.readIntLE=function(t,n,o){if(t=t>>>0,n=n>>>0,!o)Q(t,n,this.length);let r=this[t],i=1,a=0;while(++a<n&&(i*=256))r+=this[t+a]*i;if(i*=128,r>=i)r-=Math.pow(2,8*n);return r};b.prototype.readIntBE=function(t,n,o){if(t=t>>>0,n=n>>>0,!o)Q(t,n,this.length);let r=n,i=1,a=this[t+--r];while(r>0&&(i*=256))a+=this[t+--r]*i;if(i*=128,a>=i)a-=Math.pow(2,8*n);return a};b.prototype.readInt8=function(t,n){if(t=t>>>0,!n)Q(t,1,this.length);if(!(this[t]&128))return this[t];return(255-this[t]+1)*-1};b.prototype.readInt16LE=function(t,n){if(t=t>>>0,!n)Q(t,2,this.length);let o=this[t]|this[t+1]<<8;return o&32768?o|4294901760:o};b.prototype.readInt16BE=function(t,n){if(t=t>>>0,!n)Q(t,2,this.length);let o=this[t+1]|this[t]<<8;return o&32768?o|4294901760:o};b.prototype.readInt32LE=function(t,n){if(t=t>>>0,!n)Q(t,4,this.length);return this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24};b.prototype.readInt32BE=function(t,n){if(t=t>>>0,!n)Q(t,4,this.length);return this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]};b.prototype.readBigInt64LE=Ke(function(t){t=t>>>0,pt(t,"offset");let n=this[t],o=this[t+7];if(n===void 0||o===void 0)At(t,this.length-8);let r=this[t+4]+this[t+5]*256+this[t+6]*65536+(o<<24);return(BigInt(r)<<BigInt(32))+BigInt(n+this[++t]*256+this[++t]*65536+this[++t]*16777216)});b.prototype.readBigInt64BE=Ke(function(t){t=t>>>0,pt(t,"offset");let n=this[t],o=this[t+7];if(n===void 0||o===void 0)At(t,this.length-8);let r=(n<<24)+this[++t]*65536+this[++t]*256+this[++t];return(BigInt(r)<<BigInt(32))+BigInt(this[++t]*16777216+this[++t]*65536+this[++t]*256+o)});b.prototype.readFloatLE=function(t,n){if(t=t>>>0,!n)Q(t,4,this.length);return dt.read(this,t,!0,23,4)};b.prototype.readFloatBE=function(t,n){if(t=t>>>0,!n)Q(t,4,this.length);return dt.read(this,t,!1,23,4)};b.prototype.readDoubleLE=function(t,n){if(t=t>>>0,!n)Q(t,8,this.length);return dt.read(this,t,!0,52,8)};b.prototype.readDoubleBE=function(t,n){if(t=t>>>0,!n)Q(t,8,this.length);return dt.read(this,t,!1,52,8)};function ce(e,t,n,o,r,i){if(!b.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>r||t<i)throw RangeError('"value" argument is out of bounds');if(n+o>e.length)throw RangeError("Index out of range")}b.prototype.writeUintLE=b.prototype.writeUIntLE=function(t,n,o,r){if(t=+t,n=n>>>0,o=o>>>0,!r){let s=Math.pow(2,8*o)-1;ce(this,t,n,o,s,0)}let i=1,a=0;this[n]=t&255;while(++a<o&&(i*=256))this[n+a]=t/i&255;return n+o};b.prototype.writeUintBE=b.prototype.writeUIntBE=function(t,n,o,r){if(t=+t,n=n>>>0,o=o>>>0,!r){let s=Math.pow(2,8*o)-1;ce(this,t,n,o,s,0)}let i=o-1,a=1;this[n+i]=t&255;while(--i>=0&&(a*=256))this[n+i]=t/a&255;return n+o};b.prototype.writeUint8=b.prototype.writeUInt8=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,1,255,0);return this[n]=t&255,n+1};b.prototype.writeUint16LE=b.prototype.writeUInt16LE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,2,65535,0);return this[n]=t&255,this[n+1]=t>>>8,n+2};b.prototype.writeUint16BE=b.prototype.writeUInt16BE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,2,65535,0);return this[n]=t>>>8,this[n+1]=t&255,n+2};b.prototype.writeUint32LE=b.prototype.writeUInt32LE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,4,4294967295,0);return this[n+3]=t>>>24,this[n+2]=t>>>16,this[n+1]=t>>>8,this[n]=t&255,n+4};b.prototype.writeUint32BE=b.prototype.writeUInt32BE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,4,4294967295,0);return this[n]=t>>>24,this[n+1]=t>>>16,this[n+2]=t>>>8,this[n+3]=t&255,n+4};function ur(e,t,n,o,r){_r(t,o,r,e,n,7);let i=Number(t&BigInt(4294967295));e[n++]=i,i=i>>8,e[n++]=i,i=i>>8,e[n++]=i,i=i>>8,e[n++]=i;let a=Number(t>>BigInt(32)&BigInt(4294967295));return e[n++]=a,a=a>>8,e[n++]=a,a=a>>8,e[n++]=a,a=a>>8,e[n++]=a,n}function fr(e,t,n,o,r){_r(t,o,r,e,n,7);let i=Number(t&BigInt(4294967295));e[n+7]=i,i=i>>8,e[n+6]=i,i=i>>8,e[n+5]=i,i=i>>8,e[n+4]=i;let a=Number(t>>BigInt(32)&BigInt(4294967295));return e[n+3]=a,a=a>>8,e[n+2]=a,a=a>>8,e[n+1]=a,a=a>>8,e[n]=a,n+8}b.prototype.writeBigUInt64LE=Ke(function(t,n=0){return ur(this,t,n,BigInt(0),BigInt("0xffffffffffffffff"))});b.prototype.writeBigUInt64BE=Ke(function(t,n=0){return fr(this,t,n,BigInt(0),BigInt("0xffffffffffffffff"))});b.prototype.writeIntLE=function(t,n,o,r){if(t=+t,n=n>>>0,!r){let l=Math.pow(2,8*o-1);ce(this,t,n,o,l-1,-l)}let i=0,a=1,s=0;this[n]=t&255;while(++i<o&&(a*=256)){if(t<0&&s===0&&this[n+i-1]!==0)s=1;this[n+i]=(t/a>>0)-s&255}return n+o};b.prototype.writeIntBE=function(t,n,o,r){if(t=+t,n=n>>>0,!r){let l=Math.pow(2,8*o-1);ce(this,t,n,o,l-1,-l)}let i=o-1,a=1,s=0;this[n+i]=t&255;while(--i>=0&&(a*=256)){if(t<0&&s===0&&this[n+i+1]!==0)s=1;this[n+i]=(t/a>>0)-s&255}return n+o};b.prototype.writeInt8=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,1,127,-128);if(t<0)t=255+t+1;return this[n]=t&255,n+1};b.prototype.writeInt16LE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,2,32767,-32768);return this[n]=t&255,this[n+1]=t>>>8,n+2};b.prototype.writeInt16BE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,2,32767,-32768);return this[n]=t>>>8,this[n+1]=t&255,n+2};b.prototype.writeInt32LE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,4,2147483647,-2147483648);return this[n]=t&255,this[n+1]=t>>>8,this[n+2]=t>>>16,this[n+3]=t>>>24,n+4};b.prototype.writeInt32BE=function(t,n,o){if(t=+t,n=n>>>0,!o)ce(this,t,n,4,2147483647,-2147483648);if(t<0)t=4294967295+t+1;return this[n]=t>>>24,this[n+1]=t>>>16,this[n+2]=t>>>8,this[n+3]=t&255,n+4};b.prototype.writeBigInt64LE=Ke(function(t,n=0){return ur(this,t,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});b.prototype.writeBigInt64BE=Ke(function(t,n=0){return fr(this,t,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function gr(e,t,n,o,r,i){if(n+o>e.length)throw RangeError("Index out of range");if(n<0)throw RangeError("Index out of range")}function br(e,t,n,o,r){if(t=+t,n=n>>>0,!r)gr(e,t,n,4,340282346638528860000000000000000000000,-340282346638528860000000000000000000000);return dt.write(e,t,n,o,23,4),n+4}b.prototype.writeFloatLE=function(t,n,o){return br(this,t,n,!0,o)};b.prototype.writeFloatBE=function(t,n,o){return br(this,t,n,!1,o)};function yr(e,t,n,o,r){if(t=+t,n=n>>>0,!r)gr(e,t,n,8,179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,-179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);return dt.write(e,t,n,o,52,8),n+8}b.prototype.writeDoubleLE=function(t,n,o){return yr(this,t,n,!0,o)};b.prototype.writeDoubleBE=function(t,n,o){return yr(this,t,n,!1,o)};b.prototype.copy=function(t,n,o,r){if(!b.isBuffer(t))throw TypeError("argument should be a Buffer");if(!o)o=0;if(!r&&r!==0)r=this.length;if(n>=t.length)n=t.length;if(!n)n=0;if(r>0&&r<o)r=o;if(r===o)return 0;if(t.length===0||this.length===0)return 0;if(n<0)throw RangeError("targetStart out of bounds");if(o<0||o>=this.length)throw RangeError("Index out of range");if(r<0)throw RangeError("sourceEnd out of bounds");if(r>this.length)r=this.length;if(t.length-n<r-o)r=t.length-n+o;let i=r-o;if(this===t&&typeof Uint8Array.prototype.copyWithin==="function")this.copyWithin(n,o,r);else Uint8Array.prototype.set.call(t,this.subarray(o,r),n);return i};b.prototype.fill=function(t,n,o,r){if(typeof t==="string"){if(typeof n==="string")r=n,n=0,o=this.length;else if(typeof o==="string")r=o,o=this.length;if(r!==void 0&&typeof r!=="string")throw TypeError("encoding must be a string");if(typeof r==="string"&&!b.isEncoding(r))throw TypeError("Unknown encoding: "+r);if(t.length===1){let a=t.charCodeAt(0);if(r==="utf8"&&a<128||r==="latin1")t=a}}else if(typeof t==="number")t=t&255;else if(typeof t==="boolean")t=Number(t);if(n<0||this.length<n||this.length<o)throw RangeError("Out of range index");if(o<=n)return this;if(n=n>>>0,o=o===void 0?this.length:o>>>0,!t)t=0;let i;if(typeof t==="number")for(i=n;i<o;++i)this[i]=t;else{let a=b.isBuffer(t)?t:b.from(t,r),s=a.length;if(s===0)throw TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<o-n;++i)this[i+n]=a[i%s]}return this};var ct={};function Yn(e,t,n){ct[e]=class extends n{constructor(){super();Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${e}]`,this.stack,delete this.name}get code(){return e}set code(r){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:r,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}Yn("ERR_BUFFER_OUT_OF_BOUNDS",function(e){if(e)return`${e} is outside of buffer bounds`;return"Attempt to access memory outside buffer bounds"},RangeError);Yn("ERR_INVALID_ARG_TYPE",function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`},TypeError);Yn("ERR_OUT_OF_RANGE",function(e,t,n){let o=`The value of "${e}" is out of range.`,r=n;if(Number.isInteger(n)&&Math.abs(n)>4294967296)r=lr(String(n));else if(typeof n==="bigint"){if(r=String(n),n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))r=lr(r);r+="n"}return o+=` It must be ${t}. Received ${r}`,o},RangeError);function lr(e){let t="",n=e.length,o=e[0]==="-"?1:0;for(;n>=o+4;n-=3)t=`_${e.slice(n-3,n)}${t}`;return`${e.slice(0,n)}${t}`}function za(e,t,n){if(pt(t,"offset"),e[t]===void 0||e[t+n]===void 0)At(t,e.length-(n+1))}function _r(e,t,n,o,r,i){if(e>n||e<t){let a=typeof t==="bigint"?"n":"",s;if(i>3)if(t===0||t===BigInt(0))s=`>= 0${a} and < 2${a} ** ${(i+1)*8}${a}`;else s=`>= -(2${a} ** ${(i+1)*8-1}${a}) and < 2 ** ${(i+1)*8-1}${a}`;else s=`>= ${t}${a} and <= ${n}${a}`;throw new ct.ERR_OUT_OF_RANGE("value",s,e)}za(o,r,i)}function pt(e,t){if(typeof e!=="number")throw new ct.ERR_INVALID_ARG_TYPE(t,"number",e)}function At(e,t,n){if(Math.floor(e)!==e)throw pt(e,n),new ct.ERR_OUT_OF_RANGE(n||"offset","an integer",e);if(t<0)throw new ct.ERR_BUFFER_OUT_OF_BOUNDS;throw new ct.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${t}`,e)}var Wa=/[^+/0-9A-Za-z-_]/g;function Ka(e){if(e=e.split("=")[0],e=e.trim().replace(Wa,""),e.length<2)return"";while(e.length%4!==0)e=e+"=";return e}function Kn(e,t){t=t||1/0;let n,o=e.length,r=null,i=[];for(let a=0;a<o;++a){if(n=e.charCodeAt(a),n>55295&&n<57344){if(!r){if(n>56319){if((t-=3)>-1)i.push(239,191,189);continue}else if(a+1===o){if((t-=3)>-1)i.push(239,191,189);continue}r=n;continue}if(n<56320){if((t-=3)>-1)i.push(239,191,189);r=n;continue}n=(r-55296<<10|n-56320)+65536}else if(r){if((t-=3)>-1)i.push(239,191,189)}if(r=null,n<128){if((t-=1)<0)break;i.push(n)}else if(n<2048){if((t-=2)<0)break;i.push(n>>6|192,n&63|128)}else if(n<65536){if((t-=3)<0)break;i.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((t-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw Error("Invalid code point")}return i}function Ga(e){let t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n)&255);return t}function qa(e,t){let n,o,r,i=[];for(let a=0;a<e.length;++a){if((t-=2)<0)break;n=e.charCodeAt(a),o=n>>8,r=n%256,i.push(r),i.push(o)}return i}function wr(e){return Un.toByteArray(Ka(e))}function Xt(e,t,n,o){let r;for(r=0;r<o;++r){if(r+n>=t.length||r>=e.length)break;t[r+n]=e[r]}return r}function Ee(e,t){return e instanceof t||e!=null&&e.constructor!=null&&e.constructor.name!=null&&e.constructor.name===t.name}function Vn(e){return e!==e}var Ya=function(){let t=Array(256);for(let n=0;n<16;++n){let o=n*16;for(let r=0;r<16;++r)t[o+r]="0123456789abcdef"[n]+"0123456789abcdef"[r]}return t}();function Ke(e){return typeof BigInt>"u"?Va:e}function Va(){throw Error("BigInt not supported")}var Jn={"/packages/geometry/butterfly.ts":`import { createHash } from 'node:crypto'
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
      "common_name": "Macaón",
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

Original Open Flight learning text. © Open Flight. Free to read, print and copy for personal, family and classroom use; all other rights reserved.
`,"/content/ru/butterfly-001/build.md":`# Соберите планер-бабочку

На листе указаны идентификатор модели, версия и хеш исходника. Инструкция подходит для генератора b1 и доступных в нём вариантов размаха. Выкройка экспериментальная.

1. Возьмите лист обычной офисной бумаги. Для первой пробы предлагается бумага плотностью около 90 г/м². Запишите, какую бумагу и скрепку вы использовали. Укажите плотность, если она известна.
2. Печатайте на выбранном листе A4 или US Letter в масштабе 100%. Отключите подгонку под страницу. Измерьте отдельной линейкой контрольный отрезок длиной 50 мм и запишите результат. Если расхождение больше 0,5 мм, исправьте масштаб и распечатайте лист заново.
3. Вырежьте бабочку только по сплошному внешнему контуру. Сохраните центральную полоску и все внутренние линии. При необходимости попросите взрослого помочь с ножницами.
4. Положите лист рисунком вверх. Согните крылья по длинным штриховым линиям так, чтобы обе законцовки поднялись одинаково. Для первой пробы прижмите корпус к столу и попробуйте поднять каждую законцовку на 8 мм. Запишите фактическую высоту. Линии мелкого пунктира оставьте плоскими.
5. Наденьте небольшую скрепку с закруглённым концом на передний край центральной полоски. Совместите задний конец скрепки с меткой A в 16 мм от носа. Если скрепка сползает или перекашивает крыло в любом из двух положений, запишите это и подберите другую до начала сравнения.
6. Предскажите, как изменится место первого касания пола, если передвинуть ту же скрепку к метке B в 22 мм от носа. Сохраняйте те же сгибы, захват и мягкий горизонтальный запуск. Сделайте по пять попыток в каждом положении. Записывайте также пикирования, кувырки и неудачные запуски.

Массу, высоту запуска и дальность указывайте по результатам измерения. Храните выкройку, хеш исходника и журнал испытаний вместе.

Учебный текст Open Flight. © Open Flight. Можно бесплатно читать, печатать и копировать для личного, семейного и учебного использования; остальные права защищены.
`,"/content/es/butterfly-001/build.md":`# Construye el planeador mariposa

Usa la hoja con el identificador, la revisión y el hash de tu diseño. Estas instrucciones sirven para el generador b1 y sus envergaduras disponibles. El patrón es experimental.

1. Elige una hoja de papel normal de impresora. Puedes empezar con papel de unos 90 g/m². Anota el papel que uses, su grosor o gramaje si lo conoces, y el clip elegido.
2. Imprime en «Tamaño real» en papel A4 o tamaño carta. Desactiva «Ajustar a la página». Mide la línea de 50 mm con otra regla y anota la lectura. Si se desvía más de 0,5 mm, corrige el ajuste y vuelve a imprimir.
3. Recorta solo el contorno continuo. Deja intactas la franja central y las marcas interiores. Pide ayuda a un adulto si la necesitas.
4. Con el lado impreso hacia arriba, dobla por las dos líneas largas de trazos. Sujeta la franja central sobre la mesa y eleva los dos extremos a la misma altura. Para el primer montaje, prueba con 8 mm. Anota la altura que midas. Deja planas las aletas marcadas con puntos.
5. Desliza un clip pequeño y con extremos redondeados sobre la punta. Alinea el extremo de atrás del clip con A, a 16 mm de la punta. Comprueba que el clip sujeta la franja sin torcer el ala. Si se desliza de alguna posición, anótalo y prueba otro clip antes de comparar.
6. Predice cómo cambiará el primer punto de contacto con el suelo al pasar el mismo clip de A a B, a 22 mm de la punta. Usa el mismo planeador, pliegue y agarre. Lanza suave y a nivel. Registra cinco intentos por ajuste, incluidos los picados, las volteretas y los lanzamientos inválidos.

Anota masa, altura de lanzamiento y distancias cuando las hayas medido. Guarda juntos la hoja impresa, el hash del diseño y el registro.

Texto didáctico original de Open Flight. © Open Flight. Se puede leer, imprimir y copiar gratis para uso personal, familiar y en el aula; reservados los demás derechos.
`,"/games/garden-gate/en.md":`# Garden Gate

Make one wide gate from two upright markers. Put a paper flower on the floor beyond it. Choose a clear space, mark the release line and measure the gate width, its distance from the line and the position of the flower. The first builder chooses these dimensions after observing the baseline glide.

Predict which clip setting will put the first landing closer to the flower. Alternate A and B until you have five attempts at each. Hold the release height, direction, glider and clip mass fixed. For every attempt, record whether the glider crossed between the markers before touching down. Separately measure the distance in centimetres from the first ground contact to the flower centre. Mark any contact with an obstacle or invalid launch and keep the row.

Compare gate passes out of five and the spread of landing errors at each setting. What would you keep the same for the next builder?

Original Open Flight game, first trial pending. © Open Flight. Free to read, print and copy for personal, family and classroom use; all other rights reserved.
`,"/games/garden-gate/ru.md":`# Садовые ворота

Поставьте две стойки, чтобы получились широкие ворота. За ними положите на пол бумажный цветок. Выберите свободное место и отметьте линию запуска. Измерьте ширину ворот, расстояние до линии и положение цветка. Для первого опыта выберите эти размеры после пробного планирования.

Предскажите, при каком положении скрепки планер впервые коснётся пола ближе к цветку. Чередуйте A и B, пока не наберётся по пять попыток на каждую метку. Сохраняйте ту же высоту и направление запуска, тот же планер и ту же скрепку. Для каждой попытки запишите, пролетел ли планер между стойками до касания пола. Отдельно измерьте в сантиметрах расстояние от места первого касания пола до центра цветка. Отмечайте столкновения и ошибки запуска. Сохраните каждую запись.

Сравните число проходов из пяти и разброс расстояний до цветка. Какие условия вы сохраните для следующего участника?

Игра Open Flight. Первое испытание ещё предстоит. © Open Flight. Можно бесплатно читать, печатать и копировать для личного, семейного и учебного использования; остальные права защищены.
`,"/games/garden-gate/es.md":`# La puerta del jardín

Haz una puerta ancha con dos marcas verticales. Coloca detrás una flor de papel en el suelo. Busca un espacio despejado, marca la línea de lanzamiento y mide el ancho de la puerta, su distancia a la línea y la posición de la flor. Decide esas medidas después de ver un primer planeo.

Predice en cuál de las dos posiciones del clip aterrizarás más cerca de la flor. Alterna A y B hasta tener cinco intentos en cada posición. Mantén la altura y la dirección del lanzamiento, el planeador y el clip. Anota si pasa entre las marcas antes de tocar el suelo. Mide en centímetros la distancia desde el primer contacto con el suelo hasta el centro de la flor. Si toca un obstáculo o el lanzamiento falla, regístralo en su fila.

Compara cuántas veces de cinco pasa por la puerta y cómo se reparten las distancias a la flor. ¿Qué mantendrías igual para la próxima persona?

Juego original de Open Flight, pendiente de primera prueba. © Open Flight. Se puede leer, imprimir y copiar gratis para uso personal, familiar y en el aula; reservados los demás derechos.
`},mt=new Map,Xn,kr=(e)=>new URL(e,import.meta.url);function Zn(e,t){if(!mt.has(e)){let n=fetch(kr(t)).then(async(o)=>{if(!o.ok)throw Error("Cannot load print resource "+t);let r=ee.from(await o.arrayBuffer());return mt.set(e,r),r}).catch((o)=>{throw mt.delete(e),o});mt.set(e,n)}return mt.get(e)}async function Ja(){if(globalThis.jspdf)return;Xn??=new Promise((e,t)=>{let n=document.createElement("script");n.src=kr("assets/planes/vendor/jspdf.js"),n.onload=e,n.onerror=()=>{Xn=void 0,t(Error("Unable to load the PDF tools."))},document.head.append(n)}),await Xn}async function Qn(e,t){let n=[];if(t.includes("pdf"))n.push(Ja(),Zn("/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","assets/planes/vendor/DejaVuSans.ttf"),...["OpenFlightText-Regular","OpenFlightText-Bold","Alegreya-Bold"].map((o)=>Zn("/apps/editor/assets/fonts/"+o+".ttf","assets/fonts/"+o+".ttf")));if(e&&t.includes("illustrated_guide")){let o=[e.photo.local_path,...e.en.steps.map((r)=>r.diagram)].filter(Boolean);for(let r of new Set(o))n.push(Zn("/apps/editor"+r,r.slice(1)))}await Promise.all(n)}function oe(e,t){let n=e.pathname;if(Object.hasOwn(Jn,n))return t==="utf8"?Jn[n]:ee.from(Jn[n]);let o=mt.get(n);if(!ee.isBuffer(o))throw Error("Unavailable print resource "+n);return t==="utf8"?o.toString("utf8"):o}var ge=JSON.parse(oe(new URL("../../designs/butterfly-001/model.json","https://print.invalid/packages/geometry/butterfly.ts"),"utf8")),Z=(e)=>tr("sha256").update(e).digest("hex");function Zt(e){return JSON.stringify(e,(t,n)=>{if(n&&typeof n==="object"&&!Array.isArray(n))return Object.fromEntries(Object.keys(n).sort().map((o)=>[o,n[o]]));return n})}var eo="butterfly-b1-"+Z(oe(new URL("https://print.invalid/packages/geometry/butterfly.ts"))).slice(0,16),x=(e)=>Math.round(e*1000)/1000;function Fr(e,t,n,o){return{design_id:e,revision_id:t,generator_revision:eo,model:ge,parameters:{span_mm:n},appearance_id:o,units:"mm"}}function Pr(e){let t=[[0,0]],[n,o]=ge.half_outline_start,r=e/(2*ge.half_span_mm);for(let[a,s,l,c,d,p]of ge.half_outline_segments){for(let h=1;h<=16;h++){let m=h/16,u=1-m,f=(y,g,_,k)=>u**3*y+3*u*u*m*g+3*u*m*m*_+m**3*k;t.push([x(r*f(n,a,l,d)),x(f(o,s,c,p))])}[n,o]=[d,p]}let i=t.slice(1,-1).reverse().map(([a,s])=>[-a,s]);return[...t,...i]}function Mr(e){let t=Pr(e),n=0;return t.forEach(([o,r],i)=>{let[a,s]=t[(i+1)%t.length];n+=o*s-a*r}),{span_mm:e,planform_area_mm2:x(Math.abs(n)/2),classification:"computed_geometry"}}var Xa={blank:["#ffffff"],meadow:["#d5e8d9","#408a78","#f2d8a1"],apricot:["#fae1cc","#bb695e","#f5bb77"]};function to(e,t,n,o){let r=e/(2*ge.half_span_mm),i=([c,d])=>[x(n+c),x(o+d)],a=Xa[t],s=[{id:"cut",points:Pr(e).map(i),closed:!0,fill:a[0],stroke:"#20382f",weight:0.44}],l=[];for(let c of[-1,1]){let d=(m,u)=>i([c*r*m,u]);if(t!=="blank")for(let[m,u]of[[[10,22],[33,15],[61,9],[73,11],[55,23],[26,33],[13,33]],[[15,42],[36,30],[69,19],[76,21],[72,30],[53,41],[32,47]],[[14,57],[33,57],[54,64],[59,72],[51,80],[35,76],[21,65]]].entries())s.push({id:"patch-"+c+"-"+m,points:u.map(([f,y])=>d(f,y)),closed:!0,fill:a[m===1?2:1]});let[p,h]=ge.root_fold_y_mm;s.push({id:"fold-"+c,points:[d(ge.root_x_mm,p),d(ge.root_x_mm,h)],stroke:"#35423b",weight:0.35,dash:[2,1.4]}),s.push({id:"trim-"+c,points:ge.trim_segment_mm.map(([m,u])=>d(m,u)),stroke:"#35423b",weight:0.32,dash:[0.7,1]})}for(let[c,d]of Object.entries(ge.clip_stations_mm_from_nose))s.push({id:"clip-"+c,points:[i([-3,d]),i([3,d])],stroke:"#20382f",weight:0.35}),l.push({x:n+10*r,y:o+d+3.5,text:c,size:3,color:"#152d22"});return{lines:s,labels:l}}function Za(e,t,n){let[o,r,i,a,s,l]=t,c=1-n;return[c**3*e[0]+3*c**2*n*o+3*c*n**2*i+n**3*s,c**3*e[1]+3*c**2*n*r+3*c*n**2*a+n**3*l]}function $e(e,t){let n=[e];for(let o of t){let r=n.at(-1);for(let i=1;i<=14;i++)n.push(Za(r,o,i/14))}return n}function vr(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]));return{points:e,distance:t,length:t.at(-1)}}function be(e,t,n){return e+(t-e)*n}function no(e,t,n){return[be(e[0],t[0],n),be(e[1],t[1],n)]}function Qa(e,t){let n=Math.max(0,Math.min(1,t))*e.length,o=e.distance.length-1,r=0;while(o-r>1){let i=Math.floor((r+o)/2);if(n>e.distance[i])r=i;else o=i}return no(e.points[r],e.points[o],(n-e.distance[r])/(e.distance[o]-e.distance[r]))}function de(e,t){return Array.from({length:e+1},(n,o)=>t(o/e))}function ye(e){let t=e.geometry,n=$e([t.root_x,t.fore_root_y],t.fore_edge),o=$e(n.at(-1),t.hind_edge),r=$e([0,t.nose_y],[[2.4,t.nose_y,3.8,t.nose_y+1,4.6,t.nose_y+3.6],[5.2,t.nose_y+6.5,t.root_x-0.3,t.fore_root_y-4,t.root_x,t.fore_root_y]]),i=$e(o.at(-1),[[t.root_x-0.4,t.hind_root_y+5,3,t.abdomen_y,0,t.abdomen_y]]),a=[...r,...n.slice(1),...o.slice(1),...i.slice(1)],s=[...a,...a.slice(1,-1).reverse().map(([c,d])=>[-c,d])],l=e.species==="swallowtail"?$e(n.at(-1),[...t.hind_edge.slice(0,4),[57,73,55,74,51,74],...t.hind_edge.slice(7)]):o;return{outline:s,fore:vr(n),hind:vr(l),trailing:o}}function V(e,t,n=1){let o=e[0]*n;return[o===0?0:Math.sign(o)*x(Math.abs(o)*t/200),x(e[1])]}function es(e,t){let n=[];for(let o=1;o<e.length;o++){let[r,i]=e[o-1],[a,s]=e[o];if(r!==a&&t>=Math.min(r,a)&&t<=Math.max(r,a))n.push(be(i,s,(t-r)/(a-r)))}if(!n.length)throw Error("Trim station is outside the trailing edge");return[t,Math.max(...n)]}function Qe(e,t){let[n,o]=e.geometry.tab_x.map((s)=>es(t,s)),r=e.geometry.tab_depth_mm,i=[[n[0],n[1]-r],[o[0],o[1]-r]];return{hinges:i,ends:[n,o],fromHinge:(s,l)=>{let c=no(i[0],i[1],s);return[c[0],c[1]+l]}}}function ts(e,t,n){return(o,r)=>{let[i,a]=no(t,Qa(e,o),r),s=n?(1-o)/0.1:o/0.38;return[i,a+11.5*Math.exp(-(s**2))*Math.sin(Math.PI*r)]}}function ut(e,t,n,o,r,i=40){let a=(l)=>de(i,(c)=>{let d=be(t,n,c);return e(d,l(d))}),s=(l,c,d)=>de(10,(p)=>e(l,be(c,d,p))).slice(1,-1);return[...a(o),...s(n,o(n),r(n)),...a(r).reverse(),...s(t,r(t),o(t))]}var oo=(e)=>(t)=>e;function Ae(e,t,n,o,r,i=0){return de(20,(a)=>{let s=a*Math.PI*2,l=Math.cos(s),c=Math.sin(s);return e(t+o*l+i*c,n+r*c)})}function St(e,t,n,o){return de(26,(r)=>[e+n*Math.cos(r*2*Math.PI),t+o*Math.sin(r*2*Math.PI)])}function ht(e,t,n,o,r,i=0){return de(18,(a)=>e(be(t,n,a)+i*Math.sin(Math.PI*a),be(o,r,a)))}function De(e,t,n){let o="#";for(let r=1;r<7;r+=2){let i=be(parseInt(e.slice(r,r+2),16),parseInt(t.slice(r,r+2),16),n);o+=Math.round(i).toString(16).padStart(2,"0")}return o.toUpperCase()}function ro(e,t){let n=1;while(n<e.length-1&&t>e[n][0])n++;let[o,r]=e[n-1],[i,a]=e[n];return De(r,a,Math.max(0,Math.min(1,(t-o)/(i-o))))}function ns(e,t,n,o,r){let i=t?(c)=>0.93-0.15*Math.exp(-((c-0.55)**2)/0.026)-0.04*Math.sin(Math.PI*c):(c)=>0.9-0.055*Math.sin(Math.PI*c);if(r("ground",ut(e,0,1,oo(0.01),i),n.base,o?n.ink:void 0,0.34),!o){let c=[[0,De(n.mid,n.shade,0.3)],[0.28,n.mid],[0.53,n.base],[0.82,n.sun],[1,De(n.sun,n.base,0.45)]];for(let d=0;d<16;d++){let p=(h)=>(m)=>i(m)*(h+0.035*Math.sin(Math.PI*h)*Math.sin(5*m));r("amber-scale-layer-"+d,ut(e,0,1,p(d/16),p(Math.min(1,(d+1.05)/16))),ro(c,(d+0.5)/16))}for(let d=0;d<10;d++)for(let p=0;p<4;p++){let h=0.19+d*0.078+0.009*Math.sin(d+p),m=0.27+p*0.124+0.037*Math.sin(d*1.73+p);r("pollen-glint-"+d+"-"+p,Ae(e,h,m,0.0045,0.012,0.001),De(n.gleam,n.sun,0.5+0.2*Math.sin(d+p)))}}let a=(c,d,p)=>r(c,d,void 0,n.ink,o?0.32:p),s=(c,d,p,h,m)=>{a(c,ht(e,d,h,p,i(h)+0.006,0.006),m)};if(t){a("upper-main-vein",de(30,(h)=>e(0.319,h*(i(0.319)+0.008))),0.81),a("lower-main-vein",de(30,(h)=>e(0.735,h*(i(0.735)+0.008))),0.95);let p=(h)=>[be(0.319,0.735,h),0.49+0.11*Math.sin(Math.PI*h)];a("discal-crossvein",de(32,(h)=>e(...p(h))),0.64);for(let[h,m]of[0.12,0.36,0.61,0.84].entries()){let[u,f]=p(m);s("secondary-"+h,u,f,0.39+0.085*h,0.67)}for(let[h,m]of[0.55,0.35,0.16].entries())s("lower-fork-"+h,0.735,m,0.81+0.066*h,0.72)}else for(let c=0;c<8;c++){let d=0.16+c*0.111;a("hind-vein-"+c,ht(e,d*0.48+0.18,d,0,i(d)+0.006,-0.038),c%3===0?0.78:0.63)}let l=t?19:17;for(let c=0;c<l;c++){let d=(t?0.33:0.1)+c*(t?0.034:0.049),p=i(d),h=0.0085+0.002*Math.sin(c*1.1);if(r("milkspot-"+c,Ae(e,d,p+(1-p)*0.64,h,Math.min(0.02,(1-p)*0.19)),n.spot,o?n.ink:void 0,0.2),c>0&&c<l-1)r("milkspot-inner-"+c,Ae(e,d+0.006,p+(1-p)*0.29,h*0.9,Math.min(0.019,(1-p)*0.19)),c%4===0?n.gleam:n.spot,o?n.ink:void 0,0.2)}if(t)for(let c=0;c<4;c++){let d=0.406+c*0.046;r("apical-window-"+c,Ae(e,d,i(d)-0.014,0.011,0.032,0.002),c%2?n.spot:n.gleam,o?n.ink:void 0,0.25)}}function os(e,t,n,o,r){let i=(s)=>0.94-0.06*Math.sin(Math.PI*s)-(t?0.045*Math.exp(-((s-0.52)**2)/0.018):0);if(r("ground",ut(e,0,1,oo(0.01),i),n.shade,o?n.ink:void 0,0.34),!o){let s=[[0,n.shade],[0.18,n.base],[0.39,n.sun],[0.56,De(n.gleam,n.sun,0.45)],[0.71,n.sun],[0.84,n.mid],[1,n.base]],l=(c)=>(d)=>i(d)*(c+0.11*Math.sin(Math.PI*c)*Math.sin(4.8*d+(t?0.1:1)));for(let c=0;c<28;c++)r("structural-blue-"+c,ut(e,0,1,l(c/28),l(Math.min(1,(c+1.08)/28))),ro(s,(c+0.5)/28));for(let c=0;c<12;c++)for(let d=0;d<5;d++){let p=0.15+c*0.066+0.009*Math.cos(d*2),h=0.23+d*0.12+0.035*Math.cos(c*1.7);r("scale-"+c+"-"+d,de(4,(m)=>e(p+0.01*m,h+0.006*Math.sin(m*Math.PI))),void 0,De(d%2?n.gleam:n.base,n.sun,0.45),0.19)}}let a=(s)=>[0.335+0.311*s,0.48+0.055*Math.sin(Math.PI*s)];for(let s=0;s<9;s++){let l=0.18+s*0.093,[c,d]=t&&s>=2&&s<=5?a((s-2)/3):[l*0.79+0.065,0.012];if(!o)r("vein-sheen-"+s,ht(e,c+0.004,l+0.005,d,i(l),-0.025),void 0,n.gleam,0.24);r("vein-"+s,ht(e,c,l,d,i(l)+0.007,-0.025),void 0,o?n.ink:n.shade,o?0.3:0.42)}if(t){r("discal-crossvein",de(20,(s)=>e(...a(s))),void 0,o?n.ink:n.shade,0.46);for(let s of[0,1]){let[l,c]=a(s);r("discal-rail-"+s,ht(e,l*0.67+0.08,l,0.012,c,0.007),void 0,o?n.ink:n.shade,0.43)}for(let s=0;s<5;s++){let l=0.39+s*0.039;r("ivory-apex-"+s,Ae(e,l,i(l)+0.045,0.008,0.013),n.spot,o?n.ink:void 0,0.22)}}else for(let s=0;s<9;s++){let l=0.22+s*0.075;r("edge-scale-"+s,Ae(e,l,i(l)+0.019,0.009,0.01),o?n.spot:n.mid,o?n.ink:void 0,0.22)}}function rs(e,t,n,o,r){let i=(s)=>t?0.91-0.1*Math.exp(-((s-0.58)**2)/0.055):0.78-0.065*Math.sin(Math.PI*s);if(r("ground",ut(e,0,1,oo(0.01),i),n.base,o?n.ink:void 0,0.34),!o){let s=[[0,n.mid],[0.29,n.gleam],[0.62,n.sun],[1,n.base]];for(let l=0;l<15;l++){let c=(d)=>(p)=>i(p)*(d+0.09*Math.sin(d*Math.PI)*Math.sin(5*p));r("butter-scales-"+l,ut(e,0,1,c(l/15),c(Math.min(1,(l+1.05)/15))),ro(s,(l+0.5)/15))}for(let l=0;l<11;l++)for(let c=0;c<4;c++){let d=0.16+0.069*l+0.012*Math.sin(c+l),p=0.24+0.128*c+0.029*Math.cos(l*1.7+c);r("dusting-"+l+"-"+c,Ae(e,d,p,0.004,0.008),De(n.gleam,n.base,0.35))}}if(t)for(let[s,[l,c,d]]of[[0.24,0.51,0.6],[0.34,0.6,0.65],[0.44,0.68,0.71]].entries()){let p=de(25,(m)=>e(be(l,d,m),be(0.96,c,m)-0.067*Math.sin(m*Math.PI))),h=de(25,(m)=>e(be(d,l-0.066,m),be(c,0.97,m)+0.035*Math.sin(m*Math.PI)));r("tiger-bar-"+s,[...p,...h],o?"#FFFFFF":n.ink,o?n.ink:void 0,0.32)}for(let s=0;s<(t?7:8);s++){let l=0.24+s*(t?0.105:0.095);r("vein-"+s,ht(e,l*0.67+0.07,l,0.012,i(l)+0.005,0.013),void 0,n.ink,o?0.3:t?0.52:0.72)}let a=t?10:9;for(let s=0;s<a;s++){let l=(t?0.415:0.175)+s*(t?0.055:0.081),c=i(l),d=(p,h,m)=>[...de(14,(u)=>e(l+h*(u-0.5),p+m*Math.sin(Math.PI*u))),...de(14,(u)=>e(l+h*(0.5-u),p+m*0.16*Math.sin(Math.PI*u)-0.006))];if(r("crescent-"+s,d(c+(1-c)*(t?0.45:0.34),t?0.038:0.056,t?0.041:0.059),t?n.gleam:n.spot,o?n.ink:void 0,0.24),!t)r("yellow-moon-"+s,d(c+(1-c)*0.74,0.05,0.034),n.sun,o?n.ink:void 0,0.22)}if(!t)r("red-eyespot-rim",Ae(e,0.84,0.735,0.043,0.073),n.ink),r("red-eyespot",Ae(e,0.84,0.735,0.029,0.05),n.blush,o?n.ink:void 0,0.22),r("eyespot-glint",Ae(e,0.832,0.721,0.012,0.011),n.gleam)}function Se(e,t,n,o){let r=e.palettes[t];if(!r)throw Error("Unknown workshop appearance");let i=t==="coloring",a=[{id:"silhouette",points:o.outline.map((m)=>V(m,n)),closed:!0,fill:i?"#FFFFFF":r.ink,stroke:r.ink,weight:0.44}],s={monarch:ns,morpho:os,swallowtail:rs};for(let m of[-1,1])for(let u of["hind","fore"]){let f=u==="fore",y=f?e.geometry.fore_origin:e.geometry.hind_origin,g=ts(o[u],y,f),_=(k,I,M,S,T=0)=>{a.push({id:(m<0?"left-":"right-")+u+"-"+k,points:I.map((B)=>V(B,n,m)),closed:!!M,fill:M,stroke:S,weight:T})};s[e.species](g,f,r,i,_)}let l=e.geometry,c=l.fore_root_y+5,d=(m,u,f,y,g=0)=>{a.push({id:m,points:u.map((_)=>V(_,n)),closed:!!f,fill:f,stroke:y,weight:g})},p=i?"#FFFFFF":De(r.ink,"#000000",0.22),h=$e([0,c],[[5.5,c+3,5.3,l.hind_root_y+2,0,l.abdomen_y-2],[-5.3,l.hind_root_y+2,-5.5,c+3,0,c]]);d("abdomen",h,p,r.ink,0.37);for(let m=0;m<5;m++){let u=c+10+m*5,f=3.6-m*0.42;d("abdomen-segment-"+m,$e([-f,u],[[-0.7,u+0.9,0.7,u+0.9,f,u]]),void 0,i?r.ink:De(r.ink,r.sun,0.62),0.48)}d("thorax",St(0,c,4.3,7.6),p,r.ink,0.35),d("head",St(0,c-8.8,3.6,3.65),p,r.ink,0.35);for(let m of[-1,1]){let u=(f)=>[f[0]*m,f[1]];if(d("antenna-"+m,$e([1.55,c-11],[[3,c-14,4.4,l.nose_y+9,3.7,l.nose_y+5]]).map(u),void 0,i?r.ink:r.sun,0.52),d("antenna-club-"+m,St(m*3.7,l.nose_y+5,0.62,1.55),i?r.ink:r.sun),d("thorax-stripe-"+m,$e([m*1.8,c-4.8],[[m*3.1,c-1.7,m*2.5,c+3,m*1.2,c+5.1]]),void 0,i?r.ink:r.sun,0.58),d("eye-"+m,St(m*2.3,c-9.1,0.62,0.83),i?r.ink:r.spot),e.species==="monarch")for(let[f,[y,g]]of[[2.6,-5.7],[3,-2.2],[2.8,1.8],[2.1,4.8]].entries())d("thorax-milkspot-"+m+"-"+f,St(m*y,c+g,0.38,0.54),i?r.ink:r.spot)}return a}var io=(e,t,n,o,r,i)=>({name:e,unit:t,minimum:n,maximum:o,step:r,description:i}),is=[io("span_mm","mm",148,184,2,"Width between the two cut wingtips. Chord and body length stay fixed."),io("left_trim_deg","degrees",-12,12,2,"Left trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail."),io("right_trim_deg","degrees",-12,12,2,"Right trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail.")],as=[{appearance_id:"natural",title:"Field colors",ink_usage:"full",description:"Colors and markings inspired by the real butterfly."},{appearance_id:"carnival",title:"Carnival",ink_usage:"full",description:"Candy-bright wings with a contrasting accent."},{appearance_id:"twilight",title:"Twilight",ink_usage:"full",description:"Jewel tones and luminous pale markings."},{appearance_id:"coloring",title:"Color your own",ink_usage:"low",description:"White wing cells with printable outlines to color by hand."}];function Le(e,t,n,o,r,i,a,s){return{ink:e,shade:t,base:n,mid:o,sun:r,gleam:i,spot:a,blush:s}}var ss=Le("#4D4351","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"),ls={baseline_revision:"w1",units:"mm",parameter_definitions:is,appearance_id:"natural",appearances:as,rights:{license_expression:"CERN-OHL-W-2.0",license_url:"https://spdx.org/licenses/CERN-OHL-W-2.0.html",attribution:"Open Flight contributors. Original paper airframes under CERN-OHL-W-2.0. Wing artwork and learning text under CC BY-SA 4.0.",status:"original_with_license"}};function ao({species:e,name:t,span:n,geometry:o,palettes:r}){return{...ls,model:"butterfly-"+e,species:e,name:t,geometry:o,parameters:{span_mm:n,left_trim_deg:0,right_trim_deg:0},palettes:{...r,coloring:ss}}}var pe=[ao({species:"monarch",name:"Monarch",span:172,geometry:{nose_y:9,abdomen_y:84,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.2,36.5],hind_origin:[6.2,37.6],fore_edge:[[21,21,47,13,65,8],[79,3.5,90,0.8,94,2],[98,3,100,7,100,12],[100,22,95,29,87,35],[76,43,64,47,54,50]],hind_edge:[[62,48,73,46,78,51],[83,57,75,67,67,73],[58,80,49,84,39,83],[26,83,14,73,6,69]],tab_x:[28,51],tab_depth_mm:10,clip_rear_from_nose_mm:17,target_dihedral_deg:12},palettes:{natural:Le("#23192C","#9B3625","#FF7916","#F65B1B","#FFAF29","#FFE174","#FFF6CF","#E8553D"),carnival:Le("#3C1943","#9B285D","#F04685","#F8466F","#FF9870","#FFE78F","#FFF9E0","#48D6BC"),twilight:Le("#261D49","#543469","#A86BED","#8851C6","#DE9CED","#FFD09C","#FFF1CB","#EF91B7")}}),ao({species:"morpho",name:"Blue Morpho",span:160,geometry:{nose_y:8,abdomen_y:94,root_x:6,fore_root_y:25,hind_root_y:79,fore_origin:[6.3,40],hind_origin:[6.3,41.4],fore_edge:[[20,18.5,34,12,53,7],[69,2,87,0,94,5],[98,8,100,18,100,26],[100,39,93,48,80,51],[75,53,70,54.5,68,55.5]],hind_edge:[[77,54.5,85,54,89,59],[97,70,89,81,78,87],[64,95,48,100,35,96],[20,92,12,86,6,79]],tab_x:[32,57],tab_depth_mm:12,clip_rear_from_nose_mm:18,target_dihedral_deg:16},palettes:{natural:Le("#192840","#2147A1","#1558DB","#337FF7","#18BFEB","#66F4F3","#F4F5DD","#3EEDFA"),carnival:Le("#322B58","#6744AE","#8157EF","#A66DF4","#70DED8","#BAFBE3","#FFF4E5","#C9FF9E"),twilight:Le("#211F4B","#3C3989","#525AD3","#777DEF","#5AC6CB","#ADFFE0","#FEF0CA","#79EBD6")}}),ao({species:"swallowtail",name:"Swallowtail",span:180,geometry:{nose_y:9.5,abdomen_y:81,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.25,36],hind_origin:[6.25,37.4],fore_edge:[[26,21,56,10,80,5],[90,2,96,0.7,100,1.5],[100,7,95,17,91,22],[88,24,88,27,86,29],[81,30,80,33,78,35],[73,36,71,39,68,41],[62,42,59,45,51,48]],hind_edge:[[63,44,76,44,80,49],[80,54,78,57,74,60],[71,59,70,62,68,65],[64,64,63,67,61,69],[60,75,59,88,56,92],[54,94,52,91,52.8,88],[54,81,53,75,51,74],[47,73,47,77,44,78],[40,76,38,81,34,81],[30,80,28,83,25,82],[17,81,10,75,6,69]],tab_x:[21,41],tab_depth_mm:9,clip_rear_from_nose_mm:17,target_dihedral_deg:10},palettes:{natural:Le("#24243C","#B98229","#FFDB3A","#F1BB32","#FFE766","#FFF6A0","#42C8D3","#FC6F44"),carnival:Le("#43233D","#BD6744","#FF8340","#FF9E52","#FFC46A","#FFE3A0","#50E3CE","#EA4B81"),twilight:Le("#271E4B","#7650AA","#BE92E8","#A479DE","#D8B5F3","#EFD7FD","#7DDBE5","#FF9E8F")}})];var cs=["workshop.ts","workshop-art.ts","workshop-models.ts"],so="butterfly-workshop-w1-"+Z(ee.concat(cs.map((e)=>oe(new URL(e,"https://print.invalid/packages/geometry/workshop.ts"))))).slice(0,16);function Qt(e,t,n,o,r){return{design_id:t,revision_id:n,generator_revision:so,model:e,parameters:o,appearance_id:r,units:"mm",coordinates:"Nose at top. Edge control x is percent half-span. Edge control y is millimetres. Left and right are seen looking forward from the tail. Positive tab angles bend upward from their own wing."}}function Er(e,t){let n=ye(e).outline.map((i)=>V(i,t.span_mm)),o=0;for(let i=0;i<n.length;i++){let[a,s]=n[i],[l,c]=n[(i+1)%n.length];o+=a*c-l*s}let r=Math.abs(o)/2;return{span_mm:t.span_mm,planform_area_mm2:x(r),aspect_ratio:x(t.span_mm**2/r),classification:"computed_geometry"}}function en(e,t){return(t/2-t*e.geometry.root_x/200)*Math.sin(e.geometry.target_dihedral_deg*Math.PI/180)}function lo(e,t,n){let o=ye(e),{hinges:r}=Qe(e,o.trailing),i=(r[1][0]-r[0][0])*t/200,a=r[1][1]-r[0][1];return e.geometry.tab_depth_mm*i/Math.hypot(i,a)*Math.sin(n*Math.PI/180)}function co(e,t,n,o=!1){let r=ye(e),i=t.span_mm,a=Se(e,n,i,r),s=e.geometry,l=Qe(e,r.trailing),c=e.palettes[n],d="#272239",p="#FFFEF4";if(!o&&(t.left_trim_deg||t.right_trim_deg)){let[m,u]=l.hinges.map((M)=>V(M,i)),f=u[0]-m[0],y=u[1]-m[1],g=Math.hypot(f,y),_=[-y/g,f/g],k=[t.left_trim_deg,t.right_trim_deg].map((M)=>1-Math.cos(M*Math.PI/180)),I=([M,S])=>{let T=Math.abs(M),B=M<0?0:1;if(!k[B]||T<m[0]||T>u[0])return[M,S];let w=((T-m[0])*_[0]+(S-m[1])*_[1])*k[B];if(w<=0)return[M,S];return[x(Math.sign(M)*(T-w*_[0])),x(S-w*_[1])]};for(let M of a)M.points=M.points.map(I)}let h=(m,u,f)=>{a.push({id:m+"-halo",points:u,stroke:"#FFFEF4",weight:1.42},{id:m,points:u,stroke:"#272239",weight:0.43,dash:f})};if(o){a.push({id:"cut",points:r.outline.map((u)=>V(u,i)),closed:!0,stroke:"#272239",weight:0.53});let m=s.nose_y+s.clip_rear_from_nose_mm;h("clip-rear",[V([-s.root_x+0.4,m],i),V([s.root_x-0.4,m],i)]),h("clip-cross",[V([0,m-2],i),V([0,m+2],i)])}for(let m of[-1,1]){let u=m<0?"left":"right",f=(g)=>V(g,i,m),y=m<0?t.left_trim_deg:t.right_trim_deg;if(o){h("root-fold-"+u,[[s.root_x,s.fore_root_y],[s.root_x,s.hind_root_y]].map((g)=>f(g)),[2.9,1.6]);for(let g=0;g<2;g++)h("tab-slit-"+u+"-"+g,[l.ends[g],l.hinges[g]].map(f));h("tab-hinge-"+u,l.hinges.map(f),[0.55,0.85])}else if(y!==0){let g=Math.abs(lo(e,i,y)),_=n==="coloring"?"#80788C":y>0?c.gleam:c.ink,k=[l.fromHinge(0.02,0.18),l.fromHinge(0.98,0.18),l.fromHinge(0.97,g+0.32),l.fromHinge(0.04,g+0.35)];a.push({id:"creased-tab-"+u,points:k.map(f),closed:!0,fill:_},{id:"tab-relief-"+u,points:l.hinges.map(f),stroke:y>0?c.ink:c.gleam,weight:0.26})}}return{lines:a,tab:l,minY:Math.min(...r.outline.map((m)=>m[1])),maxY:Math.max(...r.outline.map((m)=>m[1]))}}function po(e,t,n){return e.map((o)=>({...o,points:o.points.map(([r,i])=>[x(t+r),x(n+i)])}))}function Ge(e){return new globalThis.jspdf.jsPDF(e)}var q={page:"#FBF9F4",surface:"#FFFFFF",surfaceSunken:"#F2EEE5",surfaceStage:"#F0F5FA",surfaceSelected:"#E2ECF5",surfaceAttention:"#FAE5DC",surfaceSuccess:"#E2EFE5",surfaceCaution:"#FAEFD6",surfaceInverse:"#1D2731",text:"#1D2731",textMuted:"#4D5862",textInverse:"#FFFFFF",textLink:"#1D4A75",textAccent:"#A63A21",textSuccess:"#33704D",textCaution:"#87590F",textDanger:"#A63A21",rule:"#DCD5C6",border:"#7C858C",borderStrong:"#1D2731",grid:"#DCD5C6",action:"#B9452A",actionHover:"#A63A21",actionText:"#FFFFFF",selected:"#1D4A75",selectedText:"#FFFFFF",focus:"#2E6CA4",mark:"#D2552F",highlight:"#E3A83A",seriesA:"#1D4A75",seriesB:"#D2552F",seriesC:"#33704D",seriesD:"#E3A83A",lineCut:"#1D2731",lineValley:"#1D4A75",lineMountain:"#A63A21",lineGuide:"#7C858C",diagramFront:"#FFFFFF",diagramBack:"#C5D6E6",diagramMoving:"#E3A83A",diagramArrow:"#A63A21",diagramInk:"#1D2731",poster:"#C8281E",surfaceBirch:"#EFE9DC",night:"#0B1633",nightRaised:"#13224A",nightText:"#FBF9F4",nightMuted:"#A9B6CC",nightAccent:"#F0603F",nightInfo:"#C5D6E6",nightCaution:"#E3A83A",nightRule:"#566C99",brandInk:"#1D2731",brandKite:"#B9452A",brandSheet:"#FFFFFF"},mo={valley:"6 4",mountain:"6 3 1.5 3",guide:"1.5 4"},W={ink:"#000000",muted:"#4D5862",text:{min:9,body:10.5,step:12,title:18,display:24},leading:1.35,line:{min:0.3,fold:0.35,cut:0.5},dash:{valley:[3,1.5],mountain:[3,1,0.4,1],guide:[0.4,1.2]},safe:6,margin:12,calibration:50,brandMax:25};var ds=0.35277777777777775,E=Object.freeze(Object.fromEntries(Object.entries(W.text).map(([e,t])=>[e,+(t*ds).toFixed(3)]))),A=W.ink,D=W.muted,Sr=q.textAccent,Y=Object.freeze({cut:{stroke:A,weight:W.line.cut},valley:{stroke:q.lineValley,weight:W.line.fold,dash:W.dash.valley},mountain:{stroke:q.lineMountain,weight:W.line.fold,dash:W.dash.mountain},guide:{stroke:D,weight:W.line.min,dash:W.dash.guide},rule:{stroke:D,weight:W.line.min}}),et=(e)=>Math.max(e??0,W.line.min),tt=(e)=>Math.max(e,E.min),Wl=Object.freeze({text:"assets/fonts/OpenFlightText-Regular.ttf",bold:"assets/fonts/OpenFlightText-Bold.ttf",display:"assets/fonts/Alegreya-Bold.ttf"}),ft="Embedded fonts: Open Flight Text, a renamed subset of Andika by SIL International, and Alegreya by Juan Pablo del Peral (Huerta Tipográfica). Both under the SIL Open Font License 1.1.";function gt(e,t){e.addFileToVFS("OpenFlightText-Regular.ttf",t.text),e.addFont("OpenFlightText-Regular.ttf","OFText","normal"),e.addFileToVFS("OpenFlightText-Bold.ttf",t.bold),e.addFont("OpenFlightText-Bold.ttf","OFText","bold"),e.addFileToVFS("Alegreya-Bold.ttf",t.display),e.addFont("Alegreya-Bold.ttf","OFDisplay","bold"),e.setFont("OFText","normal")}function bt(e,t="text"){if(t==="display")e.setFont("OFDisplay","bold");else e.setFont("OFText",t==="bold"?"bold":"normal")}var Ar={en:["50 mm","Print at 100% (Actual size). Measure this line: it should be 50 mm."],es:["50 mm","Imprime al 100 % (Tamaño real). Mide esta línea: debe medir 50 mm."],ru:["50 мм","Печатайте в масштабе 100% («Фактический размер»). Длина линии — 50 мм."]},ps=(e)=>Ar[e]??Ar.en;function qe(e,t,n="en",{note:o=!0,id:r="ruler"}={}){let[i,a]=ps(n),s=W.calibration,l=[{id:r,points:[[e,t],[e+s,t]],stroke:A,weight:0.4}];for(let d=0;d<=s;d+=10){let p=d===0||d===s;l.push({id:`${r}-tick-${d}`,points:[[e+d,t],[e+d,t-(p?3:1.6)]],stroke:A,weight:p?0.4:W.line.min})}let c=[{x:e+s+2.5,y:t+0.4,text:i,size:E.min,color:A,font:"bold"}];if(o)c.push({x:e,y:t+5,text:a,size:E.min,color:A});return{lines:l,labels:c,width:s+2.5+i.length*E.min*0.6,height:o?8:4}}function Ye(e,t,n=4,{mono:o=!1}={}){let r=n/42,i=(c,d)=>[+(e+(c-4.5)*r).toFixed(3),+(t+(d-3.5)*r).toFixed(3)],a=o?A:q.brandKite,s=[{id:"brand-sheet",points:[i(24,11),i(6,11),i(6,42),i(37,42),i(37,24)],stroke:A,weight:Math.max(W.line.min,3*r)},{id:"brand-crease",points:[i(24,11),i(37,24)],stroke:A,weight:W.line.min,dash:[0.5,0.5]},{id:"brand-flap",points:[i(24,11),i(37,24),i(46,2)],closed:!0,fill:a,stroke:a,weight:W.line.min}],l=[{x:e+n*1.3,y:t+n*0.86,text:"Open Flight",size:Math.max(E.min,n*0.78),color:A,font:"display"}];return{lines:s,labels:l,width:Math.min(W.brandMax,n*1.3+4.4*Math.max(E.min,n*0.78))}}function Lr({fontsBase:e="",paper:t}={}){let n=(i,a,s,l="normal")=>`@font-face{font-family:'${i}';src:url('${e}${a}') format('woff2');font-weight:${s};font-style:${l};font-display:swap}`;return(e?n("Open Flight Text","OpenFlightText-Regular.woff2",400)+n("Open Flight Text","OpenFlightText-Bold.woff2",700)+n("Open Flight Text","OpenFlightText-Italic.woff2",400,"italic")+n("Alegreya","Alegreya-Bold.woff2",700)+n("Alegreya","Alegreya-Italic.woff2",400,"italic"):"")+`@page{${t?`size:${t==="A4"?"A4":"Letter"};`:""}margin:${W.margin}mm}*{box-sizing:border-box}.print-calibration{display:none;align-items:center;gap:2mm;margin-top:4mm;font-size:${W.text.min}pt}.print-calibration svg{width:${W.calibration}mm;height:3mm;overflow:visible}body{margin:0;background:${q.page};color:${q.text};font:17px/1.55 'Open Flight Text',Andika,system-ui,sans-serif}main,article{max-width:46rem;margin:1.5rem auto;padding:2rem;background:${q.surface};border:1px solid ${q.rule};border-radius:8px}header{display:flex;justify-content:space-between;gap:1rem;padding-bottom:.5rem;border-bottom:1px dashed ${q.border};color:${q.textMuted};font-size:.85rem;font-weight:700}header b,header a{font-family:Alegreya,Georgia,serif;color:${q.text};font-size:1rem}h1,h2,h3{font-family:Alegreya,Georgia,serif;line-height:1.15;margin:1.2em 0 .4em}h1{font-size:2.3rem;margin-top:.6em}h2{font-size:1.45rem}h3{font-size:1.1rem}i,em{font-family:Alegreya,Georgia,serif}p{margin:.35em 0 .7em}li{margin:.45em 0}a{color:${q.textLink}}table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}td,th{border:1px solid ${q.border};padding:.45em .55em;text-align:start;vertical-align:top}th{color:${q.textMuted};font-size:.85rem}dl{display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;border:1px solid ${q.rule};border-radius:8px;padding:.7rem}dt{font-size:.85rem;color:${q.textMuted}}dd{margin:0;font-weight:700}.step{display:grid;grid-template-columns:2rem 1fr 34%;gap:.75rem;align-items:center;padding:.6rem 0;border-bottom:1px solid ${q.rule};break-inside:avoid}.number{display:grid;place-items:center;width:1.75rem;height:1.75rem;border:2px solid ${q.text};border-radius:50%;font-weight:700}.step img{display:block;width:100%;height:83px;object-fit:contain}.nature{display:flex;align-items:center;gap:1rem;margin-top:1rem}.photo{width:28%;height:95px;border-radius:4px;object-fit:cover}footer{margin-top:1rem;color:${q.textMuted};font-size:.85rem;overflow-wrap:anywhere}small{font-size:.85rem}@media(max-width:540px){main,article{margin:.5rem;padding:1rem}dl{grid-template-columns:1fr 1fr}.step{grid-template-columns:1.75rem 1fr}.step img{grid-column:2}table{display:block;overflow-x:auto}}@media print{body{background:#fff;color:${W.ink};font-size:${W.text.body}pt;line-height:${W.leading}}main,article{max-width:none;margin:0;padding:0;border:0;break-after:page}main:last-of-type,article:last-of-type{break-after:auto}h1{font-size:${W.text.display}pt}h2{font-size:${W.text.step}pt}h3{font-size:${W.text.body}pt}header,footer,small,th,dt{font-size:${W.text.min}pt}td,th{border:2px solid ${W.ink}}.step{border-bottom:2px solid ${W.muted};padding:3.5mm 0}.step img,.nature img{height:24mm}a{color:${W.ink}}table{break-inside:avoid}.print-calibration{display:flex}}`}var Be={A4:[210,297],US_LETTER:[215.9,279.4]};var ms={en:["Butterfly Glider","Experimental paper glider","Print at 100% / actual size. Measure the line before cutting.","Solid outline: cut. Dashed roots: fold both wings up equally.","Dotted trim marks: leave flat for the first comparison.","Slide the same paper clip onto the nose. Align its rear end with A or B.","Try plain copier paper. Record the actual paper and clip used.","Calibration","Flat span","Source"],ru:["Планер-бабочка","Экспериментальный бумажный планер","Печатайте в масштабе 100%. Измерьте линию перед вырезанием.","Вырежьте по контуру. По штриховым линиям одинаково поднимите крылья.","Линии мелкого пунктира оставьте плоскими для первого опыта.","Наденьте скрепку на нос. Совместите её задний конец с меткой A или B.","Возьмите офисную бумагу. Запишите, какую бумагу и скрепку использовали.","Контроль масштаба","Размах развёртки","Исходник"],es:["Planeador mariposa","Planeador de papel experimental","Imprime al 100 % en tamaño real. Mide la línea antes de recortar.","Recorta por el contorno continuo. Levanta ambas alas por las líneas de trazos.","Deja planas las aletas marcadas con puntos para la primera comparación.","Desliza el mismo clip por la punta. Alinea su extremo trasero con A o B.","Prueba con papel normal de impresora. Anota el papel y el clip que uses.","Control de escala","Envergadura en plano","Archivo fuente"]};function Ir(e,t,n){let[o,r]=Be[t],i=ms[n],{ref:a,parameters:s,appearance_id:l}=e,{lines:c,labels:d}=to(s.span_mm,l,o/2,54),p=(h,m,u,f,y="#23362e")=>d.push({x:h,y:m,text:u,size:f,color:y});p(14,17,"OPEN FLIGHT",3.6,"#486456"),p(14,31,i[0],8.5),p(14,40,i[1]+"  /  "+a.design_id+"  /  "+a.revision_id,3.2),p(14,165,i[8]+"  "+s.span_mm+" mm",3.7),i.slice(3,7).forEach((h,m)=>p(14,177+m*6,h,3.15)),p(14,211,i[7]+"  /  50 mm",3.6),c.push({id:"ruler",points:[[14,218],[64,218]],stroke:"#20382f",weight:0.42});for(let h=0;h<=50;h+=5)c.push({id:"tick-"+h,points:[[14+h,218],[14+h,h%10===0?214.8:216.3]],stroke:"#20382f",weight:0.32});return p(14,227,i[2],3.1),p(14,r-17,i[9]+" SHA-256",2.8),p(14,r-12,a.source_sha256,2.7),p(14,r-7,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",2.5),{width:o,height:r,lines:c,labels:d}}function hs(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function ho(e){let{width:t,height:n,lines:o,labels:r}=e,i=o.map((s)=>{let l="M"+s.points.map((c)=>c.join(" ")).join(" L")+(s.closed?" Z":"");return'<path id="'+s.id+'" d="'+l+'" fill="'+(s.fill??"none")+'" stroke="'+(s.stroke??"none")+'" stroke-width="'+(s.weight??0)+'"'+(s.dash?' stroke-dasharray="'+s.dash.join(" ")+'"':"")+"/>"}),a=r.map((s)=>'<text x="'+s.x+'" y="'+s.y+'" font-size="'+s.size+'" fill="'+(s.color??"#23362e")+'">'+hs(s.text)+"</text>");return ee.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'mm" height="'+n+'mm" viewBox="0 0 '+t+" "+n+'" font-family="DejaVu Sans, sans-serif" stroke-linejoin="round">'+[...i,...a].join(`
`)+`</svg>
`)}function Tr(e){return ho({width:200,height:110,...to(e.parameters.span_mm,e.appearance_id,100,7)})}var us=new URL("../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","https://print.invalid/packages/print-export/b1-frozen.ts"),fs=oe(new URL("../../node_modules/dejavu-fonts-ttf/LICENSE","https://print.invalid/packages/print-export/b1-frozen.ts"),"utf8"),Br;function Cr(e,t=[]){let n=new Ge({unit:"mm",format:[e.width,e.height],compress:!0,putOnlyUsedFonts:!0,precision:5});n.setCreationDate("D:20000101000000+00'00'");let o=t.length?[e,...t]:e;if(n.setFileId(Z(JSON.stringify(o)).slice(0,32)),e.locale)n.setLanguage(e.locale);n.setProperties({title:"Open Flight - Butterfly Glider",author:"Open Flight contributors",subject:`Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. Embedded font notices:
`+fs}),Br??=oe(us).toString("base64"),n.addFileToVFS("DejaVuSans.ttf",Br),n.addFont("DejaVuSans.ttf","DejaVu","normal"),n.setFont("DejaVu","normal");for(let[r,i]of[e,...t].entries()){if(r)n.addPage([i.width,i.height]);n.setLineJoin("round");for(let a of i.lines){if(a.stroke)n.setDrawColor(a.stroke);if(a.fill)n.setFillColor(a.fill);n.setLineWidth(a.weight??0),n.setLineDashPattern(a.dash??[],0);let s=a.points.map((l,c)=>({op:c?"l":"m",c:l}));if(n.path(s),a.closed)n.close();if(a.fill&&a.stroke)n.fillStroke();else if(a.fill)n.fill();else n.stroke()}for(let a of i.labels)n.setFontSize(a.size*72/25.4),n.setTextColor(a.color??"#23362e"),n.text(a.text,a.x,a.y)}return ee.from(n.output("arraybuffer"))}var uo={text:new URL("../../apps/editor/assets/fonts/OpenFlightText-Regular.ttf","https://print.invalid/packages/print-export/fonts.ts"),bold:new URL("../../apps/editor/assets/fonts/OpenFlightText-Bold.ttf","https://print.invalid/packages/print-export/fonts.ts"),display:new URL("../../apps/editor/assets/fonts/Alegreya-Bold.ttf","https://print.invalid/packages/print-export/fonts.ts")},Or;function yt(){return Or??={text:oe(uo.text).toString("base64"),bold:oe(uo.bold).toString("base64"),display:oe(uo.display).toString("base64")},Or}var fo=new WeakSet;function $r(e,t,n){let o=Ir(e,t,n);return fo.add(o),o}function Dr(e){return Tr(e)}function gs(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function le(e){if(fo.has(e))return ho(e);let{width:t,height:n,lines:o,labels:r}=e,i=o.map((s)=>{let l="M"+s.points.map((c)=>c.join(" ")).join(" L")+(s.closed?" Z":"");return'<path id="'+s.id+'" d="'+l+'" fill="'+(s.fill??"none")+'" stroke="'+(s.stroke??"none")+'" stroke-width="'+(s.stroke?et(s.weight):0)+'"'+(s.dash?' stroke-dasharray="'+s.dash.join(" ")+'"':"")+"/>"}),a=r.map((s)=>'<text x="'+s.x+'" y="'+s.y+'" font-size="'+tt(s.size)+'" fill="'+(s.color??A)+(s.font==="display"?'" font-family="Alegreya, Georgia, serif" font-weight="700':s.font==="bold"?'" font-weight="700':"")+'">'+gs(s.text)+"</text>");return ee.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'mm" height="'+n+'mm" viewBox="0 0 '+t+" "+n+'" font-family="Open Flight Text, Andika, sans-serif" stroke-linejoin="round">'+[...i,...a].join(`
`)+`</svg>
`)}function _t(e,t=[]){if(fo.has(e))return Cr(e,t);let n=new Ge({unit:"mm",format:[e.width,e.height],compress:!0,putOnlyUsedFonts:!0,precision:5});n.setCreationDate("D:20000101000000+00'00'");let o=t.length?[e,...t]:e;if(n.setFileId(Z(JSON.stringify(o)).slice(0,32)),e.locale)n.setLanguage(e.locale);n.setProperties({title:"Open Flight - Butterfly Glider",author:"Open Flight contributors",subject:"Original design: CERN-OHL-W-2.0. Artwork and text: © Open Flight, free for personal and classroom use; all other rights reserved. "+ft}),gt(n,yt()),n.viewerPreferences({PrintScaling:"None"});for(let[r,i]of[e,...t].entries()){if(r)n.addPage([i.width,i.height]);n.setLineJoin("round");for(let a of i.lines){if(a.stroke)n.setDrawColor(a.stroke);if(a.fill)n.setFillColor(a.fill);n.setLineWidth(a.stroke?et(a.weight):0),n.setLineDashPattern(a.dash??[],0);let s=a.points.map((l,c)=>({op:c?"l":"m",c:l}));if(n.path(s),a.closed)n.close();if(a.fill&&a.stroke)n.fillStroke();else if(a.fill)n.fill();else n.stroke()}for(let a of i.labels)bt(n,a.font),n.setFontSize(tt(a.size)*72/25.4),n.setTextColor(a.color??A),n.text(a.text,a.x,a.y)}return ee.from(n.output("arraybuffer"))}var bs={en:{lab:"BUTTERFLY WORKSHOP",names:{monarch:"Monarch",morpho:"Blue Morpho",swallowtail:"Swallowtail"},flatSpan:"flat wingspan",scale:"Measure this line",print:"Print at 100% / actual size",legend:["Cut","Wing fold","Tab fold"],heading:"Build your butterfly",step:["Cut out the shape","Lift both wings","Clip the nose","Set each tail tab"],cut:["Follow the outside edge and the","two solid slits on each rear tab.","Stop at the dots. Keep the hinge."],fold:["Print side up, nose away. Keep the","center flat. Measure both outer tips."],clip:["Slide one small, blunt paper clip","onto the nose. Stop its back end","at the cross. Keep the clip in place."],tabs:["Read left and right from behind.","Bend each tab from its own wing."],side:["Left","Right"],flat:"flat",up:"up",down:"down",launch:"Launch gently and level in a clear space.",compare:"Try five level glides with flat tabs. Change one tab, then compare five more.",materials:"Use one sheet of plain copier paper and one small paper clip. Record which ones you use.",note:"Experimental paper glider",source:"Source",mm:"mm",sideMark:["L","R"]},ru:{lab:"МАСТЕРСКАЯ БАБОЧЕК",names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},flatSpan:"размах развёртки",scale:"Измерь эту линию",print:"Печать в масштабе 100%",legend:["Разрез","Сгиб крыла","Сгиб закрылка"],heading:"Собери свою бабочку",step:["Вырежи контур","Подними крылья","Надень скрепку","Отогни язычки"],cut:["Вырежи бабочку по контуру.","Сделай по два надреза на закрылках.","Остановись у точек. Сохрани сгиб."],fold:["Рисунком вверх, носом от себя.","Измерь высоту краёв над столом."],clip:["Надень на нос небольшую скрепку","с тупым концом. Совмести её задний","край с крестиком. Оставь её на месте."],tabs:["Смотри на бабочку сзади.","Отгибай закрылок от плоскости крыла."],side:["Левый","Правый"],flat:"ровно",up:"вверх",down:"вниз",launch:"Запускай мягко и ровно на свободном месте.",compare:"Сделай пять запусков с плоскими закрылками. Отогни один и сравни ещё пять полётов.",materials:"Возьми лист обычной офисной бумаги и небольшую скрепку. Запиши, какие именно.",note:"Экспериментальный планер",source:"Исходник",mm:"мм",sideMark:["Л","П"]},es:{lab:"TALLER DE MARIPOSAS",names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Macaón"},flatSpan:"de envergadura en plano",scale:"Mide esta línea",print:"Imprime al 100 %",legend:["Corte","Pliegue del ala","Pliegue de la aleta"],heading:"Construye tu mariposa",step:["Recorta la forma","Levanta las dos alas","Coloca el clip","Ajusta las aletas"],cut:["Recorta el borde y los dos cortes","cortos de cada aleta de cola.","Para en los puntos. Deja el pliegue."],fold:["Dibujo arriba, punta lejos de ti.","Mide los dos extremos desde la mesa."],clip:["Desliza un clip pequeño por la punta.","Alinea el extremo de atrás con la cruz.","Deja el clip en el mismo sitio."],tabs:["Mira desde atrás para ver los lados.","Dobla cada aleta desde su ala."],side:["Izquierda","Derecha"],flat:"plana",up:"arriba",down:"abajo",launch:"Lanza suave y a nivel en un espacio despejado.",compare:"Haz cinco planeos con las aletas planas. Cambia una aleta y compara otros cinco.",materials:"Usa papel normal de impresora y un clip pequeño. Anota cuáles usaste.",note:"Planeador de papel experimental",source:"Archivo fuente",mm:"mm",sideMark:["I","D"]}},ys={monarch:"Danaus plexippus",morpho:"Morpho peleides",swallowtail:"Papilio machaon"},te=A,me=D,Lt=Sr,go="#FFFFFF";function _s(e){if(e.id==="cut")return{...e,stroke:Y.cut.stroke,weight:Y.cut.weight};if(e.id.startsWith("root-fold-")&&!e.id.endsWith("-halo"))return{...e,...Y.valley};if(e.id.startsWith("tab-hinge-")&&!e.id.endsWith("-halo"))return{...e,...Y.guide,stroke:A};if(e.id.startsWith("tab-slit-")&&!e.id.endsWith("-halo"))return{...e,stroke:A,weight:Y.cut.weight};return e}function wt(e,t,n,o){return Array.from({length:27},(r,i)=>{let a=2*Math.PI*i/26;return[x(e+Math.cos(a)*n),x(t+Math.sin(a)*o)]})}function ws(e,t){let n=String(Math.round(e*10)/10);return t==="en"?n:n.replace(".",",")}function Rr(e,t,n){let o=co(e,t,n),r=1.75,i=t.span_mm+3.5,a=x(o.maxY-o.minY+3.5);return le({width:i,height:a,lines:po(o.lines,i/2,1.75-o.minY),labels:[]})}function tn(e,t,n,o){let[r,i]=Be[n],a=bs[o],s=e.geometry,{parameters:l,appearance_id:c,ref:d}=t,p=co(e,l,c,!0),h=45-p.minY,m=po(p.lines,r/2,h).map(_s),u=[],f=(H,R,G=te,he=0.4,ue)=>m.push({id:H,points:R,stroke:G,weight:he,dash:ue}),y=(H,R,G,he,ue=0.28)=>m.push({id:H,points:R,closed:!0,fill:G,stroke:he,weight:ue}),g=(H,R,G,he=3.1,ue=te,fe="text")=>u.push({x:H,y:R,text:G,size:he,color:ue,font:fe}),_=(H,R,G,he=4.9)=>G.forEach((ue,fe)=>g(H,R+fe*he,ue,3.05)),k=(H,R,G)=>{y("number-ring-"+H,wt(R+2.6,G-1.3,2.65,2.65),te),g(R+1.71,G-0.23,String(H+1),2.9,"#FFFFFF"),g(R+7.3,G,a.step[H],E.step,te,"bold")},I=e.palettes[c].sun,M=c==="coloring"?te:e.palettes.natural.shade,S=Ye(13,9);m.push(...S.lines),u.push(...S.labels),g(13+S.width+3,12.6,a.lab,E.min,me),g(12.6,27.1,a.names[e.species],E.display,te,"display"),g(13,35,ys[e.species]+"   ·   "+l.span_mm+" "+a.mm+" "+a.flatSpan,E.min,me);let T=r-74;g(T,14.3,a.scale+"  ·  50 "+a.mm,E.min,te,"bold");let B=qe(T,23.5,o,{note:!1});m.push(...B.lines),u.push(...B.labels),g(T,31.1,a.print,E.min,me),f("masthead-rule",[[13,39.3],[r-13,39.3]],me,0.3);for(let[H,R]of[-1,1].entries()){let[G,he]=p.tab.fromHinge(0.5,s.tab_depth_mm*0.48),ue=r/2+R*G*l.span_mm/200,fe=h+he;y("tab-badge-"+H,wt(ue,fe,1.9,1.9),go),g(ue-0.92,fe+0.95,a.sideMark[H],2.65)}let w=150,v=[13,77,r-72],z=[void 0,Y.valley.dash,Y.guide.dash];v.forEach((H,R)=>{f("legend-"+R,[[H,w-1],[H+9.5,w-1]],te,0.55,z[R]),g(H+12,w,a.legend[R],3.15)}),f("instruction-rule",[[13,154.8],[r-13,154.8]],me,0.35),g(13,163.3,a.heading,E.title,te,"display");let C=r/2+3;k(0,13,172.4),_(13,179,a.cut),f("diagram-tab-trailing",[[16,196.2],[46,196.2]],te,0.42),f("diagram-tab-slit-one",[[21,196.2],[21,192.2]],te,0.52),f("diagram-tab-slit-two",[[39.5,196.2],[39.5,192.2]],te,0.52),f("diagram-tab-fold",[[21,192.2],[39.5,192.2]],Lt,0.48,[0.55,0.85]);for(let[H,R]of[21,39.5].entries())y("diagram-slit-stop-"+H,wt(R,192.2,0.84,0.84),go,te,0.4);k(1,C,172.4);let F=s.target_dihedral_deg*Math.PI/180,P=C+27,O=183.5,N=17,ne=N*Math.tan(F);f("front-view-datum",[[P-3.2-N,O],[P+3.2+N,O]],me,0.25,[1,1]),f("front-view-fold",[[P-3.2-N,O-ne],[P-3.2,O],[P+3.2,O],[P+3.2+N,O-ne]],M,0.9),f("front-view-rise",[[P+5.2+N,O-ne],[P+5.2+N,O]],te,0.32),f("front-view-rise-left",[[P-5.2-N,O-ne],[P-5.2-N,O]],te,0.32);for(let[H,R]of[P-3.2-N,P+3.2+N].entries())y("diagram-outer-tip-"+H,wt(R,O-ne,0.75,0.75),go,te,0.35);g(P+8+N,O-1.2,s.target_dihedral_deg+"°",3.3),g(P+8+N,O+3.9,"≈ "+Math.round(en(e,l.span_mm))+" "+a.mm,3.1,Lt),_(C,189.8,a.fold),f("row-rule",[[13,199],[r-13,199]],me,0.27),k(3,C,208);for(let[H,R]of[l.left_trim_deg,l.right_trim_deg].entries()){let G=C+H*42,fe=R*Math.PI/180,qt=[G+3+20*Math.cos(fe),220-20*Math.sin(fe)];f("gauge-neutral-"+H,[[G,220],[G+26,220]],me,0.31,[1.3,1]),f("gauge-tab-"+H,[[G+3,220],qt],M,0.55),y("gauge-hinge-"+H,wt(G+3,220,0.75,0.75),te),g(G,215,a.side[H]+"  "+(R>0?"+":"")+R+"°",3.05);let lt=Math.abs(lo(e,l.span_mm,R)),Tn=R===0?a.flat:ws(lt,o)+" "+a.mm+" "+(R>0?a.up:a.down);g(G,226,Tn,2.95,Lt)}_(C,232,a.tabs),k(2,13,208),_(13,215,a.clip);let U=24,L=228.2;f("nose-schematic",[[U-3.5,L+10],[U-3.5,L],[U+3.5,L],[U+3.5,L+10]],me,0.34),f("nose-target",[[U-5.1,L+7],[U+5.1,L+7]],Lt,0.4,[1.1,0.8]),f("nose-cross",[[U,L+5.7],[U,L+8.3]],Lt,0.38),f("clip-illustration",[[U+1.5,L+2],[U+1.5,L-1.1],[U+0.9,L-2.1],[U-1.05,L-2.1],[U-1.9,L-1.1],[U-1.9,L+5.8],[U-1.3,L+7],[U+1.4,L+7],[U+2.1,L+5.8],[U+2.1,L+0.9]],M,0.48),y("clip-color-key",wt(U+8,L+6.8,0.8,0.8),I,te,0.22),g(U+10,L+7.8,s.clip_rear_from_nose_mm+" "+a.mm,2.95),f("test-rule",[[13,242],[r-13,242]],me,0.35),g(13,247.5,a.launch,3.1),g(13,252,a.compare,3.1),g(13,256.5,a.materials,2.85,me);let Me="/v1/designs/"+d.design_id+"/revisions/"+d.revision_id;return g(13,i-17.7,a.source+"  "+Me,2.6,me),g(13,i-12.8,"SHA-256  "+d.source_sha256,2.55,me),g(13,i-7.8,a.note+"   /   CERN-OHL-W-2.0   /   CC BY-SA 4.0",2.55,me),{width:r,height:i,lines:m,labels:u,locale:o}}var Re=(e)=>Error(e);function Bt(e){if(e===void 0)return;let t=pe.find((n)=>n.species===e);if(!t)throw Re("This butterfly model is unavailable.");return t}var jr=[ge,...pe],bo=(e)=>Bt(e)??ge,nn=(e)=>e===void 0?eo:so;function on(e){return{span_mm:e.span_mm,left_trim_deg:e.left_trim_deg??0,right_trim_deg:e.right_trim_deg??0}}function rn(e,t,n){let o=Bt(n.species_id),{parameters:r,appearance_id:i}=n,a=o?Qt(o,e,t,on(r),i):Fr(e,t,r.span_mm,i);return Zt(a)}function an(e){let t=Bt(e.species_id);return t?Er(t,on(e.parameters)):Mr(e.parameters.span_mm)}function Nr(e){let t=Bt(e.species_id);return t?Rr(t,on(e.parameters),e.appearance_id):Dr(e)}function Ur(e,t,n){let o=Bt(e.species_id);return o?tn(o,{...e,parameters:on(e.parameters)},t,n):$r(e,t,n)}function yo(e,t={},n){let o=bo(e.species_id),r=o.parameter_definitions;for(let[a,s]of Object.entries(t)){let l=r.find((c)=>c.name===a);if(!l)throw Re("Unknown parameter for this butterfly: "+a);if(!Number.isFinite(s)||s<l.minimum||s>l.maximum||!Number.isInteger((s-l.minimum)/l.step))throw Re(`Choose ${a} from ${l.minimum} to ${l.maximum} in increments of ${l.step}.`)}let i=n??e.appearance_id;if(!o.appearances.some((a)=>a.appearance_id===i))throw Re("Select an appearance available for this butterfly.");return{parameters:{...e.parameters,...t},appearance_id:i}}var xs={en:{title:"Picture guide",span:"Flat wingspan",left:"Left tab",right:"Right tab",paint:"Colors",up:"up",down:"down",flat:"flat",palette:{natural:"Field colors",carnival:"Carnival",twilight:"Twilight",coloring:"Color your own"},look:"Look from behind the tail toward the nose.",page2:"Fold, tune and try",question:"Flight experiment",mm:"mm",reference:"In the wild",model:"Template",source:"Source",photo:"Photo",folds:"Build steps",tipHeight:"Target height at each outer tip",buildNote:"Optional build note: write down which steps needed help and the two tip heights you measured."},ru:{title:"Инструкция с рисунками",span:"Размах развёртки",left:"Левый язычок",right:"Правый язычок",paint:"Цвета",up:"вверх",down:"вниз",flat:"ровно",palette:{natural:"Окрас бабочки",carnival:"Карнавал",twilight:"Сумерки",coloring:"Раскрась сам"},look:"Смотри от хвоста к носу.",page2:"Сложи, настрой и запусти",question:"Опыт с полётом",mm:"мм",reference:"В природе",model:"Шаблон",source:"Исходник",photo:"Фото",folds:"Шаги сборки",tipHeight:"Высота края каждого крыла",buildNote:"По желанию запиши, на каких шагах понадобилась помощь и какой получилась высота с каждой стороны."},es:{title:"Guía ilustrada",span:"Envergadura en plano",left:"Aleta izquierda",right:"Aleta derecha",paint:"Colores",up:"arriba",down:"abajo",flat:"plana",palette:{natural:"Colores naturales",carnival:"Carnaval",twilight:"Atardecer",coloring:"Para colorear"},look:"Mira desde la cola hacia la punta.",page2:"Coloca el clip, ajusta y planea",question:"Experimento de vuelo",mm:"mm",reference:"En la naturaleza",model:"Patrón",source:"Archivo fuente",photo:"Foto",folds:"Pasos de montaje",tipHeight:"Altura de cada extremo",buildNote:"Si quieres, anota en qué pasos necesitaste ayuda y cuánto medía cada extremo."}},re=(e)=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");function Hr(e){let t=/^\/assets\/field-guide\/([a-z0-9-]+\.(svg|jpg))$/.exec(e);if(!t)throw Error("Unknown field-guide illustration");let n=oe(new URL("../../apps/editor/assets/field-guide/"+t[1],"https://print.invalid/packages/print-export/build-guide.ts"));return"data:"+(t[2]==="svg"?"image/svg+xml":"image/jpeg")+";base64,"+n.toString("base64")}function zr(e,t,n,o){let r=e[o],i=xs[o],a=(g)=>g===0?"0° · "+i.flat:Math.abs(g)+"° "+(g>0?i.up:i.down),s=t.parameters,l=i.palette[t.appearance_id]??t.appearance_id,c=(g,_)=>"<div><dt>"+g+"</dt><dd>"+re(_)+"</dd></div>",d=[c(i.span,s.span_mm+" "+i.mm),c(i.left,a(s.left_trim_deg)),c(i.right,a(s.right_trim_deg)),c(i.paint,l)].join(""),p=pe.find((g)=>g.species===e.id),h=Math.round(en(p,s.span_mm)),m=r.steps.map((g,_)=>`<section class="step"><span class="number">${_+1}</span>
    <div><h3>${re(g.title)}</h3><p>${re(g.body)}</p>${g.id==="fold"?`<p><strong>${i.tipHeight} · ≈ ${h} ${i.mm}</strong></p>`:""}</div>
    <img src="${Hr(g.diagram)}" alt=""></section>`),u=e.photo.local_path?`<img class="photo" src="${Hr(e.photo.local_path)}" alt="${re(r.photo_alt)}">`:"",f=re(r.common_name),y=re(t.ref.design_id)+" / "+re(t.ref.revision_id);return`<!doctype html><html lang="${o}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${f} · ${i.title} · Open Flight</title><style>
${Lr({paper:n})}
</style><article><header><b>Open Flight</b><span>${i.title} · 1 / 2</span></header>
<h1>${f}</h1><p><i>${re(e.scientific_name)}</i></p><dl>${d}</dl><p>${i.look}</p>
<h2>${i.folds}</h2>${m.slice(0,3).join("")}
<div class="nature">${u}<div><h3>${i.reference}</h3><p>${re(r.observation)}</p><small>${i.photo} · <a href="${re(e.photo.url)}">${re(e.photo.creator)} · Pixabay</a></small></div></div>
<footer>${i.model} · ${y}</footer></article>
<article><header><b>Open Flight · ${f}</b><span>${i.title} · 2 / 2</span></header><h2>${i.page2}</h2>
${m.slice(3).join("")}<h2>${i.question}</h2><p>${re(r.flight_question)}</p><p>${i.buildNote}</p>
<footer><a href="${re(e.trim_reference.url)}">${re(e.trim_reference.source)}</a> · <a href="${re(e.natural_history.url)}">${re(e.natural_history.source)}</a><br>${i.model} · ${y}<br>${i.source} SHA-256 · ${re(t.ref.source_sha256)}</footer></article></html>`}var Wr={monarch:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 12° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 12° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}},morpho:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 16° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 16° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}},swallowtail:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 10° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 10° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}}};var nt=JSON.parse(oe(new URL("../field-guide/species.json","https://print.invalid/packages/product-core/content.ts"),"utf8")),ks=[["build-en","en","lesson","Build the Butterfly Glider","Cut, fold and set the clip.","content/en/butterfly-001/build.md"],["build-ru","ru","lesson","Соберите планер-бабочку","Вырежьте планер, согните крылья и установите скрепку.","content/ru/butterfly-001/build.md"],["build-es","es","lesson","Construye el planeador mariposa","Recorta, dobla y coloca el clip.","content/es/butterfly-001/build.md"],["garden-gate-en","en","game","Garden Gate","Count gate passes and measure landing error.","games/garden-gate/en.md"],["garden-gate-ru","ru","game","Садовые ворота","Считайте проходы и измеряйте расстояние до цветка.","games/garden-gate/ru.md"],["garden-gate-es","es","game","La puerta del jardín","Cuenta los cruces por la puerta y mide la distancia hasta la flor.","games/garden-gate/es.md"]],Fs=ks.map(([e,t,n,o,r,i])=>{let a=oe(new URL("../../"+i,"https://print.invalid/packages/product-core/content.ts"),"utf8");return{ref:{activity_id:e,revision_id:"a1",content_sha256:Z(a)},kind:n,title:o,locale:t,aircraft_kinds:["butterfly_glider"],summary:r,content_markdown:a,evidence_classification:n==="game"?"untested_activity":"instruction"}});function Kr(e,t,n){let o=e[t],r=n==="w1"&&t!=="es"?Wr[e.id][t]:void 0,i={en:"Build the ",ru:"Соберите планер «",es:"Construye la mariposa "}[t]+o.common_name+(t==="ru"?"»":""),a=["# "+i,o.observation,...o.steps.map((s,l)=>{let c=r&&(s.id==="fold"||s.id==="launch")?r[s.id]:s.body;return"## "+(l+1)+". "+s.title+`

`+c}),o.flight_question,"["+e.photo.creator+" · Pixabay]("+e.photo.url+")","["+e.trim_reference.source+"]("+e.trim_reference.url+")"].join(`

`)+`
`;return{ref:{activity_id:"workshop-"+e.id+"-"+t,revision_id:n,content_sha256:Z(a)},kind:"lesson",title:i,locale:t,aircraft_kinds:["butterfly_glider"],summary:o.flight_question,evidence_classification:"instruction",content_markdown:a,species_id:e.id}}var Ps=nt.flatMap((e)=>["en","ru","es"].map((t)=>Kr(e,t,"w2"))),Ms=nt.flatMap((e)=>["en","ru"].map((t)=>Kr(e,t,"w1"))),Gr=[...Fs,...Ps].sort((e,t)=>e.ref.activity_id<t.ref.activity_id?-1:e.ref.activity_id>t.ref.activity_id?1:0);function qr(e,t){let n=(o)=>o.ref.activity_id===e&&o.ref.revision_id===t;return Gr.find(n)??Ms.find(n)}function sn(e,t){return Gr.filter((n)=>(!t||n.locale===t)&&(n.kind==="game"||("species_id"in n?n.species_id===e:e===void 0)))}function Yr(e,t,n="en"){let o=t?.species_id,r=t?.parameters;return{schema_version:1,record_type:"flight_test",test_id:e.design_id+"-"+e.revision_id+"-planned",status:"planned",is_example:!1,evidence_kind:"physical",design:{design_id:e.design_id,revision:e.revision_id,source_sha256:e.source_sha256},protocol:{protocol_id:o?"wing-trim":"clip-position",revision:o?"w1":"b1",acceptance_rule:null,defined_at:null},setup:{aircraft_instance_id:null,material_spec:null,finished_mass_g:null,balance_mm_from_nose:null,launch_method:null,release_height_m:null,environment:null},performed_at:null,performed_by:null,trials:[],evidence_artifacts:[],review:{decision:"pending",reviewer:null,reviewed_at:null},notes:o&&r?n==="ru"?`Размах развёртки ${r.span_mm} мм. Если смотреть сзади, левый клапан ${r.left_trim_deg}°, правый ${r.right_trim_deg}°. Плюс означает сгиб вверх. Сравните плоские клапаны с одним изменённым. Чередуйте настройки по пять бросков с одной высоты. Используйте те же бумагу и скрепку. Запишите направление и место посадки при каждой попытке.`:n==="es"?`Montaje previsto de ${o}, envergadura en plano de ${r.span_mm} mm. Desde atrás, aleta izquierda ${r.left_trim_deg}° y derecha ${r.right_trim_deg}°. El signo + indica hacia arriba. Empieza con las aletas planas. Compara cinco lanzamientos con cada ajuste, cambiando una sola aleta. Mantén el mismo papel, clip y altura. Anota la dirección y el primer contacto con el suelo en cada intento.`:`Planned ${o} build, ${r.span_mm} mm flat span. Set left trim to ${r.left_trim_deg}° and right trim to ${r.right_trim_deg}°, viewed from behind (positive up). Start with flat tabs and change one tab. Alternate five gentle releases of each configuration with the same paper, clip and height. Record every landing and observed direction.`:{en:"Plan only. Record the actual station, stock, print calibration and launch conditions with the raw observations.",ru:"Запишите положение скрепки, бумагу, контроль масштаба и условия запуска вместе с наблюдениями.",es:"Anota la posición del clip, el papel, la escala de impresión y las condiciones de lanzamiento junto con las observaciones."}[n]}}function _o(e,t,n,o,r,i,a,s,l){let c=bo(l),d={parameters:o,appearance_id:r,species_id:l},p=rn(e,t,d),h={design_id:e,revision_id:t,source_sha256:Z(p)};return{source:p,dto:{ref:h,head_revision_id:t,name:n,kind:"butterfly_glider",...l?{species_id:l}:{},visibility:i?"private":"public",parameters:o,parameter_definitions:c.parameter_definitions,appearance_id:r,supported_appearances:c.appearances,evidence_state:i?"modified_experiment":"concept",evidence_record_ids:[],geometry:an(d),created_at:s,provenance:{origin:a,parent:i,generator_revision:nn(l),rights:c.rights}}}}function Vr(e,t,n){let{dto:o,source:r}=e,i=sn(o.species_id,t.locale),a=(t.activities??[]).map((l)=>{let c=i.find((d)=>d.ref.activity_id===l.activity_id&&d.ref.revision_id===l.revision_id&&d.ref.content_sha256===l.content_sha256);if(!c)throw Re("Select an exact activity revision in the requested language.");return c}),s=t.formats.some((l)=>l==="pdf"||l==="svg")?Ur(o,t.page_size,t.locale):void 0;for(let l of t.formats)switch(l){case"svg":n("print-svg","image/svg+xml",le(s));break;case"pdf":n("print-pdf","application/pdf",_t(s));break;case"source_json":n("source","application/json",r);break;case"trial_sheet":n("trial","application/json",JSON.stringify(Yr(o.ref,o,t.locale),null,2)+`
`);break;case"illustrated_guide":{let c=nt.find((p)=>p.id===o.species_id);if(!c)throw Re("The picture guide is available for the three workshop butterflies.");let d=i.find((p)=>p.kind==="lesson");n("guide","text/html",zr(c,o,t.page_size,t.locale),[d.ref]);break}case"instructions":case"activity_assets":{let c=l==="instructions"?"lesson":"game",p=(a.length?a:i).filter((h)=>h.kind===c);if(!p.length)throw Re("Select a matching "+c+" for "+l+" or omit the activity filter.");for(let h of new Set(p)){let m=o.ref.design_id+" / "+o.ref.revision_id+" / "+o.ref.source_sha256+`

`;n(c,"text/markdown",m+h.content_markdown,[h.ref])}break}}}var Xr=["cut","center","wings","table","clip","launch"],wo={en:[["Cut out your butterfly","Start with the colors up and the nose pointing away. Cut only around the outside edge. Keep the paper between the wings whole. Ask a helper to cut around the tight corners.","The butterfly is one piece, with three fold lines down the middle."],["Bring the wingtips together","Lift both wings until the tips meet and the colored faces touch. Pinch the dotted center crease from nose to tail.","The tips line up and the colors are inside."],["Fold each wing back","Ask a helper to pinch the folded strip, or hold it with one hand. Fold one whole wing out along its dash-dot line, then the other.","Each wing has its own crease, and the two layers of the strip still touch."],["Set the wings flat","Place the butterfly color-side down on a flat table. Keep the folded strip standing straight up as you gently press both wings onto the table.","Both wings touch the table. The folded strip stands between them."],["Turn over and add the clip","Turn it color-side up, with the folded strip underneath. Slide a small rounded paper clip (about 6–8 mm wide) onto the nose so it grips both layers. Look from the side and stop with the back of the clip directly under the dots by the folds.","The clip holds both layers. Both wings sit at the same height."],["Let it glide","Hold the folded strip just behind the clip. Point the nose straight ahead with both wings level, then let go with a gentle forward push.","Watch where it touches down first. Point to that spot, or mark it and compare five launches."]],es:[["Recorta tu mariposa","Pon los colores hacia arriba y apunta la punta hacia delante. Recorta solo el borde de fuera. Deja entera la parte entre las alas. Pide ayuda para recortar las esquinas más cerradas.","La mariposa queda en una sola pieza, con tres líneas de doblez en el centro."],["Junta las puntas de las alas","Levanta las dos alas hasta juntar sus puntas y las caras de color. Marca con los dedos el doblez central de puntos, de la punta a la cola.","Las puntas coinciden y el color queda dentro."],["Dobla cada ala hacia fuera","Pide ayuda para sujetar la tira doblada o sujétala con una mano. Dobla un ala entera hacia fuera por su línea de rayas y puntos, y luego la otra.","Cada ala tiene su propio doblez y las dos capas de la tira siguen juntas."],["Apoya las alas en la mesa","Pon la mariposa con el color hacia abajo sobre una mesa plana. Mantén la tira doblada de pie y presiona suavemente las dos alas contra la mesa.","Las dos alas tocan la mesa. La tira doblada queda de pie entre ellas."],["Dale la vuelta y pon el clip","Dale la vuelta para dejar el color arriba y la tira doblada debajo. Desliza un clip pequeño y redondeado (de unos 6–8 mm de ancho) en la punta, abrazando las dos capas. Mira de lado y deja el extremo trasero del clip justo debajo de los puntos junto a los dobleces.","El clip agarra las dos capas. Las alas quedan a la misma altura."],["Deja que planee","Sujeta la tira doblada justo detrás del clip. Apunta la punta hacia delante con las alas a la misma altura, y suelta la mariposa con un empujón suave.","Mira dónde toca el suelo por primera vez. Señala ese lugar, o márcalo y compara cinco lanzamientos."]],ru:[["Вырежи бабочку","Положи лист цветной стороной вверх, носом от себя. Вырежи бабочку только по внешнему краю. Оставь бумагу между крыльями целой. Попроси взрослого помочь с крутыми поворотами.","Бабочка осталась целой, а в центре видны три линии сгиба."],["Соедини кончики крыльев","Подними оба крыла, чтобы их кончики совпали, а цветные стороны соприкоснулись. Прижми пальцами сгиб по точкам от носа до хвоста.","Кончики совпадают, цветные стороны внутри."],["Отогни каждое крыло","Попроси взрослого придержать сложенную полоску или зажми её одной рукой. Отогни одно крыло целиком наружу по линии из штрихов и точек, потом второе.","У каждого крыла свой сгиб, а слои полоски прижаты друг к другу."],["Уложи крылья на стол","Положи бабочку цветной стороной вниз на ровный стол. Держи сложенную полоску торчком и мягко прижми оба крыла к столу.","Оба крыла касаются стола. Сложенная полоска стоит между ними."],["Переверни и надень скрепку","Переверни бабочку цветной стороной вверх, чтобы сложенная полоска оказалась снизу. Надень на нос маленькую закруглённую скрепку шириной около 6–8 мм, захватив оба слоя. Посмотри сбоку. Задний край скрепки должен быть прямо под точками у сгибов.","Скрепка держит оба слоя. Крылья на одной высоте."],["Отпусти бабочку в полёт","Держи сложенную полоску сразу за скрепкой. Направь нос прямо перед собой, выровняй крылья и отпусти бабочку лёгким толчком вперёд.","Заметь, где бабочка впервые коснулась пола. Покажи это место или отметь его и сравни пять запусков."]]},vs={en:{pattern:"Printed side up",center:"Center fold",wings:"Wing folds",rear:"From tail toward nose",side:"Side view",start:"Start",finish:"Finish",table:"Table",strip:"Folded strip",mark:"Back of clip",grip:"Hold here",nose:"Nose",mm:"mm"},es:{pattern:"Color hacia arriba",center:"Doblez central",wings:"Dobleces de las alas",rear:"De la cola a la punta",side:"Vista lateral",start:"Inicio",finish:"Final",table:"Mesa",strip:"Tira doblada",mark:"Parte trasera del clip",grip:"Sujeta aquí",nose:"Punta",mm:"mm"},ru:{pattern:"Цветом вверх",center:"Сгиб в центре",wings:"Сгибы крыльев",rear:"Вид от хвоста к носу",side:"Вид сбоку",start:"Начало",finish:"Конец",table:"Стол",strip:"Сложенная полоска",mark:"Задний край скрепки",grip:"Держи здесь",nose:"Нос",mm:"мм"}};function Zr(e="en"){return(Object.hasOwn(wo,e)?wo[e]:wo.en).map(([n,o,r],i)=>({id:Xr[i],title:n,action:o,check:r}))}var Ie=q.diagramInk,Jr=q.lineValley,xo=q.diagramArrow,Qr=mo.valley,ko=mo.mountain,ei=q.diagramBack,Fo=(e)=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;"),ot=([e,t])=>`${e.toFixed(2)},${t.toFixed(2)}`,xt=(e)=>`M ${e.map(ot).join(" L ")}`,ae=(e,t,n,o="middle")=>`<text x="${e}" y="${t}" text-anchor="${o}">${Fo(n)}</text>`,It=(e,t)=>`<path d="${xt(e)}" fill="none" stroke="${Ie}" stroke-width="2" stroke-linecap="round" stroke-dasharray="${t}"/>`;function Ve(e,t,n){let o=Math.atan2(n[1]-t[1],n[0]-t[0]),r=[-0.52,0.52].map((i)=>[n[0]-Math.cos(o+i)*9,n[1]-Math.sin(o+i)*9]);return`<path d="M ${ot(e)} Q ${ot(t)} ${ot(n)} M ${ot(r[0])} L ${ot(n)} L ${ot(r[1])}" fill="none" stroke="${xo}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`}function Es(e,t){let n=e.replace("<svg ",'<svg x="20" y="25" width="360" height="184" aria-hidden="true" ').replaceAll(' id="',' id="lesson-');return`${ae(200,17,t.pattern)}
    ${n}
    ${It([[20,223],[46,223]],Qr)}${ae(53,228,t.center,"start")}
    ${It([[211,223],[237,223]],ko)}${ae(244,228,t.wings,"start")}`}function ln(e,t,n,o,r,i,a,s){let l=i?1:-1,c=t+l*s*Math.sin(o),d=Math.max(2,s*Math.cos(o));return[-1,1].map((p)=>{let h=[e+p*d,c],m=[h[0]+p*n*Math.cos(r),c+l*n*Math.sin(r)],u=[h,m].map(([f,y])=>[f-1.3*p*Math.sin(r),y+1.3*l*Math.cos(r)]);return`<path d="${xt([[e,t],h])}" fill="none" stroke="${Ie}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="${xt([h,m])}" fill="none" stroke="${Ie}" stroke-width="6" stroke-linecap="round"/>
      <path d="${xt([h,m])}" fill="none" stroke="${a.diagramFront}" stroke-width="3.4" stroke-linecap="round"/>
      <path d="${xt(u)}" fill="none" stroke="${a}" stroke-width="1.7" stroke-linecap="round"/>`}).join("")}function As(e,t,n,o){let r=Math.PI/2,i=e===1;return`${ae(200,30,t.rear)}
    ${ae(100,69,t.start)}${ae(300,69,t.finish)}
    <path d="M200 55v145" stroke="${n.rule}"/>
    ${ln(100,174,62,i?0:r,i?0:r,!1,n,o)}
    ${ln(300,174,62,r,i?r:0,!1,n,o)}
    ${i?`
      ${Ve([31,162],[31,129],[64,113])}${Ve([169,162],[169,129],[136,113])}
      ${It([[100,182],[100,200]],Qr)}${ae(100,219,t.center)}
    `:`
      ${Ve([91,101],[55,96],[43,132])}${Ve([109,101],[145,96],[157,132])}
      ${It([[74,169],[91,160]],ko)}${It([[126,169],[109,160]],ko)}
      ${ae(100,219,t.wings)}
    `}`}function Ss(e,t,n){return`${ae(200,30,e.rear)}
    <path d="M28 145 H372 V186 H28 Z" fill="${ei}"/>
    <path d="M28 145 H372" stroke="${Ie}" stroke-width="2"/>
    ${ln(200,145-n,121,Math.PI/2,0,!0,t,n)}
    ${Ve([75,83],[75,102],[75,125])}${Ve([325,83],[325,102],[325,125])}
    <path d="M200 117V89" fill="none" stroke="${Ie}" stroke-width="1.4"/>
    ${ae(200,82,e.strip)}${ae(200,173,e.table)}`}function Ls(e,t,n,o,r){let i=e===5,a=82,s=143,l=Math.min(3.15,280/n.body_length_mm),c=82+n.clip_station_mm*l,d=82+n.body_length_mm*l,p=n.keel_depth_mm*l,h=i?c+32:c;return`${ae(200,27,t.rear)}
    ${ln(200,86,110,Math.PI/2,0,!1,o,r)}
    <path d="M196 75v10q4 10 8 0v-10" fill="none" stroke="${xo}" stroke-width="2.4"/>
    ${ae(200,121,t.side)}
    <path d="${xt([[82,143],[d,143],[d,143+p],[82,143+p]])} Z" fill="${ei}" stroke="${Ie}" stroke-width="1.8"/>
    <path d="M82 143H${d}" stroke="${o}" stroke-width="4"/>
    ${i?"":`<circle cx="${c}" cy="143" r="3" fill="${Jr}"/><path d="M${c} 147v15" stroke="${Jr}" stroke-dasharray="2 2"/>`}
    <path d="M${c} 161H85a6 6 0 0 1 0 -12h${c-82-10}a3 3 0 0 1 0 6h-${c-82-17}" fill="none" stroke="${Ie}" stroke-width="2.5" stroke-linecap="round"/>
    ${i?`<circle cx="${h}" cy="156" r="7" fill="${xo}"/>${Ve([74,155],[56,155],[34,155])}`:`${Ve([31,155],[52,155],[74,155])}`}
    <path d="M${h} 171v18h9" fill="none" stroke="${Ie}" stroke-width="1.4"/>
    ${ae(h+13,194,i?t.grip:t.mark,"start")}
    ${i?ae(79,124,t.nose):`<path d="M82 209v8m0-4h${c-82}m0-4v8" stroke="${Ie}"/>${ae(c+10,218,`${n.clip_station_mm} ${t.mm}`,"start")}`}`}function ti(e,t,n,o){let r=e.locale,i=Number.isInteger(t)&&t>=0&&t<Xr.length?t:0,a=vs[r],{title:s,action:l,check:c}=e.steps[i],d=1.875*e.keel_depth_mm,p;if(i===0)p=Es(o(),a);else if(i<3)p=As(i,a,n,d);else if(i===3)p=Ss(a,n,d);else p=Ls(i,a,e,n,d);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" role="img" lang="${r}" aria-label="${Fo(`${s}. ${l} ${c}`)}" font-family="system-ui, sans-serif" font-size="14" fill="${Ie}">
    <title>${Fo(s)}</title>
    <rect width="400" height="240" rx="12" fill="${n.surface}"/>
    ${p}
  </svg>`}var xe=6;var Nc=Object.freeze(["cut","whole"]);var ni={en:{title:"Back of the sheet",flip:(e)=>"Print both pages double-sided, flipping on the "+(e?"short":"long")+" edge, to see the fold lines on both faces.",swap:"Folds that are valleys on the front are mountains here.",check:"Hold the sheet to a window: each pair of crosses should overlap."},ru:{title:"Оборот листа",flip:(e)=>"Печатайте обе страницы с двух сторон, переворот по "+(e?"короткому":"длинному")+" краю: линии сгибов будут видны с обеих сторон.",swap:"Сгибы «долиной» на лицевой стороне здесь становятся «горой».",check:"Посмотрите лист на просвет: кресты должны совпасть."},es:{title:"Reverso de la hoja",flip:(e)=>"Imprime las dos páginas a doble cara, girando por el borde "+(e?"corto":"largo")+", para ver las líneas en las dos caras.",swap:"Los dobleces en valle de la cara impresa aquí son en montaña.",check:"Mira la hoja a contraluz: cada par de cruces debe coincidir."}};function kt(e,t=!1){let n=ni[e]??ni.en;return{title:n.title,lines:[n.flip(t),n.swap,n.check]}}var oi=8,Eo=pe[0].parameter_definitions.find(({name:e})=>e==="span_mm"),Bs=pe.map(({species:e})=>e);function ri(e){let{minimum:t,maximum:n,step:o}=Eo;return Number.isInteger(e)&&e>=t&&e<=n&&(e-t)%o===0}var Is="experimental_unvalidated",J=A,ii=Y.valley.stroke,Tt=Y.mountain.stroke,_e=A,Po="#FFFFFF",Mo=Y.valley.dash,vo=Y.mountain.dash;function dn(e){let t=pe.find((n)=>n.species===e);if(!t)throw Error("Unknown folded butterfly species");return t}function ai(e={},t="en"){let{format:n="open-flight-folded-butterfly",revision:o="k1",species:r="monarch",appearance_id:i="natural",paper:a="A4"}=e;if(n!=="open-flight-folded-butterfly")throw Error("Unknown folded butterfly source format");if(o!=="k1")throw Error("Unknown folded butterfly revision");let s=dn(r),{span_mm:l=s.parameters.span_mm}=e;if(!ri(l)){let{minimum:h,maximum:m,step:u}=Eo;throw Error(`Finished span must be from ${h} to ${m} mm in ${u} mm increments`)}if(!Object.hasOwn(s.palettes,i))throw Error("Unknown butterfly appearance");if(!Object.hasOwn(Be,a))throw Error("Unknown paper size");if(!Object.hasOwn(Ct,t))throw Error("Unknown print locale");let{nose_y:c,abdomen_y:d,clip_rear_from_nose_mm:p}=s.geometry;return{format:n,revision:o,species:r,span_mm:l,appearance_id:i,paper:a,locale:t,keel_depth_mm:oi,flat_span_mm:l+2*oi,clip_station_mm:p,body_length_mm:d-c,nose_y_mm:c,abdomen_y_mm:d,evidence:Is,steps:Zr(t)}}function pn(e){let t=dn(e.species),n=ye(t),{nose_y_mm:o,abdomen_y_mm:r,keel_depth_mm:i,clip_station_mm:a}=e,s=(k)=>([I,M])=>[x(I+k*i),M],l=n.outline.map((k)=>V(k,e.span_mm)),c=l.findIndex(([k,I])=>k===0&&I===r),d=l.slice(0,c+1).map(s(1)),p=[l[c],...l.slice(c+1),l[0]].map(s(-1)),h=[...d,...p],m=[[-i,o],[i,o],[i,r],[-i,r]],u=[-i,0,i].map((k)=>({id:k===0?"center-valley":k<0?"left-mountain":"right-mountain",points:[[k,o],[k,r]],dash:k===0?Mo:vo,stroke:k===0?ii:Tt,weight:0.46})),f=[-1,1].map((k)=>({id:k<0?"left-clip-stop":"right-clip-stop",points:[[k,o+a],[k*(i-1),o+a]],stroke:_e,weight:0.56})),y=[-1,1].map((k)=>({id:k<0?"left-clip-shoulder":"right-clip-shoulder",points:Array.from({length:16},(I,M)=>{let S=M*Math.PI/8;return[x(k*(i+2.3)+0.65*Math.cos(S)),x(o+a+0.65*Math.sin(S))]}),closed:!0,fill:_e,stroke:Po,weight:0.45})),g=Se(t,e.appearance_id,e.span_mm,n),_=[{id:"paper-web",points:m,closed:!0,fill:"#FFFFFF"},{...g[0],id:"wing-background",points:d,stroke:void 0},{...g[0],id:"wing-background-left",points:p,stroke:void 0}];for(let k of g.slice(1))for(let I of[-1,1]){let M=Ts(k,I);for(let[S,T]of M.entries())_.push({...k,id:k.id+(I<0?"-l-":"-r-")+S,points:T.map(s(I))})}for(let k of[...u,...f])_.push({...k,id:k.id+"-halo",weight:1.25,stroke:Po,dash:void 0},k);return _.push(...y),_.push({id:"cut",points:h,closed:!0,stroke:J,weight:0.52}),{outline:h,web:m,left:p,right:d,originalOutline:l,creases:u,clipStops:f,shoulders:y,lines:_}}function Ts(e,t){let n=e.points,o=([s])=>s*t>=0;if(n.every(o))return[n];if(!n.some(([s])=>s*t>0))return[];let r=([s,l],[c,d])=>[0,x(l-(d-l)*s/(c-s))];if(e.closed){let s=n.flatMap((l,c)=>{let d=n[(c+n.length-1)%n.length],p=o(d)===o(l)?[]:[r(d,l)];if(o(l))p.push(l);return p});return s.length>=3?[s]:[]}let i=[],a=o(n[0])?[n[0]]:[];for(let s=1;s<n.length;s++){let l=n[s-1],c=n[s];if(o(l)!==o(c)){if(a.push(r(l,c)),!o(c)){if(a.length>1)i.push(a);a=[]}}if(o(c))a.push(c)}if(a.length>1)i.push(a);return i}var Ct={en:{names:{monarch:"Monarch",morpho:"Blue morpho",swallowtail:"Swallowtail"},note:"Experimental folded body · Physical build and flight trials pending",print:"Print at 100% / actual size. Measure this line before cutting.",labels:["Cut","Center valley","Wing mountains","Clip stop"],build:"Build with scissors and one small rounded paper clip",span:"finished span",flat:"flat span",rear:"View from tail toward nose",guide:"How to build and launch",next:"Follow the illustrated guide “How to build and launch”.",gauge:"Full-size nose and clip gauge",gaugeHelp:"Place the folded body on its side. Match its nose to the left line.",gaugeStop:"The back end of the clip should meet the thick stop line.",nose:"Nose",clip:"Back of clip",assembledTop:"Assembled · top view",assembledRear:"Tail view · both wings level",keelLayers:"Two layers touch"},es:{names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Macaón"},note:"Cuerpo plegado experimental · Pendiente de probar en papel y en vuelo",print:"Imprime al 100 % en tamaño real. Mide esta línea antes de recortar.",labels:["Corte","Doblez central","Dobleces de alas","Tope del clip"],build:"Construye con tijeras y un clip pequeño y redondeado",span:"envergadura final",flat:"envergadura en plano",rear:"Vista de la cola a la punta",guide:"Cómo construir y lanzar",next:"Sigue la guía ilustrada «Cómo construir y lanzar».",gauge:"Guía del clip a tamaño real",gaugeHelp:"Apoya de lado el cuerpo plegado. Alinea su punta con la línea izquierda.",gaugeStop:"El extremo trasero del clip debe llegar a la línea de tope gruesa.",nose:"Punta",clip:"Extremo trasero",assembledTop:"Plegada · vista superior",assembledRear:"Desde la cola · alas al mismo nivel",keelLayers:"Las dos capas se tocan"},ru:{names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},note:"Опытный сложенный корпус · Сборку и полёт ещё предстоит испытать",print:"Печатай в масштабе 100%. Перед вырезанием измерь эту линию.",labels:["Разрез","Сгиб в центре","Сгибы крыльев","Метка скрепки"],build:"Для сборки нужны ножницы и небольшая закруглённая скрепка",span:"размах крыльев",flat:"размах развёртки",rear:"Вид от хвоста к носу",guide:"Сборка и запуск",next:"Смотри рисунки в разделе «Сборка и запуск».",gauge:"Шкала для скрепки в натуральную величину",gaugeHelp:"Положи сложенный корпус набок. Совмести нос с левой линией.",gaugeStop:"Задний край скрепки должен совпасть с толстой линией упора.",nose:"Нос",clip:"Задний край",assembledTop:"В сборе · вид сверху",assembledRear:"Вид с хвоста · крылья на одном уровне",keelLayers:"Два слоя соприкасаются"}};function Ft(e,t,n,o=1){return e.map((r)=>({...r,points:r.points.map(([i,a])=>[x(t+o*i),x(n+o*a)])}))}function cn(e,t){let n=[],o="";for(let r of e.split(" ")){let i=o?o+" "+r:r;if(o&&i.length>t)n.push(o),o=r;else o=i}if(o)n.push(o);return n}function si(e,t,n){let o=[],r=(a,s,l=J,c=0.48)=>o.push({id:e+"-"+a,points:s,stroke:l,weight:c}),i=(a,s)=>{r(a,s,Tt);let[l,c]=s.at(-1),[d,p]=s.at(-2),h=Math.atan2(c-p,l-d),m=(u)=>[l-1.45*Math.cos(h+u),c-1.45*Math.sin(h+u)];r(a+"-tip",[m(0.48),[l,c],m(-0.48)],Tt)};if(e==="cut"){let s=Math.min(...n.outline.map((l)=>l[1]));r("shape",n.outline.map(([l,c])=>[l*0.11,(c-s)*0.11])),o[0].closed=!0;for(let l of n.creases)r(l.id,l.points.map(([c,d])=>[c*0.11,(d-s)*0.11]),l.stroke,0.32)}else if(e==="center")r("paper",[[-12,5],[-4,5],[0,5],[4,5],[12,5]]),r("valley",[[0,4.45],[0,5.55]],ii,0.85),i("left-arrow",[[-12,4],[-10,1.8],[-7,0.5]]),i("right-arrow",[[12,4],[10,1.8],[7,0.5]]);else if(e==="wings")r("pinched",[[-1,7],[-1,2],[-1,0]],J),r("pinched-other",[[1,7],[1,2],[1,0]],J),r("crease",[[-1,3],[1,3]],Tt,0.65),i("left-arrow",[[-2,1],[-6,1.5],[-10,4]]),i("right-arrow",[[2,1],[6,1.5],[10,4]]);else if(e==="table")r("table",[[-15,6.5],[15,6.5]],D,0.7),r("paper",[[-12,6],[-0.55,6],[-0.55,0.5],[0.55,0.5],[0.55,6],[12,6]]),i("left-press",[[-8,0],[-8,4.9]]),i("right-press",[[8,0],[8,4.9]]);else if(e==="clip"){let s=-12+t.clip_station_mm*0.69;r("wall",[[-12,0.5],[13,0.5],[13,7.5],[-12,7.5],[-12,0.5]]),r("stop",[[s,1.1],[s,6.9]],_e,0.52),r("clip",[[-13.8,4.6],[s-1.2,4.6],[s,3.8],[s-1.2,3],[-12.65,3]],Tt,0.62)}else r("level",[[-12,1.5],[0,1.5],[12,1.5]]),r("grip",[[-0.48,1.5],[-0.48,7.1],[0.48,7.1],[0.48,1.5]]),r("finger-left",[[-3.2,4.7],[-2.1,6.15],[-0.55,6.15]],_e),r("finger-right",[[3.2,4.7],[2.1,6.15],[0.55,6.15]],_e);return o}function li(e,t,n=!1){let[o,r]=Be[e.paper],i=Ct[e.locale],a=Ft(t.lines,o/2,29),s=[],l=(h,m,u,f,y=J,g="text")=>s.push({x:h,y:m,text:u,size:f,color:y,font:g}),c=Ye(9,6.5);a.push(...c.lines),s.push(...c.labels),l(9+c.width+2,10,"K1",E.min,D,"bold"),a.push(...di(o,!1)),l(9,18.5,i.names[e.species],E.title,J,"display"),l(9,24,i.note,E.min),l(9,28.6,`${e.span_mm} mm ${i.span}  ·  ${e.flat_span_mm} mm ${i.flat}`,E.min,D);let d=[{id:"key-cut",stroke:J,weight:Y.cut.weight},{...t.creases[1],id:"key-center"},{...t.creases[0],id:"key-wings"},{...t.clipStops[0],id:"key-clip"}];for(let[h,m]of d.entries()){let u=9+h*((o-18)/d.length);a.push({...m,points:[[u,132],[u+10,132]]}),l(u+12,133,i.labels[h],E.min)}let p=qe(9,143,e.locale,{note:!1});if(a.push(...p.lines),s.push(...p.labels),l(73,143.5,i.print,E.min),l(9,151,i.build,E.step,J,"bold"),n){l(9,157,i.next,E.body,J,"bold");let h=(o-18)/2;e.steps.forEach((y,g)=>l(9+g%2*h,169+Math.floor(g/2)*9,g+1+". "+y.title,3.8));let m=10,u=218,f=m+e.clip_station_mm;a.push({id:"gauge-wall",points:[[m,u],[m+39,u],[m+39,u+8],[m,u+8]],closed:!0,fill:"#FFFFFF",stroke:D,weight:0.29},{id:"gauge-nose",points:[[m,u-1.3],[m,u+9.3]],stroke:J,weight:0.44},{id:"gauge-clip-stop",points:[[f,u-1.3],[f,u+9.3]],stroke:_e,weight:1}),l(m,202,i.gauge,4.5),l(m,u+15,i.nose,2.75),l(f,u+15,i.clip,2.75,_e),l(m,u+21,e.clip_station_mm+" mm",3.2),l(58,u+2.1,i.gaugeHelp,3.3),l(58,u+8.1,i.gaugeStop,3.3)}else{l(9,155.5,i.rear+" (2–4, 6)",2.35);let h=(o-18)/2;for(let[m,u]of e.steps.entries()){let f=9+m%2*h,y=163+Math.floor(m/2)*36;a.push(...Ft(si(u.id,e,t),f+17,y-4.7)),l(f,y+9,m+1+". "+u.title,3);let g=y+13.7;for(let _ of cn(u.action,67))l(f,g,_,2.43),g+=3.25;g+=0.5;for(let _ of cn(u.check,67))l(f,g,_,2.43,_e),g+=3.25}}return l(9,r-xe-1.5,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",2.2),{width:o,height:r,lines:a,labels:s,locale:e.locale}}function ci(e,t){let[n,o]=Be[e.paper],r=Ct[e.locale],i=[],a=[{x:9,y:10,text:"Open Flight  ·  K1",size:E.min,color:D,font:"display"},{x:9,y:20,text:r.guide,size:E.title,font:"display"},{x:9,y:26.5,text:r.rear+" (2–4, 6)",size:3.15}],s=33;for(let[l,c]of e.steps.entries()){i.push({id:"step-rule-"+l,points:[[9,s],[n-9,s]],stroke:D,weight:0.32},...Ft(si(c.id,e,t),34,s+10,1.48));let d=62;a.push({x:d,y:s+7.45,text:l+1+". "+c.title,size:4.12,color:_e});let p=s+13.7;for(let h of cn(c.action,65))a.push({x:d,y:p,text:h,size:3.53}),p+=4.75;p+=1.15;for(let h of cn(c.check,65))a.push({x:d,y:p,text:h,size:3.53,color:_e}),p+=4.75;s=Math.max(s+34,p-0.5)}return a.push({x:9,y:o-xe-1.5,text:"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",size:2.2}),{width:n,height:o,lines:i,labels:a}}var Cs=(e)=>[[e-14,12],[e-30,12]];function di(e,t){return Cs(e).flatMap(([n,o],r)=>{let i=t?e-n:n;return[{id:`register-ring-${r}`,points:Array.from({length:16},(a,s)=>[x(i+2.1*Math.cos(s*Math.PI/8)),x(o+2.1*Math.sin(s*Math.PI/8))]),closed:!0,fill:"#FFFFFF",stroke:J,weight:0.3},{id:`register-h-${r}`,points:[[i-3,o],[i+3,o]],stroke:J,weight:0.3},{id:`register-v-${r}`,points:[[i,o-3],[i,o+3]],stroke:J,weight:0.3}]})}function Os(e,t){let[n,o]=Be[e.paper],r=kt(e.locale),i=(p)=>({...p,points:p.points.map(([h,m])=>[-h,m])}),a=(p)=>({...i(p),dash:p.dash===Mo?vo:p.dash===vo?Mo:p.dash}),s=[{id:"back-outline",points:t.outline.map(([p,h])=>[-p,h]),closed:!0,stroke:D,weight:0.3}];for(let p of[...t.creases,...t.clipStops])s.push({...i(p),id:p.id+"-back-halo",weight:1.25,stroke:Po,dash:void 0}),s.push({...a(p),id:p.id+"-back"});s.push(...t.shoulders.map((p)=>({...i(p),id:p.id+"-back"})));let l=[...Ft(s,n/2,29),...di(n,!0)],c=Ct[e.locale],d=[{x:40,y:10,text:"Open Flight  ·  K1",size:E.min,color:D,font:"display"},{x:40,y:18,text:c.names[e.species]+"  ·  "+r.title,size:5.2,color:J},...r.lines.map((p,h)=>({x:9,y:140+h*4.4,text:p,size:2.8,color:J})),{x:9,y:o-xe-1.5,text:"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",size:2.2,color:J}];return{width:n,height:o,lines:l,labels:d,locale:e.locale}}function pi(e,t=!1){return le(li(e,pn(e),t)).toString("utf8")}function $s(e){return le(ci(e,pn(e))).toString("utf8")}function mi(e){let t=pn(e);return _t(li(e,t,!0),[Os(e,t),ci(e,t)])}function hi(e){let{format:t,revision:n,species:o,span_mm:r,appearance_id:i,paper:a}=e;return JSON.stringify({format:t,revision:n,species:o,span_mm:r,appearance_id:i,paper:a},null,2)+`
`}function ui(e){let t=pn(e),n=t.outline.map((s)=>s[1]),o=Math.min(...n),r=Math.max(...n),i=e.flat_span_mm+6,a=x(r-o+6);return le({width:i,height:a,lines:Ft(t.lines,i/2,3-o),labels:[]}).toString("utf8").replace(` width="${i}mm" height="${a}mm"`,"")}function Ds(e,t){let n=dn(e.species).palettes[e.appearance_id].base;return ti(e,t,n,()=>ui(e))}function Rs(e){let t=dn(e.species),n=ye(t),o=Ct[e.locale],r=Se(t,e.appearance_id,e.span_mm,n),i=n.outline.map((g)=>g[1]),a=12-Math.min(...i),s=Math.max(...i)+a,l=e.span_mm+12,c=l/2,d=x(s+23),p=x(d+e.keel_depth_mm),h=x(p+7),m=t.palettes[e.appearance_id],u=Ft(r.map((g)=>({...g,id:"assembled-"+g.id})),c,a),f=[{id:"rear-wing-plane",points:[[6,d],[l-6,d]],stroke:J,weight:0.76},{id:"rear-color-left",points:[[6,d-0.47],[c,d-0.47]],stroke:m.base,weight:0.47},{id:"rear-color-right",points:[[c,d-0.47],[l-6,d-0.47]],stroke:m.base,weight:0.47},{id:"rear-wall-left",points:[[c-0.31,d],[c-0.31,p]],stroke:J,weight:0.62},{id:"rear-wall-right",points:[[c+0.31,d],[c+0.31,p]],stroke:D,weight:0.62},{id:"rear-center-crease",points:[[c-0.31,p],[c+0.31,p]],stroke:J,weight:0.61},{id:"rear-depth-mark",points:[[c+4,d],[c+6,d],[c+6,p],[c+4,p]],stroke:_e,weight:0.46}],y=[{x:6,y:7.5,text:o.assembledTop,size:3.65,color:J},{x:6,y:d-5.5,text:o.assembledRear,size:3.25,color:J},{x:c+9,y:p-2.6,text:e.keel_depth_mm+" mm",size:3.2,color:_e},{x:c+9,y:p+1.7,text:o.keelLayers,size:2.7,color:_e}];return le({width:l,height:h,lines:[...u,...f],labels:y}).toString("utf8").replace(` width="${l}mm" height="${h}mm"`,"")}var je={monarch:{sweep_deg:10,costa_segments:1,head_mm:24,hem_root_mm:7,hem_tip_mm:4,hem_fraction:0.86,span_mm:172},morpho:{sweep_deg:7,costa_segments:1,head_mm:32,hem_root_mm:7,hem_tip_mm:4,hem_fraction:0.84,span_mm:164},swallowtail:{sweep_deg:10,costa_segments:0,head_mm:24,hem_root_mm:7,hem_tip_mm:4,hem_fraction:0.86,span_mm:176}},mn=(e,t)=>e*t/200,js=(e,t)=>e*200/t;function Ns([e,t],[n,o],r){let i=e-n,a=t-o,s=Math.cos(r),l=Math.sin(r);return[n+i*s-a*l,o+i*l+a*s]}function Ao(e,t=je[e]){let n=pe.find((_)=>_.species===e);if(!n)throw Error("Unknown butterfly species");let o=n.geometry,{span_mm:r,head_mm:i}=t,a=[mn(o.root_x,r),o.fore_root_y],s=t.sweep_deg*Math.PI/180,l=[mn(o.fore_edge.at(-1)[4],r),o.fore_edge.at(-1)[5]],c=Math.max(...o.fore_edge.map((_)=>mn(_[4],r))),d=(_)=>{let k=[mn(_[0],r),_[1]],I=Math.hypot(k[0]-l[0],k[1]-l[1]),M=Math.hypot(c-l[0],o.fore_edge[0][5]-l[1]),S=Math.min(1,I/M)**0.8,[T,B]=Ns(k,a,s*S);return[js(T,r),B]},p=o.fore_edge.map((_)=>{let k=d([_[0],_[1]]),I=d([_[2],_[3]]),M=d([_[4],_[5]]);return[k[0],k[1],I[0],I[1],M[0],M[1]]}),h=[p[t.costa_segments][4],p[t.costa_segments][5]],m=[o.root_x,o.fore_root_y],u=(_)=>[m[0]+(h[0]-m[0])*_,m[1]+(h[1]-m[1])*_];p=[[...u(0.3333333333333333),...u(0.6666666666666666),...h],...p.slice(t.costa_segments+1)];let f=o.hind_edge,y=(_)=>[_[0],_[1]+i,_[2],_[3]+i,_[4],_[5]+i],g={...o,nose_y:o.nose_y,abdomen_y:o.abdomen_y+i,fore_root_y:o.fore_root_y+i,hind_root_y:o.hind_root_y+i,fore_origin:[o.fore_origin[0],o.fore_origin[1]+i],hind_origin:[o.hind_origin[0],o.hind_origin[1]+i],fore_edge:p.map(y),hind_edge:f.map(y)};return{...n,baseline_revision:"k2",geometry:g,parameters:{...n.parameters,span_mm:r}}}var Ne={"80":{gsm:80,thickness_mm:0.1,e_along_gpa:5.5,e_across_gpa:2.5},"100":{gsm:100,thickness_mm:0.12,e_along_gpa:5.5,e_across_gpa:2.5},"120":{gsm:120,thickness_mm:0.14,e_along_gpa:5.5,e_across_gpa:2.5},"160":{gsm:160,thickness_mm:0.19,e_along_gpa:5,e_across_gpa:2.3},"200":{gsm:200,thickness_mm:0.24,e_along_gpa:4.5,e_across_gpa:2.1}};function fi(e){let t=0,n=0;for(let o=0;o<e.length;o++){let[r,i]=e[o],[a,s]=e[(o+1)%e.length],l=r*s-a*i;t+=l,n+=(i+s)*l}return t/=2,{area:Math.abs(t),cy:n/(6*t)}}function gi(e,t,n=240){let o=Math.max(...e.map((i)=>i[0])),r=[];for(let i=0;i<n;i++){let a=t+(i+0.5)/n*(o-t),s=[];for(let c=0;c<e.length;c++){let[d,p]=e[c],[h,m]=e[(c+1)%e.length];if((d-a)*(h-a)<0)s.push(p+(m-p)*(a-d)/(h-d))}s.sort((c,d)=>c-d);let l=0;for(let c=0;c+1<s.length;c+=2)l+=s[c+1]-s[c];if(l>0)r.push({x:a,dx:(o-t)/n,le:s[0],te:s.at(-1),chord:l})}return r}function un(e){let{top:t,flat:n,paper:o,clip_g:r,clip_center_y:i}=e,a=e.target_margin??0.12,s=fi(t),l=fi(n),c=2*Math.max(...t.map((L)=>L[0])),d=gi(t,0),p=0,h=0,m=0;for(let L of d)p+=(L.le+L.chord/4)*L.chord*L.dx,h+=L.chord*L.dx,m+=L.chord*L.chord*L.dx;let u=p/h,f=m/h,y=l.area*0.000001*o.gsm,g=u-a*f,_=(y*l.cy+r*i)/(y+r),k=Math.max(0,y*(l.cy-g)/(g-i)),M=(y+r)*0.00981,S=M/(s.area*0.000001),T=(e.grain_along_span?o.e_along_gpa:o.e_across_gpa)*1e9,B=o.thickness_mm*0.001,w=T*B**3/12,v=gi(t,e.root_x_mm,300),z=M/2,C=v.reduce((L,Me)=>L+Me.chord*Me.dx,0),F=v.map((L)=>z*L.chord*L.dx/C),P=v.map((L,Me)=>{let H=0;for(let R=Me;R<v.length;R++)H+=F[R]*((v[R].x-L.x)*0.001);return H}),O=0,N=0;for(let L=0;L<v.length;L++){let Me=e.hem?e.hem.width_at(v[L].x):0,H=w*(v[L].chord+Me)*0.001,R=P[L]/H;O+=R*v[L].dx*0.001,N+=O*v[L].dx*0.001}let ne=e.costa,U=ne?Math.atan2(ne[1][1]-ne[0][1],ne[1][0]-ne[0][0])*180/Math.PI:NaN;return{span_mm:c,area_cm2:s.area/100,aspect_ratio:c*c/s.area,mac_mm:f,neutral_point_y:u,balance_target_y:g,paper_g:y,paper_centroid_y:l.cy,clip_g:r,clip_center_y:i,balance_y:_,static_margin:(u-_)/f,clip_needed_g:k,wing_loading_n_m2:S,glide_speed_m_s:Math.sqrt(2*S/0.72),tip_deflection_mm:N*1000,tip_deflection_launch_mm:N*1000*3,costa_sweep_deg:U}}function bi(e,t=je[e].span_mm){let n={...je[e],span_mm:t},o=Ao(e,n),r=ye(o),i=o.geometry,a=V([i.root_x,i.fore_root_y],t),s=r.outline.map((F)=>V(F,t)),l=s.findIndex(([F,P])=>F===a[0]&&P===a[1]),d=[...Us(i.nose_y,i.fore_root_y,a),...s.slice(l+1)],p=d.findIndex(([F],P)=>P>0&&F===0),h=d.slice(0,p+1),m=[...h,...h.slice(1,-1).reverse().map(([F,P])=>[-F,P])],u=V([i.fore_edge[0][4],i.fore_edge[0][5]],t),f=Math.hypot(u[0]-a[0],u[1]-a[1]),y=[(u[0]-a[0])/f,(u[1]-a[1])/f],g=[y[1],-y[0]],_=n.hem_fraction*f,k=(F)=>n.hem_root_mm+(n.hem_tip_mm-n.hem_root_mm)*(F/_),I=(F,P=0)=>[x(a[0]+y[0]*F+g[0]*P),x(a[1]+y[1]*F+g[1]*P)],M=[I(0),I(n.hem_root_mm,n.hem_root_mm),I(_-n.hem_tip_mm,n.hem_tip_mm),I(_)],S=m.findIndex(([F,P])=>F===a[0]&&P===a[1]),T=m.findIndex(([F,P])=>F===u[0]&&P===u[1]);if(S<0||T<0)throw Error("Costa not found in outline");let B=([F,P])=>[-F,P],w=[...m.slice(0,S+1),...M.slice(1),...m.slice(T)],v=w.findIndex(([F],P)=>P>0&&F===0),z=w.slice(0,v+1),C=[...z,...z.slice(1,-1).reverse().map(B)];return{model:o,span_mm:t,top:m,cut:C,hem:{right:M,left:M.map(B)},costa:[a,u],hemEnd:I(_),root:a,shape:r}}function hn(e,t,n,o,r=8){return Array.from({length:r},(i,a)=>{let s=(a+1)/r,l=1-s;return[x(l**3*e[0]+3*l*l*s*t[0]+3*l*s*s*n[0]+s**3*o[0]),x(l**3*e[1]+3*l*l*s*t[1]+3*l*s*s*n[1]+s**3*o[1])]})}var Ot=1.6,yi={x:3.2,y:2.6,rx:2,ry:2.5};function Us(e,t,n){let o=yi,r=t-8.5,i=[0,e];return[i,...hn(i,[1.6,e-0.2],[o.x+o.rx,e-0.4],[o.x+o.rx,e+o.y]),...hn([o.x+o.rx,e+o.y],[o.x+o.rx,e+o.y+2.6],[Ot+0.6,e+o.y+o.ry+1.2],[Ot,e+o.y+o.ry+3]),[Ot,x(r)],...hn([Ot,r],[Ot+2.4,r+0.4],[3.9,t-5.5],[3.6,t-3.2]),...hn([3.6,t-3.2],[3.4,t-1.6],[n[0]-0.6,t-0.4],n)]}function So(e,t){let n=e.model.geometry,o=Se(e.model,t,e.span_mm,e.shape).filter((s)=>!s.id.startsWith("antenna"));o[0]={...o[0],points:e.top};let r=t==="coloring",i=e.model.palettes[t],a=yi;for(let s of[-1,1]){let l=([c,d])=>[x(s*c),x(d)];o.push({id:"antenna-"+s,points:[[0.7,n.fore_root_y-9],[0.75,n.nose_y+a.y+a.ry+4],[1.6,n.nose_y+a.y+a.ry+1],[a.x-0.4,n.nose_y+a.y+0.8]].map((c)=>l(c)),stroke:r?i.ink:i.sun,weight:0.5}),o.push({id:"antenna-club-"+s,points:Array.from({length:24},(c,d)=>{let p=d/24*2*Math.PI;return l([a.x+0.15+1*Math.cos(p),n.nose_y+a.y+0.4+1.5*Math.sin(p)])}),closed:!0,fill:r?i.ink:i.sun})}return o}function _i(e,t){let[n,o]=e.costa,r=je[e.model.species],i=(t-n[0])/((o[0]-n[0])/Math.hypot(o[0]-n[0],o[1]-n[1])),a=r.hem_fraction*Math.hypot(o[0]-n[0],o[1]-n[1]);if(i<0||i>a)return 0;return r.hem_root_mm+(r.hem_tip_mm-r.hem_root_mm)*(i/a)}var Lo={base_span_mm:200,fore_swing_deg:45,hind_swing_deg:20,head_mm:13,keel_front_mm:14,keel_tail_mm:5,sleeve_mm:13,doubler_root_mm:15,doubler_tip_mm:3,doubler_fraction:0.8,dihedral_deg:8,elevon_x:[0.42,0.66],elevon_depth_mm:9},bn={monarch:Lo,morpho:{...Lo,fore_swing_deg:50},swallowtail:{...Lo}},yn={minimum:150,maximum:180,step:2},Io={monarch:172,morpho:176,swallowtail:176};function Fi(e){let{minimum:t,maximum:n,step:o}=yn;return Number.isInteger(e)&&e>=t&&e<=n&&(e-t)%o===0}function Pi(e,t){let n=bn[e];if(!n)throw Error("Unknown butterfly species");let o=n.base_span_mm*t/171;for(let r=0;r<6;r++){let i=Oo(e,{...n,base_span_mm:o}).span_mm;if(Math.abs(i-t)<0.05)break;o*=t/i}return{...n,base_span_mm:x(o)}}var rt=Math.PI/180,Fe=(e,t)=>[e[0]-t[0],e[1]-t[1]],ie=(e,t)=>[e[0]+t[0],e[1]+t[1]],se=(e,t)=>[e[0]*t,e[1]*t],To=(e)=>Math.hypot(e[0],e[1]),Co=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n],Ue=(e)=>[x(e[0]),x(e[1])];function wi(e,t,n){let[o,r]=Fe(e,t),i=Math.cos(n),a=Math.sin(n);return[t[0]+o*i-r*a,t[1]+o*a+r*i]}function fn(e,t,n,o,r=10){return Array.from({length:r},(i,a)=>{let s=(a+1)/r,l=1-s;return[l**3*e[0]+3*l*l*s*t[0]+3*l*s*s*n[0]+s**3*o[0],l**3*e[1]+3*l*l*s*t[1]+3*l*s*s*n[1]+s**3*o[1]]})}function Hs(e,t){let n=Math.max(0,Math.min(1,t))*e.length,o=e.distance.length-1,r=0;while(o-r>1){let i=Math.floor((r+o)/2);if(n>e.distance[i])r=i;else o=i}return Co(e.points[r],e.points[o],(n-e.distance[r])/(e.distance[o]-e.distance[r]||1))}function xi(e,t,n){return(o,r)=>{let[i,a]=Co(t,Hs(e,o),r),s=n?(1-o)/0.1:o/0.38;return[i,a+11.5*Math.exp(-(s**2))*Math.sin(Math.PI*r)]}}function zs(e,t,n,o){let r=Fe(t,e),i=Fe(o,n),a=r[0]*i[1]-r[1]*i[0];if(Math.abs(a)<0.000000000001)return null;let s=Fe(n,e),l=(s[0]*i[1]-s[1]*i[0])/a,c=(s[0]*r[1]-s[1]*r[0])/a;return l>=0&&l<=1&&c>=0&&c<=1?{t:l,u:c}:null}function ki([e,t],n){let o=!1;for(let r=0,i=n.length-1;r<n.length;i=r++){let[a,s]=n[r],[l,c]=n[i];if(s>t!==c>t&&e<(l-a)*(t-s)/(c-s)+a)o=!o}return o}function gn(e){let t=0,n=0,o=0;for(let r=0;r<e.length;r++){let[i,a]=e[r],[s,l]=e[(r+1)%e.length],c=i*l-s*a;t+=c,n+=(i+s)*c,o+=(a+l)*c}return t/=2,{area:Math.abs(t),cx:n/(6*t),cy:o/(6*t)}}function Oo(e="monarch",t=bn[e]){if(!t)throw Error("Unknown butterfly species");let n=t.base_span_mm,o=Ao(e,{...je[e],sweep_deg:0,head_mm:0,span_mm:n}),r=o.geometry,i=ye(o),a=(j)=>V(j,n),s=xi(i.fore,r.fore_origin,!0),l=xi(i.hind,r.hind_origin,!1),c=90,d=Array.from({length:c+1},(j,X)=>a(s(X/c,1))),p=Array.from({length:24},(j,X)=>a(s(1,1-(X+1)/24))),h=Array.from({length:24},(j,X)=>a(l(0,X/23))),m=i.trailing.map(a),u=a([r.root_x,r.fore_root_y]),f=a([r.root_x,r.hind_root_y]),y=(j)=>wi(j,u,t.fore_swing_deg*rt),g=(j)=>wi(j,f,t.hind_swing_deg*rt),_=[...d,...p].map(y),k=m.map(g),I=_,M=[...h.map(g),...k.slice(1)],S;for(let j=0;j+1<_.length&&!S;j++)for(let X=0;X+1<k.length;X++){let Cn=zs(_[j],_[j+1],k[X],k[X+1]);if(Cn&&j>4){S={i:j,j:X,point:Co(_[j],_[j+1],Cn.t)};break}}if(!S)throw Error("Forewing and hindwing do not meet in this pose");let T=S.point,B=[..._.slice(0,S.i+1),T,...k.slice(S.j+1)],w=u[0],v=u[1]-t.head_mm,z=Ws(v,w),C=[w-1.1,v+9],F=[[0,v],...z.outline,...fn(z.outline.at(-1),[w+0.9,v+5.2],[C[0]+0.6,C[1]-1.8],C,6),...fn(C,[C[0]-0.2,C[1]+1.6],[w-0.3,u[1]-1.2],u,5)],P=B.filter((j,X)=>X===0||j[0]>=w-0.01),O=P.at(-1),N=O[1]+13,ne=fn(O,[O[0]-0.4,O[1]+5],[2.8,N],[0,N],8),U=[...F,...P.slice(1),...ne].map(Ue),L=[...U,...U.slice(1,-1).reverse().map(([j,X])=>[-j,X])],Me=2*Math.max(...U.map(([j])=>j)),H=h.map(g).filter((j)=>j[0]>w+1&&!ki(j,[u,..._])&&!ki(j,B)),R=o.geometry.fore_edge[0],G=y(a([R[4],R[5]])),he=[u,G],ue=Math.atan2(G[1]-u[1],G[0]-u[0])/rt,fe=vi(he,t),qt=To(Fe(G,u)),lt=se(Fe(G,u),1/qt),Tn=(j)=>{let X=Fe(j,u);return{s:X[0]*lt[0]+X[1]*lt[1],off:Math.abs(X[0]*lt[1]-X[1]*lt[0])}},No=U.findIndex((j)=>j[0]===Ue(u)[0]&&j[1]===Ue(u)[1]),ta=t.doubler_fraction*qt,Yt=No+1;while(Yt<U.length){let j=Tn(U[Yt]);if(j.off<0.05&&j.s<=ta+0.000001)Yt++;else break}let na=[...U.slice(0,No+1),...fe.flat.slice(1).map(Ue),...U.slice(Yt)],oa=[T,...k.slice(S.j+1)].filter((j)=>j[0]>=w);return{species:e,pose:t,model:o,half:U,top:L,span_mm:x(Me),head_y:x(v),tail_y:x(N),costa:he,sweep_deg:x(ue),fore:I,hind:M,foreTransform:y,hindTransform:g,notch:T,exposed:H,antenna:z.outline,cutHalf:na,doubler:fe.flat,doublerFolded:fe.folded,trailing:oa}}var Mi={length:14,width:2.3,lean_deg:24,club_r:1.9};function Ws(e,t){let{length:n,width:o,lean_deg:r,club_r:i}=Mi,a=[Math.sin(r*rt),-Math.cos(r*rt)],s=[-a[1],a[0]],l=[1.6+o/2,e+1.2],c=ie(l,se(a,n)),d=ie(l,se(s,-o/2)),p=ie(l,se(s,o/2)),h=ie(c,se(a,i*0.4)),m=Math.atan2(-s[1],-s[0]),u=Array.from({length:15},(g,_)=>{let k=m-0.6+(Math.PI+1.2)*_/14;return ie(h,[i*Math.cos(k),i*Math.sin(k)])});return{outline:[...fn([0,e],[0.7,e-0.1],[d[0]-0.3,d[1]+0.2],d,4),ie(c,se(s,-o/2)),...u,ie(c,se(s,o/2)),p,[t+0.6,e+3.4]],tip:c,base:l}}function vi(e,t){let[n,o]=e,r=To(Fe(o,n)),i=se(Fe(o,n),1/r),a=[i[1],-i[0]],s=t.doubler_fraction*r,{doubler_root_mm:l,doubler_tip_mm:c}=t,d=(m,u)=>ie(n,ie(se(i,m),se(a,u))),p=[d(0,0),d(l,l),d(s-c,c),d(s,0)],h=p.map(([m,u])=>{let f=Fe([m,u],n),y=f[0]*i[0]+f[1]*i[1],g=f[0]*a[0]+f[1]*a[1];return ie(n,ie(se(i,y),se(a,-g)))});return{flat:p,folded:h,width_at_s:(m)=>m<0||m>s?0:m<l?m:l+(c-l)*(m-l)/(s-l)}}function _n(e){let{pose:t}=e,{keel_front_mm:n,keel_tail_mm:o}=t,r=e.tail_y-e.head_y,i=(o-n)/r,a=[i,Math.sqrt(1-i*i)],s=[a[1],-a[0]],l=[n,e.head_y],c=([M,S],T)=>{let B=ie(l,ie(se(a,S-e.head_y),se(s,Math.abs(M))));return Ue([T*B[0],B[1]])},d=c([0,e.tail_y],1),p=e.cutHalf.map((M)=>c(M,1)),h=[...e.cutHalf].reverse().map((M)=>c(M,-1)),m=n-1,u=t.sleeve_mm,f=e.head_y,y=[[m,f],[m,f-u+2.5],[m-2.5,f-u],[-m+2.5,f-u],[-m,f-u+2.5],[-m,f]],_=[...p,[-d[0],d[1]],...h,[-n,f],...y.slice().reverse(),[n,f]].map(Ue),k=_.filter((M,S)=>S===0||M[0]!==_[S-1][0]||M[1]!==_[S-1][1]),I=[[0,f],l,d,[0,d[1]]];return{outline:k,toFlat:c,crease:{center:[[0,f],[0,d[1]]],root:[l,d],sleeve:[[-m,f],[m,f]]},sleeve:y,keel:I}}var Bo=13;function wn(e,t=Ne["120"],n=1,o=0.1,r=!1){let{pose:i}=e,a=t.gsm*0.000001,s=[],l=(F,P,O)=>s.push({label:F,grams:P*a,y_from_head_mm:O-e.head_y}),c=gn(e.top);l("wings, head and body top",c.area,c.cy);let d=e.tail_y-e.head_y,{keel_front_mm:p,keel_tail_mm:h}=i;l("keel walls",d*(p+h),e.head_y+d*(p+2*h)/(3*(p+h)));let m=gn(e.doublerFolded);l("costa doublers",2*m.area,m.cy),l("nose sleeve",2*(p-1)*i.sleeve_mm,e.head_y+i.sleeve_mm/2);let u=s.reduce((F,P)=>F+P.grams,0),f=e.head_y+s.reduce((F,P)=>F+P.grams*P.y_from_head_mm,0)/u,y=e.head_y+Bo,g=e.costa[0][0],_=Fe(e.costa[1],e.costa[0]),k=_[0]/To(_),I=vi(e.costa,i),M=un({top:e.top,flat:e.top,root_x_mm:g,paper:t,grain_along_span:!0,clip_g:u-c.area*a+n,clip_center_y:y,hem:{polygon:e.doublerFolded,width_at:(F)=>(r?7:1)*I.width_at_s((F-g)/k)/k},target_margin:o,costa:e.costa}),{neutral_point_y:S,mac_mm:T}=M,B=(u*f+n*y)/(u+n),w=S-o*T,v=Math.max(0,u*(f-w)/(w-y)),C=(u+n)*0.00981/(c.area*0.000001);return{span_mm:e.span_mm,area_cm2:c.area/100,aspect_ratio:e.span_mm*e.span_mm/c.area,mac_mm:T,sweep_deg:e.sweep_deg,neutral_point_from_head_mm:S-e.head_y,paper_g:u,paper_centroid_from_head_mm:f-e.head_y,clip_g:n,clip_centre_from_head_mm:Bo,balance_from_head_mm:B-e.head_y,static_margin:(S-B)/T,balance_target_from_head_mm:w-e.head_y,clip_needed_g:v,wing_loading_n_m2:C,glide_speed_m_s:Math.sqrt(2*C/0.72),tip_deflection_mm:M.tip_deflection_mm/k**3,pieces:s}}function Ei(e){let t=e.span_mm/2,n=e.pose.elevon_x.map((s)=>s*t*200/e.pose.base_span_mm),o={...e.model,geometry:{...e.model.geometry,tab_x:n,tab_depth_mm:e.pose.elevon_depth_mm}},r=e.trailing.map(([s,l])=>[s*200/e.pose.base_span_mm,l]),i=Qe(o,r),a=([s,l])=>[s*e.pose.base_span_mm/200,l];return{ends:i.ends.map(a),hinges:i.hinges.map(a)}}function xn(e,t="natural"){let n=e.pose.base_span_mm,o=e.model,r=ye(o),i=Se(o,t,n,r),a=o.palettes[t],s=t==="coloring",l=[{id:"silhouette",points:e.top,closed:!0,fill:s?"#FFFFFF":a.ink,stroke:a.ink,weight:0.44}],c=(m,u,f)=>({...m,points:m.points.map(([y,g])=>{let _=f([u*y,g]);return Ue([u*_[0],_[1]])})});for(let m of[-1,1]){let u=m<0?"left-":"right-";for(let f of i.filter((y)=>y.id.startsWith(u+"hind-")))l.push(c(f,m,e.hindTransform));l.push({id:u+"fore-underlay",points:e.fore.map(([f,y])=>Ue([m*f,y])),closed:!0,fill:s?"#FFFFFF":a.ink,stroke:s?a.ink:void 0,weight:s?0.3:0});for(let f of i.filter((y)=>y.id.startsWith(u+"fore-")))l.push(c(f,m,e.foreTransform))}let d=o.geometry,p={...o,geometry:{...d,nose_y:e.head_y-4,fore_root_y:e.head_y+13.2-5+0,hind_root_y:e.tail_y-16,abdomen_y:e.tail_y+1}},h=Se(p,t,n,ye(p)).filter((m)=>!/^(left|right)-|^silhouette$|^antenna/.test(m.id));l.push(...h);for(let m of[-1,1]){let u=([T,B])=>Ue([m*T,B]),{length:f,lean_deg:y,club_r:g,width:_}=Mi,k=[Math.sin(y*rt),-Math.cos(y*rt)],I=[1.6+_/2,e.head_y+1.2],M=ie(I,se(k,f));l.push({id:"antenna-"+m,points:[ie(I,[0,3]),I,M].map(u),stroke:s?a.ink:a.sun,weight:0.55});let S=ie(M,se(k,g*0.4));l.push({id:"antenna-club-"+m,points:Array.from({length:18},(T,B)=>ie(S,[1*Math.cos(B/18*2*Math.PI),1.25*Math.sin(B/18*2*Math.PI)])).map(u),closed:!0,fill:s?a.ink:a.sun})}return l}var Nt={A4:[297,210],US_LETTER:[279.4,215.9]},Ai=8,Ks=13,kn={paper:"120",clips:2,clip_g:0.5},Si={minimum:148,maximum:184,step:2},Gs=Si,K=A,Je=Y.valley.stroke,Mt=Y.mountain.stroke,$t=A,Pe=A,Fn="#FFFFFF",Li="#FFFFFF",Dt=Y.valley.dash,Rt=Y.mountain.dash;function Bi(e={}){let t=e.species??"monarch";if(!Object.hasOwn(je,t))throw Error("Unknown butterfly species");let n=e.span_mm??je[t].span_mm,{minimum:o,maximum:r,step:i}=Gs;if(!Number.isInteger(n)||n<o||n>r||(n-o)%i)throw Error(`Finished span must be from ${o} to ${r} mm in ${i} mm increments`);let a=e.paper??"A4";if(!Object.hasOwn(Nt,a))throw Error("Unknown paper size");let s=e.locale??"en";if(!Object.hasOwn(Pn,s))throw Error("Unknown print locale");let l=e.appearance_id??"natural",c=bi(t,n);if(!Object.hasOwn(c.model.palettes,l))throw Error("Unknown butterfly appearance");let d=c.model.geometry,p=Ii(c,Ne[kn.paper],kn.clips*kn.clip_g),h=d.target_dihedral_deg;return{species:t,span_mm:n,appearance_id:l,paper:a,locale:s,outline:c,keel_depth_mm:Ai,nose_y_mm:d.nose_y,wing_root_y_mm:d.fore_root_y,tail_y_mm:d.abdomen_y,balance_from_nose_mm:Math.round(p.balance_target_y-d.nose_y),dihedral_deg:h,tip_height_mm:Math.round(n/2*Math.sin(h*Math.PI/180)),prediction:p,evidence:"experimental_unvalidated"}}function Ii(e,t=Ne["120"],n=1,o=!0){let r=e.model.geometry,i=e.cut.map(([a,s])=>[a===0?0:a+Math.sign(a)*Ai,s]);return un({top:e.top,flat:i,root_x_mm:e.root[0],paper:t,grain_along_span:o,clip_g:n,clip_center_y:r.nose_y+Ks,target_margin:0.1,hem:{polygon:e.hem.right,width_at:(a)=>_i(e,a)},costa:e.costa})}function qs(e,t){let n=e.points,o=([s])=>s*t>=0;if(n.every(o))return[n];if(!n.some(([s])=>s*t>0))return[];let r=([s,l],[c,d])=>[0,x(l-(d-l)*s/(c-s))];if(e.closed){let s=n.flatMap((l,c)=>{let d=n[(c+n.length-1)%n.length],p=o(d)===o(l)?[]:[r(d,l)];if(o(l))p.push(l);return p});return s.length>=3?[s]:[]}let i=[],a=o(n[0])?[n[0]]:[];for(let s=1;s<n.length;s++){let l=n[s-1],c=n[s];if(o(l)!==o(c)){if(a.push(r(l,c)),!o(c)){if(a.length>1)i.push(a);a=[]}}if(o(c))a.push(c)}if(a.length>1)i.push(a);return i}function jt(e,t,n,o=20){return Array.from({length:o},(r,i)=>[x(e+n*Math.cos(i/o*2*Math.PI)),x(t+n*Math.sin(i/o*2*Math.PI))])}function Ut(e){let{outline:t,keel_depth_mm:n,nose_y_mm:o,tail_y_mm:r}=e,i=(w)=>([v,z])=>[x(v+w*n),z],a=t.cut.findIndex(([w],v)=>v>0&&w===0),s=t.cut.slice(0,a+1).map(i(1)),l=t.cut.slice(0,a+1).map(([w,v])=>[-w,v]).reverse().map(i(-1)),c=[...s,...l],d=t.top.findIndex(([w],v)=>v>0&&w===0),p=t.top.slice(0,d+1),h=p.map(i(1)),m=p.map(([w,v])=>[-w,v]).map(i(-1)),u=So(t,e.appearance_id),f=[{id:"paper-web",points:[[-n,o],[n,o],[n,r],[-n,r]],closed:!0,fill:"#FFFFFF"},...[1,-1].map((w)=>({id:w>0?"hem-right":"hem-left",points:(w>0?t.hem.right:t.hem.left).map(i(w)),closed:!0,fill:Li})),{...u[0],id:"wing-background",points:h,stroke:void 0},{...u[0],id:"wing-background-left",points:[...m].reverse(),stroke:void 0}];for(let w of u.slice(1))for(let v of[-1,1])for(let[z,C]of qs(w,v).entries())f.push({...w,id:w.id+(v<0?"-l-":"-r-")+z,points:C.map(i(v))});let y=[{id:"center-valley",points:[[0,o],[0,r]],dash:Dt,stroke:Je,weight:0.46},...[1,-1].map((w)=>({id:w>0?"right-root-mountain":"left-root-mountain",points:[[w*n,o],[w*n,r]],dash:Rt,stroke:Mt,weight:0.46})),...[1,-1].map((w)=>{let v=([z,C])=>[w*z,C];return{id:w>0?"right-costa-hem":"left-costa-hem",points:[v(t.root),v(t.hemEnd)].map(i(w)),dash:Rt,stroke:$t,weight:0.5}})],g=Qe(t.model,t.shape.trailing),_=[];for(let w of[1,-1]){let v=(C)=>i(w)(V(C,t.span_mm,w)),z=w>0?"right":"left";for(let C of[0,1])_.push({id:`${z}-tab-slit-${C}`,points:[v(g.ends[C]),v(g.hinges[C])],stroke:K,weight:0.52});_.push({id:`${z}-tab-hinge`,points:[v(g.hinges[0]),v(g.hinges[1])],dash:Dt,stroke:Mt,weight:0.42})}let k=e.wing_root_y_mm-3,I=[1,-1].map((w)=>({id:w>0?"right-clip-zone":"left-clip-zone",points:[[w*1.4,o+1.5],[w*(n-1.4),o+1.5],[w*(n-1.4),k],[w*1.4,k]],closed:!0,stroke:Pe,weight:0.4,dash:[1.2,0.8]})),M=x(o+e.balance_from_nose_mm),S=n+t.root[0]+12,T=[];for(let w of[1,-1])T.push({id:`balance-ring-${w}`,points:jt(w*S,M,2.2),closed:!0,fill:Fn,stroke:Pe,weight:0.55},{id:`balance-dot-${w}`,points:jt(w*S,M,0.8,12),closed:!0,fill:Pe});let B=[...y,..._.filter((w)=>w.dash),...I];for(let w of B)f.push({...w,id:w.id+"-halo",weight:1.2,stroke:Fn,dash:void 0,fill:void 0,closed:!1},w);return f.push(..._.filter((w)=>!w.dash),...T),f.push({id:"cut",points:c,closed:!0,stroke:K,weight:0.52}),{outline:c,lines:f,creases:y,tabs:_,clip:I,balance:T,balance_y:M}}var Pn={en:{names:{monarch:"Monarch",morpho:"Blue morpho",swallowtail:"Swallowtail"},note:"K2 costa glider · Fold the leading edge under each wing",span:"finished span",print:"Print at 100% / actual size, landscape. Measure this line before cutting.",legend:["Cut","Center valley","Wing and costa mountains","Edge strip folds under","Clip zone","Balance dot"],paperTitle:"Paper and clips",paper:(e)=>`${e} g/m² uncoated printer paper or light card (100–140 works).`,grain:"The wings run along the long side of the sheet. Most office paper is stiffer that way.",clips:(e)=>`${e} standard metal paper clips, 33 mm long.`,strip:"Tip-height strip",stripLine:"wingtip",stripHelp:(e)=>`Cut out. Stand it on the table beside a wingtip. ${e} mm above the body.`,guide:"Build, balance and trim",steps:[{title:"Cut",action:"Cut the outside line, including the edge strips and the antenna clubs. Cut the four short slits at the back of the hindwings.",check:"One piece. Each hindwing has a tab between two slits."},{title:"Score",action:"Lay a ruler on each dashed line and press along it with an empty ballpoint pen.",check:"Every fold line shows a groove. Thick paper now folds cleanly."},{title:"Fold the costa",action:"Fold each edge strip under its wing along its dashed line. Press it flat.",check:"The front edge is straight and doubled, like the costa vein of a real wing."},{title:"Fold the body",action:"Fold in half on the dashed centre line, colors inside. Then fold each wing back out on its dash-dot line.",check:"The two body layers hang underneath and touch."},{title:"Clip the head",action:"Slide both clips onto the head over the two body layers, one on top of the other, all the way to the nose.",check:"The clips stay inside the dashed clip box."},{title:"Balance",action:"Rest the wings on two fingertips under the ringed dots. Tail drops: add a clip. Nose drops: slide a clip back, or remove one.",check:"It stays level on your fingers."},{title:"Set the V",action:"Lift both wings into a shallow V. Look from the tail and compare each wingtip with the strip.",check:"Both tips are the same height."},{title:"Launch and trim",action:"Push it smoothly forward, nose level, about as fast as a jog. Dives: bend both tabs up 1–2 mm. Swoops up and stalls: flatten them.",check:"Turns left: bend the right tab up a little. Turns right: the left tab."}],predicted:(e)=>`Estimate for ${e.span_mm} mm on 120 g/m² with two clips: balance ${e.balance_from_nose_mm} mm behind the nose, glide about ${e.prediction.glide_speed_m_s.toFixed(1)} m/s. Not yet measured.`},es:{names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Macaón"},note:"Planeador K2 con costa · Dobla el borde delantero bajo cada ala",span:"envergadura final",print:"Imprime al 100 % en tamaño real y en horizontal. Mide esta línea antes de recortar.",legend:["Corte","Doblez central","Dobleces de alas y costa","La tira del borde va debajo","Zona del clip","Punto de equilibrio"],paperTitle:"Papel y clips",paper:(e)=>`Papel de impresora sin estucar de ${e} g/m² o cartulina ligera (sirve de 100 a 140).`,grain:"Las alas van a lo largo del lado largo de la hoja. Casi todo el papel de oficina es más rígido en esa dirección.",clips:(e)=>`${e} clips metálicos normales de 33 mm.`,strip:"Tira de altura",stripLine:"punta del ala",stripHelp:(e)=>`Recórtala. Ponla de pie en la mesa junto a una punta del ala. ${e} mm sobre el cuerpo.`,guide:"Construir, equilibrar y ajustar",steps:[{title:"Recorta",action:"Recorta la línea exterior, con las tiras del borde y las puntas de las antenas. Corta las cuatro ranuras cortas de las alas traseras.",check:"Es una sola pieza. Cada ala trasera tiene una aleta entre dos ranuras."},{title:"Marca los dobleces",action:"Apoya una regla en cada línea discontinua y repásala con un bolígrafo sin tinta.",check:"Cada doblez tiene un surco. El papel grueso se dobla limpio."},{title:"Dobla la costa",action:"Dobla cada tira del borde debajo de su ala por su línea de trazos. Aplánala bien.",check:"El borde delantero queda recto y doble, como la vena costal de un ala real."},{title:"Dobla el cuerpo",action:"Dobla por la mitad en la línea central de trazos, con los colores dentro. Luego dobla cada ala hacia fuera por su línea de trazo y punto.",check:"Las dos capas del cuerpo cuelgan debajo y se tocan."},{title:"Pon los clips en la cabeza",action:"Desliza los dos clips sobre las dos capas del cuerpo, uno encima del otro, hasta la punta.",check:"Los clips quedan dentro del recuadro de trazos."},{title:"Equilibra",action:"Apoya las alas en dos dedos bajo los puntos con anillo. Si cae la cola, añade un clip. Si cae la cabeza, retrasa un clip o quítalo.",check:"Se queda horizontal sobre tus dedos."},{title:"Forma la V",action:"Sube las dos alas en una V suave. Mira desde la cola y compara cada punta con la tira.",check:"Las dos puntas están a la misma altura."},{title:"Lanza y ajusta",action:"Empújala con suavidad hacia delante, con la punta recta, a la velocidad de un trote. Si cae en picado, sube las dos aletas 1–2 mm. Si sube y se frena, aplánalas.",check:"Gira a la izquierda: sube un poco la aleta derecha. Gira a la derecha: la izquierda."}],predicted:(e)=>`Estimación para ${e.span_mm} mm en 120 g/m² con dos clips: equilibrio a ${e.balance_from_nose_mm} mm de la punta, unos ${e.prediction.glide_speed_m_s.toFixed(1)} m/s. Aún sin medir.`},ru:{names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},note:"Планер K2 · Подогни переднюю кромку под каждое крыло",span:"размах крыльев",print:"Печатай в масштабе 100%, альбомная ориентация. Перед вырезанием измерь эту линию.",legend:["Разрез","Сгиб в центре","Сгибы крыльев и края","Полоска края уходит вниз","Зона скрепок","Точка баланса"],paperTitle:"Бумага и скрепки",paper:(e)=>`Бумага для принтера ${e} г/м² без покрытия или тонкий картон (подойдёт 100–140).`,grain:"Крылья идут вдоль длинной стороны листа. Офисная бумага обычно жёстче в этом направлении.",clips:(e)=>`${e} обычные металлические скрепки длиной 33 мм.`,strip:"Полоска высоты",stripLine:"кончик крыла",stripHelp:(e)=>`Вырежи. Поставь на стол рядом с кончиком крыла. ${e} мм выше корпуса.`,guide:"Сборка, баланс и настройка",steps:[{title:"Вырежи",action:"Вырежи по внешней линии, вместе с полосками края и булавами усиков. Сделай четыре коротких надреза сзади на задних крыльях.",check:"Одна деталь. На каждом заднем крыле есть закрылок между двумя надрезами."},{title:"Продави сгибы",action:"Приложи линейку к каждой пунктирной линии и проведи по ней пустой шариковой ручкой.",check:"На каждой линии сгиба есть бороздка. Плотная бумага сгибается ровно."},{title:"Согни край крыла",action:"Загни каждую полоску края под крыло по её пунктирной линии. Прижми.",check:"Передний край прямой и двойной, как костальная жилка настоящего крыла."},{title:"Согни корпус",action:"Согни пополам по центральной пунктирной линии, цветом внутрь. Затем отогни каждое крыло наружу по его штрихпунктирной линии.",check:"Два слоя корпуса висят снизу и касаются друг друга."},{title:"Надень скрепки на голову",action:"Надень обе скрепки на два слоя корпуса, одну поверх другой, до самого носа.",check:"Скрепки находятся внутри пунктирной рамки."},{title:"Проверь баланс",action:"Положи крылья на два пальца под точками в кружках. Хвост опускается: добавь скрепку. Нос опускается: сдвинь скрепку назад или сними её.",check:"Бабочка держится ровно на пальцах."},{title:"Сделай букву V",action:"Подними оба крыла в неглубокую V. Посмотри с хвоста и сравни каждый кончик с полоской.",check:"Оба кончика на одной высоте."},{title:"Запуск и настройка",action:"Плавно толкните вперёд, нос ровно, примерно со скоростью лёгкого бега. Пикирует: поднимите оба язычка на 1–2 мм. Взмывает и зависает: выпрямите их.",check:"Поворачивает влево: чуть подними правый закрылок. Вправо: левый."}],predicted:(e)=>`Оценка для ${e.span_mm} мм на 120 г/м² с двумя скрепками: баланс в ${e.balance_from_nose_mm} мм от носа, около ${e.prediction.glide_speed_m_s.toFixed(1)} м/с. Ещё не измерено.`}};function Pt(e,t){let n=[],o="";for(let r of e.split(" ")){let i=o?o+" "+r:r;if(o&&i.length>t)n.push(o),o=r;else o=i}if(o)n.push(o);return n}function Mn(e,t,n,o=1){return e.map((r)=>({...r,points:r.points.map(([i,a])=>[x(t+o*i),x(n+o*a)])}))}function Ti(e){let[t,n]=Nt[e.paper],o=Pn[e.locale],r=Ut(e),i=Math.min(...r.outline.map(([,F])=>F)),a=Math.max(...r.outline.map(([,F])=>F)),s=25,l=Mn(r.lines,t/2,25-i),c=[],d=(F,P,O,N,ne=K,U="text")=>c.push({x:F,y:P,text:O,size:N,color:ne,font:U}),p=Ye(9,6.5);l.push(...p.lines),c.push(...p.labels),d(9+p.width+2,10,"K2",E.min,D,"bold"),l.push(...Ci(t,!1)),d(9,18.5,o.names[e.species],E.title,K,"display"),d(9,23.5,`${e.span_mm} mm ${o.span}`,E.min);for(let[F,P]of Pt(o.note,30).entries())d(9,28+F*4.2,P,E.min,D);let h=Math.min(n-58,25+(a-i)+8),m=[{id:"key-cut",points:[],stroke:K,weight:Y.cut.weight},{id:"key-center",points:[],stroke:Je,weight:0.46,dash:Dt},{id:"key-mountain",points:[],stroke:Mt,weight:0.46,dash:Rt},{id:"key-hem",points:[],stroke:$t,weight:0.8},{id:"key-clip",points:[],stroke:Pe,weight:0.4,dash:[1.2,0.8]}],u=o.legend.map((F)=>14+F.length*1.75),f=6,y=9,g=h,_=(F)=>{if(y>9&&y+F>t-9)y=9,g+=6.5;let P=[y,g];return y+=F+f,P};for(let[F,P]of m.entries()){let[O,N]=_(u[F]);if(P.id==="key-hem")l.push({id:"key-hem-fill",points:[[O,N-1.6],[O+10,N-1.6],[O+10,N+1.6],[O,N+1.6]],closed:!0,fill:Li,stroke:$t,weight:0.3});else l.push({...P,points:[[O,N],[O+10,N]]});d(O+12,N+1,o.legend[F],E.min)}let[k,I]=_(u[5]);l.push({id:"key-balance-ring",points:jt(k+5,I,2.2),closed:!0,fill:Fn,stroke:Pe,weight:0.55},{id:"key-balance-dot",points:jt(k+5,I,0.8,12),closed:!0,fill:Pe}),d(k+12,I+1,o.legend[5],E.min);let M=g+10,S=qe(9,M,e.locale,{note:!1});l.push(...S.lines),c.push(...S.labels),d(73,M+0.5,o.print,E.min),d(9,M+8,o.paperTitle,E.body,K,"bold");let T=M+13;for(let F of[o.paper("120"),o.grain,o.clips(kn.clips)])for(let P of Pt(F,95))d(9,T,P,E.min),T+=4.2;for(let F of Pt(o.predicted(e),95))d(9,T,F,E.min,D),T+=4.2;let B=t-60,w=M-1,v=36,z=11,C=v-(e.keel_depth_mm+e.tip_height_mm);l.push({id:"strip-cut",points:[[B,w],[B+z,w],[B+z,w+v],[B,w+v]],closed:!0,stroke:K,weight:0.52},{id:"strip-body",points:[[B,w+v-e.keel_depth_mm],[B+z,w+v-e.keel_depth_mm]],stroke:D,weight:0.35,dash:[0.8,0.8]},{id:"strip-tip",points:[[B-1.5,w+C],[B+z+1.5,w+C]],stroke:Pe,weight:0.8}),d(B,w-2.5,o.strip,3,Pe),d(B+z+3,w+C+1,o.stripLine,2.5,Pe);for(let[F,P]of Pt(o.stripHelp(e.tip_height_mm),22).entries())d(B+z+3,w+C+6+F*4.2,P,E.min);return d(9,n-xe-1.5,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2",2.2),{width:t,height:n,lines:l,labels:c}}function Ys(e,t){let n=[],o=(a,s,l=K,c=0.45,d={})=>n.push({id:`step${e}-${a}`,points:s,stroke:l,weight:c,...d}),r=(a,s)=>{o(a,s,Mt,0.45);let[l,c]=s.at(-1),[d,p]=s.at(-2),h=Math.atan2(c-p,l-d),m=(u)=>[l-1.6*Math.cos(h+u),c-1.6*Math.sin(h+u)];o(a+"-tip",[m(0.5),[l,c],m(-0.5)],Mt,0.45)},i=Ut(t);if(e===0||e===1){let a=Math.min(...i.outline.map(([,c])=>c)),s=0.17,l=i.outline.map(([c,d])=>[x(20+c*0.17),x(1+(d-a)*0.17)]);o("shape",l,K,0.35,{closed:!0});for(let c of e===1?i.creases:i.tabs)o(c.id,c.points.map(([d,p])=>[x(20+d*0.17),x(1+(p-a)*0.17)]),c.stroke,0.35,{dash:c.dash?[0.6,0.5]:void 0})}else if(e===2)o("wing",[[4,12],[36,12]],K,0.6),o("hem",[[4,13.2],[14,13.2]],$t,0.6),o("bend",[[4,12],[3.2,12.6],[4,13.2]],$t,0.6),r("turn",[[10,6],[5,6.5],[2.6,9.5]]),o("front",[[1,18],[6,18]],D,0.3);else if(e===3)o("left",[[3,6],[19.4,6]],K,0.6),o("right",[[20.6,6],[37,6]],K,0.6),o("wall-l",[[19.4,6],[19.4,15]],Je,0.6),o("wall-r",[[20.6,6],[20.6,15]],Je,0.6),o("keel",[[19.4,15],[20,15.6],[20.6,15]],Je,0.6);else if(e===4)o("body",[[2,6],[38,6],[38,14],[2,14]],Je,0.5,{closed:!0}),o("zone",[[3,7],[16,7],[16,13],[3,13]],Pe,0.35,{closed:!0,dash:[1,0.7]}),o("clip1",[[2,8],[14,8],[14.8,9],[14.8,11],[14,12],[4,12],[3.3,11],[3.3,10],[12,10]],A,0.5),o("clip2",[[2,7.4],[15,7.4],[15.8,8.6],[15.8,11.4],[15,12.6],[2,12.6]],D,0.4),r("push",[[24,18],[17,18]]);else if(e===5){o("left",[[3,7],[19.4,7]],K,0.6),o("right",[[20.6,7],[37,7]],K,0.6),o("keel",[[20,7],[20,14]],Je,0.9);for(let a of[12,28])o("finger"+a,[[a-2,20],[a-2,9.6],[a,7.6],[a+2,9.6],[a+2,20]],D,0.45)}else if(e===6)o("left",[[3,6],[19.4,12]],K,0.6),o("right",[[20.6,12],[33,6]],K,0.6),o("keel",[[20,12],[20,18.5]],Je,0.9),o("table",[[1,18.5],[39,18.5]],D,0.3),o("strip",[[35,18.5],[35,3],[38,3],[38,18.5]],K,0.35),o("mark",[[34,6],[39,6]],Pe,0.7);else o("wing",[[4,14],[26,14]],K,0.6),o("tab",[[26,14],[31,12]],Mt,0.7),r("lift",[[33,15],[33,10]]),o("path",[[2,4],[12,5],[22,7],[36,9]],D,0.3,{dash:[0.8,0.8]});return n}function Ci(e,t){return[[e-14,12],[e-30,12]].flatMap(([n,o],r)=>{let i=t?e-n:n;return[{id:`register-ring-${r}`,points:jt(i,o,2.1,16),closed:!0,fill:"#FFFFFF",stroke:K,weight:0.3},{id:`register-h-${r}`,points:[[i-3,o],[i+3,o]],stroke:K,weight:0.3},{id:`register-v-${r}`,points:[[i,o-3],[i,o+3]],stroke:K,weight:0.3}]})}function Oi(e){let[t,n]=Nt[e.paper],o=Pn[e.locale],r=kt(e.locale,!0),i=Ut(e),a=Math.min(...i.outline.map(([,h])=>h)),s=(h)=>({...h,points:h.points.map(([m,u])=>[-m,u])}),l=(h)=>h===Dt?Rt:h===Rt?Dt:h,c=[{id:"back-outline",points:i.outline.map(([h,m])=>[-h,m]),closed:!0,stroke:D,weight:0.3}];for(let h of[...i.creases,...i.tabs.filter((m)=>m.dash),...i.clip])c.push({...s(h),id:h.id+"-back-halo",weight:1.2,stroke:Fn,dash:void 0,fill:void 0,closed:!1}),c.push({...s(h),id:h.id+"-back",dash:l(h.dash)});c.push(...i.tabs.filter((h)=>!h.dash).map((h)=>({...s(h),id:h.id+"-back"})));let d=[...Mn(c,t/2,25-a),...Ci(t,!0)],p=[{x:40,y:10,text:"Open Flight  ·  K2",size:E.min,color:D,font:"display"},{x:40,y:17.5,text:o.names[e.species]+"  ·  "+r.title,size:5,color:K},...r.lines.map((h,m)=>({x:9,y:n-30+m*4.2,text:h,size:2.8,color:K})),{x:9,y:n-xe-1.5,text:"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2",size:2.2,color:K}];return{width:t,height:n,lines:d,labels:p}}function $i(e){let[t,n]=Nt[e.paper],o=Pn[e.locale],r=[],i=[],a=(c,d,p,h,m=K,u="text")=>i.push({x:c,y:d,text:p,size:h,color:m,font:u});a(9,10,"Open Flight  ·  K2",E.min,D,"display"),a(9,18,o.guide+"  ·  "+o.names[e.species],E.title,K,"display");let s=4,l=(t-18)/s;for(let[c,d]of o.steps.entries()){let p=9+c%s*l,h=26+Math.floor(c/s)*((n-40)/2);r.push(...Mn(Ys(c,e),p+2,h)),a(p,h+30,`${c+1}. ${d.title}`,E.body,K,"bold");let m=h+35;for(let u of Pt(d.action,36))a(p,m,u,E.min),m+=4.1;m+=0.8;for(let u of Pt(d.check,36))a(p,m,u,E.min,D),m+=4.1}return a(9,n-xe-1.5,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2",2.2),{width:t,height:n,lines:r,labels:i}}function Vs(e){let t=[Ti(e),Oi(e),$i(e)],[n,o]=Nt[e.paper],r=new Ge({unit:"mm",format:[n,o],orientation:"landscape",compress:!0,putOnlyUsedFonts:!0,precision:5});r.setCreationDate("D:20000101000000+00'00'"),r.setFileId(Z(JSON.stringify(t)).slice(0,32)),r.setLanguage(e.locale),r.setProperties({title:"Open Flight - K2 butterfly trial",author:"Open Flight contributors",subject:"Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. "+ft}),gt(r,yt()),r.viewerPreferences({PrintScaling:"None"});for(let[i,a]of t.entries()){if(i)r.addPage([n,o],"landscape");r.setLineJoin("round");for(let s of a.lines){if(!s.points.length)continue;if(s.stroke)r.setDrawColor(s.stroke);if(s.fill)r.setFillColor(s.fill);if(r.setLineWidth(s.stroke?et(s.weight):0),r.setLineDashPattern(s.dash??[],0),r.path(s.points.map((l,c)=>({op:c?"l":"m",c:l}))),s.closed)r.close();if(s.fill&&s.stroke)r.fillStroke();else if(s.fill)r.fill();else r.stroke()}for(let s of a.labels)bt(r,s.font),r.setFontSize(tt(s.size)*72/25.4),r.setTextColor(s.color??K),r.text(s.text,s.x,s.y)}return ee.from(r.output("arraybuffer"))}var Js=(e)=>`<path d="M${e.points.map((t)=>t.join(" ")).join(" L")}${e.closed?" Z":""}" fill="${e.fill??"none"}" stroke="${e.stroke??"none"}" stroke-width="${e.weight??0}"${e.dash?` stroke-dasharray="${e.dash.join(" ")}"`:""}/>`;function Xs(e){let t=So(e.outline,e.appearance_id),n=e.outline.top.map(([l])=>l),o=e.outline.top.map(([,l])=>l),r=Math.min(...n)-3,i=Math.min(...o)-3,a=Math.max(...n)+3-r,s=Math.max(...o)+3-i;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x(r)} ${x(i)} ${x(a)} ${x(s)}" role="img">${t.map(Js).join("")}</svg>`}function Zs(e){let t=Ut(e),n=t.outline.map(([s])=>s),o=t.outline.map(([,s])=>s),r=x(Math.max(...n)-Math.min(...n)+6),i=Math.min(...o),a=x(Math.max(...o)-i+6);return le({width:r,height:a,lines:Mn(t.lines,r/2,3-i),labels:[]}).toString("utf8").replace(` width="${r}mm" height="${a}mm"`,"")}function Qs(e,t=0){let n=[Ti,Oi,$i][t](e);return le(n).toString("utf8")}var Wt={A4:[297,210],US_LETTER:[279.4,215.9]},zt=Y.valley.dash,Et=Y.mountain.dash,Xe=Y.valley.stroke,Te=Y.mountain.stroke,En="#FFFFFF",at="#1F7A4D",ji="#FFFFFF",el="#EDE7DA",vt={paper:"120",clips:2,clip_g:0.5};function Ni(e={}){let t=e.species??"monarch";if(!Object.hasOwn(bn,t))throw Error("Unknown butterfly species");let n=e.span_mm??Io[t],{minimum:o,maximum:r,step:i}=yn;if(!Fi(n))throw Error(`Finished span must be from ${o} to ${r} mm in ${i} mm increments`);let a=e.paper??"A4";if(!Object.hasOwn(Wt,a))throw Error("Unknown paper size");let s=e.locale??"en";if(!Object.hasOwn(Kt,s))throw Error("Unknown print locale");let l=e.appearance_id??"natural",c=Oo(t,Pi(t,n));if(!Object.hasOwn(c.model.palettes,l))throw Error("Unknown butterfly appearance");let d=vt.clips*vt.clip_g,p=wn(c,Ne[vt.paper],d),h=c.top.reduce((u,f)=>f[0]>u[0]?f:u)[1],m=c.span_mm/2*Math.sin(c.pose.dihedral_deg*Math.PI/180);return{species:t,span_mm:n,appearance_id:l,paper:a,locale:s,geo:c,prediction:p,estimate:p,estimateOneClip:wn(c,Ne[vt.paper],vt.clip_g),estimateBonded:wn(c,Ne[vt.paper],d,0.1,!0),keel_depth_mm:c.pose.keel_front_mm,keel_tail_mm:c.pose.keel_tail_mm,nose_y_mm:c.head_y,wing_root_y_mm:c.costa[0][1],tail_y_mm:c.tail_y,balance_from_nose_mm:Math.round(p.balance_target_from_head_mm),dihedral_deg:c.pose.dihedral_deg,tip_height_mm:Math.round(An(c,h)+m),revision:Z(JSON.stringify([c.pose,c.cutHalf])).slice(0,10),evidence:"experimental_unvalidated"}}var $o=(e,t)=>e.toFixed(1).replace(".",t==="en"?".":","),Kt={en:{names:{monarch:"Monarch",morpho:"Blue morpho",swallowtail:"Swallowtail"},note:"K3 dart butterfly · Swept wings, a head with antennae and a folded body.",cutHint:"Cut the solid line, including the V between each antenna and the nose flap.",span:"finished span",mm:"mm",print:"Print at 100%, landscape. Measure this line before cutting.",legend:["Cut","Valley: folds toward you","Mountain: folds away","Balance dot"],paperLine:"120 g/m² uncoated paper or light card (100–140 works). Two 33 mm metal paper clips. A glue stick makes the front edges stiffer.",predicted:(e)=>`Estimate for ${e.span_mm} mm on 120 g/m² with two clips: balance ${e.balance_from_nose_mm} mm behind the head, glide about ${$o(e.prediction.glide_speed_m_s,"en")} m/s. Not yet measured.`,strip:"Tip-height strip",stripHelp:(e)=>`Stand it beside a wingtip: tip at ${e} mm.`,guide:"Fold, balance and trim",steps:[{title:"Cut",action:"Cut the solid outline. Cut the V between each antenna and the dark nose flap, and the four short slits at the back of the hindwings.",check:"One piece. The nose flap is free from both antennae."},{title:"Score",action:"Lay a ruler on every dashed line and press along it with an empty ballpoint pen.",check:"Each fold line shows a groove."},{title:"Fold the front edges",action:"Fold each tan strip (3) under its forewing on the dash-dot line. A glue stick under the strip makes the wing stiffer.",check:"The front edge runs straight from the head to the wingtip, doubled."},{title:"Tuck the nose flap",action:"Fold the dark nose flap (4) under, behind the head, on its dash-dot line. Press hard.",check:"The flap lies flat behind the head. Its eyes face down."},{title:"Fold the body",action:"Fold in half on the dashed centre line (5), colors inside. The nose flap wraps round the front of the body.",check:"The eyes now show on both sides of the head."},{title:"Open the wings",action:"Fold each wing back out on its dash-dot root line (6). Set a shallow V with the tip-height strip.",check:"The body is deep at the head and shallow at the tail. Both wingtips are the same height."},{title:"Clip and balance",action:"Push a clip onto the head from the front, over the nose flap, and a second on top. Rest the wings on two fingertips under the green dots.",check:"It stays level. Tail drops: add weight at the head. Nose drops: slide a clip back."},{title:"Launch and trim",action:"Push it smoothly forward, nose level, about as fast as a jog. Dives: bend both hindwing tabs up 1–2 mm. Climbs and stalls: flatten them.",check:"Turns left: lift the right tab a little (seen from the tail). Turns right: the left tab."}]},es:{names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Macaón"},note:"Mariposa dardo K3 · Alas hacia atrás, cabeza con antenas y cuerpo plegado.",cutHint:"Recorta la línea continua, también la V entre cada antena y la solapa de la punta.",span:"envergadura final",mm:"mm",print:"Imprime al 100 % y en horizontal. Mide esta línea antes de recortar.",legend:["Corte","Valle: se dobla hacia ti","Montaña: se dobla hacia atrás","Punto de equilibrio"],paperLine:"Papel sin estucar de 120 g/m² o cartulina ligera (sirve de 100 a 140). Dos clips metálicos de 33 mm. Con pegamento de barra, los bordes delanteros quedan más rígidos.",predicted:(e)=>`Estimación para ${e.span_mm} mm en 120 g/m² con dos clips: equilibrio a ${e.balance_from_nose_mm} mm detrás de la cabeza, unos ${$o(e.prediction.glide_speed_m_s,"es")} m/s. Aún sin medir.`,strip:"Tira de altura",stripHelp:(e)=>`Ponla junto a una punta del ala: punta a ${e} mm.`,guide:"Dobla, equilibra y ajusta",steps:[{title:"Recorta",action:"Recorta la línea continua. Corta la V entre cada antena y la solapa oscura de la punta, y las cuatro ranuras cortas de las alas traseras.",check:"Es una sola pieza. La solapa de la punta queda libre de las dos antenas."},{title:"Marca los dobleces",action:"Apoya una regla en cada línea discontinua y repásala con un bolígrafo sin tinta.",check:"Cada línea de doblez tiene un surco."},{title:"Dobla los bordes delanteros",action:"Dobla cada tira beige (3) debajo de su ala delantera por la línea de trazo y punto. Con pegamento de barra debajo, el ala queda más rígida.",check:"El borde delantero va recto y doble desde la cabeza hasta la punta del ala."},{title:"Mete la solapa de la punta",action:"Dobla la solapa oscura (4) hacia abajo, detrás de la cabeza, por su línea de trazo y punto. Presiona fuerte.",check:"La solapa queda plana detrás de la cabeza, con los ojos hacia abajo."},{title:"Dobla el cuerpo",action:"Dobla por la mitad en la línea central discontinua (5), con los colores dentro. La solapa abraza la parte delantera del cuerpo.",check:"Ahora se ven los ojos a los dos lados de la cabeza."},{title:"Abre las alas",action:"Dobla cada ala hacia fuera por su línea de trazo y punto junto al cuerpo (6). Forma una V suave con la tira de altura.",check:"El cuerpo es alto en la cabeza y bajo en la cola. Las dos puntas están a la misma altura."},{title:"Clips y equilibrio",action:"Mete un clip en la cabeza desde delante, sobre la solapa, y otro encima. Apoya las alas en dos dedos bajo los puntos verdes.",check:"Se queda horizontal. Si cae la cola, añade peso en la cabeza. Si cae la cabeza, retrasa un clip."},{title:"Lanza y ajusta",action:"Empújala con suavidad hacia delante, con la punta recta, a la velocidad de un trote. Si cae en picado, sube 1–2 mm las dos aletas traseras. Si sube y se frena, aplánalas.",check:"Gira a la izquierda: sube un poco la aleta derecha (mirando desde la cola). Gira a la derecha: la izquierda."}]},ru:{names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},note:"Бабочка-дротик K3 · Отведённые назад крылья, голова с усиками и сложенный корпус.",cutHint:"Вырежи по сплошной линии, включая V между каждым усиком и носовым клапаном.",span:"размах крыльев",mm:"мм",print:"Печатай в масштабе 100%, альбомная ориентация. Перед вырезанием измерь эту линию.",legend:["Разрез","Долина: сгиб к себе","Гора: сгиб от себя","Точка баланса"],paperLine:"Бумага 120 г/м² без покрытия или тонкий картон (подойдёт 100–140). Две металлические скрепки по 33 мм. С клеем-карандашом передние кромки жёстче.",predicted:(e)=>`Оценка для ${e.span_mm} мм на 120 г/м² с двумя скрепками: баланс в ${e.balance_from_nose_mm} мм за головой, около ${$o(e.prediction.glide_speed_m_s,"ru")} м/с. Ещё не измерено.`,strip:"Полоска высоты",stripHelp:(e)=>`Поставь рядом с кончиком крыла: кончик на ${e} мм.`,guide:"Сложи, уравновесь и настрой",steps:[{title:"Вырежи",action:"Вырежи по сплошной линии. Прорежь V между каждым усиком и тёмным носовым клапаном и четыре коротких надреза сзади на задних крыльях.",check:"Одна деталь. Носовой клапан не соединён с усиками."},{title:"Продави сгибы",action:"Приложи линейку к каждой пунктирной линии и проведи по ней пустой шариковой ручкой.",check:"На каждой линии сгиба есть бороздка."},{title:"Подогни передние кромки",action:"Загни каждую бежевую полоску (3) под переднее крыло по штрихпунктирной линии. Клей-карандаш под полоской сделает крыло жёстче.",check:"Передняя кромка идёт прямо от головы до кончика крыла, в два слоя."},{title:"Заправь носовой клапан",action:"Загни тёмный клапан (4) вниз, за голову, по его штрихпунктирной линии. Сильно прижми.",check:"Клапан лежит плоско за головой, глазами вниз."},{title:"Согни корпус",action:"Согни пополам по центральной пунктирной линии (5), цветом внутрь. Клапан обхватит переднюю часть корпуса.",check:"Теперь глаза видны с обеих сторон головы."},{title:"Раскрой крылья",action:"Отогни каждое крыло наружу по штрихпунктирной линии у корпуса (6). Задай неглубокую V по полоске высоты.",check:"Корпус высокий у головы и низкий у хвоста. Оба кончика на одной высоте."},{title:"Скрепки и баланс",action:"Надень скрепку на голову спереди, поверх клапана, и вторую сверху. Положи крылья на два пальца под зелёными точками.",check:"Бабочка держится ровно. Хвост опускается — добавь вес на голову. Нос опускается — сдвинь скрепку назад."},{title:"Запуск и настройка",action:"Плавно толкни её вперёд, нос ровно, примерно со скоростью лёгкого бега. Пикирует — подними оба задних язычка на 1–2 мм. Взмывает и зависает — выпрями их.",check:"Поворачивает влево — чуть подними правый язычок (если смотреть с хвоста). Вправо — левый."}]}};var He=(e,t,n,o=20)=>Array.from({length:o},(r,i)=>[x(e+n*Math.cos(i/o*2*Math.PI)),x(t+n*Math.sin(i/o*2*Math.PI))]),st=(e,t,n,o=1)=>e.map((r)=>({...r,points:r.points.map(([i,a])=>[x(t+o*i),x(n+o*a)])}));function it(e,t){let n=[],o="";for(let r of e.split(" ")){let i=o?o+" "+r:r;if(o&&i.length>t)n.push(o),o=r;else o=i}if(o)n.push(o);return n}function tl(e,t){let n=([s])=>s*t>=0,o=e.points;if(o.every(n))return[o];if(!o.some(([s])=>s*t>0))return[];let r=([s,l],[c,d])=>[0,x(l-(d-l)*s/(c-s))];if(e.closed){let s=o.flatMap((l,c)=>{let d=o[(c+o.length-1)%o.length],p=n(d)===n(l)?[]:[r(d,l)];if(n(l))p.push(l);return p});return s.length>=3?[s]:[]}let i=[],a=n(o[0])?[o[0]]:[];for(let s=1;s<o.length;s++){let l=o[s-1],c=o[s];if(n(l)!==n(c)){if(a.push(r(l,c)),!n(c)){if(a.length>1)i.push(a);a=[]}}if(n(c))a.push(c)}if(a.length>1)i.push(a);return i}function Sn(e){let{geo:t}=e,n=_n(t),o=xn(t,e.appearance_id),r=[];r.push({id:"paper",points:n.outline,closed:!0,fill:ji});let i="#2A2030";r.push({id:"sleeve-face",points:n.sleeve,closed:!0,fill:i});for(let p of[-1,1]){let h=(m)=>n.toFlat([p*m[0],m[1]],p);r.push({id:"doubler-"+p,points:t.doubler.map(h),closed:!0,fill:"#F3E3C4"});for(let[m,u]of o.entries()){if(u.id==="silhouette"){r.push({...u,id:"wing-ground-"+p,points:t.half.map(h),stroke:void 0});continue}for(let[f,y]of tl(u,p).entries())r.push({...u,id:`${u.id}-${p}-${m}-${f}`,points:y.map((g)=>n.toFlat(g,p))})}}for(let p of[-1,1]){let h=t.head_y-t.pose.sleeve_mm*0.42,m=p*t.pose.keel_front_mm*0.42;r.push({id:"sleeve-eye-"+p,points:He(m,h,2.4),closed:!0,fill:"#F7EFD9"}),r.push({id:"sleeve-pupil-"+p,points:He(m,h,1.1),closed:!0,fill:i})}let a=[{id:"center-valley",points:n.crease.center,dash:zt,stroke:Xe,weight:0.46},{id:"sleeve-mountain",points:n.crease.sleeve,dash:Et,stroke:Te,weight:0.46},...[1,-1].map((p)=>({id:"root-mountain-"+p,points:n.crease.root.map(([h,m])=>[p*h,m]),dash:Et,stroke:Te,weight:0.46})),...[1,-1].map((p)=>({id:"costa-mountain-"+p,points:[t.doubler[0],t.doubler[3]].map((h)=>n.toFlat([p*h[0],h[1]],p)),dash:Et,stroke:Te,weight:0.5}))],s=Ei(t),l=[];for(let p of[1,-1]){let h=(m)=>n.toFlat([p*m[0],m[1]],p);for(let m of[0,1])l.push({id:`elevon-slit-${p}-${m}`,points:[h(s.ends[m]),h(s.hinges[m])],stroke:A,weight:0.52});a.push({id:"elevon-hinge-"+p,points:[h(s.hinges[0]),h(s.hinges[1])],dash:zt,stroke:Xe,weight:0.42})}let c=t.head_y+e.estimate.balance_target_from_head_mm,d=[];for(let p of[1,-1]){let h=n.toFlat([p*26,c],p);d.push({id:"balance-ring-"+p,points:He(h[0],h[1],2.3),closed:!0,fill:En,stroke:at,weight:0.55},{id:"balance-dot-"+p,points:He(h[0],h[1],0.85,12),closed:!0,fill:at})}for(let p of a)r.push({...p,id:p.id+"-halo",stroke:En,weight:1.2,dash:void 0},p);return r.push(...l,...d),r.push({id:"cut",points:n.outline,closed:!0,stroke:A,weight:0.52}),{flat:n,lines:r,creases:a,slits:l,balance:d,balance_y:c}}function An(e,t){let n=Math.max(0,Math.min(1,(t-e.head_y)/(e.tail_y-e.head_y)));return e.pose.keel_front_mm+(e.pose.keel_tail_mm-e.pose.keel_front_mm)*n}function nl(e,[t,n]){let o=e.pose.dihedral_deg*(Math.PI/180);return[t*Math.cos(o),n,An(e,n)+Math.abs(t)*Math.sin(o)]}function Ht(e,t){let n=e*Math.PI/180,o=t*Math.PI/180;return([r,i,a])=>{let s=r*Math.cos(n)-i*Math.sin(n),l=r*Math.sin(n)+i*Math.cos(n);return[x(s),x(l*Math.sin(o)-a*Math.cos(o))]}}function Di(e,t){let{geo:n}=e,o=xn(n,e.appearance_id),r=t==="perspective"?Ht(-24,58):t==="side"?Ht(-90,0.0001):t==="rear"?Ht(180,0.0001):Ht(0,90),i=[],a=[],s=20;for(let m=0;m<=20;m++)a.push([0,n.head_y+(n.tail_y-n.head_y)*m/20]);let l=[...a.map(([,m])=>[0,m,0]),...a.reverse().map(([,m])=>[0,m,An(n,m)])],c=[[0,n.head_y,0],[0,n.head_y+n.pose.sleeve_mm,0],[0,n.head_y+n.pose.sleeve_mm,An(n,n.head_y+n.pose.sleeve_mm)-1],[0,n.head_y,n.pose.keel_front_mm-1]],d=[[0,n.head_y-1.2,3],[0,n.head_y+31,3],[0,n.head_y+31,8.5],[0,n.head_y-1.2,8.5]],p=[{id:"keel",points:l.map(r),closed:!0,fill:el,stroke:A,weight:0.35},{id:"sleeve",points:c.map(r),closed:!0,fill:"#2A2030",stroke:A,weight:0.3},{id:"clip",points:d.map(r),closed:!0,stroke:"#7D8794",weight:0.7}],h=o.map((m)=>({...m,points:m.points.map((u)=>r(nl(n,u)))}));if(t==="top")return h;if(t==="side")return[...h,...p];return[...p,...h]}var vn=(e,t,n,o,r)=>{let i=e.flatMap((h)=>h.points.map(([m])=>m)),a=e.flatMap((h)=>h.points.map(([,m])=>m)),[s,l,c,d]=[Math.min(...i),Math.max(...i),Math.min(...a),Math.max(...a)],p=Math.min(o/(l-s),r/(d-c));return st(e,t+(o-p*(l-s))/2-p*s,n+(r-p*(d-c))/2-p*c,p)},Do="Open Flight  /  CERN-OHL-W-2.0  /  © Open Flight · personal and classroom use  /  K3";function Ui(e,t){return[[e-14,12],[e-30,12]].flatMap(([n,o],r)=>{let i=t?e-n:n;return[{id:`register-ring-${r}`,points:He(i,o,2.1,16),closed:!0,fill:"#FFFFFF",stroke:A,weight:0.3},{id:`register-h-${r}`,points:[[i-3,o],[i+3,o]],stroke:A,weight:0.3},{id:`register-v-${r}`,points:[[i,o-3],[i,o+3]],stroke:A,weight:0.3}]})}var Hi=14;function zi(e){let[t,n]=Wt[e.paper],o=Kt[e.locale],r=Sn(e),i=r.flat.outline.map(([,F])=>F),a=Hi,s=st(r.lines,t/2,a-Math.min(...i)),l=[],c=(F,P,O,N,ne=A,U="text")=>l.push({x:F,y:P,text:O,size:N,color:ne,font:U}),d=Ye(9,6.5);s.push(...d.lines),l.push(...d.labels),c(9+d.width+2,10,"K3",E.min,D,"bold"),s.push(...Ui(t,!1)),c(9,18.5,o.names[e.species],E.title,A,"display"),c(9,23.5,`${e.span_mm} ${o.mm} ${o.span}`,E.min);let p=29;for(let F of[o.note,o.cutHint])for(let P of it(F,26))c(9,p,P,E.min,F===o.note?D:A),p+=4.2;let h=(F)=>[t/2+F[0],a-Math.min(...i)+F[1]],m=e.geo,u=r.flat,f=(F,P)=>{let[O,N]=h(F);s.push({id:"tag-"+P+O,points:He(O,N,2.6),closed:!0,fill:A}),c(O-1.05,N+1.1,P,3,"#FFFFFF","bold")},y=gn(m.doubler);for(let F of[1,-1])f(u.toFlat([F*y.cx,y.cy],F),"3");f([0,m.head_y-m.pose.sleeve_mm-4],"4"),f([4.5,(m.head_y+m.tail_y)/2+12],"5"),f([u.crease.root[1][0]+6,u.crease.root[1][1]-4],"6");let g=n-50,_=[{id:"k-cut",points:[],stroke:A,weight:0.52},{id:"k-valley",points:[],stroke:Xe,weight:0.46,dash:zt},{id:"k-mountain",points:[],stroke:Te,weight:0.46,dash:Et}],k=9;for(let[F,P]of _.entries())s.push({...P,points:[[k,g],[k+10,g]]}),c(k+12,g+1,o.legend[F],E.min),k+=18+o.legend[F].length*1.75;s.push({id:"k-ring",points:He(k+4,g,2.3),closed:!0,fill:En,stroke:at,weight:0.55},{id:"k-dot",points:He(k+4,g,0.85,12),closed:!0,fill:at}),c(k+9,g+1,o.legend[3],E.min);let I=qe(9,g+9,e.locale,{note:!1});s.push(...I.lines),l.push(...I.labels);let M=t-62,S=Math.floor((M-14)/1.95);for(let[F,P]of it(o.print,Math.floor((M-82)/1.95)).entries())c(76,g+9.5+F*4.2,P,E.min);let T=g+17+(it(o.print,Math.floor((M-82)/1.95)).length-1)*4.2;for(let F of[o.paperLine,o.predicted(e)])for(let P of it(F,S))c(9,T,P,E.min,F===o.paperLine?A:D),T+=4.2;let B=e.tip_height_mm,w=M,v=n-62,z=40,C=10;s.push({id:"strip",points:[[w,v],[w+C,v],[w+C,v+z],[w,v+z]],closed:!0,stroke:A,weight:0.52},{id:"strip-mark",points:[[w-1.5,v+z-B],[w+C+1.5,v+z-B]],stroke:at,weight:0.8}),c(w,v-2.5,o.strip,2.8,at);for(let[F,P]of it(o.stripHelp(B),20).entries())c(w+C+3,v+z-B+1+F*3.6,P,2.4);return c(9,n-xe-1.5,Do,2.2),{width:t,height:n,lines:s,labels:l}}function Wi(e){let[t,n]=Wt[e.paper],o=Kt[e.locale],r=kt(e.locale,!0),i=Sn(e),a=Math.min(...i.flat.outline.map(([,m])=>m)),s=(m)=>({...m,points:m.points.map(([u,f])=>[-u,f])}),l=(m)=>m===zt?Et:m===Et?zt:m,c=(m)=>m===Xe?Te:m===Te?Xe:m,d=[{id:"back-outline",points:i.flat.outline.map(([m,u])=>[-m,u]),closed:!0,stroke:D,weight:0.3}];for(let m of i.creases)d.push({...s(m),id:m.id+"-back-halo",weight:1.2,stroke:En,dash:void 0}),d.push({...s(m),id:m.id+"-back",dash:l(m.dash),stroke:c(m.stroke)});d.push(...i.slits.map((m)=>({...s(m),id:m.id+"-back"})));let p=[...st(d,t/2,Hi-a),...Ui(t,!0)],h=[{x:40,y:10,text:"Open Flight  ·  K3",size:E.min,color:D,font:"display"},{x:40,y:17.5,text:o.names[e.species]+"  ·  "+r.title,size:5,color:A},...r.lines.map((m,u)=>({x:9,y:n-30+u*4.2,text:m,size:2.8,color:A})),{x:9,y:n-xe-1.5,text:Do,size:2.2,color:A}];return{width:t,height:n,lines:p,labels:h}}var Ri=(e,t,n)=>He(e,t,n,14);function Ki(e,t){let{geo:n}=t,o=Sn(t),r=o.flat,i=[],a=(d,p,h=A,m=0.4,u={})=>i.push({id:`s${e}-${d}`,points:p,stroke:h,weight:m,...u}),s={id:"outline",points:r.outline,closed:!0,stroke:A,weight:0.4,fill:ji};if(e<=1){let d=[s];if(e===0)d.push(...o.slits);else d.push(...o.creases.map((p)=>({...p,weight:0.4})));return vn(d,0,0,44,26)}if(e===2){let d=[{...s,points:[...n.half,...n.half.slice(1,-1).reverse().map(([p,h])=>[-p,h])].map(([p,h])=>r.toFlat([p,h],p<0?-1:1))}];for(let p of[1,-1]){let h=(m)=>r.toFlat([p*m[0],m[1]],p);d.push({id:"folded-"+p,points:n.doublerFolded.map(h),closed:!0,fill:"#F3E3C4",stroke:Te,weight:0.35,dash:[0.8,0.6]}),d.push({id:"ghost-"+p,points:n.doubler.map(h),closed:!0,stroke:D,weight:0.25,dash:[0.5,0.5]})}return vn(d,0,0,44,26)}let l=(d,p)=>{a(d,p,Te,0.45);let[h,m]=p.at(-1),[u,f]=p.at(-2),y=Math.atan2(m-f,h-u),g=(_)=>[h-1.8*Math.cos(y+_),m-1.8*Math.sin(y+_)];a(d+"-tip",[g(0.5),[h,m],g(-0.5)],Te,0.45)},c=(d,p,h,m,u,f=16)=>Array.from({length:f+1},(y,g)=>{let _=m+(u-m)*g/f;return[x(d+h*Math.cos(_)),x(p+h*Math.sin(_))]});if(e===3)return a("body",[[16,9],[42,9]],A,0.8),a("head-mark",[[16,7.4],[22,7.4]],"#2A2030",1.2),a("flap-before",[[3,9],[16,9]],D,0.4,{dash:[0.8,0.6]}),a("flap-after",[[16,10.4],[29,10.4]],"#2A2030",1),a("crease",c(16,9.7,0.7,-Math.PI/2,-1.5*Math.PI,6),Te,0.6),l("turn",c(16,10,9,-Math.PI*0.97,-Math.PI*1.6,14)),st(i,0,2);if(e===4)return a("wing-l",[[3,8.5],[21.3,6]],A,0.8),a("wing-r",[[22.7,6],[41,8.5]],A,0.8),a("wall-l",[[21.3,6],[21.3,20]],Xe,0.7),a("wall-r",[[22.7,6],[22.7,20]],Xe,0.7),a("sleeve",[[20.2,9],[20.2,21.1],[22,21.9],[23.8,21.1],[23.8,9]],"#2A2030",1),a("eye-l",Ri(18.8,13,0.9),"#2A2030",0.6,{closed:!0,fill:"#F7EFD9"}),a("eye-r",Ri(25.2,13,0.9),"#2A2030",0.6,{closed:!0,fill:"#F7EFD9"}),i;if(e===5)return vn(Di(t,"perspective"),0,0,44,26);if(e===6){let d=Di(t,"side"),p=n.head_y+t.estimate.balance_target_from_head_mm,h={id:"finger",points:[[p-3,40],[p-3,2],[p,-1],[p+3,2],[p+3,40]].map(([f,y])=>[f,y-30+25]),stroke:at,weight:0.5},u=Ht(-90,0.0001)([0,p,0])[0];return h.points=[[u-3,28],[u-3,6],[u,3],[u+3,6],[u+3,28]],vn([...d,h],0,0,44,26)}return a("wing",[[4,14],[28,14]],A,0.7),a("tab",[[28,14],[34,11.5]],Xe,0.8),a("path",[[2,4],[14,5.5],[26,7.5],[40,9]],D,0.3,{dash:[0.8,0.8]}),st(i,2,2)}function Gi(e){let[t,n]=Wt[e.paper],o=Kt[e.locale],r=[],i=[],a=(d,p,h,m,u=A,f="text")=>i.push({x:d,y:p,text:h,size:m,color:u,font:f});a(9,10,"Open Flight  ·  K3",E.min,D,"display"),a(9,18,o.guide+"  ·  "+o.names[e.species],E.title,A,"display");let s=4,l=(t-18)/s,c=Math.floor((l-4)/1.83);for(let[d,p]of o.steps.entries()){let h=9+d%s*l,m=26+Math.floor(d/s)*((n-40)/2);r.push(...st(Ki(d,e),h+2,m)),a(h,m+32,`${d+1}. ${p.title}`,E.body,A,"bold");let u=m+37;for(let f of it(p.action,c))a(h,u,f,E.min),u+=4.1;u+=0.8;for(let f of it(p.check,c))a(h,u,f,E.min,D),u+=4.1}return a(9,n-xe-1.5,Do,2.2),{width:t,height:n,lines:r,labels:i}}function ol(e,t,n){let[o,r]=Wt[t.paper],i=new Ge({unit:"mm",format:[o,r],orientation:"landscape",compress:!0,putOnlyUsedFonts:!0,precision:5});i.setCreationDate("D:20000101000000+00'00'"),i.setFileId(Z(JSON.stringify(e)).slice(0,32)),i.setLanguage(t.locale),i.setProperties({title:n,author:"Open Flight contributors",subject:"Original design: CERN-OHL-W-2.0. Artwork and text: © Open Flight, free for personal and classroom use; all other rights reserved. "+ft}),gt(i,yt()),i.viewerPreferences({PrintScaling:"None"});for(let[a,s]of e.entries()){if(a)i.addPage([o,r],"landscape");i.setLineJoin("round");for(let l of s.lines){if(!l.points.length)continue;if(l.stroke)i.setDrawColor(l.stroke);if(l.fill)i.setFillColor(l.fill);if(i.setLineWidth(l.stroke?et(l.weight):0),i.setLineDashPattern(l.dash??[],0),i.path(l.points.map((c,d)=>({op:d?"l":"m",c}))),l.closed)i.close();if(l.fill&&l.stroke)i.fillStroke();else if(l.fill)i.fill();else i.stroke()}for(let l of s.labels)bt(i,l.font),i.setFontSize(tt(l.size)*72/25.4),i.setTextColor(l.color??A),i.text(l.text,l.x,l.y)}return ee.from(i.output("arraybuffer"))}function qi(e){return ol([zi(e),Wi(e),Gi(e)],e,"Open Flight - K3 dart butterfly")}var Yi=(e)=>`<path d="M${e.points.map((t)=>t.join(" ")).join(" L")}${e.closed?" Z":""}" fill="${e.fill??"none"}" stroke="${e.stroke??"none"}" stroke-width="${e.weight??0}"${e.dash?` stroke-dasharray="${e.dash.join(" ")}"`:""}/>`;function Vi(e){return Kt[e.locale].steps.map((t,n)=>({...t,diagram:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 26" aria-hidden="true">'+Ki(n,e).map(Yi).join("")+"</svg>"}))}function Ji(e){let t=xn(e.geo,e.appearance_id),n=e.geo.top.map(([c])=>c),o=e.geo.top.map(([,c])=>c),r=t.flatMap((c)=>c.points),i=Math.min(...n,...r.map(([c])=>c))-3,a=Math.min(...o,...r.map(([,c])=>c))-3,s=Math.max(...n,...r.map(([c])=>c))+3-i,l=Math.max(...o,...r.map(([,c])=>c))+3-a;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x(i)} ${x(a)} ${x(s)} ${x(l)}" role="img">${t.map(Yi).join("")}</svg>`}function Xi(e){let t=_n(e.geo).outline,n=t.map(([i])=>i),o=t.map(([,i])=>i),r=Math.max(...n.map(Math.abs));return{width:x(2*r+6),height:x(Math.max(...o)-Math.min(...o)+6),top:Math.min(...o)}}function rl(e){let t=Xi(e);return le({width:t.width,height:t.height,lines:st(Sn(e).lines,t.width/2,3-t.top),labels:[]}).toString("utf8").replace(` width="${t.width}mm" height="${t.height}mm"`,"")}function Zi(e,t=0){return le([zi,Wi,Gi][t](e)).toString("utf8")}function il(e){let{geo:t}=e,n=_n(t),o=t.pose.dihedral_deg*Math.PI/180,r=(t.head_y+t.tail_y)/2,i=[];for(let l of[-1,1]){i.push({side:l,part:"wing",flat:t.half.map((h)=>n.toFlat(h,l)),points:t.half.map(([h,m])=>[x(l*h*Math.cos(o)),x(h*Math.sin(o)),x(m-r)])});let[c,d]=n.crease.root,p=[[0,t.head_y],[l*c[0],c[1]],[l*d[0],d[1]],[0,d[1]]];i.push({side:l,part:"wall",flat:p,points:[[0.12*l,-t.pose.keel_front_mm,x(t.head_y-r)],[0.12*l,0,x(t.head_y-r)],[0.12*l,0,x(t.tail_y-r)],[0.12*l,-t.pose.keel_tail_mm,x(t.tail_y-r)]]})}let a=t.head_y-r-1.2,s=(l)=>[[a+31,0.5],[a+2,0.5],[a,2.5],[a+0.3,5],[a+2,7],[a+29,7],[a+31,5],[a+29,3],[a+4,3]].map(([c,d])=>[0.55+l,x(d-t.pose.keel_front_mm-0.3),x(c)]);return{faces:i,clips:[s(0),s(-1.1)],center:r}}function al(e){let t=pe.find((c)=>c.species===e.species),n={...t.parameters,span_mm:e.span_mm},o=e.span_mm===t.parameters.span_mm&&e.appearance_id===t.appearance_id,r=o?t.model:"comparison-"+e.species+"-"+e.span_mm+"-"+e.appearance_id,i=o?t.baseline_revision:"pair1",a=Qt(t,r,i,n,e.appearance_id),s={design_id:r,revision_id:i,source_sha256:Z(Zt(a))},l=tn(t,{ref:s,parameters:n,appearance_id:e.appearance_id},e.paper,e.locale);if(!o){let c=l.labels.find((d)=>d.text.includes("/v1/designs/"));if(c)c.text="Open Flight · W1 / "+t.species+" / "+e.span_mm+" mm / "+e.appearance_id}return _t(l)}var Dd=()=>Qn(null,["pdf"]),Ln=new Map(jr.map((e)=>{let t=_o(e.model,e.baseline_revision,e.name,e.parameters,e.appearance_id,null,"original","2026-11-23T00:00:00Z",e.species);return[e.model,t]})),Bn=new Map,Ro=new Map,sl="open-flight-designs-v1:"+new URL(".",import.meta.url).pathname,jo=new Promise((e,t)=>{let n=indexedDB.open(sl,1);n.onupgradeneeded=()=>{n.result.createObjectStore("records"),n.result.createObjectStore("heads"),n.result.createObjectStore("receipts")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)}),Gt=(e)=>new Promise((t,n)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>n(e.error)}),Ce=(e)=>Response.json(e);async function ea(e,t,n){if(Ln.has(e)&&Ln.get(e).dto.ref.revision_id===t)return Ln.get(e);let o=n??(await jo).transaction(["records","heads"]),[r,i]=await Promise.all([Gt(o.objectStore("records").get([e,t])),Gt(o.objectStore("heads").get(e))]);if(!r||!i)throw Error("This design is unavailable on this device.");return{source:r.source,dto:{...r.dto,head_revision_id:i.ref.revision_id}}}async function In(e,t){let n=await ea(e.design_id,e.revision_id,t);if(n.dto.ref.source_sha256!==e.source_sha256||n.dto.provenance.generator_revision!==nn(n.dto.species_id)||n.source!==rn(e.design_id,e.revision_id,n.dto))throw Error("The saved source differs from this revision.");return n}async function ll(e,t,n){let r=(await jo).transaction(["records","heads","receipts"],"readwrite"),i=new Promise((c,d)=>{r.oncomplete=c,r.onerror=r.onabort=()=>d(r.error??Error("Save interrupted"))}),a=r.objectStore("receipts"),s=n.headers["Idempotency-Key"],l=JSON.stringify([e,n.headers["If-Match"],t]);try{let c=await Gt(a.get(s));if(c){if(c.fingerprint!==l)throw Error("This save key belongs to a different edit.");return await i,c.dto}let d,p,h;if(e){let f=await Gt(r.objectStore("heads").get(e));if(!f||n.headers["If-Match"]!=='"'+f.ref.revision_id+'"'){let y=Error("Reload the current revision before saving.");throw y.code="revision_conflict",y}d=(await In(f.ref,r)).dto,p="r"+(Number(f.ref.revision_id.slice(1))+1),h=d.name}else{if(d=(await In(t.source,r)).dto,h=String(t.name??"").trim(),!h||h.length>120)throw Error("Choose a name of up to 120 characters.");e="d-"+crypto.randomUUID(),p="r1"}let m=yo(d,t.parameters,t.appearance_id),u=_o(e,p,h,m.parameters,m.appearance_id,d.ref,p==="r1"?"fork":"revision",new Date().toISOString(),d.species_id);return r.objectStore("records").add(u,[e,p]),r.objectStore("heads").put(u.dto,e),a.add({fingerprint:l,dto:u.dto},s),await i,u.dto}catch(c){try{r.abort()}catch{}throw await i.catch(()=>{}),c}}function Qi(e,t,n){let o=e+"-"+crypto.randomUUID();return Bn.set(o,new Blob([n],{type:t})),{artifact_id:o}}async function Rd(e,t={}){try{t.signal?.throwIfAborted();let n=new URL(e,location.origin),[,,o,r,i,a]=n.pathname.split("/"),s=t.body?JSON.parse(t.body):{};switch(o){case"capabilities":return Ce({enabled_operations:["previewDraft","previewDesign","forkDesign","reviseDesign","startExport","listDesigns","listActivities","getDesignRevision","getFieldGuide"]});case"field-guide":return Ce({species:nt});case"designs":{if(t.method==="POST")return Ce(await ll(r,s,t));if(r)return Ce((await ea(r,a)).dto);let l=await Gt((await jo).transaction("heads").objectStore("heads").getAll());return Ce({items:[...Ln.values()].map((c)=>c.dto).concat(l),next_cursor:null})}case"activities":{if(r)return Ce(qr(r,a));let l=n.searchParams.get("species_id");return Ce({items:sn(l==="legacy"?void 0:l,n.searchParams.get("locale")),next_cursor:null})}case"previews":{let l=(await In(s.design)).dto,c={...l,...yo(l,s.parameters,s.appearance_id)},d=Nr(c),p=r==="draft"?d.toString("utf8"):Qi("preview","image/svg+xml",d);return Ce({svg:p,geometry:an(c),is_flight_simulation:!1})}case"exports":{let l=await In(s.design);await Qn(nt.find((p)=>p.id===l.dto.species_id),s.formats);let c=[];Vr(l,s,(p,h,m)=>c.push(Qi(p,h,m).artifact_id));let d={job_id:"job-"+crypto.randomUUID(),status:"succeeded",artifact_ids:c};return Ro.set(d.job_id,d),Ce(d)}case"jobs":if(Ro.has(r))return Ce(Ro.get(r));break;case"artifacts":if(Bn.has(r)){let l=Bn.get(r);return Bn.delete(r),new Response(l,{headers:{"Content-Type":l.type}})}break}return Response.json({message:"Unknown workshop resource."},{status:404})}catch(n){if(n.name==="AbortError")throw n;return Response.json({code:n.code,message:n.message},{status:400})}}export{al as classicComparisonPdf,Rs as foldedFinishedPreview,$s as foldedGuideSvg,Ds as foldedLessonSvg,mi as foldedPdf,ui as foldedPreview,hi as foldedSource,Eo as foldedSpanSpec,Bs as foldedSpecies,pi as foldedSvg,ri as isFoldedSpan,Xs as k2FinishedSvg,Ut as k2Flat,Qs as k2PageSvg,Vs as k2Pdf,Ii as k2Predict,Zs as k2Preview,Si as k2SpanRange,Vi as k3BuildSteps,Io as k3DefaultSpan,il as k3Faces,Ji as k3FinishedSvg,Zi as k3PageSvg,qi as k3Pdf,rl as k3Preview,Xi as k3PreviewBox,yn as k3SpanRange,ai as makeFoldedButterfly,Bi as makeK2,Ni as makeK3,Dd as prepareFoldedPdf,Rd as publicRequest};
