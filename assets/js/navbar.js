function initNavbar() {
    const desktopNavbar = document.querySelector('.navbar-custom');
    if (!desktopNavbar) return;

    // 1. Update the hamburger button layout to match style.css expectations
    const toggler = desktopNavbar.querySelector('.navbar-toggler');
    if (toggler) {
        // Clear default Bootstrap toggler icon and replace with custom 3-span hamburger
        toggler.innerHTML = `
            <div class="nav-hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        // Remove Bootstrap's default data-bs-toggle and target to prevent conflict
        toggler.removeAttribute('data-bs-toggle');
        toggler.removeAttribute('data-bs-target');
    }

    // 2. Extract links from desktop navbar
    const navLinks = desktopNavbar.querySelectorAll('.nav-links .nav-link');
    let drawerLinksHtml = '';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        const isActive = link.classList.contains('active');
        const activeClass = isActive ? 'active' : '';
        
        drawerLinksHtml += `
            <li>
                <a href="${href}" class="${activeClass}">
                    ${text}
                    <i class="bi bi-chevron-right mob-nav-arrow"></i>
                </a>
            </li>
        `;
    });

    // 3. Create Overlay and Drawer DOM elements dynamically
    const overlay = document.createElement('div');
    overlay.className = 'mob-nav-overlay';
    overlay.id = 'mobNavOverlay';
    document.body.appendChild(overlay);

    const drawer = document.createElement('div');
    drawer.className = 'mob-nav-drawer';
    drawer.id = 'mobNavDrawer';
    
    // Find the logo image source from desktop navbar
    const logoImg = desktopNavbar.querySelector('.brand-logo img');
    const logoSrc = logoImg ? logoImg.getAttribute('src') : 'assets/images/Digitalkslogo.webp';
    
    drawer.innerHTML = `
        <div class="mob-nav-header">
            <a class="brand-logo" href="index.html">
                <img src="${logoSrc}" alt="Digitalks Techno logo">
            </a>
            <button class="mob-nav-close" id="mobNavCloseBtn" aria-label="Close menu">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <ul class="mob-nav-links">
            ${drawerLinksHtml}
        </ul>
        <div class="mob-nav-footer">
            <a href="contact.html" class="btn-maroon d-flex">Get Quote</a>
        </div>
    `;
    document.body.appendChild(drawer);

    // 4. Set up Event Listeners for mobile interaction
    const closeBtn = drawer.querySelector('#mobNavCloseBtn');

    function openMenu() {
        if (toggler) toggler.classList.add('is-open');
        drawer.classList.add('open');
        overlay.classList.add('show');
        // Force reflow for transitions to register
        void overlay.offsetWidth;
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling of background content
    }

    function closeMenu() {
        if (toggler) toggler.classList.remove('is-open');
        drawer.classList.remove('open');
        overlay.classList.remove('visible');
        // Wait for overlay opacity transition to finish before hiding it (display: none)
        setTimeout(() => {
            if (!overlay.classList.contains('visible')) {
                overlay.classList.remove('show');
            }
        }, 380);
        document.body.style.overflow = ''; // Enable scroll
    }

    if (toggler) {
        toggler.addEventListener('click', function(e) {
            e.stopPropagation();
            if (drawer.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
