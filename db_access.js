// let counter = 0;
// let img_arr = [];
// async function fetchData() {
//   //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//   const id = "1Kbu0D1wolVaW5bAxslj9mSDvMUgOtVNZTctC2qp2Ssw";
//   const gid = "0";
//   const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

//   try {
//     const response = await fetch(url, { mode: "cors" });
//     const data = await response.text();
//     console.log(response);
//     const jsonData = JSON.parse(data.substring(47).slice(0, -2));
//     console.log("trolololoo");
//     console.log(jsonData);
//     return jsonData;
//   } catch (error) {
//     console.error("Error catch:", error);
//     return null;
//   }
// }

// function redirectToSliderPage() {
//   fetchData().then((jsonData) => {
//     if (jsonData) {
//       console.log("Data:", jsonData.table.rows);

//       jsonData.table.rows.forEach((element, i) => {
//         counter++;

//         img_arr[i] = {
//           original_img: element.c[0].v,
//           description: element.c[1].v,
//           generated_img: element.c[2].v,
//         };
//         console.log(img_arr[i]);
//       });

//       console.log(img_arr);
//       console.log(counter);
//       const queryParams = encodeURIComponent(JSON.stringify(img_arr));
//       window.location.href = `another_slider.html?img_arr=${queryParams}`;
//     } else {
//       console.log("Error!");
//     }
//   });
// }

function redirectToSliderPage() {
  window.location.href = `another_slider.html`;
}
