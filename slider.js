let counter = 0;
let img_arr = [];
async function fetchData() {
  //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const id = "1Kbu0D1wolVaW5bAxslj9mSDvMUgOtVNZTctC2qp2Ssw";
  const gid = "0";
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.text();
    const jsonData = JSON.parse(data.substring(47).slice(0, -2));
    return jsonData;
  } catch (error) {
    console.error("Error catch:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData().then((jsonData) => {
    if (jsonData) {
      console.log("Data:", jsonData.table.rows);

      jsonData.table.rows.forEach((element, i) => {
        counter++;

        img_arr[i] = {
          original_img: element.c[0].v,
          description: element.c[1].v,
          generated_img: element.c[2].v,
        };
      });
      createSlider(img_arr);
    } else {
      console.log("Error!");
    }
  });
});

function createSlider(imgArr) {
  const swiperContainer = document.getElementById("swiper-container");
  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");
  swiperContainer.appendChild(swiperWrapper);

  var mySwiper = new Swiper(".swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
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
