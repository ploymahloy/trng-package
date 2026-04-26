"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = void 0;
const node_crypto_1 = require("node:crypto");
const rejectSamples = (upperExclusive) => {
    if (upperExclusive <= 0n) {
        throw new RangeError('upperExclusive must be greater than 0.');
    }
    const bits = upperExclusive.toString(2).length;
    const byteLen = Math.ceil(bits / 8);
    const maxValue = 1n << BigInt(byteLen * 8);
    const limit = maxValue - (maxValue % upperExclusive);
    while (true) {
        const randomBuffer = (0, node_crypto_1.randomBytes)(byteLen);
        const candidate = BigInt(`0x${randomBuffer.toString('hex')}`);
        if (candidate < limit) {
            return candidate % upperExclusive;
        }
    }
};
const getRandomInt = (length) => {
    if (!Number.isInteger(length)) {
        throw new TypeError('getRandomInt(length) expects an integer argument (length: number).');
    }
    if (length < 1) {
        throw new RangeError('getRandomInt(length) expects length to be at least 1.');
    }
    const min = length === 1 ? 0n : 10n ** BigInt(length - 1);
    const maxExclusive = 10n ** BigInt(length);
    const range = maxExclusive - min;
    const randomOffset = rejectSamples(range);
    return min + randomOffset;
};
exports.getRandomInt = getRandomInt;
//# sourceMappingURL=index.js.map