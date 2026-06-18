// Portfolio Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupMobileMenu();
    setupTimelineScrollAnimation();
    setupTerminal();
    setupMetricsCounter();
});

// Setup Dark/Light mode theme toggling
function setupTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');

    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = 'light_mode';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.textContent = 'dark_mode';
    }

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = 'dark_mode';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = 'light_mode';
        }
    });
}

// Mobile Menu toggling logic
function setupMobileMenu() {
    const burgerBtn = document.getElementById('menu-burger');
    const closeBtn = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
        mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
        mobileMenu.classList.add('opacity-100');
    };

    const closeMenu = () => {
        mobileMenu.classList.add('pointer-events-none', 'opacity-0');
        mobileMenu.classList.remove('opacity-100');
    };

    burgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// Fade in elements or highlight timeline elements when in viewport
function setupTimelineScrollAnimation() {
    const cards = document.querySelectorAll('.timeline-card');
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // Prepare card initial states for transition
        card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-500', 'ease-out');
        observer.observe(card);
    });
}

// Setup Interactive Web Terminal
function setupTerminal() {
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    const termHistory = document.getElementById('terminal-history');
    if (!termInput || !termBody || !termHistory) return;

    // Focus input on terminal body click
    termBody.addEventListener('click', () => {
        termInput.focus();
    });

    const commands = {
        help: () => `Comandos disponibles:<br>
  <strong class="text-teal-400">about</strong>      - Resumen profesional<br>
  <strong class="text-teal-400">skills</strong>     - Tecnologías principales<br>
  <strong class="text-teal-400">experience</strong> - Últimos roles<br>
  <strong class="text-teal-400">neofetch</strong>   - Info del sistema SRE<br>
  <strong class="text-teal-400">contact</strong>    - Datos de contacto<br>
  <strong class="text-teal-400">clear</strong>      - Limpiar pantalla`,
        
        about: () => `Soy Juan José Molina, Lead Systems & DevOps Engineer con +7 años de experiencia.<br>
Especializado en infraestructuras altamente disponibles, pipelines CI/CD robustos e Infraestructura como Código (IaC).`,
        
        skills: () => `Stack tecnológico:<br>
  - <strong class="text-cyan-400">DevOps:</strong> Kubernetes, Terraform, Cilium, Docker, Podman, GitOps<br>
  - <strong class="text-cyan-400">Desarrollo:</strong> Go, Python, PostgreSQL, Redis, APIs REST/gRPC<br>
  - <strong class="text-cyan-400">Sistemas:</strong> Linux (Debian/CentOS), eBPF, Clouds (Azure/GCP)`,
        
        experience: () => `Mi Trayectoria Profesional:<br>
  - <strong class="text-cyan-400">2025-Pres:</strong> Consultor DevOps/SRE & Trainer Freelance (Remoto)<br>
  - <strong class="text-cyan-400">2021-2024:</strong> Senior DevOps & SRE (IaC modular, Terraform & Telemetría)<br>
  - <strong class="text-cyan-400">2021:</strong> Linux SysAdmin (Migración Cloud & Kubernetes en Barcelona)<br>
  - <strong class="text-cyan-400">2017-2021:</strong> Junior SysAdmin (Virtualización & Linux en Oxford, UK)`,
        
        contact: () => `Contacto:<br>
  - <strong class="text-cyan-400">Web:</strong> Usa el formulario de contacto en la web<br>
  - <strong class="text-cyan-400">GitHub:</strong> github.com/jmolina-dev<br>
  - <strong class="text-cyan-400">LinkedIn:</strong> linkedin.com/in/jmolinaperez`,
        
        neofetch: () => `<div class="flex gap-4 mt-1 select-none">
    <div class="text-teal-500 font-bold leading-none text-[10px] whitespace-pre">    __  __
   |  \/  |
   | \  / |
   | |\/| |
   | |  | |
   |_|  |_|</div>
    <div class="space-y-0.5 text-[11px]">
        <div><strong class="text-cyan-400">Juan José Molina</strong></div>
        <div class="text-slate-600">-------------------</div>
        <div><strong class="text-teal-400">OS:</strong> Linux/Kubernetes</div>
        <div><strong class="text-teal-400">Uptime:</strong> 7+ Years SRE</div>
        <div><strong class="text-teal-400">Shell:</strong> Bash/Go/IaC</div>
    </div>
</div>`
    };

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawInput = termInput.value;
            const cmd = rawInput.trim().toLowerCase();
            termInput.value = '';

            // Render command typed
            const cmdLine = document.createElement('div');
            cmdLine.innerHTML = `<span class="text-teal-400">guest@jmolina.dev:~$</span> ${escapeHTML(rawInput)}`;
            termHistory.appendChild(cmdLine);

            if (cmd) {
                if (cmd === 'clear') {
                    termHistory.innerHTML = '';
                } else if (commands[cmd]) {
                    const output = document.createElement('div');
                    output.className = 'text-slate-300 leading-relaxed pl-2';
                    output.innerHTML = commands[cmd]();
                    termHistory.appendChild(output);
                } else {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'text-red-400 pl-2';
                    errorLine.innerHTML = `Comando no encontrado: "${escapeHTML(cmd)}". Escribe <strong class="text-teal-400">help</strong> para ayuda.`;
                    termHistory.appendChild(errorLine);
                }
            }

            // Scroll to bottom
            setTimeout(() => {
                termBody.scrollTop = termBody.scrollHeight;
            }, 10);
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

// Animate metrics counter on scroll
function setupMetricsCounter() {
    const counters = document.querySelectorAll('[data-target]');
    if (counters.length === 0) return;

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetVal = parseFloat(target.getAttribute('data-target'));
                const isFloat = targetVal % 1 !== 0;
                const duration = 1500; // 1.5s animation
                const startTime = performance.now();

                function updateCounter(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentVal = progress * targetVal;
                    const suffix = (targetVal === 7) ? '+' : '%';
                    
                    if (isFloat) {
                        target.textContent = currentVal.toFixed(1) + suffix;
                    } else {
                        target.textContent = Math.floor(currentVal) + suffix;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (isFloat) {
                            target.textContent = targetVal.toFixed(1) + suffix;
                        } else {
                            target.textContent = targetVal + suffix;
                        }
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}
