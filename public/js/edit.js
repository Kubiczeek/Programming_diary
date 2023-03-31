function editCard(x) {
    const popup = document.getElementById("overlayDiv");
  const popup2 = document.getElementById("overlayDiv3");
  popup.style.display = "none"; 
  popup2.style.display = "block";
    var card;
    for (const c of document.getElementsByClassName("note")) {
      if (c.querySelector(".editbtn") == x) {
        card = c;
        break;
      }
    }
    document.getElementById("text").value = card.querySelector(".text").innerHTML.replace(/\s/g, "");
    document.getElementById("author").value = card.querySelector(".author").innerHTML.replace(/\s/g, "").replace("-","");
    document.getElementById("id").value = card.querySelector(".id").value;
    document.getElementById("color").value = "#DFDC66";
}