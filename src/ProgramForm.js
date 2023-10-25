import { useState } from 'react';
import Program from './Program';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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

function ProgramForm({ onModalOpen }) {
	const [currentLoad, setCurrentLoad] = useState('');
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [minHeartRate, setMinHeartRate] = useState('');
	const [goalLoad, setGoalLoad] = useState('');
	const [daysPerWeek, setDaysPerWeek] = useState('');
	const [days, setDays] = useState(daysArr);
	const [longRunDay, setLongRunDay] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [user, setUser] = useState({});

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const questions = [
		'What’s the total distance you run in a week currently?',
		'What is your goal training load?',
		'What is your max heart rate?',
		'What is your resting heart rate?',
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
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(
				(currentQuestionIndex) => currentQuestionIndex + 1
			);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(
				(currentQuestionIndex) => currentQuestionIndex - 1
			);
		}
	};

	const handleClostForm = () => {
		onModalOpen();
	};

	const handleLastQuestion = (e) => {
		setLongRunDay(Number(e.target.value));
		setUser({
			currentLoad,
			maxHeartRate,
			minHeartRate,
			goalLoad,
			days,
			daysPerWeek,
			longRunDay,
		});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

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

	const formContent = () => {
		if (currentQuestionIndex === 4) {
			return (
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
			);
		} else if (currentQuestionIndex === 5) {
			return (
				<select
					required
					className={styles.options}
					value={longRunDay}
					onChange={handleLastQuestion}
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
			);
		} else if (currentQuestionIndex === 0) {
			return (
				<input
					required
					type='number'
					id='load'
					value={currentLoad}
					onChange={(e) => setCurrentLoad(Number(e.target.value))}
				/>
			);
		} else if (currentQuestionIndex === 1) {
			return (
				<input
					required
					id='goal-load'
					type='number'
					value={goalLoad}
					onChange={(e) => setGoalLoad(Number(e.target.value))}
				/>
			);
		} else if (currentQuestionIndex === 2) {
			return (
				<input
					required
					type='number'
					id='heartRate'
					value={maxHeartRate}
					onChange={(e) => setMaxHeartRate(Number(e.target.value))}
				/>
			);
		} else if (currentQuestionIndex === 3) {
			return (
				<input
					required
					type='number'
					id='minheartRate'
					value={minHeartRate}
					onChange={(e) => setMinHeartRate(Number(e.target.value))}
				/>
			);
		}
	};

	let content;

	if (isSubmitted) {
		content = (
			<Link
				to='/program'
				state={{ user: user }}
			/>
		);
	} else {
		content = (
			<form
				onSubmit={handleOnSubmit}
				className={styles.form}
			>
				<div
					onClick={handleClostForm}
					className={styles.close}
				>
					X
				</div>
				<h3>Program Builder</h3>
				<label
					className={styles.label}
					htmlFor={`question-${currentQuestionIndex}`}
				>
					{questions[currentQuestionIndex]}
				</label>

				{formContent()}

				{currentQuestionIndex !== questions.length - 1 ? (
					<div className={styles.buttonsContainer}>
						<button
							type='button'
							onClick={handlePrevious}
							disabled={currentQuestionIndex === 0}
							className={styles.prev}
						>
							Previous
						</button>

						<button
							type='button'
							onClick={handleNext}
							className={styles.next}
						>
							Next
						</button>
					</div>
				) : (
					<button
						className={styles.submit}
						type='submit'
					>
						<Link
							to='/program'
							state={{ user: user }}
						>
							Generate Program
						</Link>
					</button>
				)}
			</form>
		);
	}

	return <>{content}</>;
}

export default ProgramForm;
