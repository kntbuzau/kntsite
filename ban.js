(unction () {
  // 🔑 cheia ta secretă (schimb-o cu ceva ce știi doar tu)
  const MASTER_KEY = "admin_knt_2026";

  // dacă intri cu cheia → NU ești contorizat și NU poți fi banat
  const params = new URLSearchParams(window.location.search);
  if (params.get("admin") === MASTER_KEY) {
    console.log("ADMIN MODE ON");
    return;
  }

  const VISITS_KEY = "visits_knt";
  const BAN_UNTIL_KEY = "ban_until_knt";

  const now = Date.now();
  const banUntil = localStorage.getItem(BAN_UNTIL_KEY);

  // dacă e banat și nu a expirat
  if (banUntil && now < parseInt(banUntil, 10)) {
    document.body.innerHTML =
      "<h1 style='text-align:center;margin-top:20vh;font-family:sans-serif'>You are banned!</h1>";
    return;
  }

  // dacă banul a expirat → reset
  if (banUntil && now >= parseInt(banUntil, 10)) {
    localStorage.removeItem(BAN_UNTIL_KEY);
    localStorage.removeItem(VISITS_KEY);
  }

  // contorizare accesări
  let visits = parseInt(localStorage.getItem(VISITS_KEY) || "0", 10);
  visits++;
  localStorage.setItem(VISITS_KEY, visits);

  // peste 2 accesări → BAN 10 zile
  if (visits > 2) {
    const tenDays = 10 * 24 * 60 * 60 * 1000; // 10 zile
    localStorage.setItem(BAN_UNTIL_KEY, now + tenDays);

    document.body.innerHTML =
      "<h1 style='text-align:center;margin-top:20vh;font-family:sans-serif'>You are banned!</h1>";
  }
})();

