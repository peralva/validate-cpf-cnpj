import { describe, it } from 'node:test';
import assert from 'node:assert';
import getDataParsed from './getDataParsed';

describe(__filename, () => {
	it('CPF', () => {
		assert.strictEqual(getDataParsed('123 456 789 09'), '12345678909');
	});

	it('CNPJ', () => {
		assert.strictEqual(getDataParsed('12 345 678 9012 30'), '12345678901230');
	});
});
