const articles=[...document.querySelectorAll('.chapter')];
const toc=document.getElementById('toc');
articles.forEach((article,i)=>{
  const title=article.dataset.title||article.querySelector('h2').textContent;
  const a=document.createElement('a');
  a.href='#'+article.id;
  a.innerHTML=`<span class="toc-number">${String(i+1).padStart(2,'0')}</span><span>${title}</span>`;
  a.addEventListener('click',()=>document.body.classList.remove('menu-open'));
  toc.appendChild(a);
});
document.getElementById('chapterCount').textContent=`${articles.length} 节`;
function setActive(id){[...toc.querySelectorAll('a')].forEach(a=>a.classList.toggle('active',a.hash==='#'+id))}
const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(visible)setActive(visible.target.id);
},{rootMargin:'-15% 0px -68% 0px',threshold:[0,.1,.3,.6]});
articles.forEach(a=>observer.observe(a));
const progress=document.getElementById('progress');
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%'}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();

const themeToggle=document.getElementById('themeToggle');
function applyTheme(theme){document.documentElement.dataset.theme=theme;themeToggle.textContent=theme==='dark'?'☼':'☾';themeToggle.title=theme==='dark'?'切换浅色模式':'切换深色模式';try{localStorage.setItem('guide-theme',theme)}catch(e){}}
let theme='light';try{theme=localStorage.getItem('guide-theme')||'light'}catch(e){}applyTheme(theme);
themeToggle.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));

const menuToggle=document.getElementById('menuToggle'),scrim=document.getElementById('scrim');
menuToggle.addEventListener('click',()=>document.body.classList.toggle('menu-open'));
scrim.addEventListener('click',()=>document.body.classList.remove('menu-open'));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')document.body.classList.remove('menu-open');
  if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();document.getElementById('search').focus()}
});
const search=document.getElementById('search'),summary=document.getElementById('searchSummary'),noResults=document.getElementById('noResults');
const original=articles.map(a=>a.innerHTML);
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function runSearch(){
 const q=search.value.trim().toLowerCase();let found=0;
 articles.forEach((a,i)=>{
   a.innerHTML=original[i];
   const match=!q||a.textContent.toLowerCase().includes(q);
   a.classList.toggle('search-hidden',!match);
   if(match){found++;if(q){
     const walker=document.createTreeWalker(a,NodeFilter.SHOW_TEXT);const nodes=[];
     while(walker.nextNode())nodes.push(walker.currentNode);
     nodes.forEach(node=>{
       if(node.parentElement.closest('script,style,button,label,input,mark'))return;
       const text=node.nodeValue,re=new RegExp(esc(q),'ig');if(!re.test(text))return;
       re.lastIndex=0;const frag=document.createDocumentFragment();let last=0,m;
       while((m=re.exec(text))){frag.append(document.createTextNode(text.slice(last,m.index)));const mark=document.createElement('mark');mark.textContent=m[0];frag.append(mark);last=m.index+m[0].length}
       frag.append(document.createTextNode(text.slice(last)));node.parentNode.replaceChild(frag,node);
     });
   }}
 });
 summary.style.display=q?'block':'none';summary.textContent=q?`搜索“${search.value.trim()}”：找到 ${found} 个相关章节`:'';
 noResults.style.display=q&&found===0?'block':'none';
 document.querySelector('.start-note').style.display=q?'none':'flex';
 document.querySelector('.book-intro').style.display=q?'none':'';
 document.querySelector('.page-footer').style.display=q?'none':'flex';
}
search.addEventListener('input',runSearch);
