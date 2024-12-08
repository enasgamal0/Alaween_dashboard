<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.Overall_statistics") }}</h5>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <!-- <ComingSoon /> -->
      <div class="statics mt-4">
        <div class="row">
          <div
            class="col-lg-6 col-md-6 col-12"
            v-for="(value, key) in statics"
            :key="'i' + key"
          >
            <div class="box">
              <div class="icon">
                <i v-if="key === 'countUsers'" class="fas fa-users"></i>

                <i v-else-if="key === 'countUsersHasOrders'" class="fas fa-user-tie"></i>

                <i
                  v-else-if="key === 'countCleaner'"
                  class="fas fa-hands-wash"
                ></i>

                <i
                  v-else-if="key === 'countOrder'"
                  class="fas fa-box"
                ></i>

                <i
                  v-else-if="key === 'countOrderPending'"
                  class="fas fa-spinner"
                ></i>

                <i
                  v-else-if="key === 'countOrderCancel'"
                  class="fas fa-window-close"
                ></i>
              </div>

              <div class="info_box">
                <span v-if="key == 'countUsers'">{{
                  $t("PLACEHOLDERS.total_app_users")
                }}</span>

                <span v-else-if="key === 'countUsersHasOrders'">{{
                  $t("PLACEHOLDERS.users_with_requests")
                }}</span>

                <span v-else-if="key === 'countCleaner'">{{
                  $t("PLACEHOLDERS.count_cleaner")
                }}</span>

                <span v-else-if="key === 'countOrder'">{{
                  $t("PLACEHOLDERS.total_requests")
                }}</span>

                <span v-else-if="key === 'countOrderPending'">{{
                  $t("PLACEHOLDERS.pending_requests")
                }}</span>

                <span v-else-if="key === 'countOrderCancel'">{{
                  $t("PLACEHOLDERS.canceled_requests")
                }}</span>

                <p class="number_box">{{ value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->
  </div>
</template>

<script>
import ComingSoon from "@/components/ui/ComingSoon.vue";

export default {
  name: "HomePage",

  components: {
    ComingSoon,
  },

  data() {
    return {
      statics: [],
    };
  },

  methods: {
    async getStatics() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "Statistics",
        });

        // console.log("All Data ==>", res.data.data);
        this.statics = res.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows
  },

  mounted() {
    this.getStatics();
  },
};
</script>

<style lang="scss" scoped>
.show_all_content_wrapper {
  .statics {
    .box {
      background: #1F92D6;
      padding: 25px;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      //cursor: pointer;
      transition: all 0.5s;

      &:hover {
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .icon {
          i {
            color: #1F92D6;
          }
        }
        .info_box {
          span,
          p.number_box {
            color: #000;
          }
        }
      }

      .icon {
        height: 60px;
        min-width: 60px;
        width: 60px;
        border-radius: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 25px;
          color: #000;
        }
      }

      .info_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        span {
          font-size: 19px;
          color: #fff;
        }

        p.number_box {
          font-size: 30px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
