type WebCryptoLike = {
	getRandomValues: (typedArray: Uint32Array) => Uint32Array;
};

const nodeRandomInt = (): ((min: number, max: number) => number) | undefined => {
	if (typeof require !== 'function') {
		return undefined;
	}

	try {
		const nodeCrypto = require('node:crypto') as { randomInt?: (min: number, max: number) => number };
		return nodeCrypto.randomInt;
	} catch {
		return undefined;
	}
};

const browserCrypto = (): WebCryptoLike | undefined => {
	if (typeof globalThis === 'undefined' || typeof globalThis.crypto === 'undefined') {
		return undefined;
	}

	if (typeof globalThis.crypto.getRandomValues !== 'function') {
		return undefined;
	}

	const getRandomValues = globalThis.crypto.getRandomValues as unknown as (typedArray: Uint32Array) => Uint32Array;
	return {
		getRandomValues
	};
};

const browserRandomInt = (min: number, max: number): number | undefined => {
	const cryptoApi = browserCrypto();
	if (!cryptoApi || typeof cryptoApi.getRandomValues !== 'function') {
		return undefined;
	}

	const range = max - min + 1;
	if (range <= 0 || range > 0x1_0000_0000) {
		return undefined;
	}

	const maxUint32 = 0xffff_ffff;
	const bucketLimit = maxUint32 - ((maxUint32 + 1) % range);
	const randomValues = new Uint32Array(1);

	while (true) {
		cryptoApi.getRandomValues(randomValues);
		const candidate = randomValues[0];
		if (typeof candidate === 'undefined') {
			continue;
		}

		if (candidate <= bucketLimit) {
			return min + (candidate % range);
		}
	}
};

const nodeTimeNs = (): bigint => process.hrtime.bigint();
const browserTimeNs = (): bigint => BigInt(Math.floor(performance.now() * 1_000_000));
const fallbackTimeNs = (): bigint => BigInt(Date.now() * 1_000_000);

const getHighResTime = (): bigint => {
	if (typeof process !== 'undefined' && typeof process.hrtime?.bigint === 'function') {
		return nodeTimeNs();
	}

	if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
		return browserTimeNs();
	}

	return fallbackTimeNs();
};

const getRandomInt = (min: number, max: number): number => {
	if (!Number.isInteger(min) || !Number.isInteger(max)) {
		throw new TypeError('getRandomInt(min, max) expects integer arguments.');
	}

	if (min > max) {
		throw new RangeError('getRandomInt(min, max) expects min to be less than or equal to max.');
	}

	const nodeRandomIntFn = nodeRandomInt();
	if (nodeRandomIntFn) {
		return nodeRandomIntFn(min, max + 1);
	}

	const secureBrowserRandom = browserRandomInt(min, max);
	if (typeof secureBrowserRandom === 'number') {
		return secureBrowserRandom;
	}

	const fallbackRange = BigInt(max - min + 1);
	return Number(getHighResTime() % fallbackRange) + min;
};

module.exports = { getRandomInt };
