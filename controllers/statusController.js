const { renderWeekCalender, renderPreviousWeek, renderNextWeek } = require('../utils/calender');
const Habit = require('../models/habit')
const currentDate = new Date();
var allHabitsObj = []


async function loadAllHabit() {
    try {
        allHabitsObj = await Habit.find({});
    }
    catch (err) {
        console.log('Error while loading all habits : '+err);
    }
}

async function renderCalender(req, res, currentWeekDates, currentMonth, currentYear) {
    for (const habitObj of allHabitsObj) {
        for (const nthDay of currentWeekDates) {
            if (nthDay != "_") {
                let existingRecord = habitObj.record.find(
                    (record) => record.date.toDateString() === new Date(nthDay).toDateString()
                );
                if (!existingRecord) {
                    habitObj.record.push({ date: nthDay });
                }
            }
        }
        await habitObj.save();
    }
    return res.render("habit", { allHabitsObj, currentWeekDates, currentMonth, currentYear, currentDate });
}

exports.renderCurrentWeek = async function (req, res) {
    await loadAllHabit();
    let [currentWeekDates, currentMonth, currentYear] = renderWeekCalender();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
}

exports.renderPreviousWeek = async function (req, res) {
    let [currentWeekDates, currentMonth, currentYear] = renderPreviousWeek();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
}

exports.renderNextWeek = async function (req, res) {
    let [currentWeekDates, currentMonth, currentYear] = renderNextWeek();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
}