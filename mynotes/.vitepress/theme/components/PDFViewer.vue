<template>
  <div class="pdf-viewer">
    <iframe :src="pdfUrl" width="100%" height="800px" style="border: none;">
    </iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const pdfUrl = computed(() => withBase(props.src))
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  margin-top: 20px;
}
</style>
