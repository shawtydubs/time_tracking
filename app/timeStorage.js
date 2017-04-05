angular.module('timeTracking').service('timeStorage', function ($q) {
    var _this = this;
    
    this.projectData = [];
    this.timesheetData = {};

    // project functions

    this.getProjects = function(callback) {
        chrome.storage.sync.get('project', function(keys) {
            _this.projectData = keys.project;
            console.log('Project data', _this.projectData)
            callback(_this.projectData);
        })
    }

    this.addProject = function(newProject) {
        var id = this.projectData.length + 1;
        var project = {
            id: id,
            name: newProject
        };
        this.projectData.push(project);
        this.syncProject();
    }

    this.removeProject = function(project) {
        this.projectData.splice(this.projectData.indexOf(project), 1);
        this.syncProject();
    }

    this.deleteAllProjects = function() {
        this.projectData = [];
        this.syncProject();
    }

    this.syncProject = function() {
        chrome.storage.sync.set({ project: this.projectData }, function() {
            console.log('Project synced with Chrome');
        });
    }

    // timesheet functions

    this.getTimesheet = function(callback) {
        chrome.storage.sync.get('timesheet', function(keys) {
            _this.timesheetData = keys.timesheet;
            console.log('Timesheet data', _this.timesheetData);
            callback(_this.timesheetData);
        })
    }

    this.submitTimesheet = function(newTime) {
        this.timesheetData = newTime;
        this.syncTimesheet();
    }

    this.syncTimesheet = function() {
        chrome.storage.sync.set({ timesheet: this.timesheetData }, function() {
            console.log('Timesheet synced with Chrome');
        })
    }

    this.clearTimesheet = function() {
        this.timesheetData = {};
        this.syncTimesheet();
    }
});
