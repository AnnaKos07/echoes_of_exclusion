// const key =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka3BybHVuYWJ1d2ZmYXh3d3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTQwMDgsImV4cCI6MjAyNDc5MDAwOH0.O5MjYF9Z1_sEgS9zfb7-v_clMTp9lwFR_4hSLHhS7qI";
// const url = "https://wdkprlunabuwffaxwwpj.supabase.co";
// const database = supabase.createClient(url, key);

// //dom elements
// const num = document.getElementById("num");
// const contentId = document.getElementById("id");
// const id = 1;
// let tableName = "images";
// document.addEventListener("DOMContentLoaded", async () => {
//   //subscribe to changes in the
//   database
//     .channel(tableName)
//     .on(
//       "postgres_changes",
//       { event: "*", schema: "public", table: tableName },
//       (payload) => {
//         // handleInserts(payload.new);
//         console.log(payload.new);
//         num.innerHTML = payload.new.current_index;
//       }
//     )
//     .subscribe();

//   //select all data from sensors
//   let { data, error } = await database.from(tableName).select("*");
//   console.log(data[0].current_index);

//   if (data && data[0]) num.innerHTML = data[0].current_index;

//   //send the first data to the dom
//   // handleInserts(data[0]);
// });
