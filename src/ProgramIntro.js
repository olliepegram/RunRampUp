import styles from './ProgramIntro.module.css';
import bg from './run.jpeg';

function ProgramIntro({ heartRateZones }) {
	return (
		<div className={styles.mainSection}>
			<h1 className={styles.header}>Run.</h1>
			<img
				src={bg}
				alt={'snowy mountain'}
				className={styles.bg}
			/>
			<div className={styles.mainSectionContent}>
				<div className={styles.mainSectionContentText}>
					<div className={styles.leftSide}>
						<div className={styles.headingWrapper}>
							<h2>About Your Program</h2>
						</div>

						<div className={styles.textWrapper}>
							<p>You've been prescribed 3 different types of runs:</p>

							<ul>
								<li>
									<strong>Easy runs - </strong> For these runs, it's important
									to stick to the heart rate zones given. You want to run your
									easy runs… easy! These runs are important for your recovery
									and gaining time on your feet without fatiguing you too much,
									and also come with the benefits of{' '}
									<span className={styles.linkZone2}>zone 2</span>. Once you’ve
									been tracking your heart rate with a chest monitor for a
									while, you will know what zone 2 feels like, even when your
									body is more stressed than usual or the weather is hotter than
									usual, so you can ditch the HR monitor and go by feel.
								</li>

								<li>
									<strong>Long runs - </strong> These runs also require sticking
									to zone 2, unless you’re deep into prepping for an event and
									have certain pacing strategies. It’s important to stick to
									zone 2 as going for a long run is already very taxing on the
									body, so going above zone 2 will impact your ability to
									recover in time for your next run. You may want to get some
									food (mainly carbs) in before these runs (at least 2 hours) as
									they require more glycogen (carbs in the muscle) than your
									typical easy run.
								</li>

								<li>
									<strong>Speed runs - </strong> [speed run info]
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.rightSide}>
						<table className={styles.table}>
							<thead className={styles.zonesHeader}>
								<tr>
									<th>Run Type</th>
									<th>Effort</th>
									<th>Target Heart Rate</th>
									<th>#</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(heartRateZones)
									.slice(0, 5)
									.map(([zone, percentage], i) => (
										<tr
											className={styles.zonesBody}
											key={i}
										>
											<td>{zone}</td>
											<td>
												{percentage.minPercentage * 100}% -{' '}
												{percentage.maxPercentage * 100}%
											</td>
											<td>
												{percentage.minRate} - {percentage.maxRate}
											</td>
											<td>
												<div className={styles.intensity}></div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProgramIntro;
