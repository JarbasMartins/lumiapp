export function showMessage(msg, duration = 3000) {
    let messageModal = document.getElementById("message-modal");

    if (!messageModal) {
        messageModal = document.createElement("div");
        messageModal.id = "message-modal";
        Object.assign(messageModal.style, {
            position: "fixed",
            top: "20px",
            right: "0%",
            transform: "translateX(-10%)",
            backgroundColor: "#333",
            color: "#fff",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "1rem",
            zIndex: "10000",
            display: "none",
        });
        document.body.appendChild(messageModal);
    }

    messageModal.textContent = msg;
    messageModal.style.display = "block";
    setTimeout(() => {
        messageModal.style.display = "none";
    }, duration);
}
