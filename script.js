// Mobile navigation + indicator state
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const mobileSwipeChips = Array.from(document.querySelectorAll('.mobile-swipe-chip'));
const navSectionIndicator = document.getElementById('navSectionIndicator');
const coarsePointerMedia = window.matchMedia ? window.matchMedia('(pointer: coarse)') : null;
const mobileContactAction = document.querySelector('[data-mobile-contact-action]');

let mobileActiveChipIndex = Math.max(mobileSwipeChips.findIndex(chip => chip.classList.contains('is-active')), 0);

function setMobileMenuState(nextState) {
    if (!mobileMenu) return;
    const shouldOpen = typeof nextState === 'boolean' ? nextState : !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', shouldOpen);
    document.body.classList.toggle('mobile-nav-open', shouldOpen);
    mobileMenu.setAttribute('aria-hidden', String(!shouldOpen));
    menuToggle?.setAttribute('aria-expanded', String(shouldOpen));
    menuToggle?.classList.toggle('is-active', shouldOpen);
}

function highlightMobileChip(targetId, { scrollIntoView = false } = {}) {
    if (!mobileSwipeChips.length || !targetId) return;
    const normalizedId = targetId.replace(/^#/, '');
    mobileSwipeChips.forEach((chip, index) => {
        const matches = chip.dataset.target === normalizedId;
        chip.classList.toggle('is-active', matches);
        if (matches) {
            mobileActiveChipIndex = index;
            if (scrollIntoView) {
                chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    });
}

function scrollToSection(targetId, { closeMenu = true } = {}) {
    if (!targetId) return;
    const normalizedId = targetId.replace(/^#/, '');
    const target = document.getElementById(normalizedId);
    if (!target) return;
    const offset = (topNav?.offsetHeight || 0) + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    highlightMobileChip(normalizedId, { scrollIntoView: true });
    if (closeMenu && mobileMenu?.classList.contains('is-open')) {
        setMobileMenuState(false);
    }
}

function initMobileNavigation() {
    menuToggle?.addEventListener('click', () => setMobileMenuState());
    mobileMenuClose?.addEventListener('click', () => setMobileMenuState(false));
    mobileMenuBackdrop?.addEventListener('click', () => setMobileMenuState(false));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            setMobileMenuState(false);
        }
    });
    mobileSwipeChips.forEach(chip => {
        chip.addEventListener('click', () => scrollToSection(chip.dataset.target));
    });
    mobileContactAction?.addEventListener('click', () => scrollToSection('contact'));
}

initMobileNavigation();

// Hide/Show top nav on scroll
let lastScrollTop = 0;
const topNav = document.getElementById('topNav');
const indicatorSections = [
    { id: 'about', label: '/ about' },
    { id: 'skills', label: '/ skills' },
    { id: 'education-experience', label: '/ edex' },
    { id: 'projects', label: '/ projects' },
    { id: 'awards-affiliations', label: '/ awards' },
    { id: 'contact', label: '/ contact' }
].map(section => {
    const el = document.getElementById(section.id);
    return el ? { ...section, element: el } : null;
}).filter(Boolean);

function updateNavIndicator() {
    // Disabled - nav indicator only updates on tab clicks, not scroll
    return;

    if (!navSectionIndicator) return;
    // Check if we're in tab mode (not home tab)
    const activeTabTrigger = document.querySelector('.tab-trigger.active');
    if (activeTabTrigger && activeTabTrigger.dataset.tab !== 'home') {
        // Don't override if we're on a specific tab
        return;
    }

    const referenceY = window.scrollY + window.innerHeight * 0.25;
    const headerOffset = topNav ? topNav.offsetHeight + 24 : 24;
    let activeLabel = '/ HOME';
    let activeSectionId = null;

    for (const section of indicatorSections) {
        const elementTop = section.element.offsetTop - headerOffset - 60;
        const elementBottom = elementTop + section.element.offsetHeight;
        if (referenceY >= elementTop && referenceY < elementBottom) {
            activeLabel = section.label;
            activeSectionId = section.id;
            break;
        }
        if (referenceY >= elementBottom) {
            activeLabel = section.label;
            activeSectionId = section.id;
        }
    }

    navSectionIndicator.textContent = activeLabel;
    highlightMobileChip(activeSectionId);
}

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scrolling down - hide nav
        //topNav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show nav
        //topNav.style.transform = 'translateY(0)';
    }
    lastScrollTop = Math.max(scrollTop, 0);
    updateNavIndicator();
});
window.addEventListener('resize', updateNavIndicator);
window.addEventListener('load', updateNavIndicator);

const resumePopover = document.getElementById('resumePopover');
const resumePopoverClose = document.getElementById('resumePopoverClose');
const projectsGrid = document.getElementById('projectsGrid');
const RESUME_STORAGE_KEY = null;

function initResumePopover() {
    if (!resumePopover) return;
    setTimeout(() => resumePopover.classList.add('is-visible'), 1200);
    resumePopoverClose?.addEventListener('click', () => {
        resumePopover.classList.remove('is-visible');
    });
}

// ====================
//  Skills Grid (3D cubes)
// ====================

const skillFaces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
const projectEntries = [
    {
        title: 'Stock Predictor Model',
        description: 'Trained model to forecast next 3 days of stock prices using 25.2-year historical window with PyTorch Transformer architecture, leveraging scikit-learn and 21 engineered quantitative indicators to achieve 62% directional accuracy.',
        image: 'assets/images/stock_chart_pixel.png',
        technologies: ['Python', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy'],
        links: [
            { label: 'GitHub', href: 'https://github.com/vittorio-centore' }
        ]
    },
    {
        title: 'LeetCode Recall Tracker',
        description: 'Programmed a spaced repetition LeetCode recall platform (React, Firebase, GraphQL) with a cache-first Firestore data system that reduced external API calls by 80% and increased problem retention by 3×.',
        image: 'assets/images/leetcode_streak_pixel.png',
        technologies: ['React', 'Firebase', 'GraphQL', 'JavaScript', 'Tailwind CSS'],
        links: [
            { label: 'GitHub', href: 'https://github.com/vittorio-centore' }
        ]
    },
    {
        title: 'Distributed MapReduce Framework',
        description: 'Implemented Python-based distributed MapReduce framework with a multi-threaded architecture, custom manager and worker classes, and network (TCP/UDP) communication, resulting in fault tolerant, efficient data processing.',
        image: 'assets/images/mapreduce_pixel.png',
        technologies: ['Python', 'TCP/UDP', 'Multi-threading', 'Distributed Systems'],
        links: [
            { label: 'Code available upon request', href: null }
        ]
    },
    {
        title: 'Habit Trader',
        description: 'Co-developed a startup platform for day traders to build sustainable habits via AI-driven feedback. Built tools for personalized constraints (max trades, loss limits) and real-time behavioral alerts. Engineered an AI trading coach that analyzes history and session patterns to provide natural-language insights. Implemented a simulated trading environment for risk-free practice and habit formation.',
        image: 'assets/images/habit_trader_logo_pixel.png',
        technologies: ['React', 'Python', 'FastAPI', 'OpenAI API', 'PostgreSQL', 'Docker'],
        links: [
            { label: 'Code available upon request', href: null }
        ]
    },
    {
        title: 'Search Engine',
        description: 'Developed a scalable distributed search engine using MapReduce to efficiently process large document collections into an optimized search index, then architected a Flask microservices layer with parallel query handling and intelligent result ranking that combines content relevance (TF-IDF) with page authority (PageRank) scoring. Essentially a simplified Google search implementation leveraging distributed systems, multi-threaded networking, and system-level process coordination.',
        image: 'assets/images/search_engine_pixel.png',
        technologies: ['Python', 'Flask', 'MapReduce', 'TF-IDF', 'PageRank', 'Multi-threading'],
        links: [
            { label: 'Code available upon request', href: null }
        ]
    }
];
const skillCategories = [
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'aidata', label: 'AI/Data' },
    { id: 'tools', label: 'Tools' }
];
const skillsData = [
    // Languages
    { name: 'Python', category: 'languages', href: 'https://www.python.org/', img: 'assets/images/python_logo.png' },
    { name: 'C++', category: 'languages', href: 'https://isocpp.org/', img: 'assets/images/cplus_logo.png' },
    { name: 'C', category: 'languages', href: 'https://en.cppreference.com/w/c', img: 'assets/images/c_logo.png' },
    { name: 'Java', category: 'languages', href: 'https://www.java.com/', img: 'assets/images/java_logo.png' },
    { name: 'JavaScript', category: 'languages', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', img: 'assets/images/javascript.png' },
    { name: 'TypeScript', category: 'languages', href: 'https://www.typescriptlang.org/', img: 'assets/images/typescript_logo.png' },
    { name: 'HTML', category: 'languages', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML', img: 'assets/images/html_logo.png' },
    { name: 'CSS', category: 'languages', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS', img: 'assets/images/css_logo.png' },

    // Frontend
    { name: 'React', category: 'frontend', href: 'https://react.dev/', img: 'assets/images/react_logo.png' },
    { name: 'Next.js', category: 'frontend', href: 'https://nextjs.org/', img: 'assets/images/nextjs_logo.png' },
    { name: 'Vue.js', category: 'frontend', href: 'https://vuejs.org/', img: 'assets/images/vue_logo.png' },
    { name: 'Tailwind CSS', category: 'frontend', href: 'https://tailwindcss.com/', img: 'assets/images/tailwind_logo.png' },
    { name: 'Bootstrap', category: 'frontend', href: 'https://getbootstrap.com/', img: 'assets/images/bootstrap_logo.png' },
    { name: 'GraphQL', category: 'frontend', href: 'https://graphql.org/', img: 'assets/images/graphql_logo.png' },

    // Backend
    { name: 'FastAPI', category: 'backend', href: 'https://fastapi.tiangolo.com/', img: 'assets/images/fastapi_logo.png' },
    { name: 'Flask', category: 'backend', href: 'https://flask.palletsprojects.com/', img: 'assets/images/flask_logo.png' },
    { name: 'OpenAI SDK', category: 'backend', href: 'https://platform.openai.com/', img: 'assets/images/openai_logo.png' },
    { name: 'Gemini API', category: 'backend', href: 'https://ai.google.dev/', img: 'assets/images/gemini_logo.png' },
    { name: 'AWS', category: 'backend', href: 'https://aws.amazon.com/', img: 'assets/images/aws_logo.png' },

    // Database
    { name: 'PostgreSQL', category: 'database', href: 'https://www.postgresql.org/', img: 'assets/images/sqlite_logo.png' },
    { name: 'Firebase', category: 'database', href: 'https://firebase.google.com/', img: 'assets/images/firebase_logo.png' },
    { name: 'Firestore', category: 'database', href: 'https://firebase.google.com/docs/firestore', img: 'assets/images/firebase_logo.png' },

    // AI/Data
    { name: 'PyTorch', category: 'aidata', href: 'https://pytorch.org/', img: 'assets/images/pytorch.png' },
    { name: 'TensorFlow', category: 'aidata', href: 'https://www.tensorflow.org/', img: 'assets/images/tensorflow.png' },
    { name: 'scikit-learn', category: 'aidata', href: 'https://scikit-learn.org/', img: 'assets/images/sklearn_logo.png' },
    { name: 'Pandas', category: 'aidata', href: 'https://pandas.pydata.org/', img: 'assets/images/pandas_logo.png' },

    // Tools
    { name: 'Git', category: 'tools', href: 'https://git-scm.com/', img: 'assets/images/git_logo.png' },
    { name: 'GitHub', category: 'tools', href: 'https://github.com/vittorio-centore', img: 'assets/images/github_logo.png' },
    { name: 'Docker', category: 'tools', href: 'https://www.docker.com/', img: 'assets/images/docker_logo.png' },
    { name: 'Claude Code', category: 'tools', href: 'https://claude.ai/', img: 'assets/images/claude_logo.png' },
    { name: 'Cursor', category: 'tools', href: 'https://cursor.sh/', img: 'assets/images/cursor_logo.png' }
];

let activeSkillCategoryIndex = 0;
let skillsGridEl;
let skillsTabsEl;
let skillsActiveLabelEl;
let skillsPrevBtn;
let skillsNextBtn;
let skillTabButtons = [];
let skillsWheelLock = 0;
let skillsAutoCycleTimer;
let skillPreviewLink = null;
let skillPreviewTimer = null;
let skillPreviewHandlersBound = false;

function isCoarsePointer() {
    return Boolean(coarsePointerMedia?.matches) || 'ontouchstart' in window;
}

function setSkillPreview(link) {
    if (!link) return;
    if (skillPreviewLink === link) {
        resetSkillPreviewTimer();
        return;
    }
    clearSkillPreview();
    skillPreviewLink = link;
    link.classList.add('is-preview');
    resetSkillPreviewTimer();
}

function resetSkillPreviewTimer() {
    if (skillPreviewTimer) {
        clearTimeout(skillPreviewTimer);
    }
    if (!skillPreviewLink) return;
    skillPreviewTimer = window.setTimeout(() => {
        clearSkillPreview();
    }, 5000);
}

function clearSkillPreview() {
    if (skillPreviewLink) {
        skillPreviewLink.classList.remove('is-preview');
        skillPreviewLink = null;
    }
    if (skillPreviewTimer) {
        clearTimeout(skillPreviewTimer);
        skillPreviewTimer = null;
    }
}

function handleSkillLinkPreview(event) {
    if (!isCoarsePointer()) return;
    const link = event.target.closest('.skill-link');
    if (!link) return;
    if (!link.classList.contains('is-preview')) {
        event.preventDefault();
        setSkillPreview(link);
    } else {
        clearSkillPreview();
    }
}

function handleOutsideSkillClick(event) {
    if (!skillPreviewLink) return;
    const clickedLink = event.target.closest('.skill-link');
    if (clickedLink === skillPreviewLink) return;
    clearSkillPreview();
}

function handleSkillScrollClear() {
    if (!skillPreviewLink || !isCoarsePointer()) return;
    clearSkillPreview();
}

function initSkillLinkPreviewHandling() {
    if (!skillsGridEl || skillPreviewHandlersBound) return;
    skillsGridEl.addEventListener('click', handleSkillLinkPreview);
    document.addEventListener('click', handleOutsideSkillClick);
    window.addEventListener('scroll', handleSkillScrollClear, { passive: true });
    skillPreviewHandlersBound = true;
}

if (coarsePointerMedia) {
    const pointerChangeHandler = event => {
        if (!event.matches) {
            clearSkillPreview();
        }
    };
    if (typeof coarsePointerMedia.addEventListener === 'function') {
        coarsePointerMedia.addEventListener('change', pointerChangeHandler);
    } else if (typeof coarsePointerMedia.addListener === 'function') {
        coarsePointerMedia.addListener(pointerChangeHandler);
    }
}

function initSkillsSection() {
    const gridContainer = document.getElementById('skillsGrid');
    if (!gridContainer) return;

    initSkillLinkPreviewHandling();

    // Define grid sizes for each category (bento box style)
    const gridSizes = ['large', 'medium', 'medium', 'small', 'small', 'small'];

    // Build bento grid
    skillCategories.forEach((category, index) => {
        const categorySkills = skillsData.filter(skill => skill.category === category.id);

        // Create grid card
        const card = document.createElement('div');
        card.className = `skills-bento-card ${gridSizes[index]}`;
        card.setAttribute('data-category', category.id);
        card.setAttribute('data-expanded', 'false');

        // Card header
        const header = document.createElement('div');
        header.className = 'skills-bento-header';
        header.innerHTML = `
            <h3 class="skills-bento-title">${category.label}</h3>
        `;

        // Add background preview of skills
        const preview = document.createElement('div');
        preview.className = 'skills-bento-preview';
        // Show 2 for smaller categories (5 or fewer items), 4 for larger categories
        const previewCount = categorySkills.length <= 5 ? 2 : 4;
        const previewSkills = categorySkills.slice(0, previewCount);
        previewSkills.forEach((skill, idx) => {
            const previewImg = document.createElement('img');
            previewImg.src = skill.img;
            previewImg.alt = '';
            previewImg.className = 'skills-preview-icon';
            previewImg.style.animationDelay = `${idx * 0.1} s`;
            preview.appendChild(previewImg);
        });

        // Add particles container for background animation
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-bg';
        particlesContainer.id = `particles-${category.id}`;

        card.appendChild(particlesContainer);
        card.appendChild(preview);

        // Card content (3D cube skills - hidden initially)
        const content = document.createElement('div');
        content.className = 'skills-bento-content';

        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6';

        categorySkills.forEach(skill => {
            const wrapper = document.createElement('div');
            wrapper.className = 'flex justify-center';

            const link = document.createElement('a');
            link.href = skill.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'skill-link';
            link.setAttribute('aria-label', skill.name);
            link.title = skill.name;

            const cube = document.createElement('div');
            cube.className = 'skill-cube';

            skillFaces.forEach(face => {
                const faceEl = document.createElement('div');
                faceEl.className = `skill-face ${face}`;

                const img = document.createElement('img');
                img.src = skill.img;
                img.alt = '';
                img.setAttribute('aria-hidden', 'true');

                faceEl.appendChild(img);
                cube.appendChild(faceEl);
            });

            const label = document.createElement('span');
            label.className = 'skill-label';
            label.textContent = skill.name;

            link.appendChild(cube);
            link.appendChild(label);
            wrapper.appendChild(link);
            skillsContainer.appendChild(wrapper);
        });

        content.appendChild(skillsContainer);

        // Click handler
        card.addEventListener('click', (e) => {
            // Don't collapse if clicking on a skill link
            if (e.target.closest('.skill-link')) return;

            const isExpanded = card.getAttribute('data-expanded') === 'true';

            // Collapse all cards
            document.querySelectorAll('.skills-bento-card').forEach(c => {
                c.setAttribute('data-expanded', 'false');
                c.classList.remove('expanded');
            });

            // Expand this card if it wasn't expanded
            if (!isExpanded) {
                card.setAttribute('data-expanded', 'true');
                card.classList.add('expanded');
            }
        });

        card.appendChild(header);
        card.appendChild(content);
        gridContainer.appendChild(card);
    });

    // Initialize particles after a short delay to ensure library is loaded
    setTimeout(() => {
        initializeCardParticles();
    }, 500);
}

function initializeCardParticles() {
    console.log('Initializing particles.js...');
    console.log('particlesJS available:', typeof window.particlesJS !== 'undefined');

    skillCategories.forEach((category) => {
        const particlesId = `particles-${category.id}`;
        const element = document.getElementById(particlesId);
        console.log(`Looking for: ${particlesId}, found: `, element);

        if (window.particlesJS && element) {
            console.log(`Initializing particles for ${particlesId}`);
            particlesJS(particlesId, {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#00bfa5', '#fac123', '#00796b']
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.35,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.3,
                            opacity_min: 0.15,
                            sync: false
                        }
                    },
                    size: {
                        value: 4,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1.5,
                            size_min: 1.5,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 120,
                        color: '#00bfa5',
                        opacity: 0.3,
                        width: 1.5
                    },
                    move: {
                        enable: true,
                        speed: 0.8,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'bounce',
                        bounce: true,
                        attract: {
                            enable: false
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 150,
                            line_linked: {
                                opacity: 0.6
                            }
                        }
                    }
                },
                retina_detect: true
            });
        }
    });
}

function getIconForCategory(index) {
    const icons = ['💻', '🛠️', '🎨', '⚙️', '💾', '🤖'];
    return icons[index];
}

function buildSkillsTabs() {
    skillsTabsEl.innerHTML = '';
    skillTabButtons = [];

    skillCategories.forEach((category, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'skills-tab';
        button.textContent = category.label;
        button.addEventListener('click', () => setSkillCategory(index));
        skillsTabsEl.appendChild(button);
        skillTabButtons.push(button);
    });
}

function renderSkillsGrid(categoryId) {
    if (!skillsGridEl) return;
    clearSkillPreview();
    skillsGridEl.innerHTML = '';

    const fragment = document.createDocumentFragment();
    skillsData
        .filter(skill => skill.category === categoryId)
        .forEach(skill => {
            const wrapper = document.createElement('div');
            wrapper.className = 'flex justify-center';

            const link = document.createElement('a');
            link.href = skill.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'skill-link';
            link.setAttribute('aria-label', skill.name);
            link.title = skill.name;

            const cube = document.createElement('div');
            cube.className = 'skill-cube';

            skillFaces.forEach(face => {
                const faceEl = document.createElement('div');
                faceEl.className = `skill - face ${face} `;

                const img = document.createElement('img');
                img.src = skill.img;
                img.alt = '';
                img.setAttribute('aria-hidden', 'true');

                faceEl.appendChild(img);
                cube.appendChild(faceEl);
            });

            const label = document.createElement('span');
            label.className = 'skill-label';
            label.textContent = skill.name;

            link.appendChild(cube);
            link.appendChild(label);
            wrapper.appendChild(link);
            fragment.appendChild(wrapper);
        });

    skillsGridEl.appendChild(fragment);
}

function setSkillCategory(nextIndex, { animate = true } = {}) {
    if (!skillCategories.length) return;
    const normalizedIndex = (nextIndex + skillCategories.length) % skillCategories.length;
    if (normalizedIndex === activeSkillCategoryIndex) return;

    const updateCategory = () => {
        activeSkillCategoryIndex = normalizedIndex;
        renderSkillsGrid(skillCategories[activeSkillCategoryIndex].id);
        updateSkillsNav();
    };

    if (!animate || !skillsGridEl) {
        updateCategory();
        return;
    }

    skillsGridEl.classList.add('skills-grid--exit');
    setTimeout(() => {
        updateCategory();
        skillsGridEl.classList.remove('skills-grid--exit');
        skillsGridEl.classList.add('skills-grid--enter');
        setTimeout(() => skillsGridEl.classList.remove('skills-grid--enter'), 400);
    }, 200);
}

function cycleSkillCategory(direction) {
    setSkillCategory(activeSkillCategoryIndex + direction);
}

function updateSkillsNav() {
    if (skillsActiveLabelEl) {
        skillsActiveLabelEl.textContent = skillCategories[activeSkillCategoryIndex].label;
    }
    skillTabButtons.forEach((btn, index) => {
        btn.classList.toggle('is-active', index === activeSkillCategoryIndex);
    });
}

function handleSkillsWheel(event) {
    if (!skillsGridEl) return;
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    if (Math.abs(event.deltaX) < 15) return;
    const now = Date.now();
    if (now - skillsWheelLock < 600) return;
    event.preventDefault();
    cycleSkillCategory(event.deltaX > 0 ? 1 : -1);
    skillsWheelLock = now;
}

function restartSkillsAutoCycle() {
    if (skillsAutoCycleTimer) clearInterval(skillsAutoCycleTimer);
    skillsAutoCycleTimer = setInterval(() => cycleSkillCategory(1), 20000);
}

function buildProjectsGrid() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'projects-showcase';

    // 1. Sidebar Column (VS Code Style)
    const sidebar = document.createElement('div');
    sidebar.className = 'project-sidebar';

    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'sidebar-header';
    sidebarHeader.innerHTML = '<span>Explorer</span><span>...</span>';
    sidebar.appendChild(sidebarHeader);

    const sidebarContent = document.createElement('div');
    sidebarContent.className = 'sidebar-content';

    // Group projects by category
    const categories = {
        'AI & ML': {
            icon: 'icon-python',
            projects: [projectEntries[0], projectEntries[3]] // Stock Predictor, Habit Trader
        },
        'Systems': {
            icon: 'icon-cpp',
            projects: [projectEntries[2], projectEntries[4]] // MapReduce, Search Engine
        },
        'Web': {
            icon: 'icon-react',
            projects: [projectEntries[1]] // LeetCode Tracker
        }
    };

    // Root Folder
    const rootFolder = document.createElement('div');
    rootFolder.className = 'sidebar-item folder icon-folder';
    rootFolder.textContent = 'PROJECTS';
    sidebarContent.appendChild(rootFolder);

    Object.entries(categories).forEach(([catName, catData]) => {
        const catFolder = document.createElement('div');
        catFolder.className = 'sidebar-item folder icon-folder';
        catFolder.style.paddingLeft = '24px';
        catFolder.textContent = catName;
        sidebarContent.appendChild(catFolder);

        catData.projects.forEach(project => {
            if (!project) return;
            const item = document.createElement('div');
            item.className = `sidebar-item file ${catData.icon}`;
            item.style.paddingLeft = '40px';
            item.textContent = project.title + (catData.icon === 'icon-python' ? '.py' : catData.icon === 'icon-react' ? '.jsx' : '.cpp');

            item.addEventListener('click', () => {
                document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                updateProjectMonitor(project);
            });

            // Set first project as active
            if (project === projectEntries[0]) {
                item.classList.add('active');
            }

            sidebarContent.appendChild(item);
        });
    });

    sidebar.appendChild(sidebarContent);

    // 2. Display Column
    const display = document.createElement('div');
    display.className = 'project-display';

    const monitor = document.createElement('div');
    monitor.className = 'retro-monitor';

    const screen = document.createElement('div');
    screen.className = 'monitor-screen';

    const content = document.createElement('div');
    content.className = 'monitor-content';
    content.id = 'projectMonitorContent';

    screen.appendChild(content);
    monitor.appendChild(screen);
    display.appendChild(monitor);

    container.appendChild(sidebar);
    container.appendChild(display);
    projectsGrid.appendChild(container);

    // Initial Load
    if (projectEntries.length > 0) {
        updateProjectMonitor(projectEntries[0]);
    }
}

function updateProjectMonitor(project) {
    const content = document.getElementById('projectMonitorContent');
    if (!content) return;

    // Generate technology badges
    const techBadges = project.technologies
        ? project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')
        : '';

    content.style.opacity = '0';
    setTimeout(() => {
        content.innerHTML = `
            <div class="monitor-header">
                <h2 class="monitor-title">${project.title}</h2>
                <div class="monitor-controls">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                </div>
            </div>
            <div class="monitor-body">
                <div class="project-visual">
                    <img src="${project.image}" alt="${project.title}" class="project-main-img">
                </div>
                <div class="project-info">
                    <p>${project.description}</p>
                    ${techBadges ? `<div class="project-tech"><span class="tech-label">Technologies:</span><div class="tech-badges">${techBadges}</div></div>` : ''}
                    <div class="project-links">
                        ${project.links.map(link => link.href ? `<a href="${link.href}" target="_blank" class="monitor-link">[ ${link.label} ]</a>` : `<span class="monitor-link" style="cursor: default; opacity: 0.8;">[ ${link.label} ]</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        content.style.opacity = '1';
    }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    initSkillsSection();
    buildProjectsGrid();
    initResumePopover();

    // Handle navigation links with data-goto-tab attribute
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-goto-tab]');
        if (link) {
            e.preventDefault();
            const tabName = link.getAttribute('data-goto-tab');
            const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
            if (tabButton) {
                tabButton.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

(() => {
    // ====================
    //  Breakout Game Vars
    // ====================

    const startBtn = document.getElementById('startBtn');
    const resetLeaderboardBtn = document.getElementById('resetLeaderboardBtn');
    const gameCanvas = document.getElementById('gameCanvas');
    const startScreen = document.getElementById('start-screen');
    const leaderboardEl = document.getElementById('leaderboard');

    const isCoarsePointer = coarsePointerMedia?.matches;

    if (!startBtn || !resetLeaderboardBtn || !gameCanvas || !startScreen || !leaderboardEl || isCoarsePointer) {
        return;
    }

    window.addEventListener('load', loadLeaderboardFromServer);

    resetLeaderboardBtn.addEventListener('click', resetLeaderboard);
    const ctx = gameCanvas.getContext('2d');

    let score = 0;
    let lives = 2;

    // Shared leaderboard array loaded from server
    let leaderboard = [];

    // Game states
    let isGameOver = false;
    let isPaused = false;
    let isNotStarted = true;  // Ball not launched yet, attached to paddle
    let isLaunched = false;   // Ball launched after space press

    // Game settings
    const paddleHeight = 20;
    const paddleWidth = 75;
    let paddleX = (gameCanvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    const paddleSpeed = 7;

    const ballRadius = 10;
    let x = gameCanvas.width / 2;
    let y = gameCanvas.height - paddleHeight - 10 - 50;
    let dx = 2;
    let dy = -2;

    const courses = [
        "Deep Learning", "Machine Learning", "Embedded Systems", "Reinforcem. Learning",
        "Signals & Systems", "Software Design", "Logic Design", "Circuits",
        "Controls", "Probability, Stats & DS", "Computer Arch.", "CAD"
    ];
    let brickRowCount = 3;
    let brickColumnCount = 4;
    let brickWidth = 100;
    let brickHeight = 40;
    let brickPadding = 15;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 15;

    // More saturated purple colors
    const brickColors = [
        "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3",
        "#800080", "#8B008B", "#4B0082", "#7B68EE",
        "#6A5ACD", "#9370DB", "#5D3FD3", "#663399"
    ];

    gameCanvas.style.backgroundColor = "#333";

    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            const courseIndex = c * brickRowCount + r;
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1,
                course: courses[courseIndex],
                color: brickColors[courseIndex % brickColors.length] || "#8A2BE2"
            };
        }
    }

    const paddleImg = new Image();
    paddleImg.src = "assets/images/paddle.png"; // Provide your own paddle image

    // ===============================
    //  Leaderboard Server Integration
    // ===============================

    const SERVER_URL = "https://portfolio-xoe6.onrender.com";

    // Load from server
    async function loadLeaderboardFromServer() {
        try {
            const res = await fetch(`${SERVER_URL} /api/leaderboard`);
            leaderboard = await res.json(); // array of {initials, score}
            updateLeaderboard();
        } catch (err) {
            console.error("Failed to load leaderboard from server:", err);
            leaderboard = [];
            updateLeaderboard();
        }
    }

    // Save a new score
    async function saveScoreToServer(initials, newScore) {
        try {
            const res = await fetch(`${SERVER_URL} /api/leaderboard`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ initials, score: newScore })
            });
            const data = await res.json();
            if (data.leaderboard) {
                leaderboard = data.leaderboard;
                updateLeaderboard();
            }
        } catch (err) {
            console.error("Failed to save score:", err);
        }
    }

    // Reset on server
    async function resetLeaderboardOnServer(passkey) {
        try {
            const res = await fetch(`${SERVER_URL} /api/leaderboard / reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ passkey })
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
            } else {
                // success
                alert("reset the leaderboard");
                leaderboard = [];
                updateLeaderboard();
            }
        } catch (err) {
            console.error("Failed to reset leaderboard:", err);
        }
    }

    // ====================================================
    //  Generic Drawing Functions for the Breakout Elements
    // ====================================================

    function drawRoundedRect(x, y, width, height, radius, fillColor) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.closePath();
    }

    function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth) {
                ctx.fillText(currentLine, x, y);
                currentLine = words[i] + ' ';
                y += lineHeight;
            } else {
                currentLine = testLine;
            }
        }
        // Draw whatever remains
        ctx.fillText(currentLine, x, y);
    }

    function drawBricks() {
        ctx.save();
        ctx.font = "14px Arial";
        ctx.textBaseline = "top";

        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const b = bricks[c][r];
                if (b.status === 1) {
                    let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    b.x = brickX;
                    b.y = brickY;

                    // Draw the brick
                    drawRoundedRect(brickX, brickY, brickWidth, brickHeight, 5, b.color);

                    // Text color
                    ctx.fillStyle = "#fff";
                    drawWrappedText(
                        ctx,
                        b.course,
                        brickX + 8,
                        brickY + 8,
                        brickWidth - 16,
                        16
                    );
                }
            }
        }
        ctx.restore();
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#e6e6fa";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        if (paddleImg.complete && paddleImg.width > 0) {
            ctx.drawImage(paddleImg, paddleX, gameCanvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
        } else {
            drawRoundedRect(paddleX, gameCanvas.height - paddleHeight - 10, paddleWidth, paddleHeight, 5, "#9370DB");
        }
    }

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("Score: " + score, 8, 24);
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("Lives: " + lives, gameCanvas.width - 85, 24);
    }

    // =======================
    //  Collision & Game Logic
    // =======================

    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if (b.status === 1) {
                    if (
                        x + ballRadius > b.x &&
                        x - ballRadius < b.x + brickWidth &&
                        y + ballRadius > b.y &&
                        y - ballRadius < b.y + brickHeight
                    ) {
                        // Collided
                        b.status = 0;
                        score++;

                        // Figure out which side we hit
                        let ballCenterNextX = x + dx;
                        let ballCenterNextY = y + dy;
                        const distLeft = Math.abs(ballCenterNextX - b.x);
                        const distRight = Math.abs(ballCenterNextX - (b.x + brickWidth));
                        const distTop = Math.abs(ballCenterNextY - b.y);
                        const distBottom = Math.abs(ballCenterNextY - (b.y + brickHeight));
                        const minDist = Math.min(distLeft, distRight, distTop, distBottom);

                        if (minDist === distLeft) {
                            dx = -Math.abs(dx);
                            x = b.x - ballRadius - 1;
                        } else if (minDist === distRight) {
                            dx = Math.abs(dx);
                            x = b.x + brickWidth + ballRadius + 1;
                        } else if (minDist === distTop) {
                            dy = -Math.abs(dy);
                            y = b.y - ballRadius - 1;
                        } else {
                            dy = Math.abs(dy);
                            y = b.y + brickHeight + ballRadius + 1;
                        }

                        // Win check
                        if (score === brickRowCount * brickColumnCount) {
                            endGame(true);
                        }
                    }
                }
            }
        }
    }

    function endGame(won) {
        isGameOver = true;
        cancelAnimationFrame(animationId);

        let initials = prompt(
            won ? "You won! Enter your initials:" : "Game Over! Enter your initials:"
        );
        if (!initials) initials = "???";
        initials = initials.substring(0, 4);

        // Instead of localStorage, send to server
        saveScoreToServer(initials, score);

        gameCanvas.style.display = 'none';
        startScreen.style.display = 'inline-block';
    }

    function updateLeaderboard() {
        // Clear existing
        leaderboardEl.innerHTML = "";

        // Up to 20 entries
        // We'll arrange them in a 5-column grid
        const ul = document.createElement('ul');
        ul.style.fontSize = "10px";
        ul.style.listStyleType = 'none';
        ul.style.margin = '0';
        ul.style.padding = '0';
        ul.style.display = 'grid';
        ul.style.gridTemplateColumns = 'repeat(5, auto)';
        ul.style.gap = '20px';
        ul.style.alignItems = 'start';

        for (let i = 0; i < leaderboard.length; i++) {
            const entry = leaderboard[i];
            const li = document.createElement('li');
            li.textContent = `${entry.initials}: ${entry.score} `;
            ul.appendChild(li);
        }

        leaderboardEl.appendChild(ul);
    }

    function resetLeaderboard() {
        let passkey = prompt("if you know, you know:");
        if (!passkey) return;

        // Instead of localStorage, reset on server
        resetLeaderboardOnServer(passkey);
    }

    // =======================
    //  Paddle & Ball Movement
    // =======================

    // Key listeners
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", pauseHandler, false);

    // Prevent spacebar from scrolling the page
    window.addEventListener('keydown', function (e) {
        if (e.code === 'Space') {
            e.preventDefault();
        }
    }, false);

    function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }

    function pauseHandler(e) {
        // Press Esc to pause
        if (e.key === "Escape" && isLaunched && !isPaused && !isGameOver) {
            isPaused = true;
        }
        // Spacebar to resume if paused
        else if (e.key === " " && isPaused && !isGameOver) {
            isPaused = false;
        }
        // Spacebar to launch if not started
        else if (e.key === " " && isNotStarted && !isGameOver) {
            isNotStarted = false;
            isLaunched = true;
        }
    }

    let animationId;
    function draw() {
        if (isGameOver) return;

        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Ball stuck to paddle if not launched
        if (isNotStarted) {
            x = paddleX + paddleWidth / 2;
            y = gameCanvas.height - paddleHeight - 10 - ballRadius;
        }

        drawBricks();
        drawPaddle();
        drawScore();
        drawLives();

        if (!isPaused) {
            drawBall();
            collisionDetection();

            // If launched, update ball position
            if (isLaunched) {
                // Side walls
                if (x + dx > gameCanvas.width - ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                // Top
                if (y + dy < ballRadius) {
                    dy = -dy;
                }
                // Bottom area -> check paddle
                else if (y + dy > gameCanvas.height - ballRadius - paddleHeight - 10) {
                    if (x > paddleX && x < paddleX + paddleWidth) {
                        // More dynamic angles
                        const paddleCenter = paddleX + paddleWidth / 2;
                        const distFromCenter = x - paddleCenter;
                        dx = distFromCenter * 0.15;  // tweak factor

                        // Flip vertical dir
                        dy = -Math.abs(dy);

                        // Speed up ball
                        dx *= 1.1;
                        dy *= 1.3;
                    } else {
                        lives--;
                        if (!lives) {
                            endGame(false);
                            return;
                        } else {
                            // Reset ball above paddle but keep game going
                            x = gameCanvas.width / 2;
                            y = gameCanvas.height - paddleHeight - 10 - 50;
                            dx = 2;
                            dy = -2;
                            isNotStarted = true;
                            isLaunched = false;
                        }
                    }
                }

                // Move paddle
                if (rightPressed && paddleX < gameCanvas.width - paddleWidth) {
                    paddleX += paddleSpeed;
                } else if (leftPressed && paddleX > 0) {
                    paddleX -= paddleSpeed;
                }

                if (!isNotStarted) {
                    x += dx;
                    y += dy;
                } else {
                    // Ball stuck
                    x = paddleX + paddleWidth / 2;
                    y = gameCanvas.height - paddleHeight - 10 - ballRadius;
                }

            } else {
                // Not launched yet
                if (rightPressed && paddleX < gameCanvas.width - paddleWidth) {
                    paddleX += paddleSpeed;
                } else if (leftPressed && paddleX > 0) {
                    paddleX -= paddleSpeed;
                }
                x = paddleX + paddleWidth / 2;
                y = gameCanvas.height - paddleHeight - 10 - ballRadius;
                drawBall();
            }

        } else {
            // Game is paused -> draw pause symbol
            const pauseWidth = 10;
            const pauseHeight = 40;
            const gap = 10;
            const centerX = gameCanvas.width / 2;
            const centerY = gameCanvas.height / 2;

            drawRoundedRect(centerX - pauseWidth - gap / 2, centerY - pauseHeight / 2, pauseWidth, pauseHeight, 3, "#ffffff");
            drawRoundedRect(centerX + gap / 2, centerY - pauseHeight / 2, pauseWidth, pauseHeight, 3, "#ffffff");
        }

        animationId = requestAnimationFrame(draw);
    }

    function startGame() {
        score = 0;
        lives = 2;
        x = gameCanvas.width / 2;
        y = gameCanvas.height - paddleHeight - 10 - 50;
        dx = 2;
        dy = -2;

        isGameOver = false;
        isPaused = false;
        isNotStarted = true;
        isLaunched = false;

        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 1;
            }
        }

        startScreen.style.display = 'none';
        gameCanvas.style.display = 'block';
        draw();
    }

    startBtn.addEventListener('click', startGame);
})();

// ====================
//  Holographic Cards Logic
// ====================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.holo-card');

    cards.forEach(card => {
        const inner = card.querySelector('.holo-card-inner');

        // Tilt Effect
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(pointer: coarse)').matches) return; // Disable on touch devices

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (max 15deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Invert Y axis for natural tilt
            const rotateY = ((x - centerX) / centerX) * 10;

            // Apply transform to inner card
            // Note: We don't rotate the card itself to avoid messing up the layout flow, 
            // but we rotate the inner container.
            // However, since we have a flip effect on click which uses rotateY(180deg),
            // we need to be careful not to conflict.
            // Strategy: The flip is on .holo-card-inner via class.
            // The tilt should be applied to the .holo-card container or a wrapper?
            // Actually, if we tilt the container, the flip (which is on inner) will rotate WITH the tilt.
            // Let's apply tilt to the card element itself, but keep it subtle.

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Update Shine
            const shine = card.querySelector('.holo-shine');
            if (shine) {
                const moveX = ((x / rect.width) * 100);
                const moveY = ((y / rect.height) * 100);
                shine.style.backgroundPosition = `${moveX}% ${moveY}% `;
                shine.style.opacity = '1';
            }
        });

        // Reset on leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const shine = card.querySelector('.holo-shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });

        // Flip on click
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });
});

// ====================
//  Typed.js Initialization
// ====================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('typed-output')) {
        new Typed('#typed-output', {
            strings: [
                'Full-Stack Development',
                'Backend Systems',
                'System Optimization',
                'Distributed Systems'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
            smartBackspace: true,
        });
    }
});
