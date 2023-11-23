export const generateRunningProgram = (
	currentWeeklyDistance,
	desiredRunningDistance,
	runningDays,
	longRunPickedDay = 7,
	speedDayPicked,
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

	// const findClosestActiveDay = activeDayId.findIndex((day, i) => {
	// 	let closestIndex = -1;

	// 	const daysToSkip = 2;

	// 	// Check if the day is active and not within the range of days to skip
	// 	if (day > 0 && Math.abs(i - longRunPickedDay) > daysToSkip) {
	// 		closestIndex = i; // Set the closest index
	// 	}
	// 	console.log(closestIndex);
	// 	return closestIndex !== -1;
	// });

	while (currentWeeklyDistance < desiredRunningDistance) {
		let weeklyDistanceIncreasePercentage = 0.1;
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
				} else if (activeDayId[i] === speedDayPicked) {
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

		if (currentWeeklyDistance > 50 && currentWeeklyDistance < 70) {
			weeklyDistanceIncreasePercentage = 0.05;
		} else if (currentWeeklyDistance > 70) {
			weeklyDistanceIncreasePercentage = 0.03;
		}
		currentWeeklyDistance +=
			weeklyDistanceIncreasePercentage * currentWeeklyDistance;
		currentWeek++;
	}

	return schedule;
};
