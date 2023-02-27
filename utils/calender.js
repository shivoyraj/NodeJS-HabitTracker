// declare a variable to hold the current day
var currentDay;

// declare an array of month names to use later
const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function to get the date of the last Sunday for a given date
function getDateOfLastSunday(today) {
    let dayNo = today.getDay();
    let diff = today.getDate() - dayNo;
    let lastSunday = new Date(today);
    lastSunday.setDate(diff);
    return lastSunday;
}

// function to get the number of days in a given month
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// function to get an array of entries for a current week(starts from sunday), current month and current year
// if month is not starting with sunday then NoOfDaysToSkipForFirstWeekOfMonth times skipped for first week
var getRowEntires = function (date, NoOfDaysToSkipForFirstWeekOfMonth = 0) {

    let currentMonth = monthsName[date.getMonth()]
    let currentYear = date.getFullYear();
    let val = date.getDate();
    let currentWeekDates = []

    // populating 7 days date object records in currentWeekDates list
    for (let i = 0; i < 7; i++) {
        // to skip days of first week which are not part of current month.
        if (i < NoOfDaysToSkipForFirstWeekOfMonth) {
            currentWeekDates.push('_');
        }
        // including all date which are part of current week and also part of current month.
        else if (val <= getDaysInMonth(date)) {
            let nthDay = new Date(date.getFullYear(), date.getMonth(), val, 0, 0, 0, 0);
            nthDay.setMinutes(nthDay.getMinutes() - date.getTimezoneOffset());
            nthDay = nthDay.toISOString().slice(0, -1);
            val++;
            currentWeekDates.push(nthDay);
        }
        // to skip days of last week which are not part of current month.
        else {
            currentWeekDates.push('_');
        }
    }
    return [currentWeekDates, currentMonth, currentYear];
}

//will get current week dates
var renderWeekCalender = function (currentDate) {

    currentDay = currentDate;

    //if current date and last sunday are not of same month.[need to display first week of this month start from date 1st]
    if (currentDay.getMonth() != getDateOfLastSunday(currentDay).getMonth()) {
        //get the first date of the current month
        let firstDateOfCurrentMonth = currentDay;
        firstDateOfCurrentMonth.setDate(1);
        //pass it to getRowEntires along with the day of the week it falls on
        return getRowEntires(firstDateOfCurrentMonth, firstDateOfCurrentMonth.getDay());
    }
    //if current date and last sunday are of same month.
    else {
        // Get the last Sunday of the current month and pass it to getRowEntires
        currentDay = getDateOfLastSunday(currentDay);
        return getRowEntires(currentDay);
    }
}

//will get previous week dates
var renderPreviousWeek = function () {

    // Check if the current date is the first day of the month
    if (currentDay.getDate() == 1) {
        //[need to display last week dates for previous month]
        //set the current date to the last day of the previous month
        currentDay.setDate(0);
        //then get the last Sunday of that month and pass it to getRowEntries
        currentDay = getDateOfLastSunday(currentDay);
        return getRowEntires(currentDay);
    }
    // if 7 days back from current date is still in same month (current date is on or after 7th date)
    else if ((currentDay.getDate() - 7) >= 1) {
        //[need to display normally current week]
        // simply reduce current date by 7 and pass on
        currentDay.setDate(currentDay.getDate() - 7);
    }
    // if 7 days back from current date is in previous month (current date is before 7th date)
    else if ((currentDay.getDate() - 7) < 1) {
        //[need to display dates of first week of this month start from date 1st]
        // Set the current date to the first day of the current month and pass on
        currentDay.setDate(1);
    }
    // Pass the modified current date and the day of the week it falls on to getRowEntires
    return getRowEntires(currentDay, currentDay.getDay());
}

//will get next week dates
var renderNextWeek = function () {

    // Check if the current date is the first day of the month
    if (currentDay.getDate() == 1) {
        //first set the current date to the last Sunday of the current month
        currentDay = getDateOfLastSunday(currentDay);
    }
    // if 7day after current date is in next month
    else if (getDaysInMonth(currentDay) - currentDay.getDate() < 7) {
        //set the current date to the first day of the next month
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1);
        //pass it to getRowEntires along with the day of the week it falls on
        return getRowEntires(currentDay, currentDay.getDay());
    }
    // will execute if 7day after current date is still in same month
    // Add 7 days to the current date and pass it to getRowEntires along with the day of the week it falls on
    currentDay.setDate(currentDay.getDate() + 7);
    return getRowEntires(currentDay, currentDay.getDay());
}

module.exports = { renderWeekCalender, renderPreviousWeek, renderNextWeek };