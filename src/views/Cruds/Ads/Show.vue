<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.ads.edit") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #1F92D6">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>
        <div class="row">
          <div class="preview-container text-center my-3">
            <img
              col="12"
              :src="data.media?.path"
              :alt="$t('PLACEHOLDERS.personalImage')"
            />
          </div>
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('PLACEHOLDERS.start_date')"
            v-model.trim="data.publish_start_date"
            disabled
          />

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('PLACEHOLDERS.end_date')"
            v-model.trim="data.publish_end_date"
            disabled
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
              disabled
            ></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->
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
  name: "EditAds",

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
        media_type: null,
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

    // start all ads data
    async getAdsData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `sliders/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.data.Slider.name_ar;
        this.data.nameEn = res.data.data.Slider.name_en;
        this.data.publish_start_date = res.data.data.Slider.start_date;
        this.data.publish_end_date = res.data.data.Slider.end_date;
        this.data.active = res.data.data.Slider.is_active;
        this.data.media.path = res.data.data.Slider.media;
        // console.log(res.data.body.add_space)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all ads data
  },

  created() {
    // Start:: Fire Methods
    this.getAdsData();
    // End:: Fire Methods
  },
};
</script>

<style>
.preview-container img,
.preview-container video {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
}
</style>
