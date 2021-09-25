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
      <v-form v-model="valid">
        <v-text-field
          v-model="title"
          label="Title Blog"
          color="secondary"
          light
          required
          v-if="params.typeForm !== 'upload'"
        ></v-text-field>
        <v-textarea
          v-model="description"
          clearable
          color="secondary"
          clear-icon="mdi-close-circle"
          label="Blog Description"
          light
          required
          v-if="params.typeForm !== 'upload'"
        ></v-textarea>
        <v-file-input
          v-model="photo"
          show-size
          counter
          label="Upload Photo Blog"
          color="secondary"
          v-if="params.typeForm == 'upload'"
        ></v-file-input>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="params.typeForm == 'tambah'"
        color="secondary"
        rounded
        @click="submit()"
        class="px-10 py-6"
        :loading="loadingButton"
      >
        Simpan
      </v-btn>
      <v-btn
        v-else-if="params.typeForm == 'update'"
        color="secondary"
        rounded
        @click="update()"
        class="px-10 py-6"
        :loading="loadingButton"
      >
        Update
      </v-btn>
      <v-btn
        v-else-if="params.typeForm == 'upload'"
        color="secondary"
        rounded
        @click="uploadPhoto()"
        class="px-10 py-6"
        :loading="loadingButton"
      >
        Upload
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
    loadingButton: false,
    photo: null,
    valid : true,

  }),
  computed: {
    ...mapGetters({
      token: "auth/token",
      params: "dialog/params",
      endForm: "dialog/endForm",
    }),
  },
  methods:{
    ...mapActions({
      checkToken: "auth/checkToken",
      setAlert: "alert/set",
      setEndForm: "dialog/setEndForm",
    }),

    clearForm(){
      this.setEndForm(true)
      this.title = ''
      this.description = ''
      this.photo = null
    },

    close() {
      this.$emit("closed", false);
    },
    submit(){
      this.loadingButton = true

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
              this.loadingButton = false

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
              this.loadingButton = false
              console.log(error)

              this.setAlert({
                status: true,
                color: "error",
                text: "Data Gagal Ditambahkan",
              });
          })

    },
    editBlog(){
      this.title = this.params.blog.title
      this.description = this.params.blog.description
    },
    update(){
      const id = this.params.blog.id
      this.loadingButton = true

      const config = {
          method: "post", 
          url: `${this.apiDomain}/api/v2/blog/${id}`,
          params: { _method: 'PUT' },
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
          .then(() => {
              this.loadingButton = true
              this.clearForm()
              this.close()

              this.setAlert({
                status: true,
                color: "success",
                text: "Data Berhasil Diupdate",
              });

          })
          .catch((error)=> {
              this.loadingButton = true
              console.log(error)

              this.setAlert({
                status: true,
                color: "error",
                text: "Data Gagal Diupdate",
              });
          })

    },
    uploadPhoto(){
      const id = this.params.blog.id
      this.loadingButton = true

      let formData = new FormData()
      formData.append('photo', this.photo[0])

      const config = {
          method: "post", 
          url: `${this.apiDomain}/api/v2/blog/${id}/upload-photo`,
          headers: {
            'Authorization' : `Bearer ${this.token}`
          },
          data: formData,
          
      };

      this.axios(config)
          .then((response) => {
              console.log(response)
              console.log(id)
              console.log(this.photo)
              this.loadingButton = true
              this.clearForm()
              this.close()

              this.setAlert({
                status: true,
                color: "success",
                text: "Foto berhasil diupload ",
              });

          })
          .catch((error)=> {
              this.loadingButton = true
              console.log(error)

              this.setAlert({
                status: true,
                color: "error",
                text: "Foto gagal diupload",
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
    if (this.params.typeForm == "update") {
      this.editBlog()
    }
  },
}
</script>