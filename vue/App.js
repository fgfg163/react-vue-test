import {data, columns} from '../data';
import vTable from './Table';
export default {
  template: `
<div class="row">
  <div class="col-md-12">
    <div class="panel panel-default">
      <div class="panel-body">
        <v-table :sorter="sorter"></v-table>
      </div>
    </div>
  </div>
</div>
`,
  data() {
    return {
      sorter: {
        field: "",
        sort: "",
      },
    }
  },
  computed: {},
  methods: {},
  components: {
    vTable,
  },
  ready(){

  },
}
