import { useState } from 'react';
import styles from './ProgramForm.module.css';

function ProgramForm() {
	const [currentLoad, setCurrentLoad] = useState('');
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [goalLoad, setGoalLoad] = useState('');
	const [daysPerWeek, setDaysPerWeek] = useState('');
	const [days, setDays] = useState([
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	]);

	const handleSelectDay = (e) => {
		console.log(e.target.value);
	};

	return (
		<form>
			<label
				className={styles.label}
				htmlFor='load'
			>
				What’s the total distance you run in a week currently?
			</label>
			<input
				type='number'
				id='load'
				value={currentLoad}
				onChange={(e) => setCurrentLoad(Number(e.target.value))}
			/>

			<label
				className={styles.label}
				htmlFor='heartRate'
			>
				What is your max heart rate?
			</label>
			<input
				type='number'
				id='heartRate'
				value={maxHeartRate}
				onChange={(e) => setMaxHeartRate(Number(e.target.value))}
			/>
			<label
				className={styles.label}
				htmlFor='goal-load'
			>
				What is your goal training load?
			</label>
			<input
				id='goal-load'
				type='number'
				value={goalLoad}
				onChange={(e) => setGoalLoad(Number(e.target.value))}
			/>
			<label
				className={styles.label}
				htmlFor='days-per-week'
			>
				How many days per week can you run?
			</label>
			<select
				id='days-per-week'
				onChange={(e) => setDaysPerWeek(Number(e.target.value))}
			>
				{Array.from({ length: 7 }, (_, i) => (
					<option value={i}>{i + 1}</option>
				))}
			</select>

			<label
				className={styles.label}
				htmlFor='day'
			>
				What days of the week would you like to run?
			</label>
			<div className={styles.daysContainer}>
				{days.map((day) => (
					<div
						className={styles.days}
						id='day'
						value={day}
						onClick={handleSelectDay}
					>
						{day}
					</div>
				))}
			</div>
		</form>
	);
}

export default ProgramForm;
