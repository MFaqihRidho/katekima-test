<script setup lang="ts">
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
// @ts-ignore
import Button from './Button.vue'

interface Props {
  title?: string
  message?: string
  cancelText?: string
  confirmText?: string
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirm Deletion',
  message: 'Are you sure you want to delete this item? This action cannot be undone.',
  cancelText: 'Cancel',
  confirmText: 'Delete',
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const confirmDelete = () => {
  emit('confirm')
}

// Expose methods to parent component
defineExpose({
  openModal,
  closeModal,
})
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[9999999]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </DialogTitle>

              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </div>

              <div class="mt-4 flex justify-end space-x-3">
                <Button
                  :isLoading="isLoading"
                  type="button"
                  variant="secondary"
                  @click="closeModal"
                >
                  {{ cancelText }}
                </Button>
                <Button :isLoading="isLoading" type="button" variant="main" @click="confirmDelete">
                  {{ confirmText }}
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
