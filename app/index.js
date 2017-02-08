'use strict';
const chalk = require('chalk');
const Path = require('path');
const yeoman = require('yeoman-generator');
const yosay = require('yosay');

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

    const prompts = [
    ];

    return this.prompt(prompts)
      .then(opts => Object.assign(this.options, opts));
  },

  writing: {

    templates: function () {
      this.fs.copy(
        this.templatePath(),
        this.destinationPath()
      );
    },

    sources: function () {
      const assetPath = 'assets/uswds/';

      // static (generated) assets
      ['css', 'fonts', 'js'].forEach(src => {
        this.fs.copy(
          this._sourcePath('dist/' + src),
          this.destinationPath(assetPath + src)
        );
      });

      // images
      this.fs.copy(
        this._sourcePath('dist/img'),
        this.destinationPath(assetPath + 'images')
      );

      // source files
      this.fs.copy(
        this._sourcePath('src/stylesheets'),
        this.destinationPath('_sass/uswds')
      );
    },

  },

  install: function () {
    this.npmInstall();
  },

  _sourcePath: function(filename) {
    return Path.join(__dirname, '../node_modules/uswds', filename);
  },

  _copy: function(source, dest) {
    return this.fs.copy(
      this.templatePath(source),
      this.destinationPath(dest || source)
    );
  }

});
