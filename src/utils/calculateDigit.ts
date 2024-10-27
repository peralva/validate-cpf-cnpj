export default (data: string, multiplicationLimit?: number) => {
	let result = '';

	for (let iDigit = 1; iDigit <= 2; iDigit++) {
		let multiplication;
		let sum = 0;

		for (let iData = data.length - 1; iData >= 0; iData--) {
			if (
				!multiplication ||
				(multiplicationLimit && multiplication > multiplicationLimit)
			) {
				multiplication = 2;
			}

			sum += multiplication * (data.charCodeAt(iData) - 48);

			multiplication++;
		}

		const digit = ((sum * 10) % 11) % 10;

		result += digit;
		data += digit;
	}

	return result;
};
