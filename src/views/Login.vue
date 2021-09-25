<template>
  <v-row class="fill-height">
    <v-col
      cols="12"
      md="6"
      align-self="center"
    >
          <v-container class="px-md-16 px-10">
            <div class="mb-10 ml-n3 ml-md-8" >
              <router-link 
                class="d-inline-block pointer subtitle-2 font-weight-regular text-decoration-none" 
                to="/"
                @click="background = ''"
              >
                  <v-icon color="secondary">mdi-chevron-left</v-icon> 
                  <span class="secondary--text text-decoration-underline">BACK TO HOME</span>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="h3 font-weight-medium">
                Login
              </h1> 
              <h3 class="h5 font-weight-regular" v-if="!newRegistered">
                Hello there! Welcome Back
              </h3>
              <h3 class="h5 font-weight-regular" v-else>
                Please login your new account!
              </h3>

              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="login"
              >
                <div class="py-2 px-sm-4 px-md-10 mt-10">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    color="secondary"
                  ></v-text-field>
                </div>
                <div class="py-2 px-sm-4 px-md-10 mb-5">
                  <v-text-field
                    v-model="password"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="passwordShow ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    counter
                    color="secondary"
                    @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                </div>
                <div class="py-2 px-sm-4 px-md-10 mb-5">
                  <v-btn
                    :disabled="!valid"
                    color="secondary"
                    rounded
                    class="mr-4 py-6"
                    block
                    type="submit"
                    :loading="loadingButton"
                  >
                    Login
                  </v-btn>
                </div>
                <div class="py-2 px-sm-4 px-md-10 secondary--text">
                  I don't have an account? 
                  <router-link class="text-decoration-underline secondary--text" to="/register">
                      Register first
                  </router-link>
                </div>
              </v-form>
            </div>
          </v-container> 
    </v-col>
    
    <v-col
      cols="12"
      md="6"
      :class="`d-none d-md-block ${background}`"
    >
      <v-row class="fill-height">
        <v-col md="12" align-self="center">
            <v-img 
                src="https://svgshare.com/i/aTr.svg" 
                width="100%">
            </v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
      background : 'accent',
      loadingButton: false,
      newRegistered: false,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
      ],
      passwordShow: false,
      password: '',
      match:false,
      passwordRules: [(v) => !!v || 'Password is required.'],
      apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  computed: {
      ...mapGetters({
        guest : 'auth/guest'
      })
  },
  methods: {
      ...mapActions({
          setAlert: "alert/set",
          setToken: "auth/setToken",
      }),

      redirect() {
        this.$router.push("/")
      },

      login () {
        const validation = this.$refs.form.validate()

        if(validation){
          this.loadingButton = true

          const config = {
              method: "post", 
              url: `${this.apiDomain}/api/v2/auth/login`,
              data: {
                email: this.email,
                password: this.password,
              },
          };

          this.axios(config)
              .then((response) => {
                  this.loadingButton = false

                  this.setToken(response.data.access_token);

                  this.setAlert({
                    status: true,
                    color: "success",
                    text: "Login Berhasil",
                  });

                  this.redirect();
              })
              .catch((error) => {
                  this.loadingButton = false

                  console.log(error);

                  this.setAlert({
                    status: true,
                    color: "error",
                    text: "Login Gagal",
                  });
              });
        }
      },
    },
    mounted(){
      if(this.$route.params.newRegistered > 0){
        this.newRegistered = this.$route.params.newRegistered
      }
    },
  }
</script>