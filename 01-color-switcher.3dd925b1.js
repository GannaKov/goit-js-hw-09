const t={bodyEl:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){t.startBtn.setAttribute("disabled",""),t.stopBtn.hasAttribute("disabled")&&t.stopBtn.removeAttribute("disabled");e=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.bodyEl.style.backgroundColor=e}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",""),clearInterval(e)}));let e=null;
//# sourceMappingURL=01-color-switcher.3dd925b1.js.map
