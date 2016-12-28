module.exports = function(grunt) {
  grunt.initConfig({
    // === JavaScript Tasks ===
    // check js files for errors
    jshint: {
      all: ["public/src/js/**/*.js"]
    },
    // minify all js files into app.min.js
    uglify: {
      build: {
        files: {
          "public/dst/js/app.min.js": [
            "public/src/js/**/*.js", // controllers, services and directives
            "public/src/js/*.js" // app.js, app-routes.js
          ]
        }
      }
    },
    // === CSS Tasks ===
    // minify css files into style.min.css
    cssmin: {
      build: {
        files: {
          "public/dst/css/style.min.css": "public/src/css/style.css"
        }
      }
    },
    // === Global Tasks ===
    // watch change css and js files and process above tasks
    watch: {
      css: {
        files: ["public/src/css/**/*.css"],
        tasks: ["cssmin"]
      },
      js: {
        files: ["public/src/js/**/*.js"],
        tasks: ["jshint", "uglify"]
      }
    },
    // restart server on changes
    nodemon: {
      dev: {
        script: "server.js"
      }
    },
    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ["nodemon", "watch"]
    }
  });
  // load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  // register them
  grunt.registerTask('default', ["cssmin", "jshint", "uglify", "concurrent"]);
};
