<template>
  <main class="main">
    <notifications />
    <div class="comic">
      <button class="comic__random-btn" @click="getRandomComic">
        Get Random
      </button>
      <div v-if="randomComic">
        <h1 class="comic__title">{{ randomComic.title }}</h1>
        <img class="comic__img" :src="randomComic.img" alt="" />
        <p>
          {{ randomComic.alt }}
        </p>

        <h2>Rate the comic:</h2>

        <star-rating
          class="comic__rating"
          v-model:rating="rating"
          @update:rating="setRating"
          :show-rating="false"
        ></star-rating>
      </div>

      <h1 v-if="isLoading">... Loading</h1>
      <div v-if="errorResult" class="comic__error">
        {{ errorResult }}
      </div>
    </div>
  </main>
</template>

<script>
import { computed, defineComponent, nextTick, ref } from "vue";
import { useStore } from "vuex";
import StarRating from "vue-star-rating";
import { notify } from "@kyvg/vue3-notification";

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

    const setRating = (r) => {
      console.log("🚀 ~ file: App.vue ~ line 51 ~ setRating ~ rating", r);

      notify({
        title: "Important message",
        duration: -1,
        type: "success",
        text: "You have rated the comic. Thanks!",
      });

      getRandomComic().then(() => {
        nextTick(() => {
          rating.value = 0;
        });
      });
    };

    const getRandomComic = async () => {
      try {
        isLoading.value = true;
        await store.dispatch("comic/getRandomComic");
        isLoading.value = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: App.vue ~ line 46 ~ getRandomComic ~ error",
          error.message
        );
        errorResult.value = error.message;
        isLoading.value = false;

        notify({
          title: "Important message",
          duration: -1,
          type: "error",
          text: error.message,
        });
      }
    };

    getRandomComic();

    return {
      randomComic,
      getRandomComic,
      rating,
      isLoading,
      errorResult,
      setRating,
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

  &__error {
    background-color: $red-orange;
    padding: 1rem;
    border-radius: $radius-sm;
    color: $white;
  }
}
</style>
