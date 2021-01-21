<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <DataTable />
    <!-- <Data /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import DataTable from './components/DataTable.vue'
// import Data from './components/Data.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    DataTable,
    // Data
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 28px;
}
.table.b-table>thead>tr>th {
  background-color: white;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 2;
} 

td {
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap;  */
    max-width: 250px;
    word-break: break-word;
}
/* td{
  max-width: 300px;
} */
</style>
