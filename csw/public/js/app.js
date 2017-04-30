'use strict';
var d = new Date();
var d = new Date();
var dd = d.getDate();
var mm = d.getMonth()+1; //January is 0!

var yyyy = d.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var d = dd+'/'+mm+'/'+yyyy;
var app = angular.module('starter', ['ngResource', 'ngRoute']);

// app.config(function($routeProvider) {
//   $routeProvider
//     .when("/", {
//       templateUrl: "src/main.html",
//       controller: 'AppController'
//     })
// });

app.controller('AppController', function($scope, $resource) {

  var Project = $resource('/api/socials/:social_id', {
      social_id: '@id'
    },
    // PUT is not a bulid-in http method in ngResource
    {
      update: {
        method: 'PUT'
      }
    }
  )
  // need to declare in first use in side controller
  // unless we cannot access editProject via $scope
  $scope.editProject = {};
  $scope.result = {};
  $scope.socials = Project.query()
  $scope.get = function(id) {
    // bear in function argument = result of Project.get().
    // bear = Project.get({social_id})
    Project.get({
      social_id: id
    }, function(social) {
      $scope.result = result
      console.log(social)
      console.log('result comment = ' + social.comment)
    })
  }
  $scope.edit = function(id) {
    Project.get({
      social_id: id
    }, function(social) {
      $scope.editProject.id = id
      $scope.editProject.comment = social.comment
      $scope.editProject.name = social.name
      $scope.editProject.day = d
      $scope.result = 'Edit Student ' + id
      console.log('result comment = ' +   $scope.result)
      $scope.get(id)
    })
  }
  $scope.update = function(id) {
    if ($scope.editProject.comment != '') {
      Project.update({
        social_id: id
      }, {
        comment: $scope.editProject.comment,
        name: $scope.editProject.name,
        day: d
      });
      $scope.result = 'Project ' + id + ' is updated'
      console.log('result comment = ' +   $scope.result)
      $scope.socials = Project.query();
      $scope.get(id)
    } else {
      $scope.result = 'Please enter updating bear by Select Edit button'
    }
  }
  $scope.delete = function(id) {
    Project.delete({
      social_id: id
    })
    $scope.result = 'Studen ' + id + ' is deleted'
    console.log('result comment = ' +   $scope.result)
    $scope.socials = Project.query();
  }
  $scope.add = function() {
    Project.save({
      comment: $scope.addProject.comment,
      name: $scope.addProject.name,
      page: $scope.addProject.page,
      day: d
    })
    $scope.result = 'Studen ' + id + ' is created'
    console.log('result comment = ' +   $scope.result)
    $scope.socials = Project.query();
  };

  // ======= function for front-end display with Angular ====
  $scope.isEmpty = function(obj) {
    return Object.keys(obj).length == 0;
  }
  $scope.select = function(id, obj) {
    return id == obj.id
  }


});
