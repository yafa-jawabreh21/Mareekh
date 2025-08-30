import { fetchDashboard, fetchProjects, fetchBOQ, fetchProc } from './api.js';
import { routes, currentPath, renderTemplate } from './router.js';

const app = document.getElementById('app');
async function checkAPI(){
  const el = document.getElementById("api-status");
  if(!el) return;
  try{
    const res = await fetch((window.APP_CONFIG.API_BASE || "") + "/health");
    if(res.ok){
      el.textContent = "API ✅";
      el.className = "api-status ok";
    } else {
      el.textContent = "API ❌";
      el.className = "api-status err";
    }
  }catch(e){
    el.textContent = "API ❌";
    el.className = "api-status err";
  }
}


async function render(){
  const path = currentPath();
  const tplId = routes[path];
  app.innerHTML = '';
  app.appendChild(renderTemplate(tplId));
  try{
    if(path==='/dashboard'){
      const { evm, projects } = await fetchDashboard();
      document.getElementById('spi').textContent = evm.spi.toFixed(2);
      document.getElementById('cpi').textContent = evm.cpi.toFixed(2);
      document.getElementById('active-projects').textContent = projects.filter(p=>p.status==='active').length;
    }
    if(path==='/projects'){
      const data = await fetchProjects();
      const tb = document.querySelector('#projects-table tbody');
      tb.innerHTML = data.map(p=>`<tr><td>${p.name}</td><td>${p.owner}</td><td>${p.status}</td><td>${p.progress}%</td></tr>`).join('');
    }
    if(path==='/boq'){
      const data = await fetchBOQ();
      const tb = document.querySelector('#boq-table tbody');
      tb.innerHTML = data.map(i=>`<tr><td>${i.item}</td><td>${i.desc}</td><td>${i.qty}</td><td>${i.unit}</td><td>${i.rate}</td></tr>`).join('');
    }
    if(path==='/procurement'){
      const data = await fetchProc();
      const tb = document.querySelector('#proc-table tbody');
      tb.innerHTML = data.map(i=>`<tr><td>${i.material}</td><td>${i.needQty}</td><td>${i.needDate}</td><td>${i.status}</td></tr>`).join('');
    }
    if(path==='/settings'){
      const apiBase = (window.APP_CONFIG && window.APP_CONFIG.API_BASE) || '—';
      document.getElementById('api-base').textContent = apiBase;
    }
  }catch(e){
    console.error(e);
    const err = document.createElement('div');
    err.className = 'card';
    err.textContent = 'تعذّر تحميل البيانات من الـ API.';
    app.prepend(err);
  }
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => { render(); checkAPI(); });
