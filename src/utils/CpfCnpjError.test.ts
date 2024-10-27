import { describe, it } from 'node:test';
import assert from 'node:assert';
import CpfCnpjError from './CpfCnpjError';

describe(__filename, () => {
	it('Length', () => {
		const expected = [11, 14] as const;

		const issue: {
			type: 'length';
			expected: typeof expected;
			received: number;
		} = {
			type: 'length',
			expected,
			received: 1,
		};

		const err = new CpfCnpjError(issue);

		assert.equal(
			err.message,
			`${issue.type}: expected ${issue.expected.join(' | ')}, received ${issue.received}`,
			'messsage',
		);

		assert.deepStrictEqual(err.issue, issue, 'issue');
	});

	it('Sequencial', () => {
		const issue: { type: 'sequential' } = { type: 'sequential' };

		const err = new CpfCnpjError(issue);

		assert.equal(err.message, `CPF cannot be sequential`, 'messsage');
		assert.deepStrictEqual(err.issue, issue, 'issue');
	});

	it('Digits', () => {
		const issue: {
			type: 'digits';
			expected: string;
			received: string;
		} = {
			type: 'digits',
			expected: '12',
			received: '13',
		};

		const err = new CpfCnpjError(issue);

		assert.equal(
			err.message,
			`${issue.type}: expected ${issue.expected}, received ${issue.received}`,
			'messsage',
		);

		assert.deepStrictEqual(err.issue, issue, 'issue');
	});
});
