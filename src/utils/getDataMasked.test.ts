import { describe, it } from 'node:test';
import assert from 'node:assert';
import getDataMasked from './getDataMasked';

describe(__filename, () => {
	it('CPF', () => {
		assert.strictEqual(getDataMasked('12345678909'), '123.456.789-09');
	});

	it('CNPJ', () => {
		assert.strictEqual(getDataMasked('12345678901230'), '12.345.678/9012-30');
	});
});
