<template>
  <div class="view">
    <b-table
      class="table table-striped table-bordered table-hover"
      :busy="isBusy"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template slot="id" slot-scope="data">
        <b-link
          :to="{
          name: 'job',
          params: { queue: $route.params.queue, job: data.item.id }
        }"
        >{{ data.item.id }}</b-link>
      </template>

      <template slot="repository" slot-scope="data">
        <b-link
          :to="{
            name: 'repository',
            params: { repository: data.item.repository.full_name }
          }"
        >{{ data.item.repository.full_name }}</b-link>
      </template>

      <template
        slot="processedOn"
        slot-scope="data"
      >{{ data.item.processedOn | moment().format("MMMM Do YYYY, h:mm:ss a") }}</template>

      <div slot="table-busy" class="text-center">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </b-table>
    <b-row>
      <b-col md="6">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { config } from '../../package.json';

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
      const data = await fetch(`${config.api}/queue/${this.$route.params.queue}/jobs`);
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
      perPage: 10,
      pageOptions: [5, 10, 15],
      isBusy: false,
      fields: {
        id: {
          label: "Id",
          sortable: true
        },
        processedOn: {
          label: "Processed On",
          sortable: true
        },
        repository: {
          label: "Repository",
          sortable: true
        },
        branch: {
          label: "Branch",
          sortable: true
        }
      }
    };
  }
};
</script>
