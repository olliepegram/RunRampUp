import { useEffect, useState } from 'react';
import styles from './Program.module.css';
import { calculateHeartRateZones } from './utils/calculateHeartRateZones';
import { generateRunningProgram } from './utils/generateRunningProgram';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import ProgramIntro from './ProgramIntro';

function Program() {
	const location = useLocation();
	// https://stackoverflow.com/questions/41736048/what-is-a-state-in-link-component-of-react-router
	const user = location.state && location.state.user;
	console.log(user);
	const {
		currentLoad,
		goalLoad,
		minHeartRate,
		maxHeartRate,
		days,
		longRunDay,
		conversion,
	} = user || {};
	const currentWeeklyDistance = currentLoad;
	const desiredWeeklyDistance = goalLoad;
	const longRunPickedDay = longRunDay;
	console.log(longRunDay);

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
									<td className={styles.workoutSpan}>
										{day.typeName !== 'rest' ? day.distance : '-'}
									</td>
									<td className={styles.workoutSpan}>
										{day.typeName !== 'rest'
											? `${day.runType.heartRate.minRate} - ${day.runType.heartRate.maxRate}`
											: '-'}
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
		<>
			<Header />
			<ProgramIntro
				user={groupedRunData}
				heartRateZones={heartRateZones}
				longRunDay={longRunDay}
				conversion={conversion}
			/>
			<div className={styles.programContainer}>
				{renderWeeks(groupedRunData)}
			</div>
		</>
	);
}

export default Program;
