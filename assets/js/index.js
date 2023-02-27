// use to send client current date to avoid timezone conflicts
function redirectToCurrentWeekRecords() {
    const now = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = now.toLocaleString('en-US', { timeZone: userTimeZone });
    console.log(localDate);
    const url = `/status/currentWeekRecords?today=${localDate}`;
    window.location.href = url;
}