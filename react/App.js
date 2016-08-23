import React, {Component, PropTypes} from 'react'
import Table from './Table';
import TableBase from './TableBase';

class App extends Component {
  constructor(props) {
    super(props);
    this.setSorter = this.setSorter.bind(this);
    this.state = {
      sorter: {
        field: "",
        sort: "",
      },
    };
  }

  setSorter({sorter:{field, sort}}) {
    this.setState({
      sorter: {
        field,
        sort,
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <TableBase>
                <Table sorter={this.state.sorter} setSorter={this.setSorter}></Table>
              </TableBase>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
