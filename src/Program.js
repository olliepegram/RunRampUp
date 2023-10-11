const calculateHeartRateZones = (minHeartRate, maxHeartRate) => {
	const zones = {
		'Zone 1': [0.5, 0.6],
		'Zone 2': [0.6, 0.7],
		'Zone 3': [0.7, 0.8],
		'Zone 4': [0.8, 0.9],
		'Zone 5': [0.9, 1.0],
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
	runningDaysPerWeek
) => {
	const weeklyDistanceIncreasePercentage = 0.1;
	const weeklySpeed = 0.2 * currentWeeklyDistance;
	const longRunDay = 0.4 * currentWeeklyDistance;
	const easyRuns = currentWeeklyDistance - weeklySpeed - longRunDay;
	const daysPerWeek = 7;

	let currentWeek = 1;
	const schedule = [];

	while (currentWeeklyDistance < desiredRunningDistance) {
		for (let i = 0 + 1; i < daysPerWeek; i++) {}

		currentWeeklyDistance +=
			weeklyDistanceIncreasePercentage * currentWeeklyDistance;
		currentWeek++;
	}
	return schedule;
};

function Program({ user }) {
	const { minHeartRate, maxHeartRate } = user;
	const heartRateZones = calculateHeartRateZones(minHeartRate, maxHeartRate);
	const catagories = {
		easy: { heartRate: heartRateZones['Zone 2'], difficulty: 'easy' },
		temp: { heartRate: maxHeartRate * 0.87, difficulty: 'hard' },
		speed: { heartRate: maxHeartRate * 0.94, difficulty: 'hard' },
		long: { heartRate: heartRateZones['Zone 2'], difficulty: 'hard' },
	};

	// Example usage
	const currentWeeklyDistance = 10; // Replace with the starting weekly distance in km
	const desiredWeeklyDistance = 30; // Replace with the desired weekly distance in km
	const runningDaysPerWeek = 4; // Replace with the number of running days per week

	const program = generateRunningProgram(
		currentWeeklyDistance,
		desiredWeeklyDistance,
		runningDaysPerWeek
	);

	// Output the generated running program
	console.log('Running Program:');
	program.forEach((day) => console.log(day));

	return <div>Program</div>;
}

export default Program;
