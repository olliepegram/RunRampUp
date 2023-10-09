import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import ProgramForm from './ProgramForm';
import { useState } from 'react';

function App() {
	return (
		<div className='App'>
			<Header />
			<MainSection />
			<ProgramForm />
		</div>
	);
}

export default App;
