var fs = require( 'fs' )
var util = require( 'util' )
var XML = require( '..' )
var parser = new XML.Parser()

var filename = process.argv.slice( 2 ).shift()
var file = fs.readFileSync( filename )

var doc = parser.parse( file )

console.log( util.inspect( doc, {
  colors: process.stdout.isTTY,
  depth: null,
}))
