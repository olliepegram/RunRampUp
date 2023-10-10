const calculateHeartRateZones = (minHeartRate, maxHeartRate) => {
	const zones = {
		'Zone 1': [0.5, 0.6],
		'Zone 2': [0.6, 0.7],
		'Zone 3': [0.7, 0.8],
		'Zone 4': [0.8, 0.9],
		'Zone 5': [0.9, 1.0],
	};

	const heartRateZones = {};

	for (let zone in zones) {
		const [minPercentage, maxPercentage] = zones[zone];
		const minRate = Math.round(
			minHeartRate + (maxHeartRate - minHeartRate) * minPercentage
		);
		const maxRate = Math.round(
			minHeartRate + (maxHeartRate - minHeartRate) * maxPercentage
		);

		heartRateZones[zone] = { minRate, maxRate };
	}
	return heartRateZones;
};

function Program({ user }) {
	const { minHeartRate, maxHeartRate } = user;
	const heartRateZones = calculateHeartRateZones(minHeartRate, maxHeartRate);
	const catagories = {
		easy: heartRateZones['Zone 2'],
		temp: maxHeartRate * 0.87,
		speed: maxHeartRate * 0.94,
	};

	console.log(Math.round(catagories.temp));

	return <div>Program</div>;
}

export default Program;
