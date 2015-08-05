"use strict";

angular.module("ZimilBlog")
.controller("PostViewController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
	$scope.post = { "_id" : "", "title" : "", "contents" : "" };
	$scope.facebook = function(post) {
		post.title = "Sent";
	};

	$http({
		"method" : "GET",
		"url" : "/api/post/" + $routeParams.id
	}).success(function(data) {
		console.log(data);
		$scope.post = data.post;
		if (! data.post.comments) $scope.post.comments = [];
	}).error(function(data) {
		console.log("[Error] Get post failed");
	});
}]);

