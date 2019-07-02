import React, { Component } from 'react';
import {
    Transition,
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import { fromTo } from 'gsap';
import { withProfile } from 'components/HOC/withProfile';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Styles from './styles.m.css';
import Spinner from 'components/Spinner';
import Postman from 'components/Postman';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

class Feed extends Component {
    state = {
        isPostsFetching: false,
        posts: [],
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('like', postJSON => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${meta.authorFirstName} ${meta.authorLastName}` !==
                `${currentUserFirstName} ${currentUserLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map(post =>
                        post.id === likedPost.id ? likedPost : post,
                    ),
                }));
            }
        });

        socket.on('create', postJSON => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${meta.authorFirstName} ${meta.authorLastName}` !==
                `${currentUserFirstName} ${currentUserLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });

        socket.on('remove', postJSON => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${meta.authorFirstName} ${meta.authorLastName}` !==
                `${currentUserFirstName} ${currentUserLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter(post => post.id !== removedPost.id),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = state => {
        this.setState({
            isPostsFetching: state,
        });
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostsFetching: false,
        });
    };

    _likePost = async id => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(post =>
                post.id === likedPost.id ? likedPost : post,
            ),
            isPostsFetching: false,
        }));
    };

    _createPost = async comment => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            isPostsFetching: false,
            posts: [post, ...posts],
        }));
    };

    _removePost = async id => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => {
            const newPosts = posts.filter(post => post.id !== id);
            return { posts: [...newPosts], isPostsFetching: false };
        });
    };

    _animateComposerEnter = composer => {
        fromTo(
            composer,
            1,
            { opacity: 0, rotationX: 50 },
            { opacity: 1, rotationX: 0 },
        );
    };

    _animatePostmanEntering = postman => {
        fromTo(postman, 2, { right: -350 }, { right: 30 });
    };

    _animatePostmanEntered = postman => {
        fromTo(postman, 2, { right: 30 }, { right: -350 });
    };

    render() {
        const { posts, isPostsFetching } = this.state;
        const postJSX = posts.map(post => {
            return (
                <CSSTransition
                    key={post.id}
                    timeout={{ enter: 500, exit: 400 }}
                    classNames={{
                        enter: Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit: Styles.postOutStart,
                        exitActive: Styles.postOutEnd,
                    }}
                >
                    <Catcher>
                        <Post
                            {...post}
                            _removePost={this._removePost}
                            _likePost={this._likePost}
                        />
                    </Catcher>
                </CSSTransition>
            );
        });

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isPostsFetching} />
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout={1000}
                    onEnter={this._animateComposerEnter}
                >
                    <Composer _createPost={this._createPost} />
                </Transition>
                <Transition
                    appear
                    in
                    timeout={3500}
                    onEntering={this._animatePostmanEntering}
                    onEntered={this._animatePostmanEntered}
                >
                    <Postman />
                </Transition>
                <TransitionGroup>{postJSX}</TransitionGroup>
            </section>
        );
    }
}

export default withProfile(Feed);
