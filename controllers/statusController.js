const { renderWeekCalender, renderPreviousWeek, renderNextWeek } = require('../utils/calender');
const Habit = require('../models/habit');
const Status = require('../models/status');

const currentDate = new Date();

if (process.env.NODE_ENV == 'prod') {
    const localOffset = currentDate.getTimezoneOffset(); // get offset in minutes
    const indiaOffset = -330; // offset in minutes for India time zone
    const indiaTime = new Date(currentDate.getTime() + (localOffset + indiaOffset) * 60 * 1000);
    currentDate.setTime(indiaTime.getTime());
}

console.log('environment ' + process.env.NODE_ENV);

let allHabitsObj = []

//for loading all habits from db
async function loadAllHabits() {
    try {
        allHabitsObj = await Habit.find({}).populate('record');
    } catch (err) {
        console.log('Error while loading all habits : ' + err);
    }
}

//for rendering given week dates to status page
async function renderCalender(req, res, currentWeekDates, currentMonth, currentYear) {
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
    return res.render("status", { allHabitsObj, currentWeekDates, currentMonth, currentYear, currentDate });
}

// getting and rendering all dates of current weeks
exports.renderCurrentWeek = async function (req, res) {
    await loadAllHabits();
    let [currentWeekDates, currentMonth, currentYear] = renderWeekCalender();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
};

// getting and rendering all dates of previous weeks
exports.renderPreviousWeek = async function (req, res) {
    let [currentWeekDates, currentMonth, currentYear] = renderPreviousWeek();
    await loadAllHabits();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
};

// getting and rendering all dates of next weeks
exports.renderNextWeek = async function (req, res) {
    let [currentWeekDates, currentMonth, currentYear] = renderNextWeek();
    await loadAllHabits();
    return renderCalender(req, res, currentWeekDates, currentMonth, currentYear);
};