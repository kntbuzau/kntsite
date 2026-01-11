(function() {
    const MAX_VISITS = 2;
    const BAN_DAYS = 10;
    const now = Date.now();

    const banUntil = localStorage.getItem("ban_until");
    if (banUntil && now < parseInt(banUntil)) {
        // BAN activ → curăță tot conținutul și afișează mesajul
        document.body.innerHTML = '';
        document.head.innerHTML = '';
        document.documentElement.style.margin = '0';
        document.documentElement.style.height = '100vh';
        document.documentElement.style.display = 'flex';
        document.documentElement.style.justifyContent = 'center';
        document.documentElement.style.alignItems = 'center';
        document.documentElement.style.background = '#0f0f0f';
        document.documentElement.style.color = 'red';
        document.documentElement.style.fontFamily = 'Arial, sans-serif';
        document.documentElement.innerHTML = '<h1>You are banned</h1>';
        throw new Error("BANNED");
    }

    let visits = parseInt(localStorage.getItem("visit_count") || "0");
    visits++;
    localStorage.setItem("visit_count", visits);

    if (visits > MAX_VISITS) {
        const banTime = BAN_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem("ban_until", now + banTime);

        // Curățare completă și afișare mesaj
        document.body.innerHTML = '';
        document.head.innerHTML = '';
        document.documentElement.style.margin = '0';
        document.documentElement.style.height = '100vh';
        document.documentElement.style.display = 'flex';
        document.documentElement.style.justifyContent = 'center';
        document.documentElement.style.alignItems = 'center';
        document.documentElement.style.background = '#0f0f0f';
        document.documentElement.style.color = 'red';
        document.documentElement.style.fontFamily = 'Arial, sans-serif';
        document.documentElement.innerHTML = '<h1>You are banned</h1>';
        throw new Error("TEMP BANNED");
    }
})();
