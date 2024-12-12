<template>
  <div class="crud_form_wrapper">
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_main_section") }}</h4>
    </div>
    <div class="col-12 text-end">
      <v-btn @click="$router.go(-1)" style="color: #1f92d6">
        <i class="fas fa-backward"></i>
      </v-btn>
    </div>
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <div class="preview-container text-center my-3">
            <img
              col="12"
              :src="data.image?.path"
              :alt="$t('PLACEHOLDERS.personalImage')"
            />
          </div>
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            disabled
          />

          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            disabled
          />

          <div class="w-100">
            <div class="row justify-content-center">
              <div
                class="col-12"
                v-for="(item, index) in data.fields"
                :key="'l' + index"
              >
                <div class="item d-flex flex-wrap align-items-center">
                  <base-input
                    col="4"
                    class="w-100"
                    type="text"
                    :placeholder="$t('PLACEHOLDERS.field_name_ar')"
                    v-model.trim="item.name_ar"
                    disabled
                  />
                  <base-input
                    col="4"
                    class="w-100"
                    type="text"
                    :placeholder="$t('PLACEHOLDERS.field_name_en')"
                    v-model.trim="item.name_en"
                    disabled
                  />
                  <base-select-input
                    col="4"
                    class="w-100"
                    :optionsList="fieldTypes"
                    :placeholder="$t('PLACEHOLDERS.field_type')"
                    v-model="item.type"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateArea",

  computed: {
    fieldTypes() {
      return [
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.text"),
          value: "text",
        },
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.attachments"),
          value: "file",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.ddl"),
          value: "dropdown",
        },
      ];
    },
  },

  data() {
    return {
      isWaitingRequest: false,
      data: {
        image: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        active: true,
        fields: [
          {
            nameAr: "",
            nameEn: "",
            type: "text",
          },
        ],
      },
    };
  },

  methods: {
    addRow() {
      // Add new field object with index for proper binding
      this.data?.fields.push({
        nameAr: "",
        nameEn: "",
        type: "text",
      });
    },

    removeRow(index) {
      this.data?.fields.splice(index, 1);
    },

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `categories/${this.$route.params.id}`,
        });
        // Start:: Set Data
        this.data.image.path = res.data.data.Category.logo;
        this.data.nameAr = res.data.data.Category.name_ar;
        this.data.nameEn = res.data.data.Category.name_en;
        this.data.fields = res.data.data.Category.fields.map((field) => ({
          id: field.id,
          name_ar: field.name_ar,
          name_en: field.name_en,
          type: {
            id: 0,
            value: field.type,
            name:
              field.type == "dropdown"
                ? this.$t("PLACEHOLDERS.ddl")
                : field.type == "text"
                ? this.$t("PLACEHOLDERS.text")
                : field.type == "file"
                ? this.$t("PLACEHOLDERS.attachments")
                : field.type,
          },
        }));
        this.data.active = res.data.data.Category.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
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

      if (this.data.image.file) {
        REQUEST_DATA.append("logo", this.data.image.file);
      }
      // Start:: Append Request Data
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);
      this.data?.fields.forEach((item, index) => {
        REQUEST_DATA.append(
          `categories[field_name][ar][${index}]`,
          item.name_ar
        );
        REQUEST_DATA.append(
          `categories[field_name][en][${index}]`,
          item.name_en
        );
        REQUEST_DATA.append(
          `categories[field_name][type][${index}]`,
          item.type?.value
        );
      });
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `categories/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/categories/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
<style lang="scss">
.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;
}
</style>