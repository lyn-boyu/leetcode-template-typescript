// @bun
// 0772-basic-calculator-iii-hard/.meta/solution.ts
function calculate(s) {
  let i = 0;
  function helper() {
    const stack = [];
    let num = 0;
    let sign = "+";
    while (i < s.length) {
      const c = s[i++];
      if (isDigit(c)) {
        num = num * 10 + Number(c);
      }
      if (c === "(") {
        num = helper();
      }
      if ("+-*/".includes(c) || c === ")" || i === s.length) {
        if (sign === "+")
          stack.push(num);
        else if (sign === "-")
          stack.push(-num);
        else if (sign === "*")
          stack.push(stack.pop() * num);
        else if (sign === "/")
          stack.push(Math.trunc(stack.pop() / num));
        sign = c;
        num = 0;
      }
      if (c === ")")
        break;
    }
    return stack.reduce((a, b) => a + b, 0);
  }
  function isDigit(ch) {
    return ch >= "0" && ch <= "9";
  }
  return helper();
}
export {
  calculate
};
