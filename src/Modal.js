import styles from './Modal.module.css';

function Modal({ children }) {
	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>{children}</div>
		</div>
	);
}

export default Modal;
