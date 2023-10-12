const calculateHeartRateZones = (minHeartRate, maxHeartRate) => {
	const zones = {
		'Zone 1': [0.5, 0.6],
		'Zone 2': [0.6, 0.7],
		'Zone 3': [0.7, 0.8],
		'Zone 4': [0.8, 0.9],
		'Zone 5': [0.9, 1.0],
		temp: [0.76, 0.88],
		speed: [0.91, 0.94],
		long: [0.65, 0.75],
		rest: [0, 0],
	};

	const heartRateZones = {};

	for (let zone in zones) {
		const [minPercentage, maxPercentage] = zones[zone];
		const minRate = Math.round(
			minHeartRate + (maxHeartRate - minHeartRate) * minPercentage
		);
		const maxRate = Math.round(
			minHeartRate + (maxHeartRate - minHeartRate) * maxPercentage
		);

		heartRateZones[zone] = { minRate, maxRate };
	}
	return heartRateZones;
};

const generateRunningProgram = (
	currentWeeklyDistance,
	desiredRunningDistance,
	runningDays,
	longRunPickedDay = 7,
	catagory
) => {
	const weeklyDistanceIncreasePercentage = 0.1;
	const weeklySpeed = 0.2 * currentWeeklyDistance;
	const longRunDay = 0.4 * currentWeeklyDistance;
	const rest = 0;
	const easyRuns = currentWeeklyDistance - weeklySpeed - longRunDay;
	const daysPerWeek = 7;
	const activeDayId = Array.from({ length: 7 }, (num, i) => {
		return console.log(num[i]);
	});
	// const activeDayId = runningDays.map((day) => {
	// 	return day.id > 0 ? day.id : 0;
	// });

	console.log(activeDayId);

	let currentWeek = 1;
	const schedule = [];

	while (currentWeeklyDistance < desiredRunningDistance) {
		for (let i = 0 + 1; i <= daysPerWeek; i++) {
			if (activeDayId[i] !== undefined) {
				if (i === longRunPickedDay) {
					schedule.push({
						week: currentWeek,
						day: i,
						runType: catagory['long'],
						distance: longRunDay,
					});
				}
			} else {
				schedule.push({
					week: currentWeek,
					day: i,
					runType: catagory['rest'],
					distance: rest,
				});
			}
		}

		currentWeeklyDistance +=
			weeklyDistanceIncreasePercentage * currentWeeklyDistance;
		currentWeek++;
	}
	return schedule;
};

function Program({ user }) {
	const { minHeartRate, maxHeartRate, activeDays } = user;
	const heartRateZones = calculateHeartRateZones(minHeartRate, maxHeartRate);
	const catagories = {
		easy: { heartRate: heartRateZones['Zone 2'], difficulty: 'easy' },
		tempo: { heartRate: heartRateZones['tempo'], difficulty: 'hard' },
		speed: { heartRate: heartRateZones['speed'], difficulty: 'hard' },
		long: { heartRate: heartRateZones['long'], difficulty: 'hard' },
		rest: { heartRate: heartRateZones['rest'], difficulty: 'easy' },
	};

	// Example usage
	const currentWeeklyDistance = 10; // Replace with the starting weekly distance in km
	const desiredWeeklyDistance = 30; // Replace with the desired weekly distance in km
	const longRunPickedDay = 7; // Replace with the number of running days per week

	const program = generateRunningProgram(
		currentWeeklyDistance,
		desiredWeeklyDistance,
		activeDays,
		longRunPickedDay,
		catagories
	);

	// Output the generated running program
	console.log('Running Program:');
	program.forEach((day) => console.log(day));

	return <div>Program</div>;
}

export default Program;
