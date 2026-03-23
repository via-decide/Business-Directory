let businesses = [];
let savedBusinesses = JSON.parse(localStorage.getItem('viadecide_saved')) || [];
let currentFilter = 'all';
let searchQuery = '';

async function init() {
  try {
    const response = await fetch('/businesses.json');
    businesses = await response.json();
    render();
  } catch (error) {
    console.error('Error loading businesses:', error);
  }
}

function toggleSave(name) {
  if (savedBusinesses.includes(name)) {
    savedBusinesses = savedBusinesses.filter(n => n !== name);
  } else {
    savedBusinesses.push(name);
  }
  localStorage.setItem('viadecide_saved', JSON.stringify(savedBusinesses));
  render(currentFilter);
}

function render(filter = currentFilter) {
  currentFilter = filter;
  const grid = document.getElementById('directoryGrid');
  grid.innerHTML = '';
  
  let filtered = businesses;
  
  if (filter === 'saved') {
    filtered = filtered.filter(b => savedBusinesses.includes(b.name));
  } else if (filter !== 'all') {
    filtered = filtered.filter(b => b.cat === filter);
  }
  
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(b => 
      b.name.toLowerCase().includes(q) || 
      b.type.toLowerCase().includes(q) || 
      b.loc.toLowerCase().includes(q)
    );
  }
  
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="padding: 32px; color: var(--muted); font-family: var(--mono);">No businesses found.</div>`;
    return;
  }
  
  filtered.forEach(b => {
    const isSaved = savedBusinesses.includes(b.name);
    grid.innerHTML += `
      <div class="biz-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div class="biz-cat">${b.type}</div>
          <button onclick="toggleSave('${b.name}')" style="background: none; border: none; color: ${isSaved ? 'var(--accent)' : 'var(--muted)'}; cursor: pointer; font-size: 18px;">
            ${isSaved ? '★' : '☆'}
          </button>
        </div>
        <div class="biz-name">${b.name}</div>
        <div class="biz-loc">📍 ${b.loc}</div>
        <div style="display: flex; gap: 10px;">
          <a href="#" class="biz-btn" onclick="openModal()">CLAIM LISTING</a>
          <a href="tel:${b.phone}" class="biz-btn" style="border-color: var(--accent2); color: var(--accent2);">CALL OWNER</a>
        </div>
      </div>
    `;
  });
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    render(e.target.dataset.cat);
  });
});

// Search Logic
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    render();
  });
}

// Modal Logic (ONDC style)
function openModal() { document.getElementById('claimModal').style.display = 'flex'; }
function closeModal() { document.getElementById('claimModal').style.display = 'none'; }
function verifyUTR() {
  const utr = document.getElementById('utrInput').value;
  if(utr.length === 12) {
    alert("Verification Pending: Our Gandhidham lead will contact you in 24 hours.");
    closeModal();
  } else {
    alert("Please enter a valid 12-digit UTR.");
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', init);
