(function() {
    // ===== الأقسام الرئيسية =====
    const sections = [
        "cover",
        "about",
        "education",
        "experience",
        "my-work",
        "gallery",
        "contact",
    ];

    const dots = document.querySelector(".dots");
    const navLinks = Array.from(document.querySelectorAll(".site-header a"));

    // ===== متغيرات لمنع تداخل الـ Scroll =====
    let isScrolling = false;
    let scrollTimeout;

    // ===== إنشاء Pagination Dots =====
    sections.forEach((id) => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", `Go to ${id}`);
        button.addEventListener("click", () => {
            // إيقاف الـ Observer مؤقتاً
            isScrolling = true;
            setActive(id);
            history.replaceState(null, null, `#${id}`);

            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

            // إعادة تشغيل الـ Observer بعد ثانية (وقت كافي لانتهاء الـ smooth scroll)
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1000);
        });
        dots.appendChild(button);
    });

    const dotButtons = Array.from(dots.querySelectorAll("button"));

    // ===== تحديث الحالة النشطة =====
    const setActive = (id) => {
        // تحديث Navbar
        navLinks.forEach((link) =>
            link.classList.toggle("active", link.getAttribute("href") === "#" + id)
        );

        // تحديث Dots
        dotButtons.forEach((btn, index) =>
            btn.classList.toggle("active", sections[index] === id)
        );
    };

    // ===== Scroll Spy باستخدام IntersectionObserver =====
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible && visible.target && visible.target.id) {
                const sectionId = visible.target.id;

                // مش هنحدث الـ URL أو الـ Active State إلا لو اليوزر بيعمل Scroll بنفسه
                if (!isScrolling) {
                    setActive(sectionId);
                    history.replaceState(null, null, `#${sectionId}`);
                }

                // ===== أنيميشن للكروت في قسم Our Services =====
                // الأنيميشن هيفضل شغال عادي في كل الحالات
                if (sectionId === "my-work") {
                    document.querySelectorAll(".service-card").forEach((card, i) => {
                        setTimeout(() => {
                            card.classList.add("show");
                        }, i * 150); // تأخير بسيط بين الكروت
                    });
                }
            }
        }, { threshold: [0.4, 0.6, 0.8] }
    );

    sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // ===== Smooth Scrolling للروابط =====
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href")?.slice(1);
            const targetElement = targetId && document.getElementById(targetId);

            if (targetElement) {
                // إيقاف الـ Observer مؤقتاً
                isScrolling = true;
                setActive(targetId);
                history.replaceState(null, null, `#${targetId}`);

                targetElement.scrollIntoView({ behavior: "smooth" });

                // إعادة تشغيل الـ Observer بعد ثانية
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });

    // ===== حالة مبدئية =====
    setActive(sections[0]);
})();