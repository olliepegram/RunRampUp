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

	const handleModalClick = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className='App'>
			<Header />
			<MainSection
				onModalOpen={handleModalClick}
				onSetShowZones={setShowZones}
			/>
			{isModalOpen && (
				<Modal>
					<ProgramForm onModalOpen={handleModalClick} />
				</Modal>
			)}
			{showZones && <ProgramIntroZones />}
			<Footer />
		</div>
	);
}

export default Home;
