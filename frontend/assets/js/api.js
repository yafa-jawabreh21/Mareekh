// Simple API wrapper
const API_BASE = "https://mareekh-api.onrender.com/api";

async function apiGet(path){
  const res = await fetch(`${API_BASE}${path}`);
  if(!res.ok){ throw new Error(`API ${path} failed: ${res.status}`); }
  return await res.json();
}

export async function fetchDashboard(){
  const evm = await apiGet('/evm');
  const projects = await apiGet('/projects');
  return { evm, projects };
}
export async function fetchProjects(){ return apiGet('/projects'); }
export async function fetchBOQ(){ return apiGet('/boq'); }
export async function fetchProc(){ return apiGet('/procurements'); }
