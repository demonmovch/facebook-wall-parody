import React, { Component } from 'react';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Styles from './styles.m.css';
import Spinner from 'components/Spinner';

export default class Feed extends Component {
    state = {
        isSpinning: true,
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'Hello!', created: 1526825076900 },
        ],
    };

    render() {
        const { posts, isSpinning } = this.state;
        const postJSX = posts.map(post => {
            return <Post key={post.id} {...post} />;
        });

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isSpinning} />
                <StatusBar />
                <Composer />
                {postJSX}
            </section>
        );
    }
}
