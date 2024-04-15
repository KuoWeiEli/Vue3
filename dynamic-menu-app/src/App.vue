<template>
  <div id="app">
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.path">
        <RouterLink :to="menuItem.path">{{ menuItem.label }}</RouterLink>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<script>
import { generateMenu } from './router/index';

export default {
  name: 'App',
  data() {
    return {
      user: {
        name: 'Eli Huang',
        userPermissions: ['view_reports', 'manage_reports']
      },
      menuItems: []
    };
  },
  created() {
    this.menuItems = generateMenu(this.user);
  }
};
</script>