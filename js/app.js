




const STORAGE_KEY = 'taskflow_tasks';

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}


function createTask(title, desc, priority, dueDate) {
  return {
    id: Date.now(),
    title: title.trim(),
    desc: desc.trim(),
    priority,   
    dueDate,
    done: false,
    archived: false,
    createdAt: new Date().toISOString()
  };
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  
  return d.toLocaleDateString('en-AU', { day: '2-digit', month: 'numeric', year: 'numeric' });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr + 'T00:00:00') < new Date(new Date().toDateString());
}

function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function showToast(msg, duration = 2500) {
  const container = document.querySelector('.toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}
function openModal(modalId, overlayId) {
  document.getElementById(modalId)?.classList.add('open');
  document.getElementById(overlayId)?.classList.add('open');
}

function closeModal(modalId, overlayId) {
  document.getElementById(modalId)?.classList.remove('open');
  document.getElementById(overlayId)?.classList.remove('open');
}

function getSessionUser() {
  return JSON.parse(localStorage.getItem('tf_user') || 'null');
}

function roleLabel(role) {
  if (role === 'educator' || role === 'teacher') return 'Teacher';
  if (role === 'student') return 'Student';
  return 'Member';
}

function applyUserChrome(options = {}) {
  const user = getSessionUser();
  if (!user) return null;
  const nameEl = document.querySelector(options.nameSelector || '.user-name');
  const roleEl = document.querySelector(options.roleSelector || '.user-role');
  const avatarEl = document.querySelector(options.avatarSelector || '.avatar');
  const chipEl = document.getElementById(options.roleChipId || 'btn-role-chip');

  if (nameEl) nameEl.textContent = user.name || 'User';
  if (roleEl) roleEl.textContent = roleLabel(user.role);
  if (avatarEl) {
    const initials = (user.name || 'U').split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
    avatarEl.textContent = initials || 'U';
  }
  if (chipEl) {
    chipEl.style.display = '';
    chipEl.textContent = roleLabel(user.role);
  }
  return user;
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.overlay.open').forEach(o => o.classList.remove('open'));
  }
});
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.innerHTML.includes(page)) item.classList.add('active');
  });
})();
