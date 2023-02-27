const toggleSwitch = document.getElementById('toggle-switch');
const toggleLabel = document.getElementById('currentView');
const weekView = document.getElementById('weekView');
const dayView = document.getElementById('dayView');

// recieve action when clicked on toggle between day view and week view
toggleSwitch.addEventListener('change', (event) => {
    if (event.target.checked) {
        weekView.style.display = 'none';
        dayView.style.display = 'block';
        toggleLabel.innerText = 'Today View';
    } else {
        weekView.style.display = 'block';
        dayView.style.display = 'none';
        toggleLabel.innerText = 'Week View';
    }
});

// send request to make change the status of particular habitID and statusID
async function changeStatus(habitId, statusId) {
    try {
        const updatedHabit = await (await fetch(`/habits/updateStatus/${habitId}/${statusId}`)).json();
        let updateStatusIcon;
        if (updatedHabit.status === 'Done')
            updateStatusIcon = '✅';
        else if (updatedHabit.status === 'Not done')
            updateStatusIcon = '❌';
        else
            updateStatusIcon = '⬜';
        document.getElementById(`${habitId},${statusId}`).innerHTML = updateStatusIcon;
        const element = document.getElementById(`today:${habitId},${statusId}`);
        if (element) {
          element.innerHTML = updateStatusIcon;
        }        
    } catch (error) {
        console.error("An error occurred while updating the status." + error);
    }
}