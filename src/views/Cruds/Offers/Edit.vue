<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addOffer") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #1f92d6">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-multi-image-upload-input
            :urls="AddimgUrls"
            multiple
            @onFileSelect="onFileSelect"
            @onFileRemove="AdddonFileRemove"
          >
            {{ $t("PLACEHOLDERS.imagesefed") }}
            {{ $t("PLACEHOLDERS.extendPhoto") }}
          </base-multi-image-upload-input>
          <!-- End:: Image Upload Input -->

          <!-- <BaseImageUploadInput @file-selected="handleFileSelected" @file-removed="handleFileRemoved" /> -->
          <!-- Start:: Stores Input -->
          <base-select-input
            v-if="store_waiting == 'done'"
            col="12"
            :optionsList="stores"
            :placeholder="$t('PLACEHOLDERS.provider_name')"
            v-model.trim="data.store"
            required
          />
          <!-- End:: Stores Input -->
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('SIDENAV.OffersManagement.offerTitleAr')"
            v-model.trim="data.nameAr"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('SIDENAV.OffersManagement.offerTitleEn')"
            v-model.trim="data.nameEn"
            required
          />

          <!-- Start:: Description Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.descriptionAr')"
            v-model.trim="data.descProd"
            required
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.descriptionEn')"
            v-model.trim="data.descProdEn"
            required
          />
          <!-- End:: Description Input -->

          <!-- Start:: Features Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.featuresAr')"
            v-model.trim="data.featuresAr"
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.featuresEn')"
            v-model.trim="data.featuresEn"
          />
          <!-- End:: Features Input -->

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('SIDENAV.OffersManagement.start_date')"
            v-model.trim="data.publish_start_date"
            required
          />

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('SIDENAV.OffersManagement.end_date')"
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
import BaseMultiImageUploadInput from "../../../components/formInputs/BaseMultiImageUploadInput.vue";
import moment from "moment";

export default {
  name: "CreateOffers",

  components: { BaseMultiImageUploadInput },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      stores: [],
      store_waiting: null,
      // End:: Loader Control Data

      file: null,
      fileType: "",
      AddimgUrls: [],
      additionalImages: [],
      imageId: [],

      // Start:: Data Collection To Send
      data: {
        media: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        featuresAr: null,
        featuresEn: null,
        active: true,
        store: {},
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
    onFileSelect(files) {
      this.additionalImages = files;
      console.log("additionalImages", this.additionalImages);
    },
    async getStores() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "stores?page=0&limit=0&is_active=1",
        });
        this.stores = res.data.data;
        this.store_waiting = "done";
      } catch (error) {
        this.store_waiting = "done";
        console.log(error.response.data.message);
      }
      this.getOffersData();
    },
    // start all offers data
    async getOffersData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `offers/${this.$route.params.id}`,
        });
        console.log("aaaa", this.stores);
        this.data.store = this.stores.find(
          (item) => item.id == res.data.data.Offer.store.id
        );
        this.data.nameAr = res.data.data.Offer.name_ar;
        this.data.nameEn = res.data.data.Offer.name_en;
        this.data.descProd = res.data.data.Offer.description_ar;
        this.data.descProdEn = res.data.data.Offer.description_en;
        this.data.featuresAr = res.data.data.Offer.features_ar;
        this.data.featuresEn = res.data.data.Offer.features_en;
        this.data.publish_start_date = res.data.data.Offer.from_date;
        this.data.publish_end_date = res.data.data.Offer.to_date;
        this.data.active = res.data.data.Offer.is_active;
        this.AddimgUrls =
          res.data.data.Offer.images &&
          res.data.data.Offer.images.map((item) => item.url);
        this.imageId = res.data.data.Offer.images.map(
          (item) => item.id
        );
        // this.data.media.path = res.data.data.Offer.images[0].url;
        // console.log(res.data.body.add_space)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all offers data

    selectImage(selectedImage) {
      this.data.media = selectedImage;
    },
    
    async AdddonFileRemove(index) {
      // Remove the image URL from imgUrls
      const imageId = this.AddimageId[index];

      // Remove the image from additionalImages
      this.$delete(this.additional_Images, index);
      try {
        await this.$axios({
          method: "DELETE",
          url: `/images/${imageId}`,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
        this.$delete(this.AddimgUrls, index);
      } catch (error) {
        this.isWaitingRequest = false;
        // Handle error as needed
        this.$message.error(error.response.data.message);
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
      if (!this.data.store) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.store_id"));
        return;
      } else if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.data.descProd) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.descAr"));
        return;
      } else if (!this.data.descProdEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.descEn"));
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
      REQUEST_DATA.append("description[ar]", this.data.descProd);
      REQUEST_DATA.append("description[en]", this.data.descProdEn);
      REQUEST_DATA.append("features[ar]", this.data.featuresAr);
      REQUEST_DATA.append("features[en]", this.data.featuresEn);
      if (this.additionalImages) {
        for (let image of this.additionalImages) {
            REQUEST_DATA.append("images[]", image);
        }
      }
      REQUEST_DATA.append("from_date", this.data.publish_start_date);
      REQUEST_DATA.append("to_date", this.data.publish_end_date);
      REQUEST_DATA.append("store_id", this.data.store?.id);
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      REQUEST_DATA.append("_method", "put");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `offers/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/offers/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getStores();
    // End:: Fire Methods
  },
};
</script>
