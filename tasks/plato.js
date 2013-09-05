/*
 * grunt-plato
 * https://github.com/jsoverson/grunt-plato
 *
 * Copyright (c) 2013 Jarrod Overson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var plato = require('plato');

  grunt.registerMultiTask('plato', 'Generate static analysis charts with plato', function() {

    var options = this.options({
      jshint: {},
      jshintrc: '',
      complexity: {
        newmi : true
      }
    });

    if (options.jshintrc) {
      options.jshint = grunt.file.readJSON(grunt.config.process(options.jshintrc));
    }

    if (options.jshint && !options.jshint.options) {
      options.jshint = {
        options : options.jshint,
        globals : options.jshint.globals || {}
      };
      delete options.jshint.options.globals;
    }

    var done = this.async();

    plato.inspect(this.filesSrc, this.files[0].dest, options, function(){
      done();
    });

  });

};
