let dobd;
let dobm;
let doby;

const now = new Date("2024-11-02T00:00");
const year = now.getFullYear();
const date = now.getDate();
const month = now.getMonth() + 1;

const body = document.body;
let dobDate = document.querySelector("#Date");
let dobMonth = document.querySelector("#Month");
let dobYear = document.querySelector("#Year");
let ageDisplayDays = document.querySelector(".ageDayValue");
let ageDisplayMonths = document.querySelector(".ageMonthValue");
let ageDisplayYears = document.querySelector(".ageYearValue");
let dateError = document.querySelector("#dateTargeted");
let monthError = document.querySelector("#monthTargeted");
let yearError = document.querySelector("#yearTargeted");
let redFontError = document.querySelectorAll("label");
let button = document.querySelector("button");
var mediaQuery = window.matchMedia("(width<600px)");
var inputElement=document.querySelectorAll("input")


for(let i=0;i<3;i++){
  inputElement[i].addEventListener("focusin",(event)=>{
    inputElement[i].style.border="1px solid hsl(0, 0%, 0%)"
  })
  inputElement[i].addEventListener("focusout",(event)=>{
    inputElement[i].style.border="1px solid hsl(0, 0%, 86%)"
  })
}




const inputBorderRed=()=>{
  inputElement[0].style.border="1px solid hsl(0, 100%, 67%)"
  inputElement[1].style.border="1px solid hsl(0, 100%, 67%)"
  inputElement[2].style.border="1px solid hsl(0, 100%, 67%)"
}

const inputBorderRevert=()=>{
  inputElement[0].style.border="1px solid hsl(0, 0%, 86%)"
  inputElement[1].style.border="1px solid hsl(0, 0%, 86%)"
  inputElement[2].style.border="1px solid hsl(0, 0%, 86%)"
}

const buttonPlacementAfterError = () => {
  if (mediaQuery.matches) {
    button.style.top = "84%";
  } else {
    button.style.top = "105%";
  }
};

const buttonPlacementNoError = () => {
  if (mediaQuery.matches) {
    button.style.top = "80%";
  } else {
    button.style.top = "105%";
  }
};

const headLabelRed = () => {
  redFontError[0].style.color = "hsl(0, 100%, 67%)";
  redFontError[2].style.color = "hsl(0, 100%, 67%)";
  redFontError[4].style.color = "hsl(0, 100%, 67%)";
  inputBorderRed()
};

const headLabelRevert = () => {
  redFontError[0].style.color = "hsl(0, 1%, 44%)";
  redFontError[2].style.color = "hsl(0, 1%, 44%)";
  redFontError[4].style.color = "hsl(0, 1%, 44%)";
  inputBorderRevert()
};

const removeErrorMessage = () => {
    dateError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";
}

const noDataDueToInputError = () => {
    ageDisplayDays.textContent = "--";
    ageDisplayMonths.textContent = "--";
    ageDisplayYears.textContent = "--";
}

const showError = () => {
  headLabelRed();
  noDataDueToInputError()
  buttonPlacementAfterError();
}

const revertError = () => {
  removeErrorMessage()
  headLabelRevert();
  buttonPlacementNoError();
}


document.querySelector(".button").addEventListener("click", (event) => {
  event.preventDefault();
  dobd = dobDate.value;
  dobm = dobMonth.value;
  doby = dobYear.value;
  ageCalculator(date, month, year, dobd, dobm, doby);
});

let ageCalculator = (date, month, year, dobd, dobm, doby) => {

  let monthPicker = (dobm, doby) => {
    if (
      dobm == 1 ||
      dobm == 3 ||
      dobm == 5 ||
      dobm == 7 ||
      dobm == 8 ||
      dobm == 10 ||
      dobm == 12
    ) {
      return 31;
    } else if (dobm == 4 || dobm == 6 || dobm == 9 || dobm == 11) {
      return 30;
    } else if (dobm == 2) {
      if (doby % 4 == 0) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 31;
    }
  };
  let monthLimit = monthPicker(dobm, doby);

  const correctValueAfterWrong = (dobd, doby, monthLimit, year) => {
    if (dobd <= monthLimit) {
      dateError.textContent = "";
    }
    if (month < 13) {
      monthError.textContent = "";
    }
    if (doby <= year) {
      yearError.textContent = "";
    }
  };
  correctValueAfterWrong(dobd, doby, monthLimit, year);

  let daysCalculator = (date, dobd, doby) => {
    if (date >= dobd) {
      return date - dobd;
    } else {
      var previousMonthPicker = monthPicker(month - 1, doby);
      return (previousMonthPicker - dobd) + date;
    }
  };


  if ((doby == year && dobm >= month) || (doby == year && dobm < month)) {

    if (dobm > month && dobd > monthLimit) {
      dateError.textContent = "Must be a valid date";
      monthError.textContent = "Must be in past";
      showError()
    }
    else if (dobm <= month && dobd > monthLimit) {
      dateError.textContent = "Must be a valid date";
      showError()
    }
    else if (dobm == month && dobd >= date) {

      if (dobd == day) {
        ageDisplayDays.textContent = 0;
        ageDisplayMonths.textContent = 0;
        ageDisplayYears.textContent = 0;
        revertError()
      }
      else {
        dateError.textContent = "Must be in past";
        showError()
      }
    }
    else if (dobm > month && dobd <= monthLimit) {
      if (dobm > 12) {
        monthError.textContent = "Must be a valid month";
        showError()
      }
      else {
        monthError.textContent = "Must be in past";
        showError()
      }
    }
    else if (doby == year) {
      let cuurYearMonth = month - dobm - 1;
      if (dobd <= date) {
        cuurYearMonth += 1;
      }
      let cuurYear = year - doby;
      let cuurYearDays = daysCalculator(day, dobd, doby);
      ageDisplayDays.textContent = cuurYearDays;
      ageDisplayMonths.textContent = cuurYearMonth;
      ageDisplayYears.textContent = cuurYear;
      revertError()
    }
  }

  else if (
    dobd > monthLimit ||
    dobm > 12 ||
    doby > year ||
    dobd < 1 ||
    dobm < 1 ||
    doby < 1
  ) {
    if (dobd > monthLimit || dobd < 1) {
      if(dobd == "") {
        dateError.textContent = "This field is required. (Number)";
        showError()
      }
      else {
        dateError.textContent = "Must be a valid date";
        showError()
      }
    }
    if (dobm > 12 || dobm < 1) {
      if(dobm == "") {
        monthError.textContent = "This field is required. (Number)";
        showError()
      }
      else{
        monthError.textContent = "Must be a valid month";
        showError()
      }
    }
    if (doby > year || doby < 1) {
      if(doby == "") {
        yearError.textContent = "This field is required. (Number)";
        showError()
      }
      else if (doby < 1) {
        yearError.textContent = "Must be a valid year";
        showError()
      }
       else {
        yearError.textContent = "Must be in past";
        showError()
      }
    }
  }
  else {
    let ageYear = (year - 1) - doby;
    let remainingMonth = (12 - dobm) + month;
    let ageDays = daysCalculator(date, dobd, doby);
    if (remainingMonth >= 12) {
      remainingMonth -= 12;

      if(dobm != month || dobd <= date){
        ageYear += 1;
      }
    }

    if (dobd > date) {
      remainingMonth -= 1;
      if (remainingMonth < 0) {
        remainingMonth = 11;
      }
    }

    ageDisplayDays.textContent = ageDays;
    ageDisplayMonths.textContent = remainingMonth;
    ageDisplayYears.textContent = ageYear;
    revertError()
  }

};
