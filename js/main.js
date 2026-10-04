(function () {
  var header = document.getElementById("site-header");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelectorAll(".nav-links a");

  function setOpen(open) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle) {
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }
  links.forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });

  // Header background after leaving the hero
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal on scroll
  var nodes = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (n) { n.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(function (n) { io.observe(n); });
  }
})();

// Click-to-load YouTube embeds (privacy friendly): nothing from YouTube loads until play is pressed.
(function () {
  document.querySelectorAll(".yt-lite").forEach(function (box) {
    var btn = box.querySelector(".yt-btn");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      var f = document.createElement("iframe");
      var vim = box.getAttribute("data-vimeo");
      f.src = vim ? "https://player.vimeo.com/video/" + encodeURIComponent(vim) + "?autoplay=1&dnt=1" : "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(box.getAttribute("data-yt")) + "?autoplay=1&rel=0";
      f.title = box.getAttribute("data-title") || "YouTube video";
      f.width = 1280; f.height = 720;
      f.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      f.setAttribute("allowfullscreen", "");
      box.appendChild(f);
      btn.remove();
      f.focus();
    });
  });
})();
