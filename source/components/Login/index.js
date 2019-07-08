import React, { Component } from 'react';
import { withProfile } from 'components/HOC/withProfile';
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    login = event => {
        event.preventDefault();
        localStorage.setItem('loggedIn', 'true');
        this.props.login();
    };

    render() {
        return (
            <form className={Styles.login}>
                <input type="text" />
                <input type="password" />
                <button onClick={this.login}>Login</button>
            </form>
        );
    }
}
