import {data, columns} from '../data';
import vTableBase from './TableBase';
import classnames from 'classnames';
export default {
  template: `
<v-table-base>
<div>
  <table class="table table-striped table-hover table-condensed">
    <thead>
    <tr>
      <th track-by="dataIndexPath" v-for="(index, column) in fullColumns"
           @click="onSortableClick($event,column.sortable,column.dataIndexPath,column)" :class="column.className">
        {{column.title}}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr track-by="key" v-for="lineData in dataShow">
      {{lineData}}
      <td track-by="dataIndexPath" v-for="(index, column) in fullColumns" :class="column.dataClassName">
        {{lineData[column.dataIndexPath]}}        
      </td>
    </tr>
    </tbody>
  </table></div>
</v-table-base>
`,
  data() {
    return {
      data: [],
      columns: columns,
      freeze: [2, 2],
    }
  },
  props: {
    sorter: {},
  },
  computed: {
    dataShow(){
      let dataSource = this.data;
      // 排序
      if (this.sorter && this.sorter.field) {
        let field = this.sorter.field;
        let sort = this.sorter.sort;

        // 将要排序的列提取出来
        dataSource = dataSource.map(e=> {
          let line = e[field] || "";
          e.__sortable = line.replace(/,|%/g, "") * 1;
          return e;
        });

        if (sort == "asc") {
          dataSource = dataSource.sort((a, b)=> {
            return a.__sortable - b.__sortable;
          });
        } else {
          dataSource = dataSource.sort((a, b)=> {
            return b.__sortable - a.__sortable;
          });
        }
      }
      return dataSource;
    },
    fullColumns(){
      let newCol = this.columns.map((e, index)=> {
        let newLine = {...e};
        newLine.className = classnames({
          "sortable": e.sortable ? true : false,
          "sorted": e.sortable && e.dataIndexPath == this.sorter.field ? true : false,
          "sort-asc": e.sortable && e.dataIndexPath == this.sorter.field && this.sorter.sort == "asc" ? true : false,
          "sort-desc": e.sortable && e.dataIndexPath == this.sorter.field && this.sorter.sort == "desc" ? true : false,
          "table-top-left-cell": index < this.freeze[1],
          "table-top-cell": index >= this.freeze[1],
        });
        newLine.dataClassName = classnames({
          "sorted": e.sortable && e.dataIndexPath == this.sorter.field ? true : false,
          "table-left-cell": index < this.freeze[1],
        });
        return newLine;
      });
      console.log(newCol);
      return newCol;
    },

  },
  methods: {
    onSortableClick(e, sortable, field, row){
      console.log(field);
      if (sortable) {
        if (this.sorter.field == row.dataIndexPath && this.sorter.sort == "desc") {
          this.sorter = {
            field: row.dataIndexPath,
            sort: "asc",
          };
        } else {
          this.sorter = {
            field: row.dataIndexPath,
            sort: "desc",
          };
        }
      }
    },
  },
  components: {
    vTableBase,
  },
  ready(){
    setTimeout(()=> {
      this.data = data;
    }, 1000);
  },
}
