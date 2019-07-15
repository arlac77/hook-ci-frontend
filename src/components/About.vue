
<template>
  <b-card-group deck>
    <b-card style="width: 24rem">
      <b-card-body>
        <b-list-group flush>
          <b-list-group-item>Name {{ name }}</b-list-group-item>
          <b-list-group-item>Version {{ version }}</b-list-group-item>
        </b-list-group>
      </b-card-body>
    </b-card>
  </b-card-group>
</template>

<script>
import { name, version } from '../../package.json';

export default {
  name: "About",
  data: {
      version,
      name
  }
};
</script>
