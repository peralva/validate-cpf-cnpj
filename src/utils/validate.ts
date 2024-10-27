import calculateDigit from './calculateDigit.js';
import CpfCnpjError from './CpfCnpjError.js';

export default (
	data: string,
): {
	data: string;
	masked: string;
} => {
	data = data.replace(/[^0-9A-Z]+/g, '');
	const cpf = data.replace(/[^0-9]+/g, '');

	if (cpf.length !== 11 && data.length !== 14) {
		throw new CpfCnpjError({
			type: 'length',
			expected: [11, 14],
			received: data.length,
		});
	} else if (cpf.length === 11) {
		data = cpf;

		const digitsSplited = data.split('').map((digit) => Number(digit));

		if (
			digitsSplited.every(
				(digit, index) => index === 0 || digit === digitsSplited[index - 1],
			)
		) {
			throw new CpfCnpjError({ type: 'sequential' });
		}
	}

	let masked;

	if (data.length === 11) {
		masked = `${data.substring(0, 3)}.${data.substring(3, 6)}.${data.substring(6, 9)}-${data.substring(9)}`;
	} else {
		masked = `${data.substring(0, 2)}.${data.substring(2, 5)}.${data.substring(5, 8)}/${data.substring(8, 12)}-${data.substring(12)}`;
	}

	const digits = data.substring(data.length - 2);

	const correct = calculateDigit(
		data.substring(0, data.length - 2),
		data.length === 14 ? 9 : undefined,
	);

	if (digits !== correct) {
		throw new CpfCnpjError({
			type: 'digits',
			expected: correct,
			received: digits,
		});
	}

	return {
		data,
		masked,
	};
};
