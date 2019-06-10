import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import PropTypes from 'prop-types';
import { Consumer } from 'components/HOC/withProfile';

export default class Post extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        _removePost: PropTypes.func.isRequired,
    };

    _removePost = () => {
        const { id, _removePost } = this.props;
        _removePost(id);
    };

    render() {
        const { comment, created } = this.props;

        return (
            <Consumer>
                {context => (
                    <section className={Styles.post}>
                        <button onClick={this._removePost} />
                        <img src={context.avatar} />
                        <a>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{comment}</p>
                    </section>
                )}
            </Consumer>
        );
    }
}
