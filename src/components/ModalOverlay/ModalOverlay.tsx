import { FC } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

type TProps = {
    onClose: () => void;
}

const ModalOverlay: FC<TProps> = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    );
}

export default ModalOverlay;