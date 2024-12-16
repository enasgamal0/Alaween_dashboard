<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editProvider") }}</h4>
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
          <base-image-upload-input
            col="12"
            identifier="image"
            :placeholder="$t('PLACEHOLDERS.storeLogo')"
            @selectImage="selectImage"
            :preSelectedImage="data.media?.path"
            required
          />
          <!-- End:: Image Upload Input -->
          <!-- Start:: Image Upload Input -->
          <base-multi-image-upload-input
            :urls="AddimgUrls"
            multiple
            @onFileSelect="onFileSelect"
            @onFileRemove="AdddonFileRemove"
          >
            {{ $t("PLACEHOLDERS.imagesefed") }}
            {{ $t("PLACEHOLDERS.extendPhoto") }}
            <span class="text-danger">*</span>
          </base-multi-image-upload-input>
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Inputs -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.storeTitleAr')"
            v-model.trim="data.nameAr"
            required
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.storeTitleEn')"
            v-model.trim="data.nameEn"
            required
          />
          <!-- End:: Name Inputs -->

          <!-- Start:: Description Inputs -->
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.storeDescAr')"
            v-model.trim="data.descProd"
            required
          />
          <base-input
            col="6"
            type="textarea"
            :placeholder="$t('PLACEHOLDERS.storeDescEn')"
            v-model.trim="data.descProdEn"
            required
          />
          <!-- End:: Description Inputs -->

          <!-- Start:: Store Input -->
          <base-select-input
            col="12"
            :optionsList="sections"
            :placeholder="$t('PLACEHOLDERS.section')"
            v-model="data.section_id"
            @change="showFields"
            required
          />
          <!-- End:: Store Input -->

          <!-- Start:: Dynamically Render Fields Based on Store Selection -->
          <div v-if="data.section_id && data.section_id.fields">
            <div v-for="field in data.section_id.fields" :key="field.id">
              <div v-if="field.type === 'dropdown'" class="py-1">
                <base-select-input
                  :placeholder="field.name"
                  v-model="data[field.name]"
                  :optionsList="dropdownOptions[field.id]"
                  :required="true"
                />
              </div>
              <div v-if="field.type === 'text'" class="py-1">
                <base-input
                  type="text"
                  :placeholder="field.name"
                  v-model="data[field.name]"
                  :required="true"
                />
              </div>
              <div v-if="field.type == 'file'" class="py-1">
                <base-name-preview-file-upload-input
                  :placeholder="field.name"
                  v-model="data[field.name]"
                  :required="true"
                />
              </div>
            </div>
          </div>
          <!-- End:: Dynamically Render Fields -->

          <!-- Start:: Deactivate Switch Input -->
          <!-- <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active"
              hide-details
            ></v-switch>
          </div> -->
          <!-- End:: Deactivate Switch Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button
              class="mt-2"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.save_next')"
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
import BaseMultiImageUploadInput from "../../../components/formInputs/BaseMultiImageUploadInput.vue";
import BaseNamePreviewFileUploadInput from "../../../components/formInputs/BaseNamePreviewFileUploadInput.vue";
import moment from "moment";

export default {
  name: "CreateProviders",

  components: { BaseMultiImageUploadInput, BaseNamePreviewFileUploadInput },

  data() {
    return {
      isWaitingRequest: false,
      sections: [],
      store: null,
      section_id: null,
      store_waiting: null,
      file: null,
      fileType: "",
      AddimgUrls: [],
      additionalImages: [],
      imageId: [],
      imgUrls: [],
      store_field: null,
      data: {
        media: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        descProd: null,
        descProdEn: null,
        active: true,
      },
      dropdownOptions: {},
      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  methods: {
    onFileSelect(files) {
      this.additionalImages = files;
      console.log("additionalImages", this.additionalImages);
    },
    onFileRemove(index) {
      this.$delete(this.imgUrls, index);
    },
    async getStoreData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `stores/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.data.Store.name_ar;
        this.data.nameEn = res.data.data.Store.name_en;
        this.data.descProd = res.data.data.Store.description_ar;
        this.data.descProdEn = res.data.data.Store.description_en;
        this.data.media.path = res.data.data.Store.logo;
        this.data.section_id = res.data.data.Store.category;
        this.AddimgUrls =
          res.data.data.Store.images &&
          res.data.data.Store.images.map((item) => item.url);
        this.imageId = res.data.data.Store.images.map(
          (item) => item.id
        );
        this.store_field = res.data.data.Store.store_field;
        this.showFields(this.store_field);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getSections() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "categories?page=0&limit=0&is_active=1",
        });
        this.sections = res.data.data;
        this.store_waiting = "done";
      } catch (error) {
        this.store_waiting = "done";
        console.log(error.response.data.message);
      }
    },

    selectImage(selectedImage) {
      this.data.media = selectedImage;
    },
    async AdddonFileRemove(index) {
      // Remove the image URL from imgUrls
      const imageId = this.AddimageId[index];

      // Remove the image from additionalImages
      this.$delete(this.additional_Images, index);
      try {
        await this.$axios({
          method: "DELETE",
          url: `/images/${imageId}`,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
        this.$delete(this.AddimgUrls, index);
      } catch (error) {
        this.isWaitingRequest = false;
        // Handle error as needed
        this.$message.error(error.response.data.message);
      }
    },
    showFields(storeId) {
      console.log("aaaaaa", storeId)
      if (storeId) {
        // this.data.section_id = storeId;
        // Fetch options for dropdown fields
        this.dropdownOptions = {};
        storeId.forEach((field) => {
          console.log("aaaaaa", field.field)
          if (field.field.type == "dropdown") {
            this.fetchDropdownOptions(field.field.id);
          }
        });
      }
    },

    async fetchDropdownOptions(fieldId) {
      try {
        const res = await this.$axios.get(`/dropdown-options/${fieldId}`);
        this.dropdownOptions[fieldId] = res.data.options;
      } catch (error) {
        console.error("Error fetching dropdown options", error);
      }
    },

    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      }
      if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      }
      if (!this.data.descProd) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.descAr"));
        return;
      }
      if (!this.data.descProdEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.descEn"));
        return;
      }
      if (!this.data.section_id) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.category"));
        return;
      }
      if (!this.data.media) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.logo"));
        return;
      }
      this.submitForm();
    },

    async submitForm() {
      const REQUEST_DATA = new FormData();

      // Basic fields
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("description[ar]", this.data.descProd);
      REQUEST_DATA.append("description[en]", this.data.descProdEn);
      REQUEST_DATA.append("logo", this.data.media.file);

      // Additional images
      if (this.additionalImages.length > 0) {
        for (let image of this.additionalImages) {
          REQUEST_DATA.append("images[]", image);
        }
      }

      // Section ID
      REQUEST_DATA.append("category_id", this.data.section_id?.id);

      // Active status
      REQUEST_DATA.append("is_active", this.data.active ? 1 : 0);

      // Dynamically handle additional fields based on section selection
      if (this.data.section_id && this.data.section_id.fields) {
        this.data.section_id.fields.forEach((field, index) => {
          if (field.type === "text" || field.type === "dropdown") {
            if (this.data[field.name]){
              // For text or dropdown fields, append the value
              REQUEST_DATA.append(`fields[${index}][id]`, field.id);
              REQUEST_DATA.append(
                `fields[${index}][value]`,
                this.data[field.name]
              );
            }
          } else if (
            field.type === "file"
          ) {
            // For file fields, append each file as a separate value
            REQUEST_DATA.append(`fields[${index}][id]`, field.id);
            this.data[field.name].forEach((file, fileIndex) => {
              REQUEST_DATA.append(
                `fields[${index}][value][${fileIndex}]`,
                file
              );
            });
          }
        });
      }

      // Send the request with the FormData
      try {
        await this.$axios({
          method: "POST",
          url: "stores",
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/providers/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
  },

  created() {
    this.getStoreData();
    this.getSections();
  },
};
</script>
