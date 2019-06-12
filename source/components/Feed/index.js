import React, { Component } from 'react';
import moment from 'moment';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Styles from './styles.m.css';
import Spinner from 'components/Spinner';
import { getUniqueID } from 'instruments';

export default class Feed extends Component {
    state = {
        isSpinning: false,
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'Hello!', created: 1526825076900 },
        ],
    };

    _removePost = id => {
        this.setState(({ posts }) => {
            const newPosts = posts.filter(post => post.id !== id);
            return { posts: [...newPosts] };
        });
    };

    _createPost = comment => {
        const post = {
            id: getUniqueID(),
            created: moment.now(),
            comment,
        };

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));
    };

    render() {
        const { posts, isSpinning } = this.state;
        const postJSX = posts.map(post => {
            return (
                <Post key={post.id} {...post} _removePost={this._removePost} />
            );
        });

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isSpinning} />
                <StatusBar />
                <Composer _createPost={this._createPost} />
                {postJSX}
            </section>
        );
    }
}
