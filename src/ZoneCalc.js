import { useState } from 'react';
import styles from './ZoneCalc.module.css';
import MaxHeartRateCalc from './MaxHeartRateCalc';

function ZoneCalc() {
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [minHeartRate, setMinHeartRate] = useState('');

	const handleRestingChange = (e) => {
		setMinHeartRate(e.target.value);
	};

	const handleMaxChange = (e) => {
		setMaxHeartRate(e.target.value);
	};

	return (
		<div className={styles.container}>
			<h3>Heart Rate Zones Calculator</h3>
			<form className=''>
				<div className={styles.innerContainer}>
					{/* <MaxHeartRateCalc /> */}
					<input
						type='text'
						id='maxRate'
						placeholder='Enter your max heart rate'
						value={maxHeartRate}
						onChange={handleMaxChange}
					/>

					<input
						type='text'
						id='minRate'
						placeholder='Enter your resting heart rate'
						onChange={handleRestingChange}
						value={minHeartRate}
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
