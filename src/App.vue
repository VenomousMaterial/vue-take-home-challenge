<template>
  <v-app class="app-background">
    <v-app-bar
      app
      class="weecare-banner"
      dark
    >
      <h1>WeeCare iTunes Albums Challenge</h1>

      <v-spacer></v-spacer>

      <v-select
        :items="sortOptions"
        label="Sort By"
        outlined
        dense
        class="mt-7"
        v-on:change="updateSort"
      ></v-select>

      <v-spacer></v-spacer>

      <v-btn
        @click="openGithubWindow"
        text
      >
        <span class="mr-2">View Source Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid grid-list-xl class="app-background">
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
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { sortOptions } from '@/constants/sortOptions'

import AlbumCard from './components/AlbumCard'

export default {
  name: 'App',

  components: {
    AlbumCard
  },

  data () {
    return {
      sortOptions: sortOptions
    }
  },

  computed: {
    ...mapGetters(['topAlbums', 'unalteredAlbums']),
    orderedAlbums () {
      const orderedAlbums = [...this.topAlbums]
      return orderedAlbums.sort((album1, album2) => {
        return album1['im:itemCount'].label - album2['im:itemCount'].label
      })
    }
  },

  methods: {
    ...mapActions([
      'init',
      'updateSort'
    ]),

    openGithubWindow () {
      window.open('https://github.com/VenomousMaterial/weecare-take-home-challenge')
    }
  },

  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .weecare-banner {
    background-image: linear-gradient(to right, rgb(21, 22, 91), rgb(52, 122, 121));
  }
  .app-background {
    background: lightblue;
  }
</style>
