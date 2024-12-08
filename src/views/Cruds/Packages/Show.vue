<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showPackage") }}</h4>
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
          <!-- Start:: Capacity Input -->
          <base-select-input
            col="6"
            :optionsList="capacities"
            :placeholder="$t('PLACEHOLDERS.capacity')"
            :multiple="true"
            v-model="data.capacity"
            disabled
          />
          <!-- End:: Capacity Input -->

          <!-- Start:: count_order Input -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.package_count_order')"
            v-model.trim="data.count_order"
            disabled
          />
          <!-- End:: count_order Input -->

          <!-- Start:: perioud Input -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.package_duration')"
            v-model.trim="data.perioud"
            disabled
          />
          <!-- End:: perioud Input -->

          <!-- Start:: price Input -->
          <base-input
            col="6"
            type="number"
            :placeholder="$t('PLACEHOLDERS.package_price')"
            v-model.trim="data.price"
            disabled
          />
          <!-- End:: price Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.count_use')"
            v-model.trim="data.count_use"
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
  name: "ShowPackage",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name_ar: null,
        name_en: null,
        capacity_id: null,
        count_order: null,
        perioud: null,
        price: null,
        count_use: null,
        created_at: null,
        active: true,
      },
      capacities: [],

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
    async showPackage() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `packages/${this.$route.params?.id}`,
        });
        this.data.name_ar = res.data.data.Package.name_ar;
        this.data.name_en = res.data.data.Package.name_en;
        this.data.count_order = res.data.data.Package.count_order;
        this.data.perioud = res.data.data.Package.perioud;
        this.data.price = res.data.data.Package.price;
        this.data.count_use = res.data.data.Package.count_use;
        this.data.created_at = res.data.data.Package.created_at;
        this.data.capacity = res.data.data.Package.capacities.map(item => ({ name: item.name }));
        this.data.active = res.data.data.Package.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showPackage();
  },
};
</script>
