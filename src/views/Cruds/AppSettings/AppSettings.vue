<template>
  <div class="crud_form_wrapper app_settings_class">
    <!-- Start:: Single Step Form Content -->
    <div class="table_title_wrapper">
      <div class="title_text_wrapper">
        <h5 style="color: #1F92D6">{{ $t("SIDENAV.settings.general") }}</h5>
      </div>
      <div class="col-12 text-end">
        <v-btn @click="$router.go(-1)" style="color: #1F92D6">
          <i class="fas fa-backward"></i>
        </v-btn>
      </div>
    </div>
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
        <!-- Start:: video_limit Input -->
          <base-input
            type="number"
            col="12"
            :placeholder="$t('PLACEHOLDERS.video_limit')"
            v-model="data.video_limit"
          />
        <!-- End:: video_limit Input -->
        <!-- Start:: distance Input -->
        <base-input
          type="number"
          col="12"
          :placeholder="`${$t('PLACEHOLDERS.distance')}`"
          v-model.trim="data.distance"
        />
        <!-- End:: distance Input -->
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
import { mapGetters } from "vuex";
export default {
  name: "AppSetting",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data
      data: {
        video_limit: null,
        distance: null,
      },
      // End:: Data
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),
    // End:: Vuex Getters
    cancel_options() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: "1",
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.no"),
          value: "0",
        },
      ];
    },
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=general`,
        });
        // console.log("DATA =>", res.data.data);
        const settings = res.data.data[0].value;
        this.data.video_limit = settings.video_limit;
        this.data.distance = settings.distance;
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
      REQUEST_DATA.append("key", "general");
      REQUEST_DATA.append("value[video_limit]", this.data.video_limit);
      REQUEST_DATA.append(
        "value[distance]",
        this.data.distance
      );
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
      this.isWaitingRequest = true;
      if (!this.data.video_limit || this.data.video_limit === "null") {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.video_limit"));
        return;
      }
      else if (!this.data.distance || this.data.distance === "null") {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.distance"));
        return;
      }
      else {
        this.submitForm();
        return;
      }
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

<style>
.app_settings_class form .input_wrapper.top_label .form-label{
  font-size: 14px !important;
  top: -10px !important;
}
@media (max-width: 1080px) {
  .app_settings_class form .input_wrapper.top_label .form-label{
    font-size: 13px !important;
    top: -10px !important;
  }
  .app_settings_class form .input_wrapper.top_label input, .app_settings_class form .input_wrapper.top_label.select_wrapper .multiselect .multiselect__tags{
    padding: 30px 12px !important;
  }
}
</style>

<style lang="scss" scoped>
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
