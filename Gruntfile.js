"use strict";

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			files: ["Gruntfile.js", "handlers/**/*.js", "models/**/*.js", "routes/**/*.js"],
			options: { node: true }
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.registerTask("default", ["jshint"]);
};

