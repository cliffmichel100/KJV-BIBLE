let curBook="Genesis", curChap=1;
function init(){
  const bs=document.getElementById('bookSelect'), nav=document.getElementById('booksNav');
  Object.keys(BIBLE).forEach(b=>{
    let o=document.createElement('option');o.value=b;o.textContent=b;bs.appendChild(o);
    let btn=document.createElement('button');btn.textContent=b.slice(0,4);btn.onclick=()=>loadBook(b);nav.appendChild(btn);
  });
  bs.onchange=()=>loadBook(bs.value);
  loadBook(curBook); renderTabs();
}
function loadBook(b){
  curBook=b; document.getElementById('bookSelect').value=b;
  let chSel=document.getElementById('chapterSelect'); chSel.innerHTML="";
  let total=Object.keys(BIBLE[b]).length;
  for(let i=1;i<=total;i++){let o=document.createElement('option');o.value=i;o.textContent="Chapter "+i;chSel.appendChild(o);}
  chSel.onchange=()=>{curChap=parseInt(chSel.value); renderChap();};
  curChap=1; chSel.value=1; renderChap();
}
function renderChap(){
  let data=BIBLE[curBook][curChap];
  let html=`<h2 class="ref-title">${curBook} ${curChap}</h2><div style="font-size:12px;margin-bottom:10px;color:#6b4d2a">KJV | Cross-Ref | Study Notes on Right Panel</div>`;
  for(let v in data){ html+=`<div class="verse"><span class="vnum">${v}</span>${data[v]}</div>`; }
  html+=`<div style="margin-top:20px;border-top:1px solid #c9a46a;padding-top:10px"><button onclick="prevChap()">‹ Previous</button> <button onclick="nextChap()">Next ›</button></div>`;
  document.getElementById('bibleView').innerHTML=html;
  let commKey=`${curBook} ${curChap}`;
  let comm=COMMENTARY[commKey]||COMMENTARY["General"];
  document.getElementById('commentary').innerHTML=`<h3>Study Commentary: ${commKey}</h3>`+comm.map(c=>`<div class="comment-item"><b>${c.ref||''}</b> ${c.text}</div>`).join('')+`<h4>Thousands of notes embedded</h4><p>All notes are original Baptist exposition - free from Calvinism and Arminianism. Salvation is by grace through faith, whosoever will may come (Rev 22:17).</p>`;
}
function renderTabs(){
  document.getElementById('glossary').innerHTML=`<h3>Glossary & Dictionary - 2500+ Terms</h3>`+GLOSSARY.map(g=>`<p><b>${g.term}:</b> ${g.def}</p>`).join('');
  document.getElementById('maps').innerHTML=`<h3>Realistic Bible Maps (Public Domain)</h3>`+MAPS.map(m=>`<div style="margin:18px 0"><h4>${m.name}</h4><p>${m.desc}</p><img src="${m.img}" style="width:100%;border:1px solid #999"></div>`).join('');
  document.getElementById('lessons').innerHTML=`<h3>Baptist Lessons & Theology Complete</h3>`+LESSONS.map(l=>`<div style="margin:16px 0;border-left:4px solid #c9a46a;padding-left:10px"><h4>${l.title}</h4><p>${l.content}</p><small>${l.verses}</small></div>`).join('');
  document.getElementById('indexes').innerHTML=`<h3>Indexes & Chain References</h3>`+INDEXES.map(i=>`<p><b>${i.topic}:</b> ${i.refs.join(', ')}</p>`).join('');
}
function showTab(id){document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.getElementById(id).classList.add('active');event.target.classList.add('active');}
function prevChap(){if(curChap>1){curChap--;document.getElementById('chapterSelect').value=curChap;renderChap();}}
function nextChap(){if(curChap<Object.keys(BIBLE[curBook]).length){curChap++;document.getElementById('chapterSelect').value=curChap;renderChap();}}
function doSearch(){
  let q=document.getElementById('searchInput').value.toLowerCase();
  if(!q) return;
  // Search book chapter:verse
  let m=q.match(/(\w+)\s+(\d+):(\d+)/);
  if(m){let b=Object.keys(BIBLE).find(x=>x.toLowerCase().startsWith(m[1].toLowerCase())); if(b){loadBook(b);curChap=parseInt(m[2]);document.getElementById('chapterSelect').value=curChap;renderChap(); setTimeout(()=>{let el=document.querySelector(`#bibleView`); el.scrollTop=0;},100); return;}}
  for(let b in BIBLE){for(let ch in BIBLE[b]){for(let v in BIBLE[b][ch]){if(BIBLE[b][ch][v].toLowerCase().includes(q)){loadBook(b);curChap=parseInt(ch);document.getElementById('chapterSelect').value=curChap;renderChap();return;}}}}
  alert("Not found");
}
init();
