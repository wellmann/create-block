# Create Block

Node.js CLI script to create Gutenberg blocks for [kwio/gutenberg-blocks](https://github.com/wellmann/kwio-gutenberg-blocks).

```

## Command

* `create-block <name> [options]` - Run custom script to create block with boilerplate code. 

## Creating custom blocks
To create custom blocks run `create-block <name>`. The blocks folder will be created in `src/blocks/<name>` along with the required files and boilerplate code. 

>Note: You have to `npm link` before using this command.

| Flag | Alias | Description |
| :--- | :--- | :--- |
| `--dynamic` | `-d` | A block.php file will be added to the blocks folder.
| `--fullwidth` | `-w` | Make block fullwidth by default.
| `--shared-atts` | `-a` | An attributes.json file will be added to the blocks folder.
| `--critical` | `-c` | Instead of a style.scss a style.critical.scss and an editor.scss file will be added to the blocks folder.
| `--script-js` | `-j` | A script.js file will be added to the blocks folder.
| `--editor-css` | `-e` | An editor.scss file will be added to the blocks folder.
| `--help` | `-h` | Display help for command. 