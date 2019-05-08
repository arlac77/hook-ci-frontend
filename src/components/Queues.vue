<template>
  <div class="view">
    <b-table
      class="table table-striped table-bordered table-hover"
      :primary-key="0"
      :busy="isBusy"
      :items="items"
      :fields="fields"
    >
      <template slot="name" slot-scope="data">
        <b-link :to="{ name: 'queue', params: { queue: data.item.name } }">{{
          data.item.name
        }}</b-link>
      </template>

      <div slot="table-busy" class="text-center my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Queues",
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    async refresh() {
      this.isBusy = true;
      const data = await fetch("api/queues");
      const items = await data.json();
      this.items.length = 0;
      this.items.push(...items);
      this.isBusy = false;
    }
  },
  mounted() {
    this.refresh();
  },
  data() {
    return {
      isBusy: false,
      fields: {
        name: {
          label: "Queue",
          sortable: true
        },
        active: {
          label: "Active",
          sortable: true
        },
        waiting: {
          label: "Waiting",
          sortable: true
        },
        failed: {
          label: "Failed",
          sortable: true
        },
        paused: {
          label: "Paused",
          sortable: true
        },
        completed: {
          label: "Completed",
          sortable: true
        },
        delayed: {
          label: "Delayed",
          sortable: true
        }
      }
    };
  }
};
</script>
