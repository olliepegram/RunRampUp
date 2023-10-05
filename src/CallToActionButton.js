function CallToActionButton({ children, textColor, borderColor }) {
	const styles = {
		border: `2px solid #${borderColor}`,
		width: '200px',
		height: '45px',
		background: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		color: `#${textColor}`,
	};

	return <button style={styles}>{children}</button>;
}

export default CallToActionButton;
