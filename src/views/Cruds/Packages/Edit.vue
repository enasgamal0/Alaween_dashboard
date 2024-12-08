<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editPackage") }}</h4>
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
            :multiple="true"
            v-model="data.capacity"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditPackage",

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
        active: true,
        capacity: {},
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
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
        this.submitForm();
    },

    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      if (this.data.name_ar) {
        REQUEST_DATA.append("name[ar]", this.data.name_ar);
      }
      if (this.data.name_en) {
        REQUEST_DATA.append("name[en]", this.data.name_en);
      }
      this.data.capacity.map((capacity, index) => {
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
      REQUEST_DATA.append("_method", "PUT");
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      try {
        await this.$axios({
          method: "POST",
          url: `packages/${this.$route.params?.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/packages/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },

    // start show data
    async showPackage() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `packages/${this.$route.params?.id}`,
        });
        // const capacity_format1 = res.data.data.Package.capacities;
        // const capacity_format2 = capacity_format1.map(item => ({
        //     id: item.id,
        //     name: item.name.en,
        //     name_ar: item.name.ar,
        //     name_en: item.name.en,
        //     is_active: item.is_active,
        //     double_perioud: item.double_perioud,
        //     count_finish_order: item.count_finish_order,
        //     created_at: item.created_at.split("T")[0]
        // }));
        this.data.name_ar = res.data.data.Package.name_ar;
        this.data.name_en = res.data.data.Package.name_en;
        this.data.count_order = res.data.data.Package.count_order;
        this.data.perioud = res.data.data.Package.perioud;
        this.data.price = res.data.data.Package.price;
        // this.data.capacity = capacity_format2;
        this.data.capacity = res.data.data.Package.capacities;
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
    this.getCapacities()
  },
};
</script>
