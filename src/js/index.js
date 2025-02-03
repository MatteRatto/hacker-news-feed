import "../css/style.css";
import { NewsManager } from "./newsManager";
import { UI } from "./ui";

document.addEventListener("DOMContentLoaded", async () => {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
      const theme = document.documentElement.getAttribute("data-theme");
      const newTheme = theme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
  }

  const newsManager = new NewsManager();
  const ui = new UI(newsManager);

  try {
    await newsManager.initialize();
  } catch (error) {
    ui.showError("Si è verificato un errore nel caricamento delle notizie");
  }
});
