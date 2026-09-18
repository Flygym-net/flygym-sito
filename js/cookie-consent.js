(function () {
  var STORAGE_KEY = "fg-cookie-consent";

  function readConsent() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeConsent(consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (error) {
      // Se il browser blocca lo storage il banner ricompare al prossimo accesso: non è un problema bloccante.
    }
  }

  function buildBanner() {
    var banner = document.createElement("div");
    banner.className = "fg-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Preferenze sui cookie");
    banner.innerHTML =
      '<div class="fg-cookie-inner">' +
      '<p class="fg-cookie-text">Usiamo cookie tecnici, necessari al funzionamento del sito, e - solo con il tuo consenso - cookie di preferenza e statistici. Puoi leggere i dettagli nella <a href="cookie.html">Cookie Policy</a>.</p>' +
      '<div class="fg-cookie-actions">' +
      '<button type="button" class="fg-cookie-btn fg-cookie-customize">Personalizza</button>' +
      '<button type="button" class="fg-cookie-btn fg-cookie-reject">Solo necessari</button>' +
      '<button type="button" class="fg-cookie-btn fg-cookie-accept">Accetta tutti</button>' +
      "</div>" +
      '<div class="fg-cookie-panel" hidden>' +
      '<label class="fg-cookie-option"><input type="checkbox" checked disabled> <span><strong>Necessari</strong><small>Sempre attivi: fanno funzionare il sito.</small></span></label>' +
      '<label class="fg-cookie-option"><input type="checkbox" name="fg-cookie-preference" checked> <span><strong>Preferenza</strong><small>Ricordano le tue scelte di navigazione.</small></span></label>' +
      '<label class="fg-cookie-option"><input type="checkbox" name="fg-cookie-statistics" checked> <span><strong>Statistici</strong><small>Statistiche anonime e aggregate di utilizzo.</small></span></label>' +
      '<button type="button" class="fg-cookie-btn fg-cookie-save">Salva le preferenze</button>' +
      "</div>" +
      "</div>";
    return banner;
  }

  function init() {
    if (readConsent()) {
      return;
    }

    var banner = buildBanner();
    document.body.appendChild(banner);

    var panel = banner.querySelector(".fg-cookie-panel");

    function close(consent) {
      writeConsent(Object.assign({ necessari: true, timestamp: new Date().toISOString() }, consent));
      banner.remove();
    }

    banner.querySelector(".fg-cookie-accept").addEventListener("click", function () {
      close({ preferenza: true, statistici: true });
    });

    banner.querySelector(".fg-cookie-reject").addEventListener("click", function () {
      close({ preferenza: false, statistici: false });
    });

    banner.querySelector(".fg-cookie-customize").addEventListener("click", function () {
      panel.hidden = !panel.hidden;
    });

    banner.querySelector(".fg-cookie-save").addEventListener("click", function () {
      close({
        preferenza: banner.querySelector('[name="fg-cookie-preference"]').checked,
        statistici: banner.querySelector('[name="fg-cookie-statistics"]').checked,
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
