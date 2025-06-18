import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Card,
    Image,
    Input,
    Separator,
    Text,
    XStack,
    YStack
} from 'tamagui'
import MapWidget from '../../components/MapWidget'
import MedicineCard from '../../components/MedicineCard'
import { setCountry } from '../../redux/medicinesSlice'
import { RootState } from '../../redux/store'

// Константы стран
const countries = [
    { code: 'RU', name: 'Россия' },
    { code: 'US', name: 'США' },
    { code: 'IL', name: 'Израиль' },
]

export default function MedicineDetail() {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const { width } = Dimensions.get('window')
    const isMobile = width < 768
    
    const medicines = useSelector((state: RootState) => state.medicines.items)
    const selectedCountry = useSelector((state: RootState) => state.medicines.country)
    const medicine = medicines.find(m => m.id === id)
    
    const [viewMode, setViewMode] = useState<'user' | 'professional'>('user')
    const [showPharmacies, setShowPharmacies] = useState(false)
    const [showComments, setShowComments] = useState(true)
    const [showMap, setShowMap] = useState(false)
    const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null)
    const [comment, setComment] = useState('')
    const [commentsLiked, setCommentsLiked] = useState<{ [key: number]: boolean }>({})

    // Функция обработки лайков комментариев
    const handleCommentLike = (commentId: number) => {
        setCommentsLiked(prev => ({ ...prev, [commentId]: !prev[commentId] }))
    }

    // Получаем аналоги в других странах
    const getAnalogs = () => {
        if (!medicine) return []
        
        return medicines.filter(m => 
            m.id !== medicine.id && 
            (m.activeIngredient === medicine.activeIngredient || 
             m.inn === medicine.inn ||
             m.name.toLowerCase().includes(medicine.name.toLowerCase().split(' ')[0]))
        ).slice(0, 9) // Увеличили до 9 для сетки 3x3
    }

    // Фильтруем аналоги по выбранной стране
    const getFilteredAnalogs = () => {
        const allAnalogs = getAnalogs()
        return allAnalogs.filter(analog => analog.country === selectedCountry)
    }

    const analogs = getFilteredAnalogs()

    // Моковые данные для аптек
    const nearbyPharmacies = [
        { 
            id: '1', 
            name: 'Аптека №1', 
            address: 'ул. Ленина, 10', 
            price: '199₽', 
            distance: '0.2 км',
            inStock: true,
            deliveryAvailable: true
        },
        { 
            id: '2', 
            name: 'Ригла', 
            address: 'пр. Мира, 25', 
            price: '215₽', 
            distance: '0.5 км',
            inStock: true,
            deliveryAvailable: false
        },
        { 
            id: '3', 
            name: 'Здоров.ру', 
            address: 'ул. Советская, 8', 
            price: '189₽', 
            distance: '0.8 км',
            inStock: false,
            deliveryAvailable: true
        }
    ]

    // Моковые комментарии в стиле блога
    const comments = [
        {
            id: 1,
            avatar: '👩‍💼',
            author: 'Мария К.',
            date: '2 дня назад',
            text: 'Отличное лекарство, помогло быстро справиться с головной болью. Никаких побочных эффектов не заметила. Принимаю уже полгода по назначению врача.',
            likes: 12,
            isVerified: false
        },
        {
            id: 2,
            avatar: '👨‍⚕️',
            author: 'Др. Иванов С.П.',
            date: '1 неделю назад',
            text: 'Хороший препарат первой линии для лечения болевого синдрома. Рекомендую соблюдать дозировку и не превышать курс лечения.',
            likes: 28,
            isVerified: true
        },
        {
            id: 3,
            avatar: '👨',
            author: 'Александр Д.',
            date: '3 дня назад',
            text: 'Помогает, но иногда чувствую легкую тошноту после приема. Возможно, стоит принимать после еды.',
            likes: 7,
            isVerified: false
        }
    ]

    if (!medicine) {
        return (
            <ScrollView style={{ backgroundColor: "#f8f9fa" }}>
                <YStack padding="$4" alignItems="center" justifyContent="center" minHeight={400}>
                    <Text fontSize="$6" color="$gray10">Лекарство не найдено</Text>
                    <Button onPress={() => router.back()} mt="$4" backgroundColor="#007AFF">
                        <Text color="white">Назад</Text>
                    </Button>
                </YStack>
            </ScrollView>
        )
    }

    return (
        <YStack f={1} backgroundColor="#f8f9fa">
            <ScrollView style={{ backgroundColor: "#f8f9fa" }} showsVerticalScrollIndicator={false}>
                <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4" pb="$20">
                    
                    {/* 🏷️ Главная карточка лекарства */}
                    <Card 
                        backgroundColor="#fff" 
                        borderRadius="$6" 
                        padding={isMobile ? "$4" : "$5"} 
                        bordered={false} 
                        shadowColor="$shadowColor"
                        shadowRadius={12}
                        shadowOpacity={0.15}
                    >
                        <YStack space="$4">
                            {/* Изображение и основная информация */}
                            <XStack space="$4" alignItems="flex-start">
                                <YStack
                                    width={isMobile ? 100 : 120}
                                    height={isMobile ? 100 : 120}
                                    backgroundColor="#f8f9fa"
                                    borderRadius="$4"
                                    justifyContent="center"
                                    alignItems="center"
                                    overflow="hidden"
                                    borderWidth={1}
                                    borderColor="$gray4"
                                >
                                    <Image
                                        source={{ uri: medicine.image || '/placeholder-medicine.jpg' }}
                                        width="80%"
                                        height="80%"
                                        resizeMode="contain"
                                    />
                                </YStack>
                                
                                <YStack flex={1} space="$2">
                                    <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#1C1C1E">
                                        {medicine.name}
                                    </Text>
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280">
                                        {medicine.manufacturer || 'Производитель не указан'}
                                    </Text>
                                    
                                    {/* Рейтинг и статус */}
                                    <XStack space="$3" alignItems="center" mt="$2">
                                        <XStack space="$1" alignItems="center">
                                            <Text fontSize="$2">⭐</Text>
                                            <Text fontSize="$3" fontWeight="700" color="#1a1a1a">
                                                {medicine.rating}
                                            </Text>
                                            <Text fontSize="$2" color="#999">(12 отзывов)</Text>
                                        </XStack>
                                        <XStack 
                                            backgroundColor={medicine.inStock ? "#dcfce7" : "#fef2f2"} 
                                            borderRadius="$2" 
                                            paddingHorizontal="$2" 
                                            paddingVertical="$1"
                                        >
                                            <Text fontSize="$1" color={medicine.inStock ? "#16a34a" : "#dc2626"} fontWeight="600">
                                                {medicine.inStock ? 'В наличии' : 'Нет в наличии'}
                                            </Text>
                                        </XStack>
                                    </XStack>
                                    
                                    {/* Цена */}
                                    <XStack alignItems="center" justifyContent="space-between" mt="$2">
                                        <Text fontSize={isMobile ? "$6" : "$7"} fontWeight="900" color="#007AFF">
                                            {medicine.price}
                                        </Text>
                                        <Button
                                            size="$3"
                                            backgroundColor="#007AFF"
                                            borderRadius="$3"
                                            onPress={() => setShowPharmacies(true)}
                                        >
                                            <Text color="white" fontWeight="600">Купить</Text>
                                        </Button>
                                    </XStack>
                                </YStack>
                            </XStack>
                            
                            {/* Теги */}
                            <XStack space="$2" flexWrap="wrap">
                                <XStack 
                                    backgroundColor="rgba(0, 122, 255, 0.1)" 
                                    borderRadius="$3" 
                                    paddingHorizontal="$3" 
                                    paddingVertical="$2"
                                >
                                    <Text fontSize="$2" color="#007AFF" fontWeight="600">
                                        {medicine.form}
                                    </Text>
                                </XStack>
                                <XStack 
                                    backgroundColor="rgba(52, 199, 89, 0.1)" 
                                    borderRadius="$3" 
                                    paddingHorizontal="$3" 
                                    paddingVertical="$2"
                                >
                                    <Text fontSize="$2" color="#34C759" fontWeight="600">
                                        {medicine.dosage}
                                    </Text>
                                </XStack>
                                {medicine.prescription && (
                                    <XStack 
                                        backgroundColor="rgba(255, 149, 0, 0.1)" 
                                        borderRadius="$3" 
                                        paddingHorizontal="$3" 
                                        paddingVertical="$2"
                                    >
                                        <Text fontSize="$2" color="#FF9500" fontWeight="600">
                                            Рецептурный
                                        </Text>
                                    </XStack>
                                )}
                            </XStack>
                        </YStack>
                    </Card>

                    {/* 📋 Переключатель режимов */}
                    <XStack space="$2" backgroundColor="$gray2" borderRadius="$4" padding="$1">
                        <Button
                            flex={1}
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor={viewMode === 'user' ? '#007AFF' : 'transparent'}
                            borderRadius="$3"
                            onPress={() => setViewMode('user')}
                            pressStyle={{ scale: 0.98 }}
                        >
                            <XStack alignItems="center" space="$2">
                                <Ionicons name="person" size={16} color={viewMode === 'user' ? '#fff' : '#6B7280'} />
                                <Text color={viewMode === 'user' ? '#fff' : '#6B7280'} fontWeight="600">
                                    Для пациентов
                                </Text>
                            </XStack>
                        </Button>
                        <Button
                            flex={1}
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor={viewMode === 'professional' ? '#007AFF' : 'transparent'}
                            borderRadius="$3"
                            onPress={() => setViewMode('professional')}
                            pressStyle={{ scale: 0.98 }}
                        >
                            <XStack alignItems="center" space="$2">
                                <Ionicons name="medical" size={16} color={viewMode === 'professional' ? '#fff' : '#6B7280'} />
                                <Text color={viewMode === 'professional' ? '#fff' : '#6B7280'} fontWeight="600">
                                    Для врачей
                                </Text>
                            </XStack>
                        </Button>
                    </XStack>

                    {/* 💊 Контент в зависимости от режима */}
                    {viewMode === 'user' ? (
                        <YStack space="$4">
                            {/* Описание для пациентов */}
                            <Card 
                                backgroundColor="#fff" 
                                borderRadius="$6" 
                                padding={isMobile ? "$4" : "$5"} 
                                bordered={false}
                                shadowColor="$shadowColor"
                                shadowRadius={8}
                                shadowOpacity={0.1}
                            >
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$3">
                                        <YStack
                                            width={40}
                                            height={40}
                                            backgroundColor="rgba(0, 122, 255, 0.1)"
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons name="information-circle" size={20} color="#007AFF" />
                                        </YStack>
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                            Описание
                                        </Text>
                                    </XStack>
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" lineHeight="$1">
                                        {medicine.description || 'Эффективное обезболивающее и жаропонижающее средство для лечения головной боли, зубной боли, мышечных болей и снижения температуры при простуде и гриппе.'}
                                    </Text>
                                </YStack>
                            </Card>

                            {/* Как принимать */}
                            <Card 
                                backgroundColor="#fff" 
                                borderRadius="$6" 
                                padding={isMobile ? "$4" : "$5"} 
                                bordered={false}
                                shadowColor="$shadowColor"
                                shadowRadius={8}
                                shadowOpacity={0.1}
                            >
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$3">
                                        <YStack
                                            width={40}
                                            height={40}
                                            backgroundColor="rgba(52, 199, 89, 0.1)"
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons name="medical" size={20} color="#34C759" />
                                        </YStack>
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                            Как принимать
                                        </Text>
                                    </XStack>
                                    <YStack space="$2">
                                        <XStack space="$3" alignItems="flex-start">
                                            <Text fontSize="$4" color="#007AFF">•</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" flex={1}>
                                                Взрослые и дети старше 12 лет: по 1-2 таблетки 3-4 раза в день
                                            </Text>
                                        </XStack>
                                        <XStack space="$3" alignItems="flex-start">
                                            <Text fontSize="$4" color="#007AFF">•</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" flex={1}>
                                                Принимать во время или после еды, запивая водой
                                            </Text>
                                        </XStack>
                                        <XStack space="$3" alignItems="flex-start">
                                            <Text fontSize="$4" color="#007AFF">•</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" flex={1}>
                                                Максимальная суточная доза: 4000 мг (8 таблеток)
                                            </Text>
                                        </XStack>
                                    </YStack>
                                </YStack>
                            </Card>

                            {/* Противопоказания */}
                            <Card 
                                backgroundColor="#fff" 
                                borderRadius="$6" 
                                padding={isMobile ? "$4" : "$5"} 
                                bordered={false}
                                shadowColor="$shadowColor"
                                shadowRadius={8}
                                shadowOpacity={0.1}
                            >
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$3">
                                        <YStack
                                            width={40}
                                            height={40}
                                            backgroundColor="rgba(255, 59, 48, 0.1)"
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons name="warning" size={20} color="#FF3B30" />
                                        </YStack>
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#FF3B30">
                                            Противопоказания
                                        </Text>
                                    </XStack>
                                    <YStack space="$2">
                                        <XStack space="$3" alignItems="flex-start">
                                            <Text fontSize="$4" color="#FF3B30">•</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" flex={1}>
                                                Аллергия на парацетамол или другие компоненты
                                            </Text>
                                        </XStack>
                                        <XStack space="$3" alignItems="flex-start">
                                            <Text fontSize="$4" color="#FF3B30">•</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" flex={1}>
                                                Тяжелые заболевания печени или почек
                                            </Text>
                                        </XStack>
                                        <XStack space="$3" alignItems="flex-start">
                                            <Text fontSize="$4" color="#FF3B30">•</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" flex={1}>
                                                Алкогольная зависимость
                                            </Text>
                                        </XStack>
                                    </YStack>
                                </YStack>
                            </Card>
                        </YStack>
                    ) : (
                        <YStack space="$4">
                            {/* Информация для врачей */}
                            <Card 
                                backgroundColor="#fff" 
                                borderRadius="$6" 
                                padding={isMobile ? "$4" : "$5"} 
                                bordered={false}
                                shadowColor="$shadowColor"
                                shadowRadius={8}
                                shadowOpacity={0.1}
                            >
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$3">
                                        <YStack
                                            width={40}
                                            height={40}
                                            backgroundColor="rgba(255, 149, 0, 0.1)"
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons name="flask" size={20} color="#FF9500" />
                                        </YStack>
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                            Фармакологическое действие
                                        </Text>
                                    </XStack>
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#374151" lineHeight="$1">
                                        Ненаркотический анальгетик, оказывает анальгезирующее, жаропонижающее и слабое противовоспалительное действие. Механизм действия связан с ингибированием ЦОГ-1 и ЦОГ-2 преимущественно в ЦНС.
                                    </Text>
                                </YStack>
                            </Card>

                            {/* Фармакокинетика */}
                            <Card 
                                backgroundColor="#fff" 
                                borderRadius="$6" 
                                padding={isMobile ? "$4" : "$5"} 
                                bordered={false}
                                shadowColor="$shadowColor"
                                shadowRadius={8}
                                shadowOpacity={0.1}
                            >
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$3">
                                        <YStack
                                            width={40}
                                            height={40}
                                            backgroundColor="rgba(88, 86, 214, 0.1)"
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons name="analytics" size={20} color="#5856D6" />
                                        </YStack>
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                            Фармакокинетика
                                        </Text>
                                    </XStack>
                                    <YStack space="$2">
                                        <Text fontSize={isMobile ? "$3" : "$4"} color="#374151">
                                            <Text fontWeight="600">Всасывание:</Text> Быстрое и полное из ЖКТ. Cmax достигается через 30-60 мин.
                                        </Text>
                                        <Text fontSize={isMobile ? "$3" : "$4"} color="#374151">
                                            <Text fontWeight="600">Метаболизм:</Text> В печени (90-95%) с образованием неактивных метаболитов.
                                        </Text>
                                        <Text fontSize={isMobile ? "$3" : "$4"} color="#374151">
                                            <Text fontWeight="600">T1/2:</Text> 1-4 ч, при нарушении функции печени может увеличиваться до 10 ч.
                                        </Text>
                                    </YStack>
                                </YStack>
                            </Card>

                            {/* Дозировка для врачей */}
                            <Card 
                                backgroundColor="#fff" 
                                borderRadius="$6" 
                                padding={isMobile ? "$4" : "$5"} 
                                bordered={false}
                                shadowColor="$shadowColor"
                                shadowRadius={8}
                                shadowOpacity={0.1}
                            >
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$3">
                                        <YStack
                                            width={40}
                                            height={40}
                                            backgroundColor="rgba(255, 45, 85, 0.1)"
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons name="calculator" size={20} color="#FF2D55" />
                                        </YStack>
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                            Дозировка
                                        </Text>
                                    </XStack>
                                    <YStack space="$2">
                                        <Text fontSize={isMobile ? "$3" : "$4"} color="#374151">
                                            <Text fontWeight="600">Взрослые:</Text> 500-1000 мг каждые 4-6 ч. Максимально 4000 мг/сут.
                                        </Text>
                                        <Text fontSize={isMobile ? "$3" : "$4"} color="#374151">
                                            <Text fontWeight="600">Дети 6-12 лет:</Text> 250-500 мг каждые 4-6 ч.
                                        </Text>
                                        <Text fontSize={isMobile ? "$3" : "$4"} color="#374151">
                                            <Text fontWeight="600">При нарушении функции печени:</Text> Снижение дозы до 3000 мг/сут.
                                        </Text>
                                    </YStack>
                                </YStack>
                            </Card>
                        </YStack>
                    )}

                    {/* 🗺️ Карта аптек */}
                    <Card 
                        backgroundColor="#fff" 
                        borderRadius="$6" 
                        padding={isMobile ? "$2" : "$4"} 
                        bordered={false}
                        shadowColor="$shadowColor"
                        shadowRadius={8}
                        shadowOpacity={0.1}
                    >
                        <YStack space="$3">
                            <XStack alignItems="center" justifyContent="space-between">
                                <XStack alignItems="center" space="$3">
                                    <YStack
                                        width={40}
                                        height={40}
                                        backgroundColor="rgba(0, 122, 255, 0.1)"
                                        borderRadius="$4"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Ionicons name="location" size={20} color="#007AFF" />
                                    </YStack>
                                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                        Наличие в аптеках
                                    </Text>
                                </XStack>
                                <Button
                                    size="$3"
                                    backgroundColor="transparent"
                                    borderWidth={1}
                                    borderColor="$gray4"
                                    borderRadius="$3"
                                    onPress={() => setShowMap(!showMap)}
                                    pressStyle={{ scale: 0.96 }}
                                >
                                    <Ionicons 
                                        name={showMap ? "chevron-up" : "chevron-down"} 
                                        size={18} 
                                        color="#6B7280" 
                                    />
                                </Button>
                            </XStack>
                            {showMap && (
                                <MapWidget city="moscow" rect />
                            )}
                        </YStack>
                    </Card>

                    {/* 🏥 Виджет аптек */}
                    {showPharmacies && (
                        <Card 
                            backgroundColor="#fff" 
                            borderRadius="$6" 
                            padding={isMobile ? "$4" : "$5"} 
                            bordered={false}
                            shadowColor="$shadowColor"
                            shadowRadius={8}
                            shadowOpacity={0.1}
                        >
                            <YStack space="$4">
                                <XStack alignItems="center" justifyContent="space-between">
                                    <XStack alignItems="center" space="$3">
                                        <YStack
                                            width={40}
                                            height={40}
                                            backgroundColor="rgba(52, 199, 89, 0.1)"
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons name="storefront" size={20} color="#34C759" />
                                        </YStack>
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                            Ближайшие аптеки
                                        </Text>
                                    </XStack>
                                    <Button
                                        size="$2"
                                        backgroundColor="transparent"
                                        onPress={() => setShowPharmacies(false)}
                                    >
                                        <Ionicons name="close" size={20} color="#6B7280" />
                                    </Button>
                                </XStack>

                                <YStack space="$3">
                                    {nearbyPharmacies.map((pharmacy) => (
                                        <XStack 
                                            key={pharmacy.id}
                                            backgroundColor="#f8f9fa" 
                                            borderRadius="$4" 
                                            padding="$3"
                                            justifyContent="space-between" 
                                            alignItems="center"
                                        >
                                            <YStack flex={1} space="$1">
                                                <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                                    {pharmacy.name}
                                                </Text>
                                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                                    {pharmacy.address} • {pharmacy.distance}
                                                </Text>
                                                <XStack space="$2" alignItems="center">
                                                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="700" color="#007AFF">
                                                        {pharmacy.price}
                                                    </Text>
                                                    {pharmacy.inStock ? (
                                                        <Text fontSize="$2" color="#34C759" fontWeight="600">В наличии</Text>
                                                    ) : (
                                                        <Text fontSize="$2" color="#FF9500" fontWeight="600">Под заказ</Text>
                                                    )}
                                                </XStack>
                                            </YStack>
                                            <Button
                                                size="$3"
                                                backgroundColor={pharmacy.inStock ? "#007AFF" : "#6B7280"}
                                                borderRadius="$3"
                                                onPress={() => {
                                                    // Логика покупки/заказа
                                                }}
                                            >
                                                <Text color="#fff" fontSize="$3" fontWeight="600">
                                                    {pharmacy.inStock ? 'Купить' : 'Заказать'}
                                                </Text>
                                            </Button>
                                        </XStack>
                                    ))}
                                </YStack>
                            </YStack>
                        </Card>
                    )}

                    {/* 🌍 Аналоги в других странах */}
                    <Separator />
                    <Card
                        backgroundColor="#fff"
                        borderRadius="$6"
                        padding={isMobile ? "$3" : "$4"}
                        bordered={false}
                        shadowColor="$shadowColor"
                        shadowRadius={8}
                        shadowOpacity={0.1}
                    >
                        <YStack space="$4">
                            <XStack alignItems="center" justifyContent="space-between">
                                <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="700" color="#1C1C1E">
                                    🌍 Аналоги в других странах
                                </Text>
                                <Button
                                    size="$2"
                                    backgroundColor="transparent"
                                    onPress={() => router.push('/search')}
                                    pressStyle={{ scale: 0.96 }}
                                >
                                    <XStack alignItems="center" space="$1">
                                        <Text fontSize="$3" color="#007AFF" fontWeight="600">Все аналоги</Text>
                                        <Ionicons name="arrow-forward" size={16} color="#007AFF" />
                                    </XStack>
                                </Button>
                            </XStack>
                            
                            <Text fontSize={isMobile ? "$3" : "$4"} color="$gray10">
                                Найдено {analogs.length} {analogs.length === 1 ? 'аналог' : analogs.length < 5 ? 'аналога' : 'аналогов'} 
                            </Text>
                            
                            {/* Переключатель стран */}
                            <XStack space="$2" justifyContent="space-between">
                                {countries.map((country) => {
                                    const countryCount = getAnalogs().filter(m => m.country === country.code).length;
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

                            {analogs.length === 0 ? (
                                <YStack alignItems="center" py="$4">
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="$gray10" textAlign="center">
                                        Аналоги в стране {countries.find(c => c.code === selectedCountry)?.name} не найдены
                                    </Text>
                                    <Text fontSize={isMobile ? "$2" : "$3"} color="$gray8" textAlign="center" mt="$1">
                                        Попробуйте выбрать другую страну
                                    </Text>
                                </YStack>
                            ) : (
                                <YStack space="$3">
                                    {isMobile ? (
                                        // На мобильных - вертикальный список
                                        <YStack space="$3">
                                            {analogs.slice(0, 6).map((analog) => (
                                                <MedicineCard key={analog.id} medicine={analog} />
                                            ))}
                                        </YStack>
                                    ) : (
                                        // На больших экранах - сетка 3x3
                                        <YStack space="$3">
                                            {[0, 3, 6].map((startIndex) => (
                                                analogs.slice(startIndex, startIndex + 3).length > 0 && (
                                                    <XStack key={startIndex} space="$3" justifyContent="space-between">
                                                        {analogs.slice(startIndex, startIndex + 3).map((analog, index) => (
                                                            <YStack key={analog.id} width="32%">
                                                                <MedicineCard medicine={analog} />
                                                            </YStack>
                                                        ))}
                                                        {/* Заполнители для неполных рядов */}
                                                        {Array.from({ length: 3 - analogs.slice(startIndex, startIndex + 3).length }).map((_, emptyIndex) => (
                                                            <YStack key={`empty-${startIndex}-${emptyIndex}`} width="32%" />
                                                        ))}
                                                    </XStack>
                                                )
                                            ))}
                                        </YStack>
                                    )}
                                </YStack>
                            )}
                        </YStack>
                    </Card>

                    <Separator />

                    {/* Комментарии */}
                    <YStack space="$4">
                        <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                            💬 Обсуждение ({comments.length})
                        </Text>

                        {comments.length === 0 && (
                            <Card backgroundColor="#fff" padding="$4" borderRadius="$6">
                                <Text color="$gray8" textAlign="center">Комментариев пока нет. Будьте первым!</Text>
                            </Card>
                        )}

                        {comments.map((c: any, i: number) => (
                            <Card key={i} backgroundColor="#fff" padding="$4" borderRadius="$6" bordered>
                                <YStack space="$3">
                                    <XStack alignItems="center" justifyContent="space-between">
                                        <XStack alignItems="center" space="$2">
                                            <Text fontSize="$5">{c.avatar}</Text>
                                            <YStack>
                                                <XStack alignItems="center" space="$2">
                                                    <Text fontWeight="700" fontSize="$4" color="#1C1C1E">
                                                        {c.author}
                                                    </Text>
                                                    {c.isVerified && (
                                                        <Ionicons name="checkmark-circle" size={16} color="#007AFF" />
                                                    )}
                                                </XStack>
                                                <Text color="#6B7280" fontSize="$2">
                                                    {c.date}
                                                </Text>
                                            </YStack>
                                        </XStack>
                                        <Text color="#6B7280" fontSize="$2">
                                            #{i + 1}
                                        </Text>
                                    </XStack>
                                    
                                    <Text color="#374151" fontSize="$4" lineHeight="$5">
                                        {c.text}
                                    </Text>

                                    <XStack alignItems="center" space="$3">
                                        <Button
                                            size="$2"
                                            backgroundColor="transparent"
                                            onPress={() => handleCommentLike(c.id)}
                                            pressStyle={{ scale: 0.9 }}
                                        >
                                            <XStack alignItems="center" space="$1">
                                                <Ionicons 
                                                    name={commentsLiked[c.id] ? "heart" : "heart-outline"} 
                                                    size={16} 
                                                    color={commentsLiked[c.id] ? "#FF3B30" : "#6B7280"} 
                                                />
                                                <Text fontSize="$3" color="#6B7280">
                                                    {(c.likes || 0) + (commentsLiked[c.id] ? 1 : 0)}
                                                </Text>
                                            </XStack>
                                        </Button>
                                        <Button
                                            size="$2"
                                            backgroundColor="transparent"
                                            pressStyle={{ scale: 0.9 }}
                                        >
                                            <XStack alignItems="center" space="$1">
                                                <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                                                <Text fontSize="$3" color="#6B7280">Ответить</Text>
                                            </XStack>
                                        </Button>
                                    </XStack>
                                </YStack>
                            </Card>
                        ))}

                        {/* Форма добавления комментария */}
                        <Card backgroundColor="#fff" padding="$4" borderRadius="$6" bordered>
                            <YStack space="$3">
                                <Text fontSize="$4" fontWeight="700" color="#1C1C1E">
                                    Добавить комментарий
                                </Text>
                                <Input
                                    placeholder="Поделитесь своим мнением..."
                                    value={comment}
                                    onChangeText={setComment}
                                    borderColor="#E5E7EB"
                                    borderRadius="$4"
                                    multiline
                                    minHeight={80}
                                />
                                <XStack justifyContent="flex-end">
                                    <Button
                                        onPress={() => {
                                            if (comment.trim()) {
                                                alert('Комментарий добавлен! (демо)')
                                                setComment('')
                                            }
                                        }}
                                        theme="blue"
                                        size="$3"
                                        borderRadius="$6"
                                        disabled={!comment.trim()}
                                    >
                                        <XStack alignItems="center" space="$2">
                                            <Ionicons name="send" size={16} color="#fff" />
                                            <Text color="white" fontWeight="600">Отправить</Text>
                                        </XStack>
                                    </Button>
                                </XStack>
                            </YStack>
                        </Card>
                    </YStack>

                </YStack>
            </ScrollView>
            
            {/* 🔥 Нижняя панель действий - как стандартное табовое меню */}
            <YStack 
                position="absolute" 
                bottom={0} 
                left={0} 
                right={0} 
                backgroundColor="#FFFFFF" 
                borderTopWidth={1} 
                borderTopColor="#E5E5EA"
                paddingTop={8}
                paddingBottom={34}
                paddingHorizontal="$4"
            >
                <XStack justifyContent="space-around" alignItems="center">
                    <Button
                        flex={1}
                        backgroundColor="transparent"
                        borderWidth={0}
                        onPress={() => router.push('/')}
                        paddingVertical="$2"
                        pressStyle={{ scale: 0.95 }}
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="home-outline" size={22} color="#8E8E93" />
                            <Text fontSize="$1" color="#8E8E93" fontWeight="600">
                                Главная
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        flex={1}
                        backgroundColor="transparent"
                        borderWidth={0}
                        onPress={() => router.push('/search')}
                        paddingVertical="$2"
                        pressStyle={{ scale: 0.95 }}
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="search-outline" size={22} color="#8E8E93" />
                            <Text fontSize="$1" color="#8E8E93" fontWeight="600">
                                Поиск
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        flex={1}
                        backgroundColor="transparent"
                        borderWidth={0}
                        onPress={() => setShowPharmacies(!showPharmacies)}
                        paddingVertical="$2"
                        pressStyle={{ scale: 0.95 }}
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons 
                                name={showPharmacies ? "storefront" : "storefront-outline"} 
                                size={showPharmacies ? 24 : 22} 
                                color={showPharmacies ? "#007AFF" : "#8E8E93"} 
                            />
                            <Text 
                                fontSize="$1" 
                                color={showPharmacies ? "#007AFF" : "#8E8E93"} 
                                fontWeight="600"
                            >
                                Где купить
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        flex={1}
                        backgroundColor="transparent"
                        borderWidth={0}
                        onPress={() => router.push('/news')}
                        paddingVertical="$2"
                        pressStyle={{ scale: 0.95 }}
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="newspaper-outline" size={22} color="#8E8E93" />
                            <Text fontSize="$1" color="#8E8E93" fontWeight="600">
                                Новости
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        flex={1}
                        backgroundColor="transparent"
                        borderWidth={0}
                        onPress={() => router.push('/profile')}
                        paddingVertical="$2"
                        pressStyle={{ scale: 0.95 }}
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="person-outline" size={22} color="#8E8E93" />
                            <Text fontSize="$1" color="#8E8E93" fontWeight="600">
                                Профиль
                            </Text>
                        </YStack>
                    </Button>
                </XStack>
            </YStack>
        </YStack>
    )
}