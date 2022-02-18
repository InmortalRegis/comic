<template>
  <main class="main">
    <div class="comic">
      <button class="comic__random-btn">Random</button>
      <div v-if="randomComic">
        <h1 class="comic__title">{{ randomComic.title }}</h1>
        <img class="comic__img" :src="randomComic.img" alt="" />
        <p>
          {{ randomComic.alt }}
        </p>

        <star-rating
          class="comic__rating"
          v-model:rating="rating"
          :show-rating="false"
        ></star-rating>
      </div>

      <h1 v-if="isLoading">... Loading</h1>
    </div>
  </main>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import StarRating from "vue-star-rating";

export default defineComponent({
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const errorResult = ref();
    const isLoading = ref(false);
    const randomComic = computed(() => store.state.comic.randomComic);
    const rating = ref(0);

    const getRandomComic = async () => {
      try {
        isLoading.value = true;
        await store.dispatch("comic/getRandomComic");
        isLoading.value = false;
      } catch (error) {
        errorResult.value = error;
      }
    };

    getRandomComic();

    return {
      randomComic,
      rating,
      isLoading,
    };
  },
});
</script>

<style lang="scss">
@import "./assets/base.scss";

.comic {
  background-color: $white;
  border: 1px solid $cinder;
  max-width: 780px;
  border-radius: $radius-lg;
  margin: 0px auto;
  padding: 21px;

  position: relative;
  &__title {
    color: $cinder;
    margin-bottom: 1rem;
  }
  &__rating {
    justify-content: center;
  }

  &__random-btn {
    background-color: $rock-blue;
    color: $white;
    border: 1px solid $cinder;
    padding: 0.5rem 1rem;
    border-radius: $radius-sm;
    box-shadow: $default-box-shadow !important;
    margin-bottom: 1rem;
  }
}
</style>
