"use strict";

function Auth($http, callback) {
	var authKey = localStorage.getItem("AuthKey");
	if (authKey) return callback(null, authKey);
	$http.post("/api/user/register", { "userId" : "abcd0000-0000-0000-0000-abcd1234abcd" })
		.success(function(data) {
			localStorage.setItem("AuthKey", data.authKey);
			callback(null, data.authKey);
		})
		.error(function(data) {
			callback(new Error("Login failed"));
		});
}

