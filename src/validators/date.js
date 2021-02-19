export default function(value){
	if (value instanceof Date) return true;
	const dateInstance = new Date(value);
	if (dateInstance.toString() === "Invalid Date") return false;
	return isNaN(dateInstance.getTime()) === false;
}
