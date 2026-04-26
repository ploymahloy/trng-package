const { randomBytes } = require('node:crypto') as {
	randomBytes: (size: number) => Buffer;
};

const randomBigIntBelow = (upperExclusive: bigint): bigint => {
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

const getRandomInt = (length: number): bigint => {
	if (!Number.isInteger(length)) {
		throw new TypeError('getRandomInt(length) expects an integer argument (length: number).');
	}

	if (length < 1) {
		throw new RangeError('getRandomInt(length) expects length to be at least 1.');
	}

	const min = length === 1 ? 0n : 10n ** BigInt(length - 1);
	const maxExclusive = 10n ** BigInt(length);
	const range = maxExclusive - min;
	const randomOffset = randomBigIntBelow(range);
	return min + randomOffset;
};

module.exports = { getRandomInt };
