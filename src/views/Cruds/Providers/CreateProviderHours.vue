<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <div class="row">
            <h3 class="col-6">{{ $t("PLACEHOLDERS.working_hours") }}</h3>
            <div class="col-6 text-end">
              <v-btn @click="$router.go(-1)" style="color: #1f92d6">
                <i class="fas fa-backward"></i>
              </v-btn>
            </div>
          </div>
          <!-- <div v-if="data.work_hours.length == 0" class="text-center">
            <h5 class="my-5 mx-2 d-inline">{{ $t("TABLES.noData") }}</h5>
            <button type="button" @click="addWorkDay">
              <i
                class="fas fa-plus-circle"
                style="font-size: 20px; color: #007bff"
              ></i>
            </button>
          </div> -->
          <div v-for="(element, index) in data.work_hours" :key="index">
            <base-select-input
              col="10"
              :optionsList="filteredDays"
              :placeholder="$t('PLACEHOLDERS.day')"
              v-model="element.day_id"
              disabled
            />
            <div
              v-if="element.times?.length > 0"
              v-for="(time, timeIndex) in element.times"
              :key="timeIndex"
              class="row"
            >
              <base-input
                v-if="time.start_time && time.start_time.includes('am' || 'pm')"
                col="4"
                type="time"
                :placeholder="$t('TABLES.ImagesSpaces.start_time')"
                v-model.trim="time.start_time.slice(0, 5)"
                disabled
              />
              <base-input
                v-else
                col="4"
                type="time"
                :placeholder="$t('TABLES.ImagesSpaces.start_time')"
                v-model.trim="time.start_time"
              />
              <base-input
                v-if="time.end_time && time.start_time.includes('am' || 'pm')"
                col="4"
                type="time"
                :placeholder="$t('TABLES.ImagesSpaces.end_time')"
                v-model.trim="time.end_time.slice(0, 5)"
                disabled
              />
              <base-input
                v-else
                col="4"
                type="time"
                :placeholder="$t('TABLES.ImagesSpaces.end_time')"
                v-model.trim="time.end_time"
              />
              <div class="col-3 mt-5 pt-5">
                <button
                  type="button"
                  v-if="
                    time.end_time != null ||
                    time.start_time != null ||
                    timeIndex > 0
                  "
                  @click="
                    removeWorkDay(index, timeIndex, time.id, element.day_id)
                  "
                >
                  <i
                    class="fas fa-minus-circle"
                    style="font-size: 20px; color: #007bff; margin-left: 5px"
                  ></i>
                </button>
                <button
                  type="button"
                  @click="addWorkDay(element.day_id.id)"
                  v-if="timeIndex === element.times.length - 1"
                >
                  <i
                    class="fas fa-plus-circle"
                    style="font-size: 20px; color: #007bff"
                  ></i>
                </button>
              </div>
            </div>
            <div v-if="element.times?.length == 0">
              <button type="button" @click="addWorkDay(element.day_id.id)">
                <i
                  class="fas fa-plus-circle"
                  style="font-size: 20px; color: #007bff"
                ></i>
                {{ $t("BUTTONS.addTime") }}
              </button>
            </div>
            <hr class="my-5 py-5" />
          </div>

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button
              class="mt-2"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.save')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
              v-if="data.work_hours.length != 0"
            />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "GeneralSettings",

  data() {
    return {
      isWaitingRequest: false,
      data: {
        work_hours: [
          {
            day_id: { id: null, name: null },
            times: [
              {
                id: null,
                start_time: null,
                end_time: null,
              },
            ],
          },
        ],
      },
      dayMappingToEnglish: {
        الأحد: "Sunday",
        الاثنين: "Monday",
        الثلاثاء: "Tuesday",
        الأربعاء: "Wednesday",
        الخميس: "Thursday",
        الجمعة: "Friday",
        السبت: "Saturday",
      },
    };
  },

  computed: {
    dayMapping() {
      return {
        السبت: { id: 1, name: this.$t("days.Saturday") },
        الأحد: { id: 2, name: this.$t("days.Sunday") },
        الاثنين: { id: 3, name: this.$t("days.Monday") },
        الثلاثاء: { id: 4, name: this.$t("days.Tuesday") },
        الأربعاء: { id: 5, name: this.$t("days.Wednesday") },
        الخميس: { id: 6, name: this.$t("days.Thursday") },
        الجمعة: { id: 7, name: this.$t("days.Friday") },
      };
    },
    filteredDays() {
      const usedDays = new Set(
        this.data.work_hours.map((workHour) => workHour.day_id?.id)
      );
      const usedDaysNames = new Set(
        this.data.work_hours.map((workHour) => workHour.day_id?.name)
      );
      return Object.values(this.dayMapping).filter(
        (day) => !usedDaysNames.has(day.name)
      );
    },
  },

  methods: {
    addWorkDay(dayId) {
      const currentDay = this.data.work_hours.find(
        (workHour) => workHour.day_id.id === dayId
      );

      if (currentDay) {
        currentDay.times.push({
          id: null,
          start_time: null,
          end_time: null,
        });
      } else {
        // If no such day exists (shouldn't happen in your case), you can add a new entry
        this.data.work_hours.push({
          day_id: { id: dayId, name: this.dayMapping[dayId].name },
          times: [
            {
              id: null,
              start_time: null,
              end_time: null,
            },
          ],
        });
      }
    },

    async removeWorkDay(index, item_index, time_id, day_id) {
      try {
        // If time_id exists, call the API to delete the time entry
        if (time_id) {
          this.isWaitingRequest = true;
          await this.$axios({
            method: "DELETE",
            url: `schedule-store/delete/${time_id}`,
          });
          this.isWaitingRequest = false;
          this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
          this.getDataToEdit();
        } else {
          this.data.work_hours[index].times.splice(item_index, 1);
          this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
        }
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors.message[0]);
      }
    },

    async getDataToEdit() {
      try {
        let res = await this.$axios.get(
          `stores/schedule-store/${this.$route.params.id}`
        );
        console.log("API Response:", res);
        this.data.work_hours = res.data.data.Schedules.map((schedule) => {
          const dayMappingItem = Object.values(this.dayMapping).find(
            (day) => day.name === schedule.day_id
          );

          if (dayMappingItem) {
            return {
              day_id: { id: dayMappingItem.id, name: dayMappingItem.name },
              times: schedule.times.map((time) => ({
                id: time.id,
                start_time: time.start_time,
                end_time: time.end_time,
              })),
            };
          } else {
            return null;
          }
        }).filter((item) => item !== null);

        const existingDayIds = new Array(
          this.data.work_hours.map((workHour) => workHour.day_id.id)
        )[0];
        const allDayIds = Object.values(this.dayMapping).map((day) => day.id);
        allDayIds.forEach((dayId) => {
          if (!existingDayIds.includes(dayId)) {
            // Add missing day with empty times
            this.data.work_hours.push({
              day_id: {
                id: dayId,
                name: Object.values(this.dayMapping).find(
                  (day) => day.id == dayId
                ).name,
              },
              times: [{ id: null, start_time: null, end_time: null }],
            });
          }
        });
      } catch (error) {
        console.error("Error fetching work hours data:", error);
      }
    },

    validateFormInputs() {
      this.submitForm();
    },

    async submitForm() {
      this.isWaitingRequest = true;
      console.log(this.data.work_hours);

      // Construct REQUEST_DATA with at least the day and times array, even if times are empty or invalid
      const REQUEST_DATA = {
        days: this.data.work_hours
          .map((workHour) => {
            // Filter out empty or invalid times for the day
            const validTimes = workHour.times.filter(
              (time) => time.start_time && time.end_time
            );

            // Send the day only if valid times exist
            if (validTimes.length > 0) {
              return {
                day_id: workHour.day_id.id,
                times: validTimes.map((time) => ({
                  start_time: time.start_time.slice(0, 5),
                  end_time: time.end_time.slice(0, 5),
                })),
              };
            }
            return null;
          })
          .filter((item) => item !== null),
      };

      console.log("REQUEST_DATA", REQUEST_DATA);

      try {
        await this.$axios({
          method: "POST",
          url: `stores/schedule-store/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors.message[0]);
      }
    },
    async getDays() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "days",
        });
        this.days = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    this.getDays();
    this.getDataToEdit();
  },
};
</script>

<style scoped>
.item-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.disabled_button {
  color: #a0a0a0 !important;
  cursor: not-allowed !important;
  pointer-events: all !important;
}
</style>
