import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import PropTypes from 'prop-types';
import { Consumer } from 'components/HOC/withProfile';

export default class Post extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired
    };
    render() {
        const { comment, created } = this.props;

        return (
            <Consumer>
                {context => (
                    <section className={Styles.post}>
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
