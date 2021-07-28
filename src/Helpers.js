export function capitalise(string) {
	let wordArray = string.split(" ");
	let capWordArray = wordArray.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});
	return capWordArray.join(" ");
}
