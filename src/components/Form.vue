<template>
  <v-card 
    light 
    class="px-4 pb-6 pt-3 rounded-xl"
    
  >
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        color="black"
        icon
        class="text-title pa-0"
        @click="close"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-title>
      <span class="text-h4">{{ params.titleDialog }}</span>
    </v-card-title>

    <v-card-text>
      <span class="text-body-1">{{ params.descriptionDialog }}</span>
    </v-card-text>

    <div class="mx-6 mb-10">
      <v-divider></v-divider>
    </div>
    <v-card-text>
            <v-text-field
              v-model="title"
              label="Title Blog"
              color="secondary"
              light
              required
            ></v-text-field>
            <v-textarea
              v-model="description"
              clearable
              color="secondary"
              clear-icon="mdi-close-circle"
              label="Blog Description"
              light
            ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="params.typeForm == 'tambah'"
        color="secondary"
        rounded
        @click="submit()"
        class="px-10 py-6"
      >
        Simpan
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    title: "",
    description: "",
  }),
  computed: {
    ...mapGetters({
      token: "auth/token",
      params: "dialog/params",
    }),
  },
  methods:{
    ...mapActions({
      checkToken: "auth/checkToken",
      setAlert: "alert/set",
    }),

    clearForm(){
      this.title = ''
      this.description = ''
    },

    close() {
      this.$emit("closed", false);
    },

    submit(){
      const config = {
          method: "post", 
          url: `${this.apiDomain}/api/v2/blog`,
          headers: {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${this.token}`
          },
          data: {
            title : this.title,
            description : this.description
          },
      };

      this.axios(config)
          .then((response) => {
              let id = response.data.blog.id

              this.clearForm()
              this.close()

              this.setAlert({
                status: true,
                color: "success",
                text: "Data Berhasil Ditambahkan",
              });

              this.goPage(`/blog/${id}`)
          })
          .catch((error)=> {
              console.log(error)

              this.setAlert({
                status: true,
                color: "error",
                text: "Data Gagal Ditambahkan",
              });
          })

    },

    
    goPage(url){
      this.$router.push(url)
    },
  },
  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
  },
}
</script>