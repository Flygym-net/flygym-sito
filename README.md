# Fly Gym — sito ufficiale

Questa cartella è l'unica copia operativa del sito pubblicato su `www.flygym.net`.

- Sorgente del sito: questa cartella (`sito`)
- Output Wix: `.wix-deploy`
- Sito Wix collegato: `ce0eca9c-b7ce-42b7-8d61-10f46346425a`
- Repository: `Flygym-net/flygym-sito`

Prima di ogni pubblicazione, conservare le modifiche già presenti nella home e sincronizzare in `.wix-deploy` soltanto i file aggiornati.

## Video hero home

Dal 12 settembre 2026 la home usa `video/ginnastica-artistica-hero-web.mp4`, la versione ottimizzata e predisposta per lo streaming. L'autoplay mobile richiede `autoplay`, `muted`, `playsinline`, `webkit-playsinline` e `preload="auto"`; `js/app.js` forza il caricamento, riprova l'avvio nei primi sei secondi e mantiene lo sblocco su tocco/click finché la riproduzione non è realmente iniziata. Verifica online eseguita: video non in pausa, silenzioso, pronto e con avanzamento regolare.
