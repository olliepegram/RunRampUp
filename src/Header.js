import { Link } from 'react-router-dom';
import CallToActionButton from './CallToActionButton';
import styles from './Header.module.css';

function Header() {
	return (
		<header className={styles.container}>
			<div className={styles.innerContainer}>
				<div>
					<h1>
						<Link
							to='/'
							className={styles.link}
						>
							RunRampUp
						</Link>
					</h1>
				</div>
				<div>
					<div className={styles.btnHead}>
						<CallToActionButton
							textColor={'5165f5'}
							borderColor={'5165f5'}
						>
							Program Builder
						</CallToActionButton>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
