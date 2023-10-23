export const generateRunningProgram = (
	currentWeeklyDistance,
	desiredRunningDistance,
	runningDays,
	longRunPickedDay = 7,
	catagory
) => {
	const activeDayId = runningDays.map((day) => {
		if (day.active) {
			return day.id;
		} else {
			return 0;
		}
	});

	const activeDaysOnly = runningDays.filter((day) => day.active);

	const daysPerWeek = 7;

	let currentWeek = 1;
	const schedule = [];

	const findClosestActiveDay = activeDayId.findIndex((day, i) => {
		let closestIndex = -1; // Initialize to -1, indicating no active day found.

		// Define a range for days to skip (e.g., 3 days before and after the long run day)
		const daysToSkip = 3;

		// Check if the day is active and not within the range of days to skip
		if (day > 0 && Math.abs(i - longRunPickedDay) > daysToSkip) {
			closestIndex = i; // Set the closest index
		}
		console.log(closestIndex);
		return closestIndex !== -1; // Return true if an active day was found, indicating it should stop searching.
	});

	console.log(findClosestActiveDay);
	while (currentWeeklyDistance < desiredRunningDistance) {
		const weeklyDistanceIncreasePercentage = 0.1;
		const weeklySpeed = 0.2 * currentWeeklyDistance;
		const longRunDay = 0.4 * currentWeeklyDistance;
		const rest = 0;
		const easyRuns = (
			(currentWeeklyDistance - weeklySpeed - longRunDay) /
			(activeDaysOnly.length - 2)
		).toFixed(2);

		for (let i = 0; i < daysPerWeek; i++) {
			if (activeDayId[i]) {
				if (activeDayId[i] === longRunPickedDay) {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['long'],
						distance: longRunDay.toFixed(1),
						typeName: 'long',
						currentWeeklyDistance: Math.round(currentWeeklyDistance),
					});
				} else if (i === activeDayId[findClosestActiveDay]) {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['speed'],
						distance: weeklySpeed.toFixed(1),
						typeName: 'speed',
						currentWeeklyDistance: Math.round(currentWeeklyDistance),
					});
				} else {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['easy'],
						distance: Number(easyRuns).toFixed(1),
						typeName: 'easy',
						currentWeeklyDistance: Math.round(currentWeeklyDistance),
					});
				}
			} else {
				schedule.push({
					week: currentWeek,
					day: i + 1,
					runType: catagory['rest'],
					distance: rest,
					typeName: `rest`,
					currentWeeklyDistance: Math.round(currentWeeklyDistance),
				});
			}
		}

		currentWeeklyDistance +=
			weeklyDistanceIncreasePercentage * currentWeeklyDistance;
		currentWeek++;
	}

	return schedule;
};
