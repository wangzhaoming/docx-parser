import BaseTag from './BaseTag';

export default class Paragraph extends BaseTag {
  getDom() {
    let p = document.createElement('p');
    if (this.prop) {
      // deal numbering
      let i = this.prop.getNumbering(this.docNode);
      if (i) {
        let pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(i));
        p.appendChild(pre);
      }
    }

    return p;
  }
}
