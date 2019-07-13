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
        if (localStorage.getItem('loggedIn') === 'true') {
            this.login();
        }
    }

    render() {
        return (
            <Catcher>
                <Provider value={options}>
                    {this.state.loggedIn && <StatusBar logout={this.logout} />}
                    <Switch>
                        <Route
                            render={props => (
                                <Login login={this.login} {...props} />
                            )}
                            path="/login"
                        />
                        {!this.state.loggedIn && <Redirect to="/login" />}
                        <Route component={Feed} path="/feed" />
                        <Route component={Profile} path="/profile" />
                        <Redirect to="/feed" />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
