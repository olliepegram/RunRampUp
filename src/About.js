import styles from './About.module.css';

function About() {
	return (
		<div className={styles.aboutContainer}>
			<p>
				This app, designed by a runner for runners, offers a unique training
				program to prevent common mistakes. Many recreational athletes often
				rush into high-intensity workouts, but a significant portion (65-70%) of
				your training should actually be at an easier intensity. Zone 2 Heart
				Rate Training can help change this misconception.
			</p>
		</div>
	);
}

export default About;
