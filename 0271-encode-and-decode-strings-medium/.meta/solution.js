// @bun
// 0271-encode-and-decode-strings-medium/.meta/solution.ts
class Codec {
  encode(strs) {
    return strs.map((s) => `${s.length}#${s}`).join("");
  }
  decode(s) {
    const result = [];
    let i = 0;
    while (i < s.length) {
      let symbolIdx = i;
      while (s[symbolIdx] !== "#") {
        symbolIdx++;
      }
      const length = Number.parseInt(s.slice(i, symbolIdx), 10);
      const strStartIdx = symbolIdx + 1;
      const str = s.slice(strStartIdx, strStartIdx + length);
      result.push(str);
      i = strStartIdx + length;
    }
    return result;
  }
}
export {
  Codec
};
