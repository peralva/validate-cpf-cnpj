import { describe, it } from 'node:test';
import assert from 'node:assert';
import CpfCnpjError, { Issue, IssueWithDefaultError } from './CpfCnpjError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorMap = (issue: Record<string, any>) => {
	let message = `issue.type: ${issue['type']}\nissue.defaultError: ${issue['defaultError']}\nissue.data.parsed: ${issue['data'].parsed}\nissue.data.received: ${issue['data'].received}`;

	if (issue['type'] === 'digits' || issue['type'] === 'sequential') {
		message += `\nissue.data.masked: ${issue['data'].masked}`;
	}

	if (issue['type'] === 'digits' || issue['type'] === 'length') {
		message += `\nissue.expected: ${issue['expected']}\nissue.received: ${issue['received']}`;
	}

	return message;
};

const test = (issue: Issue, expected: string) => {
	const err = new CpfCnpjError(issue, errorMap);
	assert.equal(err.message, expected);
	assert.deepStrictEqual(err.issue, issue);
};

describe(__filename, () => {
	it('Length', () => {
		const issue: IssueWithDefaultError = {
			type: 'length',
			defaultError: 'length: expected 11 | 14, received 13',
			expected: [11, 14],
			received: 13,
			data: {
				received: '12 345 678 9012 3',
				parsed: '1234567890123',
			},
		};

		test(
			issue,
			`issue.type: ${issue.type}\nissue.defaultError: ${issue.defaultError}\nissue.data.parsed: ${issue.data.parsed}\nissue.data.received: ${issue.data.received}\nissue.expected: ${issue.expected}\nissue.received: ${issue.received}`,
		);
	});

	it('Sequencial', () => {
		const issue: IssueWithDefaultError = {
			type: 'sequential',
			defaultError: 'CPF cannot be sequential',
			data: {
				received: '111 111 111 11',
				parsed: '11111111111',
				masked: '111.111.111-11',
			},
		};

		test(
			issue,
			`issue.type: ${issue.type}\nissue.defaultError: ${issue.defaultError}\nissue.data.parsed: ${issue.data.parsed}\nissue.data.received: ${issue.data.received}\nissue.data.masked: ${issue.data.masked}`,
		);
	});

	it('Digits (CPF)', () => {
		const issue: IssueWithDefaultError = {
			type: 'digits',
			defaultError: 'digits: expected 09, received 12',
			expected: '09',
			received: '12',
			data: {
				received: '123 456 789 12',
				parsed: '12345678912',
				masked: '123.456.789-12',
			},
		};

		test(
			issue,
			`issue.type: ${issue.type}\nissue.defaultError: ${issue.defaultError}\nissue.data.parsed: ${issue.data.parsed}\nissue.data.received: ${issue.data.received}\nissue.data.masked: ${issue.data.masked}\nissue.expected: ${issue.expected}\nissue.received: ${issue.received}`,
		);
	});

	it('Digits (CNPJ)', () => {
		const issue: IssueWithDefaultError = {
			type: 'digits',
			defaultError: 'digits: expected 30, received 34',
			expected: '30',
			received: '34',
			data: {
				received: '12 345 678 9012 34',
				parsed: '12345678901234',
				masked: '12.345.678/9012-34',
			},
		};

		test(
			issue,
			`issue.type: ${issue.type}\nissue.defaultError: ${issue.defaultError}\nissue.data.parsed: ${issue.data.parsed}\nissue.data.received: ${issue.data.received}\nissue.data.masked: ${issue.data.masked}\nissue.expected: ${issue.expected}\nissue.received: ${issue.received}`,
		);
	});
});
