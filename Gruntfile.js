module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.initConfig({
    shell: {
      options: {
        stderr: false
      },
      directory: {
        command: 'ls'
      }
    },
    nodemon: {
      dev: {
        script: 'index.js'
      }
    },
    concat: {
      dist: {
        src: ['client/scripts/**/*.js'],
        dest: 'client/dist/app.dist.js',
      },
    },
  });
 
grunt.registerTask('default', ['concat']);

};