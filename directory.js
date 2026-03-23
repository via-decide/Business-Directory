let businesses = [];
let savedBusinesses = JSON.parse(localStorage.getItem('kutchmap_saved')) || [];
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
  localStorage.setItem('kutchmap_saved', JSON.stringify(savedBusinesses));
  render(currentFilter);
}

function getCategoryStyles(cat) {
  switch(cat) {
    case 'salon': return { cls: 'dc-s', emoji: '✂️', bg: 'rgba(192,132,252,0.1)', color: '#c084fc', border: 'rgba(192,132,252,0.2)' };
    case 'finance': return { cls: 'dc-c', emoji: '📊', bg: 'rgba(74,222,128,0.1)', color: 'var(--green)', border: 'rgba(74,222,128,0.2)' };
    case 'creative': return { cls: 'dc-p', emoji: '📸', bg: 'rgba(244,114,182,0.1)', color: '#f472b6', border: 'rgba(244,114,182,0.2)' };
    case 'it': return { cls: 'dc-e', emoji: '💻', bg: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: 'rgba(56,189,248,0.2)' };
    case 'accommodation': return { cls: 'dc-h', emoji: '🏠', bg: 'rgba(232,80,58,0.1)', color: 'var(--accent2)', border: 'rgba(232,80,58,0.2)' };
    default: return { cls: 'dc-r', emoji: '🛍️', bg: 'rgba(245,166,35,0.1)', color: 'var(--accent)', border: 'rgba(245,166,35,0.2)' };
  }
}

function render(filter = currentFilter) {
  currentFilter = filter;
  const grid = document.getElementById('directoryGrid');
  if (!grid) return;
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
    grid.innerHTML = `<div style="padding: 32px; color: var(--muted); font-family: var(--mono); grid-column: 1 / -1; text-align: center; border: 1px dashed var(--border);">No businesses found matching your criteria.</div>`;
    return;
  }

  filtered.forEach(b => {
    const isSaved = savedBusinesses.includes(b.name);
    const style = getCategoryStyles(b.cat);
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.name + ' ' + b.loc)}`;

    grid.innerHTML += `
      <div class="dir-card ${style.cls}">
        <div class="dir-card-top">
          <div class="dir-avatar" style="background:${style.bg};border:1px solid ${style.border}">${style.emoji}</div>
          <div class="dir-card-meta">
            <button onclick="toggleSave('${b.name}')" style="background: none; border: none; color: ${isSaved ? style.color : 'var(--muted)'}; cursor: none; font-size: 20px; z-index: 10; position: relative; transition: 0.2s;">
              ${isSaved ? '★' : '☆'}
            </button>
          </div>
        </div>
        <div class="dir-card-name">${b.name}</div>
        <div class="dir-card-cat">${b.type}</div>
        <div class="dir-card-loc"><span>📍</span> ${b.loc}</div>
        <div class="dir-card-footer" style="margin-top: 20px; flex-wrap: wrap;">
          <button onclick="openModal(event)" class="dir-tag" style="background:${style.bg};color:${style.color}; border: 1px solid ${style.border}; cursor: none; transition: 0.2s;">CLAIM LISTING</button>
          <div style="display: flex; gap: 8px;">
            <a href="tel:${b.phone}" class="dir-website-btn" style="border-color: ${style.color}; color: ${style.color};">Call</a>
            <a href="${mapLink}" target="_blank" class="dir-website-btn">Directions ↗</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = 'var(--surface)';
      b.style.color = 'var(--muted)';
    });
    e.target.classList.add('active');
    e.target.style.background = 'var(--accent)';
    e.target.style.color = '#000';
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

// Modal Logic
function openModal(e) {
  if(e) e.preventDefault();
  document.getElementById('claimModal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('claimModal').style.display = 'none';
}
function verifyClaim() {
  const input = document.getElementById('claimInput').value.trim();
  if(input.length === 12) {
    alert("Thanks! Our Kutch team will verify your UTR and reach out to you shortly to set up your listing.");
    closeModal();
  } else {
    alert("Please enter a valid 12-digit UTR code.");
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', init);
