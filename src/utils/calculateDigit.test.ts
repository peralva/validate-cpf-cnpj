import { describe, it } from 'node:test';
import assert from 'node:assert';
import calculateDigit from './calculateDigit';

describe(__filename, () => {
	it('CPF', () => {
		assert.strictEqual(calculateDigit('123456789'), '09');
	});

	it('CNPJ', () => {
		assert.strictEqual(calculateDigit('123456789012', 9), '30');
	});
});
