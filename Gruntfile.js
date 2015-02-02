/*global module:false*/
module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    bower: {
      dev: {
        dest: 'assets/public/js/lib',
        options: {
          stripJsAffix: true
        }
      }
    },
    copy: {
      bower_styles: {
        expand: true,
        src: ['**/*.css', '**/*.woff', '**/*.ttf', '**/*.svg'],
        dest: 'assets/public/css/lib',
        cwd: 'bower_components',
        filter: 'isFile'
      },
      bower_scripts: {
        expand: true,
        src: ['**/*.js', '**/*.min.js', '**/*.min.js.map'],
        dest: 'assets/public/js/lib',
        cwd: 'bower_components',
        flatten: true,
        filter: 'isFile'
      },
      css: {
        expand: true,
        src: ['**/*.css', '**/*.min.css'],
        dest: 'assets/public/css/',
        cwd: 'assets/css',
        filter: 'isFile'
      }
    },
    jade: {
      dev: {
        src: ['assets/views/**/*.jade'],
        dest: 'assets/public/',
        wrapper: {
          amd: false
        },
        options: {
          client: false,
          pretty: true,
          basePath: 'assets/views/'
        }
      },
      prod: {
        src: ['assets/views/**/*.jade'],
        dest: 'assets/public/',
        wrapper: {
          amd: false
        },
        options: {
          client: false,
          pretty: false,
          basePath: 'assets/views/'
        }
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/public/css'
        }
      },
      prod: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/public/css',
          outputStyle: 'compressed',
          noLineComments: true,
          debugSass: false
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/public/css',
          src: '{,*/}*.css',
          dest: 'assets/public/css'
        }]
      }
    },
    compress: {
      main: {
        options: {
          archive: 'proofood-chrome-extension.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'assets/public',
            src: ['**'],
            dest: ''
          }
        ]
      }
    },
    clean: {
      build: {
        files: [{
          dot: true,
          src: ['assets/public/css', '.tmp', 'assets/public/js/lib']
        }]
      }
    },
    watch: {
      bower: {
        files: ['bower_components/**/*.js'],
        tasks: ['build']
      },
      compass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['compass:dev', 'autoprefixer']
      },
      jade: {
        files: ['assets/views/**/*.jade'],
        tasks: ['jade:dev']
      },
    },
    concurrent: {
      dev: {
        tasks: ['watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      build: {
        tasks: [
          'bower:dev',
          'copy:bower_styles',
          'copy:bower_scripts',
          'copy:css',
          'compass:dev',
          'jade:dev',
          'autoprefixer'
        ]
      }
    }
  });

  grunt.registerTask('build', [
    'clean:build',
    'concurrent:build',
    'compress:main'
  ]);

  grunt.registerTask('default', [
    'build',
    'concurrent:dev',
  ]);

  grunt.registerTask('build:prod', [
  ]);

};