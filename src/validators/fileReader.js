export default function(value){
	if (typeof FileReader === 'undefined') {
		throw new ReferenceError('FileReader is undefined');
	}
	
	return value instanceof FileReader;
}
