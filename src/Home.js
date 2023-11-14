import { useState } from 'react';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import Modal from './Modal';
import ProgramForm from './ProgramForm';
import ProgramIntroZones from './ProgramIntroZones';
import Footer from './Footer';
import HomeIntro from './HomeIntro';
import HomeZone2 from './HomeZone2';

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
					<ProgramIntroZones
						heartRateZones={fakeZones}
						width={''}
						flex={''}
					/>
					<div className='blackTextContainer'>
						<h3>First step to training smart</h3>
						<p>Is figuring out your HR zones</p>
						<button className='calcZonesBtn'>Calculate Zones</button>
					</div>
				</>
			);
		} else {
			return (
				<>
					<ProgramIntroZones
						heartRateZones={zones}
						width={''}
						flex={''}
					/>
					<div className='blackTextContainer'>
						<h3>First step to training smart</h3>
						<p>Is figuring out your HR zones</p>
						<button className='calcZonesBtn'>Calculate Zones</button>
					</div>
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
			<HomeZone2 />
			<Footer />
		</div>
	);
}

export default Home;
