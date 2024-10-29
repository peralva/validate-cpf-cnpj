import IssueWithDefaultError from './IssueWithDefaultError';

type ErrorMap = (issue: IssueWithDefaultError) => string | undefined;

export default ErrorMap;
