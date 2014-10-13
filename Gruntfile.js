'use strict';
module.exports = function(grunt) {

  // Dynamically loads all required grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configures the tasks that can be run
  grunt.initConfig({

    // Compiles LESS files to CSS
    less: {
      dev: {
        options: {
          cleancss: true // Minifies CSS output
        },
        files: { 'src/app/css/combined-grunt.min.css': [ 'src/app/less/{,*/}*.less', '!src/app/less/test.less' ] }
      }
    },

    // Adds vendor prefixes to CSS
    autoprefixer: {
      dev: {
        src: 'src/app/css/combined-grunt.min.css'
      }
    },

    // Combines and minifies JS files
    uglify: {
      options: {
        mangle: false,
        compress: true,
        preserveComments: 'some'
      },
      dev: {
        files: {
          'src/app/js/combined-grunt.min.js': [
            'src/app/js/{,*/}*.js',
            '!src/app/js/combined-grunt.min.js'
          ]
        }
      }
    },

    // Checks JS for syntax issues using JSHint
    jshint: {
        dev: {
          options: {
            jshintrc: true,
            reporter: require('jshint-stylish'),
          },
          src: [
            'src/{,*/}*.js',
            'src/app/js/{,*/}*.js',
            '!src/app/js/combined-grunt.min.js'
          ]
        }
    },

    // Watches front-end files for changes and reruns tasks as needed
    watch: {
      styles: {
        files: [ 'src/app/less/{,*/}*.less' ],
        tasks: [ 'less:dev', 'autoprefixer:dev' ],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: [ 'src/app/js/{,*/}*.js', '!app/js/combined*.js' ],
        tasks: [ 'jshint:dev', 'uglify:scripts' ]
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
      } 
    },

    // Watches back-end files for changes, restarts the server
    nodemon: {
      dev: {
        script: 'src/server.js',
        options: {
          env: {
            PORT: 9000
          },
          ext: 'js,ejs,html',
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:9000');
              }, 1000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },

    // Allows us to run watch and nodemon concurrently with logging
    concurrent: {
      dev: {
        tasks: [ 'nodemon:dev', 'watch' ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Adds a comment to the top of a specified file
    testplugin: {
      addnote: {
        options: {
          note: '/* Added with Grunt */'
        },
        src: 'test/src/test.js',
        dest: 'test/result/test.grunt.js'
      }
    },

  });

  // Compiles LESS/JS and checks for todos
  grunt.registerTask('default', [
    'less:dev',
    'autoprefixer:dev',
    'jshint:dev',
    'uglify:scripts',
    'todo'
  ]);

  // Starts a server and runs nodemon and watch using concurrent
  grunt.registerTask('server', [ 'concurrent:dev' ]);

  // Tests the custom plugin
  grunt.registerTask('test', [ 'testplugin' ]);

};
