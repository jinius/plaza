"use strict"

angular.module("ZimilBlog", ["ngRoute"])
.config(function($routeProvider) {
	$routeProvider.when("/post", {
		templateUrl : "templates/post.html",
		controller : "PostController",
		controllerAs : "postCtrl"
	})
	.when("/post/new", {
		templateUrl : "templates/post-create.html",
		controller : "PostNewController",
		controllerAs : "postNewCtrl"
	})
	.when("/post/:id", {
		templateUrl : "templates/post-view.html",
		controller : "PostViewController",
		controllerAs : "postViewCtrl"
	});
});

