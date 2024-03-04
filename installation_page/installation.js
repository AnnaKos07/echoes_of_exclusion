const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka3BybHVuYWJ1d2ZmYXh3d3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTQwMDgsImV4cCI6MjAyNDc5MDAwOH0.O5MjYF9Z1_sEgS9zfb7-v_clMTp9lwFR_4hSLHhS7qI";
const url = "https://wdkprlunabuwffaxwwpj.supabase.co";
const database = supabase.createClient(url, key);

//dom elements
const num = document.getElementById("num");
const contentId = document.getElementById("id");
const id = 1;
let tableName = "images";

let counter = 0;
let img_arr = [];

async function fetchData() {
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
const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", async () => {
  //subscribe to changes in the
  database
    .channel(tableName)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: tableName },
      (payload) => {
        // handleInserts(payload.new);
        console.log(payload.new);
        num.innerHTML = payload.new.current_index;
        let id = payload.new.current_index;
        let element = document.getElementById(id);

        let images = document.querySelectorAll("img");
        images.forEach((element) => {
          element.style.display = "none";
        });

        element.style.display = "block";
      }
    )
    .subscribe();

  let { data, error } = await database.from(tableName).select("*");

  let finalData = [];

  if (data && data[0]) num.innerHTML = data[0].current_index;

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

        let image = document.createElement("img");
        image.src = element.c[0].v;
        image.id = i;
        image.style.display = "none";
        body.appendChild(image);
      });

      finalData = img_arr;
    } else {
      console.log("Error!");
    }
  });

  setTimeout(() => {
    console.log(finalData);
  }, 500);
});
