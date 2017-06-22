class XML {
  constructor(data) {
    if (data instanceof Node) {
      this.data = data;
    } else if (typeof data  === 'string') {
      let oParser = new DOMParser();
      let oDOM = oParser.parseFromString(data, "text/xml");
      this.data = oDOM.documentElement;
    } else {
      throw new Error('error create XML');
    }
  }

  query(selector) {
    let el = this.data.querySelector(selector);
    if (el) {
      return new XML(el);
    }
    return null;
  }

  queryAll(selector) {
    let nodes = this.data.querySelectorAll(selector);
    let result = [];
    for (let item of nodes) {
      result.push(new XML(item));
    }
    return result;
  }

  queryAttr(selector) {
    let [s, a] = selector.split('@');
    let node = this.data;
    if (s) {
      node = node.querySelector(s);
    }
    if (node) {
      return node.getAttribute('w:' + a);
    }
    return null;
  }

  get children() {
    let nodes = this.data.children;
    let result = [];
    for (let item of nodes) {
      result.push(new XML(item));
    }
    return result;
  }

  get tagName() {
    return this.data.localName;
  }

  get text() {
    return this.data.textContent;
  }
}

export { XML };
