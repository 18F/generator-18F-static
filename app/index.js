'use strict';
var chalk = require('chalk');
var slugify = require('../lib/slugify');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');

    // TODO: Add arguments, commands, and usage instructions

    this.option('skip-install', {
      type: Boolean,
      desc: 'Do not automatically install npm dependencies',
      default: false
    });
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('18F static site') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your site or project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Write a brief description of your project.'
      },
      {
        type: 'input',
        name: 'slug',
        message: 'What is (or will be) the short name ("slug") or your project on github?',
        default: function(opts) {
          return slugify(opts.name);
        }
      }
    ];

    var options = this.options;
    return this.prompt(prompts)
      .then(function (opts) {
        Object.assign(options, opts);
      });
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
          name: slugify(this.options.name),
          description: this.options.description
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
          name: this.options.name
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          name: this.options.name,
          description: this.options.description,
          slug: this.options.slug,
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
        name: this.options.name,
        description: this.options.description
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        name: this.options.name,
        description: this.options.description
      }
    );
  },

  install: function () {
    if (this.options['skip-install'] !== true) {
      this.npmInstall();
    }
  },

});
