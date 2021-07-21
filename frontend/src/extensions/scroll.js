/**
 * src/controllers/scroll.js
 *
 * @class ScrollController
 */


export default class ScrollController{
  setScrollable(element, scrollmarks) {
    this.scrollElement = element;
    this.scrollMarks = this.importScrollMarks();
    // console.log(this.scrollElement, this);
  }

  importScrollMarks() {
    // console.log("this.state.scrollmarks:", this.state.scrollmarks);
  }

  scroll() {
    // console.log("scroll", this);
  }

  wheel() {
    // console.log("wheel", this);
  }
}
