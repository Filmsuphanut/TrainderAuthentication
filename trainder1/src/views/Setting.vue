<template>
  <v-container>
    <v-row justify="center">
      <v-card class="ma-8 pa-15 elevation-7" rounded="xl" color="white" width="800">
        <v-form ref="form" @submit.prevent="updateUserData">
          <v-row justify="start">
            <v-col cols="1">
              <v-icon x-large color="accent">mdi-account-cog</v-icon>
            </v-col>
            <v-col cols="5" class="ma-3 pa-1">
              <h2 align="left">ตั้งค่าบัญชีผู้ใช้</h2>
            </v-col>
          </v-row>

          <v-row justify="start">
            <v-col cols="5">
              <v-sheet color="white" width="100" height="20"></v-sheet>

              <v-row justify="center">
                <v-card rounded="xl">
                  <img
                    :src="userData.profilePic"
                    align="left"
                    width="220"
                    height="220"
                    alt="Avatar"
                  />
                </v-card>
              </v-row>

              <v-row justify="center">
                <v-sheet color="white" width="50" height="20"></v-sheet>
              </v-row>

              <v-row justify="center">
                <template>
                  <v-file-input
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/jpg"
                    label="เปลี่ยนรูปโปรไฟล์"
                    filled
                    dense
                    rounded
                    :rules="checkimage"
                    @change="onUpload($event)"
                    @click:clear="clearPic()"
                  ></v-file-input>
                </template>
              </v-row>

              <v-row> สถานะผู้ใช้ : {{ userData.role }} </v-row>
            </v-col>

            <v-col cols="5">
              <v-text-field
                label="Email"
                v-model="userData.email"
                :disabled="true"
                outlined
              ></v-text-field>
              <v-text-field
                label="ชื่อ"
                :rules="checkdata"
                v-model="userData.firstname"
                required
                outlined
              ></v-text-field>
              <v-text-field
                label="นามสกุล"
                :rules="checkdata"
                v-model="userData.lastname"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="start">
            <v-sheet color="white" width="50" height="40"></v-sheet>
          </v-row>

          <!-- panels ข้อมูลส่วนตัว-->
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down" color="secondary">
                <v-row justify="start">
                  <h3 align="left" style="color: white">ข้อมูลส่วนตัว</h3>
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content color="white">
                <v-row justify="start">
                  <v-sheet color="white" width="50" height="40"></v-sheet>
                </v-row>

                <v-row justify="start">
                  <v-text-field
                    label="เลขบัตรประจำตัวประชาชน"
                    :rules="personalIDRule"
                    v-model="userData.personalID"
                    required
                    outlined
                  ></v-text-field>
                </v-row>

                <v-row justify="start">
                  <v-select
                    :items="gen"
                    label="เพศ"
                    v-model="userData.gender"
                    required
                    :rules="checkdata"
                    outlined
                  ></v-select>
                </v-row>

                <v-row justify="start">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    value="userData.BD"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="userData.BD"
                        label="วันเกิด"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        required
                        :rules="checkdata"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="userData.BD"
                      max="2000-12-31"
                      min="1940-01-01"
                    ></v-date-picker>
                  </v-menu>
                </v-row>

                <v-row justify="start">
                  <v-textarea
                    label="ที่อยู่"
                    v-model="userData.address"
                    color="blue"
                    :rules="AddressRule"
                    required
                    outlined
                  >
                    <template v-slot:label>
                      <div>ที่อยู่ <small>(ต้องไม่เกิน 100 ตัว)</small></div>
                    </template>
                  </v-textarea>
                </v-row>

                <v-row justify="start">
                  <v-select
                    :items="jobs"
                    label="อาชีพ"
                    v-model="userData.career"
                    :rules="checkdata"
                    required
                    outlined
                  ></v-select>
                </v-row>

                <v-row justify="start">
                  <v-text-field
                    label="โทรศัพท์ติดต่อ"
                    :rules="PhoneNumberRule"
                    v-model="userData.phone"
                    required
                    outlined
                  ></v-text-field>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- panel ข้อมูลทางการเงิน -->

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                expand-icon="mdi-menu-down"
                dark
                color="secondary"
              >
                <v-row justify="start">
                  <h3 align="left" style="color: white">ข้อมูลทางการเงิน</h3>
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content dark color="white">
                <v-row justify="start">
                  <v-sheet color="white" width="50" height="40"></v-sheet>
                </v-row>

                <v-row justify="start">
                  <v-select
                    :items="banklist"
                    label="ธนาคาร"
                    v-model="userData.bank"
                    outlined
                    :disabled="!userData.bankaccountNumber == ''"
                  ></v-select>
                </v-row>
                <v-row justify="start">
                  <v-text-field
                    v-if="userData.bank"
                    label="หมายเลขบัญชีธนาคาร"
                    :rules="bankaccountNumberRule"
                    outlined
                    v-model="userData.bankaccountNumber"
                    required
                  ></v-text-field>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- panel ข้อมูลเกี่ยวกับการออกกำลังกาย -->
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                expand-icon="mdi-menu-down"
                dark
                color="secondary"
              >
                <v-row justify="start">
                  <h3 align="left" style="color: white">ข้อมูลเกี่ยวกับการออกกำลังกาย</h3>
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content dark color="white">
                <v-row justify="start">
                  <v-sheet color="white" width="50" height="40"></v-sheet>
                </v-row>

                <v-row justify="start">
                  <v-select
                    :items="['ลดน้ำหนัก', 'เพิ่มกล้ามเนื้อ', 'หุ่นที่ดี', 'เพื่อสุขภาพ']"
                    label="เป้าหมายในการออกกำลังกาย"
                    v-model="userData.purpose"
                    required
                    outlined
                    :rules="checkdata"
                  ></v-select>
                </v-row>

                <v-row justify="start">
                  <p align="left" style="font-size: 80%">ความถนัดในการออกกำลังกาย</p>
                </v-row>

                <v-row justify="start">
                  <v-col cols="10" sm="6" md="6">
                    <v-checkbox
                      v-model="userData.ec_skill"
                      label="เวทเทรนนิ่ง"
                      value="เวทเทรนนิ่ง"
                      :rules="checkboxRule"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="userData.ec_skill"
                      label="แอโรบิค"
                      value="แอโรบิค"
                      :rules="checkboxRule"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="userData.ec_skill"
                      label="ออกกำลังกายทั่วไป"
                      value="ออกกำลังกายทั่วไป"
                      :rules="checkboxRule"
                    ></v-checkbox>
                  </v-col>

                  <v-col cols="10" sm="6" md="6">
                    <v-checkbox
                      v-model="userData.ec_skill"
                      label="โยคะ"
                      value="โยคะ"
                      :rules="checkboxRule"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="userData.ec_skill"
                      label="คาร์ดิโอ"
                      value="คาร์ดิโอ"
                      :rules="checkboxRule"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="userData.ec_skill"
                      label="อื่นๆ"
                      value="อื่นๆ"
                      :rules="checkboxRule"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- end panel -->

          <v-row justify="end">
            <v-sheet color="white" width="100" height="40"></v-sheet>
          </v-row>
          <v-row justify="center">
            <v-btn
              color="success"
              class="pa-7 text-h6"
              :disabled="loading"
              type="submit"
              :loading="loading"
              >อัพเดทข้อมูลผู้ใช้</v-btn
            >
          </v-row>
        </v-form>
      </v-card>
    </v-row>

    <!-- snack bar -->

    <!-- <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snacktext }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar> -->

    <v-dialog v-model="snackbar" max-width="400">
      <v-card dark color="white">
        <v-toolbar color="primary">
          <v-row>
            <v-col cols="1">
              <v-icon color="accent">mdi-check-bold</v-icon>
            </v-col>
            <v-col cols="5"> แจ้งเตือน </v-col>
          </v-row> </v-toolbar
        ><br />
        <v-card-text>
          <p style="color: gray">{{ snacktext }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
function personalID_check(id) {
  let i = 0,
    sum = 0;
  for (i = 0, sum = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i);
  if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) {
    // console.log(sum);
    // console.log((11 - sum % 11) % 10);
    // console.log(id.charAt(12));
    console.log("wrong personal id!");
    return false;
  }
  console.log("this is personal id!");
  return true;
}

import firebase from "firebase";
export default {
  name: "Setting",
  data() {
    return {
      userData: {
        email: null,
        firstname: null,
        lastname: null,
        role: null,
        personalID: null,
        address: null,
        gender: null,
        BD: null,
        bank: null,
        bankaccountNumber: "",
        phone: null,
        career: null,
        ec_skill: null,
        purpose: null,
        profilePic: "",
      },
      gen: ["ชาย", "หญิง", "ไม่ระบุ"],
      banklist: [
        "ธนาคารกรุงเทพ",
        "ธนาคารกสิกรไทย",
        "ธนาคารกรุงไทย",
        "ธนาคารทหารไทย",
        "ธนาคารไทยพาณิชย์",
        "ธนาคารกรุงศรีอยุธยา",
        "ธนาคารออมสิน",
      ],
      jobs: ["ทำงานราชการ", "ทำงานเอกชน", "ทำอาชีพอิสระ"],
      personalIDRule: [
        (value) => !!value || "โปรดกรอกฟิลด์นี้",
        (value) =>
          (value &&
            value.length == 13 &&
            value.match(/^[0-9]+$/) &&
            personalID_check(value)) ||
          "หมายเลขบัตรประชาชนต้องเป็นตัวเลข และ เท่ากับ 13 ตัว",
      ],
      AddressRule: [
        (value) => !!value || "โปรดกรอกฟิลด์นี้",
        (value) =>
          (value &&
            value.length <= 100 &&
            !value.match("'") &&
            !value.match('"') &&
            !value.match("#") &&
            !value.match("AND") &&
            !value.match("OR") &&
            !value.match("   ") &&
            !value.match(";")) ||
          "ที่อยู่ต้องไม่เกิน 100 ตัวอักษร และ ไม่มีอัขระพิเศษดังนี้ (\' \" # AND OR spacebar(มากกว่า 3 ตัว) ;)",
      ],
      bankaccountNumberRule: [
        (value) => !!value || "โปรดกรอกฟิลด์นี้",
        (value) =>
          (value &&
            (this.userData.bank == "ธนาคารออมสิน"
              ? value.length == 12
              : value.length == 10) &&
            value.match(/^[0-9]+$/)) ||
          // typeof parseInt(value) == "number" &&
          // parseInt(value) >= 0) ||
          "หมายเลขบัญชีธนาคารไม่ถูกต้อง",
      ],
      PhoneNumberRule: [
        (value) => !!value || "โปรดกรอกฟิลด์นี้",
        (value) =>
          (value &&
            value.length == 10 &&
            value.match(/^[0-9]+$/) &&
            ((value[0] == "0" && value[1] == "6") ||
              value[1] == "8" ||
              value[1] == "9")) ||
          "เบอร์โทรศัพท์ต้องเป็นตัวเลข และ มี 10 หลัก",
      ],
      checkdata: [(val) => (val || "").length > 0 || "โปรดกรอกฟิลด์นี้"],
      checkboxRule: [
        (ec_skill) => (ec_skill || []).length > 0 || "โปรดเลือกอย่างน้อย 1 ในรายการนี้",
      ],
      loading: false,
      snackbar: false,
      snacktext: null,
      //Profile Picture
      profilePic: null,
      imageData: null,
      altPic: null,
      checkUrl: null,
      checkimage: [
        (value) =>
          !value || value.size / 1024 / 1024 < 2 || "กรุณาอัพไฟล์ที่มีขนาดไม่เกิน 2 MB",
      ],
      uploadimage: false,

      menu: false,
    };
  },
  methods: {
    back() {
      let previous = this.$store.state.previous.pre;
      this.$router.push(previous);
    },

    calldata_from_store() {
      let userStore = this.$store.getters["userData"].data;

      this.userData.email = this.$store.getters["userData"].email;

      this.userData.firstname =
        userStore.fullName == null ? null : userStore.fullName.split(" ")[0];
      this.userData.lastname =
        userStore.fullName == null ? null : userStore.fullName.split(" ")[1];
      this.userData.role =
        userStore.role == null
          ? null
          : userStore.role == "trainer"
          ? "เทรนเนอร์"
          : "ผู้ใช้ทั่วไป";
      this.userData.personalID = userStore.PersonalID;
      this.userData.address = userStore.Address;
      this.userData.gender = userStore.Gender;
      this.userData.BD = userStore.Birthday;
      this.userData.bank = userStore.Bank;
      this.userData.bankaccountNumber = userStore.BankAccountNumber;
      this.userData.phone = userStore.PhoneNumber;
      this.userData.career = userStore.Career;
      this.userData.ec_skill = userStore.EC_skill;
      this.userData.purpose = userStore.Purpose;
      this.userData.profilePic = userStore.profilePic;
    },
    async fatch_userData() {
      //let uid = this.$store.getters["userData"].data.uid;
      let docid = this.$store.getters["userData"].uid;
      let db = firebase.firestore();
      let userRef = db.collection("userData");
      //let userData = await userRef.where("uid", "==", uid).get();
      let userDatadoc = await userRef.doc(docid).get();

      this.userData.email = this.$store.getters["userData"].email;

      this.userData.firstname =
        userDatadoc.data().fullName == null
          ? null
          : userDatadoc.data().fullName.split(" ")[0];
      this.userData.lastname =
        userDatadoc.data().fullName == null
          ? null
          : userDatadoc.data().fullName.split(" ")[1];
      this.userData.role =
        userDatadoc.data().role == null
          ? null
          : userDatadoc.data().role == "trainer"
          ? "เทรนเนอร์"
          : "ผู้ใช้ทั่วไป";
      this.userData.personalID = userDatadoc.data().PersonalID;
      this.userData.address = userDatadoc.data().Address;
      this.userData.gender = userDatadoc.data().Gender;
      this.userData.BD = userDatadoc.data().Birthday;
      this.userData.bank = userDatadoc.data().Bank;
      this.userData.bankaccountNumber = userDatadoc.data().BankAccountNumber;
      this.userData.phone = userDatadoc.data().PhoneNumber;
      this.userData.career = userDatadoc.data().Career;
      this.userData.ec_skill = userDatadoc.data().EC_skill;
      this.userData.purpose = userDatadoc.data().Purpose;
      this.userData.profilePic = userDatadoc.data().profilePic;

      let form = {
        uid: docid,
        data: userDatadoc.data(),
        email: this.$store.getters["userData"].email,
      };
      this.$store.commit("setUserData", form);
    },

    async updateUserData(e) {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let docid = this.$store.getters["userData"].uid;
        // let uid = user.uid
        let db = firebase.firestore();
        let userRef = db.collection("userData");
        // let userData = await userRef.where("uid", "==", uid).get();

        // let docId;
        // userData.forEach((doc) => {
        //   console.log(doc);
        //   docId = doc.id;
        // });

        let userDataRef = userRef.doc(docid);
        userDataRef
          .update({
            fullName: [this.userData.firstname, this.userData.lastname].join(" "),
            PersonalID: this.userData.personalID,
            Address: this.userData.address,
            Birthday: this.userData.BD,
            Gender: this.userData.gender,
            Career: this.userData.career,
            PhoneNumber: this.userData.phone,
            EC_skill: this.userData.ec_skill,
            Bank: this.userData.bank,
            BankAccountNumber: this.userData.bankaccountNumber,
            Purpose: this.userData.purpose,
            profilePic: this.userData.profilePic,
          })
          .then(() => {
            console.log("update userProfile successfully !!");

            this.fatch_userData();
            //this.update_store(userRef,this.$store.getters["userData"].uid);
            // console.log("update displayname successfully !!");
            this.snacktext = "อัพเดทข้อมูลผู้ใช้เรียบร้อย";
            this.snackbar = true;
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            console.log("update error : ", error);
          });
      }
      e.preventDefault();
    },
    // Upload Picture method
    onUpload(e) {
      this.imageData = e;
      this.altPic = this.userData.profilePic;
      //this.checkurl.push(URL.createObjectURL(e));
      //console.log(this.checkurl);
      console.log("Uploading...");
      //this.picture = null;
      const storageRef = firebase;
      storageRef
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData)
        .then((data) => {
          data.ref.getDownloadURL().then((url) => {
            this.userData.profilePic = url;
            console.log(this.userData.profilePic);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearPic() {
      console.log("Click Clear");
      console.log("picture url: " + this.userData.profilePic);
      this.userData.profilePic = this.altPic;
      this.uploadimage = false;
      console.log(this.uploadimage);
    },

    // async update_store(userRef,docid){
    //     //let userData = await userRef.where("uid", "==", user.uid).get();
    //       let userData = await userRef.doc(docid).get();
    //      // userData.forEach((doc) => {
    //         let form = {
    //           uid: doc.id,
    //           data: doc.data(),
    //           email: user.email,};
    //         console.log(form);
    //       this.$store.commit("setUserData", form);
    //     //});
    // },
  },
  mounted() {
    this.fatch_userData();
  },
  created() {
    this.calldata_from_store();
  },
};
</script>

<style scoped>
.box {
  background-color: rgb(255, 255, 255);
  border: 2px solid rgb(205, 205, 253);
  padding: 5% 15% 10% 15%;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  height: 100%;
  box-shadow: 2;
}
.bigbox {
  background-color: rgb(255, 255, 255);
  text-align: center;
  padding: 2% 2% 2% 2%;
  width: 100%;
  height: 100%;
  border: 2px solid rgb(152, 152, 255);
  border-radius: 10px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
}
.tab {
  margin-left: auto;
  margin-right: auto;
}
</style>
