import arrow from './arrow.png';
import zones from './zones.png';
import CallToActionButton from './CallToActionButton';
import styles from './MainSection.module.css';
import { Link } from 'react-router-dom';
import ZoneCalc from './ZoneCalc';

// Illustration by <a href="https://icons8.com/illustrations/author/ARh4OKrFtdfC">Pixeltrue</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
function MainSection({
	onModalOpen,
	onSetShowZones,
	minHeartRate,
	maxHeartRate,
	setMaxHeartRate,
	setMinHeartRate,
	setZones,
}) {
	return (
		<div className={styles.containerImg}>
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
								<span
									style={{ width: '100%', display: 'block' }}
									onClick={onModalOpen}
								>
									Build Program
								</span>
							</CallToActionButton>
						</div>
						<div>
							<CallToActionButton
								textColor={'1f2439'}
								borderColor={'1f2439'}
							>
								<Link
									className={styles.link}
									to='/about'
								>
									How it Works
								</Link>
							</CallToActionButton>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					{/* <img
						src={zones}
						className={styles.jogging}
						alt='illustration on person jogging with a cat'
					/> */}
					<ZoneCalc
						maxHeartRate={maxHeartRate}
						setMaxHeartRate={setMaxHeartRate}
						minHeartRate={minHeartRate}
						setMinHeartRate={setMinHeartRate}
						onSetShowZones={onSetShowZones}
						setZones={setZones}
					/>
				</div>
			</div>
		</div>
	);
}

export default MainSection;
