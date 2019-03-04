var XML = module.exports

XML.TextNode = class Text {
  constructor() {
    this.value = ''
  }
}

XML.Node = require( './node' )
XML.Document = require( './dom' )
XML.Parser = require( './parser' )
XML.DOMHandler = require( './htmlparser-handler' )
