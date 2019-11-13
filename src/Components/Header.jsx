import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

function renderMessage(message, index) {
    const letters = [];
    for (let i = 0; i < message.length; i += 1) {
        const char = message[i];
        const classes = [styles.char];
        if (i < index) classes.push(styles.past);
        else if (i === index) classes.push(styles.current);
        else classes.push(styles.future);
        letters.push(<div key={`char-${i + 1}`} className={classes.join(' ')}>{i > index ? ' ' : char}</div>);
    }

    console.log(letters);

    return <div className={styles.message}>{letters}</div>;
}

const Header = ({ message, index }) => (
    <div className={styles.header}>
        {message ? renderMessage(message, index) : renderMessage('Semaphore', 9)}
    </div>
);

Header.propTypes = {
    message: PropTypes.string,
    index: PropTypes.number,
};

Header.defaultProps = {
    message: '',
    index: -1,
};

export default Header;
