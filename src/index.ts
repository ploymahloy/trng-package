const getHighResTime = () => {
	switch (true) {
		case typeof process !== 'undefined' && !!process.hrtime?.bigint:
			return process.hrtime.bigint();
		case typeof performance !== 'undefined' && !!performance.now:
			return BigInt(Math.floor(performance.now() * 1000000));
		default:
			return BigInt(Date.now() * 1000000);
	}
};

console.log(getHighResTime());
