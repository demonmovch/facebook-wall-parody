import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';

export default class Post extends Component {
	render() {
		const { currentUserFirstName, currentUserLastName, avatar } = this.props;

		return (
			<section className={Styles.post}>
				<img src={avatar} />
				<a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
				<time>{moment().format('MMMM D h:mm:ss a')}</time>
				<p>Howdy!</p>
			</section>
		);
	}
}
