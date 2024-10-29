export default (data: string): string =>
	data.length === 11
		? `${data.substring(0, 3)}.${data.substring(3, 6)}.${data.substring(6, 9)}-${data.substring(9)}`
		: `${data.substring(0, 2)}.${data.substring(2, 5)}.${data.substring(5, 8)}/${data.substring(8, 12)}-${data.substring(12)}`;
