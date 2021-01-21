<template>
  <b-container fluid>

    <b-row>

      <b-col lg="2" class="text-left">
        <button class="btn btn-success" @click="getTable">GET DATA</button>
      </b-col>
      <b-col lg="2" class="text-left">
        <button class="btn btn-success" @click="wrapTable">
          {{ wrap ? "Remove Wrap" : "Wrap Data" }}
        </button>
      </b-col>

      <b-col lg="3" class="">
        <input type="text" placeholder="Enter Text" v-model="text" />
        <button class="btn btn-primary ml-2" @click="postData(text)">
          POST
        </button>
      </b-col>

      <b-col lg="5" class="my-1 ml-auto">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button
                class="btn btn-danger"
                :disabled="!filter"
                @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

    </b-row>

    <b-table
      :items="items[0]"
      striped
      :fields="fields"
      :current-page="currentPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
      class="mt-3"
      outlined
      bordered
    >
      <template #cell(se_sort)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{ row.item.se_sort }}
        </text-highlight>
      </template>

      <template #cell(site_name)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{row.item.site_name}}
        </text-highlight>
      </template>

      <template #cell(url)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{row.item.url}}
        </text-highlight>
      </template>

      <template #cell(snippet)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{row.item.snippet}}
        </text-highlight>
      </template>

      <template #cell(engine)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{row.item.engine}}
        </text-highlight>
      </template>

      <template #cell(id)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{row.item.id}}
        </text-highlight>
      </template>

      <template #cell(se_index_on_page)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{row.item.se_index_on_page}}
        </text-highlight>
      </template>

      <template #cell(se_page)="row">
        <text-highlight :queries="filter" :class="wrap ? 'wrap' : 'nowrap'">
          {{row.item.se_page}}
        </text-highlight>
      </template>
    </b-table>
    <b-spinner v-if="loader" style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [],
      loader:false,
      fields: [
        {
          key: "se_sort",
          label: "Se Sort",
          sortable: true,
          class: "text-left",
        },
        {
          key: "site_name",
          label: "Site Name",
          sortable: true,
          class: "text-left",
        },
        { key: "url", label: "URL", sortable: true, class: "text-left" },
        {
          key: "snippet",
          label: "Snippet",
          sortable: true,
          class: "text-left",
        },
        {
          key: "engine",
          label: "Engine",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "id", label: "ID", sortable: true, class: "text-left" },
        {
          key: "se_index_on_page",
          label: "Se Index on Page",
          sortable: true,
          class: "text-left",
        },
        {
          key: "se_page",
          label: "Se Page",
          sortable: true,
          class: "text-left",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      wrap: false,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      text: "",
      filter: null,
      filterOn: [],
      apiUrl:
        "https://1g1wp4zu1k.execute-api.us-east-1.amazonaws.com/dev/testSQSSender",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  watch: {
    items() {
      // console.log("changed");
    },
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },

  mounted() {
    this.totalRows = this.items.length;
  },

  methods: {
    wrapTable() {
      this.wrap = !this.wrap;
    },
    getTable() {
      this.filter = " ";
      this.loader = true;
      this.dataTable();
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    dataTable() {
      this.filter = "";
      axios.get(this.apiUrl).then((response) => {
        this.items.push(response.data);
        this.loader = false;
      }).catch((error) => {
        console.log(error);
        this.loader = false;
      })
    },
    postData(value) {
      axios.post(this.apiUrl, { value });
    },
  },
};
</script>

<style>
.wrap{
  white-space: nowrap; 
}
</style>