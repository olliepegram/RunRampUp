import styles from './About.module.css';
import Header from './Header';

function About() {
	return (
		<>
			<Header />
			<div className={styles.aboutContainer}>
				<p>
					This is a tool developed by a runner for runners. The aim of this app
					is to provide you a unique training program that stops you making the
					same mistakes so many recreational athletes make. A lot of
					recreational athletes skip straight to higher intensities, while there
					is a time and place for high-intensity training, most of your training
					load (65-70%) should be easier. We have this idea that if our run
					doesn’t feel painful or you’re not red in the face struggling to
					breath then it’s not doing anything. This is where Zone 2 Heart Rate
					Training comes in.
				</p>
				<p>
					Zone 2 training is a valuable and often underestimated component of a
					runner's training regimen. Developed by a passionate runner for fellow
					enthusiasts, this app is designed to be your companion in avoiding
					common mistakes that recreational athletes tend to make. So, what
					exactly is Zone 2 training and why is it such a crucial part of your
					running journey?
				</p>
				<h2>Understanding Zone 2 Training:</h2>
				<p>
					Zone 2 training revolves around training within a specific heart rate
					range, typically between 60-70% of your maximum heart rate. Many
					runners mistakenly jump into higher-intensity workouts, believing that
					the more they push, the better the results. While high-intensity
					training does have its place, it should not be the sole focus of your
					training plan. In fact, a significant portion of your training (about
					65-70%) should consist of easier, low-intensity workouts.
				</p>
				<h2>The Benefits of Zone 2 Training:</h2>
				<ul>
					<li>
						<strong>Enhanced Mitochondrial Density:</strong> Sustained Zone 2
						training leads to heightened mitochondrial density in Type I
						(slow-twitch) muscle fibers. Mitochondria, often termed the cellular
						powerhouses, are responsible for converting oxygen into ATP, the
						body's primary energy source. The greater the number of mitochondria
						in muscle cells, the more advantageous it is for endurance athletes.
					</li>
					<li>
						<strong>Increased Capillary Density:</strong> It promotes the growth
						of capillaries, the blood vessels that supply oxygen to muscles and
						remove waste products, resulting in better oxygen delivery, reduced
						fatigue, and more efficient energy transfer.
					</li>
					<li>
						<strong>Injury Prevention:</strong> High-intensity workouts can put
						substantial stress on your muscles and joints. Zone 2 training
						allows for a lower-impact form of exercise, reducing the risk of
						overuse injuries that often plague those who exclusively pursue
						higher-intensity workouts.
					</li>
					<li>
						<strong>Improved Oxidative Enzyme Activity:</strong> Zone 2 training
						enhances the efficiency of oxygen utilization, leading to a higher
						energy turnover.
					</li>
					<li>
						<strong>Cardiac Enhancements:</strong> Training in Zone 2 fosters
						critical cardiac adaptations, such as increased stroke volume, which
						contributes to improved VO2max, typically associated with
						high-intensity training.
					</li>
					<li>
						<strong>Enhanced Fat Utilization:</strong> This training stimulates
						Type I muscle fiber development, allowing you to burn a higher
						percentage of fat for fuel at higher power outputs, which is crucial
						for endurance athletes due to the abundance of fat as an energy
						source.
					</li>
				</ul>
				<p>
					In conclusion, Zone 2 training is your secret weapon for building a
					strong running foundation. By dedicating a significant portion of your
					training to this zone, you're ensuring long-term success, injury
					prevention, and steady progress. Don't underestimate the benefits of
					taking it easy – it's an essential part of becoming a better, more
					resilient runner. So, embrace Zone 2 training and watch your running
					capabilities soar.
				</p>
			</div>
		</>
	);
}

export default About;
