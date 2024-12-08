<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showClient", { name: data.name }) }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #1F92D6">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <!-- ==== Start:: Status Badges ==== -->
      <div class="badges_wrapper justify-content-between">
        <div class="wrapper">
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.numberOfVisits", { number: data.numberOfVisits }) }}
          </v-chip>
          <v-chip
            color="amber darken-2"
            text-color="white"
            v-if="data.lastVisit"
          >
            {{ $t("TITLES.lastVisit", { date: data.lastVisit }) }}
          </v-chip>
        </div>
        <v-chip :color="data.active ? 'green' : 'red'" text-color="white">
          {{ data.active ? $t("STATUS.active") : $t("STATUS.notActive") }}
        </v-chip>
      </div>
      <!-- ==== End:: Status Badges ==== -->

      <!-- ==== Start:: Client Main Data ==== -->
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <div class="preview-container text-center my-3">
            <img
              col="12"
              :src="data.image.path"
              :alt="$t('PLACEHOLDERS.personalImage')"
            />
          </div>
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.name')"
            v-model.trim="data.name"
            disabled
          />
          <!-- End:: Name Input -->

          <!-- Start:: Email Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            disabled
          />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Input -->
          <base-input
            col="6"
            type="tel"
            :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="data.phone"
            disabled
          />
          <!-- End:: Phone Input -->

          <!-- Start:: Roles Input -->
          <!-- <base-select-input
            col="6"
            :optionsList="allRoles"
            :placeholder="$t('PLACEHOLDERS.role')"
            v-model="data.role"
            multiple
            disabled
          /> -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.role')"
            v-model="data.role"
            multiple
            disabled
          />

          <base-input
            col="6"
            v-if="data.type == 'cleaner'"
            type="text"
            :placeholder="$t('PLACEHOLDERS.whatsApp')"
            v-model.trim="data.whatsApp"
            required
            disabled
          />
          <base-select-input
            v-if="data.type == 'cleaner'"
            col="6"
            :optionsList="allAreas"
            multiple
            :placeholder="$t('PLACEHOLDERS.areas')"
            v-model.trim="data.areas"
            required
            disabled
          />
          <!-- End:: Roles Input -->
        </div>
      </form>
      <!-- ==== End:: Client Main Data ==== -->
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "SingleClient",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loading Data
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Table Data
      addressesTableHeaders: [
        { text: this.$t("TABLES.Addresses.serialNumber") },
        { text: this.$t("TABLES.Addresses.address") },
        { text: this.$t("TABLES.Addresses.longitude") },
        { text: this.$t("TABLES.Addresses.latitude") },
        { text: this.$t("TABLES.Addresses.type") },
        { text: this.$t("TABLES.Addresses.isDefault") },
      ],
      // End:: Table Data

      // Start:: Data
      data: {
        image: {
          path: null,
          file: null,
        },
        name: null,
        email: null,
        phone: null,
        type: null,
        role: null,
        active: null,
        whatsApp: null,
        areas: [],
        joiningDate: null,
        lastVisit: null,
        addresses: [],
        numberOfVisits: null,
      },
      allRoles: [],
      allAreas: [],
      // End:: Data
    };
  },
  computed: {
    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("BUTTONS.yes"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
  },

  methods: {
    async getAllareas() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "areas?page=0&limit=0",
        });
        // console.log("All Data ==>", res.data.data);
        this.allAreas = res.data.data
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admins/${this.id}`,
        });

        this.data.image.path = res.data.data.Admin.user.image;
        this.data.name = res.data.data.Admin.user.name;
        this.data.email = res.data.data.Admin.user.email;
        this.data.phone = res.data.data.Admin.user.mobile;
        this.data.whatsApp = res.data.data.Admin.user.whattsapp;
        this.data.areas = res.data.data.Admin.user.areas;
        // this.data.role = res.data.data.Admin.user.roles[0]?.name;
        this.data.role = res.data.data.Admin.user.permissions[0]?.name;
        this.data.type = res.data.data.Admin.user.type;
        this.data.active = res.data.data.Admin.user.is_active;
        this.data.numberOfVisits = res.data.data.Admin.user.login_count;
        this.data.lastVisit = res.data.data.Admin.user.last_login;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Show
  },

  created() {
    // Start:: Fire Methods
    this.getDataToShow();
    this.getAllareas();
    // End:: Fire Methods
  },
};
</script>
