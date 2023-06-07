<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { FetchListFunc } from '@/models'

interface ListItem {
  id: string | number
  [key: string]: any
}
interface Props {
  itemsPerPage?: number
  fetchListFunc: FetchListFunc
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
})

let currentPage = 1
const isItemsLoading = ref(false)
const isLoadingError = ref(false)
const items = ref<ListItem[]>([])

const addItems = async () => {
  isLoadingError.value = false
  isItemsLoading.value = true
  try {
    const itemslist = await props.fetchListFunc(currentPage, props.itemsPerPage)
    items.value.push(...itemslist)
    currentPage++
  } catch (error) {
    isLoadingError.value = true
  } finally {
    isItemsLoading.value = false
  }
}

const scrollContainer = ref()
const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
  const threshold = 1 // the scrollbar size
  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    addItems()
  }
}

onMounted(() => {
  addItems()
})
</script>

<template>
  <div
    ref="scrollContainer"
    class="h-full overflow-y-auto divide-y-2"
    @scroll="onScroll"
  >
    <div v-for="item in items" :key="item.id">
      <slot name="item" :item="item"></slot>
    </div>
    <div
      v-if="isItemsLoading || isLoadingError"
      class="p-6 h-[200px] flex items-center justify-center"
      :class="{ 'bg-red-100': isLoadingError }"
    >
      <div v-if="isItemsLoading">loading</div>
      <div v-else class="flex space-x-4 items-center">
        <span class="text-xl">Failed to load items!</span
        ><ButtonBase @click="addItems">Try again</ButtonBase>
      </div>
    </div>
  </div>
</template>
