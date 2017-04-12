//create alarm

chrome.alarms.create('Timesheet Alarm', { delayInMinutes: 30, periodInMinutes: 30 })

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log('Alarm fired:', alarm);
    callNotification();
});

// setup notification

chrome.notifications.getPermissionLevel(function(level) {
    console.log('Notification permission:', level);
});

function callNotification() {
    var noteName = 'Timesheet Notification';
    var options = {
            type: "basic",
            iconUrl: "images/icon.png",
            title: "Timesheet Reminder",
            message: "It's time to fill in your time for the previous half hour"
        };

    function notificationLogging(notificationId) {
        if (chrome.runtime.lastError) {
            console.log('Last Error:', chrome.runtime.lastError);
        } else {
            console.log('Notification Fired:', notificationId);
        }
    } 

    chrome.notifications.create(noteName, options, notificationLogging(noteName));
}
