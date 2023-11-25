import { useEffect, useState } from 'react';
import styles from './Program.module.css';
import { calculateHeartRateZones } from './utils/calculateHeartRateZones';
import { generateRunningProgram } from './utils/generateRunningProgram';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProgramIntro from './ProgramIntro';

function Program() {
	const location = useLocation();
	// https://stackoverflow.com/questions/41736048/what-is-a-state-in-link-component-of-react-router
	const user = location.state && location.state.user;

	const {
		currentLoad,
		goalLoad,
		minHeartRate,
		maxHeartRate,
		days,
		longRunDay,
		speedDay,
		conversion,
	} = user || {};
	const currentWeeklyDistance = currentLoad;
	const desiredWeeklyDistance = goalLoad;
	const longRunPickedDay = longRunDay;
	const speedDayPicked = speedDay;

	const heartRateZones = calculateHeartRateZones(minHeartRate, maxHeartRate);

	const catagories = {
		easy: { heartRate: heartRateZones['Zone 2'], difficulty: 'easy' },
		tempo: { heartRate: heartRateZones['tempo'], difficulty: 'hard' },
		speed: { heartRate: heartRateZones['speed'], difficulty: 'hard' },
		long: { heartRate: heartRateZones['Zone 2'], difficulty: 'hard' },
		rest: { heartRate: heartRateZones['rest'], difficulty: 'easy' },
	};
	const program = generateRunningProgram(
		currentWeeklyDistance,
		desiredWeeklyDistance,
		days,
		longRunPickedDay,
		speedDayPicked,
		catagories
	);
	const [runData, setRunData] = useState(program);
	const [groupedRunData, setGroupedRunData] = useState({});
	const [lastWeekData, setLastWeekData] = useState(1);

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

	useEffect(() => {
		let lastWeek = 1;
		let longestRun = null;
		if (groupedRunData && Object.keys(groupedRunData).length > 0) {
			const lastObj =
				groupedRunData[
					Object.keys(groupedRunData)[Object.keys(groupedRunData).length - 1]
				];

			if (Array.isArray(lastObj)) {
				lastWeek = lastObj.find((item) => item.week);
				longestRun = lastObj.sort((a, b) => b.distance - a.distance)[0]
					.distance;
				// speedDay = lastObj.find((item) => item.typeName === 'speed').day - 1;
			}
		}
		setLastWeekData(lastWeek.week);
		console.log(lastWeek.week);
	}, [groupedRunData]);

	const renderWeeks = (groupedRunData) => {
		const weekDays = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		];

		const allDays = Object.values(groupedRunData)
			.flatMap((weekData) => weekData.map((day) => day.day))
			.filter((value, index, self) => self.indexOf(value) === index);
		return (
			<table className={styles.tableWrapper}>
				<thead>
					<tr>
						<th className={styles.workoutHeader}>Week</th>
						{weekDays.map((day, index) => (
							<th
								key={index}
								className={styles.workoutHeader}
							>
								{day}
							</th>
						))}
						<th className={styles.workoutHeader}>Total Distance</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(groupedRunData).map(([weekNumber, weekData]) => (
						<tr
							className={styles.row}
							key={weekNumber}
						>
							<td className={styles.weekHeader}>
								<div>Week: {weekNumber}</div>
								<div>Distance:</div>
								<div>HR:</div>
							</td>

							{allDays.map((day) => {
								const dayData = weekData.find((item) => item.day === day);
								return (
									<td
										key={day}
										className={styles.workoutSpan}
									>
										{dayData && (
											<>
												<div>{dayData.typeName}</div>
												<div>
													{dayData.typeName !== 'rest'
														? `${Math.round(dayData.distance)} KMs`
														: '-'}
												</div>
												<div>
													{dayData.typeName !== 'rest'
														? `${dayData.runType.heartRate.minRate} - ${dayData.runType.heartRate.maxRate}`
														: '-'}
												</div>
											</>
										)}
									</td>
								);
							})}
							<td className={styles.workoutSpan}>
								{weekData[0].currentWeeklyDistance} KMs
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<>
			<Header />
			<div className={styles.upperSection}>
				<div className={styles.upperInnerSection}>
					<div className={styles.leftIntro}>
						<h4 className={styles.overlayText}>
							{lastWeekData} Week Running Plan
						</h4>
					</div>
					<div>
						<button className={styles.programButton}>Download CSV</button>
					</div>
				</div>
			</div>
			<ProgramIntro heartRateZones={heartRateZones} />
			<div className={styles.wrapper}>
				<div className={styles.programContainer}>
					{renderWeeks(groupedRunData)}
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Program;
