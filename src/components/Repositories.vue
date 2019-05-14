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
        <b-link :to="{ name: 'repository', params: { repository: data.item.name } }">{{
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
  name: "Repositories",
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    async refresh() {
      this.isBusy = true;
      const data = await fetch("api/repositories?pattern=arlac77/*");
      const items = (await data.json()).map(name => { return {name}; });
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
          label: "Repository",
          sortable: true
        }
      }
    };
  }
};
</script>
