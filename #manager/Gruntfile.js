module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080,
          base: '../',
          keepalive: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*\\\n *  <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %> <%= pkg.repository %>\n\\*/\n'
      },
      target: {
        files: {
          '../leafage.min.js': ['../leafage.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['connect']);
  grunt.registerTask('min', ['uglify']);
};
