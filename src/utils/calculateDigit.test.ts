import { describe, it } from 'node:test';
import assert from 'node:assert';
import calculateDigit from './calculateDigit';

describe(__filename, () => {
	it('CPF', () => {
		assert.strictEqual(calculateDigit('123456789'), '09');
	});

	it('CNPJ Numeric', () => {
		assert.strictEqual(calculateDigit('123456789012', 9), '30');
	});

	it('CNPJ Alphanumeric ', () => {
		assert.strictEqual(calculateDigit('12ABC34501DE', 9), '35');
	});
});
