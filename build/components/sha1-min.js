/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var m=CryptoJS,l=m.lib,p=l.WordArray,n=l.Hasher,b=[],l=m.algo.SHA1=n.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(q,k){for(var f=this._hash.words,c=f[0],d=f[1],g=f[2],h=f[3],j=f[4],a=0,e;16>a;)b[a]=q[k+a]|0,e=(c<<5|c>>>27)+j+b[a]+(d&g|~d&h)+1518500249,j=h,h=g,g=d<<30|d>>>2,d=c,c=e,a++;for(;20>a;)e=b[a-3]^b[a-8]^b[a-14]^b[a-16],b[a]=e<<1|e>>>31,e=(c<<5|c>>>27)+j+b[a]+(d&g|~d&h)+1518500249,j=h,h=g,g=
d<<30|d>>>2,d=c,c=e,a++;for(;40>a;)e=b[a-3]^b[a-8]^b[a-14]^b[a-16],b[a]=e<<1|e>>>31,e=(c<<5|c>>>27)+j+b[a]+(d^g^h)+1859775393,j=h,h=g,g=d<<30|d>>>2,d=c,c=e,a++;for(;60>a;)e=b[a-3]^b[a-8]^b[a-14]^b[a-16],b[a]=e<<1|e>>>31,e=(c<<5|c>>>27)+j+b[a]+(d&g|d&h|g&h)-1894007588,j=h,h=g,g=d<<30|d>>>2,d=c,c=e,a++;for(;80>a;)e=b[a-3]^b[a-8]^b[a-14]^b[a-16],b[a]=e<<1|e>>>31,e=(c<<5|c>>>27)+j+b[a]+(d^g^h)-899497514,j=h,h=g,g=d<<30|d>>>2,d=c,c=e,a++;f[0]=f[0]+c|0;f[1]=f[1]+d|0;f[2]=f[2]+g|0;f[3]=f[3]+h|0;f[4]=f[4]+
j|0},_doFinalize:function(){var b=this._data,k=b.words,f=8*this._nDataBytes,c=8*b.sigBytes;k[c>>>5]|=128<<24-c%32;k[(c+64>>>9<<4)+14]=Math.floor(f/4294967296);k[(c+64>>>9<<4)+15]=f;b.sigBytes=4*k.length;this._process();return this._hash},clone:function(){var b=n.clone.call(this);b._hash=this._hash.clone();return b}});m.SHA1=n._createHelper(l);m.HmacSHA1=n._createHmacHelper(l)})();
