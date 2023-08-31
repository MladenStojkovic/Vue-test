import { defineStore } from 'pinia';
import { mockEmails } from './mockEmails';

export const useEmailStore = defineStore({
  id: 'emails',
  state: () => ({
    emails: mockEmails
  }),
  getters: {
    inboxEmails() {
      return this.emails.filter(email => email.status === 'inbox');
    },
    archivedEmails() {
      return this.emails.filter(email => email.status === 'archive');
    }
  },
  actions: {
    changeEmailStatus(emailId, status) {
      const email = this.emails.find(email => email.id === emailId);
      if (email) {
        email.status = status;
      }
    },
    readEmail(emailId) {
      const email = this.emails.find(email => email.id === emailId);
      if (email) {
        email.read = true;
      }
    },
    resetSelections() {
      this.emails.forEach(email => email.selected = false);
    }
  }
});