<template>
  <v-row>
    <v-col
      md="6"
      align-self="center"
    >
      <v-container class="px-16">
        <div class="mb-10 pointer d-inline-block" @click="$router.back()">
              <v-icon color="secondary">mdi-chevron-left</v-icon> 
              <span class="secondary--text text-decoration-underline">BACK TO HOME</span>
        </div>
        <div class="text-center">
          <h1 class="h3 font-weight-medium">
            Login
          </h1> 
          <h3 class="h5 font-weight-regular">
            Hello there! Welcome Back
          </h3>

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <div class="py-2 px-10 mt-10">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </div>
            <div class="py-2 px-10 mb-5">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Normal with hint text"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </div>
            <div class="py-2 px-10 mb-5">
              <v-btn
                :disabled="!valid"
                color="secondary"
                rounded
                class="mr-4 py-4"
                block
                @click="validate"
              >
                Login
              </v-btn>
            </div>
            <div class="py-2 px-10 secondary--text">
              I don't have an account? Register first
            </div>
          </v-form>
        </div>
      </v-container>
    </v-col>
    <v-col
      md="6"
    >
      Foto
    </v-col>
  </v-row>
</template>


<script>
export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      show1: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>