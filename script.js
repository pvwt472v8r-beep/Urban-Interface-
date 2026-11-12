const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
if (menuBtn && mainNav) {
  const setMenuOpen = (open) => {
    mainNav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  menuBtn.addEventListener("click", () => {
    setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true");
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
      setMenuOpen(false);
      menuBtn.focus();
    }
  });

  window.matchMedia("(min-width: 701px)").addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Hero background video: mobile source + data saver handling */
document.querySelectorAll(".hero-video").forEach((video) => {
  const saveData = navigator.connection && navigator.connection.saveData;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (saveData || reduceMotion) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  const mobile = window.matchMedia("(max-width:700px)").matches;
  const mobileSrc = video.dataset.mobileSrc;
  if (mobile && mobileSrc) {
    video.innerHTML = "";
    video.src = mobileSrc;
    video.load();
  }
  video.play().catch(() => {});
});

/* Message-slot video pause/play buttons */
document.querySelectorAll(".bg-video").forEach((wrap) => {
  const video = wrap.querySelector("video");
  const btn = wrap.querySelector(".video-toggle");
  if (!video || !btn) return;

  btn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      btn.textContent = "Pause";
      btn.setAttribute("aria-label", "Pause background video");
    } else {
      video.pause();
      btn.textContent = "Play";
      btn.setAttribute("aria-label", "Play background video");
    }
  });
});