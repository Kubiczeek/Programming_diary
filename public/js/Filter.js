function filterLanguage() {
  const all = [...document.getElementsByClassName("record")];
  let filterSubject = document.getElementById("LanguageId").value;
  all.forEach((card) => {
    if (
      !card
        .querySelector(".language")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "")
        .toLowerCase()
        .includes(filterSubject.toLowerCase())
    ) {
      card.dataset.showl = 0;
    } else {
      card.dataset.showl = 1;
    }
  });
}
function filterRating() {
  const fromRatingCheck = 1;
  const toRatingCheck = 5;
  let fromRating =
    parseInt(document.getElementById("RatingFromFilterId").value) ||
    fromRatingCheck;
  let toRating =
    parseInt(document.getElementById("RatingToFilterId").value) ||
    toRatingCheck;
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    const currentRating = card
      .querySelector(".rating")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "")
      .split("/")[0];
    if (currentRating >= fromRating && currentRating <= toRating) {
      card.dataset.showr = 1;
    } else {
      card.dataset.showr = 0;
    }
  });
}
function filterTime() {
  const fromRatingCheck = 0;
  const toRatingCheck = 99999999;
  let fromRating =
    parseInt(document.getElementById("TimeFromFilterId").value) ||
    fromRatingCheck;
  let toRating =
    parseInt(document.getElementById("TimeToFilterId").value) || toRatingCheck;
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    const currentRating = card
      .querySelector(".timespent")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "");
    if (currentRating >= fromRating && currentRating <= toRating) {
      card.dataset.showt = 1;
    } else {
      card.dataset.showt = 0;
    }
  });
}
function filterDate() {
  let fromDate = document.getElementById("DateFromFilterId").value;
  let toDate = document.getElementById("DateToFilterId").value;
  if (!toDate || !fromDate) {
  } else {
    const fromDateInfo = fromDate.split("-");
    const toDateInfo = toDate.split("-");
    fromDate = new Date(fromDateInfo[0], fromDateInfo[1], fromDateInfo[2]);
    toDate = new Date(toDateInfo[0], toDateInfo[1], toDateInfo[2]);
  }

  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    if (!toDate || !fromDate) {
      card.dataset.showd = 1;
      return;
    }
    const dateInfo = card
      .querySelector(".date")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "")
      .split("-");
    const currentDate = new Date(dateInfo[0], dateInfo[1], dateInfo[2]);
    if (
      currentDate.getTime() >= fromDate.getTime() &&
      currentDate.getTime() <= toDate.getTime()
    ) {
      card.dataset.showd = 1;
    } else {
      card.dataset.showd = 0;
    }
  });
}

function filterProgrammer(x) {
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    const programmer = card
      .querySelector(".programmer")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "");
    if (x.value == programmer || x.value == "none") {
      card.dataset.showp = 1;
    } else {
      card.dataset.showp = 0;
    }
    if (
      card.dataset.showd == "1" &&
      card.dataset.showt == "1" &&
      card.dataset.showr == "1" &&
      card.dataset.showl == "1" &&
      card.dataset.showp == "1"
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function filterUltra() {
  filterLanguage();
  filterTime();
  filterRating();
  filterDate();
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    if (
      card.dataset.showd == "1" &&
      card.dataset.showt == "1" &&
      card.dataset.showr == "1" &&
      card.dataset.showl == "1" &&
      card.dataset.showp == "1"
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
