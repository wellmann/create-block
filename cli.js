#!/usr/bin/env node
/* eslint no-console: 0 */
//
// Create new block with predefned structure.
//

'use strict';

// External dependencies.
const arg = require('arg');
const chalk = require('chalk');
const ejs = require('ejs');
const fs = require('fs');

// Local dependencies.
const utils = require('./utils');

try {
  const cwd = process.cwd();

  if (!process.argv[2]) {
    throw new Error('Please specify the blocks name.');
  }

  const blocksDir = '/src/blocks';
  const blockName = process.argv[2].toString().replace(/\s+/g, '-').toLowerCase();
  const blockDir = `${cwd}${blocksDir}/${blockName}`;
  const flags = {
    '--dynamic': Boolean,
    '--fullwidth': Boolean,
    '--shared-atts': Boolean,
    '--critical': Boolean,
    '--script-js': Boolean,
    '--editor-css': Boolean,
    '--help': Boolean
  };
  const aliases = {
    '-d': '--dynamic',
    '-w': '--fullwidth',
    '-a': '--shared-atts',
    '-c': '--critical',
    '-j': '--script-js',
    '-e': '--editor-css',
    '-h': '--help'
  };
  const descriptions = {
    '-d': 'A block.php file will be added to the blocks folder.',
    '-w': 'Make block fullwidth by default.',
    '-a': 'An attributes.json file will be added to the blocks folder.',
    '-c': 'Instead of a style.scss a style.critical.scss and an editor.scss file will be added to the blocks folder.',
    '-j': 'A script.js file will be added to the blocks folder.',
    '-e': 'An editor.scss file will be added to the blocks folder.',
    '-h': 'Display help for command.'
  };
  const args = arg({ ...flags, ...aliases });

  if (args['--help']) {
    console.log('Usage:', 'create-block <name> [options]', '\n');
    console.log('Options:');
    Object.keys(aliases).map((alias) => {
      console.log(alias + ',', aliases[alias].padEnd(14), descriptions[alias]);
    });
    process.exit();
  }

  if (fs.existsSync(blockDir)) {
    throw new Error('This block already exists.');
  }

  fs.mkdirSync(blockDir);

  const files = [
    'block.js',
    'style.scss',
    'view.php'
  ];

  if (args['--dynamic']) {
    files.push('block.php');
  }

  if (args['--shared-atts']) {
    files.push('attributes.json');
  }

  if (args['--critical']) {
    const index = files.indexOf('style.scss');
    files[index] = 'style.critical.scss';
  }

  if (args['--script-js']) {
    files.push('script.js');
  }

  if (args['--critical'] || args['--editor-css']) {
    files.push('editor.scss');
  }

  const data = {
    isFullwidth: args['--fullwidth'],
    isCritical: args['--critical'],
    hasEditorCss: args['--critical'] || args['--editor-css'],
    hasAttributesJson: args['--shared-atts'],
    blockTitle: utils.formClassName(blockName, ' '),
    blockSlug: 'block-' + blockName,
    pluginNamespace: utils.getNamespace(),
    blockClass: utils.formClassName(blockName)
  };

  files.map((file) => {
    ejs.renderFile(__dirname + `/templates/${file}.ejs`, data, {}, (err, str) => {
      if (err) {
        throw new Error(err.message);
      }

      fs.writeFileSync(`${blockDir}/${file}`, str);
    });
  });

  console.log(chalk.green.inverse(' Success ') + ' ' + chalk.green('Block has been successfully created.'));
  console.log(chalk.white('Block has been created at: ') + chalk.grey(blockDir));
} catch (err) {
  console.log(chalk.red.inverse(' Error ') + ' ' + chalk.red(err.message));
  process.exit(1);
}