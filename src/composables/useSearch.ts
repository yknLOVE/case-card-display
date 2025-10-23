import { computed, unref, type Ref } from 'vue'
import type { CaseItem } from './useFetchCases'

export function useSearch(
    casesSource: Ref<CaseItem[]> | CaseItem[],
    searchTermSource: Ref<string> | string
) {
    return computed(() => {
        const list = unref(casesSource) || []
        const term = (unref(searchTermSource) || '').toString().trim().toLowerCase()

        if (!term) return list

        return list.filter((caseItem) => {
            const title = (caseItem.title || '').toString().toLowerCase()
            const owner = (caseItem.owner || '').toString().toLowerCase()
            const school = (caseItem.school || '').toString().toLowerCase()
            const tags = Array.isArray(caseItem.tags) ? caseItem.tags : []

            const inTags = tags.some((tag) => tag.toString().toLowerCase().includes(term))

            return title.includes(term) || owner.includes(term) || school.includes(term) || inTags
        })
    })
}