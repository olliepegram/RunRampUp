import styles from './Modal.module.css';

function Modal({ children }) {
	return <div className={styles.modal}>{children}</div>;
}

export default Modal;
