<template>
  <div id=body>
      <AppLeft/> 
      <AddUser/> 
  </div>
</template>

<script>
import AppLeft from '~/components/AppLeft.vue'
import AddMission from '~/components/AddMission.vue'

export default {
  middleware: 'authenticated',
  components: {
    AppLeft,
    AddMission,
  }
}
</script>

<style>

</style>
