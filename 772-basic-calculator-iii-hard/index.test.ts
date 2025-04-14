import { calculate } from './index';
import { describe, it, expect } from "bun:test";

describe('Basic Calculator III', () => {
    it('should evaluate simple addition', () => {
        expect(calculate('1 + 1')).toBe(2);
    });

    it('should handle subtraction and division with space', () => {
        expect(calculate(' (6-4)/2 ')).toBe(1);
    });

    it('should evaluate expression with nested parentheses and multiplication', () => {
        expect(calculate('2*(5+5*2)/3+(6/2+8)')).toBe(21);
    });

    it('should evaluate complex nested expression', () => {
        expect(calculate('(2+6* 3+5- (3*14/7+2)*5)+3')).toBe(-12);
    });

    it('should handle single number', () => {
        expect(calculate('42')).toBe(42);
    });
});
