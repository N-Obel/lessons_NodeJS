
export function getCurrentSeason() {
	const month = new Date().getMonth()
	let currentMonth
	switch (month) {
		case 12:
		case 1:
		case 2: currentMonth = 'Winter'
			break;
		case 3:
		case 4:
		case 5: currentMonth = 'Spring'
			break;
		case 6:
		case 7:
		case 8: currentMonth = 'Summer'
			break;
		case 9:
		case 10:
		case 11: currentMonth = 'Fall'
			break;
		default:
			currentMonth = 'Wrong data!'
			break;
	}
	return currentMonth
}

export function getCurrentDay() {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return daysOfWeek[new Date().getDay()];
}

export function getCurrentTime() {
	const hour = new Date().getHours()

	let currentTime
	if(hour < 11) currentTime = 'Morning'
	else if (hour < 18) currentTime = 'Noon'
	else currentTime = 'Evening'
	
	return currentTime
}