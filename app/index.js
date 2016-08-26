'use strict';
var chalk = require('chalk');
var slugify = require('../lib/slugify');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  // TODO: Add skip install commands and instructions.
  
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('18F static site') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
      },
      {
        type: 'input',
        name: 'appDescription',
        message: 'Write a brief description of your project.',
      },
      {
        type: 'input',
        name: 'appSlug',
        message: 'What is (or will be) your project name on github?',
        default: function(props) {
          return slugify(props.appName);
        }
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: {
    
    git: function () {
      this.fs.copyTpl(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));
    },

    readme: function () {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {
          name: slugify(this.props.appName),
          description: this.props.appDescription
        }
      );
    },

    license: function () {
      this.fs.copyTpl(
        this.templatePath('LICENSE.md'),
        this.destinationPath('LICENSE.md'));
    },

    contributing: function () {
      this.fs.copyTpl(
        this.templatePath('CONTRIBUTING.md'),
        this.destinationPath('CONTRIBUTING.md'),
        {
          name: this.props.appName
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.appName,
          description: this.props.appDescription,
          slug: this.props.appSlug,
        }
      );
    }
  },

  jekyll: function () {

    this.fs.copy(
      this.templatePath('Gemfile'),
      this.destinationPath('Gemfile')
    );

    this.fs.copy(
      this.templatePath('_layouts'),
      this.destinationPath('_layouts')
    );

    this.fs.copy(
      this.templatePath('_includes'),
      this.destinationPath('_includes')
    );

     this.fs.copy(
      this.templatePath('assets'),
      this.destinationPath('assets')
    );

    this.fs.copyTpl(

      this.templatePath('config.yml'),
      this.destinationPath('_config.yml'),
      {
        name: this.props.appName,
        description: this.props.appDescription
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        name: this.props.appName,
        description: this.props.appDescription
      }
    );
  },

  install: function () {
    this.npmInstall();
  },

});
