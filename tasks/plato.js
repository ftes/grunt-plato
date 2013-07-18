/*
 * grunt-plato
 * https://github.com/jsoverson/grunt-plato
 *
 * Copyright (c) 2013 Jarrod Overson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var plato = require('plato'),
    fs = require('fs');

  grunt.registerMultiTask('plato', 'Generate static analysis charts with plato', function() {

    var options = this.options({
      jshint: {},
      complexity: {
        newmi : true
      }
    });

    if (options.jshint && !options.jshint.options) {
      options.jshint = {
        options : options.jshint,
        globals : options.jshint.globals || {}
      };
      delete options.jshint.options.globals;
    }

    if (options.excludeFromFile) {
      options.exclude = (function() {
        var ignore = grunt.file.read(options.excludeFromFile),
          files = ignore.split('\n'),
          regex = '',
          file;

        for (var i = 0, n = files.length; i < n; i++) {
          file = files[i];
          file = file.replace('/', '\\/').replace('.', '\\.');
          regex += file + '|';
        }

        regex = regex.substr(0, regex.length - 2);
        return new RegExp(regex);
      })();
    }

    var done = this.async();

    plato.inspect(this.filesSrc, this.files[0].dest, options, function(){
      done();
    });

  });

};
