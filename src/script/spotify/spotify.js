//codigo para manutenção e refatoração
//desativado

async function extractDominantColor(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < data.length; i += 4 * 100) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      r = Math.floor((r / count) * 0.4);
      g = Math.floor((g / count) * 0.4);
      b = Math.floor((b / count) * 0.4);

      resolve(
        `linear-gradient(135deg, rgb(${r},${g},${b}) 20%,rgb(22, 22, 22) 90%)`,
      );
    };
  });
}

async function main() {
  const response = await fetch("/.netlify/functions/latest-track");
  const data = await response.json();

  if (!data.trackId) {
    throw new Error("Track ID não encontrado");
  }

  const iframe = document.getElementById("spotify-iframe");
  const loader = document.getElementById("load");
  iframe.src = `https://open.spotify.com/embed/track/${data.trackId}?theme=0`;

  iframe.onload = function () {
    iframe.style.display = "block";
    loader.style.display = "none";
  };

  if (data.albumImage) {
    const bgGradient = await extractDominantColor(data.albumImage);
    const container = document.getElementById("player-container");
    container.style.background = bgGradient;
  }
}

main().catch((e) => {
  console.error(e);
  alert("Erro ao carregar dados do Spotify.");
});
