"use strict";var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);
sjcl.cipher.aes=function(a){if(!this.b[0][0][0]){var b=this.b[0],d=this.b[1],c=b[4],f=d[4],e,h,g,k=[],m=[],r,n,l,p;for(e=0;0x100>e;e++)m[(k[e]=e<<1^283*(e>>7))^e]=e;for(h=g=0;!c[h];h^=r||1,g=m[g]||1){l=g^g<<1^g<<2^g<<3^g<<4;l=l>>8^l&255^99;c[h]=l;f[l]=h;n=k[e=k[r=k[h]]];p=0x1010101*n^0x10001*e^0x101*r^0x1010100*h;n=0x101*k[l]^0x1010100*l;for(e=0;4>e;e++)b[e][h]=n=n<<24^n>>>8,d[e][l]=p=p<<24^p>>>8}for(e=0;5>e;e++)b[e]=b[e].slice(0),d[e]=d[e].slice(0)}b=this.b[0][4];d=this.b[1];g=a.length;k=1;if(4!==g&&6!==g&&
8!==g)throw new sjcl.exception.invalid("invalid aes key size");this.f=[f=a.slice(0),h=[]];for(a=g;a<4*g+28;a++){c=f[a-1];if(0===a%g||8===g&&4===a%g)c=b[c>>>24]<<24^b[c>>16&255]<<16^b[c>>8&255]<<8^b[c&255],0===a%g&&(c=c<<8^c>>>24^k<<24,k=k<<1^283*(k>>7));f[a]=f[a-g]^c}for(g=0;a;g++,a--)c=f[g&3?a:a-4],h[g]=4>=a||4>g?c:d[0][b[c>>>24]]^d[1][b[c>>16&255]]^d[2][b[c>>8&255]]^d[3][b[c&255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return v(this,a,0)},decrypt:function(a){return v(this,a,1)},b:[[[],[],[],[],[]],[[],[],[],[],[]]]};
function v(a,b,d){if(4!==b.length)throw new sjcl.exception.invalid("invalid aes block size");var c=a.f[d],f=b[0]^c[0],e=b[d?3:1]^c[1],h=b[2]^c[2];b=b[d?1:3]^c[3];var g,k,m,r=c.length/4-2,n,l=4,p=[0,0,0,0];g=a.b[d];a=g[0];var q=g[1],s=g[2],t=g[3],u=g[4];for(n=0;n<r;n++)g=a[f>>>24]^q[e>>16&255]^s[h>>8&255]^t[b&255]^c[l],k=a[e>>>24]^q[h>>16&255]^s[b>>8&255]^t[f&255]^c[l+1],m=a[h>>>24]^q[b>>16&255]^s[f>>8&255]^t[e&255]^c[l+2],b=a[b>>>24]^q[f>>16&255]^s[e>>8&255]^t[h&255]^c[l+3],l+=4,f=g,e=k,h=m;for(n=
0;4>n;n++)p[d?3&-n:n]=u[f>>>24]<<24^u[e>>16&255]<<16^u[h>>8&255]<<8^u[b&255]^c[l++],g=f,f=e,e=h,h=b,b=g;return p}
sjcl.bitArray={bitSlice:function(a,b,d){a=sjcl.bitArray.d(a.slice(b/32),32-(b&31)).slice(1);return void 0===d?a:sjcl.bitArray.clamp(a,d-b)},extract:function(a,b,d){var c=Math.floor(-b-d&31);return((b+d-1^b)&-32?a[b/32|0]<<32-c^a[b/32+1|0]>>>c:a[b/32|0]>>>c)&(1<<d)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var d=a[a.length-1],c=sjcl.bitArray.getPartial(d);return 32===c?a.concat(b):sjcl.bitArray.d(b,c,d|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var d=a.length;b&=31;0<d&&b&&(a[d-1]=sjcl.bitArray.partial(b,a[d-1]&2147483648>>b-1,1));return a},partial:function(a,b,d){return 32===a?b:(d?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var d=0,c;for(c=0;c<a.length;c++)d|=a[c]^b[c];return 0===
d},d:function(a,b,d,c){var f;f=0;for(void 0===c&&(c=[]);32<=b;b-=32)c.push(d),d=0;if(0===b)return c.concat(a);for(f=0;f<a.length;f++)c.push(d|a[f]>>>b),d=a[f]<<32-b;f=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(f);c.push(sjcl.bitArray.partial(b+a&31,32<b+a?d:c.pop(),1));return c},g:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.mode.gcm={name:"gcm",encrypt:function(a,b,d,c,f){var e=b.slice(0);b=sjcl.bitArray;c=c||[];a=sjcl.mode.gcm.c(!0,a,e,c,d,f||128);return b.concat(a.data,a.tag)},decrypt:function(a,b,d,c,f){var e=b.slice(0),h=sjcl.bitArray,g=h.bitLength(e);f=f||128;c=c||[];f<=g?(b=h.bitSlice(e,g-f),e=h.bitSlice(e,0,g-f)):(b=e,e=[]);a=sjcl.mode.gcm.c(!1,a,e,c,d,f);if(!h.equal(a.tag,b))throw new sjcl.exception.corrupt("gcm: tag doesn't match");return a.data},e:function(a,b){var d,c,f,e,h,g=sjcl.bitArray.g;f=[0,0,0,
0];e=b.slice(0);for(d=0;128>d;d++){(c=0!==(a[Math.floor(d/32)]&1<<31-d%32))&&(f=g(f,e));h=0!==(e[3]&1);for(c=3;0<c;c--)e[c]=e[c]>>>1|(e[c-1]&1)<<31;e[0]>>>=1;h&&(e[0]^=-0x1f000000)}return f},a:function(a,b,d){var c,f=d.length;b=b.slice(0);for(c=0;c<f;c+=4)b[0]^=0xffffffff&d[c],b[1]^=0xffffffff&d[c+1],b[2]^=0xffffffff&d[c+2],b[3]^=0xffffffff&d[c+3],b=sjcl.mode.gcm.e(b,a);return b},c:function(a,b,d,c,f,e){var h,g,k,m,r,n,l,p,q=sjcl.bitArray;n=d.length;l=q.bitLength(d);p=q.bitLength(c);g=q.bitLength(f);
h=b.encrypt([0,0,0,0]);96===g?(f=f.slice(0),f=q.concat(f,[1])):(f=sjcl.mode.gcm.a(h,[0,0,0,0],f),f=sjcl.mode.gcm.a(h,f,[0,0,Math.floor(g/0x100000000),g&0xffffffff]));g=sjcl.mode.gcm.a(h,[0,0,0,0],c);r=f.slice(0);c=g.slice(0);a||(c=sjcl.mode.gcm.a(h,g,d));for(m=0;m<n;m+=4)r[3]++,k=b.encrypt(r),d[m]^=k[0],d[m+1]^=k[1],d[m+2]^=k[2],d[m+3]^=k[3];d=q.clamp(d,l);a&&(c=sjcl.mode.gcm.a(h,g,d));a=[Math.floor(p/0x100000000),p&0xffffffff,Math.floor(l/0x100000000),l&0xffffffff];c=sjcl.mode.gcm.a(h,c,a);k=b.encrypt(f);
c[0]^=k[0];c[1]^=k[1];c[2]^=k[2];c[3]^=k[3];return{tag:q.bitSlice(c,0,e),data:d}}};