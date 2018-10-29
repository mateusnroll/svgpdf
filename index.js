
const program     = require('commander')
const path        = require('path')
const fs          = require('fs')
const PDFDocument = require('pdfkit')
const SVGtoPDF    = require('svg-to-pdfkit')
const svgson      = require('svgson')

program
	.version('1.0.0')
	.option('-f, --folder [path]', 'Parse an entire folder')
	.parse(process.argv)

if(!program.folder) {
	console.log('You must provide an input folder\nTerminating')
	process.exit()
}

work(program.folder)

function work(folderPath) {
	const svgs = fs
		.readdirSync(folderPath)
		.filter(e => e.match(/.*\.(svg)/ig))
	
	if(svgs.length < 1) {
		console.log('No SVGs found in %s\nTerminating', folderPath)
		process.exit()
	}

	svgs.forEach(f => makePdf(f, folderPath))
}

function makePdf(file, folderPath) {
	const originPath  = path.join(folderPath, file)
	const destPath    = path.join(folderPath, file.replace('.svg', '.pdf'))
	const fileContent = fs.readFileSync(originPath, 'utf-8')
	const svgData = svgConfig(fileContent)

	//let doc = new PDFDocument({ compress: false, size: [svgData.width, svgData.height] })
	let doc = new PDFDocument({ compress: false, size: [svgData.width, svgData.height], margin: 0 })
	doc.pipe(fs.createWriteStream(destPath))
	SVGtoPDF(doc, fileContent, 0, 0, {})
	doc.end()
}

function svgConfig(svgFile) {
	let width, height

	const svgData = svgson(svgFile, {}, r => {
		width  = parseInt(r.attrs.width)
		height = parseInt(r.attrs.height)
	})

	return {width, height}
}
