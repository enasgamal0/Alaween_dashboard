// Start:: Importing Middleware
import auth from "../middleware/auth.js";
import Authentication from "../pages/Authentication.vue";
// End:: Importing Middleware

// Start:: Importing Router Components
import Vue from "vue";
import VueRouter from "vue-router";
// End:: Importing Router Components

// ============== Start:: Home Page Route
import AppContentWrapper from "../pages/AppContentWrapper.vue";
import HomePage from "../pages/HomePage.vue";
// ============== End:: Home Page Route

// ============== Start:: Roles Routes
import RolesHome from "../views/Cruds/Roles/Home.vue";
import AllRoles from "../views/Cruds/Roles/ShowAll.vue";
import EditRole from "../views/Cruds/Roles/Edit.vue";
import CreateRole from "../views/Cruds/Roles/Create.vue";
// ============== End:: Roles Routes
// ============== Start:: FinancialOrders Routes
import FinancialOrdersHome from "../views/Cruds/FinancialOrders/Home.vue";
import AllFinancialOrders from "../views/Cruds/FinancialOrders/ShowAll.vue";
// ============== End:: FinancialOrders Routes

// ============== Start:: FinancialPack Routes
import FinancialPackHome from "../views/Cruds/FinancialPack/Home.vue";
import AllFinancialPack from "../views/Cruds/FinancialPack/ShowAll.vue";
// ============== End:: FinancialPack Routes

// ============== Start:: Admins Routes
import ShowAdmin from "../views/Cruds/Admins/Show.vue";
import EditAdmin from "../views/Cruds/Admins/Edit.vue";
import CreateAdmin from "../views/Cruds/Admins/Create.vue";
import AllAdmins from "../views/Cruds/Admins/ShowAll.vue";
import AdminsHome from "../views/Cruds/Admins/Home.vue";
// ============== End:: Admins Routes

// ============== Start:: login Routes
import LoginForm from "../views/Auth/LoginForm.vue";
import ResetPasswordEmailForm from "../views/Auth/ResetPasswordEmailForm.vue";
import EmailVerificationForm from "../views/Auth/EmailVerificationForm.vue";
import ChangePhoneNumberForm from "../views/Auth/ChangePhoneNumber.vue";
import ResetPasswordForm from "../views/Auth/ResetPasswordForm.vue";
// ============== End:: login Routes

// ============== Start:: Contact Messages Routes
import ContactMessagesHome from "../views/Cruds/ContactMessages/Home.vue";
import AllContactMessages from "../views/Cruds/ContactMessages/ShowAll.vue";
import showMessage from "../views/Cruds/ContactMessages/Show.vue";
// ============== End:: Contact Messages Routes

// ============== Start:: App Content Routes
import AppContentHome from "../views/Cruds/AppContent/Home.vue";
import GeneralSettings from "../views/Cruds/AppSettings/GeneralSettings.vue";
import AppSettings from "../views/Cruds/AppSettings/AppSettings.vue";
import AboutUs from "../views/Cruds/AppContent/AboutUs.vue";
import Terms from "../views/Cruds/AppContent/Terms.vue";
import DeleteAccount from "../views/Cruds/AppContent/DeleteAccount.vue";
import PrivacyPolicy from "../views/Cruds/AppContent/PrivacyPolicy.vue";
import BookingTerms from "../views/Cruds/AppContent/BookingTerms.vue";
// ============== End:: App Content Routes

// Start:: Questiions Router Components
import questionsHome from "../views/Cruds/FAQ/Home.vue";
import Allquestions from "../views/Cruds/FAQ/ShowAll.vue";
import Createquestions from "../views/Cruds/FAQ/Create.vue";
import Editquestions from "../views/Cruds/FAQ/Edit.vue";
// End:: Questions Router Components

// ============ Start:: Users Routes
import UsersHome from "../views/Cruds/Users/Home.vue";
import AllUsers from "../views/Cruds/Users/ShowAll.vue";
import ShowUsers from "../views/Cruds/Users/Show.vue";
// ============ End:: Users Routes

// ============== Start:: Ads Routes
import AdsHome from "../views/Cruds/Ads/Home.vue";
import AllAds from "../views/Cruds/Ads/ShowAll.vue";
import CreateAds from "../views/Cruds/Ads/Create.vue";
import ShowAds from "../views/Cruds/Ads/Show.vue";
import EditAds from "../views/Cruds/Ads/Edit.vue";
// ============== End:: Ads Routes

// ============== Start:: Products Routes
import ProductsHome from "../views/Cruds/Products/Home.vue";
import AllProducts from "../views/Cruds/Products/ShowAll.vue";
import CreateProducts from "../views/Cruds/Products/Create.vue";
import ShowProducts from "../views/Cruds/Products/Show.vue";
import EditProducts from "../views/Cruds/Products/Edit.vue";
// ============== End:: Products Routes

// ============== Start:: Cities Routes
import CitiesHome from "../views/Cruds/Cities/Home.vue";
import AllCities from "../views/Cruds/Cities/ShowAll.vue";
import CreateCities from "../views/Cruds/Cities/Create.vue";
import ShowCities from "../views/Cruds/Cities/Show.vue";
import EditCities from "../views/Cruds/Cities/Edit.vue";
// ============== End:: Cities Routes

// ============== Start:: Districts Routes
import DistrictsHome from "../views/Cruds/Districts/Home.vue";
import AllDistricts from "../views/Cruds/Districts/ShowAll.vue";
import CreateDistricts from "../views/Cruds/Districts/Create.vue";
import ShowDistricts from "../views/Cruds/Districts/Show.vue";
import EditDistricts from "../views/Cruds/Districts/Edit.vue";
// ============== End:: Cities Routes

// ============== Start:: Regions Routes
import RegionsHome from "../views/Cruds/Regions/Home.vue";
import AllRegions from "../views/Cruds/Regions/ShowAll.vue";
import CreateRegions from "../views/Cruds/Regions/Create.vue";
import ShowRegions from "../views/Cruds/Regions/Show.vue";
import EditRegions from "../views/Cruds/Regions/Edit.vue";
// ============== End:: Regions Routes

// ============== Start:: Services Routes
import ServicesHome from "../views/Cruds/Services/Home.vue";
import AllServices from "../views/Cruds/Services/ShowAll.vue";
import CreateServices from "../views/Cruds/Services/Create.vue";
import ShowServices from "../views/Cruds/Services/Show.vue";
import EditServices from "../views/Cruds/Services/Edit.vue";
// ============== End:: Services Routes

// ============== Start:: Workplaces Routes
import WorkplacesHome from "../views/Cruds/Workplaces/Home.vue";
import AllWorkplaces from "../views/Cruds/Workplaces/ShowAll.vue";
import CreateWorkplaces from "../views/Cruds/Workplaces/Create.vue";
import ShowWorkplaces from "../views/Cruds/Workplaces/Show.vue";
import EditWorkplaces from "../views/Cruds/Workplaces/Edit.vue";
// ============== End:: Workplaces Routes

// ============== Start:: WalletRequests Routes
import RequestWalletsHome from "../views/Cruds/WalletRequests/Home.vue";
import AllRequestWallets from "../views/Cruds/WalletRequests/ShowAll.vue";
// ============== End:: WalletRequests Routes

// ============== Start:: WalletHistory Routes
import WalletHistoryHome from "../views/Cruds/WalletHistory/Home.vue";
import AllWalletHistory from "../views/Cruds/WalletHistory/ShowAll.vue";
// ============== End:: WalletRequests Routes

// ============== Start:: Reasons Routes
import ReasonsHome from "../views/Cruds/Reasons/Home.vue";
import AllReasons from "../views/Cruds/Reasons/ShowAll.vue";
import CreateReasons from "../views/Cruds/Reasons/Create.vue";
import ShowReasons from "../views/Cruds/Reasons/Show.vue";
import EditReasons from "../views/Cruds/Reasons/Edit.vue";
// ============== End:: Reasons Routes

// ============== Start:: Banks Routes
import BanksHome from "../views/Cruds/Banks/Home.vue";
import AllBanks from "../views/Cruds/Banks/ShowAll.vue";
import CreateBanks from "../views/Cruds/Banks/Create.vue";
import ShowBanks from "../views/Cruds/Banks/Show.vue";
import EditBanks from "../views/Cruds/Banks/Edit.vue";
// ============== End:: Banks Routes

// ============== Start:: Packages Routes
import PackagesHome from "../views/Cruds/Packages/Home.vue";
import AllPackages from "../views/Cruds/Packages/ShowAll.vue";
import CreatePackages from "../views/Cruds/Packages/Create.vue";
import ShowPackages from "../views/Cruds/Packages/Show.vue";
import EditPackages from "../views/Cruds/Packages/Edit.vue";
// ============== End:: Cities Routes

// ============== Start:: orders Routes
import ordersHome from "../views/Cruds/Orders/Home.vue";
import Allorders from "../views/Cruds/Orders/ShowAll.vue";
import Showorders from "../views/Cruds/Orders/Show.vue";
// ============== End:: orders Routes

// ============== Start:: All Notifications Routes
import AllNotifications from "../views/Cruds/Notifications/ShowAll.vue";
import NotificationsHome from "../views/Cruds/Notifications/Home.vue";
import CreateNotifications from "../views/Cruds/Notifications/Create.vue";
import ShowNotificationsTable from "../views/Cruds/Notifications/Show.vue";
// import ShowNotificationsIcon from "../views/Cruds/Notifications/Test.vue";
import ShowAllNotifications from "../views/Cruds/Notifications/ShowAllNotifications.vue";

// ============== End:: All Notifications Routes

// ================== Start:: Clients Routes
import ClientsHome from "../views/Cruds/Clients/Home.vue";
import AllClients from "../views/Cruds/Clients/ShowAll.vue";
import ShowClients from "../views/Cruds/Clients/Show.vue";
// ================= End:: Clients Routes

//=============== Start:: Order Desiginer Routes
import OrdersRequestsHome from "../views/Cruds/OrdersRequests/Home.vue";
import AllOrdersRequests from "../views/Cruds/OrdersRequests/ShowAll.vue";
import ShowOrdersRequests from "../views/Cruds/OrdersRequests/Show.vue";
//============== End:: Order Desiginer Routes

// ============== Start:: MainCategories Routes
import CategoriesHome from "../views/Cruds/MainCategories/Home.vue";
import AllCategories from "../views/Cruds/MainCategories/ShowAll.vue";
import CreateCategories from "../views/Cruds/MainCategories/Create.vue";
import EditCategories from "../views/Cruds/MainCategories/Edit.vue";
import ShowCategories from "../views/Cruds/MainCategories/Show.vue";
// ============== End:: MainCategories Routes

// ============== Start:: SubCategories Routes
import SubCategoriesHome from "../views/Cruds/SubCategories/Home.vue";
import AllSubCategories from "../views/Cruds/SubCategories/ShowAll.vue";
import CreateSubCategories from "../views/Cruds/SubCategories/Create.vue";
import EditSubCategories from "../views/Cruds/SubCategories/Edit.vue";
import ShowSubCategories from "../views/Cruds/SubCategories/Show.vue";
// ============== End:: SubCategories Routes
// ============== Start:: Coupons Routes
import CouponsHome from "../views/Cruds/Coupons/Home.vue";
import AllCoupons from "../views/Cruds/Coupons/ShowAll.vue";
import CreateCoupons from "../views/Cruds/Coupons/Create.vue";
import ShowCoupons from "../views/Cruds/Coupons/Show.vue";
import EditCoupons from "../views/Cruds/Coupons/Edit.vue";
// ============== End:: Coupons Routes

// ============== Start:: Capacities Routes
import CapacitiesHome from "../views/Cruds/Capacities/Home.vue";
import AllCapacities from "../views/Cruds/Capacities/ShowAll.vue";
import CreateCapacities from "../views/Cruds/Capacities/Create.vue";
import ShowCapacities from "../views/Cruds/Capacities/Show.vue";
import EditCapacities from "../views/Cruds/Capacities/Edit.vue";
// ============== End:: Capacities Routes

// ============== Start:: ResidentialAdd Routes
import ResidentialAddHome from "../views/Cruds/ResidentialAdd/Home.vue";
import AllResidentialAdd from "../views/Cruds/ResidentialAdd/ShowAll.vue";
import CreateResidentialAdd from "../views/Cruds/ResidentialAdd/Create.vue";
import ShowResidentialAdd from "../views/Cruds/ResidentialAdd/Show.vue";
import EditResidentialAdd from "../views/Cruds/ResidentialAdd/Edit.vue";
// ============== End:: ResidentialAdd Routes

// ============== Start:: Managements Routes
import ManagementsHome from "../views/Cruds/Managements/Home.vue";
import AllManagements from "../views/Cruds/Managements/ShowAll.vue";
import CreateManagements from "../views/Cruds/Managements/Create.vue";
import EditManagements from "../views/Cruds/Managements/Edit.vue";
import ShowManagements from "../views/Cruds/Managements/Show.vue";
// ============== End:: Managements Routes

// ============== Start:: Forbidden Route
import ForbiddenPage from "../pages/ForbiddenPage.vue";
// ============== End:: Forbidden Route

// ============== Start:: Not Found Route
import NotFoundPage from "../pages/NotFound.vue";
// ============== End:: Not Found Route

// End:: Importing Router Components

Vue.use(VueRouter);
const routes = [
  // ***************** Start:: Auth Routes Config
  {
    path: "/",
    component: Authentication,
    children: [
      {
        path: "/",
        component: LoginForm,
        name: "LoginForm",
      },
      {
        path: "/reset-password-email",
        name: "ResetPasswordEmailForm",
        component: ResetPasswordEmailForm,
      },
      {
        path: "/email-verification/:verification_type",
        name: "EmailVerificationForm",
        component: EmailVerificationForm,
      },
      {
        path: "/chang-phone-number",
        name: "ChangePhoneNumberForm",
        component: ChangePhoneNumberForm,
      },
      {
        path: "/reset-password",
        name: "ResetPasswordForm",
        component: ResetPasswordForm,
      },
    ],
  },
  // ***************** End:: Auth Routes Config

  // ***************** Start:: Content Routes Config
  {
    path: "/home",
    component: AppContentWrapper,
    children: [
      // Start:: Home Route Config
      {
        path: "/home",
        component: HomePage,
        meta: {
          middleware: [auth],
        },
      },
      // End:: Home Route Config

      // Start:: Contact Messages Routes Config
      {
        path: "/contact-messages",
        name: "ContactMessagesHome",
        component: ContactMessagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllContactMessages",
            component: AllContactMessages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "contacts index",
                subject: "contacts",
              },
            },
          },
          {
            path: "show/:id",
            name: "showMessage",
            component: showMessage,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "contacts show",
                subject: "contacts",
              },
            },
          },
        ],
      },
      // End:: Contact Messages Routes Config

      // Start:: App Content Routes Config
      {
        path: "/app-content",
        name: "AppContentHome",
        component: AppContentHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "about-us",
            name: "AboutUs",
            component: AboutUs,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "terms",
            name: "Terms",
            component: Terms,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "booking-terms",
            name: "BookingTerms",
            component: BookingTerms,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "delete-account",
            name: "DeleteAccount",
            component: DeleteAccount,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
        ],
      },
      // End:: App Content Routes Config

      // Start:: AllFinancialOrders Routes Config
      {
        path: "/financialorders",
        name: "FinancialOrdersHome",
        component: FinancialOrdersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialOrders",
            component: AllFinancialOrders,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles index",
                subject: "roles",
              },
            },
          },
        ],
      },
      {
        path: "/financialpack",
        name: "FinancialPackHome",
        component: FinancialPackHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialPack",
            component: AllFinancialPack,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles index",
                subject: "roles",
              },
            },
          },
        ],
      },
      // End:: AllFinancialOrders Routes Config
      // Start:: Roles Routes Config
      {
        path: "/roles",
        name: "RolesHome",
        component: RolesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRoles",
            component: AllRoles,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles index",
                subject: "roles",
              },
            },
          },
          {
            path: "create",
            name: "CreateRole",
            component: CreateRole,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles create",
                subject: "roles",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRole",
            component: EditRole,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles edit",
                subject: "roles",
              },
            },
          },
        ],
      },
      // End:: Roles Routes Config

      // Start:: Admins Routes Config
      {
        path: "/admins",
        name: "AdminsHome",
        component: AdminsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllAdmins,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins index",
                subject: "admins",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdmin",
            component: CreateAdmin,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins create",
                subject: "admins",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdmin",
            component: EditAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins edit",
                subject: "admins",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdmin",
            component: ShowAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins show",
                subject: "admins",
              },
            },
          },
        ],
      },
      // End:: Admins Routes Config

      // Start:: users Routes Config
      {
        path: "/users",
        name: "UsersHome",
        component: UsersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllUsers",
            component: AllUsers,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users index",
                subject: "users",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowUsers",
            component: ShowUsers,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users show",
                subject: "users",
              },
            },
          },
        ],
      },
      // End:: users Routes Config

      // Start:: products  Config
      {
        path: "/products",
        name: "products",
        component: ProductsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allproducts",
            component: AllProducts,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "products index",
                subject: "products",
              },
            },
          },
          {
            path: "create",
            name: "Createproducts",
            component: CreateProducts,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "products create",
                subject: "products",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editproducts",
            component: EditProducts,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "products edit",
                subject: "products",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showproducts",
            component: ShowProducts,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "products show",
                subject: "products",
              },
            },
          },
        ],
      },
      // End:: products Config

      // Start:: orders  Config
      {
        path: "/orders",
        name: "orders",
        component: ordersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allorders",
            component: Allorders,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "orders index",
                subject: "orders",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showorders",
            component: Showorders,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "orders show",
                subject: "orders",
              },
            },
          },
        ],
      },
      // End:: orders Config

      // Start:: cities  Config
      {
        path: "/cities",
        name: "cities",
        component: CitiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allcities",
            component: AllCities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities index",
                subject: "cities",
              },
            },
          },
          {
            path: "create",
            name: "Createcities",
            component: CreateCities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities create",
                subject: "cities",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editcities",
            component: EditCities,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities edit",
                subject: "cities",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showcities",
            component: ShowCities,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities show",
                subject: "cities",
              },
            },
          },
        ],
      },
      // End:: cities Config

      // Start:: districts  Config
      {
        path: "/districts",
        name: "districts",
        component: DistrictsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Alldistricts",
            component: AllDistricts,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts index",
                subject: "districts",
              },
            },
          },
          {
            path: "create",
            name: "Createdistricts",
            component: CreateDistricts,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts create",
                subject: "districts",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editdistricts",
            component: EditDistricts,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts edit",
                subject: "districts",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showdistricts",
            component: ShowDistricts,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts show",
                subject: "districts",
              },
            },
          },
        ],
      },
      // End:: districts Config

      // Start:: RegionsHome  Config
      {
        path: "/areas",
        name: "regions",
        component: RegionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRegions",
            component: AllRegions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas index",
                subject: "areas",
              },
            },
          },
          {
            path: "create",
            name: "CreateRegions",
            component: CreateRegions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas create",
                subject: "areas",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRegions",
            component: EditRegions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas edit",
                subject: "areas",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowRegions",
            component: ShowRegions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas show",
                subject: "areas",
              },
            },
          },
        ],
      },
      // End:: Regions Config

      // Start:: services  Config
      {
        path: "/services",
        name: "services",
        component: ServicesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allservices",
            component: AllServices,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services index",
                subject: "services",
              },
            },
          },
          {
            path: "create",
            name: "Createservices",
            component: CreateServices,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services create",
                subject: "services",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editservices",
            component: EditServices,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services edit",
                subject: "services",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showservices",
            component: ShowServices,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services show",
                subject: "services",
              },
            },
          },
        ],
      },
      // End:: services Config

      // Start:: reasons  Config
      {
        path: "/reasons",
        name: "reasons",
        component: ReasonsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allreasons",
            component: AllReasons,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "reasons index",
                subject: "reasons",
              },
            },
          },
          {
            path: "create",
            name: "Createreasons",
            component: CreateReasons,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "reasons create",
                subject: "reasons",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editreasons",
            component: EditReasons,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "reasons edit",
                subject: "reasons",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showreasons",
            component: ShowReasons,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "reasons show",
                subject: "reasons",
              },
            },
          },
        ],
      },
      // End:: reasons Config

      // Start:: workplaces  Config
      {
        path: "/workplaces",
        name: "workplaces",
        component: WorkplacesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allworkplaces",
            component: AllWorkplaces,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "workplaces index",
                subject: "workplaces",
              },
            },
          },
          {
            path: "create",
            name: "Createworkplaces",
            component: CreateWorkplaces,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "workplaces create",
                subject: "workplaces",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editworkplaces",
            component: EditWorkplaces,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "workplaces edit",
                subject: "workplaces",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showworkplaces",
            component: ShowWorkplaces,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "workplaces show",
                subject: "workplaces",
              },
            },
          },
        ],
      },
      // End:: workplaces Config

      // Start:: WalletRequests  Config
      {
        path: "/RequestWallets",
        name: "RequestWallets",
        component: RequestWalletsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRequestWallets",
            component: AllRequestWallets,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "requestwallets index",
                subject: "requestwallets",
              },
            },
          },
        ],
      },
      // End:: WalletRequests Config

      // Start:: WalletHistory  Config
      {
        path: "/WalletHistory",
        name: "WalletHistory",
        component: WalletHistoryHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all/:id",
            name: "AllWalletHistory",
            component: AllWalletHistory,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users index",
                subject: "users",
              },
            },
          },
        ],
      },
      // End:: WalletHistory Config

      // Start:: banks  Config
      {
        path: "/banks",
        name: "banks",
        component: BanksHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allbanks",
            component: AllBanks,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks index",
                subject: "banks",
              },
            },
          },
          {
            path: "create",
            name: "Createbanks",
            component: CreateBanks,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks create",
                subject: "banks",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editbanks",
            component: EditBanks,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks edit",
                subject: "banks",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showbanks",
            component: ShowBanks,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks show",
                subject: "banks",
              },
            },
          },
        ],
      },
      // End:: banks Config

      // Start:: packages  Config
      {
        path: "/packages",
        name: "packages",
        component: PackagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allpackages",
            component: AllPackages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages index",
                subject: "packages",
              },
            },
          },
          {
            path: "create",
            name: "Createpackages",
            component: CreatePackages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages create",
                subject: "packages",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editpackages",
            component: EditPackages,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages edit",
                subject: "packages",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showpackages",
            component: ShowPackages,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages show",
                subject: "packages",
              },
            },
          },
        ],
      },
      // End:: packages Config

      // Start:: ads  Config
      {
        path: "/ads",
        name: "ads",
        component: AdsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allads",
            component: AllAds,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisments index",
                subject: "advertisments",
              },
            },
          },
          {
            path: "create",
            name: "Createads",
            component: CreateAds,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisments create",
                subject: "advertisments",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editads",
            component: EditAds,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisments edit",
                subject: "advertisments",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showads",
            component: ShowAds,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisments show",
                subject: "advertisments",
              },
            },
          },
        ],
      },
      // End:: ads Config

      // Start:: All Notifications Route Config
      {
        path: "/all-notifications",
        name: "NotificationsHome",
        component: NotificationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllNotifications",
            component: AllNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications index",
                subject: "notifications",
              },
            },
          },
          {
            path: "create",
            name: "CreateNotificationss",
            component: CreateNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications create",
                subject: "notifications",
              },
            },
          },
          {
            path: "show",
            name: "ShowAllNotifications",
            component: ShowAllNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications show",
                subject: "notifications",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowNotificationss",
            component: ShowNotificationsTable,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications show",
                subject: "notifications",
              },
            },
          },
        ],
      },
      // End:: All Notifications Route Config

      // Start:: Clients Routes Config
      {
        path: "/Clients",
        name: "ClientsHome",
        component: ClientsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllClients",
            component: AllClients,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients index",
                subject: "clients",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowClients",
            component: ShowClients,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients show",
                subject: "clients",
              },
            },
          },
        ],
      },
      // End:: Clients Routes Config

      // Start:: Order requests config
      {
        path: "/order-requests",
        name: "OrdersRequestsHome",
        component: OrdersRequestsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOrdersRequests",
            component: AllOrdersRequests,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users index",
                subject: "users",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowOrdersRequests",
            component: ShowOrdersRequests,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users index",
                subject: "users",
              },
            },
          },
        ],
      },
      // End:: Order requests config

      // Start:: questions Routes Config
      {
        path: "/questions",
        name: "questionsHome",
        component: questionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allquestions",
            component: Allquestions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions index",
                subject: "questions",
              },
            },
          },
          {
            path: "create",
            name: "Createquestions",
            component: Createquestions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions create",
                subject: "questions",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editquestions",
            component: Editquestions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions edit",
                subject: "questions",
              },
            },
          },
        ],
      },
      // End:: questions Routes Config

      // Start:: Categories Routes Config
      {
        path: "/main-categories",
        name: "CategoriesHome",
        component: CategoriesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCategories",
            component: AllCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "create",
            name: "CreateCategories",
            component: CreateCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCategories",
            component: EditCategories,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCategories",
            component: ShowCategories,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
        ],
      },
      // End:: Categories Routes Config

      // Start:: sub Categories Routes Config
      {
        path: "/sub-categories",
        name: "CategoriesHome",
        component: SubCategoriesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllSubCategories",
            component: AllSubCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "create",
            name: "CreateSubCategories",
            component: CreateSubCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditSubCategories",
            component: EditSubCategories,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowSubCategories",
            component: ShowSubCategories,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
        ],
      },
      // End:: sub Categories Routes Config

      // Start:: management Routes Config
      {
        path: "/managements",
        name: "ManagementsHome",
        component: ManagementsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllManagements",
            component: AllManagements,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "management index",
                subject: "management",
              },
            },
          },
          {
            path: "create",
            name: "CreateManagements",
            component: CreateManagements,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "management index",
                subject: "management",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditManagements",
            component: EditManagements,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowManagements",
            component: ShowManagements,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "management index",
                subject: "management",
              },
            },
          },
        ],
      },
      // End:: management Routes Config

      // Start:: Capacities  Config
      {
        path: "/Capacities",
        name: "CapacitiesHome",
        component: CapacitiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCapacitiesHome",
            component: AllCapacities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "capacities index",
                subject: "capacities",
              },
            },
          },
          {
            path: "create",
            name: "CreateCapacities",
            component: CreateCapacities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "capacities create",
                subject: "capacities",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCapacities",
            component: EditCapacities,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "capacities edit",
                subject: "capacities",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCapacities",
            component: ShowCapacities,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "capacities show",
                subject: "capacities",
              },
            },
          },
        ],
      },
      // End:: Capacities Config

      // Start:: ResidentialAdd  Config
      {
        path: "/ResidentialAdd",
        name: "ResidentialAddHome",
        component: ResidentialAddHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllResidentialAddHome",
            component: AllResidentialAdd,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additions index",
                subject: "additions",
              },
            },
          },
          {
            path: "create",
            name: "CreateResidentialAdd",
            component: CreateResidentialAdd,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additions create",
                subject: "additions",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditResidentialAdd",
            component: EditResidentialAdd,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additions edit",
                subject: "additions",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowResidentialAdd",
            component: ShowResidentialAdd,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additions show",
                subject: "additions",
              },
            },
          },
        ],
      },
      // End:: ResidentialAdd Config

      // Start:: Coupons  Config
      {
        path: "/coupons",
        name: "CouponsHome",
        component: CouponsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCoupons",
            component: AllCoupons,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coupons index",
                subject: "coupons",
              },
            },
          },
          {
            path: "create",
            name: "CreateCoupons",
            component: CreateCoupons,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coupons create",
                subject: "coupons",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCoupons",
            component: EditCoupons,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coupons edit",
                subject: "coupons",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCoupons",
            component: ShowCoupons,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coupons show",
                subject: "coupons",
              },
            },
          },
        ],
      },
      // End:: Coupons Config

      // Start:: App contact Routes Config
      {
        path: "/contact_settings",
        component: GeneralSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings create",
            subject: "settings",
          },
        },
      },
      {
        path: "/app_settings",
        component: AppSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings edit",
            subject: "settings",
          },
        },
      },
      // End:: App contact Routes Config
    ],
  },
  // ***************** End:: Content Routes Config

  // ***************** Start:: Forbidden Route Config
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
  // ***************** End:: Forbidden Route Config

  // ***************** Start:: Not Found Route Config
  {
    path: "/:notFound(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  // ***************** End:: Not Found Route Config
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
  routes,
});

// Start:: Middleware And Router Guards
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

// Authentication and Permission Check Middleware
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem(
    "alaween_admin_dashboard_user_token"
  );

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = { from, next, router, to };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else if (isAuthenticated) {
    const publicRoutes = [
      "LoginForm",
      "ResetPasswordEmailForm",
      "PhoneVerification",
      "ChangePhoneNumberForm",
      "ResetPasswordForm",
    ];

    if (publicRoutes.includes(to.name)) {
      return next("/home");
    }
  }

  if (to.meta.requiresPermission) {
    const { action, subject } = to.meta.requiresPermission;
    const storedPermissions = JSON.parse(
      localStorage.getItem("alaween_admin_roles")
    )?.permissions;

    if (
      storedPermissions &&
      storedPermissions.some(
        (permission) =>
          permission.action === action && permission.subject === subject
      )
    ) {
      return next();
    } else {
      return next("/forbidden");
    }
  }

  return next();
});

export default router;
