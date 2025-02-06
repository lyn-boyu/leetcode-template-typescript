// @bun
// 0269-alien-dictionary-hard/.meta/solution.ts
var alienOrder = function(words) {
  const graph = new Map;
  const inDegree = new Map;
  for (const word of words) {
    for (const ch of word) {
      if (!graph.has(ch)) {
        graph.set(ch, new Set);
      }
      if (!inDegree.has(ch)) {
        inDegree.set(ch, 0);
      }
    }
  }
  for (let i = 0;i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    const minLen = Math.min(word1.length, word2.length);
    let foundDifference = false;
    for (let j = 0;j < minLen; j++) {
      const ch1 = word1[j];
      const ch2 = word2[j];
      if (ch1 !== ch2) {
        if (!graph.get(ch1).has(ch2)) {
          graph.get(ch1).add(ch2);
          inDegree.set(ch2, inDegree.get(ch2) + 1);
        }
        foundDifference = true;
        break;
      }
    }
    if (!foundDifference && word1.length > word2.length) {
      return "";
    }
  }
  const queue = [];
  for (const [ch, deg] of inDegree.entries()) {
    if (deg === 0) {
      queue.push(ch);
    }
  }
  let order = "";
  while (queue.length > 0) {
    const ch = queue.shift();
    order += ch;
    for (const neighbor of graph.get(ch)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  if (order.length !== inDegree.size) {
    return "";
  }
  return order;
};
var solution_default = alienOrder;
export {
  solution_default as default
};
