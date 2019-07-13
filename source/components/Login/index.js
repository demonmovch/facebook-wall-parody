import React, { Component } from 'react';
import { withProfile } from 'components/HOC/withProfile';
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    login = event => {
        event.preventDefault();
        localStorage.setItem('loggedIn', 'true');
        this.props.login();
        this.props.history.replace('/feed');
    };

    render() {
        return (
            <form className={Styles.login}>
                <button onClick={this.login}>Login</button>
                <p>Just click "Login" button to login</p>
            </form>
        );
    }
}
