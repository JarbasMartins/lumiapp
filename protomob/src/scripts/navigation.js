export function initAuthToggle() {
    const toggleLinks = document.querySelectorAll(".toggle-link");
    const loginForm = document.querySelector(".auth.login");
    const registerForm = document.querySelector(".auth.register");

    if (!toggleLinks.length || !loginForm || !registerForm) {
        return;
    }

    toggleLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");

            if (target === "register") {
                loginForm.style.display = "none";
                registerForm.style.display = "flex";
            } else if (target === "login") {
                registerForm.style.display = "none";
                loginForm.style.display = "flex";
            }
        });
    });
}

//
//

export function initNavigation() {
    const startButton = document.getElementById("start-button");

    if (startButton) {
        startButton.addEventListener("click", () => {
            window.location.href = "/auth.html";
        });
    }
}

//
//
export function screensNavigation() {
    const navItens = document.querySelectorAll(".nav-item");

    if (!navItens.length) {
        return;
    }

    navItens.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            navItens.forEach((el) => el.classList.remove("active"));

            item.classList.add("active");
        });
    });

    const riskTestBtn = document.querySelector("#risktest-btn");

    if (riskTestBtn) {
        riskTestBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "/src/pages/riskTest.html";
        });
    }

    const contactBtn = document.querySelector("#contacts-btn");

    if (contactBtn) {
        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "/src/pages/contact.html";
        });
    }

    const infoBtn = document.querySelector("#info-btn");

    if (infoBtn) {
        infoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "/src/pages/information.html";
        });
    }
}

//
//
export function prevPageNavigation() {
    const prevPage = document.querySelector(".prev-page");

    if (prevPage) {
        prevPage.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "/index.html";
        });
    }
}
