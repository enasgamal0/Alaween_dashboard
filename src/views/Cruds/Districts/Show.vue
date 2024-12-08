<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showDistrict") }}</h4>
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
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.name_en"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: City Input -->
          <base-select-input
            col="6"
            :optionsList="cities"
            :placeholder="$t('PLACEHOLDERS.city')"
            v-model="data.city"
            disabled
          />
          <!-- End:: City Input -->

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
  name: "ShowDistrict",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name_ar: null,
        name_en: null,
        city_id: null,
        count_finish_order: null,
        created_at: null,
        city: {},
        active: null,
      },
      cities: [],

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
    async showDistrict() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `districts/${this.$route.params?.id}`,
        });
        this.data.name_ar = res.data.data.District.name_ar;
        this.data.name_en = res.data.data.District.name_en;
        this.data.city = res.data.data.District.city;
        this.data.count_finish_order = res.data.data.District.count_finish_order;
        this.data.created_at = res.data.data.District.created_at;
        this.data.active = res.data.data.District.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showDistrict();
  },
};
</script>
