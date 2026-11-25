var vn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Wn=vn(function(Br){Br.byteLength=Er;Br.toByteArray=Ar;Br.fromByteArray=Sr;var le=[],oe=[],Fr=typeof Uint8Array<"u"?Uint8Array:Array,Ot="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(xe=0,jt=Ot.length;xe<jt;++xe)le[xe]=Ot[xe],oe[Ot.charCodeAt(xe)]=xe;var xe,jt;oe[45]=62;oe[95]=63;function Hn(t){var e=t.length;if(e%4>0)throw Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");if(n===-1)n=e;var o=n===e?0:4-n%4;return[n,o]}function Er(t){var e=Hn(t),n=e[0],o=e[1];return(n+o)*3/4-o}function Pr(t,e,n){return(e+n)*3/4-n}function Ar(t){var e,n=Hn(t),o=n[0],r=n[1],i=new Fr(Pr(t,o,r)),a=0,s=r>0?o-4:o,c;for(c=0;c<s;c+=4)e=oe[t.charCodeAt(c)]<<18|oe[t.charCodeAt(c+1)]<<12|oe[t.charCodeAt(c+2)]<<6|oe[t.charCodeAt(c+3)],i[a++]=e>>16&255,i[a++]=e>>8&255,i[a++]=e&255;if(r===2)e=oe[t.charCodeAt(c)]<<2|oe[t.charCodeAt(c+1)]>>4,i[a++]=e&255;if(r===1)e=oe[t.charCodeAt(c)]<<10|oe[t.charCodeAt(c+1)]<<4|oe[t.charCodeAt(c+2)]>>2,i[a++]=e>>8&255,i[a++]=e&255;return i}function vr(t){return le[t>>18&63]+le[t>>12&63]+le[t>>6&63]+le[t&63]}function Mr(t,e,n){var o,r=[];for(var i=e;i<n;i+=3)o=(t[i]<<16&16711680)+(t[i+1]<<8&65280)+(t[i+2]&255),r.push(vr(o));return r.join("")}function Sr(t){var e,n=t.length,o=n%3,r=[],i=16383;for(var a=0,s=n-o;a<s;a+=i)r.push(Mr(t,a,a+i>s?s:a+i));if(o===1)e=t[n-1],r.push(le[e>>2]+le[e<<4&63]+"==");else if(o===2)e=(t[n-2]<<8)+t[n-1],r.push(le[e>>10]+le[e>>4&63]+le[e<<2&63]+"=");return r.join("")}});var zn=vn(function(Cr){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Cr.read=function(t,e,n,o,r){var i,a,s=r*8-o-1,c=(1<<s)-1,l=c>>1,d=-7,p=n?r-1:0,u=n?-1:1,h=t[e+p];p+=u,i=h&(1<<-d)-1,h>>=-d,d+=s;for(;d>0;i=i*256+t[e+p],p+=u,d-=8);a=i&(1<<-d)-1,i>>=-d,d+=o;for(;d>0;a=a*256+t[e+p],p+=u,d-=8);if(i===0)i=1-l;else if(i===c)return a?NaN:(h?-1:1)*(1/0);else a=a+Math.pow(2,o),i=i-l;return(h?-1:1)*a*Math.pow(2,i-o)};Cr.write=function(t,e,n,o,r,i){var a,s,c,l=i*8-r-1,d=(1<<l)-1,p=d>>1,u=r===23?Math.pow(2,-24)-Math.pow(2,-77):0,h=o?0:i-1,f=o?1:-1,g=e<0||e===0&&1/e<0?1:0;if(e=Math.abs(e),isNaN(e)||e===1/0)s=isNaN(e)?1:0,a=d;else{if(a=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-a))<1)a--,c*=2;if(a+p>=1)e+=u/c;else e+=u*Math.pow(2,1-p);if(e*c>=2)a++,c/=2;if(a+p>=d)s=0,a=d;else if(a+p>=1)s=(e*c-1)*Math.pow(2,r),a=a+p;else s=e*Math.pow(2,p-1)*Math.pow(2,r),a=0}for(;r>=8;t[n+h]=s&255,h+=f,s/=256,r-=8);a=a<<r|s,l+=r;for(;l>0;t[n+h]=a&255,h+=f,a/=256,l-=8);t[n+h-f]|=g*128}});var fr=(t)=>t/4294967296|0,gr=(t)=>t>>>0;function Mn(t,e,n,o){let r=fr(n),i=gr(n);t.setUint32(e,o?i:r,o),t.setUint32(e+4,o?r:i,o)}function Sn(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in t&&t.BYTES_PER_ELEMENT===1}var Lt=(t)=>t?`"${t}" `:"";function br(t,e=""){if(typeof t!=="number")throw TypeError(Lt(e)+"expected number, got "+typeof t);if(!Number.isSafeInteger(t)||t<0)throw RangeError(Lt(e)+"expected integer >= 0, got "+t);return t}function at(t,e,n=""){if(Sn(t)&&(e===void 0||t.length===e))return t;if(e!==void 0)br(e,"length");let o=Sn(t),r=e!==void 0?` of length ${e}`:"",i=o?`length=${t.length}`:`type=${typeof t}`,a=Lt(n)+"expected Uint8Array"+r+", got "+i;if(!o)throw TypeError(a);throw RangeError(a)}var yr=(t,e)=>{if(t===null||typeof t!=="object"||Array.isArray(t))throw TypeError((e==="object"?"":`"${e}" `)+"expected object, got type="+typeof t)},Bn=(t,e)=>{yr(t,e);let n=Object.getPrototypeOf(t);if(n!==Object.prototype&&n!==null)throw TypeError(`"${e}" expected plain object`);if(Object.hasOwn(t,"__proto__"))throw TypeError(`"${e}.__proto__" is not allowed`)};function Ct(t,e=!0){if(t.destroyed)throw Error("hash was destroyed");if(e&&t.finished)throw Error("digest() was already called")}function In(t,e){at(t,void 0,"output");let n=e.outputLen;if(!(t.length>=n))throw RangeError('"output" expected length >= '+n)}function Rt(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function st(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function ae(t,e){return t<<32-e|t>>>e}var wr=(()=>typeof Uint8Array.from([]).toHex==="function"&&typeof Uint8Array.fromHex==="function")(),_r=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Tn(t){if(at(t),wr)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=_r[t[n]];return e}function xr(t,e,n="opts"){if(Bn(t,"defaults"),e!==void 0)Bn(e,n);return Object.assign(Object.create(null),t,e)}function Ln(t,e={}){if(typeof t!=="function")throw TypeError('"hashCons" expected function, got type='+typeof t);e=xr({},e,"info");let n=(r,i)=>t(i).update(r).digest(),o=t(void 0);return n.outputLen=o.outputLen,n.blockLen=o.blockLen,n.canXOF=o.canXOF,n.create=(r)=>t(r),Object.assign(n,e),Object.freeze(n)}var Cn=(t)=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,t])});function Rn(t,e,n){return t&e^~t&n}function Dn(t,e,n){return t&e^t&n^e&n}class Dt{blockLen;outputLen;canXOF=!1;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(t,e,n,o){this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=o,this.buffer=new Uint8Array(t),this.view=st(this.buffer)}update(t){Ct(this),at(t);let{view:e,buffer:n,blockLen:o}=this,r=t.length,i=!1;for(let a=0;a<r;){let s=Math.min(o-this.pos,r-a);if(s===o){let c=st(t);for(;o<=r-a;a+=o)this.process(c,a);i=!0;continue}if(n.set(a===0&&s===r?t:t.subarray(a,a+s),this.pos),this.pos+=s,a+=s,this.pos===o)this.process(e,0),this.pos=0,i=!0}if(this.length+=t.length,i)this.roundClean();return this}digestInto(t){Ct(this),In(t,this),this.finished=!0;let{buffer:e,view:n,blockLen:o,isLE:r}=this,{pos:i}=this;if(e[i++]=128,e.fill(0,i),this.padOffset>o-i)this.process(n,0),e.fill(0);Mn(n,o-8,this.length*8,r),this.process(n,0),this.roundClean();let a=t===e?n:st(t),s=this.outputLen,c=s/4,l=this.get();if(s%4||c>l.length)throw Error("invalid outputLen");for(let d=0;d<c;d++)a.setUint32(4*d,l[d],r)}digest(){let{buffer:t,outputLen:e}=this;this.digestInto(t);let n=t.slice(0,e);return this.destroy(),n}_cloneIntoMeta(t){let{buffer:e,length:n,finished:o,destroyed:r,pos:i}=this;if(t.destroyed=r,t.finished=o,t.length=n,t.pos=i,i)t.buffer.set(e);return t}clone(){return this._cloneInto()}}var On=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var kr=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),_e=new Uint32Array(64);class jn extends Dt{A=0;B=0;C=0;D=0;E=0;F=0;G=0;H=0;constructor(t,e){super(64,t,8,!1);this.A=e[0]|0,this.B=e[1]|0,this.C=e[2]|0,this.D=e[3]|0,this.E=e[4]|0,this.F=e[5]|0,this.G=e[6]|0,this.H=e[7]|0}get(){let{A:t,B:e,C:n,D:o,E:r,F:i,G:a,H:s}=this;return[t,e,n,o,r,i,a,s]}set(t,e,n,o,r,i,a,s){this.A=t|0,this.B=e|0,this.C=n|0,this.D=o|0,this.E=r|0,this.F=i|0,this.G=a|0,this.H=s|0}_cloneInto(t){return(t||=new this.constructor).set(...this.get()),this._cloneIntoMeta(t)}process(t,e){for(let d=0;d<16;d++,e+=4)_e[d]=t.getUint32(e,!1);for(let d=16;d<64;d++){let p=_e[d-15],u=_e[d-2],h=ae(p,7)^ae(p,18)^p>>>3,f=ae(u,17)^ae(u,19)^u>>>10;_e[d]=f+_e[d-7]+h+_e[d-16]|0}let{A:n,B:o,C:r,D:i,E:a,F:s,G:c,H:l}=this;for(let d=0;d<64;d++){let p=ae(a,6)^ae(a,11)^ae(a,25),u=l+p+Rn(a,s,c)+kr[d]+_e[d]|0,f=(ae(n,2)^ae(n,13)^ae(n,22))+Dn(n,o,r)|0;l=c,c=s,s=a,a=i+u|0,i=r,r=o,o=n,n=u+f|0}n=n+this.A|0,o=o+this.B|0,r=r+this.C|0,i=i+this.D|0,a=a+this.E|0,s=s+this.F|0,c=c+this.G|0,l=l+this.H|0,this.set(n,o,r,i,a,s,c,l)}roundClean(){Rt(_e)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0,0,0,0),Rt(this.buffer)}}class $n extends jn{constructor(){super(32,On)}}var Nn=Ln(()=>new $n,Cn(1));function Un(){let t=Nn.create();return{update(e){return t.update(typeof e==="string"?new TextEncoder().encode(e):e),this},digest(){return Tn(t.digest())}}}/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var $t=Wn(),Ce=zn(),Gn=typeof Symbol==="function"&&typeof Symbol.for==="function"?Symbol.for("nodejs.util.inspect.custom"):null;var ee=m;var so=50;var Nt=2147483647;m.TYPED_ARRAY_SUPPORT=Or();if(!m.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error==="function")console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function Or(){try{let t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),t.foo()===42}catch(t){return!1}}Object.defineProperty(m.prototype,"parent",{enumerable:!0,get:function(){if(!m.isBuffer(this))return;return this.buffer}});Object.defineProperty(m.prototype,"offset",{enumerable:!0,get:function(){if(!m.isBuffer(this))return;return this.byteOffset}});function me(t){if(t>Nt)throw RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,m.prototype),e}function m(t,e,n){if(typeof t==="number"){if(typeof e==="string")throw TypeError('The "string" argument must be of type string. Received type number');return zt(t)}return Vn(t,e,n)}m.poolSize=8192;function Vn(t,e,n){if(typeof t==="string")return $r(t,e);if(ArrayBuffer.isView(t))return Nr(t);if(t==null)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(ce(t,ArrayBuffer)||t&&ce(t.buffer,ArrayBuffer))return Ht(t,e,n);if(typeof SharedArrayBuffer<"u"&&(ce(t,SharedArrayBuffer)||t&&ce(t.buffer,SharedArrayBuffer)))return Ht(t,e,n);if(typeof t==="number")throw TypeError('The "value" argument must not be of type number. Received type number');let o=t.valueOf&&t.valueOf();if(o!=null&&o!==t)return m.from(o,e,n);let r=Ur(t);if(r)return r;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]==="function")return m.from(t[Symbol.toPrimitive]("string"),e,n);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}m.from=function(t,e,n){return Vn(t,e,n)};Object.setPrototypeOf(m.prototype,Uint8Array.prototype);Object.setPrototypeOf(m,Uint8Array);function Xn(t){if(typeof t!=="number")throw TypeError('"size" argument must be of type number');else if(t<0)throw RangeError('The value "'+t+'" is invalid for option "size"')}function jr(t,e,n){if(Xn(t),t<=0)return me(t);if(e!==void 0)return typeof n==="string"?me(t).fill(e,n):me(t).fill(e);return me(t)}m.alloc=function(t,e,n){return jr(t,e,n)};function zt(t){return Xn(t),me(t<0?0:Gt(t)|0)}m.allocUnsafe=function(t){return zt(t)};m.allocUnsafeSlow=function(t){return zt(t)};function $r(t,e){if(typeof e!=="string"||e==="")e="utf8";if(!m.isEncoding(e))throw TypeError("Unknown encoding: "+e);let n=Jn(t,e)|0,o=me(n),r=o.write(t,e);if(r!==n)o=o.slice(0,r);return o}function Ut(t){let e=t.length<0?0:Gt(t.length)|0,n=me(e);for(let o=0;o<e;o+=1)n[o]=t[o]&255;return n}function Nr(t){if(ce(t,Uint8Array)){let e=new Uint8Array(t);return Ht(e.buffer,e.byteOffset,e.byteLength)}return Ut(t)}function Ht(t,e,n){if(e<0||t.byteLength<e)throw RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw RangeError('"length" is outside of buffer bounds');let o;if(e===void 0&&n===void 0)o=new Uint8Array(t);else if(n===void 0)o=new Uint8Array(t,e);else o=new Uint8Array(t,e,n);return Object.setPrototypeOf(o,m.prototype),o}function Ur(t){if(m.isBuffer(t)){let e=Gt(t.length)|0,n=me(e);if(n.length===0)return n;return t.copy(n,0,0,e),n}if(t.length!==void 0){if(typeof t.length!=="number"||Yt(t.length))return me(0);return Ut(t)}if(t.type==="Buffer"&&Array.isArray(t.data))return Ut(t.data)}function Gt(t){if(t>=Nt)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Nt.toString(16)+" bytes");return t|0}m.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==m.prototype};m.compare=function(e,n){if(ce(e,Uint8Array))e=m.from(e,e.offset,e.byteLength);if(ce(n,Uint8Array))n=m.from(n,n.offset,n.byteLength);if(!m.isBuffer(e)||!m.isBuffer(n))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===n)return 0;let o=e.length,r=n.length;for(let i=0,a=Math.min(o,r);i<a;++i)if(e[i]!==n[i]){o=e[i],r=n[i];break}if(o<r)return-1;if(r<o)return 1;return 0};m.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};m.concat=function(e,n){if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return m.alloc(0);let o;if(n===void 0){n=0;for(o=0;o<e.length;++o)n+=e[o].length}let r=m.allocUnsafe(n),i=0;for(o=0;o<e.length;++o){let a=e[o];if(ce(a,Uint8Array))if(i+a.length>r.length){if(!m.isBuffer(a))a=m.from(a);a.copy(r,i)}else Uint8Array.prototype.set.call(r,a,i);else if(!m.isBuffer(a))throw TypeError('"list" argument must be an Array of Buffers');else a.copy(r,i);i+=a.length}return r};function Jn(t,e){if(m.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||ce(t,ArrayBuffer))return t.byteLength;if(typeof t!=="string")throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let n=t.length,o=arguments.length>2&&arguments[2]===!0;if(!o&&n===0)return 0;let r=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return Wt(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return ao(t).length;default:if(r)return o?-1:Wt(t).length;e=(""+e).toLowerCase(),r=!0}}m.byteLength=Jn;function Hr(t,e,n){let o=!1;if(e===void 0||e<0)e=0;if(e>this.length)return"";if(n===void 0||n>this.length)n=this.length;if(n<=0)return"";if(n>>>=0,e>>>=0,n<=e)return"";if(!t)t="utf8";while(!0)switch(t){case"hex":return Zr(this,e,n);case"utf8":case"utf-8":return Qn(this,e,n);case"ascii":return Xr(this,e,n);case"latin1":case"binary":return Jr(this,e,n);case"base64":return Kr(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Qr(this,e,n);default:if(o)throw TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),o=!0}}m.prototype._isBuffer=!0;function Me(t,e,n){let o=t[e];t[e]=t[n],t[n]=o}m.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<e;n+=2)Me(this,n,n+1);return this};m.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<e;n+=4)Me(this,n,n+3),Me(this,n+1,n+2);return this};m.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<e;n+=8)Me(this,n,n+7),Me(this,n+1,n+6),Me(this,n+2,n+5),Me(this,n+3,n+4);return this};m.prototype.toString=function(){let e=this.length;if(e===0)return"";if(arguments.length===0)return Qn(this,0,e);return Hr.apply(this,arguments)};m.prototype.toLocaleString=m.prototype.toString;m.prototype.equals=function(e){if(!m.isBuffer(e))throw TypeError("Argument must be a Buffer");if(this===e)return!0;return m.compare(this,e)===0};m.prototype.inspect=function(){let e="",n=so;if(e=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n)e+=" ... ";return"<Buffer "+e+">"};if(Gn)m.prototype[Gn]=m.prototype.inspect;m.prototype.compare=function(e,n,o,r,i){if(ce(e,Uint8Array))e=m.from(e,e.offset,e.byteLength);if(!m.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(n===void 0)n=0;if(o===void 0)o=e?e.length:0;if(r===void 0)r=0;if(i===void 0)i=this.length;if(n<0||o>e.length||r<0||i>this.length)throw RangeError("out of range index");if(r>=i&&n>=o)return 0;if(r>=i)return-1;if(n>=o)return 1;if(n>>>=0,o>>>=0,r>>>=0,i>>>=0,this===e)return 0;let a=i-r,s=o-n,c=Math.min(a,s),l=this.slice(r,i),d=e.slice(n,o);for(let p=0;p<c;++p)if(l[p]!==d[p]){a=l[p],s=d[p];break}if(a<s)return-1;if(s<a)return 1;return 0};function Zn(t,e,n,o,r){if(t.length===0)return-1;if(typeof n==="string")o=n,n=0;else if(n>2147483647)n=2147483647;else if(n<-2147483648)n=-2147483648;if(n=+n,Yt(n))n=r?0:t.length-1;if(n<0)n=t.length+n;if(n>=t.length)if(r)return-1;else n=t.length-1;else if(n<0)if(r)n=0;else return-1;if(typeof e==="string")e=m.from(e,o);if(m.isBuffer(e)){if(e.length===0)return-1;return qn(t,e,n,o,r)}else if(typeof e==="number"){if(e=e&255,typeof Uint8Array.prototype.indexOf==="function")if(r)return Uint8Array.prototype.indexOf.call(t,e,n);else return Uint8Array.prototype.lastIndexOf.call(t,e,n);return qn(t,[e],n,o,r)}throw TypeError("val must be string, number or Buffer")}function qn(t,e,n,o,r){let i=1,a=t.length,s=e.length;if(o!==void 0){if(o=String(o).toLowerCase(),o==="ucs2"||o==="ucs-2"||o==="utf16le"||o==="utf-16le"){if(t.length<2||e.length<2)return-1;i=2,a/=2,s/=2,n/=2}}function c(d,p){if(i===1)return d[p];else return d.readUInt16BE(p*i)}let l;if(r){let d=-1;for(l=n;l<a;l++)if(c(t,l)===c(e,d===-1?0:l-d)){if(d===-1)d=l;if(l-d+1===s)return d*i}else{if(d!==-1)l-=l-d;d=-1}}else{if(n+s>a)n=a-s;for(l=n;l>=0;l--){let d=!0;for(let p=0;p<s;p++)if(c(t,l+p)!==c(e,p)){d=!1;break}if(d)return l}}return-1}m.prototype.includes=function(e,n,o){return this.indexOf(e,n,o)!==-1};m.prototype.indexOf=function(e,n,o){return Zn(this,e,n,o,!0)};m.prototype.lastIndexOf=function(e,n,o){return Zn(this,e,n,o,!1)};function Wr(t,e,n,o){n=Number(n)||0;let r=t.length-n;if(!o)o=r;else if(o=Number(o),o>r)o=r;let i=e.length;if(o>i/2)o=i/2;let a;for(a=0;a<o;++a){let s=parseInt(e.substr(a*2,2),16);if(Yt(s))return a;t[n+a]=s}return a}function zr(t,e,n,o){return lt(Wt(e,t.length-n),t,n,o)}function Gr(t,e,n,o){return lt(oi(e),t,n,o)}function qr(t,e,n,o){return lt(ao(e),t,n,o)}function Yr(t,e,n,o){return lt(ri(e,t.length-n),t,n,o)}m.prototype.write=function(e,n,o,r){if(n===void 0)r="utf8",o=this.length,n=0;else if(o===void 0&&typeof n==="string")r=n,o=this.length,n=0;else if(isFinite(n))if(n=n>>>0,isFinite(o)){if(o=o>>>0,r===void 0)r="utf8"}else r=o,o=void 0;else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let i=this.length-n;if(o===void 0||o>i)o=i;if(e.length>0&&(o<0||n<0)||n>this.length)throw RangeError("Attempt to write outside buffer bounds");if(!r)r="utf8";let a=!1;for(;;)switch(r){case"hex":return Wr(this,e,n,o);case"utf8":case"utf-8":return zr(this,e,n,o);case"ascii":case"latin1":case"binary":return Gr(this,e,n,o);case"base64":return qr(this,e,n,o);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Yr(this,e,n,o);default:if(a)throw TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),a=!0}};m.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Kr(t,e,n){if(e===0&&n===t.length)return $t.fromByteArray(t);else return $t.fromByteArray(t.slice(e,n))}function Qn(t,e,n){n=Math.min(t.length,n);let o=[],r=e;while(r<n){let i=t[r],a=null,s=i>239?4:i>223?3:i>191?2:1;if(r+s<=n){let c,l,d,p;switch(s){case 1:if(i<128)a=i;break;case 2:if(c=t[r+1],(c&192)===128){if(p=(i&31)<<6|c&63,p>127)a=p}break;case 3:if(c=t[r+1],l=t[r+2],(c&192)===128&&(l&192)===128){if(p=(i&15)<<12|(c&63)<<6|l&63,p>2047&&(p<55296||p>57343))a=p}break;case 4:if(c=t[r+1],l=t[r+2],d=t[r+3],(c&192)===128&&(l&192)===128&&(d&192)===128){if(p=(i&15)<<18|(c&63)<<12|(l&63)<<6|d&63,p>65535&&p<1114112)a=p}}}if(a===null)a=65533,s=1;else if(a>65535)a-=65536,o.push(a>>>10&1023|55296),a=56320|a&1023;o.push(a),r+=s}return Vr(o)}var Yn=4096;function Vr(t){let e=t.length;if(e<=Yn)return String.fromCharCode.apply(String,t);let n="",o=0;while(o<e)n+=String.fromCharCode.apply(String,t.slice(o,o+=Yn));return n}function Xr(t,e,n){let o="";n=Math.min(t.length,n);for(let r=e;r<n;++r)o+=String.fromCharCode(t[r]&127);return o}function Jr(t,e,n){let o="";n=Math.min(t.length,n);for(let r=e;r<n;++r)o+=String.fromCharCode(t[r]);return o}function Zr(t,e,n){let o=t.length;if(!e||e<0)e=0;if(!n||n<0||n>o)n=o;let r="";for(let i=e;i<n;++i)r+=ii[t[i]];return r}function Qr(t,e,n){let o=t.slice(e,n),r="";for(let i=0;i<o.length-1;i+=2)r+=String.fromCharCode(o[i]+o[i+1]*256);return r}m.prototype.slice=function(e,n){let o=this.length;if(e=~~e,n=n===void 0?o:~~n,e<0){if(e+=o,e<0)e=0}else if(e>o)e=o;if(n<0){if(n+=o,n<0)n=0}else if(n>o)n=o;if(n<e)n=e;let r=this.subarray(e,n);return Object.setPrototypeOf(r,m.prototype),r};function U(t,e,n){if(t%1!==0||t<0)throw RangeError("offset is not uint");if(t+e>n)throw RangeError("Trying to access beyond buffer length")}m.prototype.readUintLE=m.prototype.readUIntLE=function(e,n,o){if(e=e>>>0,n=n>>>0,!o)U(e,n,this.length);let r=this[e],i=1,a=0;while(++a<n&&(i*=256))r+=this[e+a]*i;return r};m.prototype.readUintBE=m.prototype.readUIntBE=function(e,n,o){if(e=e>>>0,n=n>>>0,!o)U(e,n,this.length);let r=this[e+--n],i=1;while(n>0&&(i*=256))r+=this[e+--n]*i;return r};m.prototype.readUint8=m.prototype.readUInt8=function(e,n){if(e=e>>>0,!n)U(e,1,this.length);return this[e]};m.prototype.readUint16LE=m.prototype.readUInt16LE=function(e,n){if(e=e>>>0,!n)U(e,2,this.length);return this[e]|this[e+1]<<8};m.prototype.readUint16BE=m.prototype.readUInt16BE=function(e,n){if(e=e>>>0,!n)U(e,2,this.length);return this[e]<<8|this[e+1]};m.prototype.readUint32LE=m.prototype.readUInt32LE=function(e,n){if(e=e>>>0,!n)U(e,4,this.length);return(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};m.prototype.readUint32BE=m.prototype.readUInt32BE=function(e,n){if(e=e>>>0,!n)U(e,4,this.length);return this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};m.prototype.readBigUInt64LE=ke(function(e){e=e>>>0,Re(e,"offset");let n=this[e],o=this[e+7];if(n===void 0||o===void 0)Ge(e,this.length-8);let r=n+this[++e]*256+this[++e]*65536+this[++e]*16777216,i=this[++e]+this[++e]*256+this[++e]*65536+o*16777216;return BigInt(r)+(BigInt(i)<<BigInt(32))});m.prototype.readBigUInt64BE=ke(function(e){e=e>>>0,Re(e,"offset");let n=this[e],o=this[e+7];if(n===void 0||o===void 0)Ge(e,this.length-8);let r=n*16777216+this[++e]*65536+this[++e]*256+this[++e],i=this[++e]*16777216+this[++e]*65536+this[++e]*256+o;return(BigInt(r)<<BigInt(32))+BigInt(i)});m.prototype.readIntLE=function(e,n,o){if(e=e>>>0,n=n>>>0,!o)U(e,n,this.length);let r=this[e],i=1,a=0;while(++a<n&&(i*=256))r+=this[e+a]*i;if(i*=128,r>=i)r-=Math.pow(2,8*n);return r};m.prototype.readIntBE=function(e,n,o){if(e=e>>>0,n=n>>>0,!o)U(e,n,this.length);let r=n,i=1,a=this[e+--r];while(r>0&&(i*=256))a+=this[e+--r]*i;if(i*=128,a>=i)a-=Math.pow(2,8*n);return a};m.prototype.readInt8=function(e,n){if(e=e>>>0,!n)U(e,1,this.length);if(!(this[e]&128))return this[e];return(255-this[e]+1)*-1};m.prototype.readInt16LE=function(e,n){if(e=e>>>0,!n)U(e,2,this.length);let o=this[e]|this[e+1]<<8;return o&32768?o|4294901760:o};m.prototype.readInt16BE=function(e,n){if(e=e>>>0,!n)U(e,2,this.length);let o=this[e+1]|this[e]<<8;return o&32768?o|4294901760:o};m.prototype.readInt32LE=function(e,n){if(e=e>>>0,!n)U(e,4,this.length);return this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};m.prototype.readInt32BE=function(e,n){if(e=e>>>0,!n)U(e,4,this.length);return this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};m.prototype.readBigInt64LE=ke(function(e){e=e>>>0,Re(e,"offset");let n=this[e],o=this[e+7];if(n===void 0||o===void 0)Ge(e,this.length-8);let r=this[e+4]+this[e+5]*256+this[e+6]*65536+(o<<24);return(BigInt(r)<<BigInt(32))+BigInt(n+this[++e]*256+this[++e]*65536+this[++e]*16777216)});m.prototype.readBigInt64BE=ke(function(e){e=e>>>0,Re(e,"offset");let n=this[e],o=this[e+7];if(n===void 0||o===void 0)Ge(e,this.length-8);let r=(n<<24)+this[++e]*65536+this[++e]*256+this[++e];return(BigInt(r)<<BigInt(32))+BigInt(this[++e]*16777216+this[++e]*65536+this[++e]*256+o)});m.prototype.readFloatLE=function(e,n){if(e=e>>>0,!n)U(e,4,this.length);return Ce.read(this,e,!0,23,4)};m.prototype.readFloatBE=function(e,n){if(e=e>>>0,!n)U(e,4,this.length);return Ce.read(this,e,!1,23,4)};m.prototype.readDoubleLE=function(e,n){if(e=e>>>0,!n)U(e,8,this.length);return Ce.read(this,e,!0,52,8)};m.prototype.readDoubleBE=function(e,n){if(e=e>>>0,!n)U(e,8,this.length);return Ce.read(this,e,!1,52,8)};function X(t,e,n,o,r,i){if(!m.isBuffer(t))throw TypeError('"buffer" argument must be a Buffer instance');if(e>r||e<i)throw RangeError('"value" argument is out of bounds');if(n+o>t.length)throw RangeError("Index out of range")}m.prototype.writeUintLE=m.prototype.writeUIntLE=function(e,n,o,r){if(e=+e,n=n>>>0,o=o>>>0,!r){let s=Math.pow(2,8*o)-1;X(this,e,n,o,s,0)}let i=1,a=0;this[n]=e&255;while(++a<o&&(i*=256))this[n+a]=e/i&255;return n+o};m.prototype.writeUintBE=m.prototype.writeUIntBE=function(e,n,o,r){if(e=+e,n=n>>>0,o=o>>>0,!r){let s=Math.pow(2,8*o)-1;X(this,e,n,o,s,0)}let i=o-1,a=1;this[n+i]=e&255;while(--i>=0&&(a*=256))this[n+i]=e/a&255;return n+o};m.prototype.writeUint8=m.prototype.writeUInt8=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,1,255,0);return this[n]=e&255,n+1};m.prototype.writeUint16LE=m.prototype.writeUInt16LE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,2,65535,0);return this[n]=e&255,this[n+1]=e>>>8,n+2};m.prototype.writeUint16BE=m.prototype.writeUInt16BE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,2,65535,0);return this[n]=e>>>8,this[n+1]=e&255,n+2};m.prototype.writeUint32LE=m.prototype.writeUInt32LE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,4,4294967295,0);return this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=e&255,n+4};m.prototype.writeUint32BE=m.prototype.writeUInt32BE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,4,4294967295,0);return this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};function eo(t,e,n,o,r){io(e,o,r,t,n,7);let i=Number(e&BigInt(4294967295));t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i;let a=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=a,a=a>>8,t[n++]=a,a=a>>8,t[n++]=a,a=a>>8,t[n++]=a,n}function to(t,e,n,o,r){io(e,o,r,t,n,7);let i=Number(e&BigInt(4294967295));t[n+7]=i,i=i>>8,t[n+6]=i,i=i>>8,t[n+5]=i,i=i>>8,t[n+4]=i;let a=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=a,a=a>>8,t[n+2]=a,a=a>>8,t[n+1]=a,a=a>>8,t[n]=a,n+8}m.prototype.writeBigUInt64LE=ke(function(e,n=0){return eo(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))});m.prototype.writeBigUInt64BE=ke(function(e,n=0){return to(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))});m.prototype.writeIntLE=function(e,n,o,r){if(e=+e,n=n>>>0,!r){let c=Math.pow(2,8*o-1);X(this,e,n,o,c-1,-c)}let i=0,a=1,s=0;this[n]=e&255;while(++i<o&&(a*=256)){if(e<0&&s===0&&this[n+i-1]!==0)s=1;this[n+i]=(e/a>>0)-s&255}return n+o};m.prototype.writeIntBE=function(e,n,o,r){if(e=+e,n=n>>>0,!r){let c=Math.pow(2,8*o-1);X(this,e,n,o,c-1,-c)}let i=o-1,a=1,s=0;this[n+i]=e&255;while(--i>=0&&(a*=256)){if(e<0&&s===0&&this[n+i+1]!==0)s=1;this[n+i]=(e/a>>0)-s&255}return n+o};m.prototype.writeInt8=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,1,127,-128);if(e<0)e=255+e+1;return this[n]=e&255,n+1};m.prototype.writeInt16LE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,2,32767,-32768);return this[n]=e&255,this[n+1]=e>>>8,n+2};m.prototype.writeInt16BE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,2,32767,-32768);return this[n]=e>>>8,this[n+1]=e&255,n+2};m.prototype.writeInt32LE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,4,2147483647,-2147483648);return this[n]=e&255,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24,n+4};m.prototype.writeInt32BE=function(e,n,o){if(e=+e,n=n>>>0,!o)X(this,e,n,4,2147483647,-2147483648);if(e<0)e=4294967295+e+1;return this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};m.prototype.writeBigInt64LE=ke(function(e,n=0){return eo(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});m.prototype.writeBigInt64BE=ke(function(e,n=0){return to(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function no(t,e,n,o,r,i){if(n+o>t.length)throw RangeError("Index out of range");if(n<0)throw RangeError("Index out of range")}function oo(t,e,n,o,r){if(e=+e,n=n>>>0,!r)no(t,e,n,4,340282346638528860000000000000000000000,-340282346638528860000000000000000000000);return Ce.write(t,e,n,o,23,4),n+4}m.prototype.writeFloatLE=function(e,n,o){return oo(this,e,n,!0,o)};m.prototype.writeFloatBE=function(e,n,o){return oo(this,e,n,!1,o)};function ro(t,e,n,o,r){if(e=+e,n=n>>>0,!r)no(t,e,n,8,179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,-179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);return Ce.write(t,e,n,o,52,8),n+8}m.prototype.writeDoubleLE=function(e,n,o){return ro(this,e,n,!0,o)};m.prototype.writeDoubleBE=function(e,n,o){return ro(this,e,n,!1,o)};m.prototype.copy=function(e,n,o,r){if(!m.isBuffer(e))throw TypeError("argument should be a Buffer");if(!o)o=0;if(!r&&r!==0)r=this.length;if(n>=e.length)n=e.length;if(!n)n=0;if(r>0&&r<o)r=o;if(r===o)return 0;if(e.length===0||this.length===0)return 0;if(n<0)throw RangeError("targetStart out of bounds");if(o<0||o>=this.length)throw RangeError("Index out of range");if(r<0)throw RangeError("sourceEnd out of bounds");if(r>this.length)r=this.length;if(e.length-n<r-o)r=e.length-n+o;let i=r-o;if(this===e&&typeof Uint8Array.prototype.copyWithin==="function")this.copyWithin(n,o,r);else Uint8Array.prototype.set.call(e,this.subarray(o,r),n);return i};m.prototype.fill=function(e,n,o,r){if(typeof e==="string"){if(typeof n==="string")r=n,n=0,o=this.length;else if(typeof o==="string")r=o,o=this.length;if(r!==void 0&&typeof r!=="string")throw TypeError("encoding must be a string");if(typeof r==="string"&&!m.isEncoding(r))throw TypeError("Unknown encoding: "+r);if(e.length===1){let a=e.charCodeAt(0);if(r==="utf8"&&a<128||r==="latin1")e=a}}else if(typeof e==="number")e=e&255;else if(typeof e==="boolean")e=Number(e);if(n<0||this.length<n||this.length<o)throw RangeError("Out of range index");if(o<=n)return this;if(n=n>>>0,o=o===void 0?this.length:o>>>0,!e)e=0;let i;if(typeof e==="number")for(i=n;i<o;++i)this[i]=e;else{let a=m.isBuffer(e)?e:m.from(e,r),s=a.length;if(s===0)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<o-n;++i)this[i+n]=a[i%s]}return this};var Le={};function qt(t,e,n){Le[t]=class extends n{constructor(){super();Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(r){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:r,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}qt("ERR_BUFFER_OUT_OF_BOUNDS",function(t){if(t)return`${t} is outside of buffer bounds`;return"Attempt to access memory outside buffer bounds"},RangeError);qt("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError);qt("ERR_OUT_OF_RANGE",function(t,e,n){let o=`The value of "${t}" is out of range.`,r=n;if(Number.isInteger(n)&&Math.abs(n)>4294967296)r=Kn(String(n));else if(typeof n==="bigint"){if(r=String(n),n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))r=Kn(r);r+="n"}return o+=` It must be ${e}. Received ${r}`,o},RangeError);function Kn(t){let e="",n=t.length,o=t[0]==="-"?1:0;for(;n>=o+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function ei(t,e,n){if(Re(e,"offset"),t[e]===void 0||t[e+n]===void 0)Ge(e,t.length-(n+1))}function io(t,e,n,o,r,i){if(t>n||t<e){let a=typeof e==="bigint"?"n":"",s;if(i>3)if(e===0||e===BigInt(0))s=`>= 0${a} and < 2${a} ** ${(i+1)*8}${a}`;else s=`>= -(2${a} ** ${(i+1)*8-1}${a}) and < 2 ** ${(i+1)*8-1}${a}`;else s=`>= ${e}${a} and <= ${n}${a}`;throw new Le.ERR_OUT_OF_RANGE("value",s,t)}ei(o,r,i)}function Re(t,e){if(typeof t!=="number")throw new Le.ERR_INVALID_ARG_TYPE(e,"number",t)}function Ge(t,e,n){if(Math.floor(t)!==t)throw Re(t,n),new Le.ERR_OUT_OF_RANGE(n||"offset","an integer",t);if(e<0)throw new Le.ERR_BUFFER_OUT_OF_BOUNDS;throw new Le.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}var ti=/[^+/0-9A-Za-z-_]/g;function ni(t){if(t=t.split("=")[0],t=t.trim().replace(ti,""),t.length<2)return"";while(t.length%4!==0)t=t+"=";return t}function Wt(t,e){e=e||1/0;let n,o=t.length,r=null,i=[];for(let a=0;a<o;++a){if(n=t.charCodeAt(a),n>55295&&n<57344){if(!r){if(n>56319){if((e-=3)>-1)i.push(239,191,189);continue}else if(a+1===o){if((e-=3)>-1)i.push(239,191,189);continue}r=n;continue}if(n<56320){if((e-=3)>-1)i.push(239,191,189);r=n;continue}n=(r-55296<<10|n-56320)+65536}else if(r){if((e-=3)>-1)i.push(239,191,189)}if(r=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,n&63|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw Error("Invalid code point")}return i}function oi(t){let e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n)&255);return e}function ri(t,e){let n,o,r,i=[];for(let a=0;a<t.length;++a){if((e-=2)<0)break;n=t.charCodeAt(a),o=n>>8,r=n%256,i.push(r),i.push(o)}return i}function ao(t){return $t.toByteArray(ni(t))}function lt(t,e,n,o){let r;for(r=0;r<o;++r){if(r+n>=e.length||r>=t.length)break;e[r+n]=t[r]}return r}function ce(t,e){return t instanceof e||t!=null&&t.constructor!=null&&t.constructor.name!=null&&t.constructor.name===e.name}function Yt(t){return t!==t}var ii=function(){let e=Array(256);for(let n=0;n<16;++n){let o=n*16;for(let r=0;r<16;++r)e[o+r]="0123456789abcdef"[n]+"0123456789abcdef"[r]}return e}();function ke(t){return typeof BigInt>"u"?ai:t}function ai(){throw Error("BigInt not supported")}var Kt={"/packages/geometry/butterfly.ts":`import { createHash } from 'node:crypto'
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
`},De=new Map,Vt,co=(t)=>new URL(t,import.meta.url);function lo(t,e){if(!De.has(t)){let n=fetch(co(e)).then(async(o)=>{if(!o.ok)throw Error("Cannot load print resource "+e);let r=ee.from(await o.arrayBuffer());return De.set(t,r),r}).catch((o)=>{throw De.delete(t),o});De.set(t,n)}return De.get(t)}async function si(){if(globalThis.jspdf)return;Vt??=new Promise((t,e)=>{let n=document.createElement("script");n.src=co("assets/planes/vendor/jspdf.js"),n.onload=t,n.onerror=()=>{Vt=void 0,e(Error("Unable to load the PDF tools."))},document.head.append(n)}),await Vt}async function Xt(t,e){let n=[];if(e.includes("pdf"))n.push(si(),lo("/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","assets/planes/vendor/DejaVuSans.ttf"));if(t&&e.includes("illustrated_guide")){let o=[t.photo.local_path,...t.en.steps.map((r)=>r.diagram)].filter(Boolean);for(let r of new Set(o))n.push(lo("/apps/editor"+r,r.slice(1)))}await Promise.all(n)}function V(t,e){let n=t.pathname;if(Object.hasOwn(Kt,n))return e==="utf8"?Kt[n]:ee.from(Kt[n]);let o=De.get(n);if(!ee.isBuffer(o))throw Error("Unavailable print resource "+n);return e==="utf8"?o.toString("utf8"):o}var te=JSON.parse(V(new URL("../../designs/butterfly-001/model.json","https://print.invalid/packages/geometry/butterfly.ts"),"utf8")),J=(t)=>Un("sha256").update(t).digest("hex");function ct(t){return JSON.stringify(t,(e,n)=>{if(n&&typeof n==="object"&&!Array.isArray(n))return Object.fromEntries(Object.keys(n).sort().map((o)=>[o,n[o]]));return n})}var Jt="butterfly-b1-"+J(V(new URL("https://print.invalid/packages/geometry/butterfly.ts"))).slice(0,16),F=(t)=>Math.round(t*1000)/1000;function po(t,e,n,o){return{design_id:t,revision_id:e,generator_revision:Jt,model:te,parameters:{span_mm:n},appearance_id:o,units:"mm"}}function uo(t){let e=[[0,0]],[n,o]=te.half_outline_start,r=t/(2*te.half_span_mm);for(let[a,s,c,l,d,p]of te.half_outline_segments){for(let u=1;u<=16;u++){let h=u/16,f=1-h,g=(w,b,y,x)=>f**3*w+3*f*f*h*b+3*f*h*h*y+h**3*x;e.push([F(r*g(n,a,c,d)),F(g(o,s,l,p))])}[n,o]=[d,p]}let i=e.slice(1,-1).reverse().map(([a,s])=>[-a,s]);return[...e,...i]}function ho(t){let e=uo(t),n=0;return e.forEach(([o,r],i)=>{let[a,s]=e[(i+1)%e.length];n+=o*s-a*r}),{span_mm:t,planform_area_mm2:F(Math.abs(n)/2),classification:"computed_geometry"}}var li={blank:["#ffffff"],meadow:["#d5e8d9","#408a78","#f2d8a1"],apricot:["#fae1cc","#bb695e","#f5bb77"]};function Zt(t,e,n,o){let r=t/(2*te.half_span_mm),i=([l,d])=>[F(n+l),F(o+d)],a=li[e],s=[{id:"cut",points:uo(t).map(i),closed:!0,fill:a[0],stroke:"#20382f",weight:0.44}],c=[];for(let l of[-1,1]){let d=(h,f)=>i([l*r*h,f]);if(e!=="blank")for(let[h,f]of[[[10,22],[33,15],[61,9],[73,11],[55,23],[26,33],[13,33]],[[15,42],[36,30],[69,19],[76,21],[72,30],[53,41],[32,47]],[[14,57],[33,57],[54,64],[59,72],[51,80],[35,76],[21,65]]].entries())s.push({id:"patch-"+l+"-"+h,points:f.map(([g,w])=>d(g,w)),closed:!0,fill:a[h===1?2:1]});let[p,u]=te.root_fold_y_mm;s.push({id:"fold-"+l,points:[d(te.root_x_mm,p),d(te.root_x_mm,u)],stroke:"#35423b",weight:0.35,dash:[2,1.4]}),s.push({id:"trim-"+l,points:te.trim_segment_mm.map(([h,f])=>d(h,f)),stroke:"#35423b",weight:0.32,dash:[0.7,1]})}for(let[l,d]of Object.entries(te.clip_stations_mm_from_nose))s.push({id:"clip-"+l,points:[i([-3,d]),i([3,d])],stroke:"#20382f",weight:0.35}),c.push({x:n+10*r,y:o+d+3.5,text:l,size:3,color:"#152d22"});return{lines:s,labels:c}}function ci(t,e,n){let[o,r,i,a,s,c]=e,l=1-n;return[l**3*t[0]+3*l**2*n*o+3*l*n**2*i+n**3*s,l**3*t[1]+3*l**2*n*r+3*l*n**2*a+n**3*c]}function fe(t,e){let n=[t];for(let o of e){let r=n.at(-1);for(let i=1;i<=14;i++)n.push(ci(r,o,i/14))}return n}function mo(t){let e=[0];for(let n=1;n<t.length;n++)e.push(e[n-1]+Math.hypot(t[n][0]-t[n-1][0],t[n][1]-t[n-1][1]));return{points:t,distance:e,length:e.at(-1)}}function ne(t,e,n){return t+(e-t)*n}function Qt(t,e,n){return[ne(t[0],e[0],n),ne(t[1],e[1],n)]}function di(t,e){let n=Math.max(0,Math.min(1,e))*t.length,o=t.distance.length-1,r=0;while(o-r>1){let i=Math.floor((r+o)/2);if(n>t.distance[i])r=i;else o=i}return Qt(t.points[r],t.points[o],(n-t.distance[r])/(t.distance[o]-t.distance[r]))}function Z(t,e){return Array.from({length:t+1},(n,o)=>e(o/t))}function be(t){let e=t.geometry,n=fe([e.root_x,e.fore_root_y],e.fore_edge),o=fe(n.at(-1),e.hind_edge),r=fe([0,e.nose_y],[[2.4,e.nose_y,3.8,e.nose_y+1,4.6,e.nose_y+3.6],[5.2,e.nose_y+6.5,e.root_x-0.3,e.fore_root_y-4,e.root_x,e.fore_root_y]]),i=fe(o.at(-1),[[e.root_x-0.4,e.hind_root_y+5,3,e.abdomen_y,0,e.abdomen_y]]),a=[...r,...n.slice(1),...o.slice(1),...i.slice(1)],s=[...a,...a.slice(1,-1).reverse().map(([l,d])=>[-l,d])],c=t.species==="swallowtail"?fe(n.at(-1),[...e.hind_edge.slice(0,4),[57,73,55,74,51,74],...e.hind_edge.slice(7)]):o;return{outline:s,fore:mo(n),hind:mo(c),trailing:o}}function j(t,e,n=1){let o=t[0]*n;return[o===0?0:Math.sign(o)*F(Math.abs(o)*e/200),F(t[1])]}function pi(t,e){let n=[];for(let o=1;o<t.length;o++){let[r,i]=t[o-1],[a,s]=t[o];if(r!==a&&e>=Math.min(r,a)&&e<=Math.max(r,a))n.push(ne(i,s,(e-r)/(a-r)))}if(!n.length)throw Error("Trim station is outside the trailing edge");return[e,Math.max(...n)]}function Ye(t,e){let[n,o]=t.geometry.tab_x.map((s)=>pi(e,s)),r=t.geometry.tab_depth_mm,i=[[n[0],n[1]-r],[o[0],o[1]-r]];return{hinges:i,ends:[n,o],fromHinge:(s,c)=>{let l=Qt(i[0],i[1],s);return[l[0],l[1]+c]}}}function ui(t,e,n){return(o,r)=>{let[i,a]=Qt(e,di(t,o),r),s=n?(1-o)/0.1:o/0.38;return[i,a+11.5*Math.exp(-(s**2))*Math.sin(Math.PI*r)]}}function je(t,e,n,o,r,i=40){let a=(c)=>Z(i,(l)=>{let d=ne(e,n,l);return t(d,c(d))}),s=(c,l,d)=>Z(10,(p)=>t(c,ne(l,d,p))).slice(1,-1);return[...a(o),...s(n,o(n),r(n)),...a(r).reverse(),...s(e,r(e),o(e))]}var en=(t)=>(e)=>t;function de(t,e,n,o,r,i=0){return Z(20,(a)=>{let s=a*Math.PI*2,c=Math.cos(s),l=Math.sin(s);return t(e+o*c+i*l,n+r*l)})}function qe(t,e,n,o){return Z(26,(r)=>[t+n*Math.cos(r*2*Math.PI),e+o*Math.sin(r*2*Math.PI)])}function Oe(t,e,n,o,r,i=0){return Z(18,(a)=>t(ne(e,n,a)+i*Math.sin(Math.PI*a),ne(o,r,a)))}function ge(t,e,n){let o="#";for(let r=1;r<7;r+=2){let i=ne(parseInt(t.slice(r,r+2),16),parseInt(e.slice(r,r+2),16),n);o+=Math.round(i).toString(16).padStart(2,"0")}return o.toUpperCase()}function tn(t,e){let n=1;while(n<t.length-1&&e>t[n][0])n++;let[o,r]=t[n-1],[i,a]=t[n];return ge(r,a,Math.max(0,Math.min(1,(e-o)/(i-o))))}function hi(t,e,n,o,r){let i=e?(l)=>0.93-0.15*Math.exp(-((l-0.55)**2)/0.026)-0.04*Math.sin(Math.PI*l):(l)=>0.9-0.055*Math.sin(Math.PI*l);if(r("ground",je(t,0,1,en(0.01),i),n.base,o?n.ink:void 0,0.34),!o){let l=[[0,ge(n.mid,n.shade,0.3)],[0.28,n.mid],[0.53,n.base],[0.82,n.sun],[1,ge(n.sun,n.base,0.45)]];for(let d=0;d<16;d++){let p=(u)=>(h)=>i(h)*(u+0.035*Math.sin(Math.PI*u)*Math.sin(5*h));r("amber-scale-layer-"+d,je(t,0,1,p(d/16),p(Math.min(1,(d+1.05)/16))),tn(l,(d+0.5)/16))}for(let d=0;d<10;d++)for(let p=0;p<4;p++){let u=0.19+d*0.078+0.009*Math.sin(d+p),h=0.27+p*0.124+0.037*Math.sin(d*1.73+p);r("pollen-glint-"+d+"-"+p,de(t,u,h,0.0045,0.012,0.001),ge(n.gleam,n.sun,0.5+0.2*Math.sin(d+p)))}}let a=(l,d,p)=>r(l,d,void 0,n.ink,o?0.32:p),s=(l,d,p,u,h)=>{a(l,Oe(t,d,u,p,i(u)+0.006,0.006),h)};if(e){a("upper-main-vein",Z(30,(u)=>t(0.319,u*(i(0.319)+0.008))),0.81),a("lower-main-vein",Z(30,(u)=>t(0.735,u*(i(0.735)+0.008))),0.95);let p=(u)=>[ne(0.319,0.735,u),0.49+0.11*Math.sin(Math.PI*u)];a("discal-crossvein",Z(32,(u)=>t(...p(u))),0.64);for(let[u,h]of[0.12,0.36,0.61,0.84].entries()){let[f,g]=p(h);s("secondary-"+u,f,g,0.39+0.085*u,0.67)}for(let[u,h]of[0.55,0.35,0.16].entries())s("lower-fork-"+u,0.735,h,0.81+0.066*u,0.72)}else for(let l=0;l<8;l++){let d=0.16+l*0.111;a("hind-vein-"+l,Oe(t,d*0.48+0.18,d,0,i(d)+0.006,-0.038),l%3===0?0.78:0.63)}let c=e?19:17;for(let l=0;l<c;l++){let d=(e?0.33:0.1)+l*(e?0.034:0.049),p=i(d),u=0.0085+0.002*Math.sin(l*1.1);if(r("milkspot-"+l,de(t,d,p+(1-p)*0.64,u,Math.min(0.02,(1-p)*0.19)),n.spot,o?n.ink:void 0,0.2),l>0&&l<c-1)r("milkspot-inner-"+l,de(t,d+0.006,p+(1-p)*0.29,u*0.9,Math.min(0.019,(1-p)*0.19)),l%4===0?n.gleam:n.spot,o?n.ink:void 0,0.2)}if(e)for(let l=0;l<4;l++){let d=0.406+l*0.046;r("apical-window-"+l,de(t,d,i(d)-0.014,0.011,0.032,0.002),l%2?n.spot:n.gleam,o?n.ink:void 0,0.25)}}function mi(t,e,n,o,r){let i=(s)=>0.94-0.06*Math.sin(Math.PI*s)-(e?0.045*Math.exp(-((s-0.52)**2)/0.018):0);if(r("ground",je(t,0,1,en(0.01),i),n.shade,o?n.ink:void 0,0.34),!o){let s=[[0,n.shade],[0.18,n.base],[0.39,n.sun],[0.56,ge(n.gleam,n.sun,0.45)],[0.71,n.sun],[0.84,n.mid],[1,n.base]],c=(l)=>(d)=>i(d)*(l+0.11*Math.sin(Math.PI*l)*Math.sin(4.8*d+(e?0.1:1)));for(let l=0;l<28;l++)r("structural-blue-"+l,je(t,0,1,c(l/28),c(Math.min(1,(l+1.08)/28))),tn(s,(l+0.5)/28));for(let l=0;l<12;l++)for(let d=0;d<5;d++){let p=0.15+l*0.066+0.009*Math.cos(d*2),u=0.23+d*0.12+0.035*Math.cos(l*1.7);r("scale-"+l+"-"+d,Z(4,(h)=>t(p+0.01*h,u+0.006*Math.sin(h*Math.PI))),void 0,ge(d%2?n.gleam:n.base,n.sun,0.45),0.19)}}let a=(s)=>[0.335+0.311*s,0.48+0.055*Math.sin(Math.PI*s)];for(let s=0;s<9;s++){let c=0.18+s*0.093,[l,d]=e&&s>=2&&s<=5?a((s-2)/3):[c*0.79+0.065,0.012];if(!o)r("vein-sheen-"+s,Oe(t,l+0.004,c+0.005,d,i(c),-0.025),void 0,n.gleam,0.24);r("vein-"+s,Oe(t,l,c,d,i(c)+0.007,-0.025),void 0,o?n.ink:n.shade,o?0.3:0.42)}if(e){r("discal-crossvein",Z(20,(s)=>t(...a(s))),void 0,o?n.ink:n.shade,0.46);for(let s of[0,1]){let[c,l]=a(s);r("discal-rail-"+s,Oe(t,c*0.67+0.08,c,0.012,l,0.007),void 0,o?n.ink:n.shade,0.43)}for(let s=0;s<5;s++){let c=0.39+s*0.039;r("ivory-apex-"+s,de(t,c,i(c)+0.045,0.008,0.013),n.spot,o?n.ink:void 0,0.22)}}else for(let s=0;s<9;s++){let c=0.22+s*0.075;r("edge-scale-"+s,de(t,c,i(c)+0.019,0.009,0.01),o?n.spot:n.mid,o?n.ink:void 0,0.22)}}function fi(t,e,n,o,r){let i=(s)=>e?0.91-0.1*Math.exp(-((s-0.58)**2)/0.055):0.78-0.065*Math.sin(Math.PI*s);if(r("ground",je(t,0,1,en(0.01),i),n.base,o?n.ink:void 0,0.34),!o){let s=[[0,n.mid],[0.29,n.gleam],[0.62,n.sun],[1,n.base]];for(let c=0;c<15;c++){let l=(d)=>(p)=>i(p)*(d+0.09*Math.sin(d*Math.PI)*Math.sin(5*p));r("butter-scales-"+c,je(t,0,1,l(c/15),l(Math.min(1,(c+1.05)/15))),tn(s,(c+0.5)/15))}for(let c=0;c<11;c++)for(let l=0;l<4;l++){let d=0.16+0.069*c+0.012*Math.sin(l+c),p=0.24+0.128*l+0.029*Math.cos(c*1.7+l);r("dusting-"+c+"-"+l,de(t,d,p,0.004,0.008),ge(n.gleam,n.base,0.35))}}if(e)for(let[s,[c,l,d]]of[[0.24,0.51,0.6],[0.34,0.6,0.65],[0.44,0.68,0.71]].entries()){let p=Z(25,(h)=>t(ne(c,d,h),ne(0.96,l,h)-0.067*Math.sin(h*Math.PI))),u=Z(25,(h)=>t(ne(d,c-0.066,h),ne(l,0.97,h)+0.035*Math.sin(h*Math.PI)));r("tiger-bar-"+s,[...p,...u],o?"#FFFFFF":n.ink,o?n.ink:void 0,0.32)}for(let s=0;s<(e?7:8);s++){let c=0.24+s*(e?0.105:0.095);r("vein-"+s,Oe(t,c*0.67+0.07,c,0.012,i(c)+0.005,0.013),void 0,n.ink,o?0.3:e?0.52:0.72)}let a=e?10:9;for(let s=0;s<a;s++){let c=(e?0.415:0.175)+s*(e?0.055:0.081),l=i(c),d=(p,u,h)=>[...Z(14,(f)=>t(c+u*(f-0.5),p+h*Math.sin(Math.PI*f))),...Z(14,(f)=>t(c+u*(0.5-f),p+h*0.16*Math.sin(Math.PI*f)-0.006))];if(r("crescent-"+s,d(l+(1-l)*(e?0.45:0.34),e?0.038:0.056,e?0.041:0.059),e?n.gleam:n.spot,o?n.ink:void 0,0.24),!e)r("yellow-moon-"+s,d(l+(1-l)*0.74,0.05,0.034),n.sun,o?n.ink:void 0,0.22)}if(!e)r("red-eyespot-rim",de(t,0.84,0.735,0.043,0.073),n.ink),r("red-eyespot",de(t,0.84,0.735,0.029,0.05),n.blush,o?n.ink:void 0,0.22),r("eyespot-glint",de(t,0.832,0.721,0.012,0.011),n.gleam)}function Se(t,e,n,o){let r=t.palettes[e];if(!r)throw Error("Unknown workshop appearance");let i=e==="coloring",a=[{id:"silhouette",points:o.outline.map((h)=>j(h,n)),closed:!0,fill:i?"#FFFFFF":r.ink,stroke:r.ink,weight:0.44}],s={monarch:hi,morpho:mi,swallowtail:fi};for(let h of[-1,1])for(let f of["hind","fore"]){let g=f==="fore",w=g?t.geometry.fore_origin:t.geometry.hind_origin,b=ui(o[f],w,g),y=(x,M,P,B,E=0)=>{a.push({id:(h<0?"left-":"right-")+f+"-"+x,points:M.map((T)=>j(T,n,h)),closed:!!P,fill:P,stroke:B,weight:E})};s[t.species](b,g,r,i,y)}let c=t.geometry,l=c.fore_root_y+5,d=(h,f,g,w,b=0)=>{a.push({id:h,points:f.map((y)=>j(y,n)),closed:!!g,fill:g,stroke:w,weight:b})},p=i?"#FFFFFF":ge(r.ink,"#000000",0.22),u=fe([0,l],[[5.5,l+3,5.3,c.hind_root_y+2,0,c.abdomen_y-2],[-5.3,c.hind_root_y+2,-5.5,l+3,0,l]]);d("abdomen",u,p,r.ink,0.37);for(let h=0;h<5;h++){let f=l+10+h*5,g=3.6-h*0.42;d("abdomen-segment-"+h,fe([-g,f],[[-0.7,f+0.9,0.7,f+0.9,g,f]]),void 0,i?r.ink:ge(r.ink,r.sun,0.62),0.48)}d("thorax",qe(0,l,4.3,7.6),p,r.ink,0.35),d("head",qe(0,l-8.8,3.6,3.65),p,r.ink,0.35);for(let h of[-1,1]){let f=(g)=>[g[0]*h,g[1]];if(d("antenna-"+h,fe([1.55,l-11],[[3,l-14,4.4,c.nose_y+9,3.7,c.nose_y+5]]).map(f),void 0,i?r.ink:r.sun,0.52),d("antenna-club-"+h,qe(h*3.7,c.nose_y+5,0.62,1.55),i?r.ink:r.sun),d("thorax-stripe-"+h,fe([h*1.8,l-4.8],[[h*3.1,l-1.7,h*2.5,l+3,h*1.2,l+5.1]]),void 0,i?r.ink:r.sun,0.58),d("eye-"+h,qe(h*2.3,l-9.1,0.62,0.83),i?r.ink:r.spot),t.species==="monarch")for(let[g,[w,b]]of[[2.6,-5.7],[3,-2.2],[2.8,1.8],[2.1,4.8]].entries())d("thorax-milkspot-"+h+"-"+g,qe(h*w,l+b,0.38,0.54),i?r.ink:r.spot)}return a}var nn=(t,e,n,o,r,i)=>({name:t,unit:e,minimum:n,maximum:o,step:r,description:i}),gi=[nn("span_mm","mm",148,184,2,"Width between the two cut wingtips. Chord and body length stay fixed."),nn("left_trim_deg","degrees",-12,12,2,"Left trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail."),nn("right_trim_deg","degrees",-12,12,2,"Right trailing tab angle from its own wing. Positive bends up, negative down. Look forward from the tail.")],bi=[{appearance_id:"natural",title:"Field colors",ink_usage:"full",description:"Colors and markings inspired by the real butterfly."},{appearance_id:"carnival",title:"Carnival",ink_usage:"full",description:"Candy-bright wings with a contrasting accent."},{appearance_id:"twilight",title:"Twilight",ink_usage:"full",description:"Jewel tones and luminous pale markings."},{appearance_id:"coloring",title:"Color your own",ink_usage:"low",description:"White wing cells with printable outlines to color by hand."}];function pe(t,e,n,o,r,i,a,s){return{ink:t,shade:e,base:n,mid:o,sun:r,gleam:i,spot:a,blush:s}}var yi=pe("#4D4351","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"),wi={baseline_revision:"w1",units:"mm",parameter_definitions:gi,appearance_id:"natural",appearances:bi,rights:{license_expression:"CERN-OHL-W-2.0",license_url:"https://spdx.org/licenses/CERN-OHL-W-2.0.html",attribution:"Open Flight contributors. Original paper airframes under CERN-OHL-W-2.0. Wing artwork and learning text under CC BY-SA 4.0.",status:"original_with_license"}};function on({species:t,name:e,span:n,geometry:o,palettes:r}){return{...wi,model:"butterfly-"+t,species:t,name:e,geometry:o,parameters:{span_mm:n,left_trim_deg:0,right_trim_deg:0},palettes:{...r,coloring:yi}}}var Q=[on({species:"monarch",name:"Monarch",span:172,geometry:{nose_y:9,abdomen_y:84,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.2,36.5],hind_origin:[6.2,37.6],fore_edge:[[21,21,47,13,65,8],[79,3.5,90,0.8,94,2],[98,3,100,7,100,12],[100,22,95,29,87,35],[76,43,64,47,54,50]],hind_edge:[[62,48,73,46,78,51],[83,57,75,67,67,73],[58,80,49,84,39,83],[26,83,14,73,6,69]],tab_x:[28,51],tab_depth_mm:10,clip_rear_from_nose_mm:17,target_dihedral_deg:12},palettes:{natural:pe("#23192C","#9B3625","#FF7916","#F65B1B","#FFAF29","#FFE174","#FFF6CF","#E8553D"),carnival:pe("#3C1943","#9B285D","#F04685","#F8466F","#FF9870","#FFE78F","#FFF9E0","#48D6BC"),twilight:pe("#261D49","#543469","#A86BED","#8851C6","#DE9CED","#FFD09C","#FFF1CB","#EF91B7")}}),on({species:"morpho",name:"Blue Morpho",span:160,geometry:{nose_y:8,abdomen_y:94,root_x:6,fore_root_y:25,hind_root_y:79,fore_origin:[6.3,40],hind_origin:[6.3,41.4],fore_edge:[[20,18.5,34,12,53,7],[69,2,87,0,94,5],[98,8,100,18,100,26],[100,39,93,48,80,51],[75,53,70,54.5,68,55.5]],hind_edge:[[77,54.5,85,54,89,59],[97,70,89,81,78,87],[64,95,48,100,35,96],[20,92,12,86,6,79]],tab_x:[32,57],tab_depth_mm:12,clip_rear_from_nose_mm:18,target_dihedral_deg:16},palettes:{natural:pe("#192840","#2147A1","#1558DB","#337FF7","#18BFEB","#66F4F3","#F4F5DD","#3EEDFA"),carnival:pe("#322B58","#6744AE","#8157EF","#A66DF4","#70DED8","#BAFBE3","#FFF4E5","#C9FF9E"),twilight:pe("#211F4B","#3C3989","#525AD3","#777DEF","#5AC6CB","#ADFFE0","#FEF0CA","#79EBD6")}}),on({species:"swallowtail",name:"Swallowtail",span:180,geometry:{nose_y:9.5,abdomen_y:81,root_x:6,fore_root_y:25,hind_root_y:69,fore_origin:[6.25,36],hind_origin:[6.25,37.4],fore_edge:[[26,21,56,10,80,5],[90,2,96,0.7,100,1.5],[100,7,95,17,91,22],[88,24,88,27,86,29],[81,30,80,33,78,35],[73,36,71,39,68,41],[62,42,59,45,51,48]],hind_edge:[[63,44,76,44,80,49],[80,54,78,57,74,60],[71,59,70,62,68,65],[64,64,63,67,61,69],[60,75,59,88,56,92],[54,94,52,91,52.8,88],[54,81,53,75,51,74],[47,73,47,77,44,78],[40,76,38,81,34,81],[30,80,28,83,25,82],[17,81,10,75,6,69]],tab_x:[21,41],tab_depth_mm:9,clip_rear_from_nose_mm:17,target_dihedral_deg:10},palettes:{natural:pe("#24243C","#B98229","#FFDB3A","#F1BB32","#FFE766","#FFF6A0","#42C8D3","#FC6F44"),carnival:pe("#43233D","#BD6744","#FF8340","#FF9E52","#FFC46A","#FFE3A0","#50E3CE","#EA4B81"),twilight:pe("#271E4B","#7650AA","#BE92E8","#A479DE","#D8B5F3","#EFD7FD","#7DDBE5","#FF9E8F")}})];var _i=["workshop.ts","workshop-art.ts","workshop-models.ts"],rn="butterfly-workshop-w1-"+J(ee.concat(_i.map((t)=>V(new URL(t,"https://print.invalid/packages/geometry/workshop.ts"))))).slice(0,16);function dt(t,e,n,o,r){return{design_id:e,revision_id:n,generator_revision:rn,model:t,parameters:o,appearance_id:r,units:"mm",coordinates:"Nose at top. Edge control x is percent half-span. Edge control y is millimetres. Left and right are seen looking forward from the tail. Positive tab angles bend upward from their own wing."}}function fo(t,e){let n=be(t).outline.map((i)=>j(i,e.span_mm)),o=0;for(let i=0;i<n.length;i++){let[a,s]=n[i],[c,l]=n[(i+1)%n.length];o+=a*l-c*s}let r=Math.abs(o)/2;return{span_mm:e.span_mm,planform_area_mm2:F(r),aspect_ratio:F(e.span_mm**2/r),classification:"computed_geometry"}}function pt(t,e){return(e/2-e*t.geometry.root_x/200)*Math.sin(t.geometry.target_dihedral_deg*Math.PI/180)}function an(t,e,n){let o=be(t),{hinges:r}=Ye(t,o.trailing),i=(r[1][0]-r[0][0])*e/200,a=r[1][1]-r[0][1];return t.geometry.tab_depth_mm*i/Math.hypot(i,a)*Math.sin(n*Math.PI/180)}function sn(t,e,n,o=!1){let r=be(t),i=e.span_mm,a=Se(t,n,i,r),s=t.geometry,c=Ye(t,r.trailing),l=t.palettes[n],d="#272239",p="#FFFEF4";if(!o&&(e.left_trim_deg||e.right_trim_deg)){let[h,f]=c.hinges.map((P)=>j(P,i)),g=f[0]-h[0],w=f[1]-h[1],b=Math.hypot(g,w),y=[-w/b,g/b],x=[e.left_trim_deg,e.right_trim_deg].map((P)=>1-Math.cos(P*Math.PI/180)),M=([P,B])=>{let E=Math.abs(P),T=P<0?0:1;if(!x[T]||E<h[0]||E>f[0])return[P,B];let _=((E-h[0])*y[0]+(B-h[1])*y[1])*x[T];if(_<=0)return[P,B];return[F(Math.sign(P)*(E-_*y[0])),F(B-_*y[1])]};for(let P of a)P.points=P.points.map(M)}let u=(h,f,g)=>{a.push({id:h+"-halo",points:f,stroke:"#FFFEF4",weight:1.42},{id:h,points:f,stroke:"#272239",weight:0.43,dash:g})};if(o){a.push({id:"cut",points:r.outline.map((f)=>j(f,i)),closed:!0,stroke:"#272239",weight:0.53});let h=s.nose_y+s.clip_rear_from_nose_mm;u("clip-rear",[j([-s.root_x+0.4,h],i),j([s.root_x-0.4,h],i)]),u("clip-cross",[j([0,h-2],i),j([0,h+2],i)])}for(let h of[-1,1]){let f=h<0?"left":"right",g=(b)=>j(b,i,h),w=h<0?e.left_trim_deg:e.right_trim_deg;if(o){u("root-fold-"+f,[[s.root_x,s.fore_root_y],[s.root_x,s.hind_root_y]].map((b)=>g(b)),[2.9,1.6]);for(let b=0;b<2;b++)u("tab-slit-"+f+"-"+b,[c.ends[b],c.hinges[b]].map(g));u("tab-hinge-"+f,c.hinges.map(g),[0.55,0.85])}else if(w!==0){let b=Math.abs(an(t,i,w)),y=n==="coloring"?"#80788C":w>0?l.gleam:l.ink,x=[c.fromHinge(0.02,0.18),c.fromHinge(0.98,0.18),c.fromHinge(0.97,b+0.32),c.fromHinge(0.04,b+0.35)];a.push({id:"creased-tab-"+f,points:x.map(g),closed:!0,fill:y},{id:"tab-relief-"+f,points:c.hinges.map(g),stroke:w>0?l.ink:l.gleam,weight:0.26})}}return{lines:a,tab:c,minY:Math.min(...r.outline.map((h)=>h[1])),maxY:Math.max(...r.outline.map((h)=>h[1]))}}function ln(t,e,n){return t.map((o)=>({...o,points:o.points.map(([r,i])=>[F(e+r),F(n+i)])}))}function ut(t){return new globalThis.jspdf.jsPDF(t)}var Fe={A4:[210,297],US_LETTER:[215.9,279.4]},xi={en:["Butterfly Glider","Experimental paper glider","Print at 100% / actual size. Measure the line before cutting.","Solid outline: cut. Dashed roots: fold both wings up equally.","Dotted trim marks: leave flat for the first comparison.","Slide the same paper clip onto the nose. Align its rear end with A or B.","Try plain copier paper. Record the actual paper and clip used.","Calibration","Flat span","Source"],ru:["Планер-бабочка","Экспериментальный бумажный планер","Печатайте в масштабе 100%. Измерьте линию перед вырезанием.","Вырежьте по контуру. По штриховым линиям одинаково поднимите крылья.","Линии мелкого пунктира оставьте плоскими для первого опыта.","Наденьте скрепку на нос. Совместите её задний конец с меткой A или B.","Возьмите офисную бумагу. Запишите, какую бумагу и скрепку использовали.","Контроль масштаба","Размах развёртки","Исходник"],es:["Planeador mariposa","Planeador de papel experimental","Imprime al 100 % en tamaño real. Mide la línea antes de recortar.","Recorta por el contorno continuo. Levanta ambas alas por las líneas de trazos.","Deja planas las aletas marcadas con puntos para la primera comparación.","Desliza el mismo clip por la punta. Alinea su extremo trasero con A o B.","Prueba con papel normal de impresora. Anota el papel y el clip que uses.","Control de escala","Envergadura en plano","Archivo fuente"]};function bo(t,e,n){let[o,r]=Fe[e],i=xi[n],{ref:a,parameters:s,appearance_id:c}=t,{lines:l,labels:d}=Zt(s.span_mm,c,o/2,54),p=(u,h,f,g,w="#23362e")=>d.push({x:u,y:h,text:f,size:g,color:w});p(14,17,"OPEN FLIGHT",3.6,"#486456"),p(14,31,i[0],8.5),p(14,40,i[1]+"  /  "+a.design_id+"  /  "+a.revision_id,3.2),p(14,165,i[8]+"  "+s.span_mm+" mm",3.7),i.slice(3,7).forEach((u,h)=>p(14,177+h*6,u,3.15)),p(14,211,i[7]+"  /  50 mm",3.6),l.push({id:"ruler",points:[[14,218],[64,218]],stroke:"#20382f",weight:0.42});for(let u=0;u<=50;u+=5)l.push({id:"tick-"+u,points:[[14+u,218],[14+u,u%10===0?214.8:216.3]],stroke:"#20382f",weight:0.32});return p(14,227,i[2],3.1),p(14,r-17,i[9]+" SHA-256",2.8),p(14,r-12,a.source_sha256,2.7),p(14,r-7,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",2.5),{width:o,height:r,lines:l,labels:d}}function ki(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function re(t){let{width:e,height:n,lines:o,labels:r}=t,i=o.map((s)=>{let c="M"+s.points.map((l)=>l.join(" ")).join(" L")+(s.closed?" Z":"");return'<path id="'+s.id+'" d="'+c+'" fill="'+(s.fill??"none")+'" stroke="'+(s.stroke??"none")+'" stroke-width="'+(s.weight??0)+'"'+(s.dash?' stroke-dasharray="'+s.dash.join(" ")+'"':"")+"/>"}),a=r.map((s)=>'<text x="'+s.x+'" y="'+s.y+'" font-size="'+s.size+'" fill="'+(s.color??"#23362e")+'">'+ki(s.text)+"</text>");return ee.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+e+'mm" height="'+n+'mm" viewBox="0 0 '+e+" "+n+'" font-family="DejaVu Sans, sans-serif" stroke-linejoin="round">'+[...i,...a].join(`
`)+`</svg>
`)}function yo(t){return re({width:200,height:110,...Zt(t.parameters.span_mm,t.appearance_id,100,7)})}var Fi=new URL("../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","https://print.invalid/packages/print-export/sheets.ts"),Ei=V(new URL("../../node_modules/dejavu-fonts-ttf/LICENSE","https://print.invalid/packages/print-export/sheets.ts"),"utf8"),go;function $e(t,e=[]){let n=new ut({unit:"mm",format:[t.width,t.height],compress:!0,putOnlyUsedFonts:!0,precision:5});n.setCreationDate("D:20000101000000+00'00'");let o=e.length?[t,...e]:t;if(n.setFileId(J(JSON.stringify(o)).slice(0,32)),t.locale)n.setLanguage(t.locale);n.setProperties({title:"Open Flight - Butterfly Glider",author:"Open Flight contributors",subject:`Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0. Embedded font notices:
`+Ei}),go??=V(Fi).toString("base64"),n.addFileToVFS("DejaVuSans.ttf",go),n.addFont("DejaVuSans.ttf","DejaVu","normal"),n.setFont("DejaVu","normal");for(let[r,i]of[t,...e].entries()){if(r)n.addPage([i.width,i.height]);n.setLineJoin("round");for(let a of i.lines){if(a.stroke)n.setDrawColor(a.stroke);if(a.fill)n.setFillColor(a.fill);n.setLineWidth(a.weight??0),n.setLineDashPattern(a.dash??[],0);let s=a.points.map((c,l)=>({op:l?"l":"m",c}));if(n.path(s),a.closed)n.close();if(a.fill&&a.stroke)n.fillStroke();else if(a.fill)n.fill();else n.stroke()}for(let a of i.labels)n.setFontSize(a.size*72/25.4),n.setTextColor(a.color??"#23362e"),n.text(a.text,a.x,a.y)}return ee.from(n.output("arraybuffer"))}var Pi={en:{lab:"BUTTERFLY WORKSHOP",names:{monarch:"Monarch",morpho:"Blue Morpho",swallowtail:"Swallowtail"},flatSpan:"flat wingspan",scale:"Measure this line",print:"Print at 100% / actual size",legend:["Cut","Wing fold","Tab fold"],heading:"Build your butterfly",step:["Cut out the shape","Lift both wings","Clip the nose","Set each tail tab"],cut:["Follow the outside edge and the","two solid slits on each rear tab.","Stop at the dots. Keep the hinge."],fold:["Print side up, nose away. Keep the","center flat. Measure both outer tips."],clip:["Slide one small, blunt paper clip","onto the nose. Stop its back end","at the cross. Keep the clip in place."],tabs:["Read left and right from behind.","Bend each tab from its own wing."],side:["Left","Right"],flat:"flat",up:"up",down:"down",launch:"Launch gently and level in a clear space.",compare:"Try five level glides with flat tabs. Change one tab, then compare five more.",materials:"Use one sheet of plain copier paper and one small paper clip. Record which ones you use.",note:"Experimental paper glider",source:"Source",mm:"mm",sideMark:["L","R"]},ru:{lab:"МАСТЕРСКАЯ БАБОЧЕК",names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},flatSpan:"размах развёртки",scale:"Измерь эту линию",print:"Печать в масштабе 100%",legend:["Разрез","Сгиб крыла","Сгиб закрылка"],heading:"Собери свою бабочку",step:["Вырежи контур","Подними крылья","Надень скрепку","Отогни язычки"],cut:["Вырежи бабочку по контуру.","Сделай по два надреза на закрылках.","Остановись у точек. Сохрани сгиб."],fold:["Рисунком вверх, носом от себя.","Измерь высоту краёв над столом."],clip:["Надень на нос небольшую скрепку","с тупым концом. Совмести её задний","край с крестиком. Оставь её на месте."],tabs:["Смотри на бабочку сзади.","Отгибай закрылок от плоскости крыла."],side:["Левый","Правый"],flat:"ровно",up:"вверх",down:"вниз",launch:"Запускай мягко и ровно на свободном месте.",compare:"Сделай пять запусков с плоскими закрылками. Отогни один и сравни ещё пять полётов.",materials:"Возьми лист обычной офисной бумаги и небольшую скрепку. Запиши, какие именно.",note:"Экспериментальный планер",source:"Исходник",mm:"мм",sideMark:["Л","П"]},es:{lab:"TALLER DE MARIPOSAS",names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Cola de golondrina"},flatSpan:"de envergadura en plano",scale:"Mide esta línea",print:"Imprime al 100 %",legend:["Corte","Pliegue del ala","Pliegue de la aleta"],heading:"Construye tu mariposa",step:["Recorta la forma","Levanta las dos alas","Coloca el clip","Ajusta las aletas"],cut:["Recorta el borde y los dos cortes","cortos de cada aleta de cola.","Para en los puntos. Deja el pliegue."],fold:["Dibujo arriba, punta lejos de ti.","Mide los dos extremos desde la mesa."],clip:["Desliza un clip pequeño por la punta.","Alinea el extremo de atrás con la cruz.","Deja el clip en el mismo sitio."],tabs:["Mira desde atrás para ver los lados.","Dobla cada aleta desde su ala."],side:["Izquierda","Derecha"],flat:"plana",up:"arriba",down:"abajo",launch:"Lanza suave y a nivel en un espacio despejado.",compare:"Haz cinco planeos con las aletas planas. Cambia una aleta y compara otros cinco.",materials:"Usa papel normal de impresora y un clip pequeño. Anota cuáles usaste.",note:"Planeador de papel experimental",source:"Archivo fuente",mm:"mm",sideMark:["I","D"]}},Ai={monarch:"Danaus plexippus",morpho:"Morpho peleides",swallowtail:"Papilio machaon"},G="#252339",se="#525767",Ke="#345C58",cn="#FFFEF6";function Ne(t,e,n,o){return Array.from({length:27},(r,i)=>{let a=2*Math.PI*i/26;return[F(t+Math.cos(a)*n),F(e+Math.sin(a)*o)]})}function vi(t,e){let n=String(Math.round(t*10)/10);return e==="en"?n:n.replace(".",",")}function wo(t,e,n){let o=sn(t,e,n),r=1.75,i=e.span_mm+3.5,a=F(o.maxY-o.minY+3.5);return re({width:i,height:a,lines:ln(o.lines,i/2,1.75-o.minY),labels:[]})}function ht(t,e,n,o){let[r,i]=Fe[n],a=Pi[o],s=t.geometry,{parameters:c,appearance_id:l,ref:d}=e,p=sn(t,c,l,!0),u=45-p.minY,h=ln(p.lines,r/2,u),f=[],g=(k,S,R=G,z=0.4,ie)=>h.push({id:k,points:S,stroke:R,weight:z,dash:ie}),w=(k,S,R,z,ie=0.28)=>h.push({id:k,points:S,closed:!0,fill:R,stroke:z,weight:ie}),b=(k,S,R,z=3.1,ie=G)=>f.push({x:k,y:S,text:R,size:z,color:ie}),y=(k,S,R,z=4.9)=>R.forEach((ie,ve)=>b(k,S+ve*z,ie,3.05)),x=(k,S,R)=>{w("number-ring-"+k,Ne(S+2.6,R-1.3,2.65,2.65),G),b(S+1.71,R-0.23,String(k+1),2.9,"#FFFFFF"),b(S+7.3,R,a.step[k],4.05)},M=t.palettes[l].sun,P=l==="coloring"?G:t.palettes.natural.shade;b(13,12.8,"OPEN FLIGHT",3.35,G),g("brand-divider",[[39,10],[39,13]],se,0.28),b(42,12.8,a.lab,2.8,se),b(12.6,27.1,a.names[t.species],8),b(13,35,Ai[t.species]+"   /   "+c.span_mm+" "+a.mm+" "+a.flatSpan,3.3,se);let B=r-64;b(B,14.3,a.scale+"  ·  50 "+a.mm,3.1),g("ruler",[[B,23.5],[B+50,23.5]],G,0.5);for(let k=0;k<=50;k+=5)g("ruler-tick-"+k,[[B+k,23.5],[B+k,k%10===0?19.6:21.5]],G,0.34);b(B,31.1,a.print,2.95,se),g("masthead-rule",[[13,39.3],[r-13,39.3]],"#C1C8C4",0.28);for(let[k,S]of[-1,1].entries()){let[R,z]=p.tab.fromHinge(0.5,s.tab_depth_mm*0.48),ie=r/2+S*R*c.span_mm/200,ve=u+z;w("tab-badge-"+k,Ne(ie,ve,1.9,1.9),cn),b(ie-0.92,ve+0.95,a.sideMark[k],2.65)}let E=150,T=[13,77,r-72],_=[void 0,[2.9,1.6],[0.55,0.85]];T.forEach((k,S)=>{g("legend-"+S,[[k,E-1],[k+9.5,E-1]],G,0.55,_[S]),b(k+12,E,a.legend[S],3.15)}),g("instruction-rule",[[13,154.8],[r-13,154.8]],"#B7C1BF",0.35),b(13,163.3,a.heading,5.5);let A=r/2+3;x(0,13,172.4),y(13,179,a.cut),g("diagram-tab-trailing",[[16,196.2],[46,196.2]],G,0.42),g("diagram-tab-slit-one",[[21,196.2],[21,192.2]],G,0.52),g("diagram-tab-slit-two",[[39.5,196.2],[39.5,192.2]],G,0.52),g("diagram-tab-fold",[[21,192.2],[39.5,192.2]],Ke,0.48,[0.55,0.85]);for(let[k,S]of[21,39.5].entries())w("diagram-slit-stop-"+k,Ne(S,192.2,0.84,0.84),cn,G,0.4);x(1,A,172.4);let W=s.target_dihedral_deg*Math.PI/180,L=A+27,v=183.5,I=17,we=I*Math.tan(W);g("front-view-datum",[[L-3.2-I,v],[L+3.2+I,v]],se,0.25,[1,1]),g("front-view-fold",[[L-3.2-I,v-we],[L-3.2,v],[L+3.2,v],[L+3.2+I,v-we]],P,0.9),g("front-view-rise",[[L+5.2+I,v-we],[L+5.2+I,v]],G,0.32),g("front-view-rise-left",[[L-5.2-I,v-we],[L-5.2-I,v]],G,0.32);for(let[k,S]of[L-3.2-I,L+3.2+I].entries())w("diagram-outer-tip-"+k,Ne(S,v-we,0.75,0.75),cn,G,0.35);b(L+8+I,v-1.2,s.target_dihedral_deg+"°",3.3),b(L+8+I,v+3.9,"≈ "+Math.round(pt(t,c.span_mm))+" "+a.mm,3.1,Ke),y(A,189.8,a.fold),g("row-rule",[[13,199],[r-13,199]],"#D1D7D1",0.27),x(3,A,208);for(let[k,S]of[c.left_trim_deg,c.right_trim_deg].entries()){let R=A+k*42,ve=S*Math.PI/180,ur=[R+3+20*Math.cos(ve),220-20*Math.sin(ve)];g("gauge-neutral-"+k,[[R,220],[R+26,220]],se,0.31,[1.3,1]),g("gauge-tab-"+k,[[R+3,220],ur],P,0.55),w("gauge-hinge-"+k,Ne(R+3,220,0.75,0.75),G),b(R,215,a.side[k]+"  "+(S>0?"+":"")+S+"°",3.05);let hr=Math.abs(an(t,c.span_mm,S)),mr=S===0?a.flat:vi(hr,o)+" "+a.mm+" "+(S>0?a.up:a.down);b(R,226,mr,2.95,Ke)}y(A,232,a.tabs),x(2,13,208),y(13,215,a.clip);let O=24,C=228.2;g("nose-schematic",[[O-3.5,C+10],[O-3.5,C],[O+3.5,C],[O+3.5,C+10]],se,0.34),g("nose-target",[[O-5.1,C+7],[O+5.1,C+7]],Ke,0.4,[1.1,0.8]),g("nose-cross",[[O,C+5.7],[O,C+8.3]],Ke,0.38),g("clip-illustration",[[O+1.5,C+2],[O+1.5,C-1.1],[O+0.9,C-2.1],[O-1.05,C-2.1],[O-1.9,C-1.1],[O-1.9,C+5.8],[O-1.3,C+7],[O+1.4,C+7],[O+2.1,C+5.8],[O+2.1,C+0.9]],P,0.48),w("clip-color-key",Ne(O+8,C+6.8,0.8,0.8),M,G,0.22),b(O+10,C+7.8,s.clip_rear_from_nose_mm+" "+a.mm,2.95),g("test-rule",[[13,242],[r-13,242]],"#B7C1BF",0.35),b(13,247.5,a.launch,3.1),b(13,252,a.compare,3.1),b(13,256.5,a.materials,2.85,se);let Tt="/v1/designs/"+d.design_id+"/revisions/"+d.revision_id;return b(13,i-17.7,a.source+"  "+Tt,2.6,se),b(13,i-12.8,"SHA-256  "+d.source_sha256,2.55,se),b(13,i-7.8,a.note+"   /   CERN-OHL-W-2.0   /   CC BY-SA 4.0",2.55,se),{width:r,height:i,lines:h,labels:f,locale:o}}var ye=(t)=>Error(t);function Ve(t){if(t===void 0)return;let e=Q.find((n)=>n.species===t);if(!e)throw ye("This butterfly model is unavailable.");return e}var _o=[te,...Q],dn=(t)=>Ve(t)??te,mt=(t)=>t===void 0?Jt:rn;function ft(t){return{span_mm:t.span_mm,left_trim_deg:t.left_trim_deg??0,right_trim_deg:t.right_trim_deg??0}}function gt(t,e,n){let o=Ve(n.species_id),{parameters:r,appearance_id:i}=n,a=o?dt(o,t,e,ft(r),i):po(t,e,r.span_mm,i);return ct(a)}function bt(t){let e=Ve(t.species_id);return e?fo(e,ft(t.parameters)):ho(t.parameters.span_mm)}function xo(t){let e=Ve(t.species_id);return e?wo(e,ft(t.parameters),t.appearance_id):yo(t)}function ko(t,e,n){let o=Ve(t.species_id);return o?ht(o,{...t,parameters:ft(t.parameters)},e,n):bo(t,e,n)}function pn(t,e={},n){let o=dn(t.species_id),r=o.parameter_definitions;for(let[a,s]of Object.entries(e)){let c=r.find((l)=>l.name===a);if(!c)throw ye("Unknown parameter for this butterfly: "+a);if(!Number.isFinite(s)||s<c.minimum||s>c.maximum||!Number.isInteger((s-c.minimum)/c.step))throw ye(`Choose ${a} from ${c.minimum} to ${c.maximum} in increments of ${c.step}.`)}let i=n??t.appearance_id;if(!o.appearances.some((a)=>a.appearance_id===i))throw ye("Select an appearance available for this butterfly.");return{parameters:{...t.parameters,...e},appearance_id:i}}var Mi={en:{title:"Picture guide",span:"Flat wingspan",left:"Left tab",right:"Right tab",paint:"Colors",up:"up",down:"down",flat:"flat",palette:{natural:"Field colors",carnival:"Carnival",twilight:"Twilight",coloring:"Color your own"},look:"Look from behind the tail toward the nose.",page2:"Fold, tune and try",question:"Flight experiment",mm:"mm",reference:"In the wild",model:"Template",source:"Source",photo:"Photo",folds:"Build steps",tipHeight:"Target height at each outer tip",buildNote:"Optional build note: write down which steps needed help and the two tip heights you measured."},ru:{title:"Инструкция с рисунками",span:"Размах развёртки",left:"Левый язычок",right:"Правый язычок",paint:"Цвета",up:"вверх",down:"вниз",flat:"ровно",palette:{natural:"Окрас бабочки",carnival:"Карнавал",twilight:"Сумерки",coloring:"Раскрась сам"},look:"Смотри от хвоста к носу.",page2:"Сложи, настрой и запусти",question:"Опыт с полётом",mm:"мм",reference:"В природе",model:"Шаблон",source:"Исходник",photo:"Фото",folds:"Шаги сборки",tipHeight:"Высота края каждого крыла",buildNote:"По желанию запиши, на каких шагах понадобилась помощь и какой получилась высота с каждой стороны."},es:{title:"Guía ilustrada",span:"Envergadura en plano",left:"Aleta izquierda",right:"Aleta derecha",paint:"Colores",up:"arriba",down:"abajo",flat:"plana",palette:{natural:"Colores naturales",carnival:"Carnaval",twilight:"Atardecer",coloring:"Para colorear"},look:"Mira desde la cola hacia la punta.",page2:"Coloca el clip, ajusta y planea",question:"Experimento de vuelo",mm:"mm",reference:"En la naturaleza",model:"Patrón",source:"Archivo fuente",photo:"Foto",folds:"Pasos de montaje",tipHeight:"Altura de cada extremo",buildNote:"Si quieres, anota en qué pasos necesitaste ayuda y cuánto medía cada extremo."}},q=(t)=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");function Fo(t){let e=/^\/assets\/field-guide\/([a-z0-9-]+\.(svg|jpg))$/.exec(t);if(!e)throw Error("Unknown field-guide illustration");let n=V(new URL("../../apps/editor/assets/field-guide/"+e[1],"https://print.invalid/packages/print-export/build-guide.ts"));return"data:"+(e[2]==="svg"?"image/svg+xml":"image/jpeg")+";base64,"+n.toString("base64")}function Eo(t,e,n,o){let r=t[o],i=Mi[o],a=(b)=>b===0?"0° · "+i.flat:Math.abs(b)+"° "+(b>0?i.up:i.down),s=e.parameters,c=i.palette[e.appearance_id]??e.appearance_id,l=(b,y)=>"<div><dt>"+b+"</dt><dd>"+q(y)+"</dd></div>",d=[l(i.span,s.span_mm+" "+i.mm),l(i.left,a(s.left_trim_deg)),l(i.right,a(s.right_trim_deg)),l(i.paint,c)].join(""),p=Q.find((b)=>b.species===t.id),u=Math.round(pt(p,s.span_mm)),h=r.steps.map((b,y)=>`<section class="step"><span class="number">${y+1}</span>
    <div><h3>${q(b.title)}</h3><p>${q(b.body)}</p>${b.id==="fold"?`<p><strong>${i.tipHeight} · ≈ ${u} ${i.mm}</strong></p>`:""}</div>
    <img src="${Fo(b.diagram)}" alt=""></section>`),f=t.photo.local_path?`<img class="photo" src="${Fo(t.photo.local_path)}" alt="${q(r.photo_alt)}">`:"",g=q(r.common_name),w=q(e.ref.design_id)+" / "+q(e.ref.revision_id);return`<!doctype html><html lang="${o}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
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
<h1>${g}</h1><p><i>${q(t.scientific_name)}</i></p><dl>${d}</dl><p>${i.look}</p>
<h2>${i.folds}</h2>${h.slice(0,3).join("")}
<div class="nature">${f}<div><h3>${i.reference}</h3><p>${q(r.observation)}</p><small>${i.photo} · <a href="${q(t.photo.url)}">${q(t.photo.creator)} · Pixabay</a></small></div></div>
<footer>${i.model} · ${w}</footer></article>
<article><header><b>Open Flight · ${g}</b><span>${i.title} · 2 / 2</span></header><h2>${i.page2}</h2>
${h.slice(3).join("")}<h2>${i.question}</h2><p>${q(r.flight_question)}</p><p>${i.buildNote}</p>
<footer><a href="${q(t.trim_reference.url)}">${q(t.trim_reference.source)}</a> · <a href="${q(t.natural_history.url)}">${q(t.natural_history.source)}</a><br>${i.model} · ${w}<br>${i.source} SHA-256 · ${q(e.ref.source_sha256)}</footer></article></html>`}var Po={monarch:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 12° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 12° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}},morpho:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 16° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 16° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}},swallowtail:{en:{fold:"Put the colored side up and keep the middle strip flat on the table. Fold both wings up along the long dashed lines. Look from behind and match the two sides to 10° above the table.",launch:"Stand in a clear space. Hold the middle strip, level the nose and give a gentle push. Try both tabs flat first. Then lift one tab and repeat from the same spot. Mark where each glide lands."},ru:{fold:"Положи бабочку рисунком вверх и прижми среднюю полоску к столу. Отогни оба крыла вверх по длинным штриховым линиям. Посмотри сзади и выровняй крылья под углом 10° к столу.",launch:"Найди свободное место. Возьми модель за среднюю полоску, держи нос горизонтально и мягко толкни вперёд. Сначала оставь язычки ровными. Затем подними один и повтори запуск с того же места. Отметь места посадки."}}};var Be=JSON.parse(V(new URL("../field-guide/species.json","https://print.invalid/packages/product-core/content.ts"),"utf8")),Si=[["build-en","en","lesson","Build the Butterfly Glider","Cut, fold and set the clip.","content/en/butterfly-001/build.md"],["build-ru","ru","lesson","Соберите планер-бабочку","Вырежьте планер, согните крылья и установите скрепку.","content/ru/butterfly-001/build.md"],["build-es","es","lesson","Construye el planeador mariposa","Recorta, dobla y coloca el clip.","content/es/butterfly-001/build.md"],["garden-gate-en","en","game","Garden Gate","Count gate passes and measure landing error.","games/garden-gate/en.md"],["garden-gate-ru","ru","game","Садовые ворота","Считайте проходы и измеряйте расстояние до цветка.","games/garden-gate/ru.md"],["garden-gate-es","es","game","La puerta del jardín","Cuenta los cruces por la puerta y mide la distancia hasta la flor.","games/garden-gate/es.md"]],Bi=Si.map(([t,e,n,o,r,i])=>{let a=V(new URL("../../"+i,"https://print.invalid/packages/product-core/content.ts"),"utf8");return{ref:{activity_id:t,revision_id:"a1",content_sha256:J(a)},kind:n,title:o,locale:e,aircraft_kinds:["butterfly_glider"],summary:r,content_markdown:a,evidence_classification:n==="game"?"untested_activity":"instruction"}});function Ao(t,e,n){let o=t[e],r=n==="w1"&&e!=="es"?Po[t.id][e]:void 0,i={en:"Build the ",ru:"Соберите планер «",es:"Construye la mariposa "}[e]+o.common_name+(e==="ru"?"»":""),a=["# "+i,o.observation,...o.steps.map((s,c)=>{let l=r&&(s.id==="fold"||s.id==="launch")?r[s.id]:s.body;return"## "+(c+1)+". "+s.title+`

`+l}),o.flight_question,"["+t.photo.creator+" · Pixabay]("+t.photo.url+")","["+t.trim_reference.source+"]("+t.trim_reference.url+")"].join(`

`)+`
`;return{ref:{activity_id:"workshop-"+t.id+"-"+e,revision_id:n,content_sha256:J(a)},kind:"lesson",title:i,locale:e,aircraft_kinds:["butterfly_glider"],summary:o.flight_question,evidence_classification:"instruction",content_markdown:a,species_id:t.id}}var Ii=Be.flatMap((t)=>["en","ru","es"].map((e)=>Ao(t,e,"w2"))),Ti=Be.flatMap((t)=>["en","ru"].map((e)=>Ao(t,e,"w1"))),vo=[...Bi,...Ii].sort((t,e)=>t.ref.activity_id<e.ref.activity_id?-1:t.ref.activity_id>e.ref.activity_id?1:0);function Mo(t,e){let n=(o)=>o.ref.activity_id===t&&o.ref.revision_id===e;return vo.find(n)??Ti.find(n)}function yt(t,e){return vo.filter((n)=>(!e||n.locale===e)&&(n.kind==="game"||("species_id"in n?n.species_id===t:t===void 0)))}function So(t,e,n="en"){let o=e?.species_id,r=e?.parameters;return{schema_version:1,record_type:"flight_test",test_id:t.design_id+"-"+t.revision_id+"-planned",status:"planned",is_example:!1,evidence_kind:"physical",design:{design_id:t.design_id,revision:t.revision_id,source_sha256:t.source_sha256},protocol:{protocol_id:o?"wing-trim":"clip-position",revision:o?"w1":"b1",acceptance_rule:null,defined_at:null},setup:{aircraft_instance_id:null,material_spec:null,finished_mass_g:null,balance_mm_from_nose:null,launch_method:null,release_height_m:null,environment:null},performed_at:null,performed_by:null,trials:[],evidence_artifacts:[],review:{decision:"pending",reviewer:null,reviewed_at:null},notes:o&&r?n==="ru"?`Размах развёртки ${r.span_mm} мм. Если смотреть сзади, левый клапан ${r.left_trim_deg}°, правый ${r.right_trim_deg}°. Плюс означает сгиб вверх. Сравните плоские клапаны с одним изменённым. Чередуйте настройки по пять бросков с одной высоты. Используйте те же бумагу и скрепку. Запишите направление и место посадки при каждой попытке.`:n==="es"?`Montaje previsto de ${o}, envergadura en plano de ${r.span_mm} mm. Desde atrás, aleta izquierda ${r.left_trim_deg}° y derecha ${r.right_trim_deg}°. El signo + indica hacia arriba. Empieza con las aletas planas. Compara cinco lanzamientos con cada ajuste, cambiando una sola aleta. Mantén el mismo papel, clip y altura. Anota la dirección y el primer contacto con el suelo en cada intento.`:`Planned ${o} build, ${r.span_mm} mm flat span. Set left trim to ${r.left_trim_deg}° and right trim to ${r.right_trim_deg}°, viewed from behind (positive up). Start with flat tabs and change one tab. Alternate five gentle releases of each configuration with the same paper, clip and height. Record every landing and observed direction.`:{en:"Plan only. Record the actual station, stock, print calibration and launch conditions with the raw observations.",ru:"Запишите положение скрепки, бумагу, контроль масштаба и условия запуска вместе с наблюдениями.",es:"Anota la posición del clip, el papel, la escala de impresión y las condiciones de lanzamiento junto con las observaciones."}[n]}}function un(t,e,n,o,r,i,a,s,c){let l=dn(c),d={parameters:o,appearance_id:r,species_id:c},p=gt(t,e,d),u={design_id:t,revision_id:e,source_sha256:J(p)};return{source:p,dto:{ref:u,head_revision_id:e,name:n,kind:"butterfly_glider",...c?{species_id:c}:{},visibility:i?"private":"public",parameters:o,parameter_definitions:l.parameter_definitions,appearance_id:r,supported_appearances:l.appearances,evidence_state:i?"modified_experiment":"concept",evidence_record_ids:[],geometry:bt(d),created_at:s,provenance:{origin:a,parent:i,generator_revision:mt(c),rights:l.rights}}}}function Bo(t,e,n){let{dto:o,source:r}=t,i=yt(o.species_id,e.locale),a=(e.activities??[]).map((c)=>{let l=i.find((d)=>d.ref.activity_id===c.activity_id&&d.ref.revision_id===c.revision_id&&d.ref.content_sha256===c.content_sha256);if(!l)throw ye("Select an exact activity revision in the requested language.");return l}),s=e.formats.some((c)=>c==="pdf"||c==="svg")?ko(o,e.page_size,e.locale):void 0;for(let c of e.formats)switch(c){case"svg":n("print-svg","image/svg+xml",re(s));break;case"pdf":n("print-pdf","application/pdf",$e(s));break;case"source_json":n("source","application/json",r);break;case"trial_sheet":n("trial","application/json",JSON.stringify(So(o.ref,o,e.locale),null,2)+`
`);break;case"illustrated_guide":{let l=Be.find((p)=>p.id===o.species_id);if(!l)throw ye("The picture guide is available for the three workshop butterflies.");let d=i.find((p)=>p.kind==="lesson");n("guide","text/html",Eo(l,o,e.page_size,e.locale),[d.ref]);break}case"instructions":case"activity_assets":{let l=c==="instructions"?"lesson":"game",p=(a.length?a:i).filter((u)=>u.kind===l);if(!p.length)throw ye("Select a matching "+l+" for "+c+" or omit the activity filter.");for(let u of new Set(p)){let h=o.ref.design_id+" / "+o.ref.revision_id+" / "+o.ref.source_sha256+`

`;n(l,"text/markdown",h+u.content_markdown,[u.ref])}break}}}var To=["cut","center","wings","table","clip","launch"],hn={en:[["Cut out your butterfly","Start with the colors up and the nose pointing away. Cut only around the outside edge. Keep the paper between the wings whole. Ask a helper to cut around the tight corners.","The butterfly is one piece, with three fold lines down the middle."],["Bring the wingtips together","Lift both wings until the tips meet and the colored faces touch. Pinch the dotted center crease from nose to tail.","The tips line up and the colors are inside."],["Fold each wing back","Ask a helper to pinch the folded strip, or hold it with one hand. Fold one whole wing out along its dash-dot line, then the other.","Each wing has its own crease, and the two layers of the strip still touch."],["Set the wings flat","Place the butterfly color-side down on a flat table. Keep the folded strip standing straight up as you gently press both wings onto the table.","Both wings touch the table. The folded strip stands between them."],["Turn over and add the clip","Turn it color-side up, with the folded strip underneath. Slide a small rounded paper clip (about 6–8 mm wide) onto the nose so it grips both layers. Look from the side and stop with the back of the clip directly under the dots by the folds.","The clip holds both layers. Both wings sit at the same height."],["Let it glide","Hold the folded strip just behind the clip. Point the nose straight ahead with both wings level, then let go with a gentle forward push.","Watch where it touches down first. Point to that spot, or mark it and compare five launches."]],es:[["Recorta tu mariposa","Pon los colores hacia arriba y apunta la punta hacia delante. Recorta solo el borde de fuera. Deja entera la parte entre las alas. Pide ayuda para recortar las esquinas más cerradas.","La mariposa queda en una sola pieza, con tres líneas de doblez en el centro."],["Junta las puntas de las alas","Levanta las dos alas hasta juntar sus puntas y las caras de color. Marca con los dedos el doblez central de puntos, de la punta a la cola.","Las puntas coinciden y el color queda dentro."],["Dobla cada ala hacia fuera","Pide ayuda para sujetar la tira doblada o sujétala con una mano. Dobla un ala entera hacia fuera por su línea de rayas y puntos, y luego la otra.","Cada ala tiene su propio doblez y las dos capas de la tira siguen juntas."],["Apoya las alas en la mesa","Pon la mariposa con el color hacia abajo sobre una mesa plana. Mantén la tira doblada de pie y presiona suavemente las dos alas contra la mesa.","Las dos alas tocan la mesa. La tira doblada queda de pie entre ellas."],["Dale la vuelta y pon el clip","Dale la vuelta para dejar el color arriba y la tira doblada debajo. Desliza un clip pequeño y redondeado (de unos 6–8 mm de ancho) en la punta, abrazando las dos capas. Mira de lado y deja el extremo trasero del clip justo debajo de los puntos junto a los dobleces.","El clip agarra las dos capas. Las alas quedan a la misma altura."],["Deja que planee","Sujeta la tira doblada justo detrás del clip. Apunta la punta hacia delante con las alas a la misma altura, y suelta la mariposa con un empujón suave.","Mira dónde toca el suelo por primera vez. Señala ese lugar, o márcalo y compara cinco lanzamientos."]],ru:[["Вырежи бабочку","Положи лист цветной стороной вверх, носом от себя. Вырежи бабочку только по внешнему краю. Оставь бумагу между крыльями целой. Попроси взрослого помочь с крутыми поворотами.","Бабочка осталась целой, а в центре видны три линии сгиба."],["Соедини кончики крыльев","Подними оба крыла, чтобы их кончики совпали, а цветные стороны соприкоснулись. Прижми пальцами сгиб по точкам от носа до хвоста.","Кончики совпадают, цветные стороны внутри."],["Отогни каждое крыло","Попроси взрослого придержать сложенную полоску или зажми её одной рукой. Отогни одно крыло целиком наружу по линии из штрихов и точек, потом второе.","У каждого крыла свой сгиб, а слои полоски прижаты друг к другу."],["Уложи крылья на стол","Положи бабочку цветной стороной вниз на ровный стол. Держи сложенную полоску торчком и мягко прижми оба крыла к столу.","Оба крыла касаются стола. Сложенная полоска стоит между ними."],["Переверни и надень скрепку","Переверни бабочку цветной стороной вверх, чтобы сложенная полоска оказалась снизу. Надень на нос маленькую закруглённую скрепку шириной около 6–8 мм, захватив оба слоя. Посмотри сбоку. Задний край скрепки должен быть прямо под точками у сгибов.","Скрепка держит оба слоя. Крылья на одной высоте."],["Отпусти бабочку в полёт","Держи сложенную полоску сразу за скрепкой. Направь нос прямо перед собой, выровняй крылья и отпусти бабочку лёгким толчком вперёд.","Заметь, где бабочка впервые коснулась пола. Покажи это место или отметь его и сравни пять запусков."]]},Li={en:{pattern:"Printed side up",center:"Center fold",wings:"Wing folds",rear:"From tail toward nose",side:"Side view",start:"Start",finish:"Finish",table:"Table",strip:"Folded strip",mark:"Back of clip",grip:"Hold here",nose:"Nose",mm:"mm"},es:{pattern:"Color hacia arriba",center:"Doblez central",wings:"Dobleces de las alas",rear:"De la cola a la punta",side:"Vista lateral",start:"Inicio",finish:"Final",table:"Mesa",strip:"Tira doblada",mark:"Parte trasera del clip",grip:"Sujeta aquí",nose:"Punta",mm:"mm"},ru:{pattern:"Цветом вверх",center:"Сгиб в центре",wings:"Сгибы крыльев",rear:"Вид от хвоста к носу",side:"Вид сбоку",start:"Начало",finish:"Конец",table:"Стол",strip:"Сложенная полоска",mark:"Задний край скрепки",grip:"Держи здесь",nose:"Нос",mm:"мм"}};function Lo(t="en"){return(Object.hasOwn(hn,t)?hn[t]:hn.en).map(([n,o,r],i)=>({id:To[i],title:n,action:o,check:r}))}var ue="#222432",Io="#17664d",mn="#963512",Co="1 5",fn="8 4 1 4",Ci="#eadac4",gn=(t)=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;"),Ie=([t,e])=>`${t.toFixed(2)},${e.toFixed(2)}`,Ue=(t)=>`M ${t.map(Ie).join(" L ")}`,Y=(t,e,n,o="middle")=>`<text x="${t}" y="${e}" text-anchor="${o}">${gn(n)}</text>`,Xe=(t,e)=>`<path d="${Ue(t)}" fill="none" stroke="${ue}" stroke-width="2" stroke-linecap="round" stroke-dasharray="${e}"/>`;function Ee(t,e,n){let o=Math.atan2(n[1]-e[1],n[0]-e[0]),r=[-0.52,0.52].map((i)=>[n[0]-Math.cos(o+i)*9,n[1]-Math.sin(o+i)*9]);return`<path d="M ${Ie(t)} Q ${Ie(e)} ${Ie(n)} M ${Ie(r[0])} L ${Ie(n)} L ${Ie(r[1])}" fill="none" stroke="${mn}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`}function Ri(t,e){let n=t.replace("<svg ",'<svg x="20" y="25" width="360" height="184" aria-hidden="true" ').replaceAll(' id="',' id="lesson-');return`${Y(200,17,e.pattern)}
    ${n}
    ${Xe([[20,223],[46,223]],Co)}${Y(53,228,e.center,"start")}
    ${Xe([[211,223],[237,223]],fn)}${Y(244,228,e.wings,"start")}`}function wt(t,e,n,o,r,i,a,s){let c=i?1:-1,l=e+c*s*Math.sin(o),d=Math.max(2,s*Math.cos(o));return[-1,1].map((p)=>{let u=[t+p*d,l],h=[u[0]+p*n*Math.cos(r),l+c*n*Math.sin(r)],f=[u,h].map(([g,w])=>[g-1.3*p*Math.sin(r),w+1.3*c*Math.cos(r)]);return`<path d="${Ue([[t,e],u])}" fill="none" stroke="${ue}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="${Ue([u,h])}" fill="none" stroke="${ue}" stroke-width="6" stroke-linecap="round"/>
      <path d="${Ue([u,h])}" fill="none" stroke="#fff9ec" stroke-width="3.4" stroke-linecap="round"/>
      <path d="${Ue(f)}" fill="none" stroke="${a}" stroke-width="1.7" stroke-linecap="round"/>`}).join("")}function Di(t,e,n,o){let r=Math.PI/2,i=t===1;return`${Y(200,30,e.rear)}
    ${Y(100,69,e.start)}${Y(300,69,e.finish)}
    <path d="M200 55v145" stroke="#ddd2c1"/>
    ${wt(100,174,62,i?0:r,i?0:r,!1,n,o)}
    ${wt(300,174,62,r,i?r:0,!1,n,o)}
    ${i?`
      ${Ee([31,162],[31,129],[64,113])}${Ee([169,162],[169,129],[136,113])}
      ${Xe([[100,182],[100,200]],Co)}${Y(100,219,e.center)}
    `:`
      ${Ee([91,101],[55,96],[43,132])}${Ee([109,101],[145,96],[157,132])}
      ${Xe([[74,169],[91,160]],fn)}${Xe([[126,169],[109,160]],fn)}
      ${Y(100,219,e.wings)}
    `}`}function Oi(t,e,n){return`${Y(200,30,t.rear)}
    <path d="M28 145 H372 V186 H28 Z" fill="#eadac4"/>
    <path d="M28 145 H372" stroke="${ue}" stroke-width="2"/>
    ${wt(200,145-n,121,Math.PI/2,0,!0,e,n)}
    ${Ee([75,83],[75,102],[75,125])}${Ee([325,83],[325,102],[325,125])}
    <path d="M200 117V89" fill="none" stroke="${ue}" stroke-width="1.4"/>
    ${Y(200,82,t.strip)}${Y(200,173,t.table)}`}function ji(t,e,n,o,r){let i=t===5,a=82,s=143,c=Math.min(3.15,280/n.body_length_mm),l=82+n.clip_station_mm*c,d=82+n.body_length_mm*c,p=n.keel_depth_mm*c,u=i?l+32:l;return`${Y(200,27,e.rear)}
    ${wt(200,86,110,Math.PI/2,0,!1,o,r)}
    <path d="M196 75v10q4 10 8 0v-10" fill="none" stroke="${mn}" stroke-width="2.4"/>
    ${Y(200,121,e.side)}
    <path d="${Ue([[82,143],[d,143],[d,143+p],[82,143+p]])} Z" fill="${Ci}" stroke="${ue}" stroke-width="1.8"/>
    <path d="M82 143H${d}" stroke="${o}" stroke-width="4"/>
    ${i?"":`<circle cx="${l}" cy="143" r="3" fill="${Io}"/><path d="M${l} 147v15" stroke="${Io}" stroke-dasharray="2 2"/>`}
    <path d="M${l} 161H85a6 6 0 0 1 0 -12h${l-82-10}a3 3 0 0 1 0 6h-${l-82-17}" fill="none" stroke="${ue}" stroke-width="2.5" stroke-linecap="round"/>
    ${i?`<circle cx="${u}" cy="156" r="7" fill="${mn}"/>${Ee([74,155],[56,155],[34,155])}`:`${Ee([31,155],[52,155],[74,155])}`}
    <path d="M${u} 171v18h9" fill="none" stroke="${ue}" stroke-width="1.4"/>
    ${Y(u+13,194,i?e.grip:e.mark,"start")}
    ${i?Y(79,124,e.nose):`<path d="M82 209v8m0-4h${l-82}m0-4v8" stroke="${ue}"/>${Y(l+10,218,`${n.clip_station_mm} ${e.mm}`,"start")}`}`}function Ro(t,e,n,o){let r=t.locale,i=Number.isInteger(e)&&e>=0&&e<To.length?e:0,a=Li[r],{title:s,action:c,check:l}=t.steps[i],d=1.875*t.keel_depth_mm,p;if(i===0)p=Ri(o(),a);else if(i<3)p=Di(i,a,n,d);else if(i===3)p=Oi(a,n,d);else p=ji(i,a,t,n,d);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" role="img" lang="${r}" aria-label="${gn(`${s}. ${c} ${l}`)}" font-family="system-ui, sans-serif" font-size="14" fill="${ue}">
    <title>${gn(s)}</title>
    <rect width="400" height="240" rx="12" fill="#fffdf7"/>
    ${p}
  </svg>`}var Pe=6;var ks=Object.freeze(["cut","whole"]);var Do={en:{title:"Back of the sheet",flip:(t)=>"Print both pages double-sided, flipping on the "+(t?"short":"long")+" edge, to see the fold lines on both faces.",swap:"Folds that are valleys on the front are mountains here.",check:"Hold the sheet to a window: each pair of crosses should overlap."},ru:{title:"Оборот листа",flip:(t)=>"Печатайте обе страницы с двух сторон, переворот по "+(t?"короткому":"длинному")+" краю: линии сгибов будут видны с обеих сторон.",swap:"Сгибы «долиной» на лицевой стороне здесь становятся «горой».",check:"Посмотрите лист на просвет: кресты должны совпасть."},es:{title:"Reverso de la hoja",flip:(t)=>"Imprime las dos páginas a doble cara, girando por el borde "+(t?"corto":"largo")+", para ver las líneas en las dos caras.",swap:"Los dobleces en valle de la cara impresa aquí son en montaña.",check:"Mira la hoja a contraluz: cada par de cruces debe coincidir."}};function _t(t,e=!1){let n=Do[t]??Do.en;return{title:n.title,lines:[n.flip(e),n.swap,n.check]}}var Oo=8,_n=Q[0].parameter_definitions.find(({name:t})=>t==="span_mm"),$i=Q.map(({species:t})=>t);function jo(t){let{minimum:e,maximum:n,step:o}=_n;return Number.isInteger(t)&&t>=e&&t<=n&&(t-e)%o===0}var Ni="experimental_unvalidated",N="#272239",$o="#005A8D",Je="#813842",H="#254A36",bn="#FFFEF4",yn=[0.65,1.05],wn=[2.8,0.9,0.55,0.9];function kt(t){let e=Q.find((n)=>n.species===t);if(!e)throw Error("Unknown folded butterfly species");return e}function No(t={},e="en"){let{format:n="open-flight-folded-butterfly",revision:o="k1",species:r="monarch",appearance_id:i="natural",paper:a="A4"}=t;if(n!=="open-flight-folded-butterfly")throw Error("Unknown folded butterfly source format");if(o!=="k1")throw Error("Unknown folded butterfly revision");let s=kt(r),{span_mm:c=s.parameters.span_mm}=t;if(!jo(c)){let{minimum:u,maximum:h,step:f}=_n;throw Error(`Finished span must be from ${u} to ${h} mm in ${f} mm increments`)}if(!Object.hasOwn(s.palettes,i))throw Error("Unknown butterfly appearance");if(!Object.hasOwn(Fe,a))throw Error("Unknown paper size");if(!Object.hasOwn(Ze,e))throw Error("Unknown print locale");let{nose_y:l,abdomen_y:d,clip_rear_from_nose_mm:p}=s.geometry;return{format:n,revision:o,species:r,span_mm:c,appearance_id:i,paper:a,locale:e,keel_depth_mm:Oo,flat_span_mm:c+2*Oo,clip_station_mm:p,body_length_mm:d-l,nose_y_mm:l,abdomen_y_mm:d,evidence:Ni,steps:Lo(e)}}function Ft(t){let e=kt(t.species),n=be(e),{nose_y_mm:o,abdomen_y_mm:r,keel_depth_mm:i,clip_station_mm:a}=t,s=(x)=>([M,P])=>[F(M+x*i),P],c=n.outline.map((x)=>j(x,t.span_mm)),l=c.findIndex(([x,M])=>x===0&&M===r),d=c.slice(0,l+1).map(s(1)),p=[c[l],...c.slice(l+1),c[0]].map(s(-1)),u=[...d,...p],h=[[-i,o],[i,o],[i,r],[-i,r]],f=[-i,0,i].map((x)=>({id:x===0?"center-valley":x<0?"left-mountain":"right-mountain",points:[[x,o],[x,r]],dash:x===0?yn:wn,stroke:x===0?$o:Je,weight:0.46})),g=[-1,1].map((x)=>({id:x<0?"left-clip-stop":"right-clip-stop",points:[[x,o+a],[x*(i-1),o+a]],stroke:H,weight:0.56})),w=[-1,1].map((x)=>({id:x<0?"left-clip-shoulder":"right-clip-shoulder",points:Array.from({length:16},(M,P)=>{let B=P*Math.PI/8;return[F(x*(i+2.3)+0.65*Math.cos(B)),F(o+a+0.65*Math.sin(B))]}),closed:!0,fill:H,stroke:bn,weight:0.45})),b=Se(e,t.appearance_id,t.span_mm,n),y=[{id:"paper-web",points:h,closed:!0,fill:"#FFFFFF"},{...b[0],id:"wing-background",points:d,stroke:void 0},{...b[0],id:"wing-background-left",points:p,stroke:void 0}];for(let x of b.slice(1))for(let M of[-1,1]){let P=Ui(x,M);for(let[B,E]of P.entries())y.push({...x,id:x.id+(M<0?"-l-":"-r-")+B,points:E.map(s(M))})}for(let x of[...f,...g])y.push({...x,id:x.id+"-halo",weight:1.25,stroke:bn,dash:void 0},x);return y.push(...w),y.push({id:"cut",points:u,closed:!0,stroke:N,weight:0.52}),{outline:u,web:h,left:p,right:d,originalOutline:c,creases:f,clipStops:g,shoulders:w,lines:y}}function Ui(t,e){let n=t.points,o=([s])=>s*e>=0;if(n.every(o))return[n];if(!n.some(([s])=>s*e>0))return[];let r=([s,c],[l,d])=>[0,F(c-(d-c)*s/(l-s))];if(t.closed){let s=n.flatMap((c,l)=>{let d=n[(l+n.length-1)%n.length],p=o(d)===o(c)?[]:[r(d,c)];if(o(c))p.push(c);return p});return s.length>=3?[s]:[]}let i=[],a=o(n[0])?[n[0]]:[];for(let s=1;s<n.length;s++){let c=n[s-1],l=n[s];if(o(c)!==o(l)){if(a.push(r(c,l)),!o(l)){if(a.length>1)i.push(a);a=[]}}if(o(l))a.push(l)}if(a.length>1)i.push(a);return i}var Ze={en:{names:{monarch:"Monarch",morpho:"Blue morpho",swallowtail:"Swallowtail"},note:"Experimental folded body · Physical build and flight trials pending",print:"Print at 100% / actual size. Measure this line before cutting.",labels:["Cut","Center valley","Wing mountains","Clip stop"],build:"Build with scissors and one small rounded paper clip",span:"finished span",flat:"flat span",rear:"View from tail toward nose",guide:"How to build and launch",next:"Open page 2 for illustrated steps.",gauge:"Full-size nose and clip gauge",gaugeHelp:"Place the folded body on its side. Match its nose to the left line.",gaugeStop:"The back end of the clip should meet the green line.",nose:"Nose",clip:"Back of clip",assembledTop:"Assembled · top view",assembledRear:"Tail view · both wings level",keelLayers:"Two layers touch"},es:{names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Cola de golondrina"},note:"Cuerpo plegado experimental · Pendiente de probar en papel y en vuelo",print:"Imprime al 100 % en tamaño real. Mide esta línea antes de recortar.",labels:["Corte","Doblez central","Dobleces de alas","Tope del clip"],build:"Construye con tijeras y un clip pequeño y redondeado",span:"envergadura final",flat:"envergadura en plano",rear:"Vista de la cola a la punta",guide:"Cómo construir y lanzar",next:"Consulta la página 2 para ver los pasos ilustrados.",gauge:"Guía del clip a tamaño real",gaugeHelp:"Apoya de lado el cuerpo plegado. Alinea su punta con la línea izquierda.",gaugeStop:"El extremo trasero del clip debe llegar a la línea verde.",nose:"Punta",clip:"Extremo trasero",assembledTop:"Plegada · vista superior",assembledRear:"Desde la cola · alas al mismo nivel",keelLayers:"Las dos capas se tocan"},ru:{names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},note:"Опытный сложенный корпус · Сборку и полёт ещё предстоит испытать",print:"Печатай в масштабе 100%. Перед вырезанием измерь эту линию.",labels:["Разрез","Сгиб в центре","Сгибы крыльев","Метка скрепки"],build:"Для сборки нужны ножницы и небольшая закруглённая скрепка",span:"размах крыльев",flat:"размах развёртки",rear:"Вид от хвоста к носу",guide:"Сборка и запуск",next:"На странице 2 — пошаговые рисунки.",gauge:"Шкала для скрепки в натуральную величину",gaugeHelp:"Положи сложенный корпус набок. Совмести нос с левой линией.",gaugeStop:"Задний край скрепки должен совпасть с зелёной линией.",nose:"Нос",clip:"Задний край",assembledTop:"В сборе · вид сверху",assembledRear:"Вид с хвоста · крылья на одном уровне",keelLayers:"Два слоя соприкасаются"}};function He(t,e,n,o=1){return t.map((r)=>({...r,points:r.points.map(([i,a])=>[F(e+o*i),F(n+o*a)])}))}function xt(t,e){let n=[],o="";for(let r of t.split(" ")){let i=o?o+" "+r:r;if(o&&i.length>e)n.push(o),o=r;else o=i}if(o)n.push(o);return n}function Uo(t,e,n){let o=[],r=(a,s,c=N,l=0.48)=>o.push({id:t+"-"+a,points:s,stroke:c,weight:l}),i=(a,s)=>{r(a,s,Je);let[c,l]=s.at(-1),[d,p]=s.at(-2),u=Math.atan2(l-p,c-d),h=(f)=>[c-1.45*Math.cos(u+f),l-1.45*Math.sin(u+f)];r(a+"-tip",[h(0.48),[c,l],h(-0.48)],Je)};if(t==="cut"){let s=Math.min(...n.outline.map((c)=>c[1]));r("shape",n.outline.map(([c,l])=>[c*0.11,(l-s)*0.11])),o[0].closed=!0;for(let c of n.creases)r(c.id,c.points.map(([l,d])=>[l*0.11,(d-s)*0.11]),c.stroke,0.32)}else if(t==="center")r("paper",[[-12,5],[-4,5],[0,5],[4,5],[12,5]]),r("valley",[[0,4.45],[0,5.55]],$o,0.85),i("left-arrow",[[-12,4],[-10,1.8],[-7,0.5]]),i("right-arrow",[[12,4],[10,1.8],[7,0.5]]);else if(t==="wings")r("pinched",[[-1,7],[-1,2],[-1,0]],N),r("pinched-other",[[1,7],[1,2],[1,0]],N),r("crease",[[-1,3],[1,3]],Je,0.65),i("left-arrow",[[-2,1],[-6,1.5],[-10,4]]),i("right-arrow",[[2,1],[6,1.5],[10,4]]);else if(t==="table")r("table",[[-15,6.5],[15,6.5]],"#66736F",0.7),r("paper",[[-12,6],[-0.55,6],[-0.55,0.5],[0.55,0.5],[0.55,6],[12,6]]),i("left-press",[[-8,0],[-8,4.9]]),i("right-press",[[8,0],[8,4.9]]);else if(t==="clip"){let s=-12+e.clip_station_mm*0.69;r("wall",[[-12,0.5],[13,0.5],[13,7.5],[-12,7.5],[-12,0.5]]),r("stop",[[s,1.1],[s,6.9]],H,0.52),r("clip",[[-13.8,4.6],[s-1.2,4.6],[s,3.8],[s-1.2,3],[-12.65,3]],Je,0.62)}else r("level",[[-12,1.5],[0,1.5],[12,1.5]]),r("grip",[[-0.48,1.5],[-0.48,7.1],[0.48,7.1],[0.48,1.5]]),r("finger-left",[[-3.2,4.7],[-2.1,6.15],[-0.55,6.15]],H),r("finger-right",[[3.2,4.7],[2.1,6.15],[0.55,6.15]],H);return o}function Ho(t,e,n=!1){let[o,r]=Fe[t.paper],i=Ze[t.locale],a=He(e.lines,o/2,29),s=[],c=(d,p,u,h,f=N)=>s.push({x:d,y:p,text:u,size:h,color:f});c(9,10,"OPEN FLIGHT  /  K1",3.2,H),a.push(...zo(o,!1)),c(9,18,i.names[t.species],6.1),c(9,24,i.note,2.8),c(9,28.6,`${t.span_mm} mm ${i.span}  ·  ${t.flat_span_mm} mm ${i.flat}`,2.6);let l=[{id:"key-cut",stroke:N,weight:0.52},{...e.creases[1],id:"key-center"},{...e.creases[0],id:"key-wings"},{...e.clipStops[0],id:"key-clip"}];for(let[d,p]of l.entries()){let u=9+d*((o-18)/l.length);a.push({...p,points:[[u,132],[u+10,132]]}),c(u+12,133,i.labels[d],2.6)}a.push({id:"ruler",points:[[9,143],[59,143]],stroke:N,weight:0.44});for(let d=0;d<=50;d+=5)a.push({id:"ruler-tick-"+d,points:[[9+d,143],[9+d,d%10===0?140.2:141.3]],stroke:N,weight:0.32});if(c(62,143.5,"50 mm  ·  "+i.print,2.85),c(9,151,i.build,3.45,H),n){c(9,157,i.next,3.35,H);let d=(o-18)/2;t.steps.forEach((f,g)=>c(9+g%2*d,169+Math.floor(g/2)*9,g+1+". "+f.title,3.8));let p=10,u=218,h=p+t.clip_station_mm;a.push({id:"gauge-wall",points:[[p,u],[p+39,u],[p+39,u+8],[p,u+8]],closed:!0,fill:"#E6EEEB",stroke:"#788F84",weight:0.29},{id:"gauge-nose",points:[[p,u-1.3],[p,u+9.3]],stroke:N,weight:0.44},{id:"gauge-clip-stop",points:[[h,u-1.3],[h,u+9.3]],stroke:H,weight:0.62}),c(p,202,i.gauge,4.5),c(p,u+15,i.nose,2.75),c(h,u+15,i.clip,2.75,H),c(p,u+21,t.clip_station_mm+" mm",3.2),c(58,u+2.1,i.gaugeHelp,3.3),c(58,u+8.1,i.gaugeStop,3.3)}else{c(9,155.5,i.rear+" (2–4, 6)",2.35);let d=(o-18)/2;for(let[p,u]of t.steps.entries()){let h=9+p%2*d,f=163+Math.floor(p/2)*36;a.push(...He(Uo(u.id,t,e),h+17,f-4.7)),c(h,f+9,p+1+". "+u.title,3);let g=f+13.7;for(let w of xt(u.action,67))c(h,g,w,2.43),g+=3.25;g+=0.5;for(let w of xt(u.check,67))c(h,g,w,2.43,H),g+=3.25}}return c(9,r-Pe-1.5,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",2.2),{width:o,height:r,lines:a,labels:s,locale:t.locale}}function Wo(t,e){let[n,o]=Fe[t.paper],r=Ze[t.locale],i=[],a=[{x:9,y:10,text:"OPEN FLIGHT  /  K1",size:3.2,color:H},{x:9,y:20,text:r.guide,size:6.1},{x:9,y:26.5,text:r.rear+" (2–4, 6)",size:3.15}],s=33;for(let[c,l]of t.steps.entries()){i.push({id:"step-rule-"+c,points:[[9,s],[n-9,s]],stroke:"#B7C7C0",weight:0.32},...He(Uo(l.id,t,e),34,s+10,1.48));let d=62;a.push({x:d,y:s+7.45,text:c+1+". "+l.title,size:4.12,color:H});let p=s+13.7;for(let u of xt(l.action,65))a.push({x:d,y:p,text:u,size:3.53}),p+=4.75;p+=1.15;for(let u of xt(l.check,65))a.push({x:d,y:p,text:u,size:3.53,color:H}),p+=4.75;s=Math.max(s+34,p-0.5)}return a.push({x:9,y:o-Pe-1.5,text:"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",size:2.2}),{width:n,height:o,lines:i,labels:a}}var Hi=(t)=>[[t-14,12],[t-30,12]];function zo(t,e){return Hi(t).flatMap(([n,o],r)=>{let i=e?t-n:n;return[{id:`register-ring-${r}`,points:Array.from({length:16},(a,s)=>[F(i+2.1*Math.cos(s*Math.PI/8)),F(o+2.1*Math.sin(s*Math.PI/8))]),closed:!0,fill:"#FFFFFF",stroke:N,weight:0.3},{id:`register-h-${r}`,points:[[i-3,o],[i+3,o]],stroke:N,weight:0.3},{id:`register-v-${r}`,points:[[i,o-3],[i,o+3]],stroke:N,weight:0.3}]})}function Wi(t,e){let[n,o]=Fe[t.paper],r=_t(t.locale),i=(p)=>({...p,points:p.points.map(([u,h])=>[-u,h])}),a=(p)=>({...i(p),dash:p.dash===yn?wn:p.dash===wn?yn:p.dash}),s=[{id:"back-outline",points:e.outline.map(([p,u])=>[-p,u]),closed:!0,stroke:"#8C8898",weight:0.3}];for(let p of[...e.creases,...e.clipStops])s.push({...i(p),id:p.id+"-back-halo",weight:1.25,stroke:bn,dash:void 0}),s.push({...a(p),id:p.id+"-back"});s.push(...e.shoulders.map((p)=>({...i(p),id:p.id+"-back"})));let c=[...He(s,n/2,29),...zo(n,!0)],l=Ze[t.locale],d=[{x:40,y:10,text:"OPEN FLIGHT  /  K1",size:3.2,color:H},{x:40,y:18,text:l.names[t.species]+"  ·  "+r.title,size:5.2,color:N},...r.lines.map((p,u)=>({x:9,y:140+u*4.4,text:p,size:2.8,color:N})),{x:9,y:o-Pe-1.5,text:"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0",size:2.2,color:N}];return{width:n,height:o,lines:c,labels:d,locale:t.locale}}function Go(t,e=!1){return re(Ho(t,Ft(t),e)).toString("utf8")}function zi(t){return re(Wo(t,Ft(t))).toString("utf8")}function qo(t){let e=Ft(t);return $e(Ho(t,e,!0),[Wi(t,e),Wo(t,e)])}function Yo(t){let{format:e,revision:n,species:o,span_mm:r,appearance_id:i,paper:a}=t;return JSON.stringify({format:e,revision:n,species:o,span_mm:r,appearance_id:i,paper:a},null,2)+`
`}function Ko(t){let e=Ft(t),n=e.outline.map((s)=>s[1]),o=Math.min(...n),r=Math.max(...n),i=t.flat_span_mm+6,a=F(r-o+6);return re({width:i,height:a,lines:He(e.lines,i/2,3-o),labels:[]}).toString("utf8").replace(` width="${i}mm" height="${a}mm"`,"")}function Gi(t,e){let n=kt(t.species).palettes[t.appearance_id].base;return Ro(t,e,n,()=>Ko(t))}function qi(t){let e=kt(t.species),n=be(e),o=Ze[t.locale],r=Se(e,t.appearance_id,t.span_mm,n),i=n.outline.map((b)=>b[1]),a=12-Math.min(...i),s=Math.max(...i)+a,c=t.span_mm+12,l=c/2,d=F(s+23),p=F(d+t.keel_depth_mm),u=F(p+7),h=e.palettes[t.appearance_id],f=He(r.map((b)=>({...b,id:"assembled-"+b.id})),l,a),g=[{id:"rear-wing-plane",points:[[6,d],[c-6,d]],stroke:N,weight:0.76},{id:"rear-color-left",points:[[6,d-0.47],[l,d-0.47]],stroke:h.base,weight:0.47},{id:"rear-color-right",points:[[l,d-0.47],[c-6,d-0.47]],stroke:h.base,weight:0.47},{id:"rear-wall-left",points:[[l-0.31,d],[l-0.31,p]],stroke:N,weight:0.62},{id:"rear-wall-right",points:[[l+0.31,d],[l+0.31,p]],stroke:"#53596C",weight:0.62},{id:"rear-center-crease",points:[[l-0.31,p],[l+0.31,p]],stroke:N,weight:0.61},{id:"rear-depth-mark",points:[[l+4,d],[l+6,d],[l+6,p],[l+4,p]],stroke:H,weight:0.46}],w=[{x:6,y:7.5,text:o.assembledTop,size:3.65,color:N},{x:6,y:d-5.5,text:o.assembledRear,size:3.25,color:N},{x:l+9,y:p-2.6,text:t.keel_depth_mm+" mm",size:3.2,color:H},{x:l+9,y:p+1.7,text:o.keelLayers,size:2.7,color:H}];return re({width:c,height:u,lines:[...f,...g],labels:w}).toString("utf8").replace(` width="${c}mm" height="${u}mm"`,"")}function Yi(t){let e=Q.find((l)=>l.species===t.species),n={...e.parameters,span_mm:t.span_mm},o=t.span_mm===e.parameters.span_mm&&t.appearance_id===e.appearance_id,r=o?e.model:"comparison-"+t.species+"-"+t.span_mm+"-"+t.appearance_id,i=o?e.baseline_revision:"pair1",a=dt(e,r,i,n,t.appearance_id),s={design_id:r,revision_id:i,source_sha256:J(ct(a))},c=ht(e,{ref:s,parameters:n,appearance_id:t.appearance_id},t.paper,t.locale);if(!o){let l=c.labels.find((d)=>d.text.includes("/v1/designs/"));if(l)l.text="Open Flight · W1 / "+e.species+" / "+t.span_mm+" mm / "+t.appearance_id}return $e(c)}var Te={monarch:{sweep_deg:10,costa_segments:1,head_mm:24,hem_root_mm:7,hem_tip_mm:4,hem_fraction:0.86,span_mm:172},morpho:{sweep_deg:7,costa_segments:1,head_mm:32,hem_root_mm:7,hem_tip_mm:4,hem_fraction:0.84,span_mm:164},swallowtail:{sweep_deg:10,costa_segments:0,head_mm:24,hem_root_mm:7,hem_tip_mm:4,hem_fraction:0.86,span_mm:176}},Et=(t,e)=>t*e/200,Ki=(t,e)=>t*200/e;function Vi([t,e],[n,o],r){let i=t-n,a=e-o,s=Math.cos(r),c=Math.sin(r);return[n+i*s-a*c,o+i*c+a*s]}function Xi(t,e=Te[t]){let n=Q.find((y)=>y.species===t);if(!n)throw Error("Unknown butterfly species");let o=n.geometry,{span_mm:r,head_mm:i}=e,a=[Et(o.root_x,r),o.fore_root_y],s=e.sweep_deg*Math.PI/180,c=[Et(o.fore_edge.at(-1)[4],r),o.fore_edge.at(-1)[5]],l=Math.max(...o.fore_edge.map((y)=>Et(y[4],r))),d=(y)=>{let x=[Et(y[0],r),y[1]],M=Math.hypot(x[0]-c[0],x[1]-c[1]),P=Math.hypot(l-c[0],o.fore_edge[0][5]-c[1]),B=Math.min(1,M/P)**0.8,[E,T]=Vi(x,a,s*B);return[Ki(E,r),T]},p=o.fore_edge.map((y)=>{let x=d([y[0],y[1]]),M=d([y[2],y[3]]),P=d([y[4],y[5]]);return[x[0],x[1],M[0],M[1],P[0],P[1]]}),u=[p[e.costa_segments][4],p[e.costa_segments][5]],h=[o.root_x,o.fore_root_y],f=(y)=>[h[0]+(u[0]-h[0])*y,h[1]+(u[1]-h[1])*y];p=[[...f(0.3333333333333333),...f(0.6666666666666666),...u],...p.slice(e.costa_segments+1)];let g=o.hind_edge,w=(y)=>[y[0],y[1]+i,y[2],y[3]+i,y[4],y[5]+i],b={...o,nose_y:o.nose_y,abdomen_y:o.abdomen_y+i,fore_root_y:o.fore_root_y+i,hind_root_y:o.hind_root_y+i,fore_origin:[o.fore_origin[0],o.fore_origin[1]+i],hind_origin:[o.hind_origin[0],o.hind_origin[1]+i],fore_edge:p.map(w),hind_edge:g.map(w)};return{...n,baseline_revision:"k2",geometry:b,parameters:{...n.parameters,span_mm:r}}}var xn={"80":{gsm:80,thickness_mm:0.1,e_along_gpa:5.5,e_across_gpa:2.5},"100":{gsm:100,thickness_mm:0.12,e_along_gpa:5.5,e_across_gpa:2.5},"120":{gsm:120,thickness_mm:0.14,e_along_gpa:5.5,e_across_gpa:2.5},"160":{gsm:160,thickness_mm:0.19,e_along_gpa:5,e_across_gpa:2.3},"200":{gsm:200,thickness_mm:0.24,e_along_gpa:4.5,e_across_gpa:2.1}};function Vo(t){let e=0,n=0;for(let o=0;o<t.length;o++){let[r,i]=t[o],[a,s]=t[(o+1)%t.length],c=r*s-a*i;e+=c,n+=(i+s)*c}return e/=2,{area:Math.abs(e),cy:n/(6*e)}}function Xo(t,e,n=240){let o=Math.max(...t.map((i)=>i[0])),r=[];for(let i=0;i<n;i++){let a=e+(i+0.5)/n*(o-e),s=[];for(let l=0;l<t.length;l++){let[d,p]=t[l],[u,h]=t[(l+1)%t.length];if((d-a)*(u-a)<0)s.push(p+(h-p)*(a-d)/(u-d))}s.sort((l,d)=>l-d);let c=0;for(let l=0;l+1<s.length;l+=2)c+=s[l+1]-s[l];if(c>0)r.push({x:a,dx:(o-e)/n,le:s[0],te:s.at(-1),chord:c})}return r}function Jo(t){let{top:e,flat:n,paper:o,clip_g:r,clip_center_y:i}=t,a=t.target_margin??0.12,s=Vo(e),c=Vo(n),l=2*Math.max(...e.map((k)=>k[0])),d=Xo(e,0),p=0,u=0,h=0;for(let k of d)p+=(k.le+k.chord/4)*k.chord*k.dx,u+=k.chord*k.dx,h+=k.chord*k.chord*k.dx;let f=p/u,g=h/u,w=c.area*0.000001*o.gsm,b=f-a*g,y=(w*c.cy+r*i)/(w+r),x=Math.max(0,w*(c.cy-b)/(b-i)),P=(w+r)*0.00981,B=P/(s.area*0.000001),E=(t.grain_along_span?o.e_along_gpa:o.e_across_gpa)*1e9,T=o.thickness_mm*0.001,_=E*T**3/12,A=Xo(e,t.root_x_mm,300),W=P/2,L=A.reduce((k,S)=>k+S.chord*S.dx,0),v=A.map((k)=>W*k.chord*k.dx/L),I=A.map((k,S)=>{let R=0;for(let z=S;z<A.length;z++)R+=v[z]*((A[z].x-k.x)*0.001);return R}),we=0,O=0;for(let k=0;k<A.length;k++){let S=t.hem?t.hem.width_at(A[k].x):0,R=_*(A[k].chord+S)*0.001,z=I[k]/R;we+=z*A[k].dx*0.001,O+=we*A[k].dx*0.001}let C=t.costa,Tt=C?Math.atan2(C[1][1]-C[0][1],C[1][0]-C[0][0])*180/Math.PI:NaN;return{span_mm:l,area_cm2:s.area/100,aspect_ratio:l*l/s.area,mac_mm:g,neutral_point_y:f,balance_target_y:b,paper_g:w,paper_centroid_y:c.cy,clip_g:r,clip_center_y:i,balance_y:y,static_margin:(f-y)/g,clip_needed_g:x,wing_loading_n_m2:B,glide_speed_m_s:Math.sqrt(2*B/0.72),tip_deflection_mm:O*1000,tip_deflection_launch_mm:O*1000*3,costa_sweep_deg:Tt}}function Zo(t,e=Te[t].span_mm){let n={...Te[t],span_mm:e},o=Xi(t,n),r=be(o),i=o.geometry,a=j([i.root_x,i.fore_root_y],e),s=r.outline.map((v)=>j(v,e)),c=s.findIndex(([v,I])=>v===a[0]&&I===a[1]),d=[...Ji(i.nose_y,i.fore_root_y,a),...s.slice(c+1)],p=d.findIndex(([v],I)=>I>0&&v===0),u=d.slice(0,p+1),h=[...u,...u.slice(1,-1).reverse().map(([v,I])=>[-v,I])],f=j([i.fore_edge[0][4],i.fore_edge[0][5]],e),g=Math.hypot(f[0]-a[0],f[1]-a[1]),w=[(f[0]-a[0])/g,(f[1]-a[1])/g],b=[w[1],-w[0]],y=n.hem_fraction*g,x=(v)=>n.hem_root_mm+(n.hem_tip_mm-n.hem_root_mm)*(v/y),M=(v,I=0)=>[F(a[0]+w[0]*v+b[0]*I),F(a[1]+w[1]*v+b[1]*I)],P=[M(0),M(n.hem_root_mm,n.hem_root_mm),M(y-n.hem_tip_mm,n.hem_tip_mm),M(y)],B=h.findIndex(([v,I])=>v===a[0]&&I===a[1]),E=h.findIndex(([v,I])=>v===f[0]&&I===f[1]);if(B<0||E<0)throw Error("Costa not found in outline");let T=([v,I])=>[-v,I],_=[...h.slice(0,B+1),...P.slice(1),...h.slice(E)],A=_.findIndex(([v],I)=>I>0&&v===0),W=_.slice(0,A+1),L=[...W,...W.slice(1,-1).reverse().map(T)];return{model:o,span_mm:e,top:h,cut:L,hem:{right:P,left:P.map(T)},costa:[a,f],hemEnd:M(y),root:a,shape:r}}function Pt(t,e,n,o,r=8){return Array.from({length:r},(i,a)=>{let s=(a+1)/r,c=1-s;return[F(c**3*t[0]+3*c*c*s*e[0]+3*c*s*s*n[0]+s**3*o[0]),F(c**3*t[1]+3*c*c*s*e[1]+3*c*s*s*n[1]+s**3*o[1])]})}var Qe=1.6,Qo={x:3.2,y:2.6,rx:2,ry:2.5};function Ji(t,e,n){let o=Qo,r=e-8.5,i=[0,t];return[i,...Pt(i,[1.6,t-0.2],[o.x+o.rx,t-0.4],[o.x+o.rx,t+o.y]),...Pt([o.x+o.rx,t+o.y],[o.x+o.rx,t+o.y+2.6],[Qe+0.6,t+o.y+o.ry+1.2],[Qe,t+o.y+o.ry+3]),[Qe,F(r)],...Pt([Qe,r],[Qe+2.4,r+0.4],[3.9,e-5.5],[3.6,e-3.2]),...Pt([3.6,e-3.2],[3.4,e-1.6],[n[0]-0.6,e-0.4],n)]}function kn(t,e){let n=t.model.geometry,o=Se(t.model,e,t.span_mm,t.shape).filter((s)=>!s.id.startsWith("antenna"));o[0]={...o[0],points:t.top};let r=e==="coloring",i=t.model.palettes[e],a=Qo;for(let s of[-1,1]){let c=([l,d])=>[F(s*l),F(d)];o.push({id:"antenna-"+s,points:[[0.7,n.fore_root_y-9],[0.75,n.nose_y+a.y+a.ry+4],[1.6,n.nose_y+a.y+a.ry+1],[a.x-0.4,n.nose_y+a.y+0.8]].map((l)=>c(l)),stroke:r?i.ink:i.sun,weight:0.5}),o.push({id:"antenna-club-"+s,points:Array.from({length:24},(l,d)=>{let p=d/24*2*Math.PI;return c([a.x+0.15+1*Math.cos(p),n.nose_y+a.y+0.4+1.5*Math.sin(p)])}),closed:!0,fill:r?i.ink:i.sun})}return o}function er(t,e){let[n,o]=t.costa,r=Te[t.model.species],i=(e-n[0])/((o[0]-n[0])/Math.hypot(o[0]-n[0],o[1]-n[1])),a=r.hem_fraction*Math.hypot(o[0]-n[0],o[1]-n[1]);if(i<0||i>a)return 0;return r.hem_root_mm+(r.hem_tip_mm-r.hem_root_mm)*(i/a)}var rt={A4:[297,210],US_LETTER:[279.4,215.9]},nr=8,Zi=13,At={paper:"120",clips:2,clip_g:0.5},or={minimum:148,maximum:184,step:2},Qi=or,D="#272239",Ae="#005A8D",ze="#813842",et="#9A6A00",K="#254A36",vt="#FFFEF4",rr="#F4E6B8",tt=[0.65,1.05],nt=[2.8,0.9,0.55,0.9];function ea(t={}){let e=t.species??"monarch";if(!Object.hasOwn(Te,e))throw Error("Unknown butterfly species");let n=t.span_mm??Te[e].span_mm,{minimum:o,maximum:r,step:i}=Qi;if(!Number.isInteger(n)||n<o||n>r||(n-o)%i)throw Error(`Finished span must be from ${o} to ${r} mm in ${i} mm increments`);let a=t.paper??"A4";if(!Object.hasOwn(rt,a))throw Error("Unknown paper size");let s=t.locale??"en";if(!Object.hasOwn(Mt,s))throw Error("Unknown print locale");let c=t.appearance_id??"natural",l=Zo(e,n);if(!Object.hasOwn(l.model.palettes,c))throw Error("Unknown butterfly appearance");let d=l.model.geometry,p=ir(l,xn[At.paper],At.clips*At.clip_g),u=d.target_dihedral_deg;return{species:e,span_mm:n,appearance_id:c,paper:a,locale:s,outline:l,keel_depth_mm:nr,nose_y_mm:d.nose_y,wing_root_y_mm:d.fore_root_y,tail_y_mm:d.abdomen_y,balance_from_nose_mm:Math.round(p.balance_target_y-d.nose_y),dihedral_deg:u,tip_height_mm:Math.round(n/2*Math.sin(u*Math.PI/180)),prediction:p,evidence:"experimental_unvalidated"}}function ir(t,e=xn["120"],n=1,o=!0){let r=t.model.geometry,i=t.cut.map(([a,s])=>[a===0?0:a+Math.sign(a)*nr,s]);return Jo({top:t.top,flat:i,root_x_mm:t.root[0],paper:e,grain_along_span:o,clip_g:n,clip_center_y:r.nose_y+Zi,target_margin:0.1,hem:{polygon:t.hem.right,width_at:(a)=>er(t,a)},costa:t.costa})}function ta(t,e){let n=t.points,o=([s])=>s*e>=0;if(n.every(o))return[n];if(!n.some(([s])=>s*e>0))return[];let r=([s,c],[l,d])=>[0,F(c-(d-c)*s/(l-s))];if(t.closed){let s=n.flatMap((c,l)=>{let d=n[(l+n.length-1)%n.length],p=o(d)===o(c)?[]:[r(d,c)];if(o(c))p.push(c);return p});return s.length>=3?[s]:[]}let i=[],a=o(n[0])?[n[0]]:[];for(let s=1;s<n.length;s++){let c=n[s-1],l=n[s];if(o(c)!==o(l)){if(a.push(r(c,l)),!o(l)){if(a.length>1)i.push(a);a=[]}}if(o(l))a.push(l)}if(a.length>1)i.push(a);return i}function ot(t,e,n,o=20){return Array.from({length:o},(r,i)=>[F(t+n*Math.cos(i/o*2*Math.PI)),F(e+n*Math.sin(i/o*2*Math.PI))])}function Fn(t){let{outline:e,keel_depth_mm:n,nose_y_mm:o,tail_y_mm:r}=t,i=(_)=>([A,W])=>[F(A+_*n),W],a=e.cut.findIndex(([_],A)=>A>0&&_===0),s=e.cut.slice(0,a+1).map(i(1)),c=e.cut.slice(0,a+1).map(([_,A])=>[-_,A]).reverse().map(i(-1)),l=[...s,...c],d=e.top.findIndex(([_],A)=>A>0&&_===0),p=e.top.slice(0,d+1),u=p.map(i(1)),h=p.map(([_,A])=>[-_,A]).map(i(-1)),f=kn(e,t.appearance_id),g=[{id:"paper-web",points:[[-n,o],[n,o],[n,r],[-n,r]],closed:!0,fill:"#FFFFFF"},...[1,-1].map((_)=>({id:_>0?"hem-right":"hem-left",points:(_>0?e.hem.right:e.hem.left).map(i(_)),closed:!0,fill:rr})),{...f[0],id:"wing-background",points:u,stroke:void 0},{...f[0],id:"wing-background-left",points:[...h].reverse(),stroke:void 0}];for(let _ of f.slice(1))for(let A of[-1,1])for(let[W,L]of ta(_,A).entries())g.push({..._,id:_.id+(A<0?"-l-":"-r-")+W,points:L.map(i(A))});let w=[{id:"center-valley",points:[[0,o],[0,r]],dash:tt,stroke:Ae,weight:0.46},...[1,-1].map((_)=>({id:_>0?"right-root-mountain":"left-root-mountain",points:[[_*n,o],[_*n,r]],dash:nt,stroke:ze,weight:0.46})),...[1,-1].map((_)=>{let A=([W,L])=>[_*W,L];return{id:_>0?"right-costa-hem":"left-costa-hem",points:[A(e.root),A(e.hemEnd)].map(i(_)),dash:nt,stroke:et,weight:0.5}})],b=Ye(e.model,e.shape.trailing),y=[];for(let _ of[1,-1]){let A=(L)=>i(_)(j(L,e.span_mm,_)),W=_>0?"right":"left";for(let L of[0,1])y.push({id:`${W}-tab-slit-${L}`,points:[A(b.ends[L]),A(b.hinges[L])],stroke:D,weight:0.52});y.push({id:`${W}-tab-hinge`,points:[A(b.hinges[0]),A(b.hinges[1])],dash:tt,stroke:ze,weight:0.42})}let x=t.wing_root_y_mm-3,M=[1,-1].map((_)=>({id:_>0?"right-clip-zone":"left-clip-zone",points:[[_*1.4,o+1.5],[_*(n-1.4),o+1.5],[_*(n-1.4),x],[_*1.4,x]],closed:!0,stroke:K,weight:0.4,dash:[1.2,0.8]})),P=F(o+t.balance_from_nose_mm),B=n+e.root[0]+12,E=[];for(let _ of[1,-1])E.push({id:`balance-ring-${_}`,points:ot(_*B,P,2.2),closed:!0,fill:vt,stroke:K,weight:0.55},{id:`balance-dot-${_}`,points:ot(_*B,P,0.8,12),closed:!0,fill:K});let T=[...w,...y.filter((_)=>_.dash),...M];for(let _ of T)g.push({..._,id:_.id+"-halo",weight:1.2,stroke:vt,dash:void 0,fill:void 0,closed:!1},_);return g.push(...y.filter((_)=>!_.dash),...E),g.push({id:"cut",points:l,closed:!0,stroke:D,weight:0.52}),{outline:l,lines:g,creases:w,tabs:y,clip:M,balance:E,balance_y:P}}var Mt={en:{names:{monarch:"Monarch",morpho:"Blue morpho",swallowtail:"Swallowtail"},note:"K2 costa glider · Experimental · Flight not yet tested on paper",span:"finished span",print:"Print at 100% / actual size, landscape. Measure this line before cutting.",legend:["Cut","Center valley","Wing and costa mountains","Gold strip folds under","Clip zone","Balance dot"],paperTitle:"Paper and clips",paper:(t)=>`${t} g/m² uncoated printer paper or light card (100–140 works).`,grain:"The wings run along the long side of the sheet. Most office paper is stiffer that way.",clips:(t)=>`${t} standard metal paper clips, 33 mm long.`,strip:"Tip-height strip",stripLine:"wingtip",stripHelp:(t)=>`Cut out. Stand it on the table beside a wingtip. ${t} mm above the body.`,guide:"Build, balance and trim",steps:[{title:"Cut",action:"Cut the outside line, including the gold strips and the antenna clubs. Cut the four short slits at the back of the hindwings.",check:"One piece. Each hindwing has a tab between two slits."},{title:"Score",action:"Lay a ruler on each dashed line and press along it with an empty ballpoint pen.",check:"Every fold line shows a groove. Thick paper now folds cleanly."},{title:"Fold the costa",action:"Fold each gold strip under its wing along the gold dashed line. Press it flat.",check:"The front edge is straight and doubled, like the costa vein of a real wing."},{title:"Fold the body",action:"Fold in half on the blue line, colors inside. Then fold each wing back out on its own line.",check:"The two body layers hang underneath and touch."},{title:"Clip the head",action:"Slide both clips onto the head over the two body layers, one on top of the other, all the way to the nose.",check:"The clips stay inside the green clip zone."},{title:"Balance",action:"Rest the wings on two fingertips under the green dots. Tail drops: add a clip. Nose drops: slide a clip back, or remove one.",check:"It stays level on your fingers."},{title:"Set the V",action:"Lift both wings into a shallow V. Look from the tail and compare each wingtip with the strip.",check:"Both tips are the same height."},{title:"Launch and trim",action:"Push it gently forward, nose level, at walking speed. Dives: bend both tabs up 1–2 mm. Swoops up and stalls: flatten them.",check:"Turns left: bend the right tab up a little. Turns right: the left tab."}],predicted:(t)=>`Estimate for ${t.span_mm} mm on 120 g/m² with two clips: balance ${t.balance_from_nose_mm} mm behind the nose, glide about ${t.prediction.glide_speed_m_s.toFixed(1)} m/s. Not yet measured.`},es:{names:{monarch:"Monarca",morpho:"Morfo azul",swallowtail:"Cola de golondrina"},note:"Planeador K2 con costa · Experimental · Vuelo aún sin probar en papel",span:"envergadura final",print:"Imprime al 100 % en tamaño real y en horizontal. Mide esta línea antes de recortar.",legend:["Corte","Doblez central","Dobleces de alas y costa","La tira dorada va debajo","Zona del clip","Punto de equilibrio"],paperTitle:"Papel y clips",paper:(t)=>`Papel de impresora sin estucar de ${t} g/m² o cartulina ligera (sirve de 100 a 140).`,grain:"Las alas van a lo largo del lado largo de la hoja. Casi todo el papel de oficina es más rígido en esa dirección.",clips:(t)=>`${t} clips metálicos normales de 33 mm.`,strip:"Tira de altura",stripLine:"punta del ala",stripHelp:(t)=>`Recórtala. Ponla de pie en la mesa junto a una punta del ala. ${t} mm sobre el cuerpo.`,guide:"Construir, equilibrar y ajustar",steps:[{title:"Recorta",action:"Recorta la línea exterior, con las tiras doradas y las puntas de las antenas. Corta las cuatro ranuras cortas de las alas traseras.",check:"Es una sola pieza. Cada ala trasera tiene una aleta entre dos ranuras."},{title:"Marca los dobleces",action:"Apoya una regla en cada línea discontinua y repásala con un bolígrafo sin tinta.",check:"Cada doblez tiene un surco. El papel grueso se dobla limpio."},{title:"Dobla la costa",action:"Dobla cada tira dorada debajo de su ala por la línea dorada. Aplánala bien.",check:"El borde delantero queda recto y doble, como la vena costal de un ala real."},{title:"Dobla el cuerpo",action:"Dobla por la mitad en la línea azul, con los colores dentro. Luego dobla cada ala hacia fuera por su línea.",check:"Las dos capas del cuerpo cuelgan debajo y se tocan."},{title:"Pon los clips en la cabeza",action:"Desliza los dos clips sobre las dos capas del cuerpo, uno encima del otro, hasta la punta.",check:"Los clips quedan dentro de la zona verde."},{title:"Equilibra",action:"Apoya las alas en dos dedos bajo los puntos verdes. Si cae la cola, añade un clip. Si cae la cabeza, retrasa un clip o quítalo.",check:"Se queda horizontal sobre tus dedos."},{title:"Forma la V",action:"Sube las dos alas en una V suave. Mira desde la cola y compara cada punta con la tira.",check:"Las dos puntas están a la misma altura."},{title:"Lanza y ajusta",action:"Empújala suavemente hacia delante, con la punta recta, a paso de caminar. Si cae en picado, sube las dos aletas 1–2 mm. Si sube y se frena, aplánalas.",check:"Gira a la izquierda: sube un poco la aleta derecha. Gira a la derecha: la izquierda."}],predicted:(t)=>`Estimación para ${t.span_mm} mm en 120 g/m² con dos clips: equilibrio a ${t.balance_from_nose_mm} mm de la punta, unos ${t.prediction.glide_speed_m_s.toFixed(1)} m/s. Aún sin medir.`},ru:{names:{monarch:"Монарх",morpho:"Голубой морфо",swallowtail:"Махаон"},note:"Планер K2 с костальной жилкой · Опытная модель · Полёт на бумаге ещё не проверен",span:"размах крыльев",print:"Печатай в масштабе 100%, альбомная ориентация. Перед вырезанием измерь эту линию.",legend:["Разрез","Сгиб в центре","Сгибы крыльев и края","Золотая полоска уходит вниз","Зона скрепок","Точка баланса"],paperTitle:"Бумага и скрепки",paper:(t)=>`Бумага для принтера ${t} г/м² без покрытия или тонкий картон (подойдёт 100–140).`,grain:"Крылья идут вдоль длинной стороны листа. Офисная бумага обычно жёстче в этом направлении.",clips:(t)=>`${t} обычные металлические скрепки длиной 33 мм.`,strip:"Полоска высоты",stripLine:"кончик крыла",stripHelp:(t)=>`Вырежи. Поставь на стол рядом с кончиком крыла. ${t} мм выше корпуса.`,guide:"Сборка, баланс и настройка",steps:[{title:"Вырежи",action:"Вырежи по внешней линии, вместе с золотыми полосками и булавами усиков. Сделай четыре коротких надреза сзади на задних крыльях.",check:"Одна деталь. На каждом заднем крыле есть закрылок между двумя надрезами."},{title:"Продави сгибы",action:"Приложи линейку к каждой пунктирной линии и проведи по ней пустой шариковой ручкой.",check:"На каждой линии сгиба есть бороздка. Плотная бумага сгибается ровно."},{title:"Согни край крыла",action:"Загни каждую золотую полоску под крыло по золотой пунктирной линии. Прижми.",check:"Передний край прямой и двойной, как костальная жилка настоящего крыла."},{title:"Согни корпус",action:"Согни пополам по синей линии, цветом внутрь. Затем отогни каждое крыло наружу по своей линии.",check:"Два слоя корпуса висят снизу и касаются друг друга."},{title:"Надень скрепки на голову",action:"Надень обе скрепки на два слоя корпуса, одну поверх другой, до самого носа.",check:"Скрепки находятся в зелёной зоне."},{title:"Проверь баланс",action:"Положи крылья на два пальца под зелёными точками. Хвост опускается: добавь скрепку. Нос опускается: сдвинь скрепку назад или сними её.",check:"Бабочка держится ровно на пальцах."},{title:"Сделай букву V",action:"Подними оба крыла в неглубокую V. Посмотри с хвоста и сравни каждый кончик с полоской.",check:"Оба кончика на одной высоте."},{title:"Запуск и настройка",action:"Мягко толкни вперёд, нос ровно, со скоростью шага. Пикирует: подними оба закрылка на 1–2 мм. Взмывает и зависает: выпрями их.",check:"Поворачивает влево: чуть подними правый закрылок. Вправо: левый."}],predicted:(t)=>`Оценка для ${t.span_mm} мм на 120 г/м² с двумя скрепками: баланс в ${t.balance_from_nose_mm} мм от носа, около ${t.prediction.glide_speed_m_s.toFixed(1)} м/с. Ещё не измерено.`}};function We(t,e){let n=[],o="";for(let r of t.split(" ")){let i=o?o+" "+r:r;if(o&&i.length>e)n.push(o),o=r;else o=i}if(o)n.push(o);return n}function En(t,e,n,o=1){return t.map((r)=>({...r,points:r.points.map(([i,a])=>[F(e+o*i),F(n+o*a)])}))}function ar(t){let[e,n]=rt[t.paper],o=Mt[t.locale],r=Fn(t),i=Math.min(...r.outline.map(([,E])=>E)),a=Math.max(...r.outline.map(([,E])=>E)),s=25,c=En(r.lines,e/2,25-i),l=[],d=(E,T,_,A,W=D)=>l.push({x:E,y:T,text:_,size:A,color:W});d(9,10,"OPEN FLIGHT  /  K2",3.2,K),c.push(...sr(e,!1)),d(9,17.5,o.names[t.species],6.1),d(9,22.5,`${t.span_mm} mm ${o.span}`,2.6);for(let[E,T]of We(o.note,34).entries())d(9,27+E*3.2,T,2.4,"#5B5866");let p=Math.min(n-46,25+(a-i)+8),u=[{id:"key-cut",points:[],stroke:D,weight:0.52},{id:"key-center",points:[],stroke:Ae,weight:0.46,dash:tt},{id:"key-mountain",points:[],stroke:ze,weight:0.46,dash:nt},{id:"key-hem",points:[],stroke:et,weight:0.8},{id:"key-clip",points:[],stroke:K,weight:0.4,dash:[1.2,0.8]}],h=o.legend.map((E)=>14+E.length*1.32),f=Math.max(3,(e-18-h.reduce((E,T)=>E+T,0))/(h.length-1)),g=9;for(let[E,T]of u.entries()){let _=g;if(T.id==="key-hem")c.push({id:"key-hem-fill",points:[[_,p-1.6],[_+10,p-1.6],[_+10,p+1.6],[_,p+1.6]],closed:!0,fill:rr,stroke:et,weight:0.3});else c.push({...T,points:[[_,p],[_+10,p]]});d(_+12,p+1,o.legend[E],2.5),g+=h[E]+f}c.push({id:"key-balance-ring",points:ot(g+5,p,2.2),closed:!0,fill:vt,stroke:K,weight:0.55},{id:"key-balance-dot",points:ot(g+5,p,0.8,12),closed:!0,fill:K}),d(g+12,p+1,o.legend[5],2.5);let w=p+10;c.push({id:"ruler",points:[[9,w],[59,w]],stroke:D,weight:0.44});for(let E=0;E<=50;E+=5)c.push({id:"ruler-tick-"+E,points:[[9+E,w],[9+E,E%10===0?w-2.8:w-1.7]],stroke:D,weight:0.32});d(62,w+0.5,"50 mm  ·  "+o.print,2.6),d(9,w+8,o.paperTitle,3.2,K);let b=w+12.5;for(let E of[o.paper("120"),o.grain,o.clips(At.clips)])for(let T of We(E,95))d(9,b,T,2.45),b+=3.3;for(let E of We(o.predicted(t),95))d(9,b,E,2.25,"#5B5866"),b+=3.1;let y=e-60,x=w-1,M=36,P=11,B=M-(t.keel_depth_mm+t.tip_height_mm);c.push({id:"strip-cut",points:[[y,x],[y+P,x],[y+P,x+M],[y,x+M]],closed:!0,stroke:D,weight:0.52},{id:"strip-body",points:[[y,x+M-t.keel_depth_mm],[y+P,x+M-t.keel_depth_mm]],stroke:"#8A8696",weight:0.35,dash:[0.8,0.8]},{id:"strip-tip",points:[[y-1.5,x+B],[y+P+1.5,x+B]],stroke:K,weight:0.8}),d(y,x-2.5,o.strip,3,K),d(y+P+3,x+B+1,o.stripLine,2.5,K);for(let[E,T]of We(o.stripHelp(t.tip_height_mm),30).entries())d(y+P+3,x+B+6+E*3.1,T,2.3);return d(9,n-Pe-1.5,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2",2.2),{width:e,height:n,lines:c,labels:l}}function na(t,e){let n=[],o=(a,s,c=D,l=0.45,d={})=>n.push({id:`step${t}-${a}`,points:s,stroke:c,weight:l,...d}),r=(a,s)=>{o(a,s,ze,0.45);let[c,l]=s.at(-1),[d,p]=s.at(-2),u=Math.atan2(l-p,c-d),h=(f)=>[c-1.6*Math.cos(u+f),l-1.6*Math.sin(u+f)];o(a+"-tip",[h(0.5),[c,l],h(-0.5)],ze,0.45)},i=Fn(e);if(t===0||t===1){let a=Math.min(...i.outline.map(([,l])=>l)),s=0.17,c=i.outline.map(([l,d])=>[F(20+l*0.17),F(1+(d-a)*0.17)]);o("shape",c,D,0.35,{closed:!0});for(let l of t===1?i.creases:i.tabs)o(l.id,l.points.map(([d,p])=>[F(20+d*0.17),F(1+(p-a)*0.17)]),l.stroke,0.35,{dash:l.dash?[0.6,0.5]:void 0})}else if(t===2)o("wing",[[4,12],[36,12]],D,0.6),o("hem",[[4,13.2],[14,13.2]],et,0.6),o("bend",[[4,12],[3.2,12.6],[4,13.2]],et,0.6),r("turn",[[10,6],[5,6.5],[2.6,9.5]]),o("front",[[1,18],[6,18]],"#8A8696",0.3);else if(t===3)o("left",[[3,6],[19.4,6]],D,0.6),o("right",[[20.6,6],[37,6]],D,0.6),o("wall-l",[[19.4,6],[19.4,15]],Ae,0.6),o("wall-r",[[20.6,6],[20.6,15]],Ae,0.6),o("keel",[[19.4,15],[20,15.6],[20.6,15]],Ae,0.6);else if(t===4)o("body",[[2,6],[38,6],[38,14],[2,14]],Ae,0.5,{closed:!0}),o("zone",[[3,7],[16,7],[16,13],[3,13]],K,0.35,{closed:!0,dash:[1,0.7]}),o("clip1",[[2,8],[14,8],[14.8,9],[14.8,11],[14,12],[4,12],[3.3,11],[3.3,10],[12,10]],"#59606A",0.5),o("clip2",[[2,7.4],[15,7.4],[15.8,8.6],[15.8,11.4],[15,12.6],[2,12.6]],"#8A919C",0.4),r("push",[[24,18],[17,18]]);else if(t===5){o("left",[[3,7],[19.4,7]],D,0.6),o("right",[[20.6,7],[37,7]],D,0.6),o("keel",[[20,7],[20,14]],Ae,0.9);for(let a of[12,28])o("finger"+a,[[a-2,20],[a-2,9.6],[a,7.6],[a+2,9.6],[a+2,20]],"#B07A62",0.45)}else if(t===6)o("left",[[3,6],[19.4,12]],D,0.6),o("right",[[20.6,12],[33,6]],D,0.6),o("keel",[[20,12],[20,18.5]],Ae,0.9),o("table",[[1,18.5],[39,18.5]],"#8A8696",0.3),o("strip",[[35,18.5],[35,3],[38,3],[38,18.5]],D,0.35),o("mark",[[34,6],[39,6]],K,0.7);else o("wing",[[4,14],[26,14]],D,0.6),o("tab",[[26,14],[31,12]],ze,0.7),r("lift",[[33,15],[33,10]]),o("path",[[2,4],[12,5],[22,7],[36,9]],"#8A8696",0.3,{dash:[0.8,0.8]});return n}function sr(t,e){return[[t-14,12],[t-30,12]].flatMap(([n,o],r)=>{let i=e?t-n:n;return[{id:`register-ring-${r}`,points:ot(i,o,2.1,16),closed:!0,fill:"#FFFFFF",stroke:D,weight:0.3},{id:`register-h-${r}`,points:[[i-3,o],[i+3,o]],stroke:D,weight:0.3},{id:`register-v-${r}`,points:[[i,o-3],[i,o+3]],stroke:D,weight:0.3}]})}function lr(t){let[e,n]=rt[t.paper],o=Mt[t.locale],r=_t(t.locale,!0),i=Fn(t),a=Math.min(...i.outline.map(([,u])=>u)),s=(u)=>({...u,points:u.points.map(([h,f])=>[-h,f])}),c=(u)=>u===tt?nt:u===nt?tt:u,l=[{id:"back-outline",points:i.outline.map(([u,h])=>[-u,h]),closed:!0,stroke:"#8C8898",weight:0.3}];for(let u of[...i.creases,...i.tabs.filter((h)=>h.dash),...i.clip])l.push({...s(u),id:u.id+"-back-halo",weight:1.2,stroke:vt,dash:void 0,fill:void 0,closed:!1}),l.push({...s(u),id:u.id+"-back",dash:c(u.dash)});l.push(...i.tabs.filter((u)=>!u.dash).map((u)=>({...s(u),id:u.id+"-back"})));let d=[...En(l,e/2,25-a),...sr(e,!0)],p=[{x:40,y:10,text:"OPEN FLIGHT  /  K2",size:3.2,color:K},{x:40,y:17.5,text:o.names[t.species]+"  ·  "+r.title,size:5,color:D},...r.lines.map((u,h)=>({x:9,y:n-30+h*4.2,text:u,size:2.8,color:D})),{x:9,y:n-Pe-1.5,text:"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2",size:2.2,color:D}];return{width:e,height:n,lines:d,labels:p}}function cr(t){let[e,n]=rt[t.paper],o=Mt[t.locale],r=[],i=[],a=(l,d,p,u,h=D)=>i.push({x:l,y:d,text:p,size:u,color:h});a(9,10,"OPEN FLIGHT  /  K2",3.2,K),a(9,17.5,o.guide+"  ·  "+o.names[t.species],5);let s=4,c=(e-18)/s;for(let[l,d]of o.steps.entries()){let p=9+l%s*c,u=26+Math.floor(l/s)*((n-40)/2);r.push(...En(na(l,t),p+2,u)),a(p,u+30,`${l+1}. ${d.title}`,3.1);let h=u+35;for(let f of We(d.action,38))a(p,h,f,2.35),h+=3.15;h+=0.6;for(let f of We(d.check,38))a(p,h,f,2.35,K),h+=3.15}return a(9,n-Pe-1.5,"Open Flight  /  CERN-OHL-W-2.0  /  CC BY-SA 4.0  /  K2",2.2),{width:e,height:n,lines:r,labels:i}}var oa=new URL("../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf","https://print.invalid/packages/folded-butterfly/k2-sheet.ts"),tr;function ra(t){let e=[ar(t),lr(t),cr(t)],[n,o]=rt[t.paper],r=new ut({unit:"mm",format:[n,o],orientation:"landscape",compress:!0,putOnlyUsedFonts:!0,precision:5});r.setCreationDate("D:20000101000000+00'00'"),r.setFileId(J(JSON.stringify(e)).slice(0,32)),r.setLanguage(t.locale),r.setProperties({title:"Open Flight - K2 butterfly trial",author:"Open Flight contributors",subject:"Original design: CERN-OHL-W-2.0. Artwork: CC BY-SA 4.0."}),tr??=V(oa).toString("base64"),r.addFileToVFS("DejaVuSans.ttf",tr),r.addFont("DejaVuSans.ttf","DejaVu","normal"),r.setFont("DejaVu","normal");for(let[i,a]of e.entries()){if(i)r.addPage([n,o],"landscape");r.setLineJoin("round");for(let s of a.lines){if(!s.points.length)continue;if(s.stroke)r.setDrawColor(s.stroke);if(s.fill)r.setFillColor(s.fill);if(r.setLineWidth(s.weight??0),r.setLineDashPattern(s.dash??[],0),r.path(s.points.map((c,l)=>({op:l?"l":"m",c}))),s.closed)r.close();if(s.fill&&s.stroke)r.fillStroke();else if(s.fill)r.fill();else r.stroke()}for(let s of a.labels)r.setFontSize(s.size*72/25.4),r.setTextColor(s.color??D),r.text(s.text,s.x,s.y)}return ee.from(r.output("arraybuffer"))}var ia=(t)=>`<path d="M${t.points.map((e)=>e.join(" ")).join(" L")}${t.closed?" Z":""}" fill="${t.fill??"none"}" stroke="${t.stroke??"none"}" stroke-width="${t.weight??0}"${t.dash?` stroke-dasharray="${t.dash.join(" ")}"`:""}/>`;function aa(t){let e=kn(t.outline,t.appearance_id),n=t.outline.top.map(([c])=>c),o=t.outline.top.map(([,c])=>c),r=Math.min(...n)-3,i=Math.min(...o)-3,a=Math.max(...n)+3-r,s=Math.max(...o)+3-i;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${F(r)} ${F(i)} ${F(a)} ${F(s)}" role="img">${e.map(ia).join("")}</svg>`}function sa(t,e=0){let n=[ar,lr,cr][e](t);return re(n).toString("utf8")}var tl=()=>Xt(null,["pdf"]),St=new Map(_o.map((t)=>{let e=un(t.model,t.baseline_revision,t.name,t.parameters,t.appearance_id,null,"original","2026-11-23T00:00:00Z",t.species);return[t.model,e]})),Bt=new Map,Pn=new Map,la="open-flight-designs-v1:"+new URL(".",import.meta.url).pathname,An=new Promise((t,e)=>{let n=indexedDB.open(la,1);n.onupgradeneeded=()=>{n.result.createObjectStore("records"),n.result.createObjectStore("heads"),n.result.createObjectStore("receipts")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)}),it=(t)=>new Promise((e,n)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)}),he=(t)=>Response.json(t);async function pr(t,e,n){if(St.has(t)&&St.get(t).dto.ref.revision_id===e)return St.get(t);let o=n??(await An).transaction(["records","heads"]),[r,i]=await Promise.all([it(o.objectStore("records").get([t,e])),it(o.objectStore("heads").get(t))]);if(!r||!i)throw Error("This design is unavailable on this device.");return{source:r.source,dto:{...r.dto,head_revision_id:i.ref.revision_id}}}async function It(t,e){let n=await pr(t.design_id,t.revision_id,e);if(n.dto.ref.source_sha256!==t.source_sha256||n.dto.provenance.generator_revision!==mt(n.dto.species_id)||n.source!==gt(t.design_id,t.revision_id,n.dto))throw Error("The saved source differs from this revision.");return n}async function ca(t,e,n){let r=(await An).transaction(["records","heads","receipts"],"readwrite"),i=new Promise((l,d)=>{r.oncomplete=l,r.onerror=r.onabort=()=>d(r.error??Error("Save interrupted"))}),a=r.objectStore("receipts"),s=n.headers["Idempotency-Key"],c=JSON.stringify([t,n.headers["If-Match"],e]);try{let l=await it(a.get(s));if(l){if(l.fingerprint!==c)throw Error("This save key belongs to a different edit.");return await i,l.dto}let d,p,u;if(t){let g=await it(r.objectStore("heads").get(t));if(!g||n.headers["If-Match"]!=='"'+g.ref.revision_id+'"'){let w=Error("Reload the current revision before saving.");throw w.code="revision_conflict",w}d=(await It(g.ref,r)).dto,p="r"+(Number(g.ref.revision_id.slice(1))+1),u=d.name}else{if(d=(await It(e.source,r)).dto,u=String(e.name??"").trim(),!u||u.length>120)throw Error("Choose a name of up to 120 characters.");t="d-"+crypto.randomUUID(),p="r1"}let h=pn(d,e.parameters,e.appearance_id),f=un(t,p,u,h.parameters,h.appearance_id,d.ref,p==="r1"?"fork":"revision",new Date().toISOString(),d.species_id);return r.objectStore("records").add(f,[t,p]),r.objectStore("heads").put(f.dto,t),a.add({fingerprint:c,dto:f.dto},s),await i,f.dto}catch(l){try{r.abort()}catch{}throw await i.catch(()=>{}),l}}function dr(t,e,n){let o=t+"-"+crypto.randomUUID();return Bt.set(o,new Blob([n],{type:e})),{artifact_id:o}}async function nl(t,e={}){try{e.signal?.throwIfAborted();let n=new URL(t,location.origin),[,,o,r,i,a]=n.pathname.split("/"),s=e.body?JSON.parse(e.body):{};switch(o){case"capabilities":return he({enabled_operations:["previewDraft","previewDesign","forkDesign","reviseDesign","startExport","listDesigns","listActivities","getDesignRevision","getFieldGuide"]});case"field-guide":return he({species:Be});case"designs":{if(e.method==="POST")return he(await ca(r,s,e));if(r)return he((await pr(r,a)).dto);let c=await it((await An).transaction("heads").objectStore("heads").getAll());return he({items:[...St.values()].map((l)=>l.dto).concat(c),next_cursor:null})}case"activities":{if(r)return he(Mo(r,a));let c=n.searchParams.get("species_id");return he({items:yt(c==="legacy"?void 0:c,n.searchParams.get("locale")),next_cursor:null})}case"previews":{let c=(await It(s.design)).dto,l={...c,...pn(c,s.parameters,s.appearance_id)},d=xo(l),p=r==="draft"?d.toString("utf8"):dr("preview","image/svg+xml",d);return he({svg:p,geometry:bt(l),is_flight_simulation:!1})}case"exports":{let c=await It(s.design);await Xt(Be.find((p)=>p.id===c.dto.species_id),s.formats);let l=[];Bo(c,s,(p,u,h)=>l.push(dr(p,u,h).artifact_id));let d={job_id:"job-"+crypto.randomUUID(),status:"succeeded",artifact_ids:l};return Pn.set(d.job_id,d),he(d)}case"jobs":if(Pn.has(r))return he(Pn.get(r));break;case"artifacts":if(Bt.has(r)){let c=Bt.get(r);return Bt.delete(r),new Response(c,{headers:{"Content-Type":c.type}})}break}return Response.json({message:"Unknown workshop resource."},{status:404})}catch(n){if(n.name==="AbortError")throw n;return Response.json({code:n.code,message:n.message},{status:400})}}export{Yi as classicComparisonPdf,qi as foldedFinishedPreview,zi as foldedGuideSvg,Gi as foldedLessonSvg,qo as foldedPdf,Ko as foldedPreview,Yo as foldedSource,_n as foldedSpanSpec,$i as foldedSpecies,Go as foldedSvg,jo as isFoldedSpan,aa as k2FinishedSvg,sa as k2PageSvg,ra as k2Pdf,ir as k2Predict,or as k2SpanRange,No as makeFoldedButterfly,ea as makeK2,tl as prepareFoldedPdf,nl as publicRequest};
