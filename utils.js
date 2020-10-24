/* eslint no-console: 0 */

'use strict';

// External dependencies.
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const cwd = process.cwd();

module.exports = {

  /**
   * Get first part of this plugins PHP namespace.
   */
  getPrefix: function () {
    const namespace = this.getNamespace();
    const prefix = namespace.split('\\');

    if (prefix[0]) {
      return prefix[0];
    }

    return null;
  },

  getNamespace: function () {
    const bootstrapPhpLines = fs
      .readFileSync(cwd + '/bootstrap.php')
      .toString()
      .split('\n');
    let namespace = '';

    bootstrapPhpLines.forEach((line) => {
      if (line.indexOf('namespace') >= 0) {
        namespace = line.replace('namespace ', '');
      }
    });

    return namespace;
  },

  /**
   * Convert kebab case name to capitalized words separated by underscores.
   */
  formClassName: function (name, sep = '') {
    let className = name.replace('-', ' ');
    className = this.ucWords(className);

    return className.replace(' ', sep);
  },

  ucWords: function(string) {
    return string.replace(/^(.)|\s+(.)/g, ($1) => $1.toUpperCase());
  }
};