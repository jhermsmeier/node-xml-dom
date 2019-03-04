var htmlparser = require( 'htmlparser2' )
var XML = require( './index' )

class XMLParser {

  constructor() {

    this.document = null
    this.currentNode = null
    this.hasOpenTag = false
    this.error = null
    this.parser = new htmlparser.Parser({
      onreset: () => this.onReset(),
      onend: () => this.onEnd(),
      onopentag: ( name, attrs ) => this.onOpenTag( name, attrs ),
      // onattribute: ( name, value ) => this.onAttribute( name, value ),
      ontext: ( text ) => this.onText( text ),
      onclosetag: ( name ) => this.onCloseTag( name ),
    }, {
      xmlMode: true,
      decodeEntities: true,
      lowerCaseTags: true,
      recognizeCDATA: true,
      recognizeSelfClosing: true,
    })

  }

  parse( data ) {

    this.error = null
    this.document = new XML.Document()
    this.parser.parseComplete( data )

    var document = this.document
    this.document = null

    if( this.error ) {
      throw this.error
    }

    return document

  }

  onEnd() {
    // ...
  }

  onReset() {
    this.error = null
  }

  onError( error ) {
    this.error = error
  }

  onOpenTag( name, attrs ) {

    // console.log( 'onOpenTag', name, attrs )

    var node = new XML.Node()

    node.tagName = name
    node.document = this.document.root
    node.parentNode = this.currentNode

    Object.keys( attrs ).forEach(( key ) => {
      node.attributes.set( key, attrs[ key ] )
      if( /^xmlns:/.test( key ) ) {
        this.document.namespaces.set( key.replace( /^xmlns:/, '' ), attrs[ key ] )
      }
    })

    if( this.currentNode ) {
      this.currentNode.childNodes.push( node )
    } else {
      this.document.root = node
    }

    this.hasOpenTag = true
    this.currentNode = node

  }

  onCloseTag( name ) {
    // console.log( 'onCloseTag', name )
    this.hasOpenTag = false
    this.currentNode = this.currentNode ?
      this.currentNode.parentNode : null
  }

  // NOTE: Unused atm, because unreliable
  onAttribute( name, value ) {
    // console.log( 'onAttribute', name, value )
    if( this.hasOpenTag && this.currentNode ) {
      if( this.currentNode.attributes.has( name ) ) {
        console.log( `[WARNING]: Conflicting attribute value on ${this.currentNode.name} for "${name}": "${this.currentNode.attributes.get( name )}" <> "${value}"` )
      }
      this.currentNode.attributes.set( name, value )
    }
  }

  onText( text ) {
    if( this.currentNode ) {
      if( this.currentNode.lastChild instanceof XML.TextNode ) {
        this.currentNode.lastChild.value += text
      } else {
        var node = new XML.TextNode()
        node.value = text
        this.currentNode.childNodes.push( node )
      }
    } else {
      // NOTE: This is caused by whitespace before the document root node
      // console.log( `[WARNING]: Text without current node: "${text}"` )
    }
  }

  onComment( data ) {
    // TODO: Add CommentNode
  }

  onCommentEnd() {

  }

  onCDATAStart() {
    // TODO: Add CDATANode
  }

  onCDATAEnd() {

  }

}

module.exports = XMLParser
