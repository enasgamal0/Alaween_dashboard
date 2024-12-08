<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addPackage") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #1F92D6">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.name_ar"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.name_en"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Capacity Input -->
          <base-select-input
            col="6"
            :optionsList="capacities"
            :placeholder="$t('PLACEHOLDERS.capacity')"
            v-model="data.capacity"
            :multiple="true"
            required
          />
          <!-- End:: Capacity Input -->

          <!-- Start:: count_order Input -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.package_count_order')"
            v-model.trim="data.count_order"
            required
          />
          <!-- End:: count_order Input -->

          <!-- Start:: perioud Input -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.package_duration')"
            v-model.trim="data.perioud"
            required
          />
          <!-- End:: perioud Input -->

          <!-- Start:: price Input -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.package_price')"
            v-model.trim="data.price"
            required
          />
          <!-- End:: price Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-6">
            <v-switch
              color="green"
              :label="
                data.active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.active"
              hide-details
            ></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

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
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CreatePackage",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      file: null,
      fileType: "",

      // Start:: Data Collection To Send
      data: {
        name_ar: null,
        name_en: null,
        capacity_id: null,
        count_order: null,
        perioud: null,
        price: null,
        active: true,
      },
      // End:: Data Collection To Send
      capacities: [],
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  methods: {
    async getCapacities() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `capacities`,
        });
        this.capacities = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
    },

    handleFileSelected({ file, fileType }) {
      this.file = file; // Store the selected file in your data
      this.fileType = fileType; // Store the selected file in your data
    },
    handleFileRemoved() {
      this.file = null; // Reset the file when it's removed
      this.fileType = "";
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      this.submitForm();
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.name_ar) {
        REQUEST_DATA.append("name[ar]", this.data.name_ar);
      }
      if (this.data.name_en) {
        REQUEST_DATA.append("name[en]", this.data.name_en);
      }
      this.data.capacity?.map((capacity, index) => {
      if (capacity) {
          REQUEST_DATA.append(`capacities[${index}]`, capacity.id);
        }
      });
      if (this.data.count_order) {
        REQUEST_DATA.append("count_order", this.data.count_order);
      }
      if (this.data.perioud) {
        REQUEST_DATA.append("perioud", this.data.perioud);
      }
      if (this.data.price) {
        REQUEST_DATA.append("price", this.data.price);
      }
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);

      // Start:: Append Request Data
      try {
        await this.$axios({
          method: "POST",
          url: `packages`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/packages/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    // End:: Fire Methods
    this.getCapacities();
  },
};
</script>
