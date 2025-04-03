 # 📘 LeetCode - Encode and Decode Strings 271

**Difficulty:** Medium  
**Topic:** String, Design  

---

## 🧩 Problem Description

Design an algorithm to encode a **list of strings** to a **single string**, and a corresponding algorithm to decode that string **back to the original list** of strings.

You should implement two functions:

- `encode(strs: string[]): string`
- `decode(s: string): string[]`

The encoded string is guaranteed to be decodable back to the original list of strings.

---

## 🧪 Examples

### Example 1

**Input:**  
```ts
["neet", "code", "love", "you"]
```

**Output after decode(encode(...)):**  
```ts
["neet", "code", "love", "you"]
```

---

### Example 2

**Input:**  
```ts
["we", "say", ":", "yes"]
```

**Output after decode(encode(...)):**  
```ts
["we", "say", ":", "yes"]
```

---

## 🧱 Constraints

- `0 <= strs.length < 100`
- `0 <= strs[i].length < 200`
- `strs[i]` contains only **UTF-8 characters**
- The encoded data must be decodable back into the original list without loss or ambiguity.

 