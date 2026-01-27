function getStartOfDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Start of th week is Monday */
function getStartOfWeek(date: Date): Date {
	const weekStartOn = 1; // Monday
	const startOfDay = getStartOfDay(date);
	const curWeekDay = startOfDay.getDay();

	const diff = (curWeekDay - weekStartOn + 7) % 7;

	return new Date(startOfDay.getFullYear(), startOfDay.getMonth(), startOfDay.getDate() - diff);
}

function getStartOfMonth(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth());
}

export function getStartOfFrequency(date: Date, frequency: "daily" | "weekly" | "monthly"): Date {
	switch (frequency) {
		case "daily":
			return getStartOfDay(date);
		case "weekly":
			return getStartOfWeek(date);
		case "monthly":
			return getStartOfMonth(date);
	}
}
