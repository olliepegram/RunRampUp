import { useState } from 'react';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import Modal from './Modal';
import ProgramForm from './ProgramForm';

function App() {
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
					<ProgramForm />
				</Modal>
			)}
		</div>
	);
}

export default App;
