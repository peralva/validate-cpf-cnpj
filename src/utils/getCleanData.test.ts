import { describe, it } from 'node:test';
import assert from 'node:assert';
import getCleanData from './getCleanData';

describe(__filename, () => {
	it('CPF', () => {
		assert.strictEqual(getCleanData('123 456 789 09'), '12345678909');
	});

	it('CNPJ', () => {
		assert.strictEqual(getCleanData('12 345 678 9012 30'), '12345678901230');
	});
});
