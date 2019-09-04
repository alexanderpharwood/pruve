export default function(value){
	if (typeof Blob === 'undefined') {
		throw new ReferenceError('Blob is undefined');
	}
	
	return value instanceof Blob;
}
