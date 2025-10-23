import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useResponsive(breakpoint = 768) {
    const isMobile = ref(false);

    const checkViewport = () => {
        isMobile.value = window.innerWidth <= breakpoint;
    };

    onMounted(() => {
        checkViewport();
        window.addEventListener('resize', checkViewport);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkViewport);
    });

    return {
        isMobile,
    };
}