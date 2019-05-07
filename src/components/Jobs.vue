<template>
  <div class="view">
    <b-table class="table table-striped table-bordered table-hover"
      :busy="isBusy"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage">
      <div slot="table-busy" class="text-center my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </b-table>
    <b-row>
      <b-col md="6" class="my-1">
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      class="my-0"
    ></b-pagination>
  </b-col>
</b-row>

  </div>
</template>

<script>
export default {
  name: "Jobs",
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    async refresh() {
      this.isBusy = true;
      const data = await fetch("api/queue/request/jobs");
      const items = await data.json();
      this.items.length = 0;
      this.items.push(...items);

      this.totalRows = this.items.length;

      this.isBusy = false;
    }
  },
  mounted() {
    this.refresh();
  },
  data() {
   return {
     totalRows: 1,
     currentPage: 1,
     perPage: 5,
     pageOptions: [5, 10, 15],
     isBusy: false,
     fields: {
       id: {
         label: 'Job',
         sortable: true
       },
       data: {
         label: 'Data',
         sortable: false
       }
     }
   }
 }
};
</script>
