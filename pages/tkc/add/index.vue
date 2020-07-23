<template>
  <div id=body>
      <AppLeft/> 
      <AddUser/> 
  </div>
</template>

<script>
import AppLeft from '~/components/AppLeft.vue'
import AddUser from '~/components/AddUser.vue'

export default {
  middleware: 'authenticated',
  components: {
    AppLeft,
    AddUser,
  }
}
</script>

<style>

</style>
