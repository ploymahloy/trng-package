import { randomBytes } from 'node:crypto';
const rejectSamples = (upperExclusive) => {
    if (upperExclusive <= 0n) {
        throw new RangeError('upperExclusive must be greater than 0.');
    }
    const bits = upperExclusive.toString(2).length;
    const byteLen = Math.ceil(bits / 8);
    const maxValue = 1n << BigInt(byteLen * 8);
    const limit = maxValue - (maxValue % upperExclusive);
    while (true) {
        const randomBuffer = randomBytes(byteLen);
        const candidate = BigInt(`0x${randomBuffer.toString('hex')}`);
        if (candidate < limit) {
            return candidate % upperExclusive;
        }
    }
};
export function getRandomInt(desiredOutputLength, options) {
    if (!Number.isInteger(desiredOutputLength)) {
        throw new TypeError('getRandomInt(desiredOutputLength) expects an integer argument (desiredOutputLength: number).');
    }
    if (desiredOutputLength < 1) {
        throw new RangeError('getRandomInt(length) expects length to be at least 1.');
    }
    const outputType = options?.type ?? 'bigint';
    if (outputType !== 'string' && outputType !== 'bigint') {
        throw new TypeError('getRandomInt(desiredOutputLength, options) expects options.type to be "string" or "bigint".');
    }
    const min = desiredOutputLength === 1 ? 0n : 10n ** BigInt(desiredOutputLength - 1);
    const maxExclusive = 10n ** BigInt(desiredOutputLength);
    const range = maxExclusive - min;
    const randomOffset = rejectSamples(range);
    const result = min + randomOffset;
    return outputType === 'string' ? result.toString() : result;
}
//# sourceMappingURL=index.js.map