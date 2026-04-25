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

console.log(getHighResTime());
