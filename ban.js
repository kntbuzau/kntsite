(function () {
    const MAX_VISITS = 2;
    const BAN_DAYS = 10;
    const now = Date.now();

    const banUntil = localStorage.getItem("ban_until");
    if (banUntil && now < parseInt(banUntil)) {
        document.documentElement.innerHTML = `
            <html>
            <head>
                <title>Banned</title>
                <style>
                    body {
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background: #0f0f0f;
                        color: red;
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>You are banned</h1>
            </body>
            </html>
        `;
        throw new Error("BANNED");
    }

    let visits = localStorage.getItem("visit_count");
    visits = visits ? parseInt(visits) : 0;
    visits++;

    localStorage.setItem("visit_count", visits);

    if (visits > MAX_VISITS) {
        const banTime = BAN_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem("ban_until", now + banTime);

        document.body.innerHTML = `
            <h1 style="color:red;text-align:center;margin-top:20%">
                You are banned
            </h1>
        `;
        throw new Error("TEMP BANNED");
    }
})();
