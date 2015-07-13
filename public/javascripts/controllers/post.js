"use strict"

angular.module("ZimilBlog")
.controller("PostController", ["$http", function($http) {
	var controller = this;

	controller.posts = [];

	controller.getPost = function() {
		console.log("Get posts...");
		Auth($http, function(err, authKey) {
			if (err) return;
			$http({
				"method" : "GET",
				"url" : "/api/post",
				"headers" : { "Authorization" : authKey }
			}).success(function(data) {
				console.log(data);
				controller.posts = data.posts;
			}).error(function(data) {
				console.log("[Error] Get posts failed");
			});
		});
	};

	controller.getPost();
}]);

