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

function createDropdownStatus() {
    let select = document.createElement("select");
    select.setAttribute("id", "task-status");

    // Create options and add them to the select element
    let option1 = document.createElement("option");
    option1.setAttribute("value", "Not done");
    option1.text = "Not done";
    select.appendChild(option1);

    let option2 = document.createElement("option");
    option2.setAttribute("value", "Done");
    option2.text = "Done";
    select.appendChild(option2);

    let option3 = document.createElement("option");
    option3.setAttribute("value", "None");
    option3.text = "None";
    select.appendChild(option3);

    return select;
}


var renderCalendar = async function (date, NoOfDaysToSkipForFirstWeekOfMonth = 0) {


    //rendering started for month -year - day - date
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

    // render started for habit and status
    let HabitEntry = dateEntry
    let allHabits = []
    let response = await (await fetch('/allHabits')).json()
    allHabits = response.habits;
    for (let habit of allHabits) {
        val = date.getDate();
        HabitEntry += `<tr><td>${habit.title}</td>`;
        j = 0;
        for (; j < NoOfDaysToSkipForFirstWeekOfMonth; j++)
            HabitEntry += `<td></td>`;
        for (let i = j; i < 7; i++) {
            if (val++ <= getDaysInMonth(date)) {
                let selectEl = createDropdownStatus();
                let color = habit.status === "Done" ? "#0072C6" : habit.status === "Not done" ? "red" : "gray";
                HabitEntry += `<td><span style="font-size: 3vmin; color: ${color}; font-weight: bold;">${habit.status}</span>`;
                HabitEntry += selectEl.outerHTML;
                HabitEntry += `</td>`;
            }
            else {
                HabitEntry += `<td>_</td>`;
            }
        }
        HabitEntry += `</tr>`;
        val++;

    }
    datesEl.innerHTML += HabitEntry;
}

prevBtn.addEventListener("click", function () {

    datesEl.innerHTML = ""

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

    datesEl.innerHTML = ""

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