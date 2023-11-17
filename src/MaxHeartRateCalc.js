import styles from './MaxHeartRateCalc.module.css';

function MaxHeartRateCalc({ onSetAge, age }) {
	return (
		<div className={styles.ageCalcContainer}>
			<div className={styles.item}>
				<label>
					If you don't know your max heart rate, enter your age in the field
					below
				</label>
			</div>
			<div className={styles.item}>
				<span>Age:</span>
				<input
					type='text'
					value={age}
					onChange={onSetAge}
					className={styles.maxHeartRateInput}
					autoFocus
				/>
			</div>
		</div>
	);
}

export default MaxHeartRateCalc;
