var An=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Wn=An(function(er){er.byteLength=Xt;er.toByteArray=Kt;er.fromByteArray=Zt;var V=[],D=[],Vt=typeof Uint8Array<"u"?Uint8Array:Array,ze="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(se=0,Ve=ze.length;se<Ve;++se)V[se]=ze[se],D[ze.charCodeAt(se)]=se;var se,Ve;D[45]=62;D[95]=63;function Hn(t){var e=t.length;if(e%4>0)throw Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");if(n===-1)n=e;var r=n===e?0:4-n%4;return[n,r]}function Xt(t){var e=Hn(t),n=e[0],r=e[1];return(n+r)*3/4-r}function qt(t,e,n){return(e+n)*3/4-n}function Kt(t){var e,n=Hn(t),r=n[0],i=n[1],o=new Vt(qt(t,r,i)),s=0,a=i>0?r-4:r,l;for(l=0;l<a;l+=4)e=D[t.charCodeAt(l)]<<18|D[t.charCodeAt(l+1)]<<12|D[t.charCodeAt(l+2)]<<6|D[t.charCodeAt(l+3)],o[s++]=e>>16&255,o[s++]=e>>8&255,o[s++]=e&255;if(i===2)e=D[t.charCodeAt(l)]<<2|D[t.charCodeAt(l+1)]>>4,o[s++]=e&255;if(i===1)e=D[t.charCodeAt(l)]<<10|D[t.charCodeAt(l+1)]<<4|D[t.charCodeAt(l+2)]>>2,o[s++]=e>>8&255,o[s++]=e&255;return o}function Jt(t){return V[t>>18&63]+V[t>>12&63]+V[t>>6&63]+V[t&63]}function Qt(t,e,n){var r,i=[];for(var o=e;o<n;o+=3)r=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(t[o+2]&255),i.push(Jt(r));return i.join("")}function Zt(t){var e,n=t.length,r=n%3,i=[],o=16383;for(var s=0,a=n-r;s<a;s+=o)i.push(Qt(t,s,s+o>a?a:s+o));if(r===1)e=t[n-1],i.push(V[e>>2]+V[e<<4&63]+"==");else if(r===2)e=(t[n-2]<<8)+t[n-1],i.push(V[e>>10]+V[e>>4&63]+V[e<<2&63]+"=");return i.join("")}});var jn=An(function(ir){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ir.read=function(t,e,n,r,i){var o,s,a=i*8-r-1,l=(1<<a)-1,c=l>>1,d=-7,p=n?i-1:0,f=n?-1:1,u=t[e+p];p+=f,o=u&(1<<-d)-1,u>>=-d,d+=a;for(;d>0;o=o*256+t[e+p],p+=f,d-=8);s=o&(1<<-d)-1,o>>=-d,d+=r;for(;d>0;s=s*256+t[e+p],p+=f,d-=8);if(o===0)o=1-c;else if(o===l)return s?NaN:(u?-1:1)*(1/0);else s=s+Math.pow(2,r),o=o-c;return(u?-1:1)*s*Math.pow(2,o-r)};ir.write=function(t,e,n,r,i,o){var s,a,l,c=o*8-i-1,d=(1<<c)-1,p=d>>1,f=i===23?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:o-1,g=r?1:-1,m=e<0||e===0&&1/e<0?1:0;if(e=Math.abs(e),isNaN(e)||e===1/0)a=isNaN(e)?1:0,s=d;else{if(s=Math.floor(Math.log(e)/Math.LN2),e*(l=Math.pow(2,-s))<1)s--,l*=2;if(s+p>=1)e+=f/l;else e+=f*Math.pow(2,1-p);if(e*l>=2)s++,l/=2;if(s+p>=d)a=0,s=d;else if(s+p>=1)a=(e*l-1)*Math.pow(2,i),s=s+p;else a=e*Math.pow(2,p-1)*Math.pow(2,i),s=0}for(;i>=8;t[n+u]=a&255,u+=g,a/=256,i-=8);s=s<<i|a,c+=i;for(;c>0;t[n+u]=s&255,u+=g,s/=256,c-=8);t[n+u-g]|=m*128}});var Ut=(t)=>t/4294967296|0,Ht=(t)=>t>>>0;function Bn(t,e,n,r){let i=Ut(n),o=Ht(n);t.setUint32(e,r?o:i,r),t.setUint32(e+4,r?i:o,r)}function In(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in t&&t.BYTES_PER_ELEMENT===1}var je=(t)=>t?`"${t}" `:"";function Wt(t,e=""){if(typeof t!=="number")throw TypeError(je(e)+"expected number, got "+typeof t);if(!Number.isSafeInteger(t)||t<0)throw RangeError(je(e)+"expected integer >= 0, got "+t);return t}function Ie(t,e,n=""){if(In(t)&&(e===void 0||t.length===e))return t;if(e!==void 0)Wt(e,"length");let r=In(t),i=e!==void 0?` of length ${e}`:"",o=r?`length=${t.length}`:`type=${typeof t}`,s=je(n)+"expected Uint8Array"+i+", got "+o;if(!r)throw TypeError(s);throw RangeError(s)}var jt=(t,e)=>{if(t===null||typeof t!=="object"||Array.isArray(t))throw TypeError((e==="object"?"":`"${e}" `)+"expected object, got type="+typeof t)},Mn=(t,e)=>{jt(t,e);let n=Object.getPrototypeOf(t);if(n!==Object.prototype&&n!==null)throw TypeError(`"${e}" expected plain object`);if(Object.hasOwn(t,"__proto__"))throw TypeError(`"${e}.__proto__" is not allowed`)};function Ge(t,e=!0){if(t.destroyed)throw Error("hash was destroyed");if(e&&t.finished)throw Error("digest() was already called")}function Sn(t,e){Ie(t,void 0,"output");let n=e.outputLen;if(!(t.length>=n))throw RangeError('"output" expected length >= '+n)}function $e(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function Me(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function H(t,e){return t<<32-e|t>>>e}var Gt=(()=>typeof Uint8Array.from([]).toHex==="function"&&typeof Uint8Array.fromHex==="function")(),$t=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Pn(t){if(Ie(t),Gt)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=$t[t[n]];return e}function Yt(t,e,n="opts"){if(Mn(t,"defaults"),e!==void 0)Mn(e,n);return Object.assign(Object.create(null),t,e)}function Tn(t,e={}){if(typeof t!=="function")throw TypeError('"hashCons" expected function, got type='+typeof t);e=Yt({},e,"info");let n=(i,o)=>t(o).update(i).digest(),r=t(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=(i)=>t(i),Object.assign(n,e),Object.freeze(n)}var vn=(t)=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,t])});function Rn(t,e,n){return t&e^~t&n}function Cn(t,e,n){return t&e^t&n^e&n}class Ye{blockLen;outputLen;canXOF=!1;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(t,e,n,r){this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=r,this.buffer=new Uint8Array(t),this.view=Me(this.buffer)}update(t){Ge(this),Ie(t);let{view:e,buffer:n,blockLen:r}=this,i=t.length,o=!1;for(let s=0;s<i;){let a=Math.min(r-this.pos,i-s);if(a===r){let l=Me(t);for(;r<=i-s;s+=r)this.process(l,s);o=!0;continue}if(n.set(s===0&&a===i?t:t.subarray(s,s+a),this.pos),this.pos+=a,s+=a,this.pos===r)this.process(e,0),this.pos=0,o=!0}if(this.length+=t.length,o)this.roundClean();return this}digestInto(t){Ge(this),Sn(t,this),this.finished=!0;let{buffer:e,view:n,blockLen:r,isLE:i}=this,{pos:o}=this;if(e[o++]=128,e.fill(0,o),this.padOffset>r-o)this.process(n,0),e.fill(0);Bn(n,r-8,this.length*8,i),this.process(n,0),this.roundClean();let s=t===e?n:Me(t),a=this.outputLen,l=a/4,c=this.get();if(a%4||l>c.length)throw Error("invalid outputLen");for(let d=0;d<l;d++)s.setUint32(4*d,c[d],i)}digest(){let{buffer:t,outputLen:e}=this;this.digestInto(t);let n=t.slice(0,e);return this.destroy(),n}_cloneIntoMeta(t){let{buffer:e,length:n,finished:r,destroyed:i,pos:o}=this;if(t.destroyed=i,t.finished=r,t.length=n,t.pos=o,o)t.buffer.set(e);return t}clone(){return this._cloneInto()}}var Ln=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var zt=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),oe=new Uint32Array(64);class On extends Ye{A=0;B=0;C=0;D=0;E=0;F=0;G=0;H=0;constructor(t,e){super(64,t,8,!1);this.A=e[0]|0,this.B=e[1]|0,this.C=e[2]|0,this.D=e[3]|0,this.E=e[4]|0,this.F=e[5]|0,this.G=e[6]|0,this.H=e[7]|0}get(){let{A:t,B:e,C:n,D:r,E:i,F:o,G:s,H:a}=this;return[t,e,n,r,i,o,s,a]}set(t,e,n,r,i,o,s,a){this.A=t|0,this.B=e|0,this.C=n|0,this.D=r|0,this.E=i|0,this.F=o|0,this.G=s|0,this.H=a|0}_cloneInto(t){return(t||=new this.constructor).set(...this.get()),this._cloneIntoMeta(t)}process(t,e){for(let d=0;d<16;d++,e+=4)oe[d]=t.getUint32(e,!1);for(let d=16;d<64;d++){let p=oe[d-15],f=oe[d-2],u=H(p,7)^H(p,18)^p>>>3,g=H(f,17)^H(f,19)^f>>>10;oe[d]=g+oe[d-7]+u+oe[d-16]|0}let{A:n,B:r,C:i,D:o,E:s,F:a,G:l,H:c}=this;for(let d=0;d<64;d++){let p=H(s,6)^H(s,11)^H(s,25),f=c+p+Rn(s,a,l)+zt[d]+oe[d]|0,g=(H(n,2)^H(n,13)^H(n,22))+Cn(n,r,i)|0;c=l,l=a,a=s,s=o+f|0,o=i,i=r,r=n,n=f+g|0}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,o=o+this.D|0,s=s+this.E|0,a=a+this.F|0,l=l+this.G|0,c=c+this.H|0,this.set(n,r,i,o,s,a,l,c)}roundClean(){$e(oe)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),$e(this.buffer)}}class Dn extends On{constructor(){super(32,Ln)}}var Nn=Tn(()=>new Dn,vn(1));function Un(){let t=Nn.create();return{update(e){return t.update(typeof e==="string"?new TextEncoder().encode(e):e),this},digest(){return Pn(t.digest())}}}/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var Xe=Wn(),ue=jn(),Gn=typeof Symbol==="function"&&typeof Symbol.for==="function"?Symbol.for("nodejs.util.inspect.custom"):null;var q=h;var ot=50;var qe=2147483647;h.TYPED_ARRAY_SUPPORT=ar();if(!h.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error==="function")console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function ar(){try{let t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),t.foo()===42}catch(t){return!1}}Object.defineProperty(h.prototype,"parent",{enumerable:!0,get:function(){if(!h.isBuffer(this))return;return this.buffer}});Object.defineProperty(h.prototype,"offset",{enumerable:!0,get:function(){if(!h.isBuffer(this))return;return this.byteOffset}});function ne(t){if(t>qe)throw RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,h.prototype),e}function h(t,e,n){if(typeof t==="number"){if(typeof e==="string")throw TypeError('The "string" argument must be of type string. Received type number');return Ze(t)}return Vn(t,e,n)}h.poolSize=8192;function Vn(t,e,n){if(typeof t==="string")return lr(t,e);if(ArrayBuffer.isView(t))return dr(t);if(t==null)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(X(t,ArrayBuffer)||t&&X(t.buffer,ArrayBuffer))return Je(t,e,n);if(typeof SharedArrayBuffer<"u"&&(X(t,SharedArrayBuffer)||t&&X(t.buffer,SharedArrayBuffer)))return Je(t,e,n);if(typeof t==="number")throw TypeError('The "value" argument must not be of type number. Received type number');let r=t.valueOf&&t.valueOf();if(r!=null&&r!==t)return h.from(r,e,n);let i=pr(t);if(i)return i;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]==="function")return h.from(t[Symbol.toPrimitive]("string"),e,n);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}h.from=function(t,e,n){return Vn(t,e,n)};Object.setPrototypeOf(h.prototype,Uint8Array.prototype);Object.setPrototypeOf(h,Uint8Array);function Xn(t){if(typeof t!=="number")throw TypeError('"size" argument must be of type number');else if(t<0)throw RangeError('The value "'+t+'" is invalid for option "size"')}function cr(t,e,n){if(Xn(t),t<=0)return ne(t);if(e!==void 0)return typeof n==="string"?ne(t).fill(e,n):ne(t).fill(e);return ne(t)}h.alloc=function(t,e,n){return cr(t,e,n)};function Ze(t){return Xn(t),ne(t<0?0:en(t)|0)}h.allocUnsafe=function(t){return Ze(t)};h.allocUnsafeSlow=function(t){return Ze(t)};function lr(t,e){if(typeof e!=="string"||e==="")e="utf8";if(!h.isEncoding(e))throw TypeError("Unknown encoding: "+e);let n=qn(t,e)|0,r=ne(n),i=r.write(t,e);if(i!==n)r=r.slice(0,i);return r}function Ke(t){let e=t.length<0?0:en(t.length)|0,n=ne(e);for(let r=0;r<e;r+=1)n[r]=t[r]&255;return n}function dr(t){if(X(t,Uint8Array)){let e=new Uint8Array(t);return Je(e.buffer,e.byteOffset,e.byteLength)}return Ke(t)}function Je(t,e,n){if(e<0||t.byteLength<e)throw RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw RangeError('"length" is outside of buffer bounds');let r;if(e===void 0&&n===void 0)r=new Uint8Array(t);else if(n===void 0)r=new Uint8Array(t,e);else r=new Uint8Array(t,e,n);return Object.setPrototypeOf(r,h.prototype),r}function pr(t){if(h.isBuffer(t)){let e=en(t.length)|0,n=ne(e);if(n.length===0)return n;return t.copy(n,0,0,e),n}if(t.length!==void 0){if(typeof t.length!=="number"||tn(t.length))return ne(0);return Ke(t)}if(t.type==="Buffer"&&Array.isArray(t.data))return Ke(t.data)}function en(t){if(t>=qe)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+qe.toString(16)+" bytes");return t|0}h.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==h.prototype};h.compare=function(e,n){if(X(e,Uint8Array))e=h.from(e,e.offset,e.byteLength);if(X(n,Uint8Array))n=h.from(n,n.offset,n.byteLength);if(!h.isBuffer(e)||!h.isBuffer(n))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===n)return 0;let r=e.length,i=n.length;for(let o=0,s=Math.min(r,i);o<s;++o)if(e[o]!==n[o]){r=e[o],i=n[o];break}if(r<i)return-1;if(i<r)return 1;return 0};h.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};h.concat=function(e,n){if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return h.alloc(0);let r;if(n===void 0){n=0;for(r=0;r<e.length;++r)n+=e[r].length}let i=h.allocUnsafe(n),o=0;for(r=0;r<e.length;++r){let s=e[r];if(X(s,Uint8Array))if(o+s.length>i.length){if(!h.isBuffer(s))s=h.from(s);s.copy(i,o)}else Uint8Array.prototype.set.call(i,s,o);else if(!h.isBuffer(s))throw TypeError('"list" argument must be an Array of Buffers');else s.copy(i,o);o+=s.length}return i};function qn(t,e){if(h.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||X(t,ArrayBuffer))return t.byteLength;if(typeof t!=="string")throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let n=t.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&n===0)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return Qe(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return it(t).length;default:if(i)return r?-1:Qe(t).length;e=(""+e).toLowerCase(),i=!0}}h.byteLength=qn;function hr(t,e,n){let r=!1;if(e===void 0||e<0)e=0;if(e>this.length)return"";if(n===void 0||n>this.length)n=this.length;if(n<=0)return"";if(n>>>=0,e>>>=0,n<=e)return"";if(!t)t="utf8";while(!0)switch(t){case"hex":return Fr(this,e,n);case"utf8":case"utf-8":return Jn(this,e,n);case"ascii":return xr(this,e,n);case"latin1":case"binary":return _r(this,e,n);case"base64":return yr(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Er(this,e,n);default:if(r)throw TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}h.prototype._isBuffer=!0;function le(t,e,n){let r=t[e];t[e]=t[n],t[n]=r}h.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<e;n+=2)le(this,n,n+1);return this};h.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<e;n+=4)le(this,n,n+3),le(this,n+1,n+2);return this};h.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<e;n+=8)le(this,n,n+7),le(this,n+1,n+6),le(this,n+2,n+5),le(this,n+3,n+4);return this};h.prototype.toString=function(){let e=this.length;if(e===0)return"";if(arguments.length===0)return Jn(this,0,e);return hr.apply(this,arguments)};h.prototype.toLocaleString=h.prototype.toString;h.prototype.equals=function(e){if(!h.isBuffer(e))throw TypeError("Argument must be a Buffer");if(this===e)return!0;return h.compare(this,e)===0};h.prototype.inspect=function(){let e="",n=ot;if(e=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n)e+=" ... ";return"<Buffer "+e+">"};if(Gn)h.prototype[Gn]=h.prototype.inspect;h.prototype.compare=function(e,n,r,i,o){if(X(e,Uint8Array))e=h.from(e,e.offset,e.byteLength);if(!h.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(n===void 0)n=0;if(r===void 0)r=e?e.length:0;if(i===void 0)i=0;if(o===void 0)o=this.length;if(n<0||r>e.length||i<0||o>this.length)throw RangeError("out of range index");if(i>=o&&n>=r)return 0;if(i>=o)return-1;if(n>=r)return 1;if(n>>>=0,r>>>=0,i>>>=0,o>>>=0,this===e)return 0;let s=o-i,a=r-n,l=Math.min(s,a),c=this.slice(i,o),d=e.slice(n,r);for(let p=0;p<l;++p)if(c[p]!==d[p]){s=c[p],a=d[p];break}if(s<a)return-1;if(a<s)return 1;return 0};function Kn(t,e,n,r,i){if(t.length===0)return-1;if(typeof n==="string")r=n,n=0;else if(n>2147483647)n=2147483647;else if(n<-2147483648)n=-2147483648;if(n=+n,tn(n))n=i?0:t.length-1;if(n<0)n=t.length+n;if(n>=t.length)if(i)return-1;else n=t.length-1;else if(n<0)if(i)n=0;else return-1;if(typeof e==="string")e=h.from(e,r);if(h.isBuffer(e)){if(e.length===0)return-1;return $n(t,e,n,r,i)}else if(typeof e==="number"){if(e=e&255,typeof Uint8Array.prototype.indexOf==="function")if(i)return Uint8Array.prototype.indexOf.call(t,e,n);else return Uint8Array.prototype.lastIndexOf.call(t,e,n);return $n(t,[e],n,r,i)}throw TypeError("val must be string, number or Buffer")}function $n(t,e,n,r,i){let o=1,s=t.length,a=e.length;if(r!==void 0){if(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le"){if(t.length<2||e.length<2)return-1;o=2,s/=2,a/=2,n/=2}}function l(d,p){if(o===1)return d[p];else return d.readUInt16BE(p*o)}let c;if(i){let d=-1;for(c=n;c<s;c++)if(l(t,c)===l(e,d===-1?0:c-d)){if(d===-1)d=c;if(c-d+1===a)return d*o}else{if(d!==-1)c-=c-d;d=-1}}else{if(n+a>s)n=s-a;for(c=n;c>=0;c--){let d=!0;for(let p=0;p<a;p++)if(l(t,c+p)!==l(e,p)){d=!1;break}if(d)return c}}return-1}h.prototype.includes=function(e,n,r){return this.indexOf(e,n,r)!==-1};h.prototype.indexOf=function(e,n,r){return Kn(this,e,n,r,!0)};h.prototype.lastIndexOf=function(e,n,r){return Kn(this,e,n,r,!1)};function ur(t,e,n,r){n=Number(n)||0;let i=t.length-n;if(!r)r=i;else if(r=Number(r),r>i)r=i;let o=e.length;if(r>o/2)r=o/2;let s;for(s=0;s<r;++s){let a=parseInt(e.substr(s*2,2),16);if(tn(a))return s;t[n+s]=a}return s}function fr(t,e,n,r){return Se(Qe(e,t.length-n),t,n,r)}function mr(t,e,n,r){return Se(Ir(e),t,n,r)}function gr(t,e,n,r){return Se(it(e),t,n,r)}function br(t,e,n,r){return Se(Mr(e,t.length-n),t,n,r)}h.prototype.write=function(e,n,r,i){if(n===void 0)i="utf8",r=this.length,n=0;else if(r===void 0&&typeof n==="string")i=n,r=this.length,n=0;else if(isFinite(n))if(n=n>>>0,isFinite(r)){if(r=r>>>0,i===void 0)i="utf8"}else i=r,r=void 0;else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let o=this.length-n;if(r===void 0||r>o)r=o;if(e.length>0&&(r<0||n<0)||n>this.length)throw RangeError("Attempt to write outside buffer bounds");if(!i)i="utf8";let s=!1;for(;;)switch(i){case"hex":return ur(this,e,n,r);case"utf8":case"utf-8":return fr(this,e,n,r);case"ascii":case"latin1":case"binary":return mr(this,e,n,r);case"base64":return gr(this,e,n,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return br(this,e,n,r);default:if(s)throw TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),s=!0}};h.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function yr(t,e,n){if(e===0&&n===t.length)return Xe.fromByteArray(t);else return Xe.fromByteArray(t.slice(e,n))}function Jn(t,e,n){n=Math.min(t.length,n);let r=[],i=e;while(i<n){let o=t[i],s=null,a=o>239?4:o>223?3:o>191?2:1;if(i+a<=n){let l,c,d,p;switch(a){case 1:if(o<128)s=o;break;case 2:if(l=t[i+1],(l&192)===128){if(p=(o&31)<<6|l&63,p>127)s=p}break;case 3:if(l=t[i+1],c=t[i+2],(l&192)===128&&(c&192)===128){if(p=(o&15)<<12|(l&63)<<6|c&63,p>2047&&(p<55296||p>57343))s=p}break;case 4:if(l=t[i+1],c=t[i+2],d=t[i+3],(l&192)===128&&(c&192)===128&&(d&192)===128){if(p=(o&15)<<18|(l&63)<<12|(c&63)<<6|d&63,p>65535&&p<1114112)s=p}}}if(s===null)s=65533,a=1;else if(s>65535)s-=65536,r.push(s>>>10&1023|55296),s=56320|s&1023;r.push(s),i+=a}return wr(r)}var Yn=4096;function wr(t){let e=t.length;if(e<=Yn)return String.fromCharCode.apply(String,t);let n="",r=0;while(r<e)n+=String.fromCharCode.apply(String,t.slice(r,r+=Yn));return n}function xr(t,e,n){let r="";n=Math.min(t.length,n);for(let i=e;i<n;++i)r+=String.fromCharCode(t[i]&127);return r}function _r(t,e,n){let r="";n=Math.min(t.length,n);for(let i=e;i<n;++i)r+=String.fromCharCode(t[i]);return r}function Fr(t,e,n){let r=t.length;if(!e||e<0)e=0;if(!n||n<0||n>r)n=r;let i="";for(let o=e;o<n;++o)i+=Sr[t[o]];return i}function Er(t,e,n){let r=t.slice(e,n),i="";for(let o=0;o<r.length-1;o+=2)i+=String.fromCharCode(r[o]+r[o+1]*256);return i}h.prototype.slice=function(e,n){let r=this.length;if(e=~~e,n=n===void 0?r:~~n,e<0){if(e+=r,e<0)e=0}else if(e>r)e=r;if(n<0){if(n+=r,n<0)n=0}else if(n>r)n=r;if(n<e)n=e;let i=this.subarray(e,n);return Object.setPrototypeOf(i,h.prototype),i};function B(t,e,n){if(t%1!==0||t<0)throw RangeError("offset is not uint");if(t+e>n)throw RangeError("Trying to access beyond buffer length")}h.prototype.readUintLE=h.prototype.readUIntLE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)B(e,n,this.length);let i=this[e],o=1,s=0;while(++s<n&&(o*=256))i+=this[e+s]*o;return i};h.prototype.readUintBE=h.prototype.readUIntBE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)B(e,n,this.length);let i=this[e+--n],o=1;while(n>0&&(o*=256))i+=this[e+--n]*o;return i};h.prototype.readUint8=h.prototype.readUInt8=function(e,n){if(e=e>>>0,!n)B(e,1,this.length);return this[e]};h.prototype.readUint16LE=h.prototype.readUInt16LE=function(e,n){if(e=e>>>0,!n)B(e,2,this.length);return this[e]|this[e+1]<<8};h.prototype.readUint16BE=h.prototype.readUInt16BE=function(e,n){if(e=e>>>0,!n)B(e,2,this.length);return this[e]<<8|this[e+1]};h.prototype.readUint32LE=h.prototype.readUInt32LE=function(e,n){if(e=e>>>0,!n)B(e,4,this.length);return(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};h.prototype.readUint32BE=h.prototype.readUInt32BE=function(e,n){if(e=e>>>0,!n)B(e,4,this.length);return this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};h.prototype.readBigUInt64LE=ae(function(e){e=e>>>0,fe(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)_e(e,this.length-8);let i=n+this[++e]*256+this[++e]*65536+this[++e]*16777216,o=this[++e]+this[++e]*256+this[++e]*65536+r*16777216;return BigInt(i)+(BigInt(o)<<BigInt(32))});h.prototype.readBigUInt64BE=ae(function(e){e=e>>>0,fe(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)_e(e,this.length-8);let i=n*16777216+this[++e]*65536+this[++e]*256+this[++e],o=this[++e]*16777216+this[++e]*65536+this[++e]*256+r;return(BigInt(i)<<BigInt(32))+BigInt(o)});h.prototype.readIntLE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)B(e,n,this.length);let i=this[e],o=1,s=0;while(++s<n&&(o*=256))i+=this[e+s]*o;if(o*=128,i>=o)i-=Math.pow(2,8*n);return i};h.prototype.readIntBE=function(e,n,r){if(e=e>>>0,n=n>>>0,!r)B(e,n,this.length);let i=n,o=1,s=this[e+--i];while(i>0&&(o*=256))s+=this[e+--i]*o;if(o*=128,s>=o)s-=Math.pow(2,8*n);return s};h.prototype.readInt8=function(e,n){if(e=e>>>0,!n)B(e,1,this.length);if(!(this[e]&128))return this[e];return(255-this[e]+1)*-1};h.prototype.readInt16LE=function(e,n){if(e=e>>>0,!n)B(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};h.prototype.readInt16BE=function(e,n){if(e=e>>>0,!n)B(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};h.prototype.readInt32LE=function(e,n){if(e=e>>>0,!n)B(e,4,this.length);return this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};h.prototype.readInt32BE=function(e,n){if(e=e>>>0,!n)B(e,4,this.length);return this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};h.prototype.readBigInt64LE=ae(function(e){e=e>>>0,fe(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)_e(e,this.length-8);let i=this[e+4]+this[e+5]*256+this[e+6]*65536+(r<<24);return(BigInt(i)<<BigInt(32))+BigInt(n+this[++e]*256+this[++e]*65536+this[++e]*16777216)});h.prototype.readBigInt64BE=ae(function(e){e=e>>>0,fe(e,"offset");let n=this[e],r=this[e+7];if(n===void 0||r===void 0)_e(e,this.length-8);let i=(n<<24)+this[++e]*65536+this[++e]*256+this[++e];return(BigInt(i)<<BigInt(32))+BigInt(this[++e]*16777216+this[++e]*65536+this[++e]*256+r)});h.prototype.readFloatLE=function(e,n){if(e=e>>>0,!n)B(e,4,this.length);return ue.read(this,e,!0,23,4)};h.prototype.readFloatBE=function(e,n){if(e=e>>>0,!n)B(e,4,this.length);return ue.read(this,e,!1,23,4)};h.prototype.readDoubleLE=function(e,n){if(e=e>>>0,!n)B(e,8,this.length);return ue.read(this,e,!0,52,8)};h.prototype.readDoubleBE=function(e,n){if(e=e>>>0,!n)B(e,8,this.length);return ue.read(this,e,!1,52,8)};function S(t,e,n,r,i,o){if(!h.isBuffer(t))throw TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw RangeError('"value" argument is out of bounds');if(n+r>t.length)throw RangeError("Index out of range")}h.prototype.writeUintLE=h.prototype.writeUIntLE=function(e,n,r,i){if(e=+e,n=n>>>0,r=r>>>0,!i){let a=Math.pow(2,8*r)-1;S(this,e,n,r,a,0)}let o=1,s=0;this[n]=e&255;while(++s<r&&(o*=256))this[n+s]=e/o&255;return n+r};h.prototype.writeUintBE=h.prototype.writeUIntBE=function(e,n,r,i){if(e=+e,n=n>>>0,r=r>>>0,!i){let a=Math.pow(2,8*r)-1;S(this,e,n,r,a,0)}let o=r-1,s=1;this[n+o]=e&255;while(--o>=0&&(s*=256))this[n+o]=e/s&255;return n+r};h.prototype.writeUint8=h.prototype.writeUInt8=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,1,255,0);return this[n]=e&255,n+1};h.prototype.writeUint16LE=h.prototype.writeUInt16LE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,2,65535,0);return this[n]=e&255,this[n+1]=e>>>8,n+2};h.prototype.writeUint16BE=h.prototype.writeUInt16BE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,2,65535,0);return this[n]=e>>>8,this[n+1]=e&255,n+2};h.prototype.writeUint32LE=h.prototype.writeUInt32LE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,4,4294967295,0);return this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=e&255,n+4};h.prototype.writeUint32BE=h.prototype.writeUInt32BE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,4,4294967295,0);return this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};function Qn(t,e,n,r,i){rt(e,r,i,t,n,7);let o=Number(e&BigInt(4294967295));t[n++]=o,o=o>>8,t[n++]=o,o=o>>8,t[n++]=o,o=o>>8,t[n++]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=s,s=s>>8,t[n++]=s,s=s>>8,t[n++]=s,s=s>>8,t[n++]=s,n}function Zn(t,e,n,r,i){rt(e,r,i,t,n,7);let o=Number(e&BigInt(4294967295));t[n+7]=o,o=o>>8,t[n+6]=o,o=o>>8,t[n+5]=o,o=o>>8,t[n+4]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=s,s=s>>8,t[n+2]=s,s=s>>8,t[n+1]=s,s=s>>8,t[n]=s,n+8}h.prototype.writeBigUInt64LE=ae(function(e,n=0){return Qn(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))});h.prototype.writeBigUInt64BE=ae(function(e,n=0){return Zn(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))});h.prototype.writeIntLE=function(e,n,r,i){if(e=+e,n=n>>>0,!i){let l=Math.pow(2,8*r-1);S(this,e,n,r,l-1,-l)}let o=0,s=1,a=0;this[n]=e&255;while(++o<r&&(s*=256)){if(e<0&&a===0&&this[n+o-1]!==0)a=1;this[n+o]=(e/s>>0)-a&255}return n+r};h.prototype.writeIntBE=function(e,n,r,i){if(e=+e,n=n>>>0,!i){let l=Math.pow(2,8*r-1);S(this,e,n,r,l-1,-l)}let o=r-1,s=1,a=0;this[n+o]=e&255;while(--o>=0&&(s*=256)){if(e<0&&a===0&&this[n+o+1]!==0)a=1;this[n+o]=(e/s>>0)-a&255}return n+r};h.prototype.writeInt8=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,1,127,-128);if(e<0)e=255+e+1;return this[n]=e&255,n+1};h.prototype.writeInt16LE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,2,32767,-32768);return this[n]=e&255,this[n+1]=e>>>8,n+2};h.prototype.writeInt16BE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,2,32767,-32768);return this[n]=e>>>8,this[n+1]=e&255,n+2};h.prototype.writeInt32LE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,4,2147483647,-2147483648);return this[n]=e&255,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24,n+4};h.prototype.writeInt32BE=function(e,n,r){if(e=+e,n=n>>>0,!r)S(this,e,n,4,2147483647,-2147483648);if(e<0)e=4294967295+e+1;return this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};h.prototype.writeBigInt64LE=ae(function(e,n=0){return Qn(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});h.prototype.writeBigInt64BE=ae(function(e,n=0){return Zn(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function et(t,e,n,r,i,o){if(n+r>t.length)throw RangeError("Index out of range");if(n<0)throw RangeError("Index out of range")}function nt(t,e,n,r,i){if(e=+e,n=n>>>0,!i)et(t,e,n,4,340282346638528860000000000000000000000,-340282346638528860000000000000000000000);return ue.write(t,e,n,r,23,4),n+4}h.prototype.writeFloatLE=function(e,n,r){return nt(this,e,n,!0,r)};h.prototype.writeFloatBE=function(e,n,r){return nt(this,e,n,!1,r)};function tt(t,e,n,r,i){if(e=+e,n=n>>>0,!i)et(t,e,n,8,179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,-179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);return ue.write(t,e,n,r,52,8),n+8}h.prototype.writeDoubleLE=function(e,n,r){return tt(this,e,n,!0,r)};h.prototype.writeDoubleBE=function(e,n,r){return tt(this,e,n,!1,r)};h.prototype.copy=function(e,n,r,i){if(!h.isBuffer(e))throw TypeError("argument should be a Buffer");if(!r)r=0;if(!i&&i!==0)i=this.length;if(n>=e.length)n=e.length;if(!n)n=0;if(i>0&&i<r)i=r;if(i===r)return 0;if(e.length===0||this.length===0)return 0;if(n<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(i<0)throw RangeError("sourceEnd out of bounds");if(i>this.length)i=this.length;if(e.length-n<i-r)i=e.length-n+r;let o=i-r;if(this===e&&typeof Uint8Array.prototype.copyWithin==="function")this.copyWithin(n,r,i);else Uint8Array.prototype.set.call(e,this.subarray(r,i),n);return o};h.prototype.fill=function(e,n,r,i){if(typeof e==="string"){if(typeof n==="string")i=n,n=0,r=this.length;else if(typeof r==="string")i=r,r=this.length;if(i!==void 0&&typeof i!=="string")throw TypeError("encoding must be a string");if(typeof i==="string"&&!h.isEncoding(i))throw TypeError("Unknown encoding: "+i);if(e.length===1){let s=e.charCodeAt(0);if(i==="utf8"&&s<128||i==="latin1")e=s}}else if(typeof e==="number")e=e&255;else if(typeof e==="boolean")e=Number(e);if(n<0||this.length<n||this.length<r)throw RangeError("Out of range index");if(r<=n)return this;if(n=n>>>0,r=r===void 0?this.length:r>>>0,!e)e=0;let o;if(typeof e==="number")for(o=n;o<r;++o)this[o]=e;else{let s=h.isBuffer(e)?e:h.from(e,i),a=s.length;if(a===0)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(o=0;o<r-n;++o)this[o+n]=s[o%a]}return this};var he={};function nn(t,e,n){he[t]=class extends n{constructor(){super();Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(i){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:i,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}nn("ERR_BUFFER_OUT_OF_BOUNDS",function(t){if(t)return`${t} is outside of buffer bounds`;return"Attempt to access memory outside buffer bounds"},RangeError);nn("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError);nn("ERR_OUT_OF_RANGE",function(t,e,n){let r=`The value of "${t}" is out of range.`,i=n;if(Number.isInteger(n)&&Math.abs(n)>4294967296)i=zn(String(n));else if(typeof n==="bigint"){if(i=String(n),n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))i=zn(i);i+="n"}return r+=` It must be ${e}. Received ${i}`,r},RangeError);function zn(t){let e="",n=t.length,r=t[0]==="-"?1:0;for(;n>=r+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function kr(t,e,n){if(fe(e,"offset"),t[e]===void 0||t[e+n]===void 0)_e(e,t.length-(n+1))}function rt(t,e,n,r,i,o){if(t>n||t<e){let s=typeof e==="bigint"?"n":"",a;if(o>3)if(e===0||e===BigInt(0))a=`>= 0${s} and < 2${s} ** ${(o+1)*8}${s}`;else a=`>= -(2${s} ** ${(o+1)*8-1}${s}) and < 2 ** ${(o+1)*8-1}${s}`;else a=`>= ${e}${s} and <= ${n}${s}`;throw new he.ERR_OUT_OF_RANGE("value",a,t)}kr(r,i,o)}function fe(t,e){if(typeof t!=="number")throw new he.ERR_INVALID_ARG_TYPE(e,"number",t)}function _e(t,e,n){if(Math.floor(t)!==t)throw fe(t,n),new he.ERR_OUT_OF_RANGE(n||"offset","an integer",t);if(e<0)throw new he.ERR_BUFFER_OUT_OF_BOUNDS;throw new he.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}var Ar=/[^+/0-9A-Za-z-_]/g;function Br(t){if(t=t.split("=")[0],t=t.trim().replace(Ar,""),t.length<2)return"";while(t.length%4!==0)t=t+"=";return t}function Qe(t,e){e=e||1/0;let n,r=t.length,i=null,o=[];for(let s=0;s<r;++s){if(n=t.charCodeAt(s),n>55295&&n<57344){if(!i){if(n>56319){if((e-=3)>-1)o.push(239,191,189);continue}else if(s+1===r){if((e-=3)>-1)o.push(239,191,189);continue}i=n;continue}if(n<56320){if((e-=3)>-1)o.push(239,191,189);i=n;continue}n=(i-55296<<10|n-56320)+65536}else if(i){if((e-=3)>-1)o.push(239,191,189)}if(i=null,n<128){if((e-=1)<0)break;o.push(n)}else if(n<2048){if((e-=2)<0)break;o.push(n>>6|192,n&63|128)}else if(n<65536){if((e-=3)<0)break;o.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((e-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw Error("Invalid code point")}return o}function Ir(t){let e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n)&255);return e}function Mr(t,e){let n,r,i,o=[];for(let s=0;s<t.length;++s){if((e-=2)<0)break;n=t.charCodeAt(s),r=n>>8,i=n%256,o.push(i),o.push(r)}return o}function it(t){return Xe.toByteArray(Br(t))}function Se(t,e,n,r){let i;for(i=0;i<r;++i){if(i+n>=e.length||i>=t.length)break;e[i+n]=t[i]}return i}function X(t,e){return t instanceof e||t!=null&&t.constructor!=null&&t.constructor.name!=null&&t.constructor.name===e.name}function tn(t){return t!==t}var Sr=function(){let e=Array(256);for(let n=0;n<16;++n){let r=n*16;for(let i=0;i<16;++i)e[r+i]="0123456789abcdef"[n]+"0123456789abcdef"[i]}return e}();function ae(t){return typeof BigInt>"u"?Pr:t}function Pr(){throw Error("BigInt not supported")}var rn={"/packages/geometry/butterfly.ts":`import { createHash } from 'node:crypto'
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
          "body": "Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 12° above the table.",
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
          "body": "Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands.",
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
          "body": "Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 12° к столу.",
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
          "body": "Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "trim_reference": {
      "url": "https://www.nasa.gov/pdf/205703main_Delta_Wing_Glider.pdf",
      "source": "NASA · Delta Wing Glider"
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
          "body": "Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 16° above the table.",
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
          "body": "Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands.",
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
          "body": "Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 16° к столу.",
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
          "body": "Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "trim_reference": {
      "url": "https://www.nasa.gov/pdf/205703main_Delta_Wing_Glider.pdf",
      "source": "NASA · Delta Wing Glider"
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
          "body": "Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 10° above the table.",
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
          "body": "Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands.",
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
          "body": "Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 10° к столу.",
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
          "body": "Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки.",
          "diagram": "/assets/field-guide/launch.svg"
        }
      ]
    },
    "trim_reference": {
      "url": "https://www.nasa.gov/pdf/205703main_Delta_Wing_Glider.pdf",
      "source": "NASA · Delta Wing Glider"
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
`},me=new Map,on,at=(t)=>new URL(t,import.meta.url);function st(t,e){if(!me.has(t)){let n=fetch(at(e)).then(async(r)=>{if(!r.ok)throw Error("Cannot load print resource "+e);let i=q.from(await r.arrayBuffer());return me.set(t,i),i}).catch((r)=>{throw me.delete(t),r});me.set(t,n)}return me.get(t)}async function Tr(){if(globalThis.jspdf)return;on??=new Promise((t,e)=>{let n=document.createElement("script");n.src=at("assets/planes/vendor/jspdf.js"),n.onload=t,n.onerror=()=>{on=void 0,e(Error("Unable to load the PDF tools."))},document.head.append(n)}),await on}async function ct(t,e){let n=[];if(e.includes("pdf"))n.push(Tr(),st("/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","assets/planes/vendor/DejaVuSans.ttf"));if(t&&e.includes("illustrated_guide")){let r=[t.photo.local_path,...t.en.steps.map((i)=>i.diagram)].filter(Boolean);for(let i of new Set(r))n.push(st("/apps/editor"+i,i.slice(1)))}await Promise.all(n)}function C(t,e){let n=t.pathname;if(Object.hasOwn(rn,n))return e==="utf8"?rn[n]:q.from(rn[n]);let r=me.get(n);if(!q.isBuffer(r))throw Error("Unavailable print resource "+n);return e==="utf8"?r.toString("utf8"):r}var L=JSON.parse(C(new URL("../../designs/butterfly-001/model.json","https://print.invalid/packages/geometry/butterfly.ts"),"utf8")),K=(t)=>Un("sha256").update(t).digest("hex");function lt(t){return JSON.stringify(t,(e,n)=>{if(n&&typeof n==="object"&&!Array.isArray(n))return Object.fromEntries(Object.keys(n).sort().map((r)=>[r,n[r]]));return n})}var sn="butterfly-b1-"+K(C(new URL("https://print.invalid/packages/geometry/butterfly.ts"))).slice(0,16),A=(t)=>Math.round(t*1000)/1000;function dt(t,e,n,r){return{design_id:t,revision_id:e,generator_revision:sn,model:L,parameters:{span_mm:n},appearance_id:r,units:"mm"}}function pt(t){let e=[[0,0]],[n,r]=L.half_outline_start,i=t/(2*L.half_span_mm);for(let[s,a,l,c,d,p]of L.half_outline_segments){for(let f=1;f<=16;f++){let u=f/16,g=1-u,m=(y,b,I,v)=>g**3*y+3*g*g*u*b+3*g*u*u*I+u**3*v;e.push([A(i*m(n,s,l,d)),A(m(r,a,c,p))])}[n,r]=[d,p]}let o=e.slice(1,-1).reverse().map(([s,a])=>[-s,a]);return[...e,...o]}function ht(t){let e=pt(t),n=0;return e.forEach(([r,i],o)=>{let[s,a]=e[(o+1)%e.length];n+=r*a-s*i}),{span_mm:t,planform_area_mm2:A(Math.abs(n)/2),classification:"computed_geometry"}}var vr={blank:["#ffffff"],meadow:["#d5e8d9","#408a78","#f2d8a1"],apricot:["#fae1cc","#bb695e","#f5bb77"]};function an(t,e,n,r){let i=t/(2*L.half_span_mm),o=([c,d])=>[A(n+c),A(r+d)],s=vr[e],a=[{id:"cut",points:pt(t).map(o),closed:!0,fill:s[0],stroke:"#20382f",weight:0.44}],l=[];for(let c of[-1,1]){let d=(u,g)=>o([c*i*u,g]);if(e!=="blank")for(let[u,g]of[[[10,22],[33,15],[61,9],[73,11],[55,23],[26,33],[13,33]],[[15,42],[36,30],[69,19],[76,21],[72,30],[53,41],[32,47]],[[14,57],[33,57],[54,64],[59,72],[51,80],[35,76],[21,65]]].entries())a.push({id:"patch-"+c+"-"+u,points:g.map(([m,y])=>d(m,y)),closed:!0,fill:s[u===1?2:1]});let[p,f]=L.root_fold_y_mm;a.push({id:"fold-"+c,points:[d(L.root_x_mm,p),d(L.root_x_mm,f)],stroke:"#35423b",weight:0.35,dash:[2,1.4]}),a.push({id:"trim-"+c,points:L.trim_segment_mm.map(([u,g])=>d(u,g)),stroke:"#35423b",weight:0.32,dash:[0.7,1]})}for(let[c,d]of Object.entries(L.clip_stations_mm_from_nose))a.push({id:"clip-"+c,points:[o([-3,d]),o([3,d])],stroke:"#20382f",weight:0.35}),l.push({x:n+10*i,y:r+d+3.5,text:c,size:3,color:"#152d22"});return{lines:a,labels:l}}function Rr(t,e,n){let[r,i,o,s,a,l]=e,c=1-n;return[c**3*t[0]+3*c**2*n*r+3*c*n**2*o+n**3*a,c**3*t[1]+3*c**2*n*i+3*c*n**2*s+n**3*l]}function te(t,e){let n=[t];for(let r of e){let i=n.at(-1);for(let o=1;o<=14;o++)n.push(Rr(i,r,o/14))}return n}function ut(t){let e=[0];for(let n=1;n<t.length;n++)e.push(e[n-1]+Math.hypot(t[n][0]-t[n-1][0],t[n][1]-t[n-1][1]));return{points:t,distance:e,length:e.at(-1)}}function O(t,e,n){return t+(e-t)*n}function cn(t,e,n){return[O(t[0],e[0],n),O(t[1],e[1],n)]}function Cr(t,e){let n=Math.max(0,Math.min(1,e))*t.length,r=t.distance.length-1,i=0;while(r-i>1){let o=Math.floor((i+r)/2);if(n>t.distance[o])i=o;else r=o}return cn(t.points[i],t.points[r],(n-t.distance[i])/(t.distance[r]-t.distance[i]))}function P(t,e){return Array.from({length:t+1},(n,r)=>e(r/t))}function Pe(t){let e=t.geometry,n=te([e.root_x,e.fore_root_y],e.fore_edge),r=te(n.at(-1),e.hind_edge),i=te([0,e.nose_y],[[2.4,e.nose_y,3.8,e.nose_y+1,4.6,e.nose_y+3.6],[5.2,e.nose_y+6.5,e.root_x-0.3,e.fore_root_y-4,e.root_x,e.fore_root_y]]),o=te(r.at(-1),[[e.root_x-0.4,e.hind_root_y+5,3,e.abdomen_y,0,e.abdomen_y]]),s=[...i,...n.slice(1),...r.slice(1),...o.slice(1)],a=[...s,...s.slice(1,-1).reverse().map(([c,d])=>[-c,d])],l=t.species==="swallowtail"?te(n.at(-1),[...e.hind_edge.slice(0,4),[57,73,55,74,51,74],...e.hind_edge.slice(7)]):r;return{outline:a,fore:ut(n),hind:ut(l),trailing:r}}function N(t,e,n=1){let r=t[0]*n;return[r===0?0:Math.sign(r)*A(Math.abs(r)*e/200),A(t[1])]}function Lr(t,e){let n=[];for(let r=1;r<t.length;r++){let[i,o]=t[r-1],[s,a]=t[r];if(i!==s&&e>=Math.min(i,s)&&e<=Math.max(i,s))n.push(O(o,a,(e-i)/(s-i)))}if(!n.length)throw Error("Trim station is outside the trailing edge");return[e,Math.max(...n)]}function ln(t,e){let[n,r]=t.geometry.tab_x.map((a)=>Lr(e,a)),i=t.geometry.tab_depth_mm,o=[[n[0],n[1]-i],[r[0],r[1]-i]];return{hinges:o,ends:[n,r],fromHinge:(a,l)=>{let c=cn(o[0],o[1],a);return[c[0],c[1]+l]}}}function Or(t,e,n){return(r,i)=>{let[o,s]=cn(e,Cr(t,r),i),a=n?(1-r)/0.1:r/0.38;return[o,s+11.5*Math.exp(-(a**2))*Math.sin(Math.PI*i)]}}function be(t,e,n,r,i,o=40){let s=(l)=>P(o,(c)=>{let d=O(e,n,c);return t(d,l(d))}),a=(l,c,d)=>P(10,(p)=>t(l,O(c,d,p))).slice(1,-1);return[...s(r),...a(n,r(n),i(n)),...s(i).reverse(),...a(e,i(e),r(e))]}var dn=(t)=>(e)=>t;function J(t,e,n,r,i,o=0){return P(20,(s)=>{let a=s*Math.PI*2,l=Math.cos(a),c=Math.sin(a);return t(e+r*l+o*c,n+i*c)})}function Fe(t,e,n,r){return P(26,(i)=>[t+n*Math.cos(i*2*Math.PI),e+r*Math.sin(i*2*Math.PI)])}function ge(t,e,n,r,i,o=0){return P(18,(s)=>t(O(e,n,s)+o*Math.sin(Math.PI*s),O(r,i,s)))}function re(t,e,n){let r="#";for(let i=1;i<7;i+=2){let o=O(parseInt(t.slice(i,i+2),16),parseInt(e.slice(i,i+2),16),n);r+=Math.round(o).toString(16).padStart(2,"0")}return r.toUpperCase()}function pn(t,e){let n=1;while(n<t.length-1&&e>t[n][0])n++;let[r,i]=t[n-1],[o,s]=t[n];return re(i,s,Math.max(0,Math.min(1,(e-r)/(o-r))))}function Dr(t,e,n,r,i){let o=e?(c)=>0.93-0.15*Math.exp(-((c-0.55)**2)/0.026)-0.04*Math.sin(Math.PI*c):(c)=>0.9-0.055*Math.sin(Math.PI*c);if(i("ground",be(t,0,1,dn(0.01),o),n.base,r?n.ink:void 0,0.34),!r){let c=[[0,re(n.mid,n.shade,0.3)],[0.28,n.mid],[0.53,n.base],[0.82,n.sun],[1,re(n.sun,n.base,0.45)]];for(let d=0;d<16;d++){let p=(f)=>(u)=>o(u)*(f+0.035*Math.sin(Math.PI*f)*Math.sin(5*u));i("amber-scale-layer-"+d,be(t,0,1,p(d/16),p(Math.min(1,(d+1.05)/16))),pn(c,(d+0.5)/16))}for(let d=0;d<10;d++)for(let p=0;p<4;p++){let f=0.19+d*0.078+0.009*Math.sin(d+p),u=0.27+p*0.124+0.037*Math.sin(d*1.73+p);i("pollen-glint-"+d+"-"+p,J(t,f,u,0.0045,0.012,0.001),re(n.gleam,n.sun,0.5+0.2*Math.sin(d+p)))}}let s=(c,d,p)=>i(c,d,void 0,n.ink,r?0.32:p),a=(c,d,p,f,u)=>{s(c,ge(t,d,f,p,o(f)+0.006,0.006),u)};if(e){s("upper-main-vein",P(30,(f)=>t(0.319,f*(o(0.319)+0.008))),0.81),s("lower-main-vein",P(30,(f)=>t(0.735,f*(o(0.735)+0.008))),0.95);let p=(f)=>[O(0.319,0.735,f),0.49+0.11*Math.sin(Math.PI*f)];s("discal-crossvein",P(32,(f)=>t(...p(f))),0.64);for(let[f,u]of[0.12,0.36,0.61,0.84].entries()){let[g,m]=p(u);a("secondary-"+f,g,m,0.39+0.085*f,0.67)}for(let[f,u]of[0.55,0.35,0.16].entries())a("lower-fork-"+f,0.735,u,0.81+0.066*f,0.72)}else for(let c=0;c<8;c++){let d=0.16+c*0.111;s("hind-vein-"+c,ge(t,d*0.48+0.18,d,0,o(d)+0.006,-0.038),c%3===0?0.78:0.63)}let l=e?19:17;for(let c=0;c<l;c++){let d=(e?0.33:0.1)+c*(e?0.034:0.049),p=o(d),f=0.0085+0.002*Math.sin(c*1.1);if(i("milkspot-"+c,J(t,d,p+(1-p)*0.64,f,Math.min(0.02,(1-p)*0.19)),n.spot,r?n.ink:void 0,0.2),c>0&&c<l-1)i("milkspot-inner-"+c,J(t,d+0.006,p+(1-p)*0.29,f*0.9,Math.min(0.019,(1-p)*0.19)),c%4===0?n.gleam:n.spot,r?n.ink:void 0,0.2)}if(e)for(let c=0;c<4;c++){let d=0.406+c*0.046;i("apical-window-"+c,J(t,d,o(d)-0.014,0.011,0.032,0.002),c%2?n.spot:n.gleam,r?n.ink:void 0,0.25)}}function Nr(t,e,n,r,i){let o=(a)=>0.94-0.06*Math.sin(Math.PI*a)-(e?0.045*Math.exp(-((a-0.52)**2)/0.018):0);if(i("ground",be(t,0,1,dn(0.01),o),n.shade,r?n.ink:void 0,0.34),!r){let a=[[0,n.shade],[0.18,n.base],[0.39,n.sun],[0.56,re(n.gleam,n.sun,0.45)],[0.71,n.sun],[0.84,n.mid],[1,n.base]],l=(c)=>(d)=>o(d)*(c+0.11*Math.sin(Math.PI*c)*Math.sin(4.8*d+(e?0.1:1)));for(let c=0;c<28;c++)i("structural-blue-"+c,be(t,0,1,l(c/28),l(Math.min(1,(c+1.08)/28))),pn(a,(c+0.5)/28));for(let c=0;c<12;c++)for(let d=0;d<5;d++){let p=0.15+c*0.066+0.009*Math.cos(d*2),f=0.23+d*0.12+0.035*Math.cos(c*1.7);i("scale-"+c+"-"+d,P(4,(u)=>t(p+0.01*u,f+0.006*Math.sin(u*Math.PI))),void 0,re(d%2?n.gleam:n.base,n.sun,0.45),0.19)}}let s=(a)=>[0.335+0.311*a,0.48+0.055*Math.sin(Math.PI*a)];for(let a=0;a<9;a++){let l=0.18+a*0.093,[c,d]=e&&a>=2&&a<=5?s((a-2)/3):[l*0.79+0.065,0.012];if(!r)i("vein-sheen-"+a,ge(t,c+0.004,l+0.005,d,o(l),-0.025),void 0,n.gleam,0.24);i("vein-"+a,ge(t,c,l,d,o(l)+0.007,-0.025),void 0,r?n.ink:n.shade,r?0.3:0.42)}if(e){i("discal-crossvein",P(20,(a)=>t(...s(a))),void 0,r?n.ink:n.shade,0.46);for(let a of[0,1]){let[l,c]=s(a);i("discal-rail-"+a,ge(t,l*0.67+0.08,l,0.012,c,0.007),void 0,r?n.ink:n.shade,0.43)}for(let a=0;a<5;a++){let l=0.39+a*0.039;i("ivory-apex-"+a,J(t,l,o(l)+0.045,0.008,0.013),n.spot,r?n.ink:void 0,0.22)}}else for(let a=0;a<9;a++){let l=0.22+a*0.075;i("edge-scale-"+a,J(t,l,o(l)+0.019,0.009,0.01),r?n.spot:n.mid,r?n.ink:void 0,0.22)}}function Ur(t,e,n,r,i){let o=(a)=>e?0.91-0.1*Math.exp(-((a-0.58)**2)/0.055):0.78-0.065*Math.sin(Math.PI*a);if(i("ground",be(t,0,1,dn(0.01),o),n.base,r?n.ink:void 0,0.34),!r){let a=[[0,n.mid],[0.29,n.gleam],[0.62,n.sun],[1,n.base]];for(let l=0;l<15;l++){let c=(d)=>(p)=>o(p)*(d+0.09*Math.sin(d*Math.PI)*Math.sin(5*p));i("butter-scales-"+l,be(t,0,1,c(l/15),c(Math.min(1,(l+1.05)/15))),pn(a,(l+0.5)/15))}for(let l=0;l<11;l++)for(let c=0;c<4;c++){let d=0.16+0.069*l+0.012*Math.sin(c+l),p=0.24+0.128*c+0.029*Math.cos(l*1.7+c);i("dusting-"+l+"-"+c,J(t,d,p,0.004,0.008),re(n.gleam,n.base,0.35))}}if(e)for(let[a,[l,c,d]]of[[0.24,0.51,0.6],[0.34,0.6,0.65],[0.44,0.68,0.71]].entries()){let p=P(25,(u)=>t(O(l,d,u),O(0.96,c,u)-0.067*Math.sin(u*Math.PI))),f=P(25,(u)=>t(O(d,l-0.066,u),O(c,0.97,u)+0.035*Math.sin(u*Math.PI)));i("tiger-bar-"+a,[...p,...f],r?"#FFFFFF":n.ink,r?n.ink:void 0,0.32)}for(let a=0;a<(e?7:8);a++){let l=0.24+a*(e?0.105:0.095);i("vein-"+a,ge(t,l*0.67+0.07,l,0.012,o(l)+0.005,0.013),void 0,n.ink,r?0.3:e?0.52:0.72)}let s=e?10:9;for(let a=0;a<s;a++){let l=(e?0.415:0.175)+a*(e?0.055:0.081),c=o(l),d=(p,f,u)=>[...P(14,(g)=>t(l+f*(g-0.5),p+u*Math.sin(Math.PI*g))),...P(14,(g)=>t(l+f*(0.5-g),p+u*0.16*Math.sin(Math.PI*g)-0.006))];if(i("crescent-"+a,d(c+(1-c)*(e?0.45:0.34),e?0.038:0.056,e?0.041:0.059),e?n.gleam:n.spot,r?n.ink:void 0,0.24),!e)i("yellow-moon-"+a,d(c+(1-c)*0.74,0.05,0.034),n.sun,r?n.ink:void 0,0.22)}if(!e)i("red-eyespot-rim",J(t,0.84,0.735,0.043,0.073),n.ink),i("red-eyespot",J(t,0.84,0.735,0.029,0.05),n.blush,r?n.ink:void 0,0.22),i("eyespot-glint",J(t,0.832,0.721,0.012,0.011),n.gleam)}function ft(t,e,n,r){let i=t.palettes[e];if(!i)throw Error("Unknown workshop appearance");let o=e==="coloring",s=[{id:"silhouette",points:r.outline.map((u)=>N(u,n)),closed:!0,fill:o?"#FFFFFF":i.ink,stroke:i.ink,weight:0.44}],a={monarch:Dr,morpho:Nr,swallowtail:Ur};for(let u of[-1,1])for(let g of["hind","fore"]){let m=g==="fore",y=m?t.geometry.fore_origin:t.geometry.hind_origin,b=Or(r[g],y,m),I=(v,we,k,R,j=0)=>{s.push({id:(u<0?"left-":"right-")+g+"-"+v,points:we.map((de)=>N(de,n,u)),closed:!!k,fill:k,stroke:R,weight:j})};a[t.species](b,m,i,o,I)}let l=t.geometry,c=l.fore_root_y+5,d=(u,g,m,y,b=0)=>{s.push({id:u,points:g.map((I)=>N(I,n)),closed:!!m,fill:m,stroke:y,weight:b})},p=o?"#FFFFFF":re(i.ink,"#000000",0.22),f=te([0,c],[[5.5,c+3,5.3,l.hind_root_y+2,0,l.abdomen_y-2],[-5.3,l.hind_root_y+2,-5.5,c+3,0,c]]);d("abdomen",f,p,i.ink,0.37);for(let u=0;u<5;u++){let g=c+10+u*5,m=3.6-u*0.42;d("abdomen-segment-"+u,te([-m,g],[[-0.7,g+0.9,0.7,g+0.9,m,g]]),void 0,o?i.ink:re(i.ink,i.sun,0.62),0.48)}d("thorax",Fe(0,c,4.3,7.6),p,i.ink,0.35),d("head",Fe(0,c-8.8,3.6,3.65),p,i.ink,0.35);for(let u of[-1,1]){let g=(m)=>[m[0]*u,m[1]];if(d("antenna-"+u,te([1.55,c-11],[[3,c-14,4.4,l.nose_y+9,3.7,l.nose_y+5]]).map(g),void 0,o?i.ink:i.sun,0.52),d("antenna-club-"+u,Fe(u*3.7,l.nose_y+5,0.62,1.55),o?i.ink:i.sun),d("thorax-stripe-"+u,te([u*1.8,c-4.8],[[u*3.1,c-1.7,u*2.5,c+3,u*1.2,c+5.1]]),void 0,o?i.ink:i.sun,0.58),d("eye-"+u,Fe(u*2.3,c-9.1,0.62,0.83),o?i.ink:i.spot),t.species==="monarch")for(let[m,[y,b]]of[[2.6,-5.7],[3,-2.2],[2.8,1.8],[2.1,4.8]].entries())d("thorax-milkspot-"+u+"-"+m,Fe(u*y,c+b,0.38,0.54),o?i.ink:i.spot)}return s}var hn=(t,e,n,r,i,o)=>({name:t,unit:e,minimum:n,maximum:r,step:i,description:o}),Hr=[hn("span_mm","mm",148,184,2,"Width between the two cut wingtips. Chord and body length stay fixed."),hn("left_trim_deg","degrees",-12,12,2,"Left trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail."),hn("right_trim_deg","degrees",-12,12,2,"Right trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail.")],Wr=[{appearance_id:"natural",title:"Field colors",ink_usage:"full",description:"Colors and markings inspired by the real butterfly."},{appearance_id:"carnival",title:"Carnival",ink_usage:"full",description:"Candy-bright wings with a contrasting accent."},{appearance_id:"twilight",title:"Twilight",ink_usage:"full",description:"Jewel tones and luminous pale markings."},{appearance_id:"coloring",title:"Color your own",ink_usage:"low",description:"White wing cells with printable outlines to color by hand."}];function Q(t,e,n,r,i,o,s,a){return{ink:t,shade:e,base:n,mid:r,sun:i,gleam:o,spot:s,blush:a}}var jr=Q("#4D4351","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"),Gr={baseline_revision:"w1",units:"mm",parameter_definitions:Hr,appearance_id:"natural",appearances:Wr,rights:{license_expression:"CERN-OHL-W-2.0",license_url:"https://spdx.org/licenses/CERN-OHL-W-2.0.html",attribution:"Open Flight contributors. Original paper airframes under CERN-OHL-W-2.0. Wing artwork and learning text under CC BY-SA 4.0.",status:"original_with_license"}};function un({species:t,name:e,span:n,geometry:r,palettes:i}){return{...Gr,model:"butterfly-"+t,species:t,name:e,geometry:r,parameters:{span_mm:n,left_trim_deg:0,right_trim_deg:0},palettes:{...i,coloring:jr}}}var Te=[un({species:"monarch",name:"Monarch",span:172,geometry:{nose_y:9,abdomen_y:84,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.2,36.5],hind_origin:[6.2,37.6],fore_edge:[[21,21,47,13,65,8],[79,3.5,90,0.8,94,2],[98,3,100,7,100,12],[100,22,95,29,87,35],[76,43,64,47,54,50]],hind_edge:[[62,48,73,46,78,51],[83,57,75,67,67,73],[58,80,49,84,39,83],[26,83,14,73,6,69]],tab_x:[28,51],tab_depth_mm:10,clip_rear_from_nose_mm:17,target_dihedral_deg:12},palettes:{natural:Q("#23192C","#9B3625","#FF7916","#F65B1B","#FFAF29","#FFE174","#FFF6CF","#E8553D"),carnival:Q("#3C1943","#9B285D","#F04685","#F8466F","#FF9870","#FFE78F","#FFF9E0","#48D6BC"),twilight:Q("#261D49","#543469","#A86BED","#8851C6","#DE9CED","#FFD09C","#FFF1CB","#EF91B7")}}),un({species:"morpho",name:"Blue Morpho",span:160,geometry:{nose_y:8,abdomen_y:94,root_x:6,fore_root_y:25,hind_root_y:79,fore_origin:[6.3,40],hind_origin:[6.3,41.4],fore_edge:[[20,18.5,34,12,53,7],[69,2,87,0,94,5],[98,8,100,18,100,26],[100,39,93,48,80,51],[75,53,70,54.5,68,55.5]],hind_edge:[[77,54.5,85,54,89,59],[97,70,89,81,78,87],[64,95,48,100,35,96],[20,92,12,86,6,79]],tab_x:[32,57],tab_depth_mm:12,clip_rear_from_nose_mm:18,target_dihedral_deg:16},palettes:{natural:Q("#192840","#2147A1","#1558DB","#337FF7","#18BFEB","#66F4F3","#F4F5DD","#3EEDFA"),carnival:Q("#322B58","#6744AE","#8157EF","#A66DF4","#70DED8","#BAFBE3","#FFF4E5","#C9FF9E"),twilight:Q("#211F4B","#3C3989","#525AD3","#777DEF","#5AC6CB","#ADFFE0","#FEF0CA","#79EBD6")}}),un({species:"swallowtail",name:"Swallowtail",span:180,geometry:{nose_y:9.5,abdomen_y:81,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.25,36],hind_origin:[6.25,37.4],fore_edge:[[26,21,56,10,80,5],[90,2,96,0.7,100,1.5],[100,7,95,17,91,22],[88,24,88,27,86,29],[81,30,80,33,78,35],[73,36,71,39,68,41],[62,42,59,45,51,48]],hind_edge:[[63,44,76,44,80,49],[80,54,78,57,74,60],[71,59,70,62,68,65],[64,64,63,67,61,69],[60,75,59,88,56,92],[54,94,52,91,52.8,88],[54,81,53,75,51,74],[47,73,47,77,44,78],[40,76,38,81,34,81],[30,80,28,83,25,82],[17,81,10,75,6,69]],tab_x:[21,41],tab_depth_mm:9,clip_rear_from_nose_mm:17,target_dihedral_deg:10},palettes:{natural:Q("#24243C","#B98229","#FFDB3A","#F1BB32","#FFE766","#FFF6A0","#42C8D3","#FC6F44"),carnival:Q("#43233D","#BD6744","#FF8340","#FF9E52","#FFC46A","#FFE3A0","#50E3CE","#EA4B81"),twilight:Q("#271E4B","#7650AA","#BE92E8","#A479DE","#D8B5F3","#EFD7FD","#7DDBE5","#FF9E8F")}})];var $r=["workshop.ts","workshop-art.ts","workshop-models.ts"],fn="butterfly-workshop-w1-"+K(q.concat($r.map((t)=>C(new URL(t,"https://print.invalid/packages/geometry/workshop.ts"))))).slice(0,16);function mt(t,e,n,r,i){return{design_id:e,revision_id:n,generator_revision:fn,model:t,parameters:r,appearance_id:i,units:"mm",coordinates:"Nose at top. Edge control x is percent half-span. Edge control y is millimetres. Left and right are seen looking forward from the tail. Positive tab angles bend upward from their own wing."}}function gt(t,e){let n=Pe(t).outline.map((o)=>N(o,e.span_mm)),r=0;for(let o=0;o<n.length;o++){let[s,a]=n[o],[l,c]=n[(o+1)%n.length];r+=s*c-l*a}let i=Math.abs(r)/2;return{span_mm:e.span_mm,planform_area_mm2:A(i),aspect_ratio:A(e.span_mm**2/i),classification:"computed_geometry"}}function bt(t,e){return(e/2-e*t.geometry.root_x/200)*Math.sin(t.geometry.target_dihedral_deg*Math.PI/180)}function mn(t,e,n){let r=Pe(t),{hinges:i}=ln(t,r.trailing),o=(i[1][0]-i[0][0])*e/200,s=i[1][1]-i[0][1];return t.geometry.tab_depth_mm*o/Math.hypot(o,s)*Math.sin(n*Math.PI/180)}function gn(t,e,n,r=!1){let i=Pe(t),o=e.span_mm,s=ft(t,n,o,i),a=t.geometry,l=ln(t,i.trailing),c=t.palettes[n],d="#272239",p="#FFFEF4";if(!r&&(e.left_trim_deg||e.right_trim_deg)){let[u,g]=l.hinges.map((k)=>N(k,o)),m=g[0]-u[0],y=g[1]-u[1],b=Math.hypot(m,y),I=[-y/b,m/b],v=[e.left_trim_deg,e.right_trim_deg].map((k)=>1-Math.cos(k*Math.PI/180)),we=([k,R])=>{let j=Math.abs(k),de=k<0?0:1;if(!v[de]||j<u[0]||j>g[0])return[k,R];let xe=((j-u[0])*I[0]+(R-u[1])*I[1])*v[de];if(xe<=0)return[k,R];return[A(Math.sign(k)*(j-xe*I[0])),A(R-xe*I[1])]};for(let k of s)k.points=k.points.map(we)}let f=(u,g,m)=>{s.push({id:u+"-halo",points:g,stroke:"#FFFEF4",weight:1.42},{id:u,points:g,stroke:"#272239",weight:0.43,dash:m})};if(r){s.push({id:"cut",points:i.outline.map((g)=>N(g,o)),closed:!0,stroke:"#272239",weight:0.53});let u=a.nose_y+a.clip_rear_from_nose_mm;f("clip-rear",[N([-a.root_x+0.4,u],o),N([a.root_x-0.4,u],o)]),f("clip-cross",[N([0,u-2],o),N([0,u+2],o)])}for(let u of[-1,1]){let g=u<0?"left":"right",m=(b)=>N(b,o,u),y=u<0?e.left_trim_deg:e.right_trim_deg;if(r){f("root-fold-"+g,[[a.root_x,a.fore_root_y],[a.root_x,a.hind_root_y]].map((b)=>m(b)),[2.9,1.6]);for(let b=0;b<2;b++)f("tab-slit-"+g+"-"+b,[l.ends[b],l.hinges[b]].map(m));f("tab-hinge-"+g,l.hinges.map(m),[0.55,0.85])}else if(y!==0){let b=Math.abs(mn(t,o,y)),I=n==="coloring"?"#80788C":y>0?c.gleam:c.ink,v=[l.fromHinge(0.02,0.18),l.fromHinge(0.98,0.18),l.fromHinge(0.97,b+0.32),l.fromHinge(0.04,b+0.35)];s.push({id:"creased-tab-"+g,points:v.map(m),closed:!0,fill:I},{id:"tab-relief-"+g,points:l.hinges.map(m),stroke:y>0?c.ink:c.gleam,weight:0.26})}}return{lines:s,tab:l,minY:Math.min(...i.outline.map((u)=>u[1])),maxY:Math.max(...i.outline.map((u)=>u[1]))}}function bn(t,e,n){return t.map((r)=>({...r,points:r.points.map(([i,o])=>[A(e+i),A(n+o)])}))}function yt(t){return new globalThis.jspdf.jsPDF(t)}var yn={A4:[210,297],US_LETTER:[215.9,279.4]},Yr={en:["Butterfly Glider","Experimental paper glider","Print at 100% / actual size. Measure the line before cutting.","Solid outline: cut. Dashed roots: fold both wings up equally.","Dotted trim marks: leave flat for the first comparison.","Slide the same paper clip onto the nose. Align its rear end with A or B.","Try plain copier paper. Record the actual paper and clip used.","Calibration","Flat span","Source"],ru:["Планер-бабочка","Экспериментальный бумажный планер","Печатайте в масштабе 100%. Измерьте линию перед вырезанием.","Вырежьте по контуру. По штриховым линиям одинаково поднимите крылья.","Линии мелкого пунктира оставьте плоскими для первого опыта.","Наденьте скрепку на нос. Совместите её задний конец с меткой A или B.","Возьмите офисную бумагу. Запишите, какую бумагу и скрепку использовали.","Контроль масштаба","Размах развёртки","Исходник"]};function xt(t,e,n){let[r,i]=yn[e],o=Yr[n],{ref:s,parameters:a,appearance_id:l}=t,{lines:c,labels:d}=an(a.span_mm,l,r/2,54),p=(f,u,g,m,y="#23362e")=>d.push({x:f,y:u,text:g,size:m,color:y});p(14,17,"OPEN FLIGHT",3.6,"#486456"),p(14,31,o[0],8.5),p(14,40,o[1]+"  /  "+s.design_id+"  /  "+s.revision_id,3.2),p(14,165,o[8]+"  "+a.span_mm+" mm",3.7),o.slice(3,7).forEach((f,u)=>p(14,177+u*6,f,3.15)),p(14,211,o[7]+"  /  50 mm",3.6),c.push({id:"ruler",points:[[14,218],[64,218]],stroke:"#20382f",weight:0.42});for(let f=0;f<=50;f+=5)c.push({id:"tick-"+f,points:[[14+f,218],[14+f,f%10===0?214.8:216.3]],stroke:"#20382f",weight:0.32});return p(14,227,o[2],3.1),p(14,i-17,o[9]+" SHA-256",2.8),p(14,i-12,s.source_sha256,2.7),p(14,i-7,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",2.5),{width:r,height:i,lines:c,labels:d}}function zr(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ee(t){let{width:e,height:n,lines:r,labels:i}=t,o=r.map((a)=>{let l="M"+a.points.map((c)=>c.join(" ")).join(" L")+(a.closed?" Z":"");return'<path id="'+a.id+'" d="'+l+'" fill="'+(a.fill??"none")+'" stroke="'+(a.stroke??"none")+'" stroke-width="'+(a.weight??0)+'"'+(a.dash?' stroke-dasharray="'+a.dash.join(" ")+'"':"")+"/>"}),s=i.map((a)=>'<text x="'+a.x+'" y="'+a.y+'" font-size="'+a.size+'" fill="'+(a.color??"#23362e")+'">'+zr(a.text)+"</text>");return q.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+e+'mm" height="'+n+'mm" viewBox="0 0 '+e+" "+n+'" font-family="DejaVu Sans, sans-serif" stroke-linejoin="round">'+[...o,...s].join(`
`)+`</svg>
`)}function _t(t){return Ee({width:200,height:110,...an(t.parameters.span_mm,t.appearance_id,100,7)})}var Vr=new URL("../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","https://print.invalid/packages/print-export/sheets.ts"),Xr=C(new URL("../../node_modules/dejavu-fonts-ttf/LICENSE","https://print.invalid/packages/print-export/sheets.ts"),"utf8"),wt;function Ft(t){let e=new yt({unit:"mm",format:[t.width,t.height],compress:!0,putOnlyUsedFonts:!0,precision:5});e.setCreationDate("D:20000101000000+00'00'"),e.setFileId(K(JSON.stringify(t)).slice(0,32)),e.setProperties({title:"Open Flight - Butterfly Glider",author:"Open Flight contributors",subject:`Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. Embedded font notices:
`+Xr}),wt??=C(Vr).toString("base64"),e.addFileToVFS("DejaVuSans.ttf",wt),e.addFont("DejaVuSans.ttf","DejaVu","normal"),e.setFont("DejaVu","normal"),e.setLineJoin("round");for(let n of t.lines){if(n.stroke)e.setDrawColor(n.stroke);if(n.fill)e.setFillColor(n.fill);e.setLineWidth(n.weight??0),e.setLineDashPattern(n.dash??[],0);let r=n.points.map((i,o)=>({op:o?"l":"m",c:i}));if(e.path(r),n.closed)e.close();if(n.fill&&n.stroke)e.fillStroke();else if(n.fill)e.fill();else e.stroke()}for(let n of t.labels)e.setFontSize(n.size*72/25.4),e.setTextColor(n.color??"#23362e"),e.text(n.text,n.x,n.y);return q.from(e.output("arraybuffer"))}var qr={en:{lab:"BUTTERFLY WORKSHOP",names:{monarch:"Monarch",morpho:"Blue Morpho",swallowtail:"Swallowtail"},flatSpan:"flat wingspan",scale:"Measure this line",print:"Print at 100% / actual size",legend:["Cut","Wing fold","Tab fold"],heading:"Build your butterfly",step:["Cut out the shape","Lift both wings","Set each tail tab","Clip and launch"],cut:["Follow the outside edge and the","two solid slits on each rear tab.","Keep the dotted hinges attached."],fold:["Keep the middle strip flat. Raise","each tip the same distance above it."],clip:["Slide one small, blunt paper clip","onto the nose. Stop its back end","at the cross. Toss gently and level."],tabs:["Read left and right from behind.","Bend each tab from its own wing."],side:["Left","Right"],flat:"flat",up:"up",down:"down",compare:"Try five level glides with flat tabs. Change one tab, then compare five more.",materials:"Use one sheet of plain copier paper and one small paper clip. Record which ones you use.",note:"Experimental paper glider",source:"Source",mm:"mm",sideMark:["L","R"]},ru:{lab:"МАСТЕРСКАЯ БАБОЧЕК",names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},flatSpan:"размах развёртки",scale:"Измерь эту линию",print:"Печать в масштабе 100%",legend:["Разрез","Сгиб крыла","Сгиб закрылка"],heading:"Собери свою бабочку",step:["Вырежи контур","Подними крылья","Отогни закрылки","Закрепи и запусти"],cut:["Вырежи бабочку по контуру.","Сделай по два надреза на закрылках.","Сохрани сгиб из мелких штрихов."],fold:["Оставь центр плоским. Подними","обе законцовки на одну высоту."],clip:["Надень на нос небольшую скрепку","с тупым концом. Совмести её задний","край с крестиком. Легко брось прямо."],tabs:["Смотри на бабочку сзади.","Отгибай закрылок от плоскости крыла."],side:["Левый","Правый"],flat:"ровно",up:"вверх",down:"вниз",compare:"Сделай пять запусков с плоскими закрылками. Отогни один и сравни ещё пять полётов.",materials:"Возьми лист обычной офисной бумаги и небольшую скрепку. Запиши, какие именно.",note:"Экспериментальный планер",source:"Исходник",mm:"мм",sideMark:["Л","П"]}},Kr={monarch:"Danaus plexippus",morpho:"Morpho peleides",swallowtail:"Papilio machaon"},T="#252339",W="#525767",ke="#345C58",Jr="#FFFEF6";function ve(t,e,n,r){return Array.from({length:27},(i,o)=>{let s=2*Math.PI*o/26;return[A(t+Math.cos(s)*n),A(e+Math.sin(s)*r)]})}function Qr(t,e){let n=String(Math.round(t*10)/10);return e==="ru"?n.replace(".",","):n}function Et(t,e,n){let r=gn(t,e,n),i=1.75,o=e.span_mm+3.5,s=A(r.maxY-r.minY+3.5);return Ee({width:o,height:s,lines:bn(r.lines,o/2,1.75-r.minY),labels:[]})}function kt(t,e,n,r){let[i,o]=yn[n],s=qr[r],a=t.geometry,{parameters:l,appearance_id:c,ref:d}=e,p=gn(t,l,c,!0),f=45-p.minY,u=bn(p.lines,i/2,f),g=[],m=(w,x,_=T,z=0.4,U)=>u.push({id:w,points:x,stroke:_,weight:z,dash:U}),y=(w,x,_,z,U=0.28)=>u.push({id:w,points:x,closed:!0,fill:_,stroke:z,weight:U}),b=(w,x,_,z=3.1,U=T)=>g.push({x:w,y:x,text:_,size:z,color:U}),I=(w,x,_,z=4.9)=>_.forEach((U,ce)=>b(w,x+ce*z,U,3.05)),v=(w,x,_)=>{y("number-ring-"+w,ve(x+2.6,_-1.3,2.65,2.65),T),b(x+1.71,_-0.23,String(w+1),2.9,"#FFFFFF"),b(x+7.3,_,s.step[w],4.05)},we=t.palettes[c].sun,k=c==="coloring"?T:t.palettes.natural.shade;b(13,12.8,"OPEN FLIGHT",3.35,T),m("brand-divider",[[39,10],[39,13]],W,0.28),b(42,12.8,s.lab,2.8,W),b(12.6,27.1,s.names[t.species],8),b(13,35,Kr[t.species]+"   /   "+l.span_mm+" "+s.mm+" "+s.flatSpan,3.3,W);let R=i-64;b(R,14.3,s.scale+"  ·  50 "+s.mm,3.1),m("ruler",[[R,23.5],[R+50,23.5]],T,0.5);for(let w=0;w<=50;w+=5)m("ruler-tick-"+w,[[R+w,23.5],[R+w,w%10===0?19.6:21.5]],T,0.34);b(R,31.1,s.print,2.95,W),m("masthead-rule",[[13,39.3],[i-13,39.3]],"#C1C8C4",0.28);for(let[w,x]of[-1,1].entries()){let[_,z]=p.tab.fromHinge(0.5,a.tab_depth_mm*0.48),U=i/2+x*_*l.span_mm/200,ce=f+z;y("tab-badge-"+w,ve(U,ce,1.9,1.9),Jr),b(U-0.92,ce+0.95,s.sideMark[w],2.65)}let j=150,de=[13,77,i-72],xe=[void 0,[2.9,1.6],[0.55,0.85]];de.forEach((w,x)=>{m("legend-"+x,[[w,j-1],[w+9.5,j-1]],T,0.55,xe[x]),b(w+12,j,s.legend[x],3.15)}),m("instruction-rule",[[13,154.8],[i-13,154.8]],"#B7C1BF",0.35),b(13,163.3,s.heading,5.5);let pe=i/2+3;v(0,13,172.4),I(13,179,s.cut),m("diagram-tab-trailing",[[16,196.2],[46,196.2]],T,0.42),m("diagram-tab-slit-one",[[21,196.2],[21,192.2]],T,0.52),m("diagram-tab-slit-two",[[39.5,196.2],[39.5,192.2]],T,0.52),m("diagram-tab-fold",[[21,192.2],[39.5,192.2]],ke,0.48,[0.55,0.85]),v(1,pe,172.4);let Ct=a.target_dihedral_deg*Math.PI/180,G=pe+27,Y=183.5,ee=17,We=ee*Math.tan(Ct);m("front-view-datum",[[G-3.2-ee,Y],[G+3.2+ee,Y]],W,0.25,[1,1]),m("front-view-fold",[[G-3.2-ee,Y-We],[G-3.2,Y],[G+3.2,Y],[G+3.2+ee,Y-We]],k,0.9),m("front-view-rise",[[G+5.2+ee,Y-We],[G+5.2+ee,Y]],T,0.32),b(G+8+ee,Y-1.2,a.target_dihedral_deg+"°",3.3),b(G+8+ee,Y+3.9,"≈ "+Math.round(bt(t,l.span_mm))+" "+s.mm,3.1,ke),I(pe,189.8,s.fold),m("row-rule",[[13,199],[i-13,199]],"#D1D7D1",0.27),v(2,13,208);for(let[w,x]of[l.left_trim_deg,l.right_trim_deg].entries()){let _=13+w*42,ce=x*Math.PI/180,Ot=[_+3+20*Math.cos(ce),220-20*Math.sin(ce)];m("gauge-neutral-"+w,[[_,220],[_+26,220]],W,0.31,[1.3,1]),m("gauge-tab-"+w,[[_+3,220],Ot],k,0.55),y("gauge-hinge-"+w,ve(_+3,220,0.75,0.75),T),b(_,215,s.side[w]+"  "+(x>0?"+":"")+x+"°",3.05);let Dt=Math.abs(mn(t,l.span_mm,x)),Nt=x===0?s.flat:Qr(Dt,r)+" "+s.mm+" "+(x>0?s.up:s.down);b(_,226,Nt,2.95,ke)}I(13,232,s.tabs),v(3,pe,208),I(pe,215,s.clip);let F=pe+11,E=228.2;m("nose-schematic",[[F-3.5,E+10],[F-3.5,E],[F+3.5,E],[F+3.5,E+10]],W,0.34),m("nose-target",[[F-5.1,E+7],[F+5.1,E+7]],ke,0.4,[1.1,0.8]),m("nose-cross",[[F,E+5.7],[F,E+8.3]],ke,0.38),m("clip-illustration",[[F+1.5,E+2],[F+1.5,E-1.1],[F+0.9,E-2.1],[F-1.05,E-2.1],[F-1.9,E-1.1],[F-1.9,E+5.8],[F-1.3,E+7],[F+1.4,E+7],[F+2.1,E+5.8],[F+2.1,E+0.9]],k,0.48),y("clip-color-key",ve(F+8,E+6.8,0.8,0.8),we,T,0.22),b(F+10,E+7.8,a.clip_rear_from_nose_mm+" "+s.mm,2.95),m("test-rule",[[13,242],[i-13,242]],"#B7C1BF",0.35),b(13,248.2,s.compare,3.1),b(13,253.7,s.materials,2.85,W);let Lt="/v1/designs/"+d.design_id+"/revisions/"+d.revision_id;return b(13,o-17.7,s.source+"  "+Lt,2.6,W),b(13,o-12.8,"SHA-256  "+d.source_sha256,2.55,W),b(13,o-7.8,s.note+"   /   CERN-OHL-W-2.0   /   CC BY-SA 4.0",2.55,W),{width:i,height:o,lines:u,labels:g}}var ie=(t)=>Error(t);function Ae(t){if(t===void 0)return;let e=Te.find((n)=>n.species===t);if(!e)throw ie("This butterfly model is unavailable.");return e}var At=[L,...Te],wn=(t)=>Ae(t)??L,Re=(t)=>t===void 0?sn:fn;function Ce(t){return{span_mm:t.span_mm,left_trim_deg:t.left_trim_deg??0,right_trim_deg:t.right_trim_deg??0}}function Le(t,e,n){let r=Ae(n.species_id),{parameters:i,appearance_id:o}=n,s=r?mt(r,t,e,Ce(i),o):dt(t,e,i.span_mm,o);return lt(s)}function Oe(t){let e=Ae(t.species_id);return e?gt(e,Ce(t.parameters)):ht(t.parameters.span_mm)}function Bt(t){let e=Ae(t.species_id);return e?Et(e,Ce(t.parameters),t.appearance_id):_t(t)}function It(t,e,n){let r=Ae(t.species_id);return r?kt(r,{...t,parameters:Ce(t.parameters)},e,n):xt(t,e,n)}function xn(t,e={},n){let r=wn(t.species_id),i=r.parameter_definitions;for(let[s,a]of Object.entries(e)){let l=i.find((c)=>c.name===s);if(!l)throw ie("Unknown parameter for this butterfly: "+s);if(!Number.isFinite(a)||a<l.minimum||a>l.maximum||!Number.isInteger((a-l.minimum)/l.step))throw ie(`Choose ${s} from ${l.minimum} to ${l.maximum} in increments of ${l.step}.`)}let o=n??t.appearance_id;if(!r.appearances.some((s)=>s.appearance_id===o))throw ie("Select an appearance available for this butterfly.");return{parameters:{...t.parameters,...e},appearance_id:o}}var Zr={en:{title:"Picture guide",span:"Flat wingspan",left:"Left tab",right:"Right tab",paint:"Colors",up:"up",down:"down",flat:"flat",palette:{natural:"Field colors",carnival:"Carnival",twilight:"Twilight",coloring:"Color your own"},look:"Look from behind the tail toward the nose.",page2:"Fold, tune and try",question:"Flight experiment",mm:"mm",reference:"In the wild",model:"Template",source:"Source",photo:"Photo",folds:"Build steps"},ru:{title:"Инструкция с рисунками",span:"Размах развёртки",left:"Левый язычок",right:"Правый язычок",paint:"Цвета",up:"вверх",down:"вниз",flat:"ровно",palette:{natural:"Окрас бабочки",carnival:"Карнавал",twilight:"Сумерки",coloring:"Раскрась сам"},look:"Смотри от хвоста к носу.",page2:"Сложи, настрой и запусти",question:"Опыт с полётом",mm:"мм",reference:"В природе",model:"Шаблон",source:"Исходник",photo:"Фото",folds:"Шаги сборки"}},M=(t)=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");function Mt(t){let e=/^\/assets\/field-guide\/([a-z0-9-]+\.(svg|jpg))$/.exec(t);if(!e)throw Error("Unknown field-guide illustration");let n=C(new URL("../../apps/editor/assets/field-guide/"+e[1],"https://print.invalid/packages/print-export/build-guide.ts"));return"data:"+(e[2]==="svg"?"image/svg+xml":"image/jpeg")+";base64,"+n.toString("base64")}function St(t,e,n,r){let i=t[r],o=Zr[r],s=(m)=>m===0?"0° · "+o.flat:Math.abs(m)+"° "+(m>0?o.up:o.down),a=e.parameters,l=o.palette[e.appearance_id]??e.appearance_id,c=(m,y)=>"<div><dt>"+m+"</dt><dd>"+M(y)+"</dd></div>",d=[c(o.span,a.span_mm+" "+o.mm),c(o.left,s(a.left_trim_deg)),c(o.right,s(a.right_trim_deg)),c(o.paint,l)].join(""),p=i.steps.map((m,y)=>`<section class="step"><span class="number">${y+1}</span>
    <div><h3>${M(m.title)}</h3><p>${M(m.body)}</p></div>
    <img src="${Mt(m.diagram)}" alt=""></section>`),f=t.photo.local_path?`<img class="photo" src="${Mt(t.photo.local_path)}" alt="${M(i.photo_alt)}">`:"",u=M(i.common_name),g=M(e.ref.design_id)+" / "+M(e.ref.revision_id);return`<!doctype html><html lang="${r}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${u} · ${o.title} · Open Flight</title><style>
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
</style><article><header><b>Open Flight</b><span>${o.title} · 1 / 2</span></header>
<h1>${u}</h1><p><i>${M(t.scientific_name)}</i></p><dl>${d}</dl><p>${o.look}</p>
<h2>${o.folds}</h2>${p.slice(0,3).join("")}
<div class="nature">${f}<div><h3>${o.reference}</h3><p>${M(i.observation)}</p><small>${o.photo} · <a href="${M(t.photo.url)}">${M(t.photo.creator)} · Pixabay</a></small></div></div>
<footer>${o.model} · ${g}</footer></article>
<article><header><b>Open Flight · ${u}</b><span>${o.title} · 2 / 2</span></header><h2>${o.page2}</h2>
${p.slice(3).join("")}<h2>${o.question}</h2><p>${M(i.flight_question)}</p>
<footer><a href="${M(t.trim_reference.url)}">${M(t.trim_reference.source)}</a> · <a href="${M(t.natural_history.url)}">${M(t.natural_history.source)}</a><br>${o.model} · ${g}<br>${o.source} SHA-256 · ${M(e.ref.source_sha256)}</footer></article></html>`}var ye=JSON.parse(C(new URL("../field-guide/species.json","https://print.invalid/packages/product-core/content.ts"),"utf8")),ei=[["build-en","en","lesson","Build the Butterfly Glider","Cut, fold and set the clip.","content/en/butterfly-001/build.md"],["build-ru","ru","lesson","Соберите планер-бабочку","Вырежьте планер, согните крылья и установите скрепку.","content/ru/butterfly-001/build.md"],["garden-gate-en","en","game","Garden Gate","Count gate passes and measure landing error.","games/garden-gate/en.md"],["garden-gate-ru","ru","game","Садовые ворота","Считайте проходы и измеряйте расстояние до цветка.","games/garden-gate/ru.md"]],ni=ei.map(([t,e,n,r,i,o])=>{let s=C(new URL("../../"+o,"https://print.invalid/packages/product-core/content.ts"),"utf8");return{ref:{activity_id:t,revision_id:"a1",content_sha256:K(s)},kind:n,title:r,locale:e,aircraft_kinds:["butterfly_glider"],summary:i,content_markdown:s,evidence_classification:n==="game"?"untested_activity":"instruction"}}),ti=ye.flatMap((t)=>["en","ru"].map((e)=>{let n=t[e],r=(e==="ru"?"Соберите планер «":"Build the ")+n.common_name+(e==="ru"?"»":""),i=["# "+r,n.observation,...n.steps.map((o,s)=>"## "+(s+1)+". "+o.title+`

`+o.body),n.flight_question,"["+t.photo.creator+" · Pixabay]("+t.photo.url+")","["+t.trim_reference.source+"]("+t.trim_reference.url+")"].join(`

`)+`
`;return{ref:{activity_id:"workshop-"+t.id+"-"+e,revision_id:"w1",content_sha256:K(i)},kind:"lesson",title:r,locale:e,aircraft_kinds:["butterfly_glider"],summary:n.flight_question,evidence_classification:"instruction",content_markdown:i,species_id:t.id}})),_n=[...ni,...ti].sort((t,e)=>t.ref.activity_id<e.ref.activity_id?-1:t.ref.activity_id>e.ref.activity_id?1:0);function De(t,e){return _n.filter((n)=>(!e||n.locale===e)&&(n.kind==="game"||("species_id"in n?n.species_id===t:t===void 0)))}function Pt(t,e,n="en"){let r=e?.species_id,i=e?.parameters;return{schema_version:1,record_type:"flight_test",test_id:t.design_id+"-"+t.revision_id+"-planned",status:"planned",is_example:!1,evidence_kind:"physical",design:{design_id:t.design_id,revision:t.revision_id,source_sha256:t.source_sha256},protocol:{protocol_id:r?"wing-trim":"clip-position",revision:r?"w1":"b1",acceptance_rule:null,defined_at:null},setup:{aircraft_instance_id:null,material_spec:null,finished_mass_g:null,balance_mm_from_nose:null,launch_method:null,release_height_m:null,environment:null},performed_at:null,performed_by:null,trials:[],evidence_artifacts:[],review:{decision:"pending",reviewer:null,reviewed_at:null},notes:r&&i?n==="ru"?`Размах развёртки ${i.span_mm} мм. Если смотреть сзади, левый клапан ${i.left_trim_deg}°, правый ${i.right_trim_deg}°. Плюс означает сгиб вверх. Сравните плоские клапаны с одним изменённым. Чередуйте настройки по пять бросков с одной высоты. Используйте те же бумагу и скрепку. Запишите направление и место посадки при каждой попытке.`:`Planned ${r} build, ${i.span_mm} mm flat span. Set left trim to ${i.left_trim_deg}° and right trim to ${i.right_trim_deg}°, viewed from behind (positive up). Start with flat tabs and change one tab. Alternate five gentle releases of each configuration with the same paper, clip and height. Record every landing and observed direction.`:"Plan only. Record the actual station, stock, print calibration and launch conditions with the raw observations."}}function Fn(t,e,n,r,i,o,s,a,l){let c=wn(l),d={parameters:r,appearance_id:i,species_id:l},p=Le(t,e,d),f={design_id:t,revision_id:e,source_sha256:K(p)};return{source:p,dto:{ref:f,head_revision_id:e,name:n,kind:"butterfly_glider",...l?{species_id:l}:{},visibility:o?"private":"public",parameters:r,parameter_definitions:c.parameter_definitions,appearance_id:i,supported_appearances:c.appearances,evidence_state:o?"modified_experiment":"concept",evidence_record_ids:[],geometry:Oe(d),created_at:a,provenance:{origin:s,parent:o,generator_revision:Re(l),rights:c.rights}}}}function Tt(t,e,n){let{dto:r,source:i}=t,o=De(r.species_id,e.locale),s=(e.activities??[]).map((l)=>{let c=o.find((d)=>d.ref.activity_id===l.activity_id&&d.ref.revision_id===l.revision_id&&d.ref.content_sha256===l.content_sha256);if(!c)throw ie("Select an exact activity revision in the requested language.");return c}),a=e.formats.some((l)=>l==="pdf"||l==="svg")?It(r,e.page_size,e.locale):void 0;for(let l of e.formats)switch(l){case"svg":n("print-svg","image/svg+xml",Ee(a));break;case"pdf":n("print-pdf","application/pdf",Ft(a));break;case"source_json":n("source","application/json",i);break;case"trial_sheet":n("trial","application/json",JSON.stringify(Pt(r.ref,r,e.locale),null,2)+`
`);break;case"illustrated_guide":{let c=ye.find((p)=>p.id===r.species_id);if(!c)throw ie("The picture guide is available for the three workshop butterflies.");let d=o.find((p)=>p.kind==="lesson");n("guide","text/html",St(c,r,e.page_size,e.locale),[d.ref]);break}case"instructions":case"activity_assets":{let c=l==="instructions"?"lesson":"game",p=(s.length?s:o).filter((f)=>f.kind===c);if(!p.length)throw ie("Select a matching "+c+" for "+l+" or omit the activity filter.");for(let f of new Set(p)){let u=r.ref.design_id+" / "+r.ref.revision_id+" / "+r.ref.source_sha256+`

`;n(c,"text/markdown",u+f.content_markdown,[f.ref])}break}}}var Ne=new Map(At.map((t)=>{let e=Fn(t.model,t.baseline_revision,t.name,t.parameters,t.appearance_id,null,"original","2026-11-23T00:00:00Z",t.species);return[t.model,e]})),Ue=new Map,En=new Map,ri="open-flight-designs-v1:"+new URL(".",import.meta.url).pathname,kn=new Promise((t,e)=>{let n=indexedDB.open(ri,1);n.onupgradeneeded=()=>{n.result.createObjectStore("records"),n.result.createObjectStore("heads"),n.result.createObjectStore("receipts")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)}),Be=(t)=>new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)}),Z=(t)=>Response.json(t);async function Rt(t,e,n){if(Ne.has(t)&&Ne.get(t).dto.ref.revision_id===e)return Ne.get(t);let r=n??(await kn).transaction(["records","heads"]),[i,o]=await Promise.all([Be(r.objectStore("records").get([t,e])),Be(r.objectStore("heads").get(t))]);if(!i||!o)throw Error("This design is unavailable on this device.");return{source:i.source,dto:{...i.dto,head_revision_id:o.ref.revision_id}}}async function He(t,e){let n=await Rt(t.design_id,t.revision_id,e);if(n.dto.ref.source_sha256!==t.source_sha256||n.dto.provenance.generator_revision!==Re(n.dto.species_id)||n.source!==Le(t.design_id,t.revision_id,n.dto))throw Error("The saved source differs from this revision.");return n}async function ii(t,e,n){let i=(await kn).transaction(["records","heads","receipts"],"readwrite"),o=new Promise((c,d)=>{i.oncomplete=c,i.onerror=i.onabort=()=>d(i.error??Error("Save interrupted"))}),s=i.objectStore("receipts"),a=n.headers["Idempotency-Key"],l=JSON.stringify([t,n.headers["If-Match"],e]);try{let c=await Be(s.get(a));if(c){if(c.fingerprint!==l)throw Error("This save key belongs to a different edit.");return await o,c.dto}let d,p,f;if(t){let m=await Be(i.objectStore("heads").get(t));if(!m||n.headers["If-Match"]!=='"'+m.ref.revision_id+'"'){let y=Error("Reload the current revision before saving.");throw y.code="revision_conflict",y}d=(await He(m.ref,i)).dto,p="r"+(Number(m.ref.revision_id.slice(1))+1),f=d.name}else{if(d=(await He(e.source,i)).dto,f=String(e.name??"").trim(),!f||f.length>120)throw Error("Choose a name of up to 120 characters.");t="d-"+crypto.randomUUID(),p="r1"}let u=xn(d,e.parameters,e.appearance_id),g=Fn(t,p,f,u.parameters,u.appearance_id,d.ref,p==="r1"?"fork":"revision",new Date().toISOString(),d.species_id);return i.objectStore("records").add(g,[t,p]),i.objectStore("heads").put(g.dto,t),s.add({fingerprint:l,dto:g.dto},a),await o,g.dto}catch(c){try{i.abort()}catch{}throw await o.catch(()=>{}),c}}function vt(t,e,n){let r=t+"-"+crypto.randomUUID();return Ue.set(r,new Blob([n],{type:e})),{artifact_id:r}}async function yo(t,e={}){try{e.signal?.throwIfAborted();let n=new URL(t,location.origin),[,,r,i,o,s]=n.pathname.split("/"),a=e.body?JSON.parse(e.body):{};switch(r){case"capabilities":return Z({enabled_operations:["previewDraft","previewDesign","forkDesign","reviseDesign","startExport","listDesigns","listActivities","getDesignRevision","getFieldGuide"]});case"field-guide":return Z({species:ye});case"designs":{if(e.method==="POST")return Z(await ii(i,a,e));if(i)return Z((await Rt(i,s)).dto);let l=await Be((await kn).transaction("heads").objectStore("heads").getAll());return Z({items:[...Ne.values()].map((c)=>c.dto).concat(l),next_cursor:null})}case"activities":{if(i)return Z(_n.find((c)=>c.ref.activity_id===i&&c.ref.revision_id===s));let l=n.searchParams.get("species_id");return Z({items:De(l==="legacy"?void 0:l,n.searchParams.get("locale")),next_cursor:null})}case"previews":{let l=(await He(a.design)).dto,c={...l,...xn(l,a.parameters,a.appearance_id)},d=Bt(c),p=i==="draft"?d.toString("utf8"):vt("preview","image/svg+xml",d);return Z({svg:p,geometry:Oe(c),is_flight_simulation:!1})}case"exports":{let l=await He(a.design);await ct(ye.find((p)=>p.id===l.dto.species_id),a.formats);let c=[];Tt(l,a,(p,f,u)=>c.push(vt(p,f,u).artifact_id));let d={job_id:"job-"+crypto.randomUUID(),status:"succeeded",artifact_ids:c};return En.set(d.job_id,d),Z(d)}case"jobs":if(En.has(i))return Z(En.get(i));break;case"artifacts":if(Ue.has(i)){let l=Ue.get(i);return Ue.delete(i),new Response(l,{headers:{"Content-Type":l.type}})}break}return Response.json({message:"Unknown workshop resource."},{status:404})}catch(n){if(n.name==="AbortError")throw n;return Response.json({code:n.code,message:n.message},{status:400})}}export{yo as publicRequest};
