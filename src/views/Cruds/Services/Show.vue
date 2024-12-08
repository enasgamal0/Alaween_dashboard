<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showService") }}</h4>
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
          <!-- Start:: Image Upload Input -->
          <div class="preview-container text-center my-3">
            <img :src="data.image.path" alt="Product Image" />
          </div>
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameAr')"
            v-model.trim="data.name"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('TABLES.Services.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionAr')"
            v-model.trim="data.descProd"
            disabled
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('TABLES.Services.descriptionEn')"
            v-model.trim="data.descProdEn"
            disabled
          />
          <!-- End:: Name Input -->

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.count_finish_order')"
            v-model.trim="data.count_finish_order"
            disabled
          />
          <base-picker-input
            col="6"
            type="date"
            :placeholder="$t('TABLES.Workplaces.date')"
            v-model.trim="data.created_at"
            disabled
          />

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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShowService",

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
        count_finish_order: null,
        created_at: null,
        active: null,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  methods: {
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
        this.data.count_finish_order = res.data.data.Service.count_finish_order;
        this.data.created_at = res.data.data.Service.created_at;
        this.data.active = res.data.data.Service.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data
  },

  created() {
    // Start:: Fire Methods
    this.showService();
    // End:: Fire Methods
  },
};
</script>
