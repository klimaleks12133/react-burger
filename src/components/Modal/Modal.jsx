import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ caption, children, onClose }) {
    const checkEsc = useCallback(e => {
        if (e.key === "Escape") {
            onClose(e);
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", checkEsc, false);

        return () => {
            document.removeEventListener("keydown", checkEsc, false);
        };
    }, [checkEsc]);

    return ReactDOM.createPortal((
        <div className={styles.container}>
            <div className={styles.dialog}>
                <div className={styles.header}>
                    <div className={styles.caption}>{caption}</div>
                    <div className={styles.close__btn}><CloseIcon type="primary" onClick={onClose} /></div>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </div>
    ), document.getElementById('modal'));
}

Modal.propTypes = {
    caption: PropTypes.string,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;