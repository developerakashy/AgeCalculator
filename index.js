let dobd;
let dobm;
let doby;

const date = new Date();
const year = date.getFullYear();
const day = date.getDate();
const month = date.getMonth() + 1;

const body = document.body;
let dobDay = document.querySelector("#Day");
let dobMonth = document.querySelector("#Month");
let dobYear = document.querySelector("#Year");
let ageDisplayDay = document.querySelector(".ageDayValue");
let ageDisplayMonth = document.querySelector(".ageMonthValue");
let ageDisplayYear = document.querySelector(".ageYearValue");
let dayError = document.querySelector("#dayTargeted");
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
// headLabelRevert();


document.querySelector(".button").addEventListener("click", (event) => {
  event.preventDefault();
  dobd = dobDay.value;
  dobm = dobMonth.value;
  doby = dobYear.value;
  ageCalculator(day, month, year, dobd, dobm, doby);
});

let ageCalculator = (day, month, year, dobd, dobm, doby) => {
  var monthPicker = (dobm, doby) => {
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
  var monthLimit = monthPicker(dobm, doby);

  const correctValueAfterWrong = (dobd, doby, monthLimit, year) => {
    if (dobd <= monthLimit) {
      dayError.textContent = "";
    }
    if (month < 13) {
      monthError.textContent = "";
    }
    if (doby <= year) {
      yearError.textContent = "";
    }
  };
  correctValueAfterWrong(dobd, doby, monthLimit, year);

  var daysCalculator = (day, dobd, doby) => {
    if (day > dobd) {
      return day - dobd;
    } else {
      var previousMonthPicker = monthPicker(month - 1, doby);
      return previousMonthPicker - dobd + day;
    }
  };


  if ((doby == year && dobm >= month) || (doby == year && dobm < month)) {
    if (dobm > month && dobd > monthLimit) {
      dayError.textContent = "Must be a valid date";
      monthError.textContent = "Must be in past";
      headLabelRed();
      ageDisplayDay.textContent = "--";
      ageDisplayMonth.textContent = "--";
      ageDisplayYear.textContent = "--";
      buttonPlacementAfterError();
    } else if (dobm <= month && dobd > monthLimit) {
      dayError.textContent = "Must be a valid date";
      headLabelRed();
      ageDisplayDay.textContent = "--";
      ageDisplayMonth.textContent = "--";
      ageDisplayYear.textContent = "--";
      buttonPlacementAfterError();
    } else if (dobm == month && dobd >= day) {
      if (dobd == day) {
        ageDisplayDay.textContent = 0;
        ageDisplayMonth.textContent = 0;
        ageDisplayYear.textContent = 0;
        dayError.textContent = "";
        monthError.textContent = "";
        yearError.textContent = "";
        headLabelRevert();
        buttonPlacementNoError();
      } else {
        dayError.textContent = "Must be in past";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
    } else if (dobm > month && dobd <= monthLimit) {
      if (dobm > 12) {
        monthError.textContent = "Must be a valid month";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      } else {
        monthError.textContent = "Must be in past";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
    } else if (doby == year) {
      let cuurYearMonth = month - dobm - 1;
      if (dobd < day) {
        cuurYearMonth += 1;
      }
      let cuurYear = year - doby;
      let cuurYearDays = daysCalculator(day, dobd, doby);
      ageDisplayDay.textContent = cuurYearDays;
      ageDisplayMonth.textContent = cuurYearMonth;
      ageDisplayYear.textContent = cuurYear;
      dayError.textContent = "";
      monthError.textContent = "";
      yearError.textContent = "";
      headLabelRevert();
      buttonPlacementNoError();
    }
  } else if (
    dobd > monthLimit ||
    dobm > 12 ||
    doby > year ||
    dobd < 1 ||
    dobm < 1 ||
    doby < 1 
  ) {
    if (dobd > monthLimit || dobd < 1) {
      if(dobd == "") {
        dayError.textContent = "This field is required. (Number)";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
      else {
        dayError.textContent = "Must be a valid date";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
    }
    if (dobm > 12 || dobm < 1) {
      if(dobm == "") {
        monthError.textContent = "This field is required. (Number)";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
      else{
        monthError.textContent = "Must be a valid month";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
    }
    if (doby > year || doby < 1) {
      if(doby == "") {
        yearError.textContent = "This field is required. (Number)";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
      else if (doby < 1) {
        yearError.textContent = "Must be a valid year";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }  
       else {
        yearError.textContent = "Must be in past";
        headLabelRed();
        ageDisplayDay.textContent = "--";
        ageDisplayMonth.textContent = "--";
        ageDisplayYear.textContent = "--";
        buttonPlacementAfterError();
      }
    }
  } else {
    let ageYear = year - 1 - doby;
    let remainingMonth = 12 - dobm + month;
    let ageDays = daysCalculator(day, dobd, doby);
    if (remainingMonth > 12) {
      remainingMonth -= 12;
      ageYear += 1;
    }
    if (dobd > day) {
      remainingMonth -= 1;
      if (remainingMonth < 0) {
        remainingMonth = 11;
      }
    }

    
    ageDisplayDay.textContent = ageDays;
    ageDisplayMonth.textContent = remainingMonth;
    ageDisplayYear.textContent = ageYear;
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";
    headLabelRevert();
    buttonPlacementNoError();
  }
};
