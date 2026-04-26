# trng-crypto

A small TypeScript/Node.js utility that generates a cryptographically secure random integer with a specific digit length.

## Features

- Uses Node's `crypto.randomBytes()` for secure randomness.
- Avoids modulo bias via rejection sampling.
- Returns values as `bigint` for safe handling of large integers.

## Install

```bash
npm install
```

## Development

Run in watch mode:

```bash
npm run dev
```

Build TypeScript output:

```bash
npm run build
```

Run compiled output:

```bash
npm start
```

## API

### `getRandomInt(length: number): bigint`

Generates a random integer with exactly `length` decimal digits (except `length = 1`, which may return `0`-`9`).

- `length` must be an integer.
- `length` must be at least `1`.

Throws:

- `TypeError` if `length` is not an integer.
- `RangeError` if `length < 1`.

## Usage

```ts
const { getRandomInt } = require('./dist/index');

const oneDigit = getRandomInt(1); // 0n to 9n
const sixDigits = getRandomInt(6); // 100000n to 999999n

console.log(oneDigit, sixDigits);
```

## Notes

- Project output is configured to compile from `src` to `dist`.
- Current module format is CommonJS.
