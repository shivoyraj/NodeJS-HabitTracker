const Habit = require('../models/habit');
const Status = require('../models/status');
var allHabitsObj = [];

async function loadAllHabit() {
    try {
        allHabitsObj = await Habit.find({}).populate('record');
        console.log(allHabitsObj);
    } catch (err) {
        console.log('Error while loading all habits : ' + err);
    }
}

exports.homePage = async function (req, res) {
    try {
        await loadAllHabit();
        return res.render("index", { allHabitsObj });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'error': 'something went wrong at server side ' });
    }
}

exports.updateHabitStatus = async function (req, res) {
    try {
        const { habitId, statusId } = req.params;
        const record = await Status.findOne({ habit: habitId, _id: statusId });
        if (!record) {
            return res.status(404).json({ error: "Status/Habit not found" });
        }
        record.status = record.status === "Not done" ? "None" : record.status === "None" ? "Done" : "Not done";
        await record.save();
        res.json({ 'status': record.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'error': 'something went wrong at server side ' });
    }
}


exports.createHabit = async function (req, res) {
    try {
        const newHabit = new Habit({ title: req.body.habitName });
        const habit = await newHabit.save();
        console.log('habit added in db successfully : ' + habit);
        return res.redirect("/");
    } catch (err) {
        console.log('error while adding new habit : ' + err);
        res.status(500).json({ 'error': 'something went wrong at server side ' });
    }
};

exports.deleteHabit = async function (req, res) {
    try {
        const id = req.params.habitId;
        await Habit.findByIdAndDelete(id);
        await Status.deleteMany({ habit: id });
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'error': 'something went wrong at server side ' });
    }
};

