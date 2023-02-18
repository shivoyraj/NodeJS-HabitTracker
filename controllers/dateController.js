const Date = require('../models/date');
const Habit = require('../models/habit')

exports.getStatusByDateIdHabitId = async function(req,res){

    const dateId = req.params.dateId;
    const habitId = req.params.habitId;
    //console.log(dateId +" "+habitId)
    let dateObj;
    let status = "";
    try {
        
        dateObj = await Date.findOne({ _id: dateId})
        dateObj.habits.forEach(habit => {
            //console.log(habit._id+" "+habitId)
            if(habit._id==habitId){
                status = habit.status;
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({'status':'something went wrong at server side'}); 
    }
    return res.status(200).send({'status':status});       
}
