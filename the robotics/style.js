// ====== Theme Toggle ======
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = '🌙';
    } else {
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = '☀️';
    }
});

// تحميل التفضيل عند فتح الصفحة
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '🌙';
}

const dragger = document.getElementById('dragger');
if (dragger) {
    let isDragging = false;
    let offsetX, offsetY;
    const initialX = dragger.offsetLeft;
    const initialY = dragger.offsetTop;

    dragger.addEventListener('mousedown', startDrag);
    dragger.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        const evt = e.type === 'touchstart' ? e.touches[0] : e;
        offsetX = evt.clientX - dragger.offsetLeft;
        offsetY = evt.clientY - dragger.offsetTop;

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', onDrag);
        document.addEventListener('touchend', stopDrag);
    }

    function onDrag(e) {
        if (!isDragging) return;
        const evt = e.type.startsWith('touch') ? e.touches[0] : e;
        let x = evt.clientX - offsetX;
        let y = evt.clientY - offsetY;

        // ابقي داخل حدود الشاشة
        x = Math.max(0, Math.min(window.innerWidth - dragger.offsetWidth, x));
        y = Math.max(0, Math.min(window.innerHeight - dragger.offsetHeight, y));

        dragger.style.left = x + 'px';
        dragger.style.top = y + 'px';
        dragger.style.position = 'absolute';

        // مثال: تحريك الذراع حسب X
        const robotArm = document.querySelector('.right-arm');
        if (robotArm) {
            const angle = (x / window.innerWidth) * 90 - 45;
            robotArm.style.transform = `rotate(${angle}deg)`;
        }
    }

    function stopDrag() {
        isDragging = false;
        // ارجع العنصر لمكانه الأصلي
        dragger.style.left = initialX + 'px';
        dragger.style.top = initialY + 'px';
        dragger.style.position = '';

        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', stopDrag);
    }
}



document.getElementById("get-started").addEventListener("click", () => {
    const section = document.getElementById("projects"); // غيّر ID حسب سكشنك
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
});

// عند الضغط على "ساحة التفاعل" يفتح صفحة أو سكشن جديد
document.getElementById("open-playground").addEventListener("click", () => {
    window.location.href = "real experiment/robot.html"; // غيّر الرابط حسب مكان الساحة
});



// ====== بيانات اللغات والمشاريع ======
const languageData = {
    python: { title: 'Python', desc: 'ممتازة للـ AI والـ Raspberry Pi والتعامل مع البيانات.' },
    cpp: { title: 'C/C++', desc: 'مستخدمة في المتحكمات والبرمجيات منخفضة المستوى.' },
    esp: { title: 'ESP32', desc: 'متحكم لشبكات WiFi/IoT والتواصل عبر الشبكة.' },
    firmware: { title: 'Firmware', desc: 'برمجة الذاكرة الدائمة والتحكم بالعتاد مباشرة.' }
};

const projectDetails = {
    line: `
        <h3> متتبع الخط</h3>
        <p>هذا المشروع يستخدم مستشعر IR لتتبع الخطوط على الأرض. مناسب للمبتدئين.</p>
        <ul>
            <li>المكونات: لوحة Arduino، 2 مستشعر IR، 2 محرك DC، عجلات.</li>
            <li>خطوات العمل:
                <ol>
                    <li>وصل المستشعرات بالمخارج الرقمية للـ Arduino.</li>
                    <li>برمج Arduino لقراءة القيم وتحريك المحركات.</li>
                    <li>ضع الروبوت على مسار الخط الأسود لمراقبة الأداء.</li>
                </ol>
            </li>
            <li>ملاحظات: تأكد من معايرة المستشعر قبل التشغيل.</li>
        </ul>
    `,
    arm: `
        <h3>ذراع روبوتية</h3>
        <p>ذراع روبوتية تتحكم في 4 درجات حرية باستخدام محركات سيرفو.</p>
        <ul>
            <li>المكونات: لوحة Arduino، 4 محركات سيرفو، مصدر طاقة، مفاصل ميكانيكية.</li>
            <li>خطوات العمل:
                <ol>
                    <li>ثبت المحركات على الذراع حسب المخطط.</li>
                    <li>وصل كل سيرفو بالمخارج الرقمية للـ Arduino.</li>
                    <li>برمج Arduino للتحكم في الحركة حسب تسلسل محدد.</li>
                </ol>
            </li>
            <li>ملاحظات: لا تتجاوز الحمولة القصوى للذراع.</li>
        </ul>
    `,
    iot: `
        <h3>روبوت IoT</h3>
        <p>روبوت متصل بشبكة Wi-Fi للتحكم عن بعد باستخدام ESP32.</p>
        <ul>
            <li>المكونات: ESP32، محركات، مستشعرات حسب المشروع، شبكة Wi-Fi.</li>
            <li>خطوات العمل:
                <ol>
                    <li>برمج ESP32 للتحكم في المحركات عن طريق HTTP أو WebSocket.</li>
                    <li>اتصل بشبكة Wi-Fi الخاصة بك.</li>
                    <li>اختبر التحكم من المتصفح أو تطبيق الهاتف.</li>
                </ol>
            </li>
            <li>ملاحظات: تأكد من تغذية المحركات بتيار مناسب.</li>
        </ul>
    `
};

// ====== Scroll reveal & counters ======
const revealEls = document.querySelectorAll('.js-scroll');
if (revealEls.length) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const nums = entry.target.querySelectorAll('.num');
                nums.forEach(n => animateNumber(n, parseInt(n.dataset.target || '0')));
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10px 0px' });

    revealEls.forEach(el => observer.observe(el));
}

// ====== number animator ======
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// الدالة اللي بتعمل الأنيميشن
function animateNumber(el, target) {
    const duration = 5000; 
    const start = performance.now();
    const from = 0;

    function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutCubic(t);
        el.textContent = Math.floor(from + (target - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// لما الصفحة تجهز
window.addEventListener("DOMContentLoaded", () => {
    const counter = document.getElementById("counter");
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {
        animateNumber(counter, 1000);
    });
});



const slides = document.querySelectorAll("#carousel3D .slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let current = 0;

function updateCarousel() {
    slides.forEach((slide, i) => {
        slide.classList.remove("active", "prev", "next");
    });

    const total = slides.length;
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;

    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
}

nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Auto-rotation
let autoRotate = setInterval(() => {
    current = (current + 1) % slides.length;
    updateCarousel();
}, 5000);

document.querySelector(".carousel-wrap").addEventListener("mouseenter", () => clearInterval(autoRotate));
document.querySelector(".carousel-wrap").addEventListener("mouseleave", () => {
    autoRotate = setInterval(() => {
        current = (current + 1) % slides.length;
        updateCarousel();
    }, 5000);
});

updateCarousel();


// ===== Expanded Image on Click =====
const expandedView = document.getElementById("expandedView");
const expandedImg = document.getElementById("expandedImg");
const expandedTitle = document.getElementById("expandedTitle");
const expandedDesc = document.getElementById("expandedDesc");
const closeExpanded = document.getElementById("closeExpanded");

// بيانات الصور (ممكن تغيرها حسب الصور عندك)
const imageDetails = [
    { title: "روبوت ذكي", desc: "روبوت مزود بتقنيات الذكاء الصناعي يتعلم من البيئة المحيطة." },
    { title: "روبوت مساعد", desc: "روبوت مصمم لتقديم المساعدة في المهام اليومية." },
    { title: "روبوت صناعي", desc: "روبوت يستخدم في المصانع لأداء المهام الدقيقة والمتكررة." },
    { title: "روبوت ذكي", desc: "روبوت مزود بتقنيات الذكاء الصناعي يتعلم من البيئة المحيطة." },
    { title: "روبوت مساعد", desc: "روبوت مصمم لتقديم المساعدة في المهام اليومية." },
    { title: "روبوت صناعي", desc: "روبوت يستخدم في المصانع لأداء المهام الدقيقة والمتكررة." }
];

slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
        const img = slide.querySelector("img");
        expandedImg.src = img.src;
        expandedTitle.textContent = imageDetails[index].title;
        expandedDesc.textContent = imageDetails[index].desc;
        expandedView.classList.add("show");
        document.body.style.overflow = "hidden"; // منع التمرير أثناء العرض
    });
});

closeExpanded.addEventListener("click", () => {
    expandedView.classList.remove("show");
    document.body.style.overflow = "";
});




// ====== Smooth Scroll ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// ====== Modal project details ======
// ====== Modal project details (صححت الأسماء) ======
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('[data-proj]').forEach(btn => {
    btn.addEventListener('click', e => {
        const key = e.currentTarget.getAttribute('data-proj');
        const details = projectDetails[key] || 'لا توجد تفاصيل';
        modalTitle.textContent = `تفاصيل مشروع: ${key}`;
        modalBody.innerHTML = details;
        openModal();
    });
});

document.getElementById('closeModal')?.addEventListener('click', closeModal);

function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});


// ====== Language details ======
const langList = document.getElementById('lang-list');
if (langList) {
    langList.addEventListener('click', e => {
        const el = e.target.closest('.lang');
        if (!el) return;
        document.querySelectorAll('.lang').forEach(l => l.classList.remove('active'));
        el.classList.add('active');
        const key = el.dataset.lang;
        const d = languageData[key];
        document.getElementById('lang-details').innerHTML =
            `<strong>${d.title}</strong><p style="color:var(--muted);margin-top:6px">${d.desc}</p>`;
    });
}

// ====== Background Particles ======
const canvas = document.getElementById("background");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const colors = ["#00d9ff", "#FFD700", "#ffffff"];
    let w, h;

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function createParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 3 + 1,
                dx: (Math.random() - 0.5) * .8,
                dy: (Math.random() - 0.5) * 0.8,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, w, h);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
        }

        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = "rgba(0, 217, 255, 0.1)";
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawParticles);
    }

    createParticles();
    drawParticles();
}


// ===== Robot Assistant behavior =====
(function () {
    const robot = document.getElementById('robot-assistant');
    const bubble = document.getElementById('robot-bubble');
    const soundBtn = document.getElementById('robot-toggle-sound');
    const robotEl = robot?.querySelector('.robot');

    if (!robot || !bubble || !robotEl) return;

    // messages pool
    const welcomePool = [
        "أهلاً بك في RobotLab! 🤖",
        "مرحباً! جاهز لتعلم شيء جديد عن الروبوتات؟",
        "سلام! لو عايز مشروع بسيط أقدر أساعدك."
    ];
    const followPool = [
        "هل تود تجربة المختبر التجريبي؟ اسحب العنصر الأزرق.",
        "شاهد المشاريع الجاهزة أو جرب الـIoT الآن.",
        "هل تحتاج شرحًا عن لغة برمجة أو متحكم معين؟"
    ];
    const clickReplies = [
        "أنا هنا لو احتجت مساعدة 🙂",
        "شغّل ساحة التفاعل أو طالع المشاريع الجاهزة!",
        "أحب الروبوتات. تحب مشروع ذراع روبوتية؟"
    ];

    // sound / mute state
    const SOUND_KEY = 'robot_sound_enabled';
    let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false'; // default true
    updateSoundBtn();

    function updateSoundBtn() {
        if (!soundBtn) return;
        soundBtn.setAttribute('aria-pressed', (!soundEnabled).toString());
        soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
    }

    soundBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEnabled = !soundEnabled;
        localStorage.setItem(SOUND_KEY, soundEnabled ? 'true' : 'false');
        updateSoundBtn();
    });

    // small helper to play beep (optional)
    function playBeep() {
        if (!soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = 880;
            g.gain.value = 0.02;
            o.connect(g); g.connect(ctx.destination);
            o.start();
            setTimeout(() => { o.stop(); ctx.close(); }, 80);
        } catch (e) { }
    }

    // show robot after small delay (entrance)
    setTimeout(() => {
        robot.classList.add('visible'); // in CSS we didn't use .visible on container, but it's fine if any external uses it
        // show first welcome message
        showMessage(randomFrom(welcomePool));
        playBeep();
    }, 900);

    // show followup message after short time
    setTimeout(() => {
        showMessage(randomFrom(followPool));
    }, 4800);

    // clicking robot cycles replies
    robotEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const reply = randomFrom(clickReplies);
        showMessage(reply);
        playBeep();
        // small tactile feedback: quick nudge
        robotEl.classList.remove('tactile'); // restart animation if any
        void robotEl.offsetWidth;
        robotEl.classList.add('tactile');
        setTimeout(() => robotEl.classList.remove('tactile'), 350);
    });

    // hide bubble on outside click
    document.addEventListener('click', (e) => {
        if (!robot.contains(e.target)) {
            bubble.classList.remove('show');
        }
    });

    // helper
    function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    // show message function
    let msgTimer = null;
    function showMessage(text, timeout = 5000) {
        bubble.textContent = text;
        bubble.classList.add('show');
        if (msgTimer) clearTimeout(msgTimer);
        msgTimer = setTimeout(() => bubble.classList.remove('show'), timeout);
    }

    // mouse-follow eyes small effect (when mouse near)
    const eyes = robot.querySelectorAll('.eye');
    window.addEventListener('mousemove', (ev) => {
        const rect = robot.getBoundingClientRect();
        const mx = ev.clientX;
        const my = ev.clientY;
        const distX = mx - (rect.left + rect.width / 2);
        const distY = my - (rect.top + rect.height / 2);
        const dist = Math.hypot(distX, distY);

        // only track when cursor is within ~280px
        if (dist < 280) {
            eyes.forEach((eye, idx) => {
                const ex = (distX / rect.width) * 8;
                const ey = (distY / rect.height) * 6;
                eye.style.transform = `translate(${ex}px, ${ey}px) scale(1)`;
                eye.style.boxShadow = '0 0 14px rgba(0,217,255,0.9)';
            });
        } else {
            eyes.forEach((eye) => {
                eye.style.transform = '';
                eye.style.boxShadow = '';
            });
        }
    });
})();

// ====== Mobile menu toggle ======
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // إغلاق القائمة لما المستخدم يضغط على أي رابط فيها
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
