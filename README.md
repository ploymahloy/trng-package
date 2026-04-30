# trng-crypto

A small TypeScript/Node.js utility that generates a cryptographically secure random integer with a specific digit length.

## Features

- Uses Node's `crypto.randomBytes()` for secure randomness.
- Avoids modulo bias via rejection sampling.
- Returns `bigint` by default, or a decimal string with `{ type: 'string' }`.

## Install

```bash
npm i trng-crypto
```

### `getRandomInt(desiredOutputLength: number, options?: { type?: 'string' | 'bigint' }): bigint | string`

Generates a random integer with exactly `desiredOutputLength` decimal digits (`desiredOutputLength = 1` may return `0`–`9`).

Optional second argument: pass `{ type: 'string' }` for a decimal string, or `{ type: 'bigint' }` / omit options for a `bigint`. Default output is `bigint`.

- `desiredOutputLength` must be an integer and at least `1`.

Throws:

- `TypeError` if `desiredOutputLength` is not an integer.
- `RangeError` if `desiredOutputLength < 1`.
- `TypeError` if `options.type` is present but not `"string"` or `"bigint"` (e.g. from plain JavaScript).

## Usage

```ts
import { getRandomInt } from 'trng-crypto';

const oneDigit = getRandomInt(1); // 0n to 9n
const sixDigits = getRandomInt(6); // 100000n to 999999n
const asString = getRandomInt(6, { type: 'string' }); // '100000' to '999999'

console.log(oneDigit, sixDigits, asString); // 3n 993284n '276402'
```

```js
const { getRandomInt } = require('trng-crypto');

const oneDigit = getRandomInt(1); // 0n to 9n
const sixDigits = getRandomInt(6); // 100000n to 999999n
const asString = getRandomInt(6, { type: 'string' }); // '100000' to '999999'

console.log(oneDigit, sixDigits, asString); // 8 403709 '855681'
```

## Notes

- Project output is configured to compile from `src` to dual outputs in `dist/cjs` and `dist/esm`.

