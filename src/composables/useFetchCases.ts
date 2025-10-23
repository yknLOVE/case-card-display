import { ref, type Ref } from 'vue';

export interface CaseItem {
    id: number
    title: string
    owner: string
    school?: string
    tags?: string[]
    thumbnail?: string
    description?: string
    // 新增可选字段以匹配组件中使用的属性
    badge?: string
    score?: number
    views?: number
    comments?: number
    likes?: number
    category?: string
    topic?: string
}

export function useFetchCases(): {
    cases: Ref<CaseItem[]>
    loading: Ref<boolean>
    error: Ref<string | null>
    fetchCases: (newList?: CaseItem[]) => CaseItem[]
} {
    const initialCases: CaseItem[] = [
        {
            id: 1,
            title: '医学伦理学课程思政案例',
            owner: '张三',
            school: '医学院A',
            tags: ['医学', '伦理', '课程思政'],
            thumbnail: '/images/thumbnail1.jpg',
            description: '通过课堂讨论与案例分析，引导学生思考医学伦理问题。',
            badge: '优秀案例',
            score: 4.8,
            views: 1250,
            comments: 23,
            likes: 45,
            category: '医学',
            topic: '课程思政'
        },
        {
            id: 2,
            title: '工程伦理与职业责任',
            owner: '李四',
            school: '工程学院B',
            tags: ['工程', '职业素养'],
            thumbnail: '/images/thumbnail2.jpg',
            description: '结合工程案例培养学生的职业责任感。',
            badge: '推荐',
            score: 4.6,
            views: 980,
            comments: 18,
            likes: 32,
            category: '工程类',
            topic: '职业教育'
        },
        {
            id: 3,
            title: '文学经典中的家国情怀',
            owner: '王五',
            school: '人文学院C',
            tags: ['文学', '家国情怀'],
            thumbnail: '/images/thumbnail3.jpg',
            description: '通过经典文学作品培养学生的家国情感与价值观。',
            score: 4.7,
            views: 1100,
            comments: 31,
            likes: 67,
            category: '人文社科',
            topic: '价值教育'
        }
    ]

    const cases = ref<CaseItem[]>(initialCases)
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)

    function fetchCases(newList?: CaseItem[]) {
        if (Array.isArray(newList)) {
            cases.value = newList
        }
        return cases.value
    }

    return { cases, loading, error, fetchCases }
}