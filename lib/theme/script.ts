/**
 * Dependency-free, runs before first paint. Reads the saved mode, applies the
 * time-based auto rule, and toggles both data-theme and the .dark class so the
 * original Tailwind dark: variants keep working.
 */
export const themeInitScript = `(function(){try{
var root=document.documentElement;
var mode=null;
try{mode=localStorage.getItem("xeyj-theme");}catch(e){}
if(!mode){
  var m=document.cookie.match(/(?:^|; )xeyj-theme=([^;]+)/);
  if(m){try{mode=decodeURIComponent(m[1]);}catch(e){mode=m[1];}}
}
if(mode!=="light"&&mode!=="dark"&&mode!=="auto"){mode="auto";}
try{var q=new URLSearchParams(location.search).get("theme");if(q==="light"||q==="dark"||q==="auto"){mode=q;}}catch(e){}
var hour=new Date().getHours();
var theme=mode==="auto"?(hour>=6&&hour<18?"light":"dark"):mode;
root.dataset.theme=theme;
root.dataset.themeMode=mode;
root.style.colorScheme=theme;
root.classList.toggle("dark",theme==="dark");
try{var mq=window.matchMedia("(prefers-color-scheme: dark)");root.dataset.systemTheme=mq.matches?"dark":"light";}catch(e){}
}catch(e){}})();`;
