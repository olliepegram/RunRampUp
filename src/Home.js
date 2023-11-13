import { useState } from 'react';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import Modal from './Modal';
import ProgramForm from './ProgramForm';
import ProgramIntroZones from './ProgramIntroZones';
import Footer from './Footer';
import HomeIntro from './HomeIntro';

const fakeZones = {
	'Zone 1': {
		minRate: 0,
		maxRate: 0,
		minPercentage: 0.5,
		maxPercentage: 0.6,
	},
	'Zone 2': {
		minRate: 0,
		maxRate: 0,
		minPercentage: 0.6,
		maxPercentage: 0.7,
	},
	'Zone 3': {
		minRate: 0,
		maxRate: 0,
		minPercentage: 0.7,
		maxPercentage: 0.8,
	},
	'Zone 4': {
		minRate: 0,
		maxRate: 0,
		minPercentage: 0.8,
		maxPercentage: 0.9,
	},
	'Zone 5': {
		minRate: 0,
		maxRate: 0,
		minPercentage: 0.9,
		maxPercentage: 1,
	},
};

function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showZones, setShowZones] = useState(false);
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [minHeartRate, setMinHeartRate] = useState('');
	const [zones, setZones] = useState(null);

	const handleModalClick = () => {
		setIsModalOpen(!isModalOpen);
	};

	const zonesSection = () => {
		if (!showZones) {
			return (
				<>
					<h3>Use the calculator above to find out your HR zones</h3>
					<ProgramIntroZones
						heartRateZones={fakeZones}
						width={'100'}
						flex={'center'}
					/>
				</>
			);
		} else {
			return (
				<>
					<h3>yada</h3>
					<ProgramIntroZones
						heartRateZones={zones}
						width={'100'}
						flex={'center'}
					/>
				</>
			);
		}
	};

	return (
		<div className='App'>
			<Header />
			<MainSection
				onModalOpen={handleModalClick}
				onSetShowZones={setShowZones}
				maxHeartRate={maxHeartRate}
				setMaxHeartRate={setMaxHeartRate}
				minHeartRate={minHeartRate}
				setMinHeartRate={setMinHeartRate}
				setZones={setZones}
			/>
			{isModalOpen && (
				<Modal>
					<ProgramForm onModalOpen={handleModalClick} />
				</Modal>
			)}
			<HomeIntro />
			<div className='black'>{zonesSection()}</div>

			<Footer />
		</div>
	);
}

export default Home;
