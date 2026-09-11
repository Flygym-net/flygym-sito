// Fly Gym - Certificati medici / Zoho Creator
// Inserire qui SOLO l'URL pubblico "form-embed" del form Zoho Creator Certificati Medici.
// Non inserire password, token OAuth o chiavi API nel sito.
const FLYGYM_ZOHO_MEDICAL_FORM_EMBED_URL = "https://creatorapp.zohopublic.eu/info_flygym/flygym/form-embed/Certificati_Medici/dtfDZzbWkPU323ndeTnRgGqfwAGTg5VSRMrxfB1bzkFa4p10K30s20KEEO5v9D6dfvFzjWU8xm4QWUYvWBtYbKB2ONpj1kbSeU5r";

(function () {
  const frame = document.querySelector('[data-zoho-medical-frame]');
  const placeholder = document.querySelector('[data-zoho-medical-placeholder]');
  if (!frame || !placeholder) return;

  const src = FLYGYM_ZOHO_MEDICAL_FORM_EMBED_URL.trim();
  if (!/^https:\/\/creatorapp\.zohopublic\.eu\//i.test(src)) return;

  const url = new URL(src);
  const fieldWidth = Math.max(140, Math.min(360, frame.clientWidth < 600 ? frame.clientWidth - 48 : frame.clientWidth - 185)) + 'px';
  const appearance = {
    zc_Header: 'false', zc_BgClr: '_101016', zc_BdrClr: '_101016',
    zc_LblFont: 'Arial', zc_LblFontClr: '_f5f5f7', zc_LblFontSize: '15px',
    zc_InpClr: '_20202a', zc_InpFieldFont: 'Arial', zc_InpFieldFontClr: '_ffffff',
    zc_InpFieldFontSize: '16px', zc_InpFieldHeight: '44px',
    zc_FtrClr: '_101016', zc_BtnBgClr: '_ff6f1d', zc_BtnClr: '_101016',
    zc_BtnFont: 'Arial', zc_BtnFontSize: '14px',
    zc_BtnMovrBgClr: '_ff8e4d', zc_BtnMovrClr: '_101016',
    zc_SubmitVal: 'Invia certificato', zc_ResetVal: 'Cancella',
    zc_SuccMsg: 'Certificato ricevuto. Grazie, il documento è stato inviato a Fly Gym.'
  };
  if (frame.clientWidth < 600) Object.assign(appearance, {
    zc_LblWidth: '110px', zc_LblFontSize: '13px',
    zc_InpWidth: fieldWidth, zc_InpFieldWidth: fieldWidth,
    zc_TextAreaWidth: fieldWidth, zc_TextAreaHeight: '56px',
    zc_DateWidth: fieldWidth, zc_DropDownWidth: fieldWidth
  });
  Object.entries(appearance).forEach(([key, value]) => url.searchParams.set(key, value));
  frame.src = url.toString();
  frame.hidden = false;
  placeholder.hidden = true;
})();
