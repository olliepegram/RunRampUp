import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ProgramForm.module.css';
import MaxHeartRateCalc from './MaxHeartRateCalc';

const daysArr = [
	{ day: 'Monday', active: false, id: 1 },
	{ day: 'Tuesday', active: false, id: 2 },
	{ day: 'Wednesday', active: false, id: 3 },
	{ day: 'Thursday', active: false, id: 4 },
	{ day: 'Friday', active: false, id: 5 },
	{ day: 'Saturday', active: false, id: 6 },
	{ day: 'Sunday', active: false, id: 7 },
];

const questions = [
	'What’s the total distance you run in a week currently?',
	'What is your goal training load?',
	`What is your max heart rate?`,
	'What is your resting heart rate?',
	'What days of the week would you like to run?',
	'Which day of the week will be your long run?',
	'',
];

function ProgramForm({ onModalOpen }) {
	const [age, setAge] = useState('');
	const [currentLoad, setCurrentLoad] = useState('');
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [minHeartRate, setMinHeartRate] = useState('');
	const [goalLoad, setGoalLoad] = useState('');
	const [daysPerWeek, setDaysPerWeek] = useState('');
	const [days, setDays] = useState(daysArr);
	const [longRunDay, setLongRunDay] = useState('');
	const [conversion, setConversion] = useState('km');

	const [questionFilledStatus, setQuestionFilledStatus] = useState(
		Array(questions.length).fill(false)
	);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const navigate = useNavigate();

	let currentQuestionFilled = questionFilledStatus[currentQuestionIndex];

	const handleNext = useCallback(() => {
		if (currentQuestionIndex < questions.length - 1 && currentQuestionFilled) {
			setCurrentQuestionIndex(
				(currentQuestionIndex) => currentQuestionIndex + 1
			);
		}
	}, [currentQuestionFilled, currentQuestionIndex]);

	useEffect(() => {
		if (age) {
			setMaxHeartRate(220 - age);
		}
	}, [age]);

	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.key === 'Enter') {
				e.preventDefault(); // Prevent the form from submitting
				handleNext(); // Programmatically click the "Next" button
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleNext]);

	const handleAge = (e) => {
		if (currentQuestionIndex === 2) {
			setQuestionFilledStatus((prevStatus) => {
				const newStatus = [...prevStatus];
				newStatus[currentQuestionIndex] = true;
				return newStatus;
			});
		}
		setAge(Number(e.target.value));
	};

	const handleSelectDay = (e, id) => {
		e.preventDefault();

		if (currentQuestionIndex === 4) {
			setQuestionFilledStatus((prevStatus) => {
				const newStatus = [...prevStatus];
				newStatus[currentQuestionIndex] = true;
				return newStatus;
			});
		}

		console.log(questionFilledStatus);

		setDays((days) =>
			days.map((day) => {
				return day.id === id ? { ...day, active: !day.active } : day;
			})
		);
	};

	const handleInputChange = (e) => {
		const inputValue = e.target.value;

		if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
			setQuestionFilledStatus((prevStatus) => {
				const newStatus = [...prevStatus];
				newStatus[currentQuestionIndex] = Boolean(inputValue);
				return newStatus;
			});
		}

		if (currentQuestionIndex === 0) {
			setCurrentLoad(parseInt(inputValue, 10));
		} else if (currentQuestionIndex === 1) {
			setGoalLoad(parseInt(inputValue, 10));
		} else if (currentQuestionIndex === 2) {
			setMaxHeartRate(parseInt(inputValue, 10));
		} else if (currentQuestionIndex === 3) {
			setMinHeartRate(parseInt(inputValue, 10));
		} else if (currentQuestionIndex === 5) {
			setLongRunDay(Number(inputValue));
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

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const data = {
			currentLoad: Number(currentLoad),
			maxHeartRate: Number(maxHeartRate),
			minHeartRate: Number(minHeartRate),
			goalLoad: Number(goalLoad),
			days,
			daysPerWeek,
			longRunDay,
			conversion,
		};

		navigate('/program', { state: { user: data } });
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
							<span>{day}</span>
						</button>
					))}
				</div>
			);
		} else if (currentQuestionIndex === 5) {
			return (
				<div className={styles.dropdownContainer}>
					<select
						required
						className={styles.dropdown}
						value={longRunDay}
						onChange={handleInputChange}
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
				</div>
			);
		} else if (currentQuestionIndex === 0) {
			return (
				<div className={styles.conversionContainer}>
					<input
						required
						type='number'
						id='load'
						value={currentLoad}
						onChange={handleInputChange}
					/>
					<select
						value={conversion}
						className={styles.conversion}
						onChange={(e) => setConversion(e.target.value)}
					>
						<option value='km'>Kilometres</option>
						<option value='miles'>Miles</option>
					</select>
				</div>
			);
		} else if (currentQuestionIndex === 1) {
			return (
				<input
					required
					id='goal-load'
					type='number'
					value={goalLoad}
					className={styles.input}
					onChange={handleInputChange}
					autoFocus
				/>
			);
		} else if (currentQuestionIndex === 2) {
			return (
				<>
					<MaxHeartRateCalc
						onSetAge={handleAge}
						age={age}
					/>
					<input
						required
						type='number'
						id='heartRate'
						value={maxHeartRate}
						className={styles.input}
						onChange={handleInputChange}
					/>
				</>
			);
		} else if (currentQuestionIndex === 3) {
			return (
				<input
					required
					type='number'
					id='minheartRate'
					value={minHeartRate}
					className={styles.input}
					onChange={handleInputChange}
					autoFocus
				/>
			);
		} else if (currentQuestionIndex === 6) {
			return <p></p>;
		}
	};

	let content;

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
				// <Link
				// 	to='/program'
				// 	state={{ user: user }}
				// 	className={styles.link}
				// 	onClick={handleOnSubmit}
				// >
				<button
					type='submit'
					className={styles.submit}
				>
					Generate Program
				</button>
				// </Link>
			)}
		</form>
	);

	return <>{content}</>;
}

export default ProgramForm;
