import styles from './HomeZone2.module.css';

function HomeZone2() {
	return (
		<div className={styles.containerZone2}>
			<h3>80% of our programming is zone 2 training</h3>
			<p>See some of the benifits below</p>
			<div className={styles.benefits}>
				<div>
					<h4>Enhanced Mitochondrial Density</h4>
					<p>Blah Blah Blah</p>
				</div>
				<div>
					<h4>Injury Prevention</h4>
					<p>Blah Blah Blah</p>
				</div>
				<div>
					<h4>Cardiac Enhancements</h4>
					<p>Blah Blah Blah</p>
				</div>
				<div>
					<h4>Enhanced Fat Utilization</h4>
					<p>Blah Blah Blah</p>
				</div>
			</div>
		</div>
	);
}

export default HomeZone2;
