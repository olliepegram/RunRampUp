import { useState } from 'react';
import styles from './HomeZone2.module.css';
import run from './run.jpeg';

function HomeZone2() {
	const [openSection, setOpenSection] = useState(null);

	const handleToggle = (index) => {
		setOpenSection((prevOpenSection) =>
			prevOpenSection === index ? null : index
		);
	};

	const renderSections = () => {
		return [
			{
				title: 'Enhanced Mitochondrial Density',
				content:
					"Mitochondria, often termed the cellular powerhouses, are responsible for converting oxygen into ATP, the body's primary energy source. The greater the number of mitochondria in muscle cells, the more advantageous it is for endurance athletes.",
			},
			{
				title: 'Injury Prevention',
				content:
					'Zone 2 training allows for a lower-impact form of exercise, reducing the risk of overuse injuries that often plague those who exclusively pursue higher-intensity workouts.',
			},
			{
				title: 'Cardiac Enhancements',
				content:
					'Training in Zone 2 fosters critical cardiac adaptations, such as increased stroke volume, which contributes to improved VO2max, typically associated with high-intensity training.',
			},
			{
				title: 'Enhanced Fat Utilization',
				content:
					'This training stimulates Type I muscle fiber development, allowing you to burn a higher percentage of fat for fuel at higher power outputs, which is crucial for endurance athletes due to the abundance of fat as an energy source.',
			},
		].map((section, index) => (
			<div
				className={`${styles.contentWrapper} ${
					openSection === index ? styles.open : ''
				}`}
				key={index}
				onClick={() => handleToggle(index)}
			>
				<div className={styles.upperContent}>
					<h4>{section.title}</h4>
					{openSection === index ? <span>-</span> : <span>+</span>}
				</div>
				{openSection === index && <p>{section.content}</p>}
			</div>
		));
	};

	return (
		<div className={styles.containerZone2}>
			<div>
				{/* <h3>80% of our programs are low-intensity zone 2 training</h3> */}
				<h3>The disipline to take it easy</h3>
				<p className={styles.subHeading}>
					80% of our programs are low-intensity zone 2 training. See the
					benefits below
				</p>

				<div className={styles.benefits}>{renderSections()}</div>
			</div>
			<div>
				<img
					src={run}
					alt={'person running up a mountain'}
				/>
			</div>
		</div>
	);
}

export default HomeZone2;
