<template>
  <v-flex
    flex-grow-1
    class="album-card-component"
  >
    <v-card
      outlined
      shaped
      width="375"
      pa-2
      class="transition-fast-in-fast-out v-card--reveal"
    >

      <div class="album-top-icons">
        <v-chip
          small
          class="ma-1 album-rank-chip"
          color="blue"
          text-color="white"
        >
          {{albumIndex + 1}}
        </v-chip>

        <v-btn
          x-small
          class="ma-1 album-favorite-icon"
          icon
          @click="toggleFavoriteStatus"
        >
          <v-icon
            :color="getFavoriteIconColor"
          >mdi-heart</v-icon>
        </v-btn>
      </div>

      <v-row>
        <v-col>
          <v-img
            :height="albumImage.attributes.height"
            :width="albumImage.attributes.height"
            :src="albumImage.label"
          ></v-img>
        </v-col>
        <v-col>
          <v-card-title>{{albumTitle}}</v-card-title>
          <v-card-subtitle>By {{albumArtist}}</v-card-subtitle>
        </v-col>
      </v-row>

      <v-card-text>
        <div>Released: {{albumRelease}}</div>
        <div>Price: {{albumCost}}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          raised
          color="teal"
          @click="reveal = !reveal"
        >
          <span v-if="!reveal"><v-icon>mdi-menu-down</v-icon> More Info</span>
          <span v-if="reveal"><v-icon>mdi-menu-up</v-icon> Less Info</span>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
        >
          <v-card-text>
            <div>Category: {{albumCategory}}</div>
            <div>Songs: {{albumSongCount}}</div>
            <div class="text-caption">{{albumRights}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="teal"
              @click="goToAlbum"
              small
            >
              See in the iTunes store
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>

    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AlbumCard',

  data: () => ({
    reveal: false
  }),

  props: {
    /**
     * The album title, displayed next to the album art
     */
    albumTitle: {
      type: String,
      required: true,
      default: null
    },
    /**
     * The unique ID associated with each album
     */
    albumId: {
      type: String,
      required: true,
      default: null
    },
    /**
     * Album artist, displayed underneath the album title in smaller text
     */
    albumArtist: {
      type: String,
      required: true,
      default: null
    },
    /**
     * The album cover art, displayed in the top right of the card
     */
    albumImage: {
      type: Object,
      required: true,
      default: null
    },
    /**
     * The category of music the album falls into
     */
    albumCategory: {
      type: String,
      default: null
    },
    /**
     * The number of songs
     */
    albumSongCount: {
      type: String,
      required: true,
      default: null
    },
    /**
     * The iTunes cost of the album, used in sorting
     */
    albumCost: {
      type: String,
      required: true,
      default: null
    },
    /**
     * The date of release for the album
     */
    albumRelease: {
      type: String,
      required: true,
      default: null
    },
    /**
     * Link to the iTunes store entry for the album
     */
    albumLink: {
      type: String,
      required: true,
      default: null
    },
    /**
     * Copyright disclaimer for who owns the album rights
     */
    albumRights: {
      type: String,
      required: true,
      default: null
    },
    /**
     * Index for the album within the original listing (to preserve its ranking)
     */
    albumIndex: {
      type: Number,
      required: true,
      default: 0
    }
  },

  computed: {
    ...mapGetters(['favoriteAlbums']),

    isFavorite () {
      return this.favoriteAlbums.includes(this.albumId)
    },

    getFavoriteIconColor () {
      return this.isFavorite ? 'red' : 'black'
    }
  },

  methods: {
    ...mapActions(['addAlbumToFavorites', 'removeAlbumFromFavorites']),

    goToAlbum () {
      window.open(this.albumLink)
    },

    toggleFavoriteStatus () {
      if (this.isFavorite) {
        this.removeAlbumFromFavorites(this.albumId)
      } else {
        this.addAlbumToFavorites(this.albumId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .album-card-component {
    .album-top-icons {
      position: absolute;
      z-index: 1;
      width: 100%;
    }
    .album-rank-chip {
      left: 0px;
    }
    .album-favorite-icon {
      right: 0px;
      position: absolute;
    }
  }
</style>
