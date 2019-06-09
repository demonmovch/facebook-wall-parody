import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.m.css';
import { Consumer } from 'components/HOC/withProfile';

export default class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired,
    };

    state = {
        comment: '',
    };

    _updateComment = event => {
        this.setState({
            comment: event.target.value,
        });
    };

    _handleFormSubmit = event => {
        event.preventDefault();
        this._submitComment();
    };

    _submitComment = () => {
        const { comment } = this.state;
        if (!comment) {
            return null;
        }

        this.props._createPost(comment);
        this.setState({
            comment: '',
        });
    };

    _submitOnEnter = event => {
        const enterKey = event.key === 'Enter';
        if (enterKey) {
            event.preventDefault();
            this._submitComment();
        }
    };

    render() {
        const { comment } = this.state;

        return (
            <Consumer>
                {context => (
                    <section className={Styles.composer}>
                        <img src={context.avatar} />
                        <form onSubmit={this._handleFormSubmit}>
                            <textarea
                                placeholder={`What is on your mind, ${
                                    context.currentUserFirstName
                                } ${context.currentUserLastName}?`}
                                value={comment}
                                onChange={this._updateComment}
                                onKeyPress={this._submitOnEnter}
                            />
                            <input type='submit' value='Post' />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
