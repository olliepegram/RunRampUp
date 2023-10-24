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

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: Number(value) });
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

	let content;

	if (isSubmitted) {
		content = <Program user={user} />;
	} else {
		content = (
			<form
				onSubmit={handleOnSubmit}
				className={styles.form}
			>
				<div className={styles.close}>X</div>
				<h3>Program Builder</h3>
				<label
					className={styles.label}
					htmlFor={`question-${currentQuestionIndex}`}
				>
					{questions[currentQuestionIndex]}
				</label>
				{currentQuestionIndex === 5 ? (
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
				) : (
					<input
						required
						type='number'
						id={`question-${currentQuestionIndex}`}
						value={formValues[questions[currentQuestionIndex]]}
						onChange={handleInputChange}
					/>
				)}

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
						Create Program
					</button>
				)}
			</form>
		);
	}

	return <>{content}</>;
}

export default ProgramForm;
