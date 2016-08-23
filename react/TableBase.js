import React, {Component, PropTypes} from 'react';

class TableBase extends Component {
  constructor(prop) {
    super(prop);
    this.getChildTable = this.getChildTable.bind(this);
  }

  componentDidMount() {
    this.refs["table-box"].onscroll = e=> {
      let left = e.target.scrollLeft;
      let top = e.target.scrollTop;
      let tableTopLeftBorder = this.refs["table-top-left"];
      let tableTopLeft = this.getChildTable(this.refs["table-top-left"]);
      let tableLeftBorder = this.refs["table-left"];
      let tableLeft = this.getChildTable(this.refs["table-left"]);
      let tableTopBorder = this.refs["table-top"];
      let tableTop = this.getChildTable(this.refs["table-top"]);
      tableTopLeftBorder.style.left = left + "px";
      tableTopLeftBorder.style.top = top + "px";
      tableTop.style.left = 0 - left + "px";
      tableTopBorder.style.left = left + "px";
      tableTopBorder.style.top = top + "px";
      tableLeft.style.top = 0 - top + "px";
      tableLeftBorder.style.left = left + "px";
      tableLeftBorder.style.top = top + "px";
    }
  }

  getChildTable(baseDom, find) {
    return $(baseDom).find("table")[0];
  }

  render() {
    return (
      <div ref="table-box" className="table-box">
        <div ref="table-main" className="table-main">
          {this.props.children}
        </div>
        <div ref="table-top" className="table-top">
          {this.props.children}
        </div>
        <div ref="table-left" className="table-left">
          {this.props.children}
        </div>
        <div ref="table-top-left" className="table-top-left">
          {this.props.children}
        </div>
      </div>

    )
  }
}

export default TableBase;
