function deleteTagQuestion(cardId) {
  document.getElementById("overlayDiv2").style.display = "flex";
  document.getElementById("overlayDiv2").querySelector(".textt").textContent =
    "Are you sure you want to delete this tag?";
  document.getElementById("cardIdNotification").value = cardId;
  document.querySelector(".formNotificationn").action = "/admin/deleteTag";
}
