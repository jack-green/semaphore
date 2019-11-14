import React from 'react';
import {
    Controls,
    Create,
    Dude,
    Header,
} from './Components';
import styles from './App.module.css';

const speeds = [0.25, 0.5, 1, 2, 5, 10];

export default class App extends React.Component {
    constructor(props) {
        super(props);

        let message = '';

        // parse message from URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('m')) {
            message = urlParams.get('m');
            message = atob(message).substr(0, 17);
        }

        this.state = {
            speed: 1,
            isPaused: false,
            message,
            playNumber: 1,
            index: -1,
        };

        this.dudeRef = React.createRef();
    }

    setSpeed = (direction) => {
        const { speed } = this.state;

        let index = speeds.indexOf(speed);
        index += direction;
        index = Math.max(Math.min(speeds.length - 1, index), 0);
        if (index !== speeds.indexOf(speed)) {
            this.setState({ speed: speeds[index] });
        }
    }

    togglePause = () => {
        const { isPaused } = this.state;
        this.setState({ isPaused: !isPaused });
        if (this.dudeRef.current) {
            this.dudeRef.current.setPaused(!isPaused);
        }
    }

    replay = () => {
        const { playNumber } = this.state;
        this.setState({ index: -1, playNumber: playNumber + 1 });
    }

    nextIndex = () => {
        const { index } = this.state;
        this.setState({ index: index + 1 });
    }

    render() {
        const {
            message,
            speed,
            isPaused,
            playNumber,
            index,
        } = this.state;
        return (
            <div className={styles.app}>
                <Header message={message} index={index} />
                <Dude
                    key={`play-${playNumber}`}
                    ref={this.dudeRef}
                    message={message}
                    speed={isPaused ? 0 : speed}
                    nextIndex={this.nextIndex}
                />
                {message ? (
                    <Controls
                        speed={speed}
                        isPaused={isPaused}
                        togglePause={this.togglePause}
                        setSpeed={this.setSpeed}
                        replay={this.replay}
                    />
                ) : null}
                <Create isReply={!!message} />
            </div>
        );
    }
}
