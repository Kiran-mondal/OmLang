const code = 'show "Hello World"\nfor x = 1 to 3 {\n  show "OmLang " + x\n}// comment\nmatrix 1 2 3';

const highlightCodeBaseline = (code) => {
    if (!code) return '';
    let text = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    text = text.replace(/(&quot;.*?&quot;|".*?")/g, "<span style='color:#a5d6ff'>$1</span>");
    text = text.replace(/(\/\/.*)/g, "<span style='color:#8b949e'>$1</span>");
    text = text.replace(/\b(show|matrix|for|to|while|if|else)\b/g, "<span style='color:#ff7b72'>$1</span>");
    text = text.replace(/\b(\d+)\b/g, "<span style='color:#79c0ff'>$1</span>");
    return text;
};

const regexAmp = /&/g;
const regexLt = /</g;
const regexGt = />/g;
const regexQuote = /(&quot;.*?&quot;|".*?")/g;
const regexComment = /(\/\/.*)/g;
const regexKeyword = /\b(show|matrix|for|to|while|if|else)\b/g;
const regexNumber = /\b(\d+)\b/g;

const highlightCodeOptimized = (code) => {
    if (!code) return '';
    let text = code.replace(regexAmp, '&amp;').replace(regexLt, '&lt;').replace(regexGt, '&gt;');
    text = text.replace(regexQuote, "<span style='color:#a5d6ff'>$1</span>");
    text = text.replace(regexComment, "<span style='color:#8b949e'>$1</span>");
    text = text.replace(regexKeyword, "<span style='color:#ff7b72'>$1</span>");
    text = text.replace(regexNumber, "<span style='color:#79c0ff'>$1</span>");
    return text;
};

const iterations = 100000;

console.time('Baseline');
for (let i = 0; i < iterations; i++) {
    highlightCodeBaseline(code);
}
console.timeEnd('Baseline');

console.time('Optimized');
for (let i = 0; i < iterations; i++) {
    highlightCodeOptimized(code);
}
console.timeEnd('Optimized');
