function deleteRecordQuestion(cardId) {
  document.getElementById("overlayDiv2").style.display = "flex";
  document.getElementById("cardIdNotification").value = cardId;
}

function cancelDeleteNotification() {
  document.getElementById("overlayDiv2").style.display = "none";
}