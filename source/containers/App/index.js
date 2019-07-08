import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import avatar from 'theme/assets/koala';
import { Provider } from 'components/HOC/withProfile';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';

const options = {
    avatar,
    currentUserFirstName: 'Дмитрий',
    currentUserLastName: 'Мовчан',
};

@hot(module)
export default class App extends Component {
    state = { loggedIn: false };

    logout = () => {
        this.setState(() => ({ loggedIn: false }));
    };

    login = () => {
        this.setState(() => ({ loggedIn: true }));
    };

    componentDidMount() {
        //
        console.log('sfsf', localStorage.getItem('loggedIn'));
        if (localStorage.getItem('loggedIn') === 'true') {
            this.login();
        }
    }

    render() {
        return (
            <Catcher>
                <Provider value={options}>
                    {this.state.loggedIn && <StatusBar logout={this.logout} />}
                    {!this.state.loggedIn ? (
                        <Redirect to="/login" />
                    ) : (
                        <Redirect to="/feed" />
                    )}
                    <Switch>
                        <Route
                            component={() => <Login login={this.login} />}
                            path="/login"
                        />
                        <Route component={Feed} path="/feed" />
                        <Route component={Profile} path="/profile" />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
