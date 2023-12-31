import { useState } from 'react';
import styles from './ZoneCalc.module.css';
import { calculateHeartRateZones } from './utils/calculateHeartRateZones';

function ZoneCalc({
	onSetShowZones,
	minHeartRate,
	maxHeartRate,
	setMaxHeartRate,
	setMinHeartRate,
	setZones,
	handleScroll,
	myRefReverse,
}) {
	const [age, setAge] = useState('');

	const handleAge = (e) => {
		const newAge = e.target.value;
		setAge(newAge);
		setMaxHeartRate(220 - newAge);
	};

	const handleRestingChange = (e) => {
		setMinHeartRate(e.target.value);
	};

	const handleMaxChange = (e) => {
		setMaxHeartRate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setZones(
			calculateHeartRateZones(Number(minHeartRate), Number(maxHeartRate))
		);

		onSetShowZones(true);
		handleScroll();
	};

	return (
		<div
			ref={myRefReverse}
			className={styles.container}
		>
			<h3>Heart Rate Zones Calculator</h3>
			<form onSubmit={handleSubmit}>
				<div className={styles.innerContainer}>
					{/* <MaxHeartRateCalc /> */}
					<input
						type='text'
						placeholder='Age'
						id='age'
						value={age}
						onChange={handleAge}
					/>
					<input
						type='text'
						id='maxRate'
						placeholder='Enter your max heart rate'
						value={maxHeartRate}
						onChange={handleMaxChange}
						required
					/>

					<input
						type='text'
						id='minRate'
						placeholder='Enter your resting heart rate'
						onChange={handleRestingChange}
						value={minHeartRate}
						required
					/>
				</div>
				<button
					type='submit'
					className={styles.submit}
				>
					Calculate Zones
				</button>
				<div className={styles.aboutZones}>
					<span>About HR Zones</span>
				</div>
			</form>
		</div>
	);
}

export default ZoneCalc;
