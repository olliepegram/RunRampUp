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
	const activeDayId = runningDays.map((day) => {
		if (day.active) {
			return day.id;
		} else {
			return 0;
		}
	});
	const activeDaysOnly = runningDays.filter((day) => day.active);
	console.log(activeDaysOnly.length);
	const weeklyDistanceIncreasePercentage = 0.1;
	const weeklySpeed = 0.2 * currentWeeklyDistance;
	const longRunDay = 0.4 * currentWeeklyDistance;
	const rest = 0;
	const easyRuns = (
		(currentWeeklyDistance - weeklySpeed - longRunDay) /
		(activeDaysOnly.length - 2)
	).toFixed(2);
	const daysPerWeek = 7;

	let currentWeek = 1;
	const schedule = [];
	const speedDay = longRunPickedDay - 2;

	while (currentWeeklyDistance < desiredRunningDistance) {
		for (let i = 0; i < daysPerWeek; i++) {
			if (activeDayId[i]) {
				if (activeDayId[i] === longRunPickedDay) {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['long'],
						distance: longRunDay,
						typeName: 'long',
					});
				} else if (activeDayId[i] === speedDay) {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['speed'],
						distance: weeklySpeed,
						typeName: 'speed',
					});
				} else {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['easy'],
						distance: Number(easyRuns),
						typeName: 'easy',
					});
				}
			} else {
				schedule.push({
					week: currentWeek,
					day: i + 1,
					runType: catagory['rest'],
					distance: rest,
					typeName: `rest`,
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
	const {
		currentLoad,
		goalLoad,
		minHeartRate,
		maxHeartRate,
		days,
		longRunDay,
	} = user;
	const heartRateZones = calculateHeartRateZones(minHeartRate, maxHeartRate);
	const catagories = {
		easy: { heartRate: heartRateZones['Zone 2'], difficulty: 'easy' },
		tempo: { heartRate: heartRateZones['tempo'], difficulty: 'hard' },
		speed: { heartRate: heartRateZones['speed'], difficulty: 'hard' },
		long: { heartRate: heartRateZones['long'], difficulty: 'hard' },
		rest: { heartRate: heartRateZones['rest'], difficulty: 'easy' },
	};

	const currentWeeklyDistance = currentLoad;
	const desiredWeeklyDistance = goalLoad;
	const longRunPickedDay = longRunDay;

	const program = generateRunningProgram(
		currentWeeklyDistance,
		desiredWeeklyDistance,
		days,
		longRunPickedDay,
		catagories
	);

	// Output the generated running program
	console.log('Running Program:');
	program.forEach((day) => console.log(day));

	return <div>Program</div>;
}

export default Program;
