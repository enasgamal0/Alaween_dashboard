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
          <div>
            <img v-for="img in AddimgUrls" :src="img" style="max-width: 150px;" class="mx-5 my-3"/>
          </div>
          <!-- End:: Image Upload Input -->

          <!-- <BaseImageUploadInput @file-selected="handleFileSelected" @file-removed="handleFileRemoved" /> -->
          <!-- Start:: Stores Input -->
          <base-select-input
            v-if="store_waiting == 'done'"
            col="12"
            :optionsList="stores"
            :placeholder="$t('PLACEHOLDERS.provider_name')"
            v-model.trim="data.store"
            disabled
          />
          <!-- End:: Stores Input -->
          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('SIDENAV.OffersManagement.offerTitleAr')"
            v-model.trim="data.nameAr"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('SIDENAV.OffersManagement.offerTitleEn')"
            v-model.trim="data.nameEn"
            disabled
          />

          <!-- Start:: Description Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.descriptionAr')"
            v-model.trim="data.descProd"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.descriptionEn')"
            v-model.trim="data.descProdEn"
            disabled
          />
          <!-- End:: Description Input -->

          <!-- Start:: Features Input -->
          <base-input
            v-if="data.featuresAr && data.featuresAr!='null'"
            col="12"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.featuresAr')"
            v-model.trim="data.featuresAr"
            disabled
          />
          <base-input
            v-if="data.featuresEn && data.featuresEn!='null'"
            col="12"
            type="textarea"
            :placeholder="$t('SIDENAV.OffersManagement.featuresEn')"
            v-model.trim="data.featuresEn"
            disabled
          />
          <!-- End:: Features Input -->

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('SIDENAV.OffersManagement.start_date')"
            v-model.trim="data.publish_start_date"
            disabled
          />

          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('SIDENAV.OffersManagement.end_date')"
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
  },

  created() {
    // Start:: Fire Methods
    this.getOffersData();
    // End:: Fire Methods
  },
};
</script>
