class Document {

  constructor() {

    // TODO:
    this.xmlVersion = '1.0'
    this.xmlEncoding = 'utf-8'
    this.xmlStandalone = false

    this.documentURI = 'about:blank'
    // this.baseURI = baseURL( this.documentURI )
    // this.URL = this.documentURI // ???

    this.contentType = 'application/xml'

    this.namespaces = new Map()
    this.root = null

  }

  get documentElement() { return this.root }

  get charset() { return this.xmlEncoding }
  get characterSet() { return this.xmlEncoding }

  lookupNamespaceURI( prefix ) {
    return this.namespaces.get( prefix ) || null
  }

  lookupPrefix( uri ) {
    for( var [ key, value ] of this.namespaces )
      if( value === uri ) return key
    return null
  }

}

module.exports = Document
