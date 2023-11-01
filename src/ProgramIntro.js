import ProgramIntroZones from './ProgramIntroZones';
import styles from './ProgramIntro.module.css';

function ProgramIntro({ user, heartRateZones, longRunDay }) {
	let lastWeek = null;

	if (user && Object.keys(user).length > 0) {
		const lastObj = user[Object.keys(user)[Object.keys(user).length - 1]];

		if (Array.isArray(lastObj)) {
			lastWeek = lastObj.find((item) => item.week);
		}
	}

	console.log(longRunDay);

	const intro = () => {
		return (
			<div className={styles.introTextWrapper}>
				<h2>Program Stats TODO</h2>
				<p>Training weeks: {lastWeek && lastWeek.week}</p>
				<p>
					Ending weekly distance: {lastWeek && lastWeek.currentWeeklyDistance}
				</p>
				<p>Long run day: {longRunDay}</p>
				<p>Speed / Tempo day: </p>
				<p>Longest run: </p>
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
