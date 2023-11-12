function CallToActionButton({ children, textColor, borderColor }) {
	const styles = {
		border: `2px solid #${borderColor}`,
		width: '200px',
		height: '45px',
		background: 'none',
		borderRadius: '6px',
		cursor: 'pointer',
		color: `#${textColor}`,
		display: 'block', // Makes the button expand to its container's width
		textAlign: 'center', // Center-align the text
	};

	return <button style={styles}>{children}</button>;
}

export default CallToActionButton;
