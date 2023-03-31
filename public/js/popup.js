function showPopUp() {
  const popup = document.getElementById("overlayDiv");
  const popup2 = document.getElementById("overlayDiv3");
  popup2.style.display = "none";
  popup.style.display = "block";
}
function returnToMainMenu() {
  const popup = document.getElementById("overlayDiv");
  const popup2 = document.getElementById("overlayDiv3");
  popup.style.display = "none";
  popup2.style.display = "none";
}