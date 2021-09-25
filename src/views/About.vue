<template>
  <!-- templates blogs -->
  <v-container grid-list-sm class="mt-5">
    <!-- <div class="row mb-7 mb-sm-0"> -->
      <div class="col-5 col-sm text-center text-md-left">
        <v-subheader class="pa-4 pb-2 white--text title d-inline-block">
          About Us
        </v-subheader>
      </div>
      <v-divider class="mx-4"></v-divider>
      <div class="col-12 col-sm-6 text-sm-right text-center pr-6 align-self-end">
      </div>


      <!-- foto besar  -->
      <div>
       <v-img
          :src="require('../assets/Illustration About.svg')" 
          height="100%">
        </v-img>
      </div>
    <!-- </div> -->

    <!-- Profil  -->
    <div> 
      <v-row justify="space-around">
        <v-card 
          class="mx-auto text-center pa-5"
          >
            <v-avatar size="250" class="mb-4">
              <img
                :src="require('../assets/2.jpeg')"
                alt="John"
              >
            </v-avatar>

            <div>
              Agung Hidayat
            </div>

            <v-card-subtitle>
              From Subang 
            </v-card-subtitle>

        </v-card>
      </v-row>
    </div>

    <!-- text -->
    <div class="text">

    </div>
  </v-container>
</template>
