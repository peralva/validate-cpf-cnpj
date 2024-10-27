// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EXPECTED = [11, 14] as const;

export default class extends Error {
	declare issue;

	constructor(
		issue:
			| {
					type: 'sequential';
			  }
			| {
					type: 'length';
					expected: typeof EXPECTED;
					received: number;
			  }
			| {
					type: 'digits';
					expected: string;
					received: string;
			  },
	) {
		if (issue.type === 'sequential') {
			super('CPF cannot be sequential');
		} else {
			super(
				`${issue.type}: expected ${Array.isArray(issue.expected) ? issue.expected.join(' | ') : issue.expected}, received ${issue.received}`,
			);
		}

		this.issue = issue;
	}
}
