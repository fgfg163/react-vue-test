import {data, columns} from '../data';
import vTableBase from './TableBase';
export default {
  template: `
<v-table-base>
<div>
  <table class="table table-striped table-hover table-condensed">
    <thead>
    <tr>
      <th track-by="dataIndexPath" v-for="(index, item) in columns"
           @click="onSortableClick($event,item.sortable,item.dataIndex,item)">
        {{item.title}}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr track-by="key" v-for="lineData in dataShow">
      {{lineData}}
      <td track-by="dataIndexPath" v-for="(index, column) in columns">
        {{lineData[column.dataIndexPath]}}
      </td>
    </tr>
    </tbody>
  </table></div>
</v-table-base>
`,
  data() {
    return {
      data: data,
      columns: columns,
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
  },
  methods: {
    onSortableClick(e, sortable, field, row){
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
    },
  },
  components: {
    vTableBase,
  },
  ready(){

  },
}
