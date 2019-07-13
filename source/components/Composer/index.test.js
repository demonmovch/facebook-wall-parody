import React from 'react';
import { mount, configure } from 'enzyme';
import { Composer } from './';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const props = {
    _createPost: jest.fn(),
    avatar: 'source/theme/assets/lisa.png',
    currentUserFirstName: 'Дмитрий',
};

const comment = 'Merry christmas!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer {...props} />);
const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

describe('composer component:', () => {
    test('Composer component should correspond to its snapshot counterpart', () => {
        expect(result).toMatchSnapshot();
    });

    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({ comment });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({ comment: '' });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', () => {
        result
            .find('textarea')
            .simulate('change', { target: { value: comment } });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost prop should be invoked once after form submition', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('should handle textarea "keypress" event', () => {
        result.find('textarea').simulate('keypress', { key: 'Enter' });

        expect(result.state()).toEqual(initialState);
    });

    test(`_submitComment should be invoked twice, _submitOnEnter and _handleFormSubmit class methods should be invoked once`, () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(2);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });

    test(`_updateComment should be invoked once after comment update`, () => {
        expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
    });
});
