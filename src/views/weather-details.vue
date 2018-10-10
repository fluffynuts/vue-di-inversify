<template>
<div v-if="weather">
    <h3>{{ weather.main }} </h3>
    <img :src="iconUrl"/>
</div>
<div v-else>
    ):
</div>
</template>

<script lang="ts" src="./weather-detail.ts">
</script>
