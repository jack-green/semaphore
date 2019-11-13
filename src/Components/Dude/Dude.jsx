import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dude.module.css';
import letters from './letters';

const transitionSpeed = 500;
const letterHold = 500;
const spaceLength = 500;
const doubleLength = 0;

function createQueue(message) {
    const queue = [];
    let lastChar = null;
    let isNumerals = false;
    for (let c = 0; c < message.length; c += 1) {
        const char = message[c].toLowerCase();
        if (typeof letters[char] !== 'undefined') {
            if (char === lastChar) queue.push('double');
            lastChar = char;
            if (/^\d$/.test(char)) {
                if (!isNumerals) queue.push('numerals');
                isNumerals = true;
                queue.push(char);
            } else {
                if (isNumerals) queue.push('alpha');
                isNumerals = false;
                queue.push(char);
            }
        }
    }

    if (queue.length) {
        queue.unshift('start');
        queue.push('end');
    }

    return queue;
}

export default class Dude extends React.Component {
    static getDerivedStateFromProps(props, state) {
        const { speed } = props;
        if (speed !== state.speed) {
            const speedMultiplier = 1 / speed;
            return {
                speedMultiplier,
                speed,
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        const { message, speed } = props;
        const queue = createQueue(message);
        this.state = {
            queue,
            leftAngle: 0,
            rightAngle: 0,
            speed,
            speedMultiplier: 1,
            lastDelay: 0,
        };
        this.timeout = null;
    }

    componentDidMount() {
        const { queue } = this.state;
        if (queue.length) {
            this.nextLetter();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    setPaused(isPaused) {
        const { lastDelay, speedMultiplier } = this.state;
        if (isPaused) {
            clearTimeout(this.timeout);
        } else {
            this.timeout = setTimeout(this.nextLetter, lastDelay * speedMultiplier);
        }
    }

    setLetter(l) {
        let letter = l;
        if (typeof letters[letter] === 'undefined') {
            letter = ' '; // treat unknown chars as spaces
        }
        const [leftAngle, rightAngle] = letters[letter];
        this.setState({
            leftAngle,
            rightAngle,
        });
    }

    nextLetter = () => {
        const { speed } = this.props;
        const { queue, speedMultiplier } = this.state;
        if (speed === 0 || !queue.length) return;
        const char = queue.shift();
        let delay = transitionSpeed + letterHold;
        switch (char) {
        case 'start':
            this.setLetter(' ');
            delay = transitionSpeed;
            break;
        case 'end':
            this.setLetter(' ');
            break;
        case 'double':
            this.setLetter(' ');
            delay = transitionSpeed + doubleLength;
            break;
        case 'numerals':
            this.setLetter('numerals');
            break;
        case 'alpha':
            this.setLetter('j');
            break;
        case ' ':
            delay = transitionSpeed + spaceLength;
            // current.innerHTML += '&nbsp;';
            this.setLetter('space');
            break;
        default:
            // current.innerText += char;
            this.setLetter(char.toLowerCase());
        }

        if (char !== 'end') {
            this.setState({ lastDelay: delay });
            this.timeout = setTimeout(this.nextLetter, delay * speedMultiplier);
        }
    }

    render() {
        const { leftAngle, rightAngle, speedMultiplier } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.dude}>
                    <div className={styles.head} />
                    <div className={styles.body} />
                    <div className={styles.leftArm} style={{ transform: `rotate(${leftAngle}deg)`, transitionDuration: transitionSpeed * speedMultiplier }}>
                        <div className={styles.arm} />
                        <div className={styles.pole} />
                        <div className={styles.flag} />
                    </div>
                    <div className={styles.rightArm} style={{ transform: `rotate(${rightAngle}deg)`, transitionDuration: transitionSpeed * speedMultiplier }}>
                        <div className={styles.arm} />
                        <div className={styles.pole} />
                        <div className={styles.flag} />
                    </div>
                </div>
            </div>
        );
    }
}

Dude.propTypes = {
    message: PropTypes.string,
    speed: PropTypes.number.isRequired,
};

Dude.defaultProps = {
    message: '',
};
