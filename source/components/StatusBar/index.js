import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class StatusBar extends Component {
	render() {
		const { currentUserFirstName, currentUserLastName, avatar } = this.props;

		return (
			<section className={Styles.statusBar}>
				<button>
					<img src={avatar} />
					<span>{currentUserFirstName}</span>
					&nbsp;
					<span>{currentUserLastName}</span>
				</button>
			</section>
		);
	}
}
