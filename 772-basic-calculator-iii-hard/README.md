 
## 772. Basic Calculator III

**Difficulty:** Hard  
**Link:** [LeetCode Problem](https://leetcode.com/problems/basic-calculator-iii/)

### 🧩 Description

Implement a basic calculator to evaluate a simple expression string.

The expression string may contain:

- Non-negative integers
- Operators: `+`, `-`, `*`, `/`
- Parentheses: `(` and `)`
- Empty spaces `' '`

> Integer division should truncate toward zero.  
> You may assume that the given expression is always valid.

### 📘 Examples

```
Input:  "1 + 1"
Output: 2

Input:  " 6-4 / 2 "
Output: 4

Input:  "2*(5+5*2)/3+(6/2+8)"
Output: 21

Input:  "(2+6* 3+5- (3*14/7+2)*5)+3"
Output: -12
```

#### 🚫 Constraints

- `1 <= s.length <= 10^4`
- `s` consists of digits, operators `'+'`, `'-'`, `'*'`, `'/'`, parentheses `'('`, `')'`, and spaces.
- All parentheses are properly matched.
- Do **not** use the built-in `eval` function.

#### ✅ Tags

`Stack` `Recursion` `Math` `String` `Parsing`
 
 