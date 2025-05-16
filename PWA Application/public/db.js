const request = indexedDB.open("UsersDB", 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore("users", { keyPath: "username" });
};

function showMessage(msg, type = "success") {
  const el = document.getElementById("message");
  if (el) {
    el.textContent = msg;
    el.className = type;
  }
}

document.getElementById("registerForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const db = request.result;
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users");

  const check = store.get(username);
  check.onsuccess = () => {
    if (check.result) {
      showMessage("Użytkownik już istnieje.", "error");
    } else {
      store.add({ username, password });
      tx.oncomplete = () => {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
      };
    }
  };
});

document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const db = request.result;
  const tx = db.transaction("users", "readonly");
  const store = tx.objectStore("users");
  const getUser = store.get(username);

  getUser.onsuccess = () => {
    if (getUser.result && getUser.result.password === password) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "index.html";
    } else {
      showMessage("Błędne dane logowania.", "error");
    }
  };
});
