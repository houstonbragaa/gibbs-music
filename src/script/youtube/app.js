const API_KEY = "AIzaSyBglfR0C5xZ3mj35VSKUblYVE3Jo1rju2U"; // Sua chave de API
const handle = "@GibbsBR"; // O @username real do canal
const INTERVALO = 60 * 1000; // atualiza em 60s

async function buscarPorHandle() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${handle}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log("Resposta:", data);

    if (!data.items || data.items.length === 0) {
      console.warn("Canal não encontrado com esse handle.");
      return;
    }

    const canal = data.items[0];
    const stats = canal.statistics;
    const listeners = Number(stats.viewCount);

    document.getElementById('streams').textContent = listeners.toLocaleString();
    localStorage.setItem('streams', listeners);

    console.log(`Visualizações: ${Number(stats.viewCount).toLocaleString()}`);
  } catch (err) {
    console.error("Erro:", err);
  }
}

//carrega dados do localStorage

window.addEventListener('load', () => {
  const listeners = localStorage.getItem('streams');
  if (listeners) {
    document.getElementById('streams').textContent = Number(listeners).toLocaleString();
  }

  buscarPorHandle();
  setInterval(buscarPorHandle, INTERVALO);
});
