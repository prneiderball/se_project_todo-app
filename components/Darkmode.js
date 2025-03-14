class Darkmode {
  constructor(toggleButton, storageKey = "darkmode") {
    this.toggleButton = document.getElementById("dark-mode-toggle");
    this.storageKey = storageKey;
    this.body = document.body;
  }

  init() {
    if (
      localStorage.getItem(this.storageKey) === "enabled" ||
      (!localStorage.getItem(this.storageKey) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      this.enableDarkMode();
    }
    this.toggleButton.addEventListener("click", () => this.toggleDarkMode());
  }

  enableDarkMode() {
    this.body.classList.add("dark-mode");
    localStorage.setItem(this.storageKey, "enabled");
  }

  disableDarkMode() {
    this.body.classList.remove("dark-mode");
    localStorage.setItem(this.storageKey, "disabled");
  }

  toggleDarkMode() {
    if (this.body.classList.contains("dark-mode")) {
      this.disableDarkMode();
      this.toggleButton.textContent = "🌙 Dark Mode";
    } else {
      this.enableDarkMode();
      this.toggleButton.textContent = "☀️ Light Mode";
    }
  }
}

export default Darkmode;
