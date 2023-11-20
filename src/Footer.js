import styles from './Footer.module.css';
import arrow from './arrow.png';

function Footer() {
	return (
		<div className={styles.footerContainer}>
			<div className={styles.footer}>
				<div>
					{/* <img
						src={arrow}
						className={styles.arrow}
						alt={'pic of stairs/logo'}
					/> */}

					<h3>RunRampUp</h3>
				</div>
				<div>
					{' '}
					<img
						src={arrow}
						className={styles.arrow}
						alt={'pic of stairs/logo'}
					/>
				</div>
				<div className={styles.footerText}>
					<p>About</p>
					<p>
						<a href='mailto:olliepegram@gmail.com'>Contact Us</a>
					</p>
					<p>Hire Me?</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
