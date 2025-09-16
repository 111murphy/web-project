// js/global.header-burger.js
export function initHeaderBurger(root = document) {
  const burger = root.querySelector(".header__burger");
  if (!burger) return; // нічого робити, якщо бургеру немає

  // запобіжник від дубль-ініціалізації
  if (burger.dataset.hbInitialized === "true") return;

  const nav = root.querySelector(".header__nav");
  const menuLinks = root.querySelectorAll(".header__menu-link");

  function toggleMenu() {
    burger.classList.toggle("is-active");
    if (nav) nav.classList.toggle("is-open");
    document.body.classList.toggle("no-scroll");
  }

  function closeMenu() {
    burger.classList.remove("is-active");
    if (nav) nav.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  burger.addEventListener("click", toggleMenu);
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  burger.dataset.hbInitialized = "true";
}
