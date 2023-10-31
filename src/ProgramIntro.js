import ProgramIntroZones from './ProgramIntroZones';
import styles from './ProgramIntro.module.css';

function ProgramIntro({ user, heartRateZones }) {
	const weeksTrainingFor = () => {
		const lastObj = user[Object.keys(user)[Object.keys(user).length - 1]];
		// const lastWeek = lastObj.find((item) => {
		// 	return item.week;
		// });

		// return lastWeek.week;
	};

	const intro = () => {
		return (
			<div className={styles.introTextWrapper}>
				<h2>Program Stats TODO</h2>
				<p>Training weeks: {weeksTrainingFor()}</p>
				<p>Ending weekly distance: </p>
				<p>Long run day: </p>
				<p>Speed / Temp day: </p>
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
