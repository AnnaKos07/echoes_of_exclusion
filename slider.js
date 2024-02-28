document.addEventListener("DOMContentLoaded", function () {
  // Получение параметров URL
  const urlParams = new URLSearchParams(window.location.search);
  const imgArrParam = urlParams.get("img_arr");

  if (imgArrParam) {
    const imgArr = JSON.parse(decodeURIComponent(imgArrParam));
    createSlider(imgArr);
  }
});

function createSlider(imgArr) {
  // Создание элемента слайдера (например, с использованием библиотеки Swiper)
  const swiperContainer = document.getElementById("swiper-container");
  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");
  swiperContainer.appendChild(swiperWrapper);

  var mySwiper = new Swiper(".swiper-container", {
    // Параметры Swiper
    loop: true, // Бесконечный цикл
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Если вы хотите использовать пагинацию, добавьте этот параметр
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    // },
  });

  imgArr.forEach((imgData) => {
    const imgElement = document.createElement("img");
    imgElement.src = imgData.original_img;

    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.appendChild(imgElement);

    mySwiper.appendSlide(swiperSlide); // Добавление слайда в Swiper
  });
}
