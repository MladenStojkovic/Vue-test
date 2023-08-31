<template>
  <div>
    <h2 class="margin-bottom-2">Emails Selected ({{ selectedEmails.length }})</h2>
    <input type="checkbox" :disabled="!emails.length" v-model="selectAll" @change="toggleSelectAll" />
    <button @click="readHandler(selectedEmails)" :disabled="!selectedEmails.length" class="btn btn-primary margin-right-1 margin-left-1 margin-bottom-1">
      Mark as read
    </button>
    <button @click="statusHandler(selectedEmails)" :disabled="!selectedEmails.length" class="btn btn-primary">
      {{ buttonText }}
    </button>
    <div
      v-for="email in emails"
      :key="email.id"
      class="emails-wrapper"
      :class="{ read: email.read }"
    >
      <input type="checkbox" v-model="email.selected" />
      <h3 @click="selectedEmail = email" class="margin-left-1">{{ email.title }}</h3>
    </div>
    <Drawer :email="selectedEmail" @close="selectedEmail = null" />
  </div>
</template>

<script>
import Drawer from './Drawer.vue'
import { useEmailStore } from '../stores/emailStore.js'
import { mapActions } from 'pinia'
export default {
  data() {
    return {
      selectAll: false,
      selectedEmail: null
    }
  },
  props: {
    status: String,
    emails: Array
  },
  methods: {
    ...mapActions(useEmailStore, ['changeEmailStatus', 'readEmail', 'resetSelections']),
    toggleSelectAll() {
      this.emails.forEach((email) => (email.selected = this.selectAll))
    },
    statusHandler(emails) {
      emails.forEach((email) => {
        this.changeEmailStatus(email.id, this.$props.status === 'inbox' ? 'archive' : 'inbox')
      })
      this.resetSelections()
      this.selectAll = false
    },
    readHandler(emails) {
      emails.forEach((email) => {
        this.readEmail(email.id)
      })
      this.resetSelections()
      this.selectAll = false
    }
  },
  watch: {
    emails: {
      handler(emails) {
        if (!emails.length) {
          this.selectAll = false
          return
        }
        if (emails.every((email) => email.selected)) this.selectAll = true
        else this.selectAll = false
      },
      deep: true
    }
  },
  computed: {
    selectedEmails() {
      return this.$props.emails.filter((email) => email.selected)
    },
    buttonText() {
      return this.$props.status === 'inbox' ? 'Archive' : 'Restore'
    }
  },
  components: {
    Drawer
  }
}
</script>
<style scoped>
.emails-wrapper {
  background-color: lightgray;
  padding: 1rem;
}

.emails-wrapper.read {
  opacity: 0.5;
}

h3 {
  display: inline-block;
  cursor: pointer;
}
</style>
