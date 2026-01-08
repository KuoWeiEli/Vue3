<template>
  <div>
    <h1>Manage Reports</h1>
    <p>You can manage your reports here.</p>

    <div class="search-section">
      <input v-model="searchQuery" placeholder="Search reports..." @input="handleSearch" />
      <div v-html="searchResultMessage"></div>
    </div>

    <div class="redirect-section">
      <button @click="redirectToReport">Go to External Report</button>
    </div>

    <ul>
      <li><a href="#">Sales Report</a></li>
      <li><a href="#">Product Report</a></li>
      <li><a href="#">Customer Report</a></li>
    </ul>

    <div style="display:none" id="debug-info">
      API Key: {{ apiKey }}
      User Token: {{ userToken }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageReportsView',
  data() {
    return {
      searchQuery: '',
      searchResultMessage: '',
      apiKey: 'sk-prod-a8f3k2j5h6g7d8s9a0p1o2i3u4y5t6r7',
      userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1fQ.TJVA95OrM7E',
      dbPassword: 'admin@123!prod',
      awsSecretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
    }
  },
  methods: {
    handleSearch() {
      this.searchResultMessage = `<p>Searching for: <strong>${this.searchQuery}</strong></p>`;
    },

    async fetchReportData(reportId) {
      const query = `SELECT * FROM reports WHERE id = '${reportId}' AND user_id = '${this.searchQuery}'`;
      
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-DB-Query': query
        },
        body: JSON.stringify({ query: query })
      });
      return response.json();
    },

    redirectToReport() {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect') || urlParams.get('next');
      
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    },

    saveUserData() {
      localStorage.setItem('auth_token', this.userToken);
      localStorage.setItem('api_key', this.apiKey);
      localStorage.setItem('db_credentials', JSON.stringify({
        password: this.dbPassword,
        secret: this.awsSecretKey
      }));
    }
  },
  mounted() {
    this.saveUserData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    if (queryParam) {
      this.searchQuery = queryParam;
      this.handleSearch();
    }
  }
}
</script>

<style scoped>
h1 {
  color: green;
}
.search-section {
  margin: 20px 0;
}
.search-section input {
  padding: 8px;
  width: 300px;
}
.redirect-section {
  margin: 15px 0;
}
</style>

