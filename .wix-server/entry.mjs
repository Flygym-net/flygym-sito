const ZOHO_STATS_URL =
  "https://www.zohoapis.eu/creator/custom/info_flygym/Statistiche_pubbliche_FlyGym?publickey=G1wfYQOUumOYqpQnBbAXFeuk1";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=300, s-maxage=300",
};

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: JSON_HEADERS,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/statistiche-flygym") {
      try {
        const zohoResponse = await fetch(ZOHO_STATS_URL, {
          headers: { Accept: "application/json" },
        });

        if (!zohoResponse.ok) {
          return json({ error: "Statistiche non disponibili" }, 502);
        }

        const zohoData = await zohoResponse.json();
        const atleti = Number(zohoData?.result?.atleti);
        const corsiAttivi = Number(zohoData?.result?.corsi_attivi);

        if (!Number.isInteger(atleti) || !Number.isInteger(corsiAttivi)) {
          return json({ error: "Risposta statistiche non valida" }, 502);
        }

        return json({ atleti, corsi_attivi: corsiAttivi });
      } catch (error) {
        return json({ error: "Statistiche non disponibili" }, 502);
      }
    }

    if (env?.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};
