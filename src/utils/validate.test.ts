import { describe, it } from 'node:test';
import assert from 'node:assert';
import validate from './validate';

describe(__filename, () => {
	it('CPF Valid', () => {
		assert.deepStrictEqual(validate('123 456 789 09'), {
			data: '12345678909',
			masked: '123.456.789-09',
		});
	});

	it('CNPJ Numeric Valid', () => {
		assert.deepStrictEqual(validate('12 345 678 9012 30'), {
			data: '12345678901230',
			masked: '12.345.678/9012-30',
		});
	});

	it('CNPJ Alphanumeric Valid', () => {
		assert.deepStrictEqual(validate('12 ABC 345 01DE 35'), {
			data: '12ABC34501DE35',
			masked: '12.ABC.345/01DE-35',
		});
	});

	it('Length Error', () => {
		assert.throws(() => {
			validate('123ABC78909');
		});
	});

	it('Sequencial Error', () => {
		assert.throws(() => {
			validate('55555555555');
		});
	});

	it('CPF Invalid', () => {
		assert.throws(() => {
			validate('12345678912');
		});
	});

	it('CNPJ Numeric Invalid', () => {
		assert.throws(() => {
			validate('12345678901234');
		});
	});

	it('CNPJ Alphanumeric Invalid', () => {
		assert.throws(() => {
			validate('12ABC34501DE89');
		});
	});
});
