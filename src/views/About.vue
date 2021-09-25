<template>
  <!-- templates blogs -->
  <v-container grid-list-sm class="mt-5">
    <!-- <div class="row mb-7 mb-sm-0"> -->
      <div class="col-5 col-sm text-center text-md-left">
        <v-subheader class="pa-4 pb-2 white--text title d-inline-block">
          About Us
        </v-subheader>
      </div>
      <v-divider class="mx-4 mb-4"></v-divider>
      <!-- foto besar  -->
      <div class="mb-3 mx-4">
       <v-img
          :src="require('../assets/Illustration About.svg')" 
          height="100%">
        </v-img>
      </div>
    <!-- </div> -->

    <!-- Profil  -->
      <div class="col-5 col-sm text-center text-md-left">
        <v-subheader class="pa-4 pb-2 white--text title d-inline-block">
          Profile Team 5
        </v-subheader>
      </div>
      <v-row no-gutters justify="space-around">
      <v-col
        v-for="(member, index) in members"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card 
        class="mx-auto text-center pa-5"
        color="transparent">
           <v-avatar size="250" class="mb-7 outlined--white" >
           <img
            :src="require(`../assets/${member.foto}`)"
            :alt="member.nama"
           >
           </v-avatar>

           <div class="font-weight-bold">
            {{ member.nama }}
           </div>

           <v-card-subtitle class="mt-n2">
             From {{ member.asal }}
           </v-card-subtitle>

        </v-card>
      </v-col>
    </v-row>

    <div>
      <div class="col-5 col-sm text-center text-md-left mb-3">
        <v-subheader class="pa-4 pb-2 white--text text-h5 d-inline-block font-weight-black">
          TEAM 5 SAY 
        </v-subheader>
        
      </div>
      <div class="text-justify">
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit suscipit hendrerit. Etiam vulputate a ligula nec imperdiet. Nam mollis dictum pharetra. Donec varius purus et neque posuere, vel euismod lectus euismod. Fusce pellentesque egestas elit a placerat. Suspendisse lacus dui, volutpat quis maximus at, sagittis nec magna. Nunc pulvinar consectetur eros at mattis. Praesent lorem est, pretium sit amet accumsan ac, consectetur a massa. Vestibulum vitae iaculis lorem. Aenean facilisis semper eros. Sed et ligula non ante consectetur ultricies. Sed vitae diam vestibulum, placerat arcu ac, sagittis risus. Aliquam at urna in justo pretium dignissim nec a elit. Sed pretium, dui id semper aliquet, quam felis gravida odio, sed luctus magna odio eu urna. 
        </P>
        <P>
          Aliquam enim velit, pharetra ut sapien quis, malesuada facilisis metus. Ut rutrum ornare imperdiet. Suspendisse dictum felis eu arcu iaculis hendrerit. Mauris dictum justo a odio vulputate tincidunt. In venenatis quam in iaculis varius. Vestibulum leo diam, blandit id leo id, feugiat tincidunt purus. Nunc sodales tortor eget elementum tincidunt. Curabitur condimentum fringilla elit sed tristique. Ut ut efficitur nunc, non viverra nibh. Quisque vel libero viverra lorem porttitor malesuada. Integer in sem purus. Etiam eget magna id nunc luctus pulvinar sit amet a tortor.
        </P>
      </div>
    </div>
  </v-container>
</template>


<script>
export default {
  data : () => ({
    members : [
      {
        nama : 'Ilham Maulana',
        asal : 'Bandung',
        foto : '1.jpg'
      },
      {
        nama : 'Agung Hidayat',
        asal : 'Subang',
        foto : '2.jpeg'
      },
      {
        nama : 'Sayyid Ahsan Darojat',
        asal : 'Sukabumi',
        foto : '3.jpg'
      },
   ]
  }) 
}
</script>