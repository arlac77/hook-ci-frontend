<template>
  <div class="view">
    <b-table
      class="table table-striped table-bordered table-hover"
      :primary-key="0"
      :busy="isBusy"
      :items="items"
      :fields="fields"
    >
      <template slot="fullName" slot-scope="data">
        <b-link
          :to="{ name: 'repository', params: { repository: data.item.fullName } }"
        >{{ data.item.fullName }}</b-link>
      </template>

      <div slot="table-busy" class="text-center">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </b-table>
  </div>
</template>

<script>
import { config } from '../../package.json';

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
      const data = await fetch(`${config.api}/repositories?pattern=arlac77/*`);
      const items = await data.json();
      this.items.length = 0;
      this.items.push(...items);
      this.isBusy = false;
    },
    async build() {
      await fetch(`${config.api}/queue/incoming/add`, {
        method: "POST",
        body: JSON.stringify({
          ref: "refs/heads/master",
          repository: {
            url: "https://github.com/arlac77/npm-template-sync-github-hook"
          }
        })
      });
    }
  },
  mounted() {
    this.refresh();
  },
  data() {
    return {
      isBusy: false,
      fields: {
        fullName: {
          label: "Repository",
          sortable: true
        },
        description: {
          label: "Description",
          sortable: true
        }
      }
    };
  }
};
</script>
