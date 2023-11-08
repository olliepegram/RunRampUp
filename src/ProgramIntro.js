import ProgramIntroZones from './ProgramIntroZones';
import styles from './ProgramIntro.module.css';

function ProgramIntro({ user, heartRateZones, longRunDay, conversion }) {
	let lastWeek = null;
	let longestRun = null;
	let speedDay = null;

	const weekDays = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	if (user && Object.keys(user).length > 0) {
		const lastObj = user[Object.keys(user)[Object.keys(user).length - 1]];

		if (Array.isArray(lastObj)) {
			lastWeek = lastObj.find((item) => item.week);
			longestRun = lastObj.sort((a, b) => b.distance - a.distance)[0].distance;
			speedDay = lastObj.find((item) => item.typeName === 'speed');
		}
	}

	const intro = () => {
		return (
			<div className={styles.introTextWrapper}>
				<h2>Program Stats</h2>
				<p>Training weeks: {lastWeek && lastWeek.week}</p>
				<p>
					Ending weekly distance: {lastWeek && lastWeek.currentWeeklyDistance}
					{conversion}
				</p>
				<p>Long run day: {longRunDay}</p>
				<p>Speed / Tempo day: {weekDays[speedDay.day - 1]}</p>
				<p>Longest run: {longestRun}</p>
			</div>
		);
	};

	return (
		<div className={styles.introWrapper}>
			{intro()}
			<ProgramIntroZones heartRateZones={heartRateZones} />
		</div>
	);
}

export default ProgramIntro;
