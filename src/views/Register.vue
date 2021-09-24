<template>
  <v-row class="fill-height">
    <v-col
      cols="12"
      md="6"
      align-self="center"
    >
          <v-container class="px-md-16 px-10">
            <div class="mb-10 ml-n3 ml-md-8" >
              <router-link class="d-inline-block pointer subtitle-2 font-weight-regular text-decoration-none" to="/">
                    <v-icon color="secondary">mdi-chevron-left</v-icon> 
                    <span class="secondary--text text-decoration-underline">BACK TO HOME</span>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="h3 font-weight-medium">
                Register
              </h1> 
              <h3 class="h5 font-weight-regular">
                Share any experience with us or share something useful with us so that readers get positive insights
              </h3>

              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
              <div class="py-2 px-sm-4 px-md-10 mt-10">
                  <v-text-field
                    v-model="fullName"
                    :rules="[rules.required]"
                    label="Full Name"
                    required
                    color="secondary"
                  ></v-text-field>
                </div>
                <div class="py-2 px-sm-4 px-md-10">
                  <v-text-field
                    v-model="email"
                    :rules="[emailRules,rules.required]"
                    label="E-mail Address"
                    required
                    color="secondary"
                  ></v-text-field>
                </div>
                <div class="py-2 px-sm-4 px-md-10">
                  <v-text-field
                    v-model="password"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="passwordShow ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    color="secondary"
                    @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                </div>
                <div class="py-2 px-sm-4 px-md-10 mb-5">
                    <v-file-input
                      v-model="photo_profile"
                      show-size
                      counter
                      multiple
                      label="Photo Profile"
                      color="secondary"
                    :rules="[rules.required]"
                    ></v-file-input>
                </div>
                <div class="py-2 px-sm-4 px-md-10 mb-5">
                  <v-btn
                    :disabled="!valid"
                    color="secondary"
                    rounded
                    class="mr-4 py-6"
                    block
                    @click="register"
                    :loading="loadingButton"
                  >
                    Register
                  </v-btn>
                </div>
                <div class="py-2 px-sm-4 px-md-10 secondary--text">
                  Already have an account? 
                  <router-link class="text-decoration-underline secondary--text" to="/login">
                      Check this for Login
                  </router-link>
                </div>
              </v-form>
            </div>
          </v-container> 
    </v-col>
    
    <v-col
      cols="12"
      md="6"
      class="accent d-none d-md-block"
    >
      <v-row class="fill-height">
        <v-col md="12" align-self="center">
            <v-img 
                src="https://svgshare.com/i/aVo.svg" 
                width="100%">
            </v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>


<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
      loadingButton: false,
      valid: true,
      photo_profile: null,
      fullName: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordShow: false,
      password: '',
      match:false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  methods: {
      ...mapActions({
          setAlert: "alert/set",
          setToken: "auth/setToken",
      }),

      redirect() {
        this.$router.push(
            {
              name : "Login",
              params:{
                newRegistered: true
              }
            }
        )
      },

      register () {
        this.loadingButton = true

        let formData = new FormData()
        formData.append('name', this.fullName)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('photo_profile', this.photo_profile[0])

        const config = {
            method: "post",
            url: `${this.apiDomain}/api/v2/auth/register`,
            headers:{
              'Accept' : 'application/json'
            },
            data: formData,
        };

        this.axios(config)
            .then(() => {
                this.loadingButton = false
                
                this.setAlert({
                  status: true,
                  color: "success",
                  text: "Register Berhasil",
                });
                
                this.redirect();
            })
            .catch((error) => {
              this.loadingButton = false

                console.log(error);

                this.setAlert({
                  status: true,
                  color: "error",
                  text: "Register Gagal",
                });
            });
      },
  },
}
</script>