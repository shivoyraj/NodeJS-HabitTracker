const Habit = require('../models/habit');
const Status = require('../models/status');

// loading all habits and Rending Homepage 
exports.homePage = async function (req, res) {
    let allHabitsObj = [];
    try {
        allHabitsObj = await Habit.find({}).populate('record');
        return res.render("index", { allHabitsObj });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'error': 'something went wrong at server side ' });
    }
}

//Update the status of existing habit based on input url parameters habitId and statusId
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

// For adding new records in Habit db
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

// for deleting existing habit from db
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

