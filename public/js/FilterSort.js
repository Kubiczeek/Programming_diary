function sortRating() {
  const all = [...document.getElementsByClassName("record")];
  all.sort((a, b) => {
    if (
      a
        .querySelector(".ratingText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "")
        .split("/")[0] >
      b
        .querySelector(".ratingText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "")
        .split("/")[0]
    ) {
      return -1;
    }

    if (
      a
        .querySelector(".ratingText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "")
        .split("/")[0] <
      b
        .querySelector(".ratingText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "")
        .split("/")[0]
    ) {
      return 1;
    }

    return 0;
  });
  const main = document.querySelector(".records");
  for (let item of document.querySelectorAll(".record")) {
    main.removeChild(item);
  }
  all.forEach((item) => {
    main.append(item);
  });
}

function sortTimespent() {
  const all = [...document.getElementsByClassName("record")];
  all.sort((a, b) => {
    if (
      a
        .querySelector(".timespentText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "") >
      b
        .querySelector(".timespentText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "")
    ) {
      return -1;
    }

    if (
      a
        .querySelector(".timespentText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "") <
      b
        .querySelector(".timespentText")
        .textContent.replace(/\t/g, "")
        .replace(/\n/g, "")
    ) {
      return 1;
    }

    return 0;
  });
  const main = document.querySelector(".records");
  for (let item of document.querySelectorAll(".record")) {
    main.removeChild(item);
  }
  all.forEach((item) => {
    main.append(item);
  });
}

function sortLanguage() {
  const all = [...document.getElementsByClassName("record")];
  all.sort((a, b) =>
    a
      .querySelector(".languageText")
      .textContent.toUpperCase()
      .replace(/\t/g, "")
      .replace(/\n/g, "")
      .localeCompare(
        b
          .querySelector(".languageText")
          .textContent.toUpperCase()
          .replace(/\t/g, "")
          .replace(/\n/g, "")
      )
  );
  const main = document.querySelector(".records");
  for (let item of document.querySelectorAll(".record")) {
    main.removeChild(item);
  }
  all.forEach((item) => {
    main.append(item);
  });
}

function sortDate() {
  const all = [...document.getElementsByClassName("record")];
  all.sort((a, b) => {
    const dateInfo = a
      .querySelector(".dateText")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "")
      .split(".");
    const currentDate = new Date(dateInfo[0], dateInfo[1], dateInfo[2]);
    const dateInfo2 = b
      .querySelector(".dateText")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "")
      .split(".");
    const currentDate2 = new Date(dateInfo2[0], dateInfo2[1], dateInfo2[2]);
    if (currentDate.getTime() > currentDate2.getTime()) return -1;
    if (currentDate.getTime() < currentDate2.getTime()) return 1;
    return 0;
  });
  const main = document.querySelector(".records");
  for (let item of document.querySelectorAll(".record")) {
    main.removeChild(item);
  }
  all.forEach((item) => {
    main.append(item);
  });
}

function handleSort(x) {
  switch (x.value) {
    case "Rating":
      sortRating();
      break;
    case "Timespent":
      sortTimespent();
      break;
    case "Language":
      sortLanguage();
      break;
    case "Date":
      sortDate();
      break;
    default:
      break;
  }
}

function filterLanguage() {
  const all = [...document.getElementsByClassName("record")];
  let filterSubject = document.getElementById("FilterLanguage").value;
  all.forEach((card) => {
    if (
      !card
        .querySelector(".languageText")
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
  const fromRatingCheck = 0;
  const toRatingCheck = 5;
  let fromRating =
    parseInt(document.getElementById("FilterRating").value.split(":")[0]) ||
    fromRatingCheck;
  let toRating =
    parseInt(document.getElementById("FilterRating").value.split(":")[1]) ||
    toRatingCheck;
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    const currentRating = card
      .querySelector(".ratingText")
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
    parseInt(document.getElementById("FilterTimespent").value.split(":")[0]) ||
    fromRatingCheck;
  let toRating =
    parseInt(document.getElementById("FilterTimespent").value.split(":")[1]) ||
    toRatingCheck;
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    const currentRating = card
      .querySelector(".timespentText")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "")
      .split(" ")[0];
    if (currentRating >= fromRating && currentRating <= toRating) {
      card.dataset.showt = 1;
    } else {
      card.dataset.showt = 0;
    }
  });
}
function filterDate() {
  let fromDate = document.getElementById("FilterFromDate").value;
  let toDate = document.getElementById("FilterToDate").value;
  if (!toDate || !fromDate) {
  } else {
    const fromDateInfo = fromDate.split("-");
    const toDateInfo = toDate.split("-");
    fromDate = new Date(fromDateInfo[0], fromDateInfo[1], fromDateInfo[2]);
    toDate = new Date(toDateInfo[0], toDateInfo[1], toDateInfo[2]);
  }
  console.log(fromDate, toDate);
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    if (!toDate || !fromDate) {
      card.dataset.showd = 1;
      return;
    }
    const dateInfo = card
      .querySelector(".dateText")
      .textContent.replace(/\t/g, "")
      .replace(/\n/g, "")
      .split(".")
      .reverse();
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
function filterCategory(x) {
  const all = [...document.getElementsByClassName("record")];
  all.forEach((card) => {
    let categories = [];
    card.querySelectorAll(".tagText").forEach((tag) => {
      categories.push(tag.textContent.replace(/\t/g, "").replace(/\n/g, ""));
    });
    if (
      categories.includes(
        x.value.length > 11 ? x.value.substring(0, 8).concat("...") : x.value
      ) ||
      x.value == "None"
    ) {
      card.dataset.showc = 1;
    } else {
      card.dataset.showc = 0;
    }
    if (
      card.dataset.showd == "1" &&
      card.dataset.showt == "1" &&
      card.dataset.showr == "1" &&
      card.dataset.showl == "1" &&
      card.dataset.showp == "1" &&
      card.dataset.showc == "1"
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
      card.dataset.showp == "1" &&
      card.dataset.showc == "1"
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
