<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_main_section") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <base-image-upload-input
            col="12"
            identifier="image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.section_image')"
            @selectImage="selectImage"
            disabled
          />

          <!-- Start:: Ar Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            disabled
          />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />
          <!-- End:: En Name Input -->

          <!-- Start:: description_in_arabic Input -->
          <base-input
            col="6"
            type="textarea"
            cols="6"
            :placeholder="$t('PLACEHOLDERS.description_in_arabic')"
            v-model.trim="data.descAr"
            disabled
          />
          <!-- End:: description_in_arabic Input -->

          <!-- Start:: description_in_english Input -->
          <base-input
            col="6"
            type="textarea"
            cols="6"
            :placeholder="$t('PLACEHOLDERS.description_in_english')"
            v-model.trim="data.descEn"
            disabled
          />
          <!-- End:: description_in_english Input -->

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
export default {
  name: "CreateArea",

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
        payment_status: null,
        nameAr: null,
        nameEn: null,
        descAr: null,
        descEn: null,
        active: true,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    paymentStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.paid"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.unpaid"),
          value: 0,
        },
      ];
    },
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories/${this.$route.params.id}`,
        });
        // Start:: Set Data
        this.data.image.path = res.data.data.Category.image;
        this.data.nameAr = res.data.data.Category.trans.name.ar;
        this.data.nameEn = res.data.data.Category.trans.name.en;
        this.data.descAr = res.data.data.Category.trans.description.ar;
        this.data.descEn = res.data.data.Category.trans.description.en;
        this.data.active = res.data.data.Category.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
