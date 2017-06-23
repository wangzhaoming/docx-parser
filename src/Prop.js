import { XML } from './XML.js';

class Prop {
  constructor(styles, numbering) {
    this.styles = new XML(styles);
    this.numbering = new XML(numbering);
    this.counter = {};
  }

  getNumbering(node) {
    let numpr = node.query(':scope>pPr>numPr');
    if (!numpr) {
      let sid = node.queryAttr(':scope>pPr>pStyle@val');
      if (!sid) {
        return;
      }
      let style = this.styles.query('style[*|styleId="' + sid +'"]');
      numpr = style.query(':scope>pPr>numPr');
    }
    if (!numpr) {
      return;
    }

    let ilvl = numpr.queryAttr('ilvl@val') || '0';
    let numid = numpr.queryAttr('numId@val');

    let num = this.numbering.query('num[*|numId="' + numid + '"]');
    let abstractNum = this.numbering.query('abstractNum[*|abstractNumId="' + num.queryAttr('abstractNumId@val') + '"]');

    let lvl = abstractNum.query('lvl[*|ilvl="' + ilvl + '"]');
    let start = lvl.queryAttr('start@val');

    let numfmt = lvl.queryAttr('numFmt@val');
    if (numfmt === 'none') {
      return;
    }
    if (numfmt === 'bullet') {
      return '\u2022 ';
    }

    this.counter[ilvl] = this.counter[ilvl] === undefined ? parseInt(start) : this.counter[ilvl] + 1;

    for (let i in this.counter) {
      if (parseInt(i) > parseInt(ilvl)) {
        delete this.counter[i];
      }
    }

    let lvlText = lvl.queryAttr('lvlText@val');
    let lvlOverride = num.query('lvlOverride[*|ilvl="' + ilvl + '"]');
    if (lvlOverride) {
      this.counter[ilvl] = parseInt(lvlOverride.queryAttr('startOverride@val'));
    }
    lvlText = lvlText.replace(/%(\d)/g, (match, p1) => {
      if (parseInt(p1) === parseInt(ilvl) + 1) {
        return this.counter[ilvl];
      }
      if (parseInt(p1) <= parseInt(ilvl)) {
        return this.counter[parseInt(p1) - 1 + ''];
      }
      return '';
    });

    return lvlText + ' ';
  }
}

export { Prop };
