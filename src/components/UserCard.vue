<script lang="ts" setup>
import { User } from '@/models'

interface Props {
  user: User
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex p-6">
    <div class="w-10 h-10 rounded-full overflow-hidden">
      <img :src="user.avatarUrl" alt="avatar" />
    </div>
    <div class="flex-grow">
      <div class="font-semibold text-center">{{ user.name }}</div>
      <div class="text-end">
        email: <span class="italic">{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>
