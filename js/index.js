// js/index.js (приклад)
function init() {
  import("./global.header-burger.js")
    .then((mod) => {
      // Якщо header вже є у DOM — ініціюємо одразу
      if (document.querySelector(".header__burger")) {
        mod.initHeaderBurger();
        return;
      }

      // Інакше — слухаємо за htmx swap і ініціюємо коли header підвантажиться
      const onSwap = (evt) => {
        // evt.target може бути елементом, у який здійснювався swap
        const target = evt.target;
        // перевіряємо чи в swap-нутому фрагменті з'явився наш бургер
        try {
          if (
            target &&
            typeof target.querySelector === "function" &&
            target.querySelector(".header__burger")
          ) {
            mod.initHeaderBurger();
            document.body.removeEventListener("htmx:afterSwap", onSwap);
          }
        } catch (e) {
          // безпечна заглушка
          console.error(e);
        }
      };

      document.body.addEventListener("htmx:afterSwap", onSwap);
    })
    .catch((err) => console.error("Failed to import header-burger:", err));
}

// твій підрахунок частинок — залишаємо як є
const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
