(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Reusable object
    var W = [];

    /**
     * SHA-1 hash algorithm.
     */
    var SHA1 = C_algo.SHA1 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init([
                0x67452301, 0xefcdab89,
                0x98badcfe, 0x10325476,
                0xc3d2e1f0
            ]);
        },

        _doProcessBlock: function (M, offset) {
            // Shortcut
            var H = this._hash.words;

            // Working variables
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];

            // Computation
            var i = 0;
            var t;
            var n;

            while( i < 16 )
            {
                W[i] = M[offset + i] | 0;

                t = ((a << 5) | (a >>> 27)) + e + W[i] + ((b & c) | (~b & d)) + 0x5a827999;

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;

                i++;
            }

            while( i < 20 )
            {
                n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (n << 1) | (n >>> 31);

                t = ((a << 5) | (a >>> 27)) + e + W[i] + ((b & c) | (~b & d)) + 0x5a827999;

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;

                i++;
            }

            while( i < 40 )
            {
                n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (n << 1) | (n >>> 31);

                t = ((a << 5) | (a >>> 27)) + e + W[i] + (b ^ c ^ d) + 0x6ed9eba1;

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;

                i++;
            }

            while( i < 60 )
            {
                n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (n << 1) | (n >>> 31);

                t = ((a << 5) | (a >>> 27)) + e + W[i] + ((b & c) | (b & d) | (c & d)) - 0x70e44324;

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;

                i++;
            }

            while( i < 80 )
            {
                n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (n << 1) | (n >>> 31);

                t = ((a << 5) | (a >>> 27)) + e + W[i] + (b ^ c ^ d) - 0x359d3e2a;

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;

                i++;
            }

            // Intermediate hash value
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Return final computed hash
            return this._hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA1('message');
     *     var hash = CryptoJS.SHA1(wordArray);
     */
    C.SHA1 = Hasher._createHelper(SHA1);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA1(message, key);
     */
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
}());
