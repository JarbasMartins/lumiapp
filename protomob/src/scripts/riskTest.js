export function riskTest() {
    const form = document.getElementById("riskTestForm");
    const resultBox = document.getElementById("riskResult");
    const riskLevelText = document.getElementById("riskLevel");

    if (!form || !resultBox || !riskLevelText) {
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let totalScore = 0;
        const formData = new FormData(form);

        for (let value of formData.values()) {
            totalScore += parseInt(value);
        }

        let level = "";
        if (totalScore <= 4) {
            level =
                "Risco Baixo: fique atenta e mantenha seu círculo de apoio informado.";
        } else if (totalScore <= 8) {
            level =
                "Risco Moderado: recomendamos atenção e possível contato com autoridades.";
        } else {
            level =
                "Risco Alto: acione a emergência imediatamente e entre em contato com suas redes de apoio.";
        }

        riskLevelText.textContent = level;
        resultBox.style.display = "block";
    });
}
