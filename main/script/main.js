document.addEventListener('DOMContentLoaded', function () {
    // تعيين اسم الكاتب
    const writerNameElement = document.querySelector('.LoadingTxt');
    if (writerNameElement) {
        writerNameElement.textContent = siteTexts.LoadingTxt;
    }

    // تعيين معلومات الملف الشخصي
    const profileInfoH1 = document.querySelector('.profile-info writerName');
    const profileInfoP = document.querySelector('.profile-info writerBio');
    if (profileInfoH1) profileInfoH1.textContent = siteTexts.profileInfo.writerName;
    if (profileInfoP) profileInfoP.textContent = siteTexts.profileInfo.writerBio;

    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks.length >= 4) {
        function formatSocialLink(username, socialSite) {
            if (username.includes('http') || username.includes('www.')) {
                return username.startsWith('http') ? username : 'https://' + username;
            }
            else {
                const baseUrls = {
                    facebook: 'https://www.facebook.com/',
                    twitter: 'https://twitter.com/',
                    instagram: 'https://www.instagram.com/',
                    youtube: 'https://www.youtube.com/'
                };
                return baseUrls[socialSite] + username;
            }
        }

        // تعيين الروابط مع التنسيق التلقائي
        socialLinks[0].href = formatSocialLink(siteTexts.socialLinks.facebook, 'facebook');
        socialLinks[1].href = formatSocialLink(siteTexts.socialLinks.twitter, 'twitter');
        socialLinks[2].href = formatSocialLink(siteTexts.socialLinks.instagram, 'instagram');
        socialLinks[3].href = formatSocialLink(siteTexts.socialLinks.youtube, 'youtube');
    }

    // تعيين عناصر التنقل
    const navTabs = document.querySelectorAll('.nav-tab');
    if (navTabs.length >= 2) {
        navTabs[0].textContent = siteTexts.navTabs.stories;
        navTabs[1].textContent = siteTexts.navTabs.favorites;
    }

    // تعيين عناوين الأقسام
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length >= 2) {
        sectionTitles[0].textContent = siteTexts.sectionTitles.stories;
        sectionTitles[1].textContent = siteTexts.sectionTitles.favorites;
    }

    // تعيين عنوان الفصول في المودال
    const chaptersTitle = document.querySelector('.chapters-title');
    if (chaptersTitle) {
        chaptersTitle.textContent = siteTexts.chaptersTitle;
    }
});

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    // منع التمرير أثناء التحميل
    document.body.classList.add('loading');

    // عرض شاشة التحميل
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            // إعادة التمرير بعد انتهاء التحميل
            document.body.classList.remove('loading');
            initApp();
        }, 500);
    }, 1500);
});

function initApp() {
    // تحميل الإعدادات من localStorage
    loadSettings();
    // تهيئة الأحداث
    setupEventListeners();
    // عرض القصص
    renderStories();
    // عرض القصص المفضلة
    renderFavorites();
    // تحديد التبويب النشط عند التحميل
    setActiveTabOnLoad();
    // إنشاء العناصر العائمة
    createFloatingElements();
}

function createFloatingElements() {
    const colors = ['rgba(78, 84, 200, 0.1)', 'rgba(249, 168, 38, 0.1)', 'rgba(143, 148, 251, 0.1)'];

    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';

        const size = Math.random() * 100 + 50;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];

        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = color;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        element.style.opacity = Math.random() * 0.3 + 0.1;

        document.body.appendChild(element);
    }
}

function loadSettings() {
    // تحميل وضع الألوان
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }

    // تحميل القصص المفضلة
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
}

function setActiveTabOnLoad() {
    const activeTab = localStorage.getItem('activeTab') || 'stories';
    const tabElement = document.querySelector(`.nav-tab[data-tab="${activeTab}"]`);

    if (tabElement) {
        // إزالة النشط من جميع التبويبات
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

        // إضافة النشط للتبويب المطلوب
        tabElement.classList.add('active');

        // إظهار القسم المناسب وإخفاء الآخر
        document.getElementById('stories-section').style.display = activeTab === 'stories' ? 'block' : 'none';
        document.getElementById('favorites-section').style.display = activeTab === 'favorites' ? 'block' : 'none';
    }
}

function setupEventListeners() {
    // تبديل وضع الألوان
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // تبديل بين التبويبات
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;

            // حفظ التبويب النشط في localStorage
            localStorage.setItem('activeTab', tabName);

            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.getElementById('stories-section').style.display = tabName === 'stories' ? 'block' : 'none';
            document.getElementById('favorites-section').style.display = tabName === 'favorites' ? 'block' : 'none';

            // إضافة تأثير عند تغيير التبويب
            if (tabName === 'stories') {
                document.getElementById('stories-grid').style.animation = 'fadeIn 0.6s ease-out';
            } else {
                document.getElementById('favorites-grid').style.animation = 'fadeIn 0.6s ease-out';
            }
        });
    });

    // إغلاق النموذج
    document.getElementById('close-modal').addEventListener('click', closeModal);

    // إغلاق النموذج عند النقر خارج المحتوى
    document.getElementById('chapters-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    // إغلاق النموذج عند الضغط على زر Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'theme-switch-effect';
    document.body.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 1200);

    // Apply theme change with delay
    setTimeout(() => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'false');
        }

        // Add bounce effect to icon
        themeIcon.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            themeIcon.style.animation = '';
        }, 600);
    }, 300);
}

function renderStories() {
    const storiesGrid = document.getElementById('stories-grid');
    storiesGrid.innerHTML = stories.map(story => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const isFavorite = favorites.includes(story.id);

        return `
                    <div class="story-card" data-story-id="${story.id}">
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-story-id="${story.id}" aria-label="${isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}">
                            <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <div class="story-cover" style="background-image: url('${story.cover}');"></div>
                        <div class="story-info">
                            <h3>${story.title}</h3>
                            <div class="story-meta">
                                <span><i class="fas fa-book-open"></i> ${story.chapters.length} فصول</span>
                                <span><i class="far fa-calendar-alt"></i> ${story.date}</span>
                            </div>
                            <p>${story.description.substring(0, 100)}...</p>
                            <div class="story-actions">
                                <button class="btn btn-primary" data-story-id="${story.id}">
                                    <i class="fas fa-list"></i> عرض الفصول
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    }).join('');

    // أحداث عرض الفصول
    document.querySelectorAll('.story-actions .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const storyId = parseInt(btn.getAttribute('data-story-id'));
            const story = stories.find(s => s.id === storyId);
            if (story) openChaptersModal(story);
        });
    });

    // أحداث زر المفضلة
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const storyId = parseInt(btn.getAttribute('data-story-id'));
            toggleFavorite(storyId);
        });
    });
}

function toggleFavorite(storyId) {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const index = favorites.indexOf(storyId);

    if (index === -1) {
        favorites.push(storyId);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderStories();
    renderFavorites();

    // إضافة تأثير عند التغيير
    const btn = document.querySelector(`.favorite-btn[data-story-id="${storyId}"] i`);
    btn.style.animation = 'pulse 0.6s ease';
    setTimeout(() => {
        btn.style.animation = '';
    }, 600);
}

function renderFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    const favoriteStories = stories.filter(story => favorites.includes(story.id));

    if (favoriteStories.length > 0) {
        favoritesGrid.innerHTML = favoriteStories.map(story => `
                    <div class="story-card" data-story-id="${story.id}">
                        <button class="favorite-btn active" data-story-id="${story.id}" aria-label="إزالة من المفضلة">
                            <i class="fas fa-heart"></i>
                        </button>
                        <div class="story-cover" style="background-image: url('${story.cover}');"></div>
                        <div class="story-info">
                            <h3>${story.title}</h3>
                            <div class="story-meta">
                                <span><i class="fas fa-book-open"></i> ${story.chapters.length} فصول</span>
                                <span><i class="far fa-calendar-alt"></i> ${story.date}</span>
                            </div>
                            <p>${story.description.substring(0, 100)}...</p>
                            <div class="story-actions">
                                <button class="btn btn-primary" data-story-id="${story.id}">
                                    <i class="fas fa-list"></i> عرض الفصول
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
    } else {
        favoritesGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="far fa-heart"></i>
                        <p>لا توجد قصص في المفضلة حتى الآن</p>
                    </div>
                `;
    }

    // أحداث عرض الفصول للقصص المفضلة
    document.querySelectorAll('#favorites-grid .story-actions .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const storyId = parseInt(btn.getAttribute('data-story-id'));
            const story = stories.find(s => s.id === storyId);
            if (story) openChaptersModal(story);
        });
    });

    // أحداث زر المفضلة في صفحة المفضلة
    document.querySelectorAll('#favorites-grid .favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const storyId = parseInt(btn.getAttribute('data-story-id'));
            toggleFavorite(storyId);
        });
    });
}

function openChaptersModal(story) {
    document.getElementById('modal-story-title').textContent = story.title;

    const chaptersList = document.getElementById('chapters-list');
    chaptersList.innerHTML = story.chapters.length > 0
        ? story.chapters.map(chapter => `
                    <div class="chapter-card">
                        <div class="chapter-number">الفصل ${chapter.number}</div>
                        <div class="chapter-title">${chapter.title}</div>
                        <div class="chapter-meta">
                            <i class="fas fa-file-alt"></i> ${chapter.pages}
                        </div>
                        <button class="chapter-read-btn" data-chapter-url="${chapter.pdfUrl}">
                            <i class="fas fa-book-reader"></i> قراءة الفصل
                        </button>
                    </div>
                `).join('')
        : '<p style="text-align:center; grid-column:1/-1; color: var(--text-light);">لا توجد فصول متاحة لهذه القصة بعد</p>';

    document.querySelectorAll('.chapter-read-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pdfUrl = btn.getAttribute('data-chapter-url');
            // إضافة تأثير قبل الانتقال
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل';
            setTimeout(() => {
                window.open(pdfUrl, '_blank');
                btn.innerHTML = '<i class="fas fa-book-reader"></i> قراءة الفصل';
            }, 500);
        });
    });

    document.getElementById('chapters-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('chapters-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}