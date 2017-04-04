'use strict';

const SUBMIT_TIME = 60;

angular.module('timeTracking').controller('timeController', function ($scope, timeStorage) {
    $scope.timeStorage = timeStorage;

    $scope.projectsWithTime = {};

    // project functions

    $scope.$watch('timeStorage.projectData', function() {
        $scope.projectList = $scope.timeStorage.projectData;
    });

    $scope.timeStorage.getProjects(function(data) {
        $scope.projectList = data;
        $scope.$apply();
    });
 
    $scope.addProject = function() {
        console.log('Adding project: ' + $scope.newProject);
        timeStorage.addProject($scope.newProject);
        $scope.newProject = '';
    }

    $scope.removeProject = function(project) {
        timeStorage.removeProject(project);
    }

    $scope.deleteAllProjects = function() {
        console.log('Deleting all projects');
        timeStorage.deleteAllProjects();
    }

    // timesheet functions

    $scope.$watch('timeStorage.timesheetData', function() {
        $scope.timesheetSummary = $scope.timeStorage.timesheetData;
    });

    $scope.timeStorage.getTimesheet(function(data) {
        $scope.timesheetSummary = data;
        $scope.$apply();
    });

    $scope.submitTime = function() {
        for (var t in $scope.projectsWithTime) {
            if ($scope.projectsWithTime.hasOwnProperty(t) && $scope.projectsWithTime[t] == false) {
                delete $scope.projectsWithTime[t];
            }
        }

        var minutes = SUBMIT_TIME / Object.keys($scope.projectsWithTime).length;
        var date = moment().format('YYYY-MM-DD');
        console.log(date);
        var newTime = $scope.timesheetSummary;
        if (!newTime.hasOwnProperty(date)) { newTime[date] = {} };
        console.log(newTime);

        for (var t in $scope.projectsWithTime) {
            if (newTime[date].hasOwnProperty(t)) {
                newTime[date][t] += minutes;
            } else {
                newTime[date][t] = minutes;
            }
        }

        timeStorage.submitTimesheet(newTime);
        $scope.projectsWithTime = {};
    }

    $scope.clearTimesheet = function() {
        console.log('Clearing timesheet');
        timeStorage.clearTimesheet();
    }

    $scope.isEmpty = function(obj) {
        if (Object.keys(obj).length == 0) {
            return true;
        } else {
            return false;
        }
    }
});
