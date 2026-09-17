# Fly Gym — sito ufficiale

Questa cartella è l'unica copia operativa del sito pubblicato su `www.flygym.net`.

## Pubblicazione su Render (settembre 2026)

Il sito passa da Wix a Render come Static Site, nello stesso account dell'app `flygym-app` ma come servizio separato.

- Comando di build: `node scripts/build-render.mjs` — copia in `dist/` solo pagine, `css`, `js`, `images`, `video`, `downloads`, `prova-gratuita` e `robots.txt`, lasciando fuori i file tecnici di Wix e le note `.md`.
- Cartella pubblicata: `dist`.
- Anteprima sul computer, identica a Render: `node scripts/serve.mjs` e poi http://localhost:4300.
- Ogni commit su `main` pubblica il sito da solo.
- I numeri della home (atleti e corsi attivi) arrivano da `https://flygym-app.onrender.com/api/public/statistiche-flygym`: su Wix li forniva `.wix-server/entry.mjs` leggendoli da Zoho.
- Il modulo richieste e il caricamento del certificato medico arrivano dall'app, che li lascia incorporare solo nelle pagine del sito FlyGym.

Nel trasloco del dominio `flygym.net` vanno mantenuti i record della posta Zoho (MX, SPF, DKIM, DMARC) di `info@flygym.net`, che l'app usa anche per le email alle famiglie.

## Pubblicazione su Wix (fino al trasloco)

- Sorgente del sito: questa cartella (`sito`)
- Output Wix: `.wix-deploy`
- Sito Wix collegato: `ce0eca9c-b7ce-42b7-8d61-10f46346425a`
- Repository: `Flygym-net/flygym-sito`

Prima di ogni pubblicazione, conservare le modifiche già presenti nella home e sincronizzare in `.wix-deploy` soltanto i file aggiornati.

## Video hero home

Dal 12 settembre 2026 la home usa `video/ginnastica-artistica-hero-web.mp4`, la versione ottimizzata e predisposta per lo streaming. L'autoplay mobile richiede `autoplay`, `muted`, `playsinline`, `webkit-playsinline` e `preload="auto"`; `js/app.js` forza il caricamento, riprova l'avvio nei primi sei secondi e mantiene lo sblocco su tocco/click finché la riproduzione non è realmente iniziata. Verifica online eseguita: video non in pausa, silenzioso, pronto e con avanzamento regolare.
