<template>
  <div class="page">
    <p>
      Welcome {{this.$store.state.account.nickname}}
    </p>
  </div>
</template>

<script>
import Counter from 'components/Counter'

export default {
  mounted() {
    if(!this.$store.state.token){
      console.log("We don't have token :(");
      this.$router.push('Login')
    }
  }
}
</script>
