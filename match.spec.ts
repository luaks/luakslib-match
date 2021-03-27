import {match} from './match';

describe('match', () => {
    const value = Symbol('value');

    it('should not match on no case', () => {
        expect(match(value).with()).toBe(undefined);
    });

    it('should not match on a single non matching case', () => {
        expect(match(value).with(
            [() => false, () => value]
        )).toBe(undefined);
    });

    it('should match on a single matching case', () => {
        expect(match(value).with(
            [() => true, () => value]
        )).toBe(value);
    });

    it('should not match on a two non matching case', () => {
        expect(match(value).with(
            [() => false, () => value],
            [() => false, () => value]
        )).toBe(undefined);
    });

    it('should match on a non matching case and a matching case', () => {
        expect(match(value).with(
            [() => false, () => null],
            [() => true, () => value]
        )).toBe(value);
    });

    it('should match the first of several', () => {
        expect(match(value).with(
            [() => false, () => null],
            [() => true, () => value],
            [() => true, () => null]
        )).toBe(value);
    });
});
