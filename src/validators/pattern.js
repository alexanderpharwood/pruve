export default function(value, pattern){
	//Remove the preceeding slash
	pattern = pattern.substring(1);

	// If there is a slash at the end (no flags specified) remove it
	if (pattern.endsWith('/')) {
		pattern = pattern.substring(0, pattern.length - 1);
	}

	var source = pattern;
	var flags = '';

	// If there are flags at the end, extract them, and remove from the pattern
	if (/\/[gimsuy]+$/.test(pattern)) {
		source = pattern.substring(0, pattern.lastIndexOf('/'));
		flags = pattern.substring(pattern.lastIndexOf('/') + 1);
	}

	// Reassemble the into a proper RexExp object with appropriate flags
	const expression = new RegExp(source, flags);
	return expression.test(value) === true;
}
