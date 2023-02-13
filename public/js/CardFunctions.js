function deleteCard(x) {
  const list = document.getElementsByClassName("record");
  for (let item of list) {
    if (item.querySelector(".deleteRec") == x) {
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", "/deleteRecord");
      form.style.display = "hidden";
      var idItem = document.createElement("input");
      idItem.setAttribute("type", "hidden");
      idItem.setAttribute("name", "id");
      idItem.setAttribute(
        "value",
        item.querySelector(".recordId").textContent.replace(/\t/g, "")
      );
      form.appendChild(idItem);
      document.body.appendChild(form);
      form.submit();
    }
  }
}
