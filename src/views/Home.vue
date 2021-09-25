<template>
  <!-- templates blogs -->
  <v-container grid-list-sm class="mt-10">
    <v-row no-gutters class="mb-10">
      <v-col
        xs="12"
        md="6"
      >
        <h1 class="text-lg-h1 text-md-h2 text-sm-h3 text-xs-h4 font-weight-medium">
          Publish your experience with us
        </h1>
        <br>
        <h2 class="subtitle-1 font-weight-light">
          Share any experience with us or share something useful with us so that readers get positive insights
        </h2>
        <br>
        
        <v-fade-transition hide-on-leave>
        <v-btn 
          v-if="guest"
          color="secondary" 
          rounded 
          class="px-8 py-7"
          @click="goPage('/register')"
        >
          Register for Free
        </v-btn>
        </v-fade-transition>
        <v-fade-transition hide-on-leave>
        <v-btn 
          v-if="!guest"
          color="secondary" 
          rounded 
          class="px-8 py-7"
          @click="openForm()"
        >
          Publish something
        </v-btn>
        </v-fade-transition>
      </v-col>
      <v-col
        xs="12"
        md="6"
        class="mt-10 mt-md-none mt-xs-12" 
      >
        <v-img 
          src="https://svgshare.com/i/aTr.svg" 
          height="100%">
        </v-img>
      </v-col>
    </v-row>
    
    <v-subheader class="text-left pa-4 pb-2 white--text title">
      Random Blog
    </v-subheader>

    <v-divider class="mx-4"></v-divider>
    
    <v-layout wrap>
      <blog-item-component
        v-for="blog in blogs"
        :key="`blog-${blog.id}`"
        :blog="blog"
        md="4"
        titleLength="28"
        descriptionLength="80"
      >
      </blog-item-component>
    </v-layout>

    <div class="text-center mt-8">
      <v-btn 
        outlined 
        rounded 
        color="secondary" 
        to="/blogs" 
        class="px-14 py-5"
      >
        See All Blogs
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import BlogItemComponent from "../components/BlogItemComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
  }),
  components: {
    "blog-item-component": BlogItemComponent,
  },
  computed: {
    ...mapGetters({
      guest: "auth/guest",
    }),
  },
  methods: {
    go() {
      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog/random/6`,
      };
      this.axios(config)
        .then((response) => {
          let { blogs } = response.data;
          this.blogs = blogs;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goPage(url){
      this.$router.push(url)
    },

    openForm() {
      this.setDialogComponent({
        component: "Form",
        params:{
          titleDialog: "Add Blog",
          descriptionDialog:"Share any experience with us so that readers get positive insights",
          typeForm: "tambah"
        }
      });
    },
    
    ...mapActions({
      setDialogComponent: "dialog/setComponent",
    }),
  },
  created() {
    this.go();
  },
};
</script>
