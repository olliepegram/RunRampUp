import { useState } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Program from './Program';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/program'
					element={<Program />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
