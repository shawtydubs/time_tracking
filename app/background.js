//create alarm

chrome.alarms.create('Timesheet Alarm', { delayInMinutes: 60, periodInMinutes: 60 })

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log('Alarm fired', alarm);
    callNotification();
});

// setup notification

chrome.notifications.getPermissionLevel(function(level) {
    console.log('Permission level', level);
});

function callNotification() {
    var noteName = 'Timesheet Notification';
    var options = {
            type: "basic",
            iconUrl: "images/icon.png",
            title: "Timesheet Reminder",
            message: "It's time to fill in your time for the previous hour"
        };

    function notificationLogging(notificationId) {
        console.log("Last error:", chrome.runtime.lastError);
    } 

    chrome.notifications.create(noteName, options, notificationLogging(noteName));
}
