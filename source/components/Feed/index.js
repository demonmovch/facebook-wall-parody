import React, { Component } from 'react';
import moment from 'moment';
import { withProfile } from 'components/HOC/withProfile';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Styles from './styles.m.css';
import Spinner from 'components/Spinner';
import { getUniqueID, delay } from 'instruments';

class Feed extends Component {
    state = {
        isPostsFetching: false,
        posts: [
            {
                id: '123',
                comment: 'Hi there!',
                created: 1526825076849,
                likes: [],
            },
            { id: '456', comment: 'Hello!', created: 1526825076900, likes: [] },
        ],
    };

    _removePost = id => {
        this.setState(({ posts }) => {
            const newPosts = posts.filter(post => post.id !== id);
            return { posts: [...newPosts] };
        });
    };

    _setPostsFetchingState = state => {
        this.setState({
            isPostsFetching: state,
        });
    };

    _likePost = async id => {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts: newPosts,
            isPostsFetching: false,
        });
    };

    _createPost = async comment => {
        this._setPostsFetchingState(true);

        const post = {
            id: getUniqueID(),
            created: moment.now(),
            comment,
            likes: [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            isPostsFetching: false,
            posts: [post, ...posts],
        }));
    };

    render() {
        const { posts, isPostsFetching } = this.state;
        const postJSX = posts.map(post => {
            return (
                <Post
                    key={post.id}
                    {...post}
                    _removePost={this._removePost}
                    _likePost={this._likePost}
                />
            );
        });

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isPostsFetching} />
                <StatusBar />
                <Composer _createPost={this._createPost} />
                {postJSX}
            </section>
        );
    }
}

export default withProfile(Feed);
