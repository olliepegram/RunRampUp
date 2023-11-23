import { useEffect, useState } from 'react';
import styles from './Program.module.css';
import { calculateHeartRateZones } from './utils/calculateHeartRateZones';
import { generateRunningProgram } from './utils/generateRunningProgram';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import arrow from './arrow.png';
import bg from './run.jpeg';

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
	const [lastWeekData, setLastWeekData] = useState(null);

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

	const introText = (user) => {
		let lastWeek = null;
		let longestRun = null;
		if (user && Object.keys(user).length > 0) {
			const lastObj = user[Object.keys(user)[Object.keys(user).length - 1]];

			if (Array.isArray(lastObj)) {
				lastWeek = lastObj.find((item) => item.week);
				longestRun = lastObj.sort((a, b) => b.distance - a.distance)[0]
					.distance;
				// speedDay = lastObj.find((item) => item.typeName === 'speed').day - 1;
			}
		}
		return [lastWeek.week, longestRun];
	};
	introText(groupedRunData);
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
						<img
							src={arrow}
							className={styles.arrow}
							alt={'steps and an arrow'}
						/>
						<h4 className={styles.overlayText}>
							{introText(groupedRunData)[0]} Week Running Plan
						</h4>
					</div>
					<div>
						<button className={styles.programButton}>Download CSV</button>
					</div>
				</div>
			</div>
			<div className={styles.mainSection}>
				<img
					src={bg}
					alt={'snowy mountain'}
					className={styles.bg}
				/>
				<div className={styles.mainSectionContent}>
					<h2>About Running Program</h2>
				</div>
			</div>
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
