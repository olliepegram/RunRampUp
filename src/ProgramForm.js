import { useState } from 'react';
import styles from './ProgramForm.module.css';

const daysArr = [
	{ day: 'Monday', active: false, id: 0 },
	{ day: 'Tuesday', active: false, id: 1 },
	{ day: 'Wednesday', active: false, id: 2 },
	{ day: 'Thursday', active: false, id: 3 },
	{ day: 'Friday', active: false, id: 4 },
	{ day: 'Saturday', active: false, id: 5 },
	{ day: 'Sunday', active: false, id: 6 },
];

function ProgramForm() {
	const [currentLoad, setCurrentLoad] = useState('');
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [goalLoad, setGoalLoad] = useState('');
	const [daysPerWeek, setDaysPerWeek] = useState('');
	const [days, setDays] = useState(daysArr);

	const handleSelectDay = (e, id) => {
		e.preventDefault();

		setDays((days) =>
			days.map((day) => {
				return day.id === id ? { ...day, active: !day.active } : day;
			})
		);
		console.log(days);
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
			<div style={{ marginBottom: '54px' }}>
				<select
					id='days-per-week'
					onChange={(e) => setDaysPerWeek(Number(e.target.value))}
					className={styles.options}
					placeholder='Select days'
				>
					<option
						value=''
						disabled
						selected
					>
						Select Days
					</option>
					{Array.from({ length: 7 }, (_, i) => (
						<option
							key={i}
							value={i}
						>
							{i + 1}
						</option>
					))}
				</select>
			</div>
			<label
				className={styles.label}
				htmlFor='day'
			>
				What days of the week would you like to run?
			</label>
			<div className={styles.daysContainer}>
				{days.map(({ day, id, active }) => (
					<button
						className={`${styles.days} ${active ? styles.selectedDay : ''}`}
						id='day'
						value={day}
						onClick={(e) => handleSelectDay(e, id)}
						key={day}
					>
						{day}
					</button>
				))}
			</div>
			<label
				className={styles.label}
				htmlFor='longrun'
			>
				Which day of the week will be your long run?
			</label>
			<select className={styles.options}>
				<option
					value=''
					disabled
					selected
				>
					Select Day
				</option>
				{daysArr.map(({ day }) => (
					<option
						key={day}
						value={day}
					>
						{day}
					</option>
				))}
			</select>
		</form>
	);
}

export default ProgramForm;
