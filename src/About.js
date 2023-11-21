import { Link } from 'react-router-dom';
import styles from './About.module.css';
import Footer from './Footer';
import Header from './Header';

function About() {
	return (
		<>
			<Header />
			<div className={styles.aboutContainer}>
				<div className={styles.textContainer}>
					<p className={styles.quote}>
						This app prioritises heart rate training and the adaptations that
						come with each zone. All you need to get started is a{' '}
						<span className={styles.bgText}>heart rate monitor</span>, a trusty{' '}
						<span className={styles.bgText}>pair of shoes</span> and the{' '}
						<span className={styles.bgText}>disipline to take it easy</span>
					</p>
					<h2>
						Have you been running for ages and feel like you’ve never really
						improved?
					</h2>
					<p>
						When I got into running I was huffing and puffing the whole run and
						my face was guaranteed to be bright red after it. It always felt so
						hard, but I stuck to it because I enjoyed the intensity and I
						thought that one day with all this hard work I would get fitter and
						my pace would improve. I got little better as my body adjusted to
						running and my form slowly improved as a byproduct of consistent
						running, but after all that my pace barely increased and my heart
						rate seemed to never improve.
					</p>

					<h2>What was I missing?</h2>
					<p>
						I was training hard and I was consistent. When I first started
						weightlifting, I trained hard and I saw the improvements soon after,
						why should running be any different?{' '}
						<strong>What I was missing was heart rate zone training.</strong>
					</p>

					<h2>What is heart rate zone training?</h2>
					<p>
						Heart rate training is using your heart rate to gauge your exercise
						intensity. To do this we use heart rate zones, which are a
						percentage of your maximum heart rate. The goal of utilizing a
						particular zone is to become a more efficient runner. Each zone has
						a different intensity and has its own adaptations on the body. Being
						intentional with your training and sticking to a certain heart rate
						zone/zones and not overexerting yourself is crucial for improving in
						the long term, this is particularly important for your easy/zone2
						runs.
					</p>

					<h2>80/20 Principle</h2>
					<p>
						Research tells us that running around 80% of our weekly runs at an
						easy, low-intensity pace is the most efficient way to improve. The
						other 20% is for high-intensity workouts like threshold and speed
						runs.
					</p>

					<p>
						Your favorite elite athletes (like Kipchoge) may be running fast on
						race day, but how they got to that point is by spending the bulk of
						their runs in zone 2. Their zone 2 pace may be still quite fast, but
						over time they have stuck to that zone 2 heart rate range and slowly
						improved.
					</p>

					<h2>How do I incorporate this into my training?</h2>
					<ol>
						<li>
							Buy a chest strap heart rate monitor and a fitness watch that can
							connect to it: Although a fitness watch will track heart rate, it
							is highly inaccurate when running and moving, and for this type of
							training, we want to be as accurate as possible. A chest strap is
							closer to the heart, has way less movement and can detect spikes
							in heart rates.
						</li>
						<li>
							Figure out your heart rate zones using our calculator{' '}
							<Link
								className={styles.link}
								to='/'
							>
								here
							</Link>
							.
						</li>
						<li>
							If you’re just getting into running, ditch the high-intensity
							workouts for a few months and strictly follow zone 2 workouts to
							build your base without injuring yourself as you adjust.
						</li>
						<li>
							Most importantly for your zone 2/easy runs: These runs are the
							bulk of your program for a reason, stick to your zone 2 heart rate
							for the <strong>WHOLE</strong> run. If you’re just starting with
							these easy runs, it will feel like a crawl and may even be boring.
							For now, forget about what people on strava think because over
							many months your pace in zone 2 will slowly increase and you will
							become a more efficient runner
						</li>
						<li>
							Note: Heart rate training allows you to regulate external
							variables such as heat and humidity and adapt more effectively on
							days when you might not be completely recovered. In such
							situations, your typical workout may elevate your heart rate
							beyond the usual levels.
						</li>
					</ol>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default About;
