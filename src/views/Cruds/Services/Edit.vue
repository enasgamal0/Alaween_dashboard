<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editService") }}</h4>
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
            identifier="admin_image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')"
            @selectImage="selectImage"
            required
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameAr')"
            v-model.trim="data.name"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameEn')"
            v-model.trim="data.nameEn"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionAr')"
            v-model.trim="data.descProd"
            required
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionEn')"
            v-model.trim="data.descProdEn"
            required
          />
          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5 col-4">
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditService",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        name: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        active: null,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
    mostPaids() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: true,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: false,
        },
      ];
    },
  },

  methods: {
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
        this.submitForm();
    },

    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      if (this.data.name) {
        REQUEST_DATA.append("name[ar]", this.data.name);
      }
      if (this.data.nameEn) {
        REQUEST_DATA.append("name[en]", this.data.nameEn);
      }
      if (this.data.descProd) {
        REQUEST_DATA.append("description[ar]", this.data.descProd);
      }
      if (this.data.descProdEn) {
        REQUEST_DATA.append("description[en]", this.data.descProdEn);
      }
      if (this.data.image.file) {
        REQUEST_DATA.append("image", this.data.image.file); // Append the file to the FormData
      }

      REQUEST_DATA.append("_method", "PUT");
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      try {
        await this.$axios({
          method: "POST",
          url: `services/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/services/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },

    // start show data
    async showService() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `services/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.Service.image;
        this.data.name = res.data.data.Service.name_ar;
        this.data.nameEn = res.data.data.Service.name_en;
        this.data.descProd = res.data.data.Service.description_ar;
        this.data.descProdEn = res.data.data.Service.description_en;
        this.data.active = res.data.data.Service.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data

    async getRegions() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `regions`,
          params: {
            is_active: 1,
          },
        });
        // console.log("services =>", res.data.data);
        this.regions = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.showService();
    // End:: Fire Methods
  },
};
</script>
