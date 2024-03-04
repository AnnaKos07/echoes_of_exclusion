let counter = 0;
let img_arr = [];

const supakey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka3BybHVuYWJ1d2ZmYXh3d3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTQwMDgsImV4cCI6MjAyNDc5MDAwOH0.O5MjYF9Z1_sEgS9zfb7-v_clMTp9lwFR_4hSLHhS7qI";
const supaurl = "https://wdkprlunabuwffaxwwpj.supabase.co";
const supadatabase = supabase.createClient(supaurl, supakey);
const contentId = document.getElementById("id");
const id = 1;
let tableName = "images";

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
    loop: true,
    //loopAdditionalSlides: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
  });

  mySwiper.on("transitionEnd", function () {
    var realIndex = mySwiper.realIndex;
    console.log(realIndex);
    updateSupabase(realIndex);
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

async function updateSupabase(index) {
  let res = await supadatabase
    .from(tableName)
    .update({
      current_index: index,
    })
    .eq("id", 1);
}

//function to change the interaction status
async function redirectToInteractionPage() {
  let res = await supadatabase
    .from(tableName)
    .update({
      status: true,
    })
    .eq("id", 1);
  window.location.href = `interaction-page.html`;
}
