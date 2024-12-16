<template>
  <div class="side_nav_wrapper" :class="{ active: navIsActive }">
    <!-- Start:: Toggle Btn -->
    <button class="close_btn" @click="$emit('fireToggleNavDrawerEmit')">
      <i class="fal fa-times"></i>
    </button>
    <!-- End:: Toggle Btn -->

    <!-- Start:: Logo -->
    <div class="logo_wrapper" v-if="getAppTheme == 'light_theme'">
      <router-link class="logo" to="/home">
        <img
          src="@/assets/media/logo/logo_dark.svg"
          alt="Logo"
          width="170"
          height="125"
        />
      </router-link>
    </div>

    <div class="logo_wrapper" v-else>
      <router-link class="logo" to="/home">
        <img
          src="@/assets/media/logo/logo_light.svg"
          alt="Logo"
          width="170"
          height="125"
        />
      </router-link>
    </div>
    <!-- End:: Logo -->

    <!-- Start:: Side Nav Links -->
    <div class="side_nav_links_wrapper">
      <!-- Start:: Home Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/home">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/home.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.dashboard") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start::  Roles and Admins Routes-->
      <div class="side_routes_wrapper">
        <a-menu
          style="width: 100%"
          mode="vertical"
          :open-keys="openKeys"
          @openChange="onOpenChange"
          v-if="
            $can('role index', 'role') ||
            $can('permission index', 'permission') ||
            $can('admin index', 'admin')
          "
        >
          <a-sub-menu
            v-for="item in sideNavbarList_Admins"
            :key="item.key"
            :data-type="!item.children ? 'single_route' : ''"
          >
            <template v-if="item.children">
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item
                v-for="childItem in item.children"
                :key="childItem.key"
              >
                <button
                  v-if="childItem.hasPermission"
                  class="text-start w-100"
                  @click="$emit('fireToggleNavDrawerEmit')"
                >
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </div>
      <!-- End::  Roles and Admins Routes -->

      <!-- Start:: Admins Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('admins index', 'admins')"
      >
        <router-link to="/admins/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/admins.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.adminsManeg") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: Admins Route -->
      <!-- Start:: Admins Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('additions index', 'additions')"
      >
        <router-link to="/ResidentialAdd/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/subtrain.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.ResidentialAdd") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Admins Route -->
      <!-- Start:: Capacities Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('capacities index', 'capacities')"
      >
        <router-link to="/Capacities/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/orders.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.Capacities") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Admins Route -->

      <!-- Start:: users Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('user index', 'user')"
      >
        <router-link to="/users/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/users.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_users") }}
          </span>
        </router-link>
      </div>
      <!-- End:: users Route -->

      <!-- Start:: providers Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('store index', 'store')"
      >
        <router-link to="/providers/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/provider.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.providers_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: providers Route -->

      <!-- Start:: main_sections Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('category index', 'category')"
      >
        <router-link to="/categories/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/folder.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.main_sections") }}
          </span>
        </router-link>
      </div>
      <!-- End:: main_sections Route -->

      <!-- Start:: sub_sections Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('category index', 'category')"
      >
        <router-link to="/sub-categories/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/folder.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.sub_sections") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: sub_sections Route -->

      <!-- Start:: products Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('products index', 'products')"
      >
        <router-link to="/products/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/exchange.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.products") }}
          </span>
        </router-link>
      </div>
      <!-- End:: products Route -->

      <!-- Start:: orders Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('orders index', 'orders')"
      >
        <router-link to="/orders/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/paymentmethods.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.orders") }}
          </span>
        </router-link>
      </div>
      <!-- End:: orders Route -->
      <!-- Start:: orders Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('coupons index', 'coupons')"
      >
        <router-link to="/financialorders/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/budgeting.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.FinancialOrders") }}
          </span>
        </router-link>
      </div>
      <!-- End:: orders Route -->
      <!-- Start:: orders Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('coupons index', 'coupons')"
      >
        <router-link to="/financialpack/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/budgeting.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.financialpack") }}
          </span>
        </router-link>
      </div>
      <!-- End:: orders Route -->
      <!-- Start:: orders Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('coupons index', 'coupons')"
      >
        <router-link to="/coupons/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/coupon.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.coupons") }}
          </span>
        </router-link>
      </div>
      <!-- End:: orders Route -->

      <!-- Start:: reasons Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('reasonscancellations index', 'reasonscancellations')"
      >
        <router-link to="/reasons/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/cancel.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.reasons") }}
          </span>
        </router-link>
      </div>
      <!-- End:: reasons Route -->

      <!-- Start:: RequestWallets Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('requestwallets index', 'requestwallets')"
      >
        <router-link to="/RequestWallets/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/bill.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Users.wallet-settlement-requests") }}
          </span>
        </router-link>
      </div>
      <!-- End:: RequestWallets Route -->

      <!-- Start:: workplaces Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('workplaces index', 'workplaces')"
      >
        <router-link to="/workplaces/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/house.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.workplaces") }}
          </span>
        </router-link>
      </div>
      <!-- End:: workplaces Route -->

      <!-- Start:: services Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('services index', 'services')"
      >
        <router-link to="/services/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/service.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.services") }}
          </span>
        </router-link>
      </div>
      <!-- End:: services Route -->

      <!-- Start:: manage_regions Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('areas index', 'areas')"
      >
        <router-link to="/areas/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/country.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_regions") }}
          </span>
        </router-link>
      </div>
      <!-- End:: manage_regions Route -->

      <!-- Start:: cities Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('city index', 'city')"
      >
        <router-link to="/cities/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/cities.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.cities") }}
          </span>
        </router-link>
      </div>
      <!-- End:: cities Route -->

      <!-- Start:: districts Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('districts index', 'districts')"
      >
        <router-link to="/districts/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/village.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.districts") }}
          </span>
        </router-link>
      </div>
      <!-- End:: districts Route -->

      <!-- Start:: banks Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('banks index', 'banks')"
      >
        <router-link to="/banks/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/bank.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.banks.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: banks Route -->

      <!-- Start:: packages Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('packages index', 'packages')"
      >
        <router-link to="/packages/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/subscription.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.package_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: packages Route -->

      <!-- Start:: managements Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('management index', 'management')"
      >
        <router-link to="/managements/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/pm.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.manage_departments_and_managers") }}
          </span>
        </router-link>
      </div>
      <!-- End:: managements Route -->

      <!-- Start:: offers Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('slider index', 'slider')"
      >
        <router-link to="/Offers/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/offers.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.OffersManagement.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: offers Route -->

      <!-- Start:: ads Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('slider index', 'slider')"
      >
        <router-link to="/Ads/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/ads.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.ads.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: ads Route -->

      <!-- Start:: notifications Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('notifications index', 'notifications')"
      >
        <router-link to="/all-notifications/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/notifications.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.notifications.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: notifications Route -->

      <!-- Start:: app settings Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('setting edit', 'setting')"
      >
        <router-link to="/app_settings">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/settings.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.settings.general_app") }}
          </span>
        </router-link>
      </div>
      <!-- End:: app settings Route -->

      <!-- Start:: users Route -->
      <!-- <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('clients index', 'clients')"
      >
        <router-link to="/Clients/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/client.png"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Clients.title") }}
          </span>
        </router-link>
      </div> -->
      <!-- End:: users Route -->

      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper">
        <a-menu
          style="width: 100%"
          mode="vertical"
          :open-keys="openKeys"
          @openChange="onOpenChange"
          v-if="$can('setting create', 'setting')"
        >
          <a-sub-menu
            v-for="item in sideNavbarList"
            :key="item.key"
            :data-type="!item.children ? 'single_route' : ''"
          >
            <template v-if="item.children">
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item
                v-for="childItem in item.children"
                :key="childItem.key"
              >
                <button
                  class="text-start w-100"
                  @click="$emit('fireToggleNavDrawerEmit')"
                  v-if="childItem.hasPermission"
                >
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: contactus Route -->
      <div
        class="home_route"
        @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('contactus index', 'contactus')"
      >
        <router-link to="/contact-messages/all">
          <span class="route_icon">
            <img
              src="@/assets/media/icons/ui_icons/messages.svg"
              alt="icon"
              width="40"
              height="40"
            />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.ContactMessages.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: contactus Route -->

      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="inline">
          <!-- Start:: Logout Tab -->
          <a-sub-menu
            key="logout"
            @titleClick="logoutConfirmationModalIsOpen = true"
          >
            <!-- ========= Start:: Main Tab -->
            <span slot="title" class="logout_btn">
              <img
                src="../../assets/media/icons/ui_icons/logout.svg"
                alt="icon"
                width="35"
                height="35"
              />
              <span>
                {{ $t("SIDENAV.Logout.title") }}
              </span>
            </span>
            <!-- ========= End:: Main Tab -->
          </a-sub-menu>
          <!-- End:: Logout Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Logout Confirmation Modal -->
      <v-dialog v-model="logoutConfirmationModalIsOpen">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            {{ $t("TITLES.logoutConfirmingMessage") }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="logout">{{
              $t("BUTTONS.logout")
            }}</v-btn>

            <v-btn
              class="modal_cancel_btn"
              @click="logoutConfirmationModalIsOpen = false"
              >{{ $t("BUTTONS.cancel") }}</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End:: Logout Confirmation Modal -->
    </div>
  </div>
  <!-- End:: Side Nav Links -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideNav",

  emits: ["fireToggleNavDrawerEmit"],

  props: {
    navIsActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAppTheme: "AppThemeModule/getAppTheme",
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),
    // End:: Vuex Get Authenticated User Data

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys() {
      let extractedKeys = [];
      this.sideNavbarList_Admins.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      this.sideNavbarList.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },

    // End:: Extract Side Nav Keys
  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // openSetting: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList_Admins: [
        {
          key: "dashboard",
          title: this.$t("SIDENAV.control_admins"),
          icon: require("@/assets/media/icons/ui_icons/panel.png"),
          hasPermission: this.$can("roles index", "roles"),
          children: [
            {
              key: "roles",
              title: this.$t("SIDENAV.Roles.title"),
              route: "/roles/all",
              hasPermission:
                this.$can("role index", "role") ||
                this.$can("permission index", "permission"),
            },
            // {
            //   key: "admins",
            //   title: this.$t("SIDENAV.Admins.title"),
            //   route: "/admins/all",
            //   hasPermission: this.$can("admins index", "admins"),
            // },
          ],
        },
      ],

      sideNavbarList_users: [
        {
          key: "users_control",
          title: this.$t("PLACEHOLDERS.manage_users"),
          icon: require("@/assets/media/icons/ui_icons/clients.svg"),
          hasPermission: this.$can("user index", "user"),
          children: [
            {
              key: "users",
              title: this.$t("PLACEHOLDERS.manage_all_users"),
              route: "/clients/all",
              hasPermission: this.$can("user index", "user"),
            },
          ],
        },
      ],

      sideNavbarList: [
        {
          key: "appContent",
          title: this.$t("SIDENAV.AppContent.title"),
          icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
          children: [
            // {
            //   key: "contact-messages",
            //   title: this.$t("SIDENAV.ContactMessages.title"),
            //   route: "/contact-messages/all",
            //   hasPermission: this.$can("contactus index", "contactus"),
            // },
            {
              key: "contact",
              title: this.$t("PLACEHOLDERS.contact_admins"),
              route: "/contact_settings",
              hasPermission: this.$can("setting create", "setting"),
            },
            {
              key: "AboutUs",
              title: this.$t("SIDENAV.AppContent.aboutUs"),
              route: "/app-content/about-us",
              hasPermission: this.$can("setting create", "setting"),
            },
            {
              key: "termsAndConditions",
              title: this.$t("SIDENAV.AppContent.termsAndConditions"),
              route: "/app-content/terms",
              hasPermission: this.$can("setting create", "setting"),
            },
            {
              key: "privacyPolicy",
              title: this.$t("SIDENAV.AppContent.privacyPolicy"),
              route: "/app-content/policy",
              hasPermission: this.$can("setting create", "setting"),
            },
            {
              key: "delete-account",
              title: this.$t("PLACEHOLDERS.how_to_delete_account"),
              route: "/app-content/delete-account",
              hasPermission: this.$can("setting create", "setting"),
            },
          ],
        },
      ],
      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout",
    }),
    // End:: Vuex Auth Actions
    handleClick() {
      this.open = !this.open;
    },
    closeMenu() {
      this.open = false;
    },

    handleClickOrder() {
      this.openOrder = !this.openOrder;
    },
    closeMenuOrder() {
      this.openOrder = false;
    },
    handleClickcities() {
      this.openCities = !this.openCities;
    },
    closeMenuCities() {
      this.openCities = false;
    },
    // Start:: Controle Open Tabs
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.extractSideNavItemsKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // End:: Controle Open Tabs
  },

  created() {},
};
</script>
