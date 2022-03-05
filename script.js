const rps = localStorage.getItem("score") || false;
const rps_ls = localStorage.getItem("score-ls") || false;

document.getElementById("score-rps").innerText = rps ? rps + " pts" : "";
document.getElementById("score-rps").classList.remove("loader");
document.getElementById("score-rps").classList.add(rps ? "score" : "new");

document.getElementById("score-rps-ls").innerText = rps_ls
  ? rps_ls + " pts"
  : "";
document.getElementById("score-rps-ls").classList.remove("loader");
document.getElementById("score-rps-ls").classList.add(rps_ls ? "score" : "new");
