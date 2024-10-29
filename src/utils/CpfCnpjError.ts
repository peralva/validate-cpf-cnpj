import ErrorMap from '../types/ErrorMap';
import Issue from '../types/Issue';
import IssueWithDefaultError from '../types/IssueWithDefaultError';

export default class extends Error {
	declare issue: IssueWithDefaultError;

	constructor(issue: Issue, errorMap?: ErrorMap) {
		let defaultError;

		if (issue.type === 'sequential') {
			defaultError = 'CPF cannot be sequential';
		} else {
			defaultError = `${issue.type}: expected ${Array.isArray(issue.expected) ? issue.expected.join(' | ') : issue.expected}, received ${issue.received}`;
		}

		const _issue: IssueWithDefaultError = {
			...issue,
			defaultError,
		};

		if (errorMap) {
			const resultErrorMap = errorMap(_issue);

			if (resultErrorMap) {
				super(resultErrorMap);
			} else {
				super(_issue.defaultError);
			}
		} else {
			super(defaultError);
		}

		this.issue = _issue;
	}
}
