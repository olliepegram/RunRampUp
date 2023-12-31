import { useState } from 'react';
import Program from './Program';

import styles from './ProgramForm.module.css';

const daysArr = [
	{ day: 'Monday', active: false, id: 1 },
	{ day: 'Tuesday', active: false, id: 2 },
	{ day: 'Wednesday', active: false, id: 3 },
	{ day: 'Thursday', active: false, id: 4 },
	{ day: 'Friday', active: false, id: 5 },
	{ day: 'Saturday', active: false, id: 6 },
	{ day: 'Sunday', active: false, id: 7 },
];

function ProgramForm() {
	const [currentLoad, setCurrentLoad] = useState('');
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [minHeartRate, setMinHeartRate] = useState('');
	const [goalLoad, setGoalLoad] = useState('');
	const [daysPerWeek, setDaysPerWeek] = useState('');
	const [days, setDays] = useState(daysArr);
	const [longRunDay, setLongRunDay] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [user, setUser] = useState({});

	const [formValues, setFormValues] = useState({
		currentLoad: '',
		maxHeartRate: '',
		minHeartRate: '',
		goalLoad: '',
		daysPerWeek: '',
		selectedDays: [],
		longRunDay: '',
	});

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const questions = [
		'What’s the total distance you run in a week currently?',
		'What is your max heart rate?',
		'What is your resting heart rate?',
		'What is your goal training load?',
		'How many days per week can you run?',
		'What days of the week would you like to run?',
		'Which day of the week will be your long run?',
	];

	const handleSelectDay = (e, id) => {
		e.preventDefault();

		setDays((days) =>
			days.map((day) => {
				return day.id === id ? { ...day, active: !day.active } : day;
			})
		);
	};

	const handleNext = () => {
		if (currentQuestionIndex < currentQuestionIndex.length < 1) {
			setCurrentQuestionIndex(
				(currentQuestionIndex) => currentQuestionIndex + 1
			);
		}
	};

	const handlePrev = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(
				(currentQuestionIndex) => currentQuestionIndex - 1
			);
		}
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		// const activeDays = days.filter((day) => day.active);

		setUser({
			currentLoad,
			maxHeartRate,
			minHeartRate,
			goalLoad,
			days,
			daysPerWeek,
			longRunDay,
		});

		setIsSubmitted(true);
	};

	let content;

	if (isSubmitted) {
		content = <Program user={user} />;
	} else {
		content = (
			<form
				onSubmit={handleOnSubmit}
				className={styles.form}
			>
				<label
					className={styles.label}
					htmlFor='load'
				>
					What’s the total distance you run in a week currently?
				</label>
				<input
					required
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
					required
					type='number'
					id='heartRate'
					value={maxHeartRate}
					onChange={(e) => setMaxHeartRate(Number(e.target.value))}
				/>
				<label
					className={styles.label}
					htmlFor='minheartRate'
				>
					What is your resting heart rate?
				</label>
				<input
					required
					type='number'
					id='minheartRate'
					value={minHeartRate}
					onChange={(e) => setMinHeartRate(Number(e.target.value))}
				/>

				<label
					className={styles.label}
					htmlFor='goal-load'
				>
					What is your goal training load?
				</label>
				<input
					required
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
						required
						id='days-per-week'
						onChange={(e) => setDaysPerWeek(Number(e.target.value))}
						className={styles.options}
					>
						{Array.from({ length: 7 }, (_, i) => (
							<option
								key={i}
								value={i + 1}
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
							required
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
				<select
					required
					className={styles.options}
					value={longRunDay}
					onChange={(e) => setLongRunDay(Number(e.target.value))}
				>
					{daysArr.map(({ day }, i) => (
						<option
							key={day}
							value={i + 1}
						>
							{day}
						</option>
					))}
				</select>
				<button
					className={styles.submit}
					type='submit'
				>
					Create Program
				</button>
			</form>
		);
	}

	return <>{content}</>;
}

export default ProgramForm;
