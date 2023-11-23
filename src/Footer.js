import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import arrow from './arrow.png';

function Footer() {
	return (
		<div className={styles.footerContainer}>
			<div className={styles.footer}>
				<div className={styles.footerTitle}>
					{/* <img
						src={arrow}
						className={styles.arrow}
						alt={'pic of stairs/logo'}
					/> */}
					<h3>RunRampUp</h3>
					<span className={styles.copy}>&copy; RunRampUp 2024</span>
				</div>
				{/* <div>
					{' '}
					<img
						src={arrow}
						className={styles.arrow}
						alt={'pic of stairs/logo'}
					/>
				</div> */}
				<div className={styles.footerText}>
					<p>
						<Link
							className={styles.link}
							to='/about'
						>
							How it Works
						</Link>
					</p>
					<p>
						<a href='mailto:olliepegram@gmail.com'>Contact Us</a>
					</p>
					<p>
						<a
							target='_blank'
							rel='noreferrer'
							href='https://github.com/olliepegram'
						>
							Hire Me?
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
