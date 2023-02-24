const Habit = require('../models/habit');
var allHabitsObj = [];

async function loadAllHabit() {
    try {
        allHabitsObj = await Habit.find({});
    }
    catch (err) {
        console.log('Error while loading all habits : '+err);
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

