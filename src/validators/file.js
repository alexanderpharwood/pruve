export default function(value){
	if (typeof File === 'undefined') {
		throw new ReferenceError('File is undefined');
	}
	
	return value instanceof File;
}
