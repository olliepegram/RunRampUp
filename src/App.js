import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Program from './Program';
import About from './About';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/about'
					element={<About />}
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
