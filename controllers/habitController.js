const { renderWeekCalender, renderPreviousWeek, renderNextWeek } = require('../utils/calender');
const Habit = require('../models/habit')
const currentDate = new Date();
var allHabitsObj = []

async function loadAllHabit() {
    try {
        allHabitsObj = await Habit.find({});
    }
    catch (err) {
        console.log(err);
    }
}

exports.homePage = async function (req, res) {
    await loadAllHabit();
    return res.render("index", { allHabitsObj });
}

exports.updateHabitStatus = async function (req, res) {

    try {
        const habit = await Habit.findById(req.params.habitId);
        const record = habit.record.id(req.params.statusId);
        if (!record) {
            return res.status(404).json({ error: "Record not found" });
        }
        record.status = record.status === "Not done" ? "None" : record.status === "None" ? "Done" : "Not done";
        await habit.save();
        res.json({ 'status': record.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'error': 'something went wrong at server side ' });
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

exports.createHabit = (req, res) => {
    const newHabit = new Habit({ title: req.body.habitName });
    newHabit.save((err, habit) => {
        if (err)
            console.log('error while adding new habit : ' + err);
        else
            console.log('habit added in db successfully : ' + habit);
        return res.redirect("/");
    });
};

exports.deleteHabit = (req, res) => {
    const id = req.params.habitId;
    Habit.findByIdAndDelete(id, () => {
        return res.redirect("/");
    });
};

