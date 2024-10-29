export default (data: string): string => {
	let parsed = data.replace(/[^0-9A-Z]+/g, '');
	const cpf = parsed.replace(/[^0-9]+/g, '');

	if (cpf.length === 11) parsed = cpf;
	return parsed;
};
