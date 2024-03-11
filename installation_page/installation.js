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

const button = document.querySelector("#button");
button.addEventListener("click", () => {
  let audio = document.querySelector("#audio_0");
  audio.play();
});
const elevenLabsApiKey = "a02a0132af07eb22401c954d229af7dc";

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
        let status = payload.new.status;
        let element = document.getElementById("" + id);

        let generated_element = document.getElementById("generated_" + id);

        let choosen_audio = document.getElementById("audio_" + id);

        let images = document.querySelectorAll("img");

        images.forEach((element) => {
          element.style.display = "none";
        });

        element.style.display = "block";
        setTimeout(() => {
          // Постепенно увеличиваем прозрачность изображения до 1 (полностью видимое)
          //element.style.display = "block";
          element.style.opacity = "1";
        }, 500);

        let timeout = null;
        if (status == true) {
          let choosen_audio = document.getElementById("audio_" + id);
          let audios = document.querySelectorAll("audio");
          console.log(choosen_audio);
          clearTimeout(timeout);
          audios.forEach((item) => {
            clearTimeout(timeout);
            item.pause();
            item.currentTime = 0;
          });
          timeout = setTimeout(() => {
            audios.forEach((item) => {
              item.pause();
              item.currentTime = 0;
            });
            choosen_audio.play();
            generated_element.style.display = "block";
            //generated_element.style.opacity = "1";
            setTimeout(() => {
              generated_element.style.opacity = "1";
            }, 700);
          }, 2000);
        } else {
          choosen_audio.stop();
        }
      }
    )
    .subscribe();

  let { data, error } = await database.from(tableName).select("*");

  let finalData = [];

  if (data && data[0]) num.innerHTML = data[0].current_index;

  fetchData().then((jsonData) => {
    if (jsonData) {
      jsonData.table.rows.forEach((element, i) => {
        let image = document.createElement("img");
        image.src = element.c[0].v;
        image.id = i;
        image.style.display = "none";
        image.style.width = "40%";
        //image.style.hight = "90%";
        image.style.margin = "1%";

        let generated_image = document.createElement("img");
        generated_image.src = element.c[2].v;
        generated_image.id = "generated_" + i;
        generated_image.style.display = "none";
        generated_image.style.width = "40%";
        //generated_image.style.hight = "90%";
        generated_image.style.margin = "1%";

        let index = document.createElement("p");
        index.id = "index_" + i;
        index.innerText = element.c[1].v;
        index.style.display = "none";

        document.getElementById("installation-main").appendChild(image);
        document
          .getElementById("installation-main")
          .appendChild(generated_image);
        document.getElementById("installation-main").appendChild(index);
      });

      //finalData = img_arr;
    } else {
      console.log("Error!");
    }
  });
});

// async function readDescription(question) {
//   const text = question;
//   const voiceId = [
//     "UTHZFdXJUSub9PlEkyfN",
//     "89oiFBkqgZRsUAtLdnb8",
//     "ycRPTzvesnk8BHFb0Amw",
//   ];
//   let current_id = voiceId[Math.floor(Math.random() * 3)];
//   console.log(current_id);
//   console.log(text);
//   const headers = new Headers();
//   headers.append("Accept", "audio/mpeg");
//   headers.append("xi-api-key", elevenLabsApiKey);
//   headers.append("Content-Type", "application/json");

//   const body = JSON.stringify({
//     text: text,
//     model_id: "eleven_monolingual_v1",
//     voice_settings: {
//       stability: 0.5,
//       similarity_boost: 0.5,
//     },
//   });

//   try {
//     const response = await fetch(
//       `https://api.elevenlabs.io/v1/text-to-speech/${current_id}/stream`,
//       {
//         method: "POST",
//         headers: headers,
//         body: body,
//       }
//     );

//     if (!response.ok) {
//       console.error(`Error: ${response.status} - ${response.statusText}`);
//       const responseText = await response.text();
//       console.error("Response Text:", responseText);
//       throw new Error("Text to Speech API request failed");
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const audio = new Audio(url);
//     audio.play();
//   } catch (error) {
//     console.error("Error in ElevenLabs TTS API request:", error.message);
//   }
// }
