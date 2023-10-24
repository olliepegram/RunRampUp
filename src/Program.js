import { useEffect, useState } from 'react';
import styles from './Program.module.css';
import { calculateHeartRateZones } from './utils/calculateHeartRateZones';
import { generateRunningProgram } from './utils/generateRunningProgram';

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
			console.log(groupedRunData);
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
					<thead>
						<tr className={styles.workoutHeaderWrapper}>
							<td className={styles.workoutHeader}>Day</td>
							<td className={styles.workoutHeader}>Run Type</td>
							<td className={styles.workoutHeader}>Distance</td>
							<td className={styles.workoutHeader}>Heart Rate (min - max)</td>
						</tr>
					</thead>
					{weekData.map((day, i) => {
						return (
							<tbody
								key={day.day}
								className={styles.row}
							>
								<tr>
									<td className={styles.workoutSpan}>{weekDays[i]}</td>

									<td className={styles.workoutSpan}>{day.typeName}</td>
									<td className={styles.workoutSpan}>{day.distance}</td>
									<td className={styles.workoutSpan}>
										{day.runType.heartRate.minRate} -{' '}
										{day.runType.heartRate.maxRate}
									</td>
								</tr>
							</tbody>
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
