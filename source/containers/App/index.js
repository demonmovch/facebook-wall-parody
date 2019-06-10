import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Feed from 'components/Feed';
import avatar from 'theme/assets/koala';
import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'какой-то',
    currentUserLastName: 'чел',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Provider value={options}>
                <Feed />
            </Provider>
        );
    }
}
