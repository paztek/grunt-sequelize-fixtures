/*
 * grunt-sequelize-fixtures
 * https://github.com/paztek/grunt-sequelize-fixtures
 *
 * Copyright (c) 2014 Matthieu Balmes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var fixtures = require('sequelize-fixtures');

    grunt.registerMultiTask('sequelize_fixtures', 'Grunt task for loading some JSON fixtures with Sequelize', function() {
        var done = this.async();
        var options = this.options();
        var db = options.db();
        var files = options.files;
        var models = {};
        for (var i = 0; i < options.models.length; i++) {
            var model = options.models[i];
            models[model] = db[model];
        }
        var fixtures = require('sequelize-fixtures');
        fixtures.loadFiles(files, models, function(err) {
            if (err) {
                grunt.log.err('Error while loading the fixtures : ' + err);
                return done();
            }
            grunt.log.ok('Fixtures loaded');
            done();
        });
    });

};
