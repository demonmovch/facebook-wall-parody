import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';
import { func, string, number, array } from 'prop-types';
import Like from 'components/Like';

@withProfile
export default class Post extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        likes: array.isRequired,
        id: string.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        _removePost: func.isRequired,
    };

    _removePost = () => {
        const { id, _removePost } = this.props;
        _removePost(id);
    };

    render() {
        const { comment, created, _likePost, id, likes } = this.props;
        const {
            currentUserFirstName,
            currentUserLastName,
            avatar,
        } = this.props;

        return (
            <section className={Styles.post}>
                <button onClick={this._removePost} />
                <img src={avatar} />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like _likePost={_likePost} id={id} likes={likes} />
            </section>
        );
    }
}
