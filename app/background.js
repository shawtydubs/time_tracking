//create alarm

chrome.alarms.create('Timesheet Notification', { delayInMinutes: 0.1, periodInMinutes: 0.1 })

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log('Alarm fired', alarm);
});

// setup notification

