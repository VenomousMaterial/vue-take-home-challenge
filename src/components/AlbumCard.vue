<template>
  <v-flex
    flex-grow-1
    class="album-card-component"
  >
    <v-card
      outlined
      shaped
      max-width="375"
      pa-2
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
          class="album-favorite-icon"
          icon
          @click="toggleFavoriteStatus"
        >
          <v-icon
            small
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
        <div>Category: {{albumCategory}}</div>
        <div>Released: {{albumRelease}}</div>
        <div>Songs: {{albumSongCount}}</div>
        <div>Price: {{albumCost}}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="purple"
          @click="goToAlbum"
          small
        >
          See in the iTunes store
        </v-btn>
      </v-card-actions>

      <div class="text-caption">{{albumRights}}</div>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AlbumCard',

  props: {
    /**
     *
     */
    albumTitle: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
     */
    albumId: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
     */
    albumArtist: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
     */
    albumImage: {
      type: Object,
      required: true,
      default: null
    },
    /**
     *
     */
    albumCategory: {
      type: String,
      default: null
    },
    /**
     *
     */
    albumSongCount: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
     */
    albumCost: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
     */
    albumRelease: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
     */
    albumLink: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
     */
    albumRights: {
      type: String,
      required: true,
      default: null
    },
    /**
     *
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
