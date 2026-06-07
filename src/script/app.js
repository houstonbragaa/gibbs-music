//slider photos
  const slider = document.getElementById("sliderTrack");
  const slideCount = 3; // imagens reais
  let index = 0;

  function moveSlider() {
    index++;
    slider.style.transition = "transform 1s ease-in-out";
    slider.style.transform = `translateX(-${index * 100}%)`;

    if (index === slideCount) {
      // Quando atinge a imagem clonada (index 3), reseta para a primeira real
      setTimeout(() => {
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        index = 0;
      }, 1000); // tempo deve ser igual ao duration da transição
    }
  }

  setInterval(moveSlider, 3200);



