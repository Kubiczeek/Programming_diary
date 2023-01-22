stringyfingy = "stringyfying universe baby!!!!";
function FilterLanguage() {
  if (event.keyCode == 13) {
    var all = document.getElementsByClassName("record");
    let filterSubject = document.getElementById("LanguageId").value;
    filterSubject = " " + filterSubject + " ";

    i = 0;

    for (i = 0; i < all.length; i++) {
      if (
        all[i].childNodes[1].childNodes[1].childNodes[9].childNodes[1]
          .childNodes[0].data == filterSubject
      ) {
        console.log("this ones good to go!!");
      } else {
        console.log(
          all[i].childNodes[1].childNodes[1].childNodes[9].childNodes[1]
            .childNodes[0].data
        );

        all[i].remove();
        i = i - 1;
      }
      if (all == null) {
        console.log("false");
      }
    }
  }
}
function FilterRating() {
  if (event.keyCode == 13) {
    let fromRatingCheck = 1;
    let toRatingCheck = 5;
    let fromRating = document.getElementById("RatingFromFilterId").value;
    let toRating = document.getElementById("RatingToFilterId").value;

    if (fromRating == "") {
      fromRating = fromRatingCheck;
    } else {
      fromRating = parseInt(fromRating);
    }
    if (toRating == "") {
      toRating = toRatingCheck;
    } else {
      toRating = parseInt(toRating);
    }

    var all = document.getElementsByClassName("record");
    for (i = 0; i < all.length; i++) {
      CurrentRating =
        all[i].childNodes[1].childNodes[1].childNodes[7].childNodes[1]
          .childNodes[0].data;
      console.log(
        "i = " +
          i +
          " ;;; CurrRating == " +
          CurrentRating +
          "  fromRating == " +
          fromRating +
          "  toRating== " +
          toRating
      );
      x = 0;
      if (CurrentRating > fromRating || CurrentRating == fromRating) {
        if (CurrentRating < toRating || CurrentRating == toRating) {
          console.log("this ratings okay ma boi!!");
          x = x + 1;
        }
      }
      if (x == 0) {
        all[i].remove();
        i = i - 1;
      }
      console.log("x = " + x);
    }
  }
}
function FilterTime() {
  if (event.keyCode == 13) {
    let fromRatingCheck = 0;
    let toRatingCheck = 99999999;
    let fromRating = document.getElementById("TimeFromFilterId").value;
    let toRating = document.getElementById("TimeToFilterId").value;

    if (fromRating == "") {
      fromRating = fromRatingCheck;
    } else {
      fromRating = parseInt(fromRating);
    }
    if (toRating == "") {
      toRating = toRatingCheck;
    } else {
      toRating = parseInt(toRating);
    }

    var all = document.getElementsByClassName("record");
    for (i = 0; i < all.length; i++) {
      CurrentRating =
        all[i].childNodes[1].childNodes[1].childNodes[5].childNodes[1]
          .childNodes[0].data;
      console.log(
        "i = " +
          i +
          " ;;; CurrRating == " +
          CurrentRating +
          "  fromRating == " +
          fromRating +
          "  toRating== " +
          toRating
      );
      x = 0;
      if (CurrentRating > fromRating || CurrentRating == fromRating) {
        if (CurrentRating < toRating || CurrentRating == toRating) {
          console.log("this ratings okay ma boi!!");
          x = x + 1;
        }
      }
      if (x == 0) {
        all[i].remove();
        i = i - 1;
      }
      console.log("x = " + x);
    }
  }
}
function FilterDate() {
  let fromDate = document.getElementById("DateFromFilterId").value;
  let toDate = document.getElementById("DateToFilterId").value;
  fromDateInfo = fromDate.split("-");
  toDateInfo = toDate.split("-");
  fromDate = new Date(fromDateInfo[0], fromDateInfo[1], fromDateInfo[2]);
  toDate = new Date(toDateInfo[0], toDateInfo[1], toDateInfo[2]);

  var all = document.getElementsByClassName("record");
  console.log(all.length);
  for (i = 0; i < all.length; i++) {
    CurrentDate =
      all[i].childNodes[1].childNodes[1].childNodes[3].childNodes[1]
        .childNodes[0].data;
    CurrentDateInfo = CurrentDate.split("-");
    CurrentDate = new Date(
      CurrentDateInfo[0],
      CurrentDateInfo[1],
      CurrentDateInfo[2]
    );

    console.log("_________");

    if (
      CurrentDate.getTime() >= fromDate.getTime() &&
      CurrentDate.getTime() <= toDate.getTime()
    ) {
      console.log(CurrentDate.getTime());
      console.log(toDate.getTime());
      console.log(fromDate.getTime());
      console.log("goood one");
    } else {
      console.log(CurrentDate.getTime());
      console.log(toDate.getTime());
      console.log(fromDate.getTime());
      console.log("removed");

      all[i].remove();
      i = i - 1;
    }
  }
}
