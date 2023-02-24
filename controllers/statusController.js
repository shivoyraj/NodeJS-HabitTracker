const { renderWeekCalender, renderPreviousWeek, renderNextWeek } = require('../utils/calender');
const Habit = require('../models/habit');
const Status = require('../models/status');
const currentDate = new Date();
let allHabitsObj = []

async function loadAllHabits() {
    try {
        allHabitsObj = await Habit.find({}).populate('record');
        console.log(allHabitsObj[0].record[0]);
    } catch (err) {
        console.log('Error while loading all habits : ' + err);
    }
}

async function renderCalender(req, res, currentWeekDates, currentMonth, currentYear) {
    //console.log(currentWeekDates);
    for (const habitObj of allHabitsObj) {
        for (const nthDay of currentWeekDates) {
            if (nthDay != "_") {
                const existingRecord = await Status.findOne({ habit: habitObj._id, date: nthDay }).exec();
                if (!existingRecord) {
                    const newStatus = await Status.create({ habit: habitObj._id, date: nthDay });
                    await newStatus.save();
                    habitObj.record.push(newStatus);
                }
            }
        }
        await habitObj.save();
    }
    return res.render("habit", { allHabitsObj, currentWeekDates, currentMonth, currentYear, currentDate });
}


exports.renderCurrentWeek = async function (req, res) {
    await loadAllHabits();
    let [currentWeekDates, currentMonth, currentYear] = renderWeekCalender();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
};

exports.renderPreviousWeek = async function (req, res) {
    let [currentWeekDates, currentMonth, currentYear] = renderPreviousWeek();
    await loadAllHabits();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
};

exports.renderNextWeek = async function (req, res) {
    let [currentWeekDates, currentMonth, currentYear] = renderNextWeek();
    await loadAllHabits();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
};