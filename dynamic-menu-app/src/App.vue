<template>
  <div id="app">
    <h1>Dynamic Menu App</h1>
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
        name: null, //'Eli Huang',
        userPermissions: [], //['view_reports', 'manage_reports']
      },
      menuItems: []
    };
  },
  created() {
  },

  mounted() {
    this.login();
  },

  methods: {
    login() {
      if (!this.user.name) {
        this.promptUserInfo();
      }
    },

    promptUserInfo() {
      let userName = prompt('Please enter your name');
      if (userName) {
        this.user.name = userName;

        let permission = prompt('Type your permission: ', 'view_reports,manage_reports');
        permission.split(',').forEach(p => {
          this.user.userPermissions.push(p.trim());
        });

        this.menuItems = generateMenu(this.user);
      }
    }
  },

};
</script>