<template>
  <v-container>
    <br />
    <div class="bigbox">
      <table class="tab" border="0">
        <tr>
          <td>
            <img src="../images/Logo.png" width="80" height="80" align="left" />
          </td>
        </tr>
        <br />
        <tr>
          <td>

            <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                width="750px"
              ></v-carousel-item>
            </v-carousel>

          </td>
          <td width="2%"></td>

          <td>
            <Login /><br /><br />

            <div class="box text-center">
              <div>ยังไม่ได้เข้าร่วมกับ Trainder อีกเหรอ ?</div>
              <br />
              <v-btn to="/register" color="primary" rounded
                >สมัครสมาชิกเลย</v-btn
              ><br /><br />
              หรือว่า อยากร่วมเป็น&nbsp;
              <router-link to="/Trainerregister">Trainer</router-link>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
import Login from "./login";

export default {
  name: "index",
  components: {
    Login,
  },
  data() {
    return {
      items: [{src: require("../images/Trainder2.png"),},
              {src: require("../images/Trainder.png"),},
              {src: require("../images/Trainder3.png"),},
              {src: require("../images/Trainder4.png"),},],
    };
  },
  methods: {},
};
</script>

<style scoped>
.box {
  border: 1px solid rgb(198, 66, 66);
  padding: 25px 20px 25px 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  height: 180px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.bigbox {
  background-color: rgb(255, 255, 255);
  text-align: center;
  padding: 2% 2% 2% 2%;
  width: 100%;
  height: 100%;
  border: 2px solid rgb(198, 66, 66);
  border-radius: 10px;
}

.tab {
  margin-left: auto;
  margin-right: auto;
}
</style>
