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
          <!-- Start:: Tax Input -->
          <base-input
            type="number"
            col="6"
            :placeholder="`${$t('PLACEHOLDERS.tax')} %`"
            v-model.trim="data.Tax"
          />
          <!-- End:: Tax Input -->
          <!-- Start:: Tax Input -->
          <base-select-input
            col="6"
            :optionsList="cancel_options"
            :placeholder="$t('SIDENAV.GeneralSetting.order_cancellation_mechanism')"
            v-model.trim="data.Cancel_order"
            required
          />
          <!-- End:: Tax Input -->
          <!-- Start:: Hours Inputs -->
          <base-input
            type="number"
            col="6"
            :placeholder="`${$t('SIDENAV.GeneralSetting.Possibility_canceling_reservation')}`"
            v-model.trim="data.Possibility_canceling_reservation"
          />
          <base-input
            type="number"
            col="6"
            :placeholder="`${$t('SIDENAV.GeneralSetting.Possibility_modifying_reservation')}`"
            v-model.trim="data.Possibility_modifying_reservation"
          />
          <base-input
            type="number"
            col="12"
            :placeholder="`${$t('SIDENAV.GeneralSetting.Limit_maximum_number_hours_create_order')}`"
            v-model.trim="data.Limit_maximum_number_hours_create_order"
          />
          <base-input
            type="number"
            col="12"
            :placeholder="`${$t('SIDENAV.GeneralSetting.Maximum_time_before_sending_order_details')}`"
            v-model.trim="data.Maximum_time_before_sending_order_details"
          />
          <base-input
            type="number"
            col="12"
            :placeholder="`${$t('SIDENAV.GeneralSetting.permissible_duration_additional_service')}`"
            v-model.trim="data.permissible_duration_additional_service"
          />
          <!-- End:: Hours Input -->
          <!-- Start:: Time Inputs -->
           <base-picker-input
            col="6"
            type="time"
            :placeholder="$t('SIDENAV.GeneralSetting.start_work')"
            v-model.trim="data.start_work"
            required
          />
          <base-picker-input
            col="6"
            type="time"
            :placeholder="$t('SIDENAV.GeneralSetting.end_work')"
            v-model.trim="data.end_work"
            required
          />
        <!-- End:: Time Inputs -->
        <!-- Start:: different_time_duration Input -->
          <base-input
            type="number"
            col="6"
            :placeholder="$t('SIDENAV.GeneralSetting.cleanDuration')"
            v-model="data.different_time_duration"
          />
        <!-- End:: different_time_duration Input -->

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
        different_time_duration: null,
        Tax: null,
        start_work: null,
        end_work: null,
        Cancel_order: null,
        Possibility_canceling_reservation: null,
        Possibility_modifying_reservation: null,
        Limit_maximum_number_hours_create_order: null,
        Maximum_time_before_sending_order_details: null,
        permissible_duration_additional_service: null,
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
          url: `settings?key=dashboard_setting`,
        });
        // console.log("DATA =>", res.data.data);
        const settings = res.data.data[0].value;
        this.data.Tax = settings.tax;
        this.data.different_time_duration = settings.different_time_duration;
        this.data.start_work = settings.start_work;
        this.data.end_work = settings.end_work;
        this.data.Cancel_order = settings.Cancel_order == 1 
          ? { id: 1, name: this.$t("PLACEHOLDERS.yes"), value: 1 } 
          : { id: 0, name: this.$t("PLACEHOLDERS.no"), value: 0 };
        this.data.Possibility_canceling_reservation = settings.Possibility_canceling_reservation;
        this.data.Possibility_modifying_reservation = settings.Possibility_modifying_reservation;
        this.data.Limit_maximum_number_hours_create_order = settings.Limit_maximum_number_hours_create_order;
        this.data.Maximum_time_before_sending_order_details = settings.Maximum_time_before_sending_order_details;
        this.data.permissible_duration_additional_service = settings.permissible_duration_additional_service;
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
      REQUEST_DATA.append("key", "dashboard_setting");
      REQUEST_DATA.append(
        "value[tax]",
        this.data.Tax
      );
      REQUEST_DATA.append("value[different_time_duration]", this.data.different_time_duration);
      REQUEST_DATA.append("value[start_work]", this.data.start_work);
      REQUEST_DATA.append("value[end_work]", this.data.end_work);
      REQUEST_DATA.append("value[Cancel_order]", this.data.Cancel_order?.value);
      REQUEST_DATA.append("value[Possibility_canceling_reservation]", this.data.Possibility_canceling_reservation);
      REQUEST_DATA.append("value[Possibility_modifying_reservation]", this.data.Possibility_modifying_reservation);
      REQUEST_DATA.append("value[Limit_maximum_number_hours_create_order]", this.data.Limit_maximum_number_hours_create_order);
      REQUEST_DATA.append("value[Maximum_time_before_sending_order_details]", this.data.Maximum_time_before_sending_order_details);
      REQUEST_DATA.append("value[permissible_duration_additional_service]", this.data.permissible_duration_additional_service);

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
      if (!this.data.Tax || this.data.Tax === "null") {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.Tax"));
        return;
      }
      if (!this.data.different_time_duration || this.data.different_time_duration === "null") {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.different_time_duration"));
        return;
      } else {
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
