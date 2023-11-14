import styles from './HomeIntro.module.css';
import arrow from './arrow.png';
import arrowSmall from './arrow-small.png';

function HomeIntro() {
	return (
		<div className={styles.container}>
			<img
				src={arrow}
				alt={'logo of an arrow that looks like stairs'}
				className={styles.arrow}
			/>

			<h2>
				Don't just train hard, <span>train smart.</span>
			</h2>
			<p>
				Run Ramp Up is passionate about prioritizing heart rate (HR) zone
				training. Our approach revolves around tailoring your workouts to
				specific heart rate zones, each zone with specific adaptations and
				intensity levels.
			</p>

			<button>Learn More</button>
		</div>
	);
}

export default HomeIntro;
