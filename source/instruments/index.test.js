import { sum, delay, getUniqueID, getFullApiUrl } from './';
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';

describe('instruments:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw an error when called with non-number type as second argument', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should throw an error when called with non-number type as first argument', () => {
        expect(() => sum('hello', 7)).toThrow();
    });

    test('sum function should return an addition of two arguments passed', () => {
        expect(sum(3, 7)).toBe(10);
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw an error when called with non-number type as argument', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw an error when called with non-string type as first argument', () => {
        expect(() => getFullApiUrl(2, 'hello')).toThrow();
    });

    test('getFullApiUrl function should throw an error when called with non-string type as second argument', () => {
        expect(() => getFullApiUrl('hello', 7)).toThrow();
    });

    test('getFullApiUrl function should produce a string', () => {
        expect(typeof getFullApiUrl('hello', 'hello')).toBe('string');
    });
});
