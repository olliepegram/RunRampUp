import { useState } from 'react';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import Modal from './Modal';
import ProgramForm from './ProgramForm';

function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalClick = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className='App'>
			<Header />
			<MainSection onModalOpen={handleModalClick} />
			{isModalOpen && (
				<Modal>
					<ProgramForm onModalOpen={handleModalClick} />
				</Modal>
			)}
		</div>
	);
}

export default Home;
