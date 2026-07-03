document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // STICKY HEADER
    // ==========================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon if using FA
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Mobile Dropdown Accordion
    const navItemsWithDropdown = document.querySelectorAll('.nav-item');
    navItemsWithDropdown.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (link && dropdown) {
            link.addEventListener('click', function(e) {
                // Only act as accordion on mobile screens
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });

    // ==========================================
    // FLOATING WHATSAPP CHAT WIDGET
    // ==========================================
    const whatsappWidget = document.querySelector('.whatsapp-widget');
    const whatsappTrigger = document.querySelector('.whatsapp-trigger-btn');
    
    if (whatsappWidget && whatsappTrigger) {
        whatsappTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            whatsappWidget.classList.toggle('active');
        });

        // Close widget box when clicking outside
        document.addEventListener('click', function(e) {
            if (!whatsappWidget.contains(e.target)) {
                whatsappWidget.classList.remove('active');
            }
        });
    }

    // ==========================================
    // FAQS ACCORDION
    // ==========================================
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const header = card.querySelector('.faq-header');
        const body = card.querySelector('.faq-body');
        
        if (header && body) {
            header.addEventListener('click', function() {
                const isActive = card.classList.contains('active');
                
                // Close all other FAQs
                faqCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                        otherCard.querySelector('.faq-body').style.maxHeight = null;
                    }
                });
                
                // Toggle current FAQ
                if (isActive) {
                    card.classList.remove('active');
                    body.style.maxHeight = null;
                } else {
                    card.classList.add('active');
                    body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        }
    });

    // ==========================================
    // PRODUCT CATALOGUE (FILTERING, SEARCH & MODAL)
    // ==========================================
    const productsData = [
        // Health & Nutraceutical
        {
            id: 1,
            title: "100% Organic Moringa Oleifera Leaf Powder",
            category: "health",
            categoryLabel: "Health & Nutraceutical",
            price: "₹350.00",
            image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400",
            description: "Organic Moringa Oleifera Leaf Powder is derived from the dried leaves of the drumstick tree. It is rich in essential vitamins, minerals, antioxidants, and amino acids. A perfect daily dietary supplement to boost energy levels, improve immune support, and detoxify the body naturally.",
            tag: "organic"
        },
        {
            id: 2,
            title: "Organic Moringa Oleifera Capsule - 60 Caps",
            category: "health",
            categoryLabel: "Health & Nutraceutical",
            price: "₹450.00",
            image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400",
            description: "High-potency organic moringa leaves packed into easy-to-consume vegetable capsules. Contains 60 capsules per bottle. Supports joint health, digestion, cardiovascular health, and acts as a powerful source of natural calcium and iron.",
            tag: "best seller"
        },
        {
            id: 3,
            title: "Pure Tulsi Drops - Immunity Booster",
            category: "health",
            categoryLabel: "Health & Nutraceutical",
            price: "₹180.00",
            image: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=400",
            description: "A natural blend of five species of holy basil (Tulsi) extracts. Known for its strong anti-microbial, anti-inflammatory, and immune-strengthening benefits. Just 2-3 drops in water daily helps detoxify and fight off common coughs and cold.",
            tag: "natural"
        },
        {
            id: 4,
            title: "USA Formulated Whey Protein",
            category: "health",
            categoryLabel: "Health & Nutraceutical",
            price: "₹3,200.00",
            image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400",
            description: "Premium quality whey protein concentrate & isolate blend. Formulated in the USA to boost athletic performance, testosterone, and speed up muscle recovery. Rich in BCAA and essential amino acids. Sulphate & Gluten free.",
            tag: "new"
        },
        
        // Herbal Cosmetics
        {
            id: 5,
            title: "Onion Hair Shampoo Sulphate & Paraben Free - 300ml",
            category: "cosmetics",
            categoryLabel: "Herbal Cosmetics",
            price: "₹399.00",
            image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400",
            description: "Infused with Red Onion Extract, Black Seed Oil, and Vitamin E. Gently cleanses hair and scalp without drying, helps strengthen hair follicles, reduces hair fall, and encourages healthy growth. Free from harsh sulphates, parabens, and mineral oils.",
            tag: "new"
        },
        {
            id: 6,
            title: "Rutucharya Onion Hair Oil Multi-Purpose Growth - 100ml",
            category: "cosmetics",
            categoryLabel: "Herbal Cosmetics",
            price: "₹299.00",
            image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400",
            description: "A nourishing blend of Red Onion oil, Almond oil, Castor oil, Jojoba oil, and Coconut oil. Provides deep conditioning, reduces hair thinning, controls dandruff, and restores silky luster and volume to dry, damaged hair.",
            tag: "new"
        },
        {
            id: 7,
            title: "Protect & Repair Keratin Smoothing Shampoo - 250ml",
            category: "cosmetics",
            categoryLabel: "Herbal Cosmetics",
            price: "₹450.00",
            image: "https://images.unsplash.com/photo-1519735797-402baa75a794?auto=format&fit=crop&q=80&w=400",
            description: "Formulated with Hydrolyzed Keratin and nourishing oils to repair colored or heat-styled hair. Smoothens dry hair cuticles, locks in moisture, and eliminates frizz, leaving your hair looking naturally straight and shiny.",
            tag: "new"
        },
        {
            id: 8,
            title: "Keratin Conditioner with Keratin Proteins & Argan Oil - 250ml",
            category: "cosmetics",
            categoryLabel: "Herbal Cosmetics",
            price: "₹490.00",
            image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400",
            description: "Enriched with Morocco Argan Oil and Keratin proteins. Provides intense moisture therapy to dry, lifeless hair. Detangles, reduces hair breakage, and keeps locks smooth and bouncy all day long.",
            tag: "popular"
        },
        {
            id: 9,
            title: "Advanced Hair Growth Serum - 50ml",
            category: "cosmetics",
            categoryLabel: "Herbal Cosmetics",
            price: "₹650.00",
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400",
            description: "Lightweight, non-sticky hair vitalizer serum. Infused with Redensyl, Ginseng, and Onion stem cells. Re-activates hair stem cells to encourage denser, thicker hair growth while controlling split ends.",
            tag: "new"
        },
        {
            id: 10,
            title: "Mooch Beard & Hair Growth Natural Oil - 30ml",
            category: "cosmetics",
            categoryLabel: "Herbal Cosmetics",
            price: "₹250.00",
            image: "https://images.unsplash.com/photo-1626015713026-d837d172406f?auto=format&fit=crop&q=80&w=400",
            description: "Specially formulated for facial hair. A rich blend of Argan, Jojoba, and Cedarwood oils that nourishes beard roots, prevents beard-ruff, and promotes even, patchy-free beard growth.",
            tag: "new"
        },
        {
            id: 11,
            title: "Lemongrass Refreshing Soap - 125g",
            category: "cosmetics",
            categoryLabel: "Herbal Cosmetics",
            price: "₹95.00",
            image: "https://images.unsplash.com/photo-1607006342411-b013522e2947?auto=format&fit=crop&q=80&w=400",
            description: "Handcrafted natural herbal soap made with Pure Lemongrass Essential Oil. Cleanses away dirt and impurities, acts as an antiseptic, and refreshes body and mind with its uplifting citrus aroma.",
            tag: "organic"
        },
        
        // Sanitary Pads
        {
            id: 12,
            title: "Premium Sanitary Napkins with Anion Chip (Regular - 240mm)",
            category: "sanitary",
            categoryLabel: "Sanitary Pads",
            price: "₹180.00",
            image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400",
            description: "Features a patent Anion chip that provides antibacterial protection, odor control, and reduces menstrual discomfort. Made with premium, ultra-soft cotton surface, breathable bottom layer, and super absorbent polymers that keep you dry for up to 8 hours.",
            tag: "medical"
        },
        {
            id: 13,
            title: "Premium Sanitary Napkins with Anion Chip (Large - 280mm)",
            category: "sanitary",
            categoryLabel: "Sanitary Pads",
            price: "₹220.00",
            image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400",
            description: "Extra protection for heavy flow days. Includes an anion chip that prevents bacterial multiplication, controls rashes, and relieves irritation. Ultra-thin structure with side wings for leakage protection.",
            tag: "best seller"
        },
        
        // Surgical Products
        {
            id: 14,
            title: "Advanced Hand Sanitizer Gel - 500ml",
            category: "surgical",
            categoryLabel: "Surgical Products",
            price: "₹150.00",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
            description: "Kills 99.9% germs instantly without water. Contains 75% Iso-Propyl alcohol, enriched with organic Aloe Vera extracts and Vitamin E to prevent skin dryness. Ideal for clinical and household hygiene.",
            tag: "medical"
        },
        {
            id: 15,
            title: "Premium 3-Ply Disposable Surgical Face Masks - 50 Pcs",
            category: "surgical",
            categoryLabel: "Surgical Products",
            price: "₹250.00",
            image: "https://images.unsplash.com/photo-1586942593568-29361efcd571?auto=format&fit=crop&q=80&w=400",
            description: "High-filtration disposable masks with melt-blown filter layers. Offers excellent barrier protection against droplets, dust, and pollen. Fitted with comfortable soft ear loops and nose clip.",
            tag: "medical"
        },
        
        // Water Care
        {
            id: 16,
            title: "Amrut-jal Alkaline Water Ionizer (11-Plates)",
            category: "water",
            categoryLabel: "Water Care",
            price: "₹1,45,000.00",
            image: "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&q=80&w=400",
            description: "Premium state-of-the-art water ionizer machine equipped with 11 high-grade Platinum-coated Titanium plates. Features touch control panel, automatic cleaning cycle, and produces ionized alkaline water (pH 3.5 to 11.5) rich in antioxidants (Molecular Hydrogen) to neutralize acidic wastes in the body.",
            tag: "premium"
        }
    ];

    const productsContainer = document.getElementById('products-container');
    const categoryFilters = document.querySelectorAll('.category-filter-item');
    const searchInput = document.getElementById('search-products');
    const searchBtn = document.getElementById('search-btn');

    // Render Products
    function renderProducts(items) {
        if (!productsContainer) return;
        
        productsContainer.innerHTML = '';
        
        if (items.length === 0) {
            productsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--border-color);"></i>
                    <p>No products found matching your criteria.</p>
                </div>
            `;
            return;
        }
        
        items.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-category', product.category);
            
            const tagHTML = product.tag ? `<span class="product-tag">${product.tag}</span>` : '';
            
            card.innerHTML = `
                ${tagHTML}
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='https://placehold.co/400x400/2e524a/ffffff?text=${encodeURIComponent(product.title)}'">
                    <div class="product-actions-overlay">
                        <button class="product-action-btn view-details" data-id="${product.id}" title="Quick View">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                        <button class="product-action-btn buy-now" data-title="${product.title}" title="Inquire on WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.categoryLabel}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-card-footer">
                        <span class="product-price">${product.price}</span>
                        <button class="btn btn-primary product-buy-btn buy-now" data-title="${product.title}">
                            <i class="fa-brands fa-whatsapp"></i> Inquire
                        </button>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(card);
        });

        // Re-attach listeners after rendering
        attachProductEvents();
    }

    // Filter and Search logic
    let activeCategory = 'all';
    let searchQuery = '';

    function filterProducts() {
        let filtered = productsData;
        
        if (activeCategory !== 'all') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }
        
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
        }
        
        renderProducts(filtered);
    }

    // Attach filters
    if (categoryFilters.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                
                categoryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                activeCategory = filter.getAttribute('data-category');
                filterProducts();
            });
        });
    }

    // Attach search
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = searchInput.value;
            filterProducts();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchQuery = searchInput.value;
                filterProducts();
            }
        });
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            searchQuery = searchInput.value;
            filterProducts();
        });
    }

    // Render initial list (if container exists)
    if (productsContainer) {
        renderProducts(productsData);
    }

    // ==========================================
    // MODAL & INQUIRY ACTIONS
    // ==========================================
    const modalOverlay = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-product-details');

    function openModal(productId) {
        const product = productsData.find(p => p.id == productId);
        if (!product || !modalOverlay || !modalContent) return;

        modalContent.innerHTML = `
            <div class="modal-product-gallery">
                <img src="${product.image}" alt="${product.title}" class="modal-product-img" onerror="this.src='https://placehold.co/400x400/2e524a/ffffff?text=${encodeURIComponent(product.title)}'">
            </div>
            <div class="modal-product-info">
                <span class="modal-product-category">${product.categoryLabel}</span>
                <h2 class="modal-product-title">${product.title}</h2>
                <div class="modal-product-price">${product.price}</div>
                <p class="modal-product-description">${product.description}</p>
                
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                    <button class="btn btn-whatsapp buy-now" data-title="${product.title}" style="flex-grow: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight:600;">
                        <i class="fa-brands fa-whatsapp"></i> Chat to Order on WhatsApp
                    </button>
                </div>

                <div class="modal-product-meta">
                    <div><strong>Availability:</strong> In Stock (Available for Export & Wholesale)</div>
                    <div><strong>Manufacturer:</strong> Amrut International, Surat</div>
                    <div><strong>Category:</strong> ${product.categoryLabel}</div>
                </div>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll

        // Re-attach buy-now click listener inside modal
        const modalBuyBtn = modalContent.querySelector('.buy-now');
        if (modalBuyBtn) {
            modalBuyBtn.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                sendWhatsAppInquiry(title);
            });
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Attach quick view and inquiry listeners to product cards
    function attachProductEvents() {
        const viewBtns = document.querySelectorAll('.view-details');
        const buyBtns = document.querySelectorAll('.buy-now');

        viewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const id = this.getAttribute('data-id');
                openModal(id);
            });
        });

        buyBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.getAttribute('data-title');
                sendWhatsAppInquiry(title);
            });
        });
    }

    function sendWhatsAppInquiry(productTitle) {
        const phoneNumber = "9924231091"; // Team Sales number
        const text = `Hello Amrut International, I would like to inquire about: ${productTitle}. Please share more details and price. Thank you!`;
        const url = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }
});
