const template = document.createElement("template");

template.innerHTML = `
	<link rel="stylesheet" href="css/card.css">
	<div class="record">
	<div class="left">
		<div class="header">
			<span class="cardId">123456</span>
			<span class="recordChild">Date: <span class="date">03/01/2023</span></span>
			<span class="recordChild">Time spent: <span class="timespent">240 min</span></span>
			<span class="recordChild">Rating: <span class="rating">5/5</span></span>
			<span class="recordChild">Language: <span class="language">Lua</span></span>
		</div>
		<div class="footer">
			<span class="description">Udělal jsem počátek tohoto webu :) Vím jsem mega dobrý, že jsem to takto pošéfil, jsem rád že jsem rád a doufám  že jste rádi i vy protože jinka by to bylo špatné. snad tento text nebude overflowouvat ten container protože bych se zase musel dělat s cssUdělal jsem počátek tohoto webu :) Vím jsem mega dobrý, že jsem to takto pošéfil, jsem rád že jsem rád a doufám  že jste rádi i vy protože jinka by to bylo špatné. snad tento text nebude overflowouvat ten container protože bych se zase musel dělat s cssUdělal jsem počátek tohoto webu :) Vím jsem mega dobrý, že jsem to takto pošéfil, jsem rád že jsem rád a doufám  že jste rádi i vy protože jinka by to bylo špatné. snad tento text nebude overflowouvat ten container protože bych se zase musel dělat s css</span>
		</div>
		</div>
		<div class="right">
			<button class="edit">Edit</button>
			<button class="delete">Del</button>
		</div>
	</div>
		`;

class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["date", "spent", "rating", "language", "cardId", "description"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector(".recordChild .date").innerText =
      this.getAttribute("date");
    this.shadowRoot.querySelector(".recordChild .timespent").innerText =
      this.getAttribute("spent") + " min";
    this.shadowRoot.querySelector(".recordChild .rating").innerText =
      this.getAttribute("rating") + "/5";
    this.shadowRoot.querySelector(".recordChild .language").innerText =
      this.getAttribute("language");
    this.shadowRoot.querySelector(".cardId").innerText =
      this.getAttribute("cardId");
    this.shadowRoot.querySelector(".description").innerText = this.getAttribute(
      "description"
    ).replace(new RegExp("&@_@&", "g"), " ");
  }
}

export default Card;
