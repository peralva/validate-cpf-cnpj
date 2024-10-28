import calculateDigit from './calculateDigit.js';
import CpfCnpjError, { ErrorMap } from './CpfCnpjError.js';
import getMask from './getDataMasked.js';
import getDataParsed from './getDataParsed.js';

export default (
	data: string,
	errorMap?: ErrorMap,
): {
	parsed: string;
	masked: string;
} => {
	const parsed = getDataParsed(data);

	if (parsed.length !== 11 && parsed.length !== 14) {
		const issue: {
			type: 'length';
			expected: [11, 14];
			received: number;
		} = {
			type: 'length',
			expected: [11, 14],
			received: parsed.length,
		};

		throw new CpfCnpjError(
			{
				...issue,
				data: {
					received: data,
					parsed,
				},
			},
			errorMap,
		);
	}

	const masked = getMask(parsed);

	if (parsed.length === 11) {
		const digitsSplited = parsed.split('').map((digit) => Number(digit));

		if (
			digitsSplited.every(
				(digit, index) => index === 0 || digit === digitsSplited[index - 1],
			)
		) {
			throw new CpfCnpjError(
				{
					type: 'sequential',
					data: {
						received: data,
						parsed,
						masked,
					},
				},
				errorMap,
			);
		}
	}

	const digits = parsed.substring(parsed.length - 2);

	const correct = calculateDigit(
		parsed.substring(0, parsed.length - 2),
		parsed.length === 14 ? 9 : undefined,
	);

	if (digits !== correct) {
		const issue: {
			type: 'digits';
			expected: string;
			received: string;
		} = {
			type: 'digits',
			expected: correct,
			received: digits,
		};

		throw new CpfCnpjError(
			{
				...issue,
				data: {
					received: data,
					parsed,
					masked,
				},
			},
			errorMap,
		);
	}

	return {
		parsed,
		masked,
	};
};
