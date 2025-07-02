import {
    initAuthToggle,
    prevPageNavigation,
    initNavigation,
    screensNavigation,
} from "./scripts/navigation.js";
import { initAuth } from "./scripts/firebase/auth.js";
import { initEmergencyModal } from "./scripts/ui/modal.js";
import { riskTest } from "./scripts/riskTest.js";
import { initTrustedContacts } from "./scripts/contact.js";

document.addEventListener("DOMContentLoaded", () => {
    initAuthToggle();
    initNavigation();
    screensNavigation();
    initAuth();
    initEmergencyModal();
    riskTest();
    prevPageNavigation();
    initTrustedContacts();
});
