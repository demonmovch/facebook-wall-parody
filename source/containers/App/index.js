import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import avatar from 'theme/assets/koala';
import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Дмитрий',
    currentUserLastName: 'Мовчан',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value={options}>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
