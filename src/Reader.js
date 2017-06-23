import { XML } from './XML.js';
import { Prop } from './Prop.js';

let files = {}; // all files in zip
let prop;

function load(file) {
  let promise = new Promise((resolve, reject) => {
    zip.createReader(new zip.TextReader(file), reader => {
      // get all entries from the zip
      reader.getEntries(entries => {
        if (entries.length) {
          for (let i = entries.length - 1; i >= 0; i--) {
            entries[i].getData(new zip.TextWriter(), data => {
              files[entries[i].filename] = data;
              if (i === 0) {
                resolve();
                reader.close();
              }
            });
          }
        }
      });
    }, error => {
      reject('read file error');
    });
  });

  return promise.then(() => {
    if (!files['word/document.xml']) {
      throw new Error('invalid docx file.');
    }
    return parse();
  });
}

function parse() {
  let data = files['word/document.xml'];
  if (files['word/styles.xml'] && files['word/numbering.xml']) {
    prop = new Prop(files['word/styles.xml'], files['word/numbering.xml']);
  }

  let body = (new XML(data)).query('body');
  let div = document.createElement('div');
  div.classList.add('doc');
  extract(body, div);
  return div;
}

function extract(el, parentDom) {
  for (let item of el.children) {
    switch (item.tagName) {
      case 'p':
        let p = document.createElement('p');
        ppr(item, p);
        parentDom.appendChild(p);
        extract(item, p);
        break;
      case 'r':
      case 'hyperlink':
        let r = document.createElement('pre');
        parentDom.appendChild(r);
        extract(item, r);
        break;
      case 't':
        let t = document.createTextNode(item.text);
        parentDom.appendChild(t);
        break;
      case 'tab':
        let tab = document.createTextNode('\t');
        parentDom.appendChild(tab);
        break;
      case 'tbl':
        let tbl = document.createElement('table');
        parentDom.appendChild(tbl);
        extract(item, tbl);
        break;
      case 'tr':
        let tr = document.createElement('tr');
        parentDom.appendChild(tr);
        extract(item, tr);
        break;
      case 'tc':
        let td = document.createElement('td');
        td.setAttribute('colspan', item.queryAttr(':scope>tcPr>gridSpan@val'));
        parentDom.appendChild(td);
        extract(item, td);
        break;
    }
  }
}

/**
 * evaluate styles and numbering
 */
function ppr(node, el) {
  if (!prop) {
    return;
  }
  // deal numbering
  let i = prop.getNumbering(node);
  if (i) {
    let pre = document.createElement('pre');
    pre.appendChild(document.createTextNode(i));
    el.appendChild(pre);
  }
}

export { load };
