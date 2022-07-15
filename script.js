const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector(".xclose");
const form = document.querySelector(".form");
const input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("clicked");
});
