// message from cathrine
// const express = require("express");
// const fetch = require("node-fetch");

// const app = express();
// const port = 3000;

// const id = "1Kbu0D1wolVaW5bAxslj9mSDvMUgOtVNZTctC2qp2Ssw";
// const gid = "0";
// const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

// app.use(express.json());

// app.get("/data", async (req, res) => {
//   try {
//     const response = await fetch(url); // Замените на ваш URL
//     const data = await response.json();
//     res.send(data); // Отправляем данные как ответ
//     console.log(data);
//   } catch (error) {
//     console.error("Ошибка:", error);
//     res.status(500).json({ error: "Ошибка при получении данных" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Прокси-сервер запущен на порту ${port}`);
// });

let img_arr = [];

async function fetchData() {
  //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const id = "1Kbu0D1wolVaW5bAxslj9mSDvMUgOtVNZTctC2qp2Ssw";
  const gid = "0";
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

  try {
    const response = await fetch(url, { mode: "cors", method: "GET" });
    const data = await response.text();
    console.log(response);
    const jsonData = JSON.parse(data.substring(47).slice(0, -2));
    console.log("trolololoo");
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error catch:", error);
    return null;
  }
}

function redirectToSliderPage() {
  fetchData().then((jsonData) => {
    if (jsonData) {
      console.log("Data:", jsonData.table.rows);

      jsonData.table.rows.forEach((element, i) => {

        img_arr[i] = {
          original_img: element.c[0].v,
          description: element.c[1].v,
          generated_img: element.c[2].v,
        };
        console.log(img_arr[i]);
      });

      console.log(img_arr);
      const queryParams = encodeURIComponent(JSON.stringify(img_arr));
      window.location.href = `another_slider.html?img_arr=${queryParams}`;
    } else {
      console.log("Error!");
    }
  });
}
