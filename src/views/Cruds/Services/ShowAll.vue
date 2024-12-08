<template>
  <div class="show_all_content_wrapper service_class">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div
        class="filter_content_wrapper"
        :class="{ active: filterFormIsActive }"
      >
        <button
          class="filter_toggler"
          @click="filterFormIsActive = !filterFormIsActive"
        >
          <i class="fal fa-times"></i>
        </button>
        <div class="filter_title_wrapper">
          <h5>{{ $t("TITLES.searchBy") }}</h5>
        </div>

        <div class="filter_form_wrapper">
          <form @submit.prevent="submitFilterForm">
            <div class="row justify-content-center align-items-center w-100">
              <!-- Start:: Name Input -->
              <base-input
                col="5"
                type="text"
                :placeholder="$t('PLACEHOLDERS.name')"
                v-model.trim="filterOptions.name"
              />
              <!-- End:: Name Input -->

              <!-- Start:: Status Input -->
              <base-select-input
                col="5"
                :optionsList="activeStatuses"
                :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.is_active"
              />
              <!-- End:: Status Input -->

              <base-picker-input
                col="5"
                type="date"
                :placeholder="$t('PLACEHOLDERS.startDate')"
                v-model.trim="filterOptions.from_date"
              />
              <!-- End:: Start Date Input -->

              <!-- Start:: End Date Input -->
              <base-picker-input
                col="5"
                type="date"
                :placeholder="$t('PLACEHOLDERS.endDate')"
                v-model.trim="filterOptions.to_date"
              />
            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>
              <button
                class="reset_btn"
                type="button"
                :disabled="isWaitingRequest"
                @click="resetFilter"
              >
                <i class="fal fa-redo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.services") }}</h5>
          <button
            v-if="!filterFormIsActive"
            class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive"
          >
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div
          class="title_route_wrapper"
          v-if="$can('services create', 'services')"
        >
          <router-link to="/services/create">
            {{ $t("TITLES.addService") }}
          </router-link>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table
        class="thumb"
        :loading="loading"
        :loading-text="$t('TABLES.loadingData')"
        :search="searchValue"
        :headers="tableHeaders"
        :items="tableRows"
        item-class="ltr"
        :items-per-page="paginations.items_per_page"
        hide-default-footer
      >
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <!-- Start:: Activation -->
        <template v-slot:[`item.is_active`]="{ item }">
          <!-- v-if="permissions.activate" -->
          <div
            class="activation"
            dir="ltr"
            style="z-index: 1"
            v-if="$can('services activate', 'services')"
          >
            <v-switch
              class="mt-2"
              color="success"
              v-model="item.is_active"
              hide-details
              @change="changeActivationStatus(item)"
            ></v-switch>
          </div>
        </template>
        <!-- End:: Activation -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actiosn`]="{ item }">
          <div class="actions">
            <a-tooltip
              placement="bottom"
              v-if="$can('services delete', 'services')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>
            <a-tooltip
              placement="bottom"
              v-if="$can('services edit', 'services')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>
            <a-tooltip
              placement="bottom"
              v-if="$can('services edit', 'services')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.capacities_prices") }}</span>
              </template>
              <button class="btn_show" @click="showPrices(item)">
                <i class="fa fa-dollar-sign"></i>
              </button>
            </a-tooltip>
            <a-tooltip
              placement="bottom"
              v-if="$can('services show', 'services')"
            >
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>
            <template v-else>
              <i
                class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"
              ></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Image Modal -->
          <image-modal
            v-if="dialogImage"
            :modalIsOpen="dialogImage"
            :modalImage="selectedItemImage"
            @toggleModal="dialogImage = !dialogImage"
          />
          <!-- End:: Image Modal -->

          <!-- Start:: Description Modal -->
          <description-modal
            v-if="dialogDescription"
            :modalIsOpen="dialogDescription"
            :modalDesc="selectedDescriptionTextToShow"
            @toggleModal="dialogDescription = !dialogDescription"
          />
          <!-- End:: Description Modal -->

          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{
                  $t("TITLES.DeleteConfirmingMessage", {
                    name: itemToDelete.name,
                  })
                }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmDeleteItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{
                  $t("BUTTONS.cancel")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->

          <!-- Start:: Prices Modal -->
          <div>
            <v-dialog v-model="dialogPrices" class="service_class">
              <v-card>
                <v-card-title class="text-h5 justify-center">
                  {{
                    $t("TITLES.capacities_prices_for", {
                      name: pricesItem?.name,
                    })
                  }}
                </v-card-title>
                <div class="w-100">
                  <div class="mt-3">
                    <h6 class="font-weight-bold mb-4">
                      {{ $t("TITLES.services_capacities") }}:
                    </h6>
                    <!-- <div>{{ pricesItem?.capacities }}</div> -->
                    <div
                      class="service_row mb-5 d-flex flex-wrap"
                      v-for="item in pricesItem?.capacities"
                      v-if="pricesItem?.capacities"
                    >
                      <template v-if="item.isEditing">
                        <!-- Edit Mode -->
                        <!-- :optionsList="
                            pricesItem?.capacities?.slice(-1)[0]
                              ?.filteredCapacities
                          " -->
                        <base-select-input
                          col="4"
                          :optionsList="capacities"
                          v-model="item.selectedCapacity"
                          class="service_select my-0 p-0 h-25"
                        />
                        <input
                          type="number"
                          v-model.trim="item.pivot.price"
                          :placeholder="$t('PLACEHOLDERS.price')"
                          class="bg-white rounded mx-3 p-2 w-25 h-25"
                        />
                        <v-btn
                          class="modal_confirm_btn mx-1 bg-success text-white"
                          @click="
                            saveCapacityPrice(
                              item,
                              item.selectedCapacity?.id,
                              pricesItem,
                              item.pivot.price
                            )
                          "
                          >{{ $t("BUTTONS.save") }}</v-btn
                        >
                        <v-btn
                          class="modal_confirm_btn mx-1 bg-danger text-white"
                          @click="cancelCapacityEdit(item, pricesItem)"
                          >{{ $t("BUTTONS.cancel") }}</v-btn
                        >
                      </template>
                      <template v-else>
                        <div v-if="item.name && item.pivot.price">
                          <!-- Display Mode -->
                          <label class="font-weight-bold mx-2"
                            >{{ item?.selectedCapacity?.name || item?.name }}:
                          </label>
                          <span
                            >{{ item.pivot.price }}
                            {{ $t("PLACEHOLDERS.riyal") }}</span
                          >
                          <button
                            @click="editPrice(item, 'capacity')"
                            class="mx-2"
                          >
                            <i
                              class="fal fa-edit text-primary font-weight-bold"
                            ></i>
                          </button>
                        </div>
                      </template>
                      <!-- <span>{{ $t('PLACEHOLDERS.riyal') }}</span> -->
                    </div>
                    <div
                      v-if="pricesItem?.capacities.length == 0"
                      class="text-center"
                    >
                      {{ $t("TABLES.noData") }}
                    </div>
                    <div>
                      <!--<button type="button">
                      <i
                        class="fas fa-minus-circle"
                        style="
                          font-size: 20px;
                          color: #007bff;
                          margin-left: 5px;
                        "
                      ></i>
                    </button>-->
                    <!-- :disabled="
                          pricesItem.capacities?.length >= capacities?.length ||
                          pricesItem?.new_row_capacity
                        " -->
                      <button
                        type="button"
                        @click="addRow(pricesItem)"
                      >
                        <i
                          class="fas fa-plus-circle"
                          style="font-size: 20px; color: #007bff"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <h6 class="font-weight-bold mb-4">
                      {{ $t("TITLES.services_additions") }}:
                    </h6>
                    <div
                      class="service_row mb-5 d-flex flex-wrap"
                      v-for="item in pricesItem?.additions"
                      v-if="pricesItem?.additions?.length > 0"
                    >
                      <template v-if="item.isEditing">
                        <!-- Edit Mode -->
                        <!-- :optionsList="
                            pricesItem?.additions?.slice(-1)[0]
                              ?.filteredAddition
                          " -->
                        <base-select-input
                          col="4"
                          :optionsList="additions"
                          v-model="item.selectedAddition"
                          class="service_select my-0 p-0 h-25"
                        />
                        <input
                          type="number"
                          :placeholder="$t('PLACEHOLDERS.price')"
                          v-model.trim="item.pivot.price"
                          class="bg-white rounded mx-3 p-2 w-25 h-25"
                        />
                        <v-btn
                          class="modal_confirm_btn mx-1 bg-success text-white"
                          @click="
                            saveAdditionPrice(
                              item,
                              item.selectedAddition?.id,
                              pricesItem,
                              item.pivot.price
                            )
                          "
                          >{{ $t("BUTTONS.save") }}</v-btn
                        >
                        <v-btn
                          class="modal_confirm_btn mx-1 bg-danger text-white"
                          @click="cancelAdditionEdit(item, pricesItem)"
                          >{{ $t("BUTTONS.cancel") }}</v-btn
                        >
                      </template>
                      <template v-else>
                        <div v-if="item.name && item.pivot.price">
                          <!-- Display Mode -->
                          <label class="font-weight-bold mx-2"
                            >{{ item?.selectedAddition?.name || item?.name }}:
                          </label>
                          <span
                            >{{ item.pivot.price }}
                            {{ $t("PLACEHOLDERS.riyal") }}</span
                          >
                          <button
                            @click="editPrice(item, 'addition')"
                            class="mx-2"
                          >
                            <i
                              class="fal fa-edit text-primary font-weight-bold"
                            ></i>
                          </button>
                        </div>
                      </template>
                      <!-- <span>{{ $t('PLACEHOLDERS.riyal') }}</span> -->
                    </div>
                    <div
                      v-if="pricesItem?.additions.length == 0"
                      class="text-center"
                    >
                      {{ $t("TABLES.noData") }}
                    </div>
                    <!-- :disabled="
                        pricesItem.additions?.length >= additions?.length ||
                        pricesItem?.new_row_addition
                      " -->
                    <button
                      type="button"
                      @click="addAdditionRow(pricesItem)"
                    >
                      <i
                        class="fas fa-plus-circle"
                        style="font-size: 20px; color: #007bff"
                      ></i>
                    </button>
                  </div>
                </div>
              </v-card>
            </v-dialog>
          </div>
          <!-- End:: Description Modal -->
        </template>
        <!-- ======================== End:: Dialogs ======================== -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination
          class="py-0"
          square
          v-model="paginations.current_page"
          :length="paginations.last_page"
          :total-visible="6"
          @input="updateRouterQueryParam($event)"
          :prev-icon="
            getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
          "
          :next-icon="
            getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
          "
        />
      </div>
    </template>
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllServices",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        },
      ];
    },
  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        is_active: null,
        from_date: null,
        to_date: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Admins.serialNumber"),
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.name"),
          value: "name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.count_finish_order"),
          value: "count_finish_order",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.status"),
          value: "is_active",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.created_at"),
          value: "created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Admins.actions"),
          value: "actiosn",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      capacities: [],
      additions: [],
      pricesItem: {
        capacities: [],
        additions: [],
      },
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDescription: false,
      selectedDescriptionTextToShow: "",
      dialogDelete: false,
      itemToDelete: null,
      dialogPrices: false,
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      regions: [],
      cites: [],
      dialogPrices: false,
    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.setTableRows();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== "1") {
        await this.$router.push({ path: "/services/all", query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.is_active = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;

      if (this.$route.query.page !== "1") {
        await this.$router.push({ path: "/services/all", query: { page: 1 } });
      }
      this.setTableRows();
    },
    // End:: Handel Filter
    addRow(item) {
      item.new_row_capacity = true;
      const selectedCapacityIds = this.pricesItem.capacities
        .map((capacity) => capacity.selectedCapacity?.id)
        .filter(Boolean);
      this.pricesItem.capacities.push({
        id: null,
        name: { ar: "", en: "" },
        pivot: { service_id: null, capacity_id: null, price: "" },
        isEditing: true,
        selectedCapacity: null,
        new_row_capacity: false,
        filteredCapacities: this.capacities.filter(
          (capacity) => !selectedCapacityIds.includes(capacity.id)
        ),
      });
    },

    addAdditionRow(item) {
      item.new_row_addition = true;
      const selectedAdditionIds = this.pricesItem.additions
        .map((addition) => addition.selectedAddition?.id)
        .filter(Boolean);
      this.pricesItem.additions.push({
        id: null,
        name: { ar: "", en: "" },
        pivot: { service_id: null, addition_id: null, price: "" },
        isEditing: true,
        selectedAddition: null,
        new_row_addition: false,
        filteredAddition: this.additions.filter(
          (addition) => !selectedAdditionIds.includes(addition.id)
        ),
      });
    },

    removeRow(index) {
      // Remove the row by its index
      this.pricesItem.capacities.splice(index, 1);
    },
    // Start:: Set Table Rows
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get services
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async setTableRows() {
      this.loading = true;
      try {
        console.log("this.filterOptions.name", this.filterOptions);
        let res = await this.$axios({
          method: "GET",
          url: "services",
          params: {
            page: this.paginations.current_page,
            name: this.filterOptions.name,
            count_finish_order: this.filterOptions.count_finish_order,
            is_active: this.filterOptions.is_active?.value,
            "created_at[0]": this.filterOptions.from_date,
            "created_at[1]": this.filterOptions.to_date,
          },
        });
        this.loading = false;
        this.tableRows = res.data.data;
        // console.log(res.data.data.items?.id.service.name);
        this.pricesItem = this.pricesItem.map((item) => ({
          ...item,
          new_row_capacity: false,
          filteredCapacities: this.capacities.filter(
            (capacity) =>
              !this.pricesItem.capacities.some(
                (priceCapacity) => priceCapacity.id == capacity.id
              )
          ),
          new_row_addition: false,
          filteredAddition: this.additions.filter(
            (addition) =>
              !this.pricesItem.additions.some(
                (priceAaddition) => priceAaddition.id == addition.id
              )
          ),
        }));
        this.pricesItem.capacities = this.pricesItem.capacities.map((item) => ({
          ...item,
          isEditing: false,
          selectedCapacity: item,
        }));
        this.pricesItem.additions = this.pricesItem.additions.map((item) => ({
          ...item,
          isEditing: false,
          selectedAddition: item,
        }));
        this.selectedCapacity = this.capacities.find(
          (c) => c?.id?.id == this.tableRows.pivot.capacity_id
        );
        this.selectedAddition = this.additions.find(
          (a) => a?.id?.id == this.tableRows.pivot.addition_id
        );
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;
      } catch (error) {
        this.loading = false;
      }
    },
    // End:: Set Table Rows
    showReplayModal(replay) {
      this.dialogDescription = true;
      this.selectedDescriptionTextToShow = replay;
    },
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
    async getAdditions() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `additions`,
        });
        this.additions = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // Start:: Prices
    editPrice(item, type) {
      this.$set(item, "isEditing", true);
      if (type === "capacity") {
        const selectedCapacityIds = this.pricesItem.capacities
          .map((capacity) => capacity.selectedCapacity?.id)
          .filter(Boolean);
        item.filteredCapacities = this.capacities.filter(
          (capacity) =>
            !selectedCapacityIds.includes(capacity.id) ||
            capacity.id === item.selectedCapacity?.id
        );
        this.$set(
          item,
          "selectedCapacity",
          JSON.parse(JSON.stringify(item.selectedCapacity))
        );
      } else if (type === "addition") {
        const selectedAdditionIds = this.pricesItem.additions
          .map((addition) => addition.selectedAddition?.id)
          .filter(Boolean);
        item.filteredAddition = this.additions.filter(
          (addition) =>
            !selectedAdditionIds.includes(addition.id) ||
            addition.id === item.selectedAddition?.id
        );
        this.$set(
          item,
          "selectedAddition",
          JSON.parse(JSON.stringify(item.selectedAddition))
        );
      }
    },
    async saveCapacityPrice(item, saveCapacityPrice, service_id, price) {
      item.isEditing = false;
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "POST",
          url: "services/Add-service-capacity",
          data: {
            capacity_id: saveCapacityPrice,
            service_id: service_id?.id,
            price: price,
          },
        });
        if (res) {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("MESSAGES.editedSuccessfully"),
            messageSize: "22",
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
          });
        }
        this.loading = false;
        service_id.new_row_capacity = false;
        item.id = item.selectedCapacity?.id;
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response.data.message);
        service_id.new_row_capacity = false;
      }
    },
    async saveAdditionPrice(item, selectedAddition, service_id, price) {
      item.isEditing = false;
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "POST",
          url: "services/Add-service-addition",
          data: {
            addition_id: selectedAddition,
            service_id: service_id?.id,
            price: price,
          },
        });
        if (res) {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("MESSAGES.editedSuccessfully"),
            messageSize: "22",
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
          });
        }
        this.loading = false;
        service_id.new_row_addition = false;
      } catch (error) {
        this.loading = false;
        service_id.new_row_addition = false;
      }
    },
    cancelCapacityEdit(item, service) {
      item.isEditing = false;
      service.new_row_capacity = false;
    },
    cancelAdditionEdit(item, service) {
      item.isEditing = false;
      service.new_row_addition = false;
    },
    // End:: Prices
    // Start:: Control Modals
    showImageModal(image) {
      this.dialogImage = true;
      this.selectedItemImage = image;
    },
    // End:: Control Modals
    // Start:: Change Activation Status
    async changeActivationStatus(item) {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      // REQUEST_DATA.append("_method", "PUT");
      try {
        await this.$axios({
          method: "POST",
          url: `services/activate/${item?.id}`,
          data: REQUEST_DATA,
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status

    // ==================== Start:: Crud ====================
    // ===== Start:: End
    editItem(item) {
      this.$router.push({ path: `/services/edit/${item?.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/services/show/${item?.id}` });
    },
    showPrices(item) {
      this.dialogPrices = true;
      this.pricesItem = item;
    },
    // ===== End:: End

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `services/${this.itemToDelete?.id}`,
        });
        this.dialogDelete = false;
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete
    // ==================== End:: Crud ====================
  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.getCapacities();
    this.getAdditions();
    this.setTableRows();
    // End:: Fire Methods
  },
};
</script>
<style lang="scss">
.service_row.mb-5.d-flex:empty {
  display: none !important;
}
.service_select.my-5 {
  margin: 0 !important;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
  background-color: transparent;
  color: #a1a1a1;
}
</style>
