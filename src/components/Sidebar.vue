<template>
  <aside class="sidebar">
    <nav class="nav-main">
      <ul>
        <li>
          <router-link to="/" class="nav-option margin-bottom-2"
            >Inbox ({{ inboxEmails }})</router-link
          >
        </li>
        <li>
          <router-link to="/archive" class="nav-option">Archive ({{ archiveEmails }})</router-link>
        </li>
      </ul>
    </nav>
    <div @click="console.log(emailsStore)">
      <button class="btn btn-primary btn-large">Logout</button>
    </div>
  </aside>
</template>

<script>
import { useEmailStore } from '../stores/emailStore.js'
import { mapStores } from 'pinia'

export default {
  name: 'SideBar',
  computed: {
    ...mapStores(useEmailStore, ['emails']),
    inboxEmails() {
      return this.emailsStore.emails.filter((email) => email.status === 'inbox').length
    },

    archiveEmails() {
      return this.emailsStore.emails.filter((email) => email.status === 'archive').length
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0;
  min-width: 300px;
  text-align: center;
  height: 100vh;
  background-color: gray;
}

.nav-main ul {
  display: inline-block;
  padding: 0;
  list-style: none;
}

.nav-option {
  display: inline-block;
  padding: 1rem 0.5rem;
  background-color: var(--vt-c-white);
  min-width: 150px;
}
</style>
