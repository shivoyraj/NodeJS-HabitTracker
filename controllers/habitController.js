const Habit = require("../models/habit");

exports.homePage = (req, res) => {
    Habit.find({}, (err, habits) => {
        if (err) {
            return res.render("error", { error: err });
        }
        return res.render("index", { habits });
    });
}

exports.AddHabitPage = (req, res) => {
    Habit.find({}, (err, habits) => {
        if (err) {
            return res.render("error", { error: err });
        }
        return res.render("habit", { habits });
    });
}

exports.getHabits = (req, res) => {
    Habit.find({}, (err, habits) => {
        if (err) {
            return res.render("error", { error: err });
        }
        return res.render("index", { habits });
    });
};

exports.createHabit = (req, res) => {

    const newHabit = new Habit(
        {
            title: req.body.habitName,
            status: req.body.status
        }
    );

    newHabit.save((err, habit) => {
        if (err) {
            return res.render("error", { error: err });
        }
        return res.redirect("/");
    });
};

exports.updateHabit = (req, res) => {
    const { id, status } = req.body;
    Habit.findByIdAndUpdate(id, { status }, { new: true }, (err, habit) => {
        if (err) {
            return res.render("error", { error: err });
        }
        return res.redirect("/habits");
    });
};

exports.deleteHabit = (req, res) => {
    const { id } = req.body;
    Habit.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.render("error", { error: err });
        }
        return res.redirect("/habits");
    });
};

