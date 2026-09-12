// Fly Gym - Certificati medici / applicazione FlyGym
// Il modulo pubblico salva gli invii nella nuova app e li mette nella coda
// amministrativa "Da verificare" prima di associarli alla scheda atleta.
const FLYGYM_MEDICAL_FORM_URL = "https://flygym-app.onrender.com/certificato-medico";

(function () {
  const frame = document.querySelector('[data-medical-frame]');
  const placeholder = document.querySelector('[data-zoho-medical-placeholder]');
  if (!frame || !placeholder) return;

  frame.src = FLYGYM_MEDICAL_FORM_URL;
  frame.hidden = false;
  placeholder.hidden = true;
})();
