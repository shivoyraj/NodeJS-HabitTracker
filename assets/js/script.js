const calendar = document.querySelector(".calendar");
const monthEl = calendar.querySelector("#month");
const prevBtn = calendar.querySelector("#prev");
const nextBtn = calendar.querySelector("#next");
var datesEl = calendar.querySelector("#dates");

var currentDay;
const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDateOfLastSunday(today) {
    let dayNo = today.getDay();
    let diff = today.getDate() - dayNo;
    return new Date(today.setDate(diff));
}

function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}


function renderCalendar(date, NoOfDaysToSkipForFirstWeekOfMonth = 0) {

    let dateEntry = ""
    dateEntry += "<tr><td></td>";
    monthEl.innerHTML = monthsName[date.getMonth()] + " " + date.getFullYear();

    let j = 0;
    let val = date.getDate();

    for (; j < NoOfDaysToSkipForFirstWeekOfMonth; j++)
        dateEntry += `<td>_</td>`;

    for (let i = j; i < 7; i++) {
        if (val <= getDaysInMonth(date))
            dateEntry += `<td>${val++}</td>`;
        else
            dateEntry += `<td>_</td>`;
    }

    dateEntry += "</tr>";
    datesEl.innerHTML = dateEntry;
}

prevBtn.addEventListener("click", function () {

    if (currentDay.getDate() == 1) {
        currentDay.setDate(currentDay.getDate() - 1);
        renderCalendar(getDateOfLastSunday(currentDay));
        return;
    }
    else if ((currentDay.getDate() - 7) >= 1) {
        currentDay.setDate(currentDay.getDate() - 7);
    }
    else if ((currentDay.getDate() - 7) < 1) {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    }
    renderCalendar(currentDay, currentDay.getDay());
});

nextBtn.addEventListener("click", function () {

    if (currentDay.getDate() == 1) {
        currentDay = getDateOfLastSunday(currentDay);
        console.log(currentDay)
    }
    else if (getDaysInMonth(currentDay) - currentDay.getDate() < 7) {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1);
        renderCalendar(currentDay, currentDay.getDay());
        return;
    }
    currentDay.setDate(currentDay.getDate() + 7);
    renderCalendar(currentDay, currentDay.getDay());
});


function onload() {
    currentDay = new Date();
    //currentDay = new Date(2023,02,04);
    if (currentDay.getMonth() != getDateOfLastSunday(currentDay).getMonth()) {
        let firstDateOfCurrentMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
        renderCalendar(firstDateOfCurrentMonth, firstDateOfCurrentMonth.getDay());
    }
    else
        renderCalendar(getDateOfLastSunday(currentDay));
}

onload()