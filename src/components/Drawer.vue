<template>
  <div>
    <div v-if="email" class="sidebar">
      <button @click="closeSidebar" class="btn btn-primary margin-bottom-1">Close</button>
      <div>
        <button @click="readEmail(email.id)" :disabled="email.read" class="btn btn-primary margin-right-1">Mark as read</button>
        <button @click="changeEmailStatus(email.id, email.status === 'inbox' ? 'archive' : 'inbox')" class="btn btn-primary">{{buttonText}}</button>
      </div>
      <h2>{{ email.title }}</h2>
      <p>{{ email.description }}</p>
    </div>
    <div v-if="email" class="backdrop" @click="closeSidebar"></div>
  </div>
</template>

<script>
import { useEmailStore } from '../stores/emailStore.js'
import { mapActions } from 'pinia';

export default {
  name: 'EmailSidebar',
  props: {
    email: Object
  },
  computed: {
    buttonText() {
      return this.email.status === 'inbox' ? 'Archive' : 'Inbox'
    }
  },
  methods: {
    ...mapActions(useEmailStore, [
      'changeEmailStatus',
      'readEmail'
    ]),
    closeSidebar() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  padding: 2rem;
  background-color: white;
  z-index: 9999;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
}
</style>