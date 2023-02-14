const Date = require('../models/date');

exports.AddStatus = async function (req, res) {

    const date = new Date(req.params.date);
    const habitTitle = req.params.habitTitle;
    const habitStatus = req.params.habitStatus;

    try {
        let dateObj = await Date.findOne({ date: date });
        if (!dateObj) {
            dateObj = new Date({
                date: date,
                habits: []
            });
        }

        const habit = {
            title: habitTitle,
            status: habitStatus
        };

        dateObj.habits.push(habit);
        await dateObj.save();

        res.status(200).send("Habit added successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong.");
    }
};
