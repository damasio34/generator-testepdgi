// var Generator = require('yeoman-generator');
// module.exports = class extends Generator {};

var Generator = require('yeoman-generator');
module.exports = class extends Generator {};

'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.generators.Base.extend({
//Configurations will be loaded here.

//Ask for user input
prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }, function(answers) {
      this.props = answers
      this.log(answers.name);
      done();
    }.bind(this));
  },

  //Writing Logic here
  writing: {

	//Copy the configuration files
	config: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					name: this.props.name,
					version: this.props.version
				}
			);
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'), {
					name: this.props.name,
					version: this.props.version
				}
			);
			// this.fs.copy(
			// 	this.templatePath('bowerrc'),
			// 	this.destinationPath('.bowerrc')
			// );
		},

	//Copy application files
	app: function() {
		//Server file
		this.fs.copyTpl(
			this.templatePath('_index.html'),			
			this.destinationPath('_index.html'), {
				name: this.props.name,
				version: this.props.version
			}
		);
		/////css
		this.fs.copy(
			this.templatePath('_css/_goldenlayout.css'),
			this.destinationPath('css/goldenlayout.css')
		);
		
		/////js
		this.fs.copy(
			this.templatePath('_js/_datatables.js'),
			this.destinationPath('js/datatables.js')
		);
		this.fs.copy(
			this.templatePath('_js/_echarts.js'),
			this.destinationPath('js/echarts.js')
		);
		this.fs.copy(
			this.templatePath('_public/_js/_goldenlayout.js'),
			this.destinationPath('public/js/goldenlayout.js')
		);
	},

    //Install Dependencies
	install: function() {
		this.installDependencies();
	}
  },
});