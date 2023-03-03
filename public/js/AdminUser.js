function deleteUserQuestion(cardId) {
  document.getElementById("overlayDiv2").style.display = "flex";
  document.getElementById("overlayDiv2").querySelector(".textt").textContent =
    "Are you sure you want to delete this user?";
  document.getElementById("cardIdNotification").value = cardId;
  document.querySelector(".formNotificationn").action = "/admin/deleteUser";
}

function cancelDeleteNotification() {
  document.getElementById("overlayDiv2").style.display = "none";
}
