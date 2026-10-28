const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => mainNav.classList.toggle("open"));
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Autoplay videos: inline muted playback fallback; ignore rejection */
document.querySelectorAll("video[autoplay]").forEach((video) => {
  const saveData = navigator.connection && navigator.connection.saveData;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (saveData || reduceMotion) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }
  video.muted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  const p = video.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
});

/* Message-slot video pause/play buttons */
document.querySelectorAll(".bg-video").forEach((wrap) => {
  const video = wrap.querySelector("video");
  const btn = wrap.querySelector(".video-toggle");
  if (!video || !btn) return;

  btn.addEventListener("click", () => {
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      btn.textContent = "Pause";
      btn.setAttribute("aria-label", "Pause background video");
    } else {
      video.pause();
      btn.textContent = "Play";
      btn.setAttribute("aria-label", "Play background video");
    }
  });
});