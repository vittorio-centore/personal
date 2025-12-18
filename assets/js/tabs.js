// Tab switching functionality with URL routing
// This script should handle all tab navigation and URL updates

(function () {
    'use strict';

    // Valid tab names
    const validTabs = ['home', 'projects', 'university', 'about', 'contact'];

    // Function to switch to a specific tab
    function switchToTab(tabName, updateUrl = true) {
        console.log('switchToTab called:', tabName, 'updateUrl:', updateUrl);

        if (!validTabs.includes(tabName)) {
            tabName = 'home';
        }

        const tabTriggers = document.querySelectorAll('.tab-trigger');
        const tabPages = document.querySelectorAll('.tab-page');

        // Remove active from all triggers
        tabTriggers.forEach(t => {
            t.classList.remove('active');
        });

        // Add active to matching triggers
        tabTriggers.forEach(t => {
            if (t.dataset.tab === tabName) {
                t.classList.add('active');
            }
        });

        // Hide all tab pages
        tabPages.forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });

        // Show target tab page
        const targetPage = document.getElementById(tabName + '-tab');
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');
        }

        // Update nav section indicator
        const navIndicator = document.getElementById('navSectionIndicator');
        if (navIndicator) {
            if (tabName === 'home') {
                navIndicator.textContent = '';
            } else {
                navIndicator.textContent = '/ ' + tabName.toUpperCase();
            }
        }

        // Update URL without page reload
        if (updateUrl) {
            const newPath = tabName === 'home' ? '/' : '/' + tabName;
            console.log('Updating URL to:', newPath);
            window.history.pushState({ tab: tabName }, '', newPath);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
            mobileMenu.classList.remove('mobile-menu--open');
        }
    }

    // Get initial tab from URL path or query parameter
    function getTabFromPath() {
        // First check for ?tab= query parameter (from redirects)
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        if (tabParam && validTabs.includes(tabParam.toLowerCase())) {
            // Clean the URL by removing the query parameter
            const cleanUrl = tabParam.toLowerCase() === 'home' ? '/' : '/' + tabParam.toLowerCase();
            window.history.replaceState({ tab: tabParam.toLowerCase() }, '', cleanUrl);
            return tabParam.toLowerCase();
        }

        const path = window.location.pathname;
        // Remove leading slash and any trailing slashes
        let tabName = path.replace(/^\/|\/$/g, '').toLowerCase();

        // Handle index.html
        if (tabName === '' || tabName === 'index.html') {
            return 'home';
        }

        // Handle .html extensions
        tabName = tabName.replace('.html', '');

        return validTabs.includes(tabName) ? tabName : 'home';
    }

    // Initialize when DOM is ready
    function init() {
        console.log('tabs.js initialized');

        const tabTriggers = document.querySelectorAll('.tab-trigger');
        console.log('Found', tabTriggers.length, 'tab triggers');

        // Handle click on tab triggers - use capturing phase to run first
        document.addEventListener('click', function (e) {
            const trigger = e.target.closest('.tab-trigger');
            if (trigger && trigger.dataset.tab) {
                e.preventDefault();
                e.stopPropagation();
                const targetTab = trigger.dataset.tab;
                console.log('Tab trigger clicked:', targetTab);
                switchToTab(targetTab);
            }
        }, true); // Use capturing phase

        // Handle browser back/forward buttons
        window.addEventListener('popstate', function (e) {
            const tabName = e.state?.tab || getTabFromPath();
            switchToTab(tabName, false);
        });

        // Initialize correct tab on page load
        const initialTab = getTabFromPath();
        console.log('Initial tab from URL:', initialTab);
        switchToTab(initialTab, false);
    }

    // Run init on DOMContentLoaded or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
