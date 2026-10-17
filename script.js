const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const sectionLinks = document.querySelectorAll(".nav-links a");

const newsItems = Array.from(document.querySelectorAll("#news-list > .news-item"));
const newsToggle = document.querySelector(".news-toggle");
const newsPreviewLimit = 10;

if (newsToggle && newsItems.length > newsPreviewLimit) {
  const olderNews = newsItems.slice(newsPreviewLimit);
  const setNewsExpanded = (expanded) => {
    olderNews.forEach((item) => {
      item.hidden = !expanded;
    });
    newsToggle.setAttribute("aria-expanded", String(expanded));
    newsToggle.textContent = expanded
      ? "Show less"
      : `Show more (${olderNews.length})`;
  };

  setNewsExpanded(false);
  newsToggle.hidden = false;
  newsToggle.addEventListener("click", () => {
    const expanded = newsToggle.getAttribute("aria-expanded") !== "true";
    setNewsExpanded(expanded);
    if (!expanded) {
      newsToggle.focus({ preventScroll: true });
      newsToggle.scrollIntoView({ block: "nearest" });
    }
  });
}

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 16);
}

function closeMenu() {
  menuToggle.classList.remove("open");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});

sectionLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      sectionLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  observer.observe(section);
});

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeMenu();
  }
});
