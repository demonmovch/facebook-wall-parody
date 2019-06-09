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
        isSpinning: true,
        posts: [
            { id: '123', comment: 'Hi there!', created: 1526825076849 },
            { id: '456', comment: 'Hello!', created: 1526825076900 },
        ],
    };
    _deletePost = id => {
        const { posts } = this.state;
        const newPosts = posts.filter(post => post.id !== id);
        this.setState({
            posts: [...newPosts],
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
            return <Post key={post.id} {...post} _deletePost={this._deletePost} />;
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
