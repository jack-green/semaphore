import React from 'react';
import PropTypes from 'prop-types';
import styles from './Create.module.css';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            base64: '',
            // error: null,
        };
    }

    encode = () => {
        const { message } = this.state;
        this.setState({ base64: btoa(message) });
    }

    setMessage = (e) => {
        const message = e.target.value;
        this.setState({ message });
    }

    render() {
        const { isReply } = this.props;
        const { message, base64 } = this.state;
        return (
            <form className={styles.create} method="get" onSubmit={this.encode}>
                <label htmlFor="message">
                    {isReply ? 'Write a reply' : 'Send a semaphore message'}
                    <input
                        type="text"
                        placeholder="Your Message"
                        value={message}
                        onChange={this.setMessage}
                        id="message"
                    />
                </label>
                <button type="submit">Signal</button>
                <input type="hidden" name="m" value={base64} />
            </form>
        );
    }
}

Create.propTypes = {
    isReply: PropTypes.bool.isRequired,
};
