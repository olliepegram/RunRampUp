import styles from './Footer.module.css';
import arrow from './arrow.png';

function Footer() {
	return (
		<div className={styles.footer}>
			<div>
				{/* <img
					src={arrow}
					className={styles.arrow}
					alt={'pic of stairs/logo'}
				/> */}
			</div>
			<p>Made by Ollie</p>
		</div>
	);
}

export default Footer;
