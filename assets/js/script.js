// var getStatus = async function(dateId,habitId){
//     console.log(dateId,habitId);
//     let data =  await(await fetch(`/date/${dateId}/${habitId}`)).json()
//     // console.log(data)
// }

async function changeStatus(habitId, statusId) {
    try {
        const updatedHabit = await (await fetch(`/updateStatus/${habitId}/${statusId}`)).json();
        if (updatedHabit.status === 'Done')
            document.getElementById(`${habitId},${statusId}`).innerHTML =  '✅';
        else if (updatedHabit.status === 'Not done')
            document.getElementById(`${habitId},${statusId}`).innerHTML = '❌';
        else
            document.getElementById(`${habitId},${statusId}`).innerHTML = '⬜';
    } catch (error) {
        console.error(error);
        alert("An error occurred while updating the status.");
    }
}
