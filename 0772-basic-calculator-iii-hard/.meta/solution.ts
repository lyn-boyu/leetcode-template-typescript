/**
 * Evaluate a mathematical expression string containing +, -, *, /, parentheses, and spaces.
 * This implementation uses recursion to handle parentheses and a stack to manage operations.
 *
 * Example:
 * Input:  "2*(5+5*2)/3+(6/2+8)"
 * Output: 21
 *
 * Time Complexity:    O(n) — Each character is processed once.
 * Space Complexity:   O(n) — Stack and recursion depth can reach up to n.
 */

export function calculate(s: string): number {
    let i = 0; // Global pointer to scan the input string

    function helper(): number {
        const stack: number[] = [];
        let num = 0;
        let sign = '+'; // Default starting sign

        while (i < s.length) {
            const c = s[i++];

            // Build current number (could be multiple digits)
            if (isDigit(c)) {
                num = num * 10 + Number(c);
            }

            // Handle opening parenthesis by recursively evaluating sub-expression
            if (c === '(') {
                num = helper();
            }

            // If current character is an operator, a closing parenthesis, or end of string
            if ('+-*/'.includes(c) || c === ')' || i === s.length) {
                // Apply the previous sign to the number
                if (sign === '+') stack.push(num);
                else if (sign === '-') stack.push(-num);
                else if (sign === '*') stack.push(stack.pop()! * num);
                else if (sign === '/') stack.push(Math.trunc(stack.pop()! / num)); // Truncate toward zero

                sign = c;  // Update sign to current operator
                num = 0;   // Reset number
            }

            // If closing parenthesis, return result of this sub-expression
            if (c === ')') break;
        }

        // Sum all numbers in the stack to get final result
        return stack.reduce((a, b) => a + b, 0);
    }

    function isDigit(ch: string): boolean {
        return ch >= '0' && ch <= '9';
    }

    return helper();
}
