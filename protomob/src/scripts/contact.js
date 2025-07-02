export function initTrustedContacts() {
    const form = document.getElementById("addContactForm");
    const list = document.getElementById("trustedContacts");

    if (!form || !list) return;

    let trustedContacts =
        JSON.parse(localStorage.getItem("trustedContacts")) || [];

    function renderContacts() {
        list.innerHTML = "";
        trustedContacts.forEach((contact, index) => {
            const card = document.createElement("div");
            card.classList.add("contact-card");

            card.innerHTML = `
                <div class="contact-info">
                    <strong>${contact.name}</strong>
                    <p>${contact.phone}</p>
                </div>
                <div class="contact-actions">
                    <a href="tel:${contact.phone}" class="call-button">Ligar</a>
                    <button class="edit-button" data-index="${index}" type="button">Editar</button>
                </div>
            `;

            list.appendChild(card);
        });
    }

    function renderEditForm(index) {
        const contact = trustedContacts[index];
        const card = document.createElement("div");
        card.classList.add("contact-card");

        card.innerHTML = `
        <form class="edit-form" data-index="${index}">
            <input type="text" name="name" value="${contact.name}" required />
            <input type="tel" name="phone" value="${contact.phone}" required />
            <div class="edit-form-buttons">
                <button type="submit" class="save-button">Salvar</button>
                <button type="button" class="delete-button">Excluir</button>
            </div>
        </form>
    `;

        return card;
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("contactName");
        const phoneInput = document.getElementById("contactPhone");

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name && phone) {
            trustedContacts.push({ name, phone });
            localStorage.setItem(
                "trustedContacts",
                JSON.stringify(trustedContacts)
            );
            form.reset();
            renderContacts();
        }
    });

    list.addEventListener("click", (e) => {
        // Editar
        if (e.target.classList.contains("edit-button")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            const oldCard = e.target.closest(".contact-card");
            const editFormCard = renderEditForm(index);
            list.replaceChild(editFormCard, oldCard);
        }

        if (e.target.classList.contains("delete-button")) {
            const formEl = e.target.closest("form");
            const index = parseInt(formEl.getAttribute("data-index"));
            trustedContacts.splice(index, 1);
            localStorage.setItem(
                "trustedContacts",
                JSON.stringify(trustedContacts)
            );
            renderContacts();
        }
    });

    list.addEventListener("submit", (e) => {
        if (e.target.classList.contains("edit-form")) {
            e.preventDefault();

            const formEl = e.target;
            const index = parseInt(formEl.getAttribute("data-index"));
            const formData = new FormData(formEl);
            const name = formData.get("name").trim();
            const phone = formData.get("phone").trim();

            if (name && phone) {
                trustedContacts[index] = { name, phone };
                localStorage.setItem(
                    "trustedContacts",
                    JSON.stringify(trustedContacts)
                );
                renderContacts();
            }
        }
    });

    renderContacts();
}
