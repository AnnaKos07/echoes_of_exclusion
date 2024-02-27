var id = "1Kbu0D1wolVaW5bAxslj9mSDvMUgOtVNZTctC2qp2Ssw";
var gid = "0";
let front_data;
let img_arr = [];
let counter = 0;

function redirectToSliderPage() {
  // Redirect to the slider page
  window.location.href = "slider_page.html";
}

// Data from Google Sheets
async function fetchData() {
  const id = "1Kbu0D1wolVaW5bAxslj9mSDvMUgOtVNZTctC2qp2Ssw";
  const gid = "0";
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    const jsonData = JSON.parse(data.substring(47).slice(0, -2));
    return jsonData;
  } catch (error) {
    console.error("Error catch:", error);
    return null;
  }
}

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

    console.log(img_arr);
    console.log(counter);
  } else {
    console.log("Error!");
  }
});
