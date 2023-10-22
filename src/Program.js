import { useEffect, useState } from 'react';
import styles from './Program.module.css';

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
		for (let i = 0; i < daysPerWeek; i++) {
			if (activeDayId[i]) {
				if (activeDayId[i] === longRunPickedDay) {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['long'],
						distance: longRunDay,
						typeName: 'long',
						currentWeeklyDistance: Math.round(currentWeeklyDistance),
					});
				} else if (i === findClosestActiveDay) {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['speed'],
						distance: weeklySpeed,
						typeName: 'speed',
						currentWeeklyDistance: Math.round(currentWeeklyDistance),
					});
				} else {
					schedule.push({
						week: currentWeek,
						day: i + 1,
						runType: catagory['easy'],
						distance: Number(easyRuns),
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
	console.log(schedule);
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
	const currentWeeklyDistance = currentLoad;
	const desiredWeeklyDistance = goalLoad;
	const longRunPickedDay = longRunDay;

	const heartRateZones = calculateHeartRateZones(minHeartRate, maxHeartRate);
	const catagories = {
		easy: { heartRate: heartRateZones['Zone 2'], difficulty: 'easy' },
		tempo: { heartRate: heartRateZones['tempo'], difficulty: 'hard' },
		speed: { heartRate: heartRateZones['speed'], difficulty: 'hard' },
		long: { heartRate: heartRateZones['long'], difficulty: 'hard' },
		rest: { heartRate: heartRateZones['rest'], difficulty: 'easy' },
	};
	const program = generateRunningProgram(
		currentWeeklyDistance,
		desiredWeeklyDistance,
		days,
		longRunPickedDay,
		catagories
	);
	const [runData, setRunData] = useState(program);
	const [groupedRunData, setGroupedRunData] = useState({});

	useEffect(() => {
		const groupedData = runData.reduce((acc, item) => {
			const weekNumber = item.week;

			if (!acc[weekNumber]) {
				acc[weekNumber] = [];
			}

			acc[weekNumber].push(item);
			return acc;
		}, {});

		setGroupedRunData(groupedData);
	}, [runData]);

	const renderWeeks = (runData) => {
		const weekDays = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		];
		return Object.entries(runData).map(([weekNumber, weekData]) => (
			<div
				className={styles.item}
				key={weekNumber}
			>
				<div className={styles.header}>
					<h2>Week: {weekNumber}</h2>
				</div>
				<table className={styles.tableWrapper}>
					<tr className={styles.workoutHeaderWrapper}>
						<td className={styles.workoutHeader}>Day</td>
						<td className={styles.workoutHeader}>Run Type</td>
						<td className={styles.workoutHeader}>Distance</td>
						<td className={styles.workoutHeader}>Heart Rate (min - max)</td>
					</tr>
					{weekData.map((day, i) => {
						return (
							<tr
								className={styles.row}
								key={day.day}
							>
								<td className={styles.workoutSpan}>{weekDays[i]}</td>

								<td className={styles.workoutSpan}>{day.typeName}</td>
								<td className={styles.workoutSpan}>{day.distance}</td>
								<td className={styles.workoutSpan}>
									{day.runType.heartRate.minRate} -{' '}
									{day.runType.heartRate.maxRate}
								</td>
							</tr>
						);
					})}
				</table>
				{weekData.length > 0 && (
					<div className={styles.weeklyDistance}>
						<span>Weekly Distance: {weekData[0].currentWeeklyDistance}</span>
					</div>
				)}
			</div>
		));
	};

	return (
		<div className={styles.programContainer}>{renderWeeks(groupedRunData)}</div>
	);
}

export default Program;
