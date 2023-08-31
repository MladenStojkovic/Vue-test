<template>
  <div class="layout-wrapper">
    <Sidebar />
    <main class="margin-top-5 margin-left-5">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
export default {
  name: 'DefaultLayout',
  components: {
    Sidebar
  }
}
</script>

<style scoped>
.layout-wrapper {
  display: flex;
}
</style>
