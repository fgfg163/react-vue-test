import React, {Component, PropTypes} from 'react'
import classnames from 'classnames';
import {data, columns} from '../data';

class Table extends Component {
  constructor(props) {
    super(props);
    this.onSortableClick = this.onSortableClick.bind(this);
    this.state = {
      data,
      columns,
    }
  }

  onSortableClick(e, sortable, field, row) {
    if (this.props.sorter.field == row.dataIndexPath && this.props.sorter.sort == "desc") {
      this.props.setSorter({
        sorter: {
          field: row.dataIndexPath,
          sort: "asc",
        }
      });
    } else {
      this.props.setSorter({
        sorter: {
          field: row.dataIndexPath,
          sort: "desc",
        }
      });
    }
  }

  render() {
    let {data:showData, columns}=this.state;

    // 排序
    if (this.props.sorter && this.props.sorter.field) {
      let field = this.props.sorter.field;
      let sort = this.props.sorter.sort;

      // 将要排序的列提取出来
      showData = showData.map(e=> {
        let line = e[field] || "";
        e.__sortable = line.replace(/,|%/g, "") * 1;
        return e;
      });

      if (sort == "asc") {
        showData = showData.sort((a, b)=> {
          return a.__sortable - b.__sortable;
        });
      } else {
        showData = showData.sort((a, b)=> {
          return b.__sortable - a.__sortable;
        });
      }
    }

    return (
      <div>
        <table className="table table-striped table-hover table-condensed">
          <thead>
          <tr>
            {columns.map(item=> {
              return (
                <th key={item.dataIndexPath}
                    onClick={(e)=>this.onSortableClick(e, item.sortable, item.dataIndex, item)}>{item.title}</th>
              );
            })}
          </tr>
          </thead>
          <tbody>
          {showData.map(line=> {
            return (
              <tr key={line.key}>
                {columns.map(col=> {
                  return (
                    <td key={col.dataIndexPath}>
                      {line[col.dataIndexPath]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;
