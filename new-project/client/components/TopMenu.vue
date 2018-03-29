<template>
  <div class="top-menu vertical-menu">
      <div class="top-menu-item">Queue PVP game</div>
      <div class="top-menu-item">Queue P VS AI game</div>
      <div class="top-menu-item">Leaderboards</div>
      <div class="top-menu-item">Profile</div>
      <div class="top-menu-item">About</div>
  </div>
</template>
<script>
export default {
  name :"topMenu"
}
</script>
<style>
.top-menu {
    position: absolute;
    top: 5%;
    /* left: 25%; */
    /* display: inline-flex; */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;

} 
.top-menu-item {
    /* display: inline-flex; */
    padding: 15px;
}
.top-menu-item:hover {
    /* display: inline-flex; */
     text-shadow: 1px 1px;
}
</style>


