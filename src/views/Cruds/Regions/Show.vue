<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_region_data") }}</h4>
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

          <!-- Start:: map -->
          <MapRegionSelector
            ref="map_point"
            :initialPoints="regionPoints"
            @saveRegion="handleSaveRegion"
            :fromPage="'show'"
          />
          <!-- End:: map -->

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
import moment from "moment";
import MapRegionSelector from "../../../components/MapRegionSelector.vue";
export default {
  name: "CreateCity",
  components: { MapRegionSelector },

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
        area_id: null,
        active: true,
      },
      // End:: Data Collection To Send
      areas: [],
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,

      regionPoints: [],
      coordinates: [],
    };
  },

  methods: {
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

    handleSaveRegion(coordinates) {
      // Handle the saved region coordinates from the child component

      this.coordinates = coordinates;
    },

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

      if (this.$refs.map_point.coordinates) {
        this.$refs.map_point.coordinates.forEach((point, index) => {
          if (point) {
            REQUEST_DATA.append(`points[lat${index}]`, point.lat);
            REQUEST_DATA.append(`points[long${index}]`, point.lng);
          }
        });
      }

      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);

      // Start:: Append Request Data
      try {
        await this.$axios({
          method: "POST",
          url: `areas`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/areas/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
    // start show data
    async showCity() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `areas/${this.$route.params?.id}`,
        });
        this.data.name_ar = res.data.data.Area.name_ar;
        this.data.name_en = res.data.data.Area.name_en;
        this.data.active = res.data.data.Area.is_active;

        // Convert points to an array of objects with numeric values
        // Convert string values to numbers and create a new array
        this.regionPoints = res.data.data.Area.location.map((point) => ({
          lat: parseFloat(point.lat),
          lng: parseFloat(point.lng),
        }));

        console.log("this.regionPoints", this.regionPoints);
      } catch (error) {
        this.loading = false;
        console.log(error?.response?.data?.message);
      }
    },
    // end show data
  },

  created() {
    this.showCity();
  },
};
</script>
