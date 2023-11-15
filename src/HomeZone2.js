import styles from './HomeZone2.module.css';

function HomeZone2() {
	return (
		<div className={styles.containerZone2}>
			<h3>80% of our programming is zone 2 training</h3>
			<p className={styles.subHeading}>See some of the benifits below</p>
			<div className={styles.benefits}>
				<div>
					<h4>Enhanced Mitochondrial Density</h4>
					<p>
						Mitochondria, often termed the cellular powerhouses, are responsible
						for converting oxygen into ATP, the body's primary energy source.
						The greater the number of mitochondria in muscle cells, the more
						advantageous it is for endurance athletes.
					</p>
				</div>
				<div>
					<h4>Injury Prevention</h4>
					<p>
						Zone 2 training allows for a lower-impact form of exercise, reducing
						the risk of overuse injuries that often plague those who exclusively
						pursue higher-intensity workouts.
					</p>
				</div>
				<div>
					<h4>Cardiac Enhancements</h4>
					<p>
						Training in Zone 2 fosters critical cardiac adaptations, such as
						increased stroke volume, which contributes to improved VO2max,
						typically associated with high-intensity training.
					</p>
				</div>
				<div>
					<h4>Enhanced Fat Utilization</h4>
					<p>
						This training stimulates Type I muscle fiber development, allowing
						you to burn a higher percentage of fat for fuel at higher power
						outputs, which is crucial for endurance athletes due to the
						abundance of fat as an energy source.
					</p>
				</div>
			</div>
		</div>
	);
}

export default HomeZone2;
