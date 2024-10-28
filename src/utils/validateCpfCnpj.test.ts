import { describe, it } from 'node:test';
import assert from 'node:assert';
import validateCpfCnpj from './validateCpfCnpj';

describe(__filename, () => {
	it('CPF Valid', () => {
		assert.deepStrictEqual(
			validateCpfCnpj('123 456 789 09', (issue) => issue.defaultError),
			{
				parsed: '12345678909',
				masked: '123.456.789-09',
			},
		);
	});

	it('CNPJ Valid', () => {
		assert.deepStrictEqual(
			validateCpfCnpj('12 345 678 9012 30', (issue) => issue.defaultError),
			{
				parsed: '12345678901230',
				masked: '12.345.678/9012-30',
			},
		);
	});

	it('Length Error', () => {
		assert.throws(() => {
			validateCpfCnpj('12 345 678 9012 3', (issue) => issue.defaultError);
		});
	});

	it('Sequencial Error', () => {
		assert.throws(() => {
			validateCpfCnpj('55555555555', (issue) => issue.defaultError);
		});
	});

	it('CPF Invalid', () => {
		assert.throws(() => {
			validateCpfCnpj('12345678912', (issue) => issue.defaultError);
		});
	});

	it('CNPJ Invalid', () => {
		assert.throws(() => {
			validateCpfCnpj('12345678901234', (issue) => issue.defaultError);
		});
	});
});
