<template>
  <div class="view">
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Queue</th>
          <th scope="col">Active</th>
          <th scope="col">Waiting</th>
          <th scope="col">Failed</th>
          <th scope="col">Paused</th>
          <th scope="col">Completed</th>
          <th scope="col">Delayed</th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="queue in queues">
          <td><a href="#/queue/request">{{ queue.name }}</a></td>
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

<script>
export default {
  name: "Queues",
  props: {
    queues: {
      type: Array,
      default: []
    }
  },
  methods: {
    async refresh() {
      const data = await fetch("api/queues");
      const queues = await data.json();
      this.queues.length = 0;
      this.queues.push(...queues);
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>
