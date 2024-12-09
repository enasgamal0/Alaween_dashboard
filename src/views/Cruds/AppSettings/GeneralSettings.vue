<template>
  <div class="crud_form_wrapper">
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.contact_admins") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #1F92D6">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <div class="row justify-content-center">
            <div class="col-l2">
              <div class="add_another" @click="addRow()">
                <i class="fas fa-plus"></i>
              </div>
            </div>
            <div
              class="col-lg-6 col-12"
              v-for="(item, index) in phones"
              :key="'l' + index"
            >
              <div class="item d-flex align-items-center">
                <base-input
                  class="w-100"
                  type="tel"
                  :placeholder="$t('PLACEHOLDERS.phone')"
                  v-model.trim="item.phone"
                />

                <div class="all_actions">
                  <span class="add_another" @click="removeRow(index)">
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.WhatsApp_contact')"
            v-model.trim="data.WhatsApp_contact"
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.facebook')"
            v-model.trim="data.facebook"
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.instagram')"
            v-model.trim="data.instagram"
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.snapchat')"
            v-model.trim="data.snapchat"
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.twitter')"
            v-model.trim="data.twitter"
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.tiktok')"
            v-model.trim="data.tiktok"
          />
          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button
              class="mt-2"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.save')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
            />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "GeneralSettings",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        WhatsApp_contact: null,
        twitter: null,
        tiktok: null,
        instagram: null,
        facebook: null,
        snapchat: null,
      },
      // End:: Data Collection To Send

      phones: [
        {
          phone: "",
        },
      ],
    };
  },

  methods: {
    addRow() {
      this.phones.push({ phone: "" });
    },

    removeRow(index) {
      this.phones.splice(index, 1);
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=contact`,
        });
        // Start:: Set Data
        // Transform the API response
        this.phones = res.data.data[0].value?.mobile?.map((phone) => ({
          phone: phone,
        }));
        this.data.WhatsApp_contact = res.data.data[0].value?.whatsapp;
        this.data.twitter = res.data.data[0].value?.x;
        this.data.tiktok = res.data.data[0].value?.tiktok;
        this.data.instagram = res.data.data[0].value?.instagram;
        this.data.facebook = res.data.data[0].value?.facebook;
        this.data.snapchat = res.data.data[0].value?.snapchat;

        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = !this.isWaitingRequest;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "contact");

      this.phones.forEach((element, index) => {
        REQUEST_DATA.append(`value[mobile][${index}]`, element.phone);
      });

      REQUEST_DATA.append("value[whatsapp]", this.data.WhatsApp_contact);
      REQUEST_DATA.append("value[tiktok]", this.data.tiktok);
      REQUEST_DATA.append("value[x]", this.data.twitter);
      REQUEST_DATA.append("value[instagram]", this.data.instagram);
      REQUEST_DATA.append("value[facebook]", this.data.facebook);
      REQUEST_DATA.append("value[snapchat]", this.data.snapchat);

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `settings`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.submitForm();
    },
    // End:: validate Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

<style lang="scss" scoped>
.item {
  gap: 10px;
}

.all_action {
  display: flex;
  gap: 15px;
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;

  .fa-trash {
    color: #ff2159;
    cursor: pointer;
  }
}
</style>

value:{ phones:[ "0567837943", "0567837943", "0567837943", ] }
