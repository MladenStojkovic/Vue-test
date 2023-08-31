<template>
  <DefaultLayout>
  <p>{{$route.name}}</p>
  <EmailsList status="inbox" :emails="emails"></EmailsList>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import EmailsList from '../components/EmailsList.vue';
import { useEmailStore } from '../stores/emailStore.js'
import { mapStores } from 'pinia'
export default {
  name: 'EmailSidebar',
  components: {
    DefaultLayout,
    EmailsList
  },
  computed: {
    ...mapStores(useEmailStore, ['emails']),
    emails() {
      return this.emailsStore.emails.filter(email => email.status === 'inbox')
    }
  }
};
</script>
