<template>
    <div class="map_wrapper">
      <GmapMap
        :center="{ lat: parseFloat(lat), lng: parseFloat(lng) }"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100%; height: 400px"
        @click="onMapClick"
      >
        <GmapMarker
          :position="{ lat: parseFloat(lat), lng: parseFloat(lng) }"
          :clickable="true"
          :draggable="true"
          @dragend="onMarkerDragEnd"
        />
      </GmapMap>
    </div>
  </template>
  
  <script>
  export default {
    name: "MapComponent",
    props: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    methods: {
      onMarkerDragEnd(event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
  
        this.$emit("update:lat", newLat);
        this.$emit("update:lng", newLng);
      },
      onMapClick(event) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();
        
        this.$emit("update:lat", clickedLat);
        this.$emit("update:lng", clickedLng);
      },
    },
  };
  </script>
  
  <style scoped>
  .map_wrapper {
    width: 100%;
    height: 100%;
  }
  </style>
  