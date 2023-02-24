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

var getRowEntires = function (date, NoOfDaysToSkipForFirstWeekOfMonth = 0) {

    let currentMonth = monthsName[date.getMonth()]
    let currentYear = date.getFullYear();
    let val = date.getDate();
    currentWeekDates = []

    for (let i = 0; i < 7; i++) {
        if (i < NoOfDaysToSkipForFirstWeekOfMonth) {
            currentWeekDates.push('_');
        } else if (val <= getDaysInMonth(date)) {
            let nthDay = new Date(date.getFullYear(), date.getMonth(), val, 0, 0, 0, 0);
            nthDay.setMinutes(nthDay.getMinutes() - date.getTimezoneOffset());
            val++;
            currentWeekDates.push(nthDay)
        } else {
            currentWeekDates.push('_');
        }
    }
    return [currentWeekDates, currentMonth, currentYear];
}

var renderWeekCalender = function () {
    currentWeekDates = []
    currentDay = new Date();
    if (currentDay.getMonth() != getDateOfLastSunday(currentDay).getMonth()) {
        let firstDateOfCurrentMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
        return getRowEntires(firstDateOfCurrentMonth, firstDateOfCurrentMonth.getDay());
    }
    else
        return getRowEntires(getDateOfLastSunday(currentDay));
}

var renderPreviousWeek = function () {

    if (currentDay.getDate() == 1) {
        currentDay.setDate(currentDay.getDate() - 1);
        return getRowEntires(getDateOfLastSunday(currentDay));
    }
    else if ((currentDay.getDate() - 7) >= 1) {
        currentDay.setDate(currentDay.getDate() - 7);
    }
    else if ((currentDay.getDate() - 7) < 1) {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    }
    return getRowEntires(currentDay, currentDay.getDay());
}

var renderNextWeek = function () {

    if (currentDay.getDate() == 1) {
        currentDay = getDateOfLastSunday(currentDay);
        console.log(currentDay)
    }
    else if (getDaysInMonth(currentDay) - currentDay.getDate() < 7) {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1);
        return getRowEntires(currentDay, currentDay.getDay());
    }
    currentDay.setDate(currentDay.getDate() + 7);
    return getRowEntires(currentDay, currentDay.getDay());
}

module.exports = {renderWeekCalender, renderPreviousWeek, renderNextWeek };