var id = "1Kbu0D1wolVaW5bAxslj9mSDvMUgOtVNZTctC2qp2Ssw";
var gid = "0";
var front_data;

var url =
  "https://docs.google.com/spreadsheets/d/" +
  id +
  "/gviz/tq?tqx=out:json&tq&gid=" +
  gid;
fetch(url)
  .then((response) => response.text())
  .then((data) => {
    front_data = JSON.parse(data.substring(47).slice(0, -2));
    console.log(data.substring(47).slice(0, -2));
    console.log(front_data);
  });

console.log(front_data);
console.log("trololololo");
