<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.add_ads") }}</h4>
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
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input
            col="12"
            identifier="image"
            :placeholder="$t('PLACEHOLDERS.contents')"
            @selectImage="selectImage"
            :acceptVideo="true"
            required
          />
          <!-- End:: Image Upload Input -->

          <!-- <BaseImageUploadInput @file-selected="handleFileSelected" @file-removed="handleFileRemoved" /> -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            required
          />

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('PLACEHOLDERS.start_date')"
            v-model.trim="data.publish_start_date"
            required
          />

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('PLACEHOLDERS.end_date')"
            v-model.trim="data.publish_end_date"
            required
          />

          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
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
import BaseImageUploadInput from "../../../components/formInputs/BaseImageUploadInput.vue";
import moment from "moment";

export default {
  name: "CreateAds",

  components: { BaseImageUploadInput },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      file: null,
      fileType: "",

      // Start:: Data Collection To Send
      data: {
        media: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        active: true,
        publish_start_date: null,
        publish_end_date: null,
      },
      // End:: Data Collection To Send

      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  computed: {},

  methods: {
    selectImage(selectedImage) {
      this.data.media = selectedImage;
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

      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.data.publish_start_date) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.startDate"));
        return;
      } else if (!this.data.publish_end_date) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.endDate"));
        return;
      } else if (!this.data.media) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.media"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("name[ar]", this.data.nameAr);

      REQUEST_DATA.append("name[en]", this.data.nameEn);

      if (this.data.media.file) {
        REQUEST_DATA.append("media", this.data.media.file); // Append the file to the FormData
        // REQUEST_DATA.append("image_type", this.file); // Append the file to the FormData
      }

      REQUEST_DATA.append("start_date", this.data.publish_start_date);
      REQUEST_DATA.append("end_date", this.data.publish_end_date);
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `sliders`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/ads/all" });
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
  },
};
</script>
