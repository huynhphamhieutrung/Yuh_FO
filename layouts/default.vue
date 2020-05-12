<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
  export default {
    mounted() {
      AOS.init({
        once: true,
      });
    }
  };
</script>
