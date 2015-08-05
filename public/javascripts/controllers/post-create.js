"use strict";

angular.module("ZimilBlog")
.controller("PostNewController", ["$http", "$location", function($http, $location) {
	var controller = this;

	controller.newPost = {};

	controller.post = function() {
		Auth($http, function(err, authKey) {
			if (err) return;
			var data = controller.newPost;
			$http({
				"method" : "POST",
				"url" : "/api/post",
				"headers" : { "Authorization" : authKey },
				"data" : data
			}).success(function(data) {
				$location.path("/post");
			}).error(function(data) {
				console.log("[Error] New posts failed");
			});
		});
	};
}]);

