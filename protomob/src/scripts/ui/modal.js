let isCooldown = false;
let emergencyButton;
let emergencyModal;
let overlay;
let body;
let originalButtonText;
let originalModalHTML;

function setButtonState(disabled, text) {
    emergencyButton.disabled = disabled;
    emergencyButton.textContent = text;
    emergencyButton.style.backgroundColor = disabled ? "#ccc" : "";
    emergencyButton.style.color = disabled ? "#000" : "";
}

function injectSpinnerStyle() {
    if (document.getElementById("spinner-style")) return;

    const style = document.createElement("style");
    style.id = "spinner-style";
    style.innerHTML = `
        .loading-spinner {
            border: 4px solid #eee;
            border-top: 4px solid #523b8d;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function startCooldown() {
    isCooldown = true;
    let countdown = 10;
    setButtonState(true, `Aguardar ${countdown}s`);

    const interval = setInterval(() => {
        countdown--;
        setButtonState(true, `Aguardar ${countdown}s`);

        if (countdown <= 0) {
            clearInterval(interval);
            isCooldown = false;
            setButtonState(false, originalButtonText);
        }
    }, 1000);
}

function showModal() {
    emergencyModal.innerHTML = originalModalHTML;
    emergencyModal.style.display = "flex";
    overlay.style.display = "block";
    body.style.overflow = "hidden";
    attachModalEvents();
}

function closeModal() {
    emergencyModal.style.display = "none";
    overlay.style.display = "none";
    body.style.overflow = "auto";
}

function showLoadingSpinner() {
    emergencyModal.innerHTML = `
        <div class="modal-content">
            <h2>Enviando alerta...</h2>
            <div class="loading-spinner" style="margin: 24px auto;"></div>
        </div>
    `;
    injectSpinnerStyle();
}

function showSuccessMessage() {
    emergencyModal.innerHTML = `
        <div class="modal-content">
            <h2>Alerta de Emergência confirmado</h2>
            <p>Seu alerta de emergência foi enviado com sucesso.</p>
            <button id="closeModal">Fechar</button>
        </div>
    `;

    const closeModalBtn = document.getElementById("closeModal");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            closeModal();
            startCooldown();
        });
    } else {
        startCooldown();
    }
}

function attachModalEvents() {
    const cancelBtn = emergencyModal.querySelector("#cancelEmergency");
    const confirmBtn = emergencyModal.querySelector("#confirmEmergency");

    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            showLoadingSpinner();

            setTimeout(() => {
                showSuccessMessage();
            }, 2000);
        });
    }
}

export function initEmergencyModal() {
    emergencyButton = document.querySelector(".emergency-button");
    emergencyModal = document.querySelector(".emergency-modal");
    overlay = document.querySelector(".overlay");
    body = document.body;

    if (!emergencyButton || !emergencyModal || !overlay) return;

    originalButtonText = emergencyButton.textContent || "Emergência";
    originalModalHTML = emergencyModal.innerHTML;

    emergencyButton.addEventListener("click", () => {
        if (isCooldown) return;
        showModal();
    });

    overlay.addEventListener("click", closeModal);
}
