// Theme Manager
const THEME_KEY = 'portfolio-theme';
const htmlElement = document.documentElement;

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'night'; // Default to Night
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
}

function updateThemeUI(theme) {
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = theme;
    }
}

function handleThemeChange(event) {
    const newTheme = event.target.value;
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', handleThemeChange);
    }

    // ScrollSpy for Nav Links
    const sections = document.querySelectorAll("main > div[id], section[id]");
    const navLinks = document.querySelectorAll("a.btn-circle, a.link-hover");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("dock-active", "text-primary");
            if (current && link.getAttribute("href").includes(current)) {
                if(link.classList.contains("link-hover")) link.classList.add("dock-active"); // For dock
                if(link.classList.contains("btn-circle")) link.classList.add("text-primary"); // For desktop
            }
        });
    });
});

// Tech Stack Interactive Cards
const techData = [
  { name: 'Linux / Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'C# / .NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Gemini AI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Flutter / Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' }
];

let cards = [];
let currentIndex = 0;
let matchCount = 0;
let isGridView = false;

function initTechStack() {
    isGridView = false;
    const container = document.getElementById('cardContainer');
    const wrapper = document.getElementById('techContainerWrapper');
    if (!container) return;

    // Reset container styles to swipe mode
    container.className = 'absolute inset-0 flex justify-center items-center z-20 transition-all duration-500';
    wrapper.classList.remove('overflow-y-auto');
    wrapper.classList.add('overflow-hidden');

    const swipeText = document.getElementById('swipeText');
    if (swipeText) swipeText.style.display = 'block';

    container.innerHTML = '';
    cards = [];
    currentIndex = techData.length - 1;
    matchCount = 0;

    document.getElementById('endState').classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
    document.getElementById('endState').classList.add('opacity-0', 'pointer-events-none', 'scale-90');

    techData.forEach((tech, index) => {
        const card = document.createElement('div');
        card.className = 'absolute bg-white/10 backdrop-blur-3xl border border-white/20 text-white rounded-3xl grid place-content-center cursor-grab shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-transform duration-300';
        card.style.zIndex = index + 10;
        card.style.width = '300px';
        card.style.height = '300px';
        card.style.borderRadius = '1.5rem';

        const randomRot = index === techData.length - 1 ? 0 : (Math.random() * 20 - 10);
        card.style.transform = `rotate(${randomRot}deg)`;
        card.dataset.baseRot = randomRot;

        card.innerHTML = `
            <div class="flex flex-col h-full w-full gap-8 items-center justify-center p-6 pointer-events-none">
                <img src="${tech.icon}" alt="${tech.name}" class="w-36 h-36 object-contain drop-shadow-2xl">
                <div class="px-5 py-1.5 bg-[#2E3D35] text-white rounded-full text-sm font-bold shadow-inner">${tech.name}</div>
            </div>
        `;

        container.appendChild(card);
        cards.push(card);
    });

    makeCardInteractive(cards[currentIndex]);
}

function showAllGrid() {
    isGridView = true;
    const container = document.getElementById('cardContainer');
    const wrapper = document.getElementById('techContainerWrapper');

    document.getElementById('endState').classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
    document.getElementById('endState').classList.add('opacity-0', 'pointer-events-none', 'scale-90');

    const swipeText = document.getElementById('swipeText');
    if (swipeText) swipeText.style.display = 'none';

    const applyGrid = () => {
        container.innerHTML = ''; // clear
        container.className = 'absolute inset-0 z-20 flex flex-wrap justify-center content-start gap-4 p-8 transition-all duration-500';
        wrapper.classList.remove('overflow-hidden');
        wrapper.classList.add('overflow-y-auto');

        techData.forEach((tech) => {
            const card = document.createElement('div');
            // Remove absolute positioning, add flex scaling
            card.className = 'bg-white/10 backdrop-blur-3xl border border-white/20 text-white rounded-3xl grid place-content-center shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:scale-105 transition-transform duration-300';
            card.style.width = '160px';
            card.style.height = '200px';
            card.style.borderRadius = '1.5rem';

            card.innerHTML = `
                <div class="flex flex-col h-full w-full gap-4 items-center justify-center p-4 pointer-events-none">
                    <img src="${tech.icon}" alt="${tech.name}" class="w-20 h-20 object-contain drop-shadow-2xl">
                    <div class="px-4 py-1 bg-[#2E3D35] text-white rounded-full text-xs font-bold shadow-inner">${tech.name}</div>
                </div>
            `;

            container.appendChild(card);
        });
    };

    if (document.startViewTransition) {
        document.startViewTransition(() => applyGrid());
    } else {
        applyGrid();
    }
}

function toggleTechView() {
    if (isGridView) {
        if (document.startViewTransition) {
            document.startViewTransition(() => initTechStack());
        } else {
            initTechStack();
        }
    } else {
        showAllGrid();
    }
}

function makeCardInteractive(card) {
    if (!card) {
        showEndState();
        return;
    }

    let startX = 0, startY = 0, currentX = 0, currentY = 0;
    let isDragging = false;

    card.classList.remove('transition-transform', 'duration-300'); // Remove animation during drag
    card.classList.add('cursor-grabbing');

    const pointerDown = (e) => {
        if (isGridView) return;
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
        card.style.transition = 'none';
    };

    const pointerMove = (e) => {
        if (!isDragging || isGridView) return;

        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

        currentX = clientX - startX;
        currentY = clientY - startY;

        const rotate = currentX * 0.1;
        card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;

        const glowLeft = document.getElementById('glowLeft');
        const glowRight = document.getElementById('glowRight');

        if (currentX > 50) {
            glowRight.style.opacity = Math.min((currentX / 150) + 0.3, 1);
            glowLeft.style.opacity = 0.3;
        } else if (currentX < -50) {
            glowLeft.style.opacity = Math.min((Math.abs(currentX) / 150) + 0.3, 1);
            glowRight.style.opacity = 0.3;
        } else {
            glowLeft.style.opacity = 0.3;
            glowRight.style.opacity = 0.3;
        }
    };

    const pointerUp = () => {
        if (!isDragging || isGridView) return;
        isDragging = false;

        document.getElementById('glowLeft').style.opacity = 0.3;
        document.getElementById('glowRight').style.opacity = 0.3;

        card.classList.add('transition-transform', 'duration-300');
        card.classList.remove('cursor-grabbing');

        const threshold = 100;
        if (currentX > threshold) {
            matchCount++;
            swipeOut(card, 1);
        } else if (currentX < -threshold) {
            swipeOut(card, -1);
        } else {
            card.style.transform = `rotate(${card.dataset.baseRot}deg)`;
        }
    };

    card.addEventListener('mousedown', pointerDown);
    card.addEventListener('touchstart', pointerDown, {passive: true});

    document.addEventListener('mousemove', pointerMove);
    document.addEventListener('touchmove', pointerMove, {passive: false});

    document.addEventListener('mouseup', pointerUp);
    document.addEventListener('touchend', pointerUp);

    card._cleanup = () => {
        document.removeEventListener('mousemove', pointerMove);
        document.removeEventListener('touchmove', pointerMove);
        document.removeEventListener('mouseup', pointerUp);
        document.removeEventListener('touchend', pointerUp);
    };
}

function swipeOut(card, direction) {
    if(card._cleanup) card._cleanup();

    card.style.transform = `translate(${direction * window.innerWidth}px, -100px) rotate(${direction * 45}deg)`;
    card.style.opacity = 0;

    setTimeout(() => {
        card.remove();
    }, 300);

    currentIndex--;
    makeCardInteractive(cards[currentIndex]);
}

function showEndState() {
    if (isGridView) return;
    const endState = document.getElementById('endState');
    const percentage = Math.round((matchCount / techData.length) * 100);

    document.getElementById('matchPercentage').innerText = percentage + '%';

    endState.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
    endState.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
}

document.addEventListener('DOMContentLoaded', () => {
    initTechStack();

    document.getElementById('restartTechBtn')?.addEventListener('click', () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => initTechStack());
        } else {
            initTechStack();
        }
    });

    document.getElementById('restartTechTopBtn')?.addEventListener('click', () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => initTechStack());
        } else {
            initTechStack();
        }
    });

    document.getElementById('showAllTechBtn')?.addEventListener('click', toggleTechView);
});

// Hero Glow Parallax Effect
document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('hero-glow');
    if (!glow) return;

    // Calculate mouse position relative to the center of the screen
    const x = (e.clientX - window.innerWidth / 2) * 0.4;
    const y = (e.clientY - window.innerHeight / 2) * 0.4;

    glow.style.transform = `translate(${x}px, ${y}px)`;
});

// 3D Tilt Effect Logic
document.querySelectorAll('.tilt-card').forEach(card => {
    const glare = card.querySelector('.glare');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
        const rotateY = ((x - centerX) / centerX) * 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
            glare.style.opacity = '1';
            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, transparent 60%)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        if (glare) {
            glare.style.opacity = '0';
        }
    });
});
