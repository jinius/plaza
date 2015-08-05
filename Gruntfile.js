"use strict";

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			server: {
				src: ["Gruntfile.js", "handlers/**/*.js", "models/**/*.js", "routes/**/*.js", "test/**/*.js"],
				options: {
					node: true,
					mocha: true
				}
			},
			client: {
				src: ["public/javascripts/**/*.js"],
				options: {
					browser: true,
					globalstrict: true,
					globals: {
						angular: true,
						console: true
					}
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.registerTask("default", ["jshint"]);
};

