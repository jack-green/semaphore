import React from 'react';
import PropTypes from 'prop-types';

import styles from './Controls.module.css';

const Controls = ({
    speed,
    setSpeed,
    isPaused,
    togglePause,
    replay,
}) => (
    <div className={styles.controls}>
        <div className={styles.speed}>
            <small>Speed</small>
            <div>
                <button type="button" onClick={() => setSpeed(-1)}>-</button>
                <span>{`${speed}x`}</span>
                <button type="button" onClick={() => setSpeed(1)}>+</button>
            </div>
        </div>
        {isPaused
            ? <button type="button" onClick={togglePause}>Continue</button>
            : <button type="button" onClick={togglePause}>Pause</button>}
        <button type="button" onClick={replay}>Replay</button>
    </div>
);

Controls.propTypes = {
    speed: PropTypes.number.isRequired,
    setSpeed: PropTypes.func.isRequired,
    isPaused: PropTypes.bool.isRequired,
    togglePause: PropTypes.func.isRequired,
    replay: PropTypes.func.isRequired,
};

export default Controls;
