type Issue = {
	data: {
		received: string;
		parsed: string;
	};
} & (
	| {
			type: 'length';
			expected: [11, 14];
			received: number;
	  }
	| ({
			data: {
				masked: string;
			};
	  } & (
			| {
					type: 'digits';
					expected: string;
					received: string;
			  }
			| {
					type: 'sequential';
			  }
	  ))
);

export default Issue;
