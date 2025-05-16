if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker zarejestrowany!'))
    .catch(err => console.error('Błąd SW:', err));
}

const username = localStorage.getItem("loggedInUser");

if (username) {
  const msg = document.getElementById("welcomeMsg");
  if (msg) {
    msg.textContent = `Witaj ${username}!`;
  }

  const nav = document.getElementById("navLinks");
  if (nav) nav.style.display = "none";

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.reload();
    });
  }
}
