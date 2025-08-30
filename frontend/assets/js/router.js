// Basic hash router
export const routes = {
  '/dashboard': 'tpl-dashboard',
  '/projects': 'tpl-projects',
  '/boq': 'tpl-boq',
  '/evm': 'tpl-evm',
  '/procurement': 'tpl-procurement',
  '/qaqc': 'tpl-qaqc',
  '/hse': 'tpl-hse',
  '/settings': 'tpl-settings'
};

export function currentPath(){
  const h = location.hash || '#/dashboard';
  const p = h.replace('#','');
  return routes[p] ? p : '/dashboard';
}

export function renderTemplate(tplId){
  const tpl = document.getElementById(tplId);
  return tpl ? tpl.content.cloneNode(true) : document.createTextNode('Not Found');
}
