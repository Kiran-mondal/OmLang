  // HTML গ্লিচ ফিক্স করার জন্য স্টাইলে ডাবল কোটেশন (") এর বদলে সিঙ্গেল কোটেশন (') ব্যবহার করা হয়েছে
  const highlightCode = (code) => {
    if (!code) return '';
    let text = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    text = text.replace(/(&quot;.*?&quot;|".*?")/g, "<span style='color:#a5d6ff'>$1</span>");
    text = text.replace(/(\/\/.*)/g, "<span style='color:#8b949e'>$1</span>");
    text = text.replace(/\b(show|matrix|for|to|while|if|else)\b/g, "<span style='color:#ff7b72'>$1</span>");
    text = text.replace(/\b(\d+)\b/g, "<span style='color:#79c0ff'>$1</span>");
    return text;
  };

  const handleRun = () => {
    // কম্পাইলার রেস্ট্রিকশন: যদি ফাইলের শেষে .om না থাকে, তবে রান হবে না
    if (!activeFileName.toLowerCase().endsWith('.om')) {
      setOutput(`[Error] Execution Failed!\nThe OmLang Engine can only compile '.om' files.\nFile '${activeFileName}' is not supported.`);
      return;
    }
    const result = runOmLang(activeFile.code);
    setOutput(`Compiling ${activeFileName}...\nOptimizing AST...\n\n` + result);
  };
