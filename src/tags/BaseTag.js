export default class BaseTag {
  constructor(docNode, prop) {
    this.docNode = docNode;
    this.prop = prop;
  }

  getDom() {
    throw new Error('Do not use the super class of tags.');
  }
}
