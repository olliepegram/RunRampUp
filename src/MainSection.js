import arrow from './arrow.png';
import jogging from './jogging.png';
import CallToActionButton from './CallToActionButton';
import styles from './MainSection.module.css';

// Illustration by <a href="https://icons8.com/illustrations/author/ARh4OKrFtdfC">Pixeltrue</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
function MainSection() {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<h2>Ready to ramp up your training load?</h2>
				<div className={styles.leftContainer}>
					<span>
						<img
							src={arrow}
							alt='arrow pointing to text'
							className={styles.arrow}
						/>
					</span>
					<p>
						RunRampUp: Your trusted companion for marathon triumphs, personal
						bests, and overall fitness improvements.
					</p>
				</div>
				<div className={styles.buttons}>
					<div style={{ marginRight: '30px' }}>
						<CallToActionButton
							textColor={'5165f5'}
							borderColor={'5165f5'}
						>
							Build Program
						</CallToActionButton>
					</div>
					<div>
						<CallToActionButton
							textColor={'1f2439'}
							borderColor={'1f2439'}
						>
							How it Works
						</CallToActionButton>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<img
					src={jogging}
					className={styles.jogging}
					alt='illustration on person jogging with a cat'
				/>
			</div>
		</div>
	);
}

export default MainSection;
