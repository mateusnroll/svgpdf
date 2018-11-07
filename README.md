# Transform SVGs into PDFs

Take SVG files and make them PDFs using the terminal.

### Installing
Make sure you have NodeJS installed. Then install `svgpdf`

```
$ sudo npm install -g svgpdf
```

### Converting a folder of SVG files
Generates a PDF file for each file with the `.svg` extension for an entire folder. It ignores files that does not have the `.svg` extension.

```
$ svgpdf -f ./folder-location
```

### Help with development
Found a bug? Want to help? You can:
- [Open an issue](https://github.com/mateusnroll/svgpdf/issues/new)
- Make a pull request