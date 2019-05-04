<template>
  <div class="view">
    <table class="ui celled striped table">
      <thead>
        <tr>
          <th>Queue</th>
          <th>Active</th>
          <th>Waiting</th>
          <th>Failed</th>
          <th>Paused</th>
          <th>Completed</th>
          <th>Delayed</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="queue in queues">
        <td>{{ queue.name }}</td>
        <td>{{ queue.active }}</td>
        <td>{{ queue.waiting }}</td>
        <td>{{ queue.failed }}</td>
        <td>{{ queue.paused }}</td>
        <td>{{ queue.completed }}</td>
        <td>{{ queue.delayed }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style>
.view {
  color: teal;
}
</style>

<script>
export default {
  name: 'AppBody',
  props: {
    queues: { type: Array, default: [] }
  },
  methods: {
    async fetchQueues() {
      const data = await fetch("api/state");
      const state = await data.json();
      this.queues.length = 0;
      this.queues.push(...state.queues);
    }
},
  mounted() {
    this.fetchQueues();
  }
};
</script>
