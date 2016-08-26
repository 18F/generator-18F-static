'use strict';
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = require('yeoman-generator').Base.extend({

  initializing: function () {
    this.pkg = require('../../package.json');

    this.option('skip-install', {
      type: Boolean,
      desc: 'Skip automatic installation of npm dependencies'
    });
  },

  prompting: function () {
    this.log(yosay(
      'So, you want to add ' + chalk.yellow('JS unit tests') + ', eh?'
    ));

    var prompts = [
      {
        type: 'list',
        name: 'framework',
        message: 'Which framework would you like to use?',
        choices: [
          'jasmine',
          'mocha'
        ],
        default: 'mocha'
      },
      {
        type: 'list',
        name: 'assert',
        message: 'Which assertion style would you like to use?',
        choices: [
          'assert',
          'expect',
          'should'
        ],
        default: 'assert'
      },
      {
        type: 'confirm',
        name: 'jsdom',
        message: 'Do your tests require a browser-like DOM environment (jsdom)?',
        default: true
      }
    ];

    var options = this.options;
    return this.prompt(prompts)
      .then(function (opts) {
        Object.assign(options, opts);
      });
  },

  writing: {

    updatePackageJSON: function () {
      var deps = {};
      var framework = this.options.framework;
      var assert = this.options.assert;
      deps[framework] = '*';

      if (assert && assert !== 'assert') {
        deps[assert] = '*';
      }

      if (this.options.jsdom) {
        this.log(chalk.green('adding jsdom!'));
        deps['jsdom'] = '*';
        deps['jsdom-global'] = '*';
      } else {
        this.log(chalk.yellow('no jsdom for you.'));
      }

      var packageJSON = this.destinationPath('package.json');

      // backup the old package.json
      /*
      this.fs.copy(
        packageJSON,
        packageJSON + '.backup'
      );
      */

      this.fs.extendJSON(
        packageJSON,
        {
          'devDependencies': deps,
          'scripts': {
            'test-unit': [
              framework,
              'test/unit/**/*.spec.js'
            ].join(' ')
          }
        }
      );
    },

    createTestDir: function () {

      // copy example library functions to test
      this.fs.copy(
        this.templatePath('lib'),
        this.destinationPath('lib')
      );

      var framework = this.options.framework;
      var assert = this.options.assert;
      var specPath = 'test/unit';

      var frameworkAssertionPath = this.templatePath([
        framework, '-', assert, '/', specPath
      ].join(''));

      var frameworkPath = this.templatePath(
        framework + '/' + specPath
      );

      // FIXME this doesn't work for some reason...
      // maybe this.fs.exists() isn't synchronous?
      var templatePath = this.fs.exists(frameworkAssertionPath)
        ? frameworkAssertionPath
        : frameworkPath;
      this.fs.copy(
        templatePath,
        this.destinationPath(specPath)
      );

      switch (framework) {
        case 'mocha':
          var opts = [];
          if (this.options.jsdom) {
            opts.push('-r', 'jsdom-global/register');
          }
          if (opts.length) {
            this.fs.write(
              this.destinationPath('test/mocha.opts'),
              opts.join(' ')
            );
          }
          break;
      }
    },

  },

  install: function () {
    if (this.options['skip-install'] !== true) {
      this.npmInstall();
    }
  },

});
