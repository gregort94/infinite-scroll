<script lang="ts" setup>
import { fetchUsers } from '@/api'
import InfiniteScrollList from './InfiniteScrollList.vue'
import UserCard from './UserCard.vue'
import { FetchListFunc } from '@/models'

const fetchUsersList: FetchListFunc = async (page, perPage) => {
  return await fetchUsers(page, perPage)
}
</script>

<template>
  <InfiniteScrollList :fetch-list-func="fetchUsersList">
    <template #item="{ item }">
      <UserCard :user="item"></UserCard>
    </template>
  </InfiniteScrollList>
</template>
