export const randomDate = (start, end): Date => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
};
