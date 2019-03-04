class Node {

  constructor() {

    this.prefix = null
    this.localName = ''
    this.attributes = new Map()
    this.document = null
    this.parentNode = null
    this.childNodes = []

  }

  get nodeName() {
    return this.prefix ?
      `${this.prefix}:${this.localName}` :
      this.localName
  }

  get name() { return this.nodeName }
  get tagName() { return this.nodeName }

  set tagName( value ) {
    if( value.indexOf( ':' ) ) {
      var [ prefix, name ] = value.split( ':' )
      this.prefix = prefix
      this.localName = name
    } else {
      this.prefix = null
      this.localName = value
    }
  }

  get namespaceURI() {
    return this.getRootNode().namespaces.get( this.prefix )
  }

  get children() {
    return this.childNodes.filter(( node ) => node instanceof XML.Node )
  }

  get childElementCount() {
    return this.children.length
  }

  get firstChild() {
    return this.childNodes.length ?
      this.childNodes[0] : null
  }

  get lastChild() {
    return this.childNodes.length ?
      this.childNodes[ this.childNodes.length - 1 ] :
      null
  }

  // get innerHTML() {}
  // get outerHTML() {}
  get innerText() {
    var innerText = ''
    for( var i = 0; i < this.childNodes.length; i++ ) {
      if( this.childNodes[i] instanceof XML.TextNode ) {
        innerText += this.childNodes[i].value
      } else {
        innerText += this.childNodes[i].innerText
      }
    }
    return innerText
  }

  hasAttibute( name ) { return this.attributes.has( name ) }
  hasAttibutes() { return this.attributes.size > 0 }
  hasChildNodes() { return this.childNodes.length > 0 }
  getRootNode() { return this.document }

}

module.exports = Node
