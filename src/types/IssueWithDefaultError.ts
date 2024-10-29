import Issue from './Issue';

type IssueWithDefaultError = Issue & {
	defaultError: string;
};

export default IssueWithDefaultError;
