(self.webpackChunkwaves_mood_hostory=self.webpackChunkwaves_mood_hostory||[]).push([[358],{2322:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return g}});var o=t(1413),r=t(2982),s=t(4165),i=t(5861),c=t(885),l=t(2791),a=t(8186),u=t(9851),d=t(6431),h=t.n(d),p=t(9085),v=t(5498),m=t.n(v),f={moodCanvasWrapper:"style_moodCanvasWrapper__X2RkM",moodCanvas:"style_moodCanvas__yZGyq",innerContainer:"style_innerContainer__DxoJA",text:"style_text__LR1oy",colorList:"style_colorList__ePnh7",colorElement:"style_colorElement__7Mv7o",colorElementSelected:"style_colorElementSelected__JbpO0",canvaWrapper:"style_canvaWrapper__wytE4",canva:"style_canva__oC2rC",canvaRow:"style_canvaRow__fZpy4",canvaElement:"style_canvaElement__M2FZ0",controls:"style_controls__7dNJA",btnGroup:"style_btnGroup__Dh4oD",btn:"style_btn__id0h3",pixelUsed:"style_pixelUsed__fxVH8",selectedTokenTitle:"style_selectedTokenTitle__JOGLp",selectedTokenWrapper:"style_selectedTokenWrapper__sObL7",selectedTokenSelected:"style_selectedTokenSelected__NX0Aw",historyLine:"style_historyLine__uvHz5",historyStep:"style_historyStep__wup8X",historyStepSelected:"style_historyStepSelected__2U0Hc"},y=t(184);function g(e){var n=e.data,t=(0,l.useState)("USDT"),d=(0,c.Z)(t,2),v=d[0],g=d[1],_=(0,l.useState)("blue"),k=(0,c.Z)(_,2),x=k[0],w=k[1],b=(0,l.useState)([]),S=(0,c.Z)(b,2),C=S[0],j=S[1],N=(0,l.useState)([]),T=(0,c.Z)(N,2),E=T[0],U=T[1],W=(0,l.useState)(!1),Z=(0,c.Z)(W,2),L=Z[0],D=Z[1],A=(0,l.useState)([]),O=(0,c.Z)(A,2),R=O[0],X=O[1],H=(0,l.useState)("now"),P=(0,c.Z)(H,2),M=P[0],J=P[1],G=new a.Signer({NODE_URL:"https://nodes.wavesnodes.com"}),q=new u.x;G.setProvider(q);var B=function(e){return e.split("|").filter((function(e){return!!e})).map((function(e){var n=e.split("-");return{color:n[0],width:+n[1],height:+n[2]}}))},Y=function(e,n){var t;return(arguments.length>2&&void 0!==arguments[2]&&arguments[2]?E:C).forEach((function(o){o.width===e&&o.height===n&&(t=o.color)})),t||!1},V=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ","6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ",n={dApp:"3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",fee:5e5,payment:[{assetId:"USDT"===v?"34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ":"6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ",amount:1e4*E.length}],call:{function:"draw",args:[{type:"list",value:E.map((function(e){return"".concat(e.color,"-").concat(e.width,"-").concat(e.height)})).map((function(e){return{type:"string",value:e}}))}]}},e.next=5,G.invoke(n).broadcast().then((function(e){var n;e&&16===(null===(n=e[0])||void 0===n?void 0:n.type)?(0,p.Am)("Request sent successfully!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(0,p.Am)("An error occurred, please check your wallet!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(e)})).catch((function(e){var n;console.log("error",e),null!==e&&void 0!==e&&null!==(n=e.message)&&void 0!==n&&n.includes("WavesKeeper is not installed.. This is not error of signer")?(0,p.Am)("WavesKeeper not found! You need to install a WavesKeeper to use the app!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(0,p.Am)(null===e||void 0===e?void 0:e.message,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),U([])}));case 5:setTimeout((function(){U([])}),7e3);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(e){if(E.length<60){var n=E.filter((function(n){return!(n.height===e.height&&n.width===e.width)}));U([].concat((0,r.Z)(n),[e]))}else(0,p.Am)("60 pixels max per transaction!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},K=(0,l.useState)(!1),I=(0,c.Z)(K,2),Q=I[0],F=I[1];(0,l.useEffect)((function(){if(n){var e=n.filter((function(e){return e.key.includes("log_")})).map((function(e){return e.key.replaceAll("_","").length>0?(0,o.Z)((0,o.Z)({},e),{},{key:"".concat(e.key.split("_")[0],"_").concat(e.key.split("_")[1])}):e})).reduce((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,t=!1;return void 0===e.length?[e,n]:(null===e||void 0===e||e.forEach((function(e){e.key===n.key&&(t=!0)})),t?e.map((function(e){return e.key!==n.key?e:(0,o.Z)((0,o.Z)({},e),{},{value:e.value+"|"+n.value})})):[].concat((0,r.Z)(e),[n]))}));j(B(n.filter((function(e){return e.key.includes("-")})).map((function(e){return"|".concat(e.value,"-").concat(e.key)})).join(""))),X(e);var t=document.querySelector(".historyLine");!Q&&t&&(F(!0),setTimeout((function(){t.scrollLeft=null===t||void 0===t?void 0:t.scrollWidth}),3e3))}}),[n]);var $=null===R||void 0===R?void 0:R.map((function(e){var n;return+(null===e||void 0===e||null===(n=e.key)||void 0===n?void 0:n.split("_")[1])})).sort((function(e,n){return e-n}));function ee(e){var n=[];R.map((function(e){return(0,o.Z)((0,o.Z)({},e),{},{id:+e.key.split("_")[1]})})).filter((function(n){return"now"===e||n.id<=e})).sort((function(e,n){return e.id-n.id})).map((function(e){var t=B(e.value);n=n.concat(t)})),J(e),j(n)}var ne=function(){var e=document.getElementById("canvaBlock");e&&m()(e).then((function(e){!function(e,n){var t=window.document.createElement("a");t.href=e,t.download=n,t.style.cssText="display:none;",(document.body||document.documentElement).appendChild(t),"function"===typeof t.click?t.click():(t.target="_blank",t.dispatchEvent(new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0}))),URL.revokeObjectURL(t.href),t.remove()}(e.toDataURL("image/png",1),"Screenshot.png")}))};return(0,y.jsxs)("div",{className:f.moodCanvasWrapper,id:"mood-canvas",children:[(0,y.jsxs)("div",{className:"container ".concat(f.moodCanvas),children:[(0,y.jsx)("div",{className:"title",children:"Mood canvas"}),(0,y.jsxs)("div",{className:f.innerContainer,children:[(0,y.jsxs)("div",{className:f.text,children:["This drawing will be permanently stored in the blockchain on behalf of your account. Try to express your emotions by answering the following questions:",(0,y.jsxs)("ul",{children:[(0,y.jsx)("li",{children:"What is your waves mood today?"}),(0,y.jsx)("li",{children:"What would you like to be recorded in history today?"}),(0,y.jsx)("li",{children:"How would you describe your current state of mind?"}),(0,y.jsx)("li",{children:"What thoughts or memories are evoking strong emotions within you right now?"})]})]}),(0,y.jsxs)("div",{className:f.canvaWrapper,children:[(0,y.jsx)("ul",{className:f.colorList,children:["aqua","black","blue","fuchsia","gray","green","lime","maroon","navy","olive","purple","red","silver","teal","white","yellow"].map((function(e){return(0,y.jsx)("li",{className:"".concat(f.colorElement," ").concat(x===e&&f.colorElementSelected),style:{background:e},onClick:function(n){return w(e)}},e)}))}),(0,y.jsx)("div",{id:"canvaBlock",onMouseDown:function(){return D(!0)},onMouseUp:function(){return D(!1)},className:f.canva,children:Array.from({length:100}).map((function(e,n){return(0,y.jsx)("div",{className:f.canvaRow,children:Array.from({length:100}).map((function(e,t){var o=Y(n,t,!1),r="now"===M?Y(n,t,!0):[],s="none";return"string"===typeof r?s=r:"string"===typeof o&&(s=o),(0,y.jsx)("div",{className:"".concat(f.canvaElement),style:{background:s},onClick:function(){return z({width:n,height:t,color:x})},onMouseEnter:function(){L&&z({width:n,height:t,color:x})}},"".concat(n).concat(t))}))},"".concat(n))}))})]}),(0,y.jsxs)("div",{className:f.controls,children:[(0,y.jsxs)("div",{className:f.selectedToken,children:[(0,y.jsx)("div",{className:f.selectedTokenTitle,children:"Payment in token:"}),(0,y.jsxs)("div",{className:f.selectedTokenWrapper,children:[(0,y.jsx)("span",{onClick:function(e){return g("USDT")},className:"USDT"===v?f.selectedTokenSelected:"",children:"USDT-WXG"}),(0,y.jsx)("span",{onClick:function(e){return g("USDC")},className:"USDC"===v?f.selectedTokenSelected:"",children:"USDC-WXG"})]})]}),(0,y.jsxs)("div",{className:f.pixelUsed,children:[E.length,(0,y.jsx)("span",{children:"pixels used"})]}),(0,y.jsxs)("div",{className:f.btnGroup,children:[(0,y.jsx)("button",{className:f.btn,onClick:function(){U(E.filter((function(e,n,t){return n!==t.length-1})))},children:"Undo last"}),(0,y.jsx)("button",{className:f.btn,onClick:function(){U([])},children:"Undo all"}),(0,y.jsx)("button",{disabled:0===E.length,className:f.btn,onClick:function(){return V()},children:"Save and burn WXG"}),(0,y.jsx)("button",{className:f.btn,onClick:function(e){return ne()},children:"Take Screenshot"})]})]})]})]}),(0,y.jsx)("div",{className:"container-full",children:(0,y.jsxs)("ul",{className:"historyLine ".concat(f.historyLine),children:[$.map((function(e,n){return(0,y.jsxs)("li",{className:"".concat(f.historyStep," ").concat(e===M&&f.historyStepSelected),onClick:function(){return ee(e)},children:[(0,y.jsx)("div",{children:(0,y.jsx)(h(),{format:"YYYY/MM/DD",children:e})}),(0,y.jsx)("span",{children:(0,y.jsx)(h(),{format:"HH:mm",children:e})})]},"".concat(e,"-").concat(n))})),(0,y.jsx)("li",{onClick:function(){return ee("now")},className:"historyStepNow ".concat(f.historyStep," ").concat("now"===M&&f.historyStepSelected),children:(0,y.jsx)("div",{children:"NOW"})},"now")]})})]})}},5819:function(){}}]);
//# sourceMappingURL=358.cf37e10c.chunk.js.map