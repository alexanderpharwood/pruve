export default function(value, pattern){
	let expression = new RegExp(pattern);
	return expression.test(value) === true;
}
