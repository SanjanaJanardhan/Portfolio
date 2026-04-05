// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('section:not(#hero)').forEach(s => observer.observe(s));

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ── Terminal typewriter ──
// Edit the lines array below to change what the terminal displays.
// Types: 'cmd' (a command line), 'out' (output line), 'cursor' (blinking cursor at end)
const lines = [
  { type: 'cmd',  text: 'about.txt' },
  { type: 'out',  text: '<span class="t-label">Interests</span> <span class="t-val">Software Development &middot; Cloud Computing &middot; Networks & Systems</span>' },
  { type: 'out',  text: '<span class="t-label">Education</span> <span class="t-val">B.E. CS &middot; Cornell M.Eng.</span>' },
  { type: 'out',  text: '<span class="t-label">Research</span> <a class="t-link" href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4901478" target="_blank">Swarm Robotics &middot; SSRN Elsevier ↗</a>' },
  { type: 'out',  text: '<span class="t-label">Location &nbsp;</span> <span class="t-val">Bay Area</span>' },
  { type: 'cmd',  text: 'status.txt' },
  { type: 'out',  text: '<span class="t-green">Aspiring Software Engineer graduating in May 2026</span>' },
];

const terminalBody = document.getElementById('terminalBody');
let i = 0;

function renderLine(line) {
  const el = document.createElement('div');
  el.classList.add('t-line');
  if (line.type === 'cmd') {
    el.innerHTML = `<span class="t-prompt">❯</span><span class="t-cmd">${line.text}</span>`;
  } else if (line.type === 'out') {
    el.innerHTML = `<span class="t-out">${line.text}</span>`;
  } else {
    el.innerHTML = `<span class="t-prompt">❯</span><span class="t-cursor"></span>`;
  }
  terminalBody.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
}

function nextLine() {
  if (i >= lines.length) return;
  renderLine(lines[i]);
  i++;
  const delay = lines[i - 1].type === 'cmd' ? 500 : 160;
  if (i < lines.length) setTimeout(nextLine, delay);
}

setTimeout(nextLine, 700);
