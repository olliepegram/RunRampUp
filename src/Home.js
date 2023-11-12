import { useState } from 'react';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import Modal from './Modal';
import ProgramForm from './ProgramForm';
import ProgramIntroZones from './ProgramIntroZones';
import Footer from './Footer';

function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showZones, setShowZones] = useState(false);
	const [maxHeartRate, setMaxHeartRate] = useState('');
	const [minHeartRate, setMinHeartRate] = useState('');
	const [zones, setZones] = useState(null);

	const handleModalClick = () => {
		setIsModalOpen(!isModalOpen);
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
			{showZones && (
				<ProgramIntroZones
					heartRateZones={zones}
					width={'100'}
					flex={'center'}
				/>
			)}
			<Footer />
		</div>
	);
}

export default Home;
