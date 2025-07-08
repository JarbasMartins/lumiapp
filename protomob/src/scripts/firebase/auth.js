// firebase import

import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// funções de autenticação

const updateButtonState = (button, isLoading, loadingText, defaultText) => {
    button.disabled = isLoading;
    button.textContent = isLoading ? loadingText : defaultText;
};

const redirectTo = (path) => {
    window.location.href = path;
};

// função de registro
const handleRegister = async (e, form) => {
    e.preventDefault();
    const registerBtn = form.querySelector(".button-register");

    const name = form.querySelector("#reg-nome").value.trim();
    const firstName = name.split(" ")[0];
    const email = form.querySelector("#reg-email").value;
    const password = form.querySelector("#reg-senha").value;

    updateButtonState(registerBtn, true, "Cadastrando...", "Cadastrar");

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(userCredential.user, { displayName: firstName });
        form.reset();
        redirectTo("/index.html");
    } catch (err) {
        console.error("Erro ao cadastrar:", err.message);
    } finally {
        updateButtonState(registerBtn, false, "Cadastrando...", "Cadastrar");
    }
};

// função de login
const handleLogin = async (e, form) => {
    e.preventDefault();
    const loginBtn = form.querySelector(".button-login");

    const email = form.querySelector("#login-email").value;
    const password = form.querySelector("#login-password").value;

    updateButtonState(loginBtn, true, "Entrando...", "Entrar");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        form.reset();
        redirectTo("/index.html");
    } catch (err) {
        console.error("Erro ao fazer login:", err.message);
    } finally {
        updateButtonState(loginBtn, false, "Entrando...", "Entrar");
    }
};

// função de logout

const handleLogout = async () => {
    try {
        await signOut(auth);
        redirectTo("./src/pages/auth.html");
    } catch (err) {
        console.error("Erro ao fazer logout:", err.message);
    }
};

// upadete de estado do usuario
const handleAuthStateChange = (user) => {
    const showName = document.querySelector(".show-name");

    if (user) {
        if (showName) showName.textContent = user.displayName;
    } else {
        if (window.location.pathname.endsWith("index.html")) {
            redirectTo("./src/pages/auth.html");
        }
    }
};

// export { auth, handleRegister, handleLogin, handleLogout, handleAuthStateChange };

export function initAuth() {
    const registerForm = document.querySelector(".register form");
    const loginForm = document.querySelector(".login form");
    const logoutButton = document.querySelector("#logout-btn");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) =>
            handleRegister(e, registerForm)
        );
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => handleLogin(e, loginForm));
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }

    onAuthStateChanged(auth, handleAuthStateChange);
}
