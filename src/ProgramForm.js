import { useState } from 'react';

function ProgramForm() {
	const [currentLoad, setCurrentLoad] = useState(0);
	const [maxHeartRate, setMaxHeartRate] = useState(0);

	return (
		<form>
			<input
				type='number'
				id='load'
				value={currentLoad}
				onChange={(e) => setCurrentLoad(+e.target.value)}
			/>
			<label htmlFor='load'>Current load per week</label>
			<input
				type='text'
				id='days'
			/>
			<label htmlFor='days'>How many days per week</label>
		</form>
	);
}

export default ProgramForm;
