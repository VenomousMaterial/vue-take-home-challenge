<template>
  <v-app class="app-background">
    <v-app-bar
      app
      class="weecare-banner"
      dark
    >
      <h1>WeeCare iTunes Albums Challenge</h1>

      <span class="ml-4 text-caption">By Nick Harmon</span>

      <v-spacer></v-spacer>

      <span
        title="
          features:
          Favoriting (click the heart)
          Test suite for javascript logic
          written in Vue
          Vuex for store management
          Vuetify ui framework/animations
          search and sort functionality
        "
      >
        hover for features list
        <v-icon>mdi-help</v-icon>
      </span>
      <v-btn
        @click="showFeaturesList = true"
      >Features List</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        @click="openGithubWindow"
        text
      >
        <span class="mr-2">View GitHub Source Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid grid-list-xl fill-height class="app-background">
        <v-row class="top-part">

          <v-select
            :items="sortOptions"
            label="Sort By"
            outlined
            dense
            class="mt-7 mx-5"
            v-on:change="updateSort"
          ></v-select>

          <v-autocomplete
            clearable
            dense
            outlined
            solo
            cache-items
            class="mt-7 mx-5"
            background-color="transparent"
            :items="searchList"
            label="Search by Title or Artist"
            v-on:change="updateSearch"
          ></v-autocomplete>

        </v-row>
        <v-layout wrap justify-space-around>
          <AlbumCard
            v-for="album in topAlbums"
            :key="album.id.attributes['im:id']"
            :album-id="album.id.attributes['im:id']"
            :album-title="album['im:name'].label"
            :album-artist="album['im:artist'].label"
            :album-image="album['im:image'][2]"
            :album-category="album.category.attributes.label"
            :album-song-count="album['im:itemCount'].label"
            :album-cost="album['im:price'].label"
            :album-release="album['im:releaseDate'].attributes.label"
            :album-link="album.link.attributes.href"
            :album-rights="album.rights.label"
            :album-index="unalteredAlbums.indexOf(album)"
          />
        </v-layout>
      </v-container>
    </v-main>
    <v-snackbar
      v-model="showFeaturesList"
      timeout="10000"
    >
      <div>Features:</div>
      <ul>
        <li>Favorites save to local storage</li>
        <div>(click the heart in the top right)</div>
        <li>Search and sort functionality</li>
        <li>Test suite for javascript logic</li>
        <li>Written in Vue</li>
        <li>Vuex for store management</li>
        <li>Vuetify ui framework/animations</li>
      </ul>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { sortOptions } from '@/constants/sortOptions'
import { GITHUB_REPO_LOCATION } from '@/constants/urls'

import AlbumCard from './components/AlbumCard'

export default {
  name: 'App',

  components: {
    AlbumCard
  },

  data () {
    return {
      sortOptions: sortOptions,
      searchInput: '',
      showFeaturesList: false
    }
  },

  computed: {
    ...mapGetters([
      'topAlbums',
      'unalteredAlbums',
      'getArtists',
      'getTitles'
    ]),

    orderedAlbums () {
      const orderedAlbums = [...this.topAlbums]
      return orderedAlbums.sort((album1, album2) => {
        return album1['im:itemCount'].label - album2['im:itemCount'].label
      })
    },

    searchList () {
      const artists = this.unalteredAlbums.map((album) => {
        return album['im:artist'].label
      })
      const titles = this.unalteredAlbums.map((album) => {
        return album['im:name'].label
      })
      const searchTerms = [...artists, ...titles]
      searchTerms.sort()
      return searchTerms
    }
  },

  methods: {
    ...mapActions([
      'init',
      'updateSort',
      'updateSearch'
    ]),

    openGithubWindow () {
      window.open(GITHUB_REPO_LOCATION)
    }
  },

  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">
  .app-background {
    background: lightblue;
    .weecare-banner {
      background-image: linear-gradient(to right, rgb(21, 22, 91), rgb(52, 122, 121));
    }
    .top-part {
      max-height: 95px;
    }
  }

  .v-card__title {
    word-break: break-word;
  }
</style>
