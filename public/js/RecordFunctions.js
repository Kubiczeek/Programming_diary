function deleteRecordQuestion(cardId) {
  document.getElementById("overlayDiv2").style.display = "flex";
  document.getElementById("cardIdNotification").value = cardId;
}

function cancelDeleteNotification() {
  document.getElementById("overlayDiv2").style.display = "none";
}

function exportRecord(id) {
  fetch("/exportRecord", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `export-${id}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => console.error(error));
}
