export const extractBlock = (startIndex, linesArray) => {
  let block = [];
  let braceCount = 1;
  let i = startIndex + 1;
  while (i < linesArray.length && braceCount > 0) {
    if (linesArray[i].endsWith('{')) braceCount++;
    if (linesArray[i] === '}') braceCount--;
    if (braceCount > 0) block.push(linesArray[i]);
    i++;
  }
  return { block, nextIndex: i - 1 };
};
