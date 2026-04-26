const { randomInt } = require('node:crypto') as {
	randomInt: (min: number, max: number) => number;
};

const getRandomInt = (length: number): number => {
	if (!Number.isInteger(length)) {
		throw new TypeError('getRandomInt(length) expects an integer argument (length: number).');
	}

	if (length < 1) {
		throw new RangeError('getRandomInt(length) expects length to be at least 1.');
	}

	const min = length === 1 ? 0 : 10 ** (length - 1);
	const maxExclusive = 10 ** length;
	return randomInt(min, maxExclusive);
};

module.exports = { getRandomInt };
