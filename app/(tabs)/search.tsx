import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Card,
    Input,
    Paragraph,
    ScrollView,
    Spinner,
    Text,
    XStack,
    YStack
} from 'tamagui'
import AIChatModal from '../../components/AIChatModal'
import MapWidget from '../../components/MapWidget'
import MedicineCard from '../../components/MedicineCard'
import { setCountry } from '../../redux/medicinesSlice'
import { RootState } from '../../redux/store'

const countries = [
    { code: 'RU', name: 'Россия' },
    { code: 'US', name: 'США' },
    { code: 'IL', name: 'Израиль' },
]

// Города для карт
const cities = [
    { code: 'moscow', name: 'Москва', country: 'RU', icon: '🏛️' },
    { code: 'boston', name: 'Бостон', country: 'US', icon: '🏙️' },
    { code: 'tel-aviv', name: 'Тель-Авив', country: 'IL', icon: '🏖️' },
]

const medicalFilters = [
    { id: 'age', label: 'Возрастная группа', icon: 'people-outline' },
    { id: 'pregnancy', label: 'Беременность/лактация', icon: 'heart-outline' },
    { id: 'interactions', label: 'Лекарственные взаимодействия', icon: 'warning-outline' },
    { id: 'contraindications', label: 'Противопоказания', icon: 'close-circle-outline' },
    { id: 'dosage', label: 'Форма выпуска', icon: 'medical-outline' },
]

const professionalSearchOptions = [
    { id: 'inn', label: 'МНН (активное вещество)', placeholder: 'Парацетамол, Ибупрофен...' },
    { id: 'indication', label: 'Показания к применению', placeholder: 'Головная боль, лихорадка...' },
    { id: 'atc', label: 'АТХ код', placeholder: 'N02BE01, M01AE01...' },
]

// Новые фичи для обычного поиска
const quickFilters = [
    { id: 'price', label: 'До 100₽', icon: 'card-outline' },
    { id: 'rating', label: 'Рейтинг 4+', icon: 'star-outline' },
    { id: 'available', label: 'В наличии', icon: 'checkmark-circle-outline' },
    { id: 'prescription', label: 'Без рецепта', icon: 'document-outline' },
]

const popularTags = [
    'Парацетамол', 'Ибупрофен', 'Аспирин', 'Цитрамон', 'Нурофен', 'Анальгин'
]

const sortOptions = [
    { id: 'relevance', label: 'По релевантности' },
    { id: 'price_asc', label: 'Цена: по возрастанию' },
    { id: 'price_desc', label: 'Цена: по убыванию' },
    { id: 'rating', label: 'По рейтингу' },
    { id: 'name', label: 'По названию' },
]

export default function SearchPage() {
    const query = useSelector((state: RootState) =>
        state.medicines.query.toLowerCase()
    )
    const selectedCountry = useSelector((state: RootState) => state.medicines.country)
    const items = useSelector((state: RootState) => state.medicines.items)
    const dispatch = useDispatch()
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const router = useRouter()

    const [searchMode, setSearchMode] = useState<'basic' | 'pro'>('basic')
    const [selectedCity, setSelectedCity] = useState('moscow') // По умолчанию Москва
    const [proSearchData, setProSearchData] = useState({
        inn: '',
        indication: '',
        atc: '',
        selectedFilters: [] as string[],
    })

    // Новые состояния для обычного поиска
    const [basicFilters, setBasicFilters] = useState<string[]>([])
    const [sortBy, setSortBy] = useState('relevance')
    const [showFilters, setShowFilters] = useState(false)
    const [showMap, setShowMap] = useState(false)

    // Получаем город для выбранной страны
    const getCityForCountry = (countryCode: string) => {
        const city = cities.find(c => c.country === countryCode)
        return city ? city.code : 'moscow'
    }

    // Обновляем город при смене страны
    useEffect(() => {
        setSelectedCity(getCityForCountry(selectedCountry))
    }, [selectedCountry])

    const filtered = items.filter(
        (m) =>
            m.name.toLowerCase().includes(query) &&
            (!m.country || m.country === selectedCountry)
    )

    const [aiTip, setAiTip] = useState<string | null>(null)
    const [loadingTip, setLoadingTip] = useState(false)
    const [isChatVisible, setIsChatVisible] = useState(false)

    useEffect(() => {
        if (filtered.length > 0) {
            setLoadingTip(true)
            setTimeout(() => {
                const tip = searchMode === 'pro' 
                    ? `Найдено ${filtered.length} препаратов. Рекомендации: проверьте взаимодействия и противопоказания`
                    : `Найдено ${filtered.length} аналогов в стране ${selectedCountry}`
                setAiTip(tip)
                setLoadingTip(false)
            }, 700)
        } else {
            setAiTip(null)
        }
    }, [query, selectedCountry, searchMode])

    const toggleFilter = (filterId: string, isBasic = false) => {
        if (isBasic) {
            setBasicFilters(prev =>
                prev.includes(filterId)
                    ? prev.filter(id => id !== filterId)
                    : [...prev, filterId]
            )
        } else {
            setProSearchData(prev => ({
                ...prev,
                selectedFilters: prev.selectedFilters.includes(filterId)
                    ? prev.selectedFilters.filter(id => id !== filterId)
                    : [...prev.selectedFilters, filterId]
            }))
        }
    }

    const renderBasicSearch = () => (
        <YStack space="$4">
            {/* 🟦 Header - Красивая шапка */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$4" : "$5"}
                bordered
                borderColor="rgba(0, 122, 255, 0.3)"
                shadowColor="$shadowColor"
                shadowRadius={12}
                shadowOpacity={0.15}
            >
                <YStack space="$4">
                    {/* Заголовок с иконкой */}
                    <XStack alignItems="center" space="$3">
                        <YStack
                            width={isMobile ? 60 : 80}
                            height={isMobile ? 60 : 80}
                            backgroundColor="rgba(0, 122, 255, 0.1)"
                            borderRadius="$6"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="search" size={isMobile ? 28 : 36} color="#007AFF" />
                        </YStack>
                        <YStack flex={1}>
                            <Text 
                                fontSize={isMobile ? "$6" : "$7"} 
                                fontWeight="900" 
                                color="#1C1C1E"
                            >
                                Поиск аналогов лекарств
                            </Text>
                            <Text 
                                fontSize={isMobile ? "$3" : "$4"} 
                                color="#6B7280"
                                mt="$1"
                            >
                                Сравнивайте препараты между странами и экономьте на покупках
                            </Text>
                        </YStack>
                    </XStack>

                    {/* Статистика пользователей */}
                    <XStack space={isMobile ? "$3" : "$4"} justifyContent="space-around">
                        <YStack alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#007AFF">
                                50,000+
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center">
                                {isMobile ? "Пользователей" : "Довольных пользователей"}
                            </Text>
                        </YStack>
                        <YStack alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#34C759">
                                2,450₽
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center">
                                {isMobile ? "Экономия" : "Средняя экономия"}
                            </Text>
                        </YStack>
                        <YStack alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#FF9500">
                                3 страны
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center">
                                {isMobile ? "Сравнение" : "Для сравнения цен"}
                            </Text>
                        </YStack>
                    </XStack>

                    {/* Преимущества */}
                    <YStack space="$2">
                        <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                            Возможности платформы:
                        </Text>
                        <XStack flexWrap="wrap" space="$2">
                            {[
                                'Поиск аналогов', 'Сравнение цен', 'ИИ консультант', 
                                'Отзывы пользователей', 'Проверка наличия'
                            ].map((feature, index) => (
                                <XStack key={index} alignItems="center" space="$1" mb="$1">
                                    <Ionicons name="checkmark-circle" size={isMobile ? 14 : 16} color="#34C759" />
                                    <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                        {feature}
                                    </Text>
                                </XStack>
                            ))}
                        </XStack>
                    </YStack>
                </YStack>
            </Card>

            {/* 🏷️ Популярные теги */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$3" : "$4"}
                bordered
                borderColor="$gray4"
            >
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                        Популярные запросы
                    </Text>
                    <XStack flexWrap="wrap" space="$2">
                        {popularTags.map((tag) => (
                            <Button
                                key={tag}
                                size={isMobile ? "$2" : "$3"}
                                backgroundColor="transparent"
                                borderWidth={1}
                                borderColor="$gray6"
                                borderRadius="$4"
                                mb="$2"
                                pressStyle={{ scale: 0.96 }}
                                onPress={() => {
                                    // Здесь можно добавить логику поиска по тегу
                                }}
                            >
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                                    {tag}
                                </Text>
                            </Button>
                        ))}
                    </XStack>
                </YStack>
            </Card>

            {/* 🎛️ Фильтры и сортировка */}
            <XStack space="$2" alignItems="center" justifyContent="space-between">
                <Button
                    size={isMobile ? "$2" : "$3"}
                    backgroundColor={showFilters ? '#007AFF' : 'transparent'}
                    borderWidth={1}
                    borderColor={showFilters ? '#007AFF' : '$gray6'}
                    borderRadius="$4"
                    onPress={() => setShowFilters(!showFilters)}
                    pressStyle={{ scale: 0.96 }}
                >
                    <XStack alignItems="center" space="$1">
                        <Ionicons 
                            name="options-outline" 
                            size={isMobile ? 14 : 16} 
                            color={showFilters ? '#fff' : '#6B7280'} 
                        />
                        <Text 
                            fontSize={isMobile ? "$2" : "$3"} 
                            color={showFilters ? '#fff' : '#6B7280'}
                            fontWeight="600"
                        >
                            Фильтры
                        </Text>
                    </XStack>
                </Button>

                <Button
                    size={isMobile ? "$2" : "$3"}
                    backgroundColor="transparent"
                    borderWidth={1}
                    borderColor="$gray6"
                    borderRadius="$4"
                    pressStyle={{ scale: 0.96 }}
                >
                    <XStack alignItems="center" space="$1">
                        <Ionicons name="swap-vertical-outline" size={isMobile ? 14 : 16} color="#6B7280" />
                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                            Сортировка
                        </Text>
                    </XStack>
                </Button>
            </XStack>

            {/* 🔧 Быстрые фильтры */}
            {showFilters && (
                <Card
                    backgroundColor="#fff"
                    borderRadius="$6"
                    padding={isMobile ? "$3" : "$4"}
                    bordered
                    borderColor="$gray4"
                >
                    <YStack space="$3">
                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                            Быстрые фильтры
                        </Text>
                        <XStack flexWrap="wrap" space="$2">
                            {quickFilters.map((filter) => (
                                <Button
                                    key={filter.id}
                                    size={isMobile ? "$2" : "$3"}
                                    backgroundColor={basicFilters.includes(filter.id) ? '#007AFF' : 'transparent'}
                                    borderWidth={1}
                                    borderColor={basicFilters.includes(filter.id) ? '#007AFF' : '$gray6'}
                                    borderRadius="$4"
                                    onPress={() => toggleFilter(filter.id, true)}
                                    mb="$2"
                                    pressStyle={{ scale: 0.96 }}
                                >
                                    <XStack alignItems="center" space="$1">
                                        <Ionicons 
                                            name={filter.icon as any} 
                                            size={isMobile ? 12 : 14} 
                                            color={basicFilters.includes(filter.id) ? '#fff' : '#6B7280'} 
                                        />
                                        <Text 
                                            fontSize={isMobile ? "$2" : "$3"} 
                                            color={basicFilters.includes(filter.id) ? '#fff' : '#6B7280'}
                                            fontWeight="600"
                                        >
                                            {filter.label}
                                        </Text>
                                    </XStack>
                                </Button>
                            ))}
                        </XStack>
                    </YStack>
                </Card>
            )}

            {/* 🌍 Свитчер стран с результатами */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$3" : "$4"}
                bordered
                borderColor="$gray4"
                shadowColor="$shadowColor"
                shadowRadius={8}
                shadowOpacity={0.1}
            >
                <YStack space="$4">
                    <YStack space="$2">
                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                            Результаты поиска
                        </Text>
                        <Text fontSize={isMobile ? "$3" : "$4"} color="$gray10">
                            Найдено {filtered.length} {filtered.length === 1 ? 'лекарство' : filtered.length < 5 ? 'лекарства' : 'лекарств'} по запросу "{query}"
                        </Text>
                    </YStack>
                    
                    <XStack space="$2" justifyContent="space-between">
                        {countries.map((country) => {
                            const countryCount = items.filter(
                                m => m.name.toLowerCase().includes(query) && m.country === country.code
                            ).length;
                            
                            const isSelected = selectedCountry === country.code;
                            
                            return (
                                <Button
                                    key={country.code}
                                    size={isMobile ? "$2" : "$3"}
                                    backgroundColor={isSelected ? '#007AFF' : 'transparent'}
                                    borderWidth={2}
                                    borderColor={isSelected ? '#007AFF' : '#E5E7EB'}
                                    borderRadius="$4"
                                    onPress={() => dispatch(setCountry(country.code))}
                                    pressStyle={{ scale: 0.96 }}
                                    flex={1}
                                >
                                    <XStack alignItems="center" justifyContent="space-between" width="100%">
                                        <Text 
                                            fontSize={isMobile ? "$3" : "$4"}
                                            color={isSelected ? '#fff' : '#1C1C1E'}
                                            fontWeight="600"
                                        >
                                            {country.name}
                                        </Text>
                                        
                                        <XStack 
                                            backgroundColor={isSelected ? "rgba(255,255,255,0.2)" : "rgba(0,122,255,0.1)"}
                                            borderRadius="$2"
                                            px="$1.5"
                                            py="$0.5"
                                            alignItems="center"
                                            space="$1"
                                        >
                                            <Ionicons 
                                                name="checkmark-circle" 
                                                size={isMobile ? 12 : 14} 
                                                color={isSelected ? '#fff' : '#007AFF'} 
                                            />
                                            <Text 
                                                fontSize={isMobile ? "$1" : "$2"}
                                                color={isSelected ? '#fff' : '#007AFF'}
                                                fontWeight="600"
                                            >
                                                {countryCount}
                                            </Text>
                                        </XStack>
                                    </XStack>
                                </Button>
                            );
                        })}
                    </XStack>
                    
                    <XStack alignItems="center" space="$2" backgroundColor="rgba(0,122,255,0.05)" borderRadius="$4" padding="$3">
                        <Ionicons name="information-circle" size={isMobile ? 16 : 18} color="#007AFF" />
                        <Text fontSize={isMobile ? "$2" : "$3"} color="#007AFF" flex={1}>
                            Выберите страну для просмотра доступных аналогов и сравнения цен
                        </Text>
                    </XStack>
                </YStack>
            </Card>

            {/* 🗺️ Карта аптек */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$2" : "$4"}
                bordered
                borderColor="$gray4"
                shadowColor="$shadowColor"
                shadowRadius={8}
                shadowOpacity={0.1}
            >
                <YStack space="$2">
                    <XStack alignItems="center" justifyContent="space-between">
                        <XStack alignItems="center" space="$3">
                            <YStack
                                width={isMobile ? 40 : 48}
                                height={isMobile ? 40 : 48}
                                backgroundColor="rgba(0, 122, 255, 0.1)"
                                borderRadius="$4"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Ionicons name="location" size={isMobile ? 20 : 24} color="#007AFF" />
                            </YStack>
                            <YStack>
                                <XStack alignItems="center" space="$2">
                                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                        Наличие в аптеках
                                    </Text>
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#007AFF" fontWeight="700">
                                        {cities.find(c => c.code === selectedCity)?.name}
                                    </Text>
                                </XStack>
                            </YStack>
                        </XStack>
                        <Button
                            size={isMobile ? "$2" : "$3"}
                            backgroundColor="transparent"
                            borderWidth={1}
                            borderColor="$gray4"
                            borderRadius="$3"
                            onPress={() => setShowMap(!showMap)}
                            pressStyle={{ scale: 0.96 }}
                        >
                            <Ionicons 
                                name={showMap ? "chevron-up" : "chevron-down"} 
                                size={isMobile ? 16 : 18} 
                                color="#6B7280" 
                            />
                        </Button>
                    </XStack>
                    {showMap && (
                        <MapWidget city={selectedCity as 'moscow' | 'boston' | 'tel-aviv'} rect />
                    )}
                </YStack>
            </Card>

            {/* 🤖 ИИ помощник */}
            <Card
                backgroundColor="rgba(0, 122, 255, 0.05)"
                borderRadius="$6"
                padding={isMobile ? "$3" : "$4"}
                borderWidth={1}
                borderColor="rgba(0, 122, 255, 0.2)"
            >
                <YStack space="$3">
                    <XStack alignItems="center" space="$3">
                        <YStack
                            width={isMobile ? 40 : 48}
                            height={isMobile ? 40 : 48}
                            backgroundColor="rgba(0, 122, 255, 0.2)"
                            borderRadius="$4"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="chatbubble" size={isMobile ? 20 : 24} color="#007AFF" />
                        </YStack>
                        <YStack flex={1}>
                            <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#007AFF">
                                ИИ Помощник по лекарствам
                            </Text>
                            <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E">
                                Поможет найти аналоги, объяснит действие препаратов и ответит на вопросы о здоровье
                            </Text>
                        </YStack>
                        <Button
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor="#007AFF"
                            borderRadius="$4"
                            onPress={() => setIsChatVisible(true)}
                            pressStyle={{ scale: 0.96 }}
                        >
                            <Ionicons name="chatbubble-outline" size={isMobile ? 16 : 20} color="#fff" />
                        </Button>
                    </XStack>
                </YStack>
            </Card>
        </YStack>
    )

    const renderProSearch = () => (
        <YStack space="$4">
            {/* 👨‍⚕️ Pro Header - Красивая шапка */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$4" : "$5"}
                bordered
                borderColor="rgba(255, 149, 0, 0.3)"
                shadowColor="$shadowColor"
                shadowRadius={12}
                shadowOpacity={0.15}
            >
                <YStack space="$4">
                    {/* Заголовок с иконкой */}
                    <XStack alignItems="center" space="$3">
                        <YStack
                            width={isMobile ? 60 : 80}
                            height={isMobile ? 60 : 80}
                            backgroundColor="rgba(255, 149, 0, 0.1)"
                            borderRadius="$6"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="medical" size={isMobile ? 28 : 36} color="#FF9500" />
                        </YStack>
                        <YStack flex={1}>
                            <Text 
                                fontSize={isMobile ? "$6" : "$7"} 
                                fontWeight="900" 
                                color="#1C1C1E"
                            >
                                Pro поиск для врачей
                            </Text>
                            <Text 
                                fontSize={isMobile ? "$3" : "$4"} 
                                color="#6B7280"
                                mt="$1"
                            >
                                Профессиональный поиск по клиническим критериям
                            </Text>
                        </YStack>
                    </XStack>

                    {/* Статистика Pro */}
                    <XStack space={isMobile ? "$3" : "$4"} justifyContent="space-around">
                        <YStack alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#FF9500">
                                15,000+
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center">
                                Препаратов в базе
                            </Text>
                        </YStack>
                        <YStack alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#34C759">
                                98%
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center">
                                Точность данных
                            </Text>
                        </YStack>
                        <YStack alignItems="center">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#007AFF">
                                24/7
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280" textAlign="center">
                                Доступность ИИ
                            </Text>
                        </YStack>
                    </XStack>

                    {/* Преимущества */}
                    <YStack space="$2">
                        <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                            Профессиональные возможности:
                        </Text>
                        <XStack flexWrap="wrap" space="$2">
                            {[
                                'Поиск по МНН', 'АТХ коды', 'Взаимодействия', 
                                'Противопоказания', 'Клинические данные'
                            ].map((feature, index) => (
                                <XStack key={index} alignItems="center" space="$1" mb="$1">
                                    <Ionicons name="checkmark-circle" size={isMobile ? 14 : 16} color="#34C759" />
                                    <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                        {feature}
                                    </Text>
                                </XStack>
                            ))}
                        </XStack>
                    </YStack>
                </YStack>
            </Card>

            {/* 🔬 Профессиональные поля поиска */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$3" : "$4"}
                bordered
                borderColor="$gray4"
                shadowColor="$shadowColor"
                shadowRadius={8}
                shadowOpacity={0.1}
            >
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                        Критерии поиска
                    </Text>

                    {professionalSearchOptions.map((option) => (
                        <YStack key={option.id} space="$2">
                            <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                {option.label}
                            </Text>
                            <Input
                                placeholder={option.placeholder}
                                value={proSearchData[option.id as keyof typeof proSearchData] as string}
                                onChangeText={(text) => setProSearchData(prev => ({
                                    ...prev,
                                    [option.id]: text
                                }))}
                                fontSize={isMobile ? "$3" : "$4"}
                                borderColor="$gray6"
                                borderRadius="$3"
                                backgroundColor="#f8f9fa"
                            />
                        </YStack>
                    ))}
                </YStack>
            </Card>

            {/* 🏥 Медицинские фильтры */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$3" : "$4"}
                bordered
                borderColor="$gray4"
                shadowColor="$shadowColor"
                shadowRadius={8}
                shadowOpacity={0.1}
            >
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                        Клинические фильтры
                    </Text>

                    <XStack flexWrap="wrap" space="$2">
                        {medicalFilters.map((filter) => (
                            <Button
                                key={filter.id}
                                size={isMobile ? "$2" : "$3"}
                                backgroundColor={proSearchData.selectedFilters.includes(filter.id) ? '#007AFF' : 'transparent'}
                                borderWidth={1}
                                borderColor={proSearchData.selectedFilters.includes(filter.id) ? '#007AFF' : '$gray6'}
                                borderRadius="$4"
                                onPress={() => toggleFilter(filter.id)}
                                mb="$2"
                                pressStyle={{ scale: 0.96 }}
                            >
                                <XStack alignItems="center" space="$1">
                                    <Ionicons 
                                        name={filter.icon as any} 
                                        size={isMobile ? 12 : 14} 
                                        color={proSearchData.selectedFilters.includes(filter.id) ? '#fff' : '#6B7280'} 
                                    />
                                    <Text 
                                        fontSize={isMobile ? "$2" : "$3"} 
                                        color={proSearchData.selectedFilters.includes(filter.id) ? '#fff' : '#6B7280'}
                                        fontWeight="600"
                                    >
                                        {filter.label}
                                    </Text>
                                </XStack>
                            </Button>
                        ))}
                    </XStack>
                </YStack>
            </Card>

            {/* 🌍 Регионы доступности */}
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$3" : "$4"}
                bordered
                borderColor="$gray4"
            >
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                        Регионы доступности
                    </Text>
                    
                    <XStack space="$2" alignItems="center" flexWrap="wrap">
                        {countries.map((country) => (
                            <Button
                                key={country.code}
                                size={isMobile ? "$2" : "$3"}
                                backgroundColor={selectedCountry === country.code ? '#34C759' : 'transparent'}
                                borderWidth={1}
                                borderColor={selectedCountry === country.code ? '#34C759' : '$gray6'}
                                borderRadius="$4"
                                onPress={() => dispatch(setCountry(country.code))}
                                mb="$1"
                                pressStyle={{ scale: 0.96 }}
                            >
                                <Text 
                                    fontSize={isMobile ? "$2" : "$3"}
                                    color={selectedCountry === country.code ? '#fff' : '#6B7280'}
                                    fontWeight="600"
                                >
                                    {country.name}
                                </Text>
                            </Button>
                        ))}
                    </XStack>
                </YStack>
            </Card>

            {/* 🤖 Pro ИИ консультант */}
            <Card
                backgroundColor="rgba(255, 149, 0, 0.05)"
                borderRadius="$6"
                padding={isMobile ? "$3" : "$4"}
                borderWidth={1}
                borderColor="rgba(255, 149, 0, 0.2)"
            >
                <YStack space="$3">
                    <XStack alignItems="center" space="$3">
                        <YStack
                            width={isMobile ? 40 : 48}
                            height={isMobile ? 40 : 48}
                            backgroundColor="rgba(255, 149, 0, 0.2)"
                            borderRadius="$4"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="medical" size={isMobile ? 20 : 24} color="#FF9500" />
                        </YStack>
                        <YStack flex={1}>
                            <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#FF9500">
                                ИИ Медицинский консультант Pro
                            </Text>
                            <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E">
                                Анализ взаимодействий, побочных эффектов и клинических рекомендаций
                            </Text>
                        </YStack>
                        <Button
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor="#FF9500"
                            borderRadius="$4"
                            onPress={() => setIsChatVisible(true)}
                            pressStyle={{ scale: 0.96 }}
                        >
                            <Ionicons name="chatbubble" size={isMobile ? 16 : 20} color="#fff" />
                        </Button>
                    </XStack>
                </YStack>
            </Card>
        </YStack>
    )

    return (
        <>
            <ScrollView backgroundColor="#fff">
                <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4" backgroundColor="#fff">
                    {/* 📋 Переключатель режимов */}
                    <XStack space="$2" backgroundColor="$gray2" borderRadius="$4" padding="$1">
                        <Button
                            flex={1}
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor={searchMode === 'basic' ? '#007AFF' : 'transparent'}
                            borderRadius="$3"
                            onPress={() => setSearchMode('basic')}
                            pressStyle={{ scale: 0.98 }}
                        >
                            <XStack alignItems="center" space="$2">
                                <Ionicons 
                                    name="search-outline" 
                                    size={isMobile ? 16 : 20} 
                                    color={searchMode === 'basic' ? '#fff' : '#6B7280'} 
                                />
                                <Text 
                                    fontSize={isMobile ? "$3" : "$4"} 
                                    color={searchMode === 'basic' ? '#fff' : '#6B7280'}
                                    fontWeight="600"
                                >
                                    Обычный поиск
                                </Text>
                            </XStack>
                        </Button>
                        <Button
                            flex={1}
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor={searchMode === 'pro' ? '#007AFF' : 'transparent'}
                            borderRadius="$3"
                            onPress={() => setSearchMode('pro')}
                            pressStyle={{ scale: 0.98 }}
                        >
                            <XStack alignItems="center" space="$2">
                                <Ionicons 
                                    name="medical-outline" 
                                    size={isMobile ? 16 : 20} 
                                    color={searchMode === 'pro' ? '#fff' : '#6B7280'} 
                                />
                                <Text 
                                    fontSize={isMobile ? "$3" : "$4"} 
                                    color={searchMode === 'pro' ? '#fff' : '#6B7280'}
                                    fontWeight="600"
                                >
                                    Pro для врачей
                                </Text>
                            </XStack>
                        </Button>
                    </XStack>

                    {/* Контент в зависимости от режима */}
                    {searchMode === 'basic' ? renderBasicSearch() : renderProSearch()}

                    {/* 🤖 AI-подсказка */}
                    {loadingTip ? (
                        <XStack alignItems="center" space="$2">
                            <Spinner size="small" color="$blue10" />
                            <Text color="$gray10" fontSize={isMobile ? "$3" : "$4"}>Анализируем...</Text>
                        </XStack>
                    ) : aiTip ? (
                        <Paragraph
                            fontSize={isMobile ? "$3" : "$4"}
                            bg={searchMode === 'pro' ? "rgba(255, 149, 0, 0.1)" : "#f2f4f7"}
                            px="$3"
                            py="$2"
                            br="$3"
                            color="#333"
                            borderColor={searchMode === 'pro' ? "rgba(255, 149, 0, 0.3)" : "#d0d5dd"}
                            borderWidth={1}
                        >
                            {aiTip}
                        </Paragraph>
                    ) : null}

                    {/* 💊 Карточки */}
                    {filtered.length === 0 ? (
                        <YStack alignItems="center" py="$4">
                            <Text fontSize={isMobile ? "$3" : "$4"} color="$gray10" textAlign="center">
                                Ничего не найдено
                            </Text>
                            {query && (
                                <Text fontSize={isMobile ? "$2" : "$3"} color="$gray8" textAlign="center" mt="$1">
                                    {searchMode === 'pro' 
                                        ? 'Попробуйте изменить критерии поиска или фильтры'
                                        : 'Попробуйте изменить запрос или выбрать другую страну'
                                    }
                                </Text>
                            )}
                        </YStack>
                    ) : (
                        <YStack space={isMobile ? "$2" : "$3"}>
                            <XStack flexWrap="wrap" justifyContent="space-between">
                                {filtered.map((medicine) => (
                                    <YStack key={medicine.id} width="48%" mb={isMobile ? "$2" : "$3"}>
                                        <MedicineCard medicine={medicine} proMode={searchMode === 'pro'} />
                                    </YStack>
                                ))}
                            </XStack>
                        </YStack>
                    )}
                </YStack>
            </ScrollView>
            
            {/* Модальное окно чата */}
            <AIChatModal 
                visible={isChatVisible}
                onClose={() => setIsChatVisible(false)}
                proMode={searchMode === 'pro'}
            />
        </>
    )
}