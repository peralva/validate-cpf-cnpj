import { describe, it } from 'node:test';
import assert from 'node:assert';
import validateCpfCnpj from './validateCpfCnpj';

describe(__filename, () => {
	it('CPF Valid', () => {
		assert.deepStrictEqual(validateCpfCnpj('12345678909'), {
			parsed: '12345678909',
			masked: '123.456.789-09',
		});
	});

	it('CNPJ Valid', () => {
		assert.deepStrictEqual(validateCpfCnpj('12345678901230'), {
			parsed: '12345678901230',
			masked: '12.345.678/9012-30',
		});
	});

	it('Length Error', () => {
		assert.throws(() => {
			validateCpfCnpj('1234567890123');
		});
	});

	it('Sequencial Error', () => {
		assert.throws(() => {
			validateCpfCnpj('55555555555');
		});
	});

	it('CPF Invalid', () => {
		assert.throws(() => {
			validateCpfCnpj('12345678912');
		});
	});

	it('CNPJ Invalid', () => {
		assert.throws(() => {
			validateCpfCnpj('12345678901234');
		});
	});

	it('Error Map', () => {
		assert.throws(() => {
			validateCpfCnpj('12345678901234', {
				errorMap(issue) {
					return issue.defaultError;
				},
			});
		});
	});

	it('Clear Data True', () => {
		assert.deepStrictEqual(
			validateCpfCnpj('123 456 789 09', { clearData: true }),
			{
				parsed: '12345678909',
				masked: '123.456.789-09',
			},
		);
	});

	it('Clear Data False', () => {
		assert.throws(() => {
			validateCpfCnpj('123 456 789 09', { clearData: false });
		});
	});
});
