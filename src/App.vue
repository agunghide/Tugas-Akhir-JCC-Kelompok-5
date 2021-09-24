<style>
  @import './assets/css/styles.css';
</style>

<template>
  <v-app>
    <alert />
    <Dialog />

    <v-navigation-drawer app right temporary v-model="drawer" :permanent="$vuetify.breakpoint.mdAndUp ? (drawer = false) : false">
      <v-list>
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <img
              v-if="user.photo_profile"
              :alt="user.name"
              :src="`${apiDomain}${user.photo_profile}`"
            >
            <v-icon 
              v-else
              color="secondary" 
              size="20px"
            ></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ (user.name.length > 22 ) ? `${user.name.substring(0, 22)}...` : user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div class="pa-2" v-if="guest">
          <v-btn block color="secondary" class="mb-1" @click="goPage('/login')">
            <v-icon left>mdi-lock</v-icon>
            Login
          </v-btn>
          <v-btn block color="success">
            <v-icon left>mdi-account</v-icon>
            Register
          </v-btn>
        </div>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, index) in menus"
          :key="`menu-${index}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="red" dark @click="logout">
            <v-icon>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app absolute elevation="0" color="transparent" class="pt-3" v-if="appBar">
        <div class="d-flex container">
            <v-col
              cols="6"
              md="3"
              align-self="center"
            >
                <h1 class="white--text h2">Team 5</h1>
            </v-col>
            <v-col
              md="6"
              align-self="center"
              class="d-none d-md-flex"
            >
              <v-tabs
                centered 
                color="secondary"
                background-color="transparent"
              >
                <v-tab
                v-for="(item, index) in menus"
                :key="`menu-${index}`"
                :to="item.route"
                class="px-7"
                >
                  {{ item.title }}
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col
              cols="6"
              md="3"
              align-self="center"
              class="py-0 d-block px-0"
            >
            
            <div class="text-center d-none d-md-inline-block float-right" v-if="!guest">
              <v-menu offset-y min-width="50px" nudge-right="75" nudge-bottom="13">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="py-4 px-4"
                    color="primary"
                    dark
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <strong class="align-center mr-4 body-2">{{ (user.name.length > 22 ) ? `${user.name.substring(0, 22)}...` : user.name }}</strong>
                    <v-avatar
                        size="30px"
                        class="outlined--secondary"
                      >
                        <img
                          v-if="user.photo_profile"
                          :alt="user.name"
                          :src="`${apiDomain}${user.photo_profile}`"
                        >
                        <v-icon 
                          v-else
                          color="secondary" 
                          size="20px"
                        >
                          mdi-account-outline
                        </v-icon>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-list class="py-0 dropdown-custom" color="#FF2650">
                  <v-list-item selectable @click="logout">
                    <v-icon>mdi-exit-to-app</v-icon>
                    <v-list-item-title class="caption">Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
              <v-btn 
                v-if="guest"
                color="secondary" 
                class="float-right d-none d-md-inline-block"
                outlined
                rounded 
                @click="goPage('/login')"
              >
                Login
              </v-btn>
              
              <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none d-sm-flex float-right"></v-app-bar-nav-icon>
            </v-col>


        </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main :class="(route == '/login' || route == '/register') ? 'pa-0' : 'mb-10'">
      <v-container fluid :class="(route == '/login' || route == '/register') ? 'fill-height pa-0' : 'fill-height'" >
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-footer app absolute color="transparent" v-if="footerStatus" class="subtitle-2 d-block text-center font-weight-light">
      Created © 2021 Team 5 VueJS Jabar Coding Camp
      <br>
      All rights reserved
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert.vue"),
    Dialog: () => import("./components/Dialog.vue"),
  },

  data: () => ({
    drawer: false,
    appBar:true,
    footerStatus:true,
    menus: [
      { title: "Home", icon:"mdi-home", route: "/" },
      { title: "Blogs", icon:"mdi-note", route: "/blogs" },
      { title: "About Us", icon:"mdi-account-group", route: "/about" },
    ],
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    route: ''
  }),

  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },

  methods: {
    logout() {
      let config = {
        method: "post",
        url: `${this.apiDomain}/api/v2/auth/logout`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };

      this.axios(config)
        .then(() => {
          this.setToken("");
          this.setUser({});

          this.setAlert({
            status: true,
            color: "success",
            text: "Anda berhasil logout",
          });
        })
        .catch((responses) => {
          this.setAlert({
            status: true,
            color: "error",
            text: responses.data.error,
          });
        });
    },

    ...mapActions({
      setAlert: "alert/set",
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
    }),

    goPage(url){
      this.$router.push(url)
    },

    cekRoute(){
      this.route = this.$route.path;
      if(this.route == "/login" || this.route == "/register"){
        this.$vuetify.theme.dark = false;
        this.appBar = false
        this.footerStatus = false
      }else{
        this.$vuetify.theme.dark = true;
        this.appBar = true
        this.footerStatus = true
      }
    }
  },
  mounted() {
    this.cekRoute()
    console.log("test")
    if (this.token) {
      this.checkToken(this.token);
    }
  },
  updated(){
    this.cekRoute()
  }
};
</script>
