const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka3BybHVuYWJ1d2ZmYXh3d3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTQwMDgsImV4cCI6MjAyNDc5MDAwOH0.O5MjYF9Z1_sEgS9zfb7-v_clMTp9lwFR_4hSLHhS7qI";
const url = "https://wdkprlunabuwffaxwwpj.supabase.co";
const database = supabase.createClient(url, key);

let tableName = "images";

async function redirectToSliderPage() {
  let res = await database
    .from(tableName)
    .update({
      status: false,
    })
    .eq("id", 1);
  window.location.href = `slider.html`;
}
