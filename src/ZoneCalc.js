import { useState } from 'react';
import styles from './ZoneCalc.module.css';

function ZoneCalc() {
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [minHeartRate, setMinHeartRate] = useState('');

	return (
		<form className={styles.container}>
			<div className={styles.innerContainer}>
				<input
					type='text'
					id='maxRate'
					placeholder='Enter your max heart rate'
				/>

				<input
					type='text'
					id='minRate'
					placeholder='Enter your resting heart rate'
				/>
			</div>
		</form>
	);
}

export default ZoneCalc;
