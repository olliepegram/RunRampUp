import CallToActionButton from './CallToActionButton';

const styles = {
	display: 'flex',
};

function Header() {
	return (
		<header styles={styles}>
			<div>
				<h1>RunRampUp</h1>
			</div>
			<div>
				<CallToActionButton>Create a Program</CallToActionButton>
			</div>
		</header>
	);
}

export default Header;
