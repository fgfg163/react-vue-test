import {data, columns} from '../data';
import Table from './Table';
export default {
  template: `
<div v-el:table-box class="table-box">
  <div v-el:table-main class="table-main">
    <slot></slot>
  </div>
  <div v-el:table-top class="table-top">
    <slot></slot>
  </div>
  <div v-el:table-left class="table-left">
    <slot></slot>
  </div>
  <div v-el:table-top-left class="table-top-left">
    <slot></slot>
  </div>
</div>

`,
  data() {
    return {
      data: data,
      columns: columns,
      sorter: {
        field: "",
        sort: "",
      },
    }
  },
  computed: {},
  methods: {
    getChildTable(baseDom, find) {
      return $(baseDom).find("table")[0];
    },
    onSortableClick(){
    },
  },
  components: {},
  ready(){
    let tableBox = this.$els.tableBox;
    tableBox.onscroll = e=> {
      let left = e.target.scrollLeft;
      let top = e.target.scrollTop;
      let tableTopLeftBorder = this.$els.tableTopLeft;
      let tableTopLeft = this.getChildTable(this.$els.tableTopLeft);
      let tableLeftBorder = this.$els.tableLeft;
      let tableLeft = this.getChildTable(this.$els.tableLeft);
      let tableTopBorder = this.$els.tableTop;
      let tableTop = this.getChildTable(this.$els.tableTop);
      tableTopLeftBorder.style.left = left + "px";
      tableTopLeftBorder.style.top = top + "px";
      tableTop.style.left = 0 - left + "px";
      tableTopBorder.style.left = left + "px";
      tableTopBorder.style.top = top + "px";
      tableLeft.style.top = 0 - top + "px";
      tableLeftBorder.style.left = left + "px";
      tableLeftBorder.style.top = top + "px";
    }
  },
}
