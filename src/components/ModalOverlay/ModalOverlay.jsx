import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) {
    return (
        <div className={styles.overlay} onClick={onClose} role="presentation" onKeyDown={onClose}></div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay; 