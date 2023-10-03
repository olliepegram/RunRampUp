const styles = {
	border: '3px solid #5165F5',
	width: '200px',
	height: '45px',
	background: 'none',
	borderRadius: '4px',
};

function CallToActionButton({ children }) {
	return <button style={styles}>{children}</button>;
}

export default CallToActionButton;
