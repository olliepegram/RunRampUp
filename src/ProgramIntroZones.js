import styles from './ProgramIntro.module.css';

function ProgramIntro({ heartRateZones, width, flex }) {
	const zoneName = (zone) => {
		if (zone === 'Zone 1') {
			return 'Warmup / Recovery';
		} else if (zone === 'Zone 2') {
			return 'Easy';
		} else if (zone === 'Zone 3') {
			return 'Aerobic Capacity';
		} else if (zone === 'Zone 4') {
			return 'Anaerobic Capacity';
		} else {
			return 'Speed Training';
		}
	};

	console.log(heartRateZones);

	const renderZones = (zones) => {
		return (
			<div
				className={styles.tableWrapper}
				style={{ width: `${width}%`, justifyContent: `${flex}` }}
			>
				<table className={styles.table}>
					<thead className={styles.zonesHeader}>
						<tr>
							<th>Zone</th>
							<th>Effort</th>
							<th>Target Heart Rate</th>
							<th>Training Benefit</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(zones)
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
									<td>{zoneName(zone)}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		);
	};

	return <>{renderZones(heartRateZones)}</>;
}

export default ProgramIntro;
