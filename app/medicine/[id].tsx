import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import {
    Button,
    Card,
    Image,
    ScrollView,
    Text,
    TextArea,
    XStack,
    YStack
} from 'tamagui'
import { RootState } from '../../redux/store'

// Моковые данные для комментариев
const mockComments = [
    {
        id: '1',
        userName: 'Анна М.',
        userType: 'Пациент',
        avatar: '👩‍💼',
        rating: 5,
        date: '2 дня назад',
        comment: 'Отлично помогает при головной боли! Никаких побочных эффектов не заметила. Принимаю уже полгода по назначению врача.',
        helpful: 12,
        verified: true
    },
    {
        id: '2',
        userName: 'Др. Иванов С.П.',
        userType: 'Врач-терапевт',
        avatar: '👨‍⚕️',
        rating: 4,
        date: '1 неделю назад',
        comment: 'Хороший препарат первой линии для лечения болевого синдрома. Рекомендую соблюдать дозировку и не превышать курс лечения.',
        helpful: 28,
        verified: true,
        isProfessional: true
    },
    {
        id: '3',
        userName: 'Михаил К.',
        userType: 'Пациент',
        avatar: '👨',
        rating: 3,
        date: '3 дня назад',
        comment: 'Помогает, но иногда чувствую легкую тошноту после приема. Возможно, стоит принимать после еды.',
        helpful: 7,
        verified: false
    }
]

const specialists = [
    {
        id: '1',
        name: 'Др. Смирнова А.В.',
        specialty: 'Терапевт',
        experience: '12 лет',
        rating: '4.9',
        avatar: '👩‍⚕️',
        online: true,
        consultationPrice: '1200₽'
    },
    {
        id: '2',
        name: 'Др. Петров М.И.',
        specialty: 'Кардиолог',
        experience: '8 лет',
        rating: '4.8',
        avatar: '👨‍⚕️',
        online: false,
        consultationPrice: '1500₽'
    }
]

export default function MedicineDetail() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const [viewMode, setViewMode] = useState<'user' | 'professional'>('user')
    const [newComment, setNewComment] = useState('')
    const [newRating, setNewRating] = useState(5)
    const [showConsultation, setShowConsultation] = useState(false)

    const medicine = useSelector((state: RootState) =>
        state.medicines.items.find((m) => m.id === id)
    )

    if (!medicine) {
        return (
            <YStack f={1} jc="center" ai="center" p="$4">
                <Text fontSize="$6" color="$red10">Лекарство не найдено</Text>
            </YStack>
        )
    }

    const renderIndicatorBadge = (label: string, value: string | boolean | undefined, color: string, icon?: string) => {
        if (!value) return null
        return (
            <XStack
                backgroundColor={color}
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius="$6"
                alignItems="center"
                space="$1"
                shadowColor={color}
                shadowRadius={3}
                shadowOpacity={0.3}
            >
                {icon && <Ionicons name={icon as any} size={isMobile ? 12 : 14} color="#fff" />}
                <Text fontSize={isMobile ? "$2" : "$3"} color="#fff" fontWeight="600">
                    {typeof value === 'boolean' ? label : value}
                </Text>
            </XStack>
        )
    }

    const renderInfoSection = (title: string, items: string[] | undefined, color: string = "#1C1C1E", icon?: string) => {
        if (!items || items.length === 0) return null
        return (
            <YStack space="$2">
                <XStack alignItems="center" space="$2">
                    {icon && <Ionicons name={icon as any} size={isMobile ? 18 : 20} color={color} />}
                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color={color}>
                        {title}
                    </Text>
                </XStack>
                <YStack space="$1">
                    {items.map((item, index) => (
                        <XStack key={index} alignItems="flex-start" space="$2">
                            <YStack
                                width={6}
                                height={6}
                                backgroundColor={color}
                                borderRadius="$6"
                                mt="$1"
                            />
                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" flex={1} lineHeight="$1">
                                {item}
                            </Text>
                        </XStack>
                    ))}
                </YStack>
            </YStack>
        )
    }

    const renderComment = (comment: typeof mockComments[0]) => (
        <Card
            key={comment.id}
            backgroundColor="#fff"
            borderRadius="$4"
            padding={isMobile ? "$3" : "$4"}
            bordered
            borderColor={comment.isProfessional ? "rgba(255, 149, 0, 0.3)" : "$gray4"}
            shadowColor="$shadowColor"
            shadowRadius={3}
            shadowOpacity={0.1}
        >
            <YStack space="$2">
                <XStack justifyContent="space-between" alignItems="flex-start">
                    <XStack space="$2" alignItems="center" flex={1}>
                        <Text fontSize={isMobile ? "$4" : "$5"}>{comment.avatar}</Text>
                        <YStack flex={1}>
                            <XStack alignItems="center" space="$1">
                                <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                    {comment.userName}
                                </Text>
                                {comment.verified && (
                                    <Ionicons name="checkmark-circle" size={14} color="#007AFF" />
                                )}
                                {comment.isProfessional && (
                                    <XStack
                                        backgroundColor="rgba(255, 149, 0, 0.1)"
                                        paddingHorizontal="$1"
                                        paddingVertical="$0.5"
                                        borderRadius="$2"
                                    >
                                        <Text fontSize="$1" color="#FF9500" fontWeight="600">ВРАЧ</Text>
                                    </XStack>
                                )}
                            </XStack>
                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                {comment.userType} • {comment.date}
                            </Text>
                        </YStack>
                    </XStack>
                    
                    <XStack alignItems="center" space="$1">
                        {[...Array(5)].map((_, i) => (
                            <Ionicons
                                key={i}
                                name="star"
                                size={isMobile ? 12 : 14}
                                color={i < comment.rating ? "#f5c518" : "#E5E5EA"}
                            />
                        ))}
                    </XStack>
                </XStack>

                <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E" lineHeight="$1">
                    {comment.comment}
                </Text>

                <XStack justifyContent="space-between" alignItems="center">
                    <XStack alignItems="center" space="$2">
                        <Button
                            size="$2"
                            backgroundColor="transparent"
                            pressStyle={{ scale: 0.96 }}
                        >
                            <XStack alignItems="center" space="$1">
                                <Ionicons name="thumbs-up-outline" size={14} color="#6B7280" />
                                <Text fontSize="$2" color="#6B7280">Полезно ({comment.helpful})</Text>
                            </XStack>
                        </Button>
                        <Button
                            size="$2"
                            backgroundColor="transparent"
                            pressStyle={{ scale: 0.96 }}
                        >
                            <XStack alignItems="center" space="$1">
                                <Ionicons name="chatbubble-outline" size={14} color="#6B7280" />
                                <Text fontSize="$2" color="#6B7280">Ответить</Text>
                            </XStack>
                        </Button>
                    </XStack>
                </XStack>
            </YStack>
        </Card>
    )

    const renderSpecialist = (specialist: typeof specialists[0]) => (
        <Card
            key={specialist.id}
            backgroundColor="#fff"
            borderRadius="$4"
            padding={isMobile ? "$3" : "$4"}
            bordered
            borderColor="$gray4"
            pressStyle={{ scale: 0.98 }}
        >
            <XStack space="$3" alignItems="center">
                <YStack
                    width={isMobile ? 50 : 60}
                    height={isMobile ? 50 : 60}
                    backgroundColor="rgba(0, 122, 255, 0.1)"
                    borderRadius="$6"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                >
                    <Text fontSize={isMobile ? "$6" : "$7"}>{specialist.avatar}</Text>
                    {specialist.online && (
                        <YStack
                            position="absolute"
                            bottom={-2}
                            right={-2}
                            width={14}
                            height={14}
                            backgroundColor="#34C759"
                            borderRadius="$6"
                            borderWidth={2}
                            borderColor="#fff"
                        />
                    )}
                </YStack>

                <YStack flex={1} space="$1">
                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="700" color="#1C1C1E">
                        {specialist.name}
                    </Text>
                    <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                        {specialist.specialty} • {specialist.experience} опыта
                    </Text>
                    <XStack alignItems="center" space="$2">
                        <XStack alignItems="center" space="$1">
                            <Ionicons name="star" size={12} color="#f5c518" />
                            <Text fontSize="$2" color="#6B7280">{specialist.rating}</Text>
                        </XStack>
                        <Text fontSize="$2" color={specialist.online ? "#34C759" : "#6B7280"}>
                            {specialist.online ? "Онлайн" : "Не в сети"}
                        </Text>
                    </XStack>
                </YStack>

                <YStack alignItems="flex-end" space="$1">
                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="700" color="#007AFF">
                        {specialist.consultationPrice}
                    </Text>
                    <Button
                        size="$2"
                        backgroundColor={specialist.online ? "#007AFF" : "#6B7280"}
                        borderRadius="$3"
                        disabled={!specialist.online}
                        onPress={() => alert(`Консультация с ${specialist.name}`)}
                        pressStyle={{ scale: 0.96 }}
                    >
                        <Text fontSize="$2" color="#fff" fontWeight="600">
                            {specialist.online ? "Связаться" : "Недоступен"}
                        </Text>
                    </Button>
                </YStack>
            </XStack>
        </Card>
    )

    return (
        <>
            <ScrollView backgroundColor="#f8f9fa">
                <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4" pb="$20">
                    
                    {/* 🧭 Упрощенная навигационная шапка */}
                    <XStack alignItems="center" justifyContent="space-between">
                        <Button
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor="#fff"
                            borderRadius="$6"
                            onPress={() => router.back()}
                            pressStyle={{ scale: 0.96 }}
                            shadowColor="$shadowColor"
                            shadowRadius={4}
                            shadowOpacity={0.1}
                        >
                            <XStack alignItems="center" space="$2">
                                <Ionicons name="chevron-back" size={isMobile ? 18 : 20} color="#007AFF" />
                                <Text fontSize={isMobile ? "$3" : "$4"} color="#007AFF" fontWeight="600">
                                    Назад
                                </Text>
                            </XStack>
                        </Button>

                        <XStack alignItems="center" space="$2">
                            <Button
                                size={isMobile ? "$3" : "$4"}
                                backgroundColor="#fff"
                                borderRadius="$6"
                                onPress={() => alert('Добавлено в избранное')}
                                pressStyle={{ scale: 0.96 }}
                                shadowColor="$shadowColor"
                                shadowRadius={4}
                                shadowOpacity={0.1}
                            >
                                <Ionicons name="heart-outline" size={isMobile ? 18 : 20} color="#FF3B30" />
                            </Button>

                            <Button
                                size={isMobile ? "$3" : "$4"}
                                backgroundColor="#fff"
                                borderRadius="$6"
                                onPress={() => alert('Поделиться')}
                                pressStyle={{ scale: 0.96 }}
                                shadowColor="$shadowColor"
                                shadowRadius={4}
                                shadowOpacity={0.1}
                            >
                                <Ionicons name="share-outline" size={isMobile ? 18 : 20} color="#6B7280" />
                            </Button>
                        </XStack>
                    </XStack>

                    {/* 📋 Переключатель режимов (как в поиске) */}
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
                                <Ionicons 
                                    name="person-outline" 
                                    size={isMobile ? 16 : 20} 
                                    color={viewMode === 'user' ? '#fff' : '#6B7280'} 
                                />
                                <Text 
                                    fontSize={isMobile ? "$3" : "$4"} 
                                    color={viewMode === 'user' ? '#fff' : '#6B7280'}
                                    fontWeight="600"
                                >
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
                                <Ionicons 
                                    name="medical-outline" 
                                    size={isMobile ? 16 : 20} 
                                    color={viewMode === 'professional' ? '#fff' : '#6B7280'} 
                                />
                                <Text 
                                    fontSize={isMobile ? "$3" : "$4"} 
                                    color={viewMode === 'professional' ? '#fff' : '#6B7280'}
                                    fontWeight="600"
                                >
                                    Для врачей
                                </Text>
                            </XStack>
                        </Button>
                    </XStack>
                    
                    {/* 🏥 Медицинский заголовок */}
                    <Card
                        backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        borderRadius="$6"
                        padding={isMobile ? "$4" : "$5"}
                        shadowColor="#667eea"
                        shadowRadius={10}
                        shadowOpacity={0.3}
                    >
                        <YStack space="$3" alignItems="center">
                            <XStack alignItems="center" space="$2">
                                <Ionicons name="medical" size={isMobile ? 24 : 28} color="#fff" />
                                <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="900" color="#fff" textAlign="center">
                                    Медицинская информация
                                </Text>
                            </XStack>
                        </YStack>
                    </Card>

                    {/* 💊 Карточка препарата */}
                    <Card
                        backgroundColor="#fff"
                        borderRadius="$6"
                        padding={isMobile ? "$4" : "$5"}
                        bordered
                        borderColor="$gray4"
                        shadowColor="$shadowColor"
                        shadowRadius={8}
                        shadowOpacity={0.1}
                    >
                        <YStack space="$4">
                            {/* Изображение с градиентным фоном */}
                            <YStack
                                width="100%"
                                height={isMobile ? 180 : 220}
                                backgroundColor="linear-gradient(45deg, #f0f2f5 0%, #e8ebf0 100%)"
                                borderRadius="$6"
                                justifyContent="center"
                                alignItems="center"
                                overflow="hidden"
                                position="relative"
                                borderWidth={1}
                                borderColor="$gray4"
                            >
                                <Ionicons name="medical-outline" size={isMobile ? 50 : 60} color="#c7c7cc" />
                                {medicine.image && (
                                    <Image
                                        source={{ uri: medicine.image }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        resizeMode="cover"
                                    />
                                )}
                                
                                {/* Рейтинг с новым дизайном */}
                                <XStack
                                    position="absolute"
                                    top="$3"
                                    right="$3"
                                    backgroundColor="rgba(0, 0, 0, 0.8)"
                                    borderRadius="$6"
                                    paddingHorizontal="$3"
                                    paddingVertical="$2"
                                    alignItems="center"
                                    space="$1"
                                    shadowColor="#000"
                                    shadowRadius={5}
                                    shadowOpacity={0.3}
                                >
                                    <Ionicons name="star" size={isMobile ? 16 : 18} color="#f5c518" />
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#fff" fontWeight="700">
                                        {medicine.rating ?? '4.5'}
                                    </Text>
                                </XStack>
                            </YStack>

                            {/* Название и основная информация */}
                            <YStack space="$3" alignItems="center">
                                <YStack space="$2" alignItems="center">
                                    <Text fontSize={isMobile ? "$6" : "$7"} fontWeight="900" color="#1C1C1E" textAlign="center">
                                        {medicine.name}
                                    </Text>
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280" textAlign="center">
                                        {medicine.manufacturer || 'Производитель не указан'}
                                    </Text>
                                </YStack>

                                {/* Улучшенные индикаторы */}
                                <XStack flexWrap="wrap" space="$2" justifyContent="center">
                                    {renderIndicatorBadge(medicine.dosage || '', medicine.dosage, '#007AFF', 'medical')}
                                    {renderIndicatorBadge(medicine.form || '', medicine.form, '#34C759', 'fitness')}
                                    {renderIndicatorBadge('Рецептурный', medicine.prescription, '#FF3B30', 'document-text')}
                                    {renderIndicatorBadge(medicine.inStock ? 'В наличии' : 'Под заказ', true, medicine.inStock ? '#34C759' : '#FF9500', medicine.inStock ? 'checkmark-circle' : 'time')}
                                </XStack>

                                {/* Цена и кнопки */}
                                <YStack space="$3" alignItems="center" width="100%">
                                    <XStack justifyContent="space-between" alignItems="center" width="100%">
                                        <YStack alignItems="center">
                                            <Text fontSize={isMobile ? "$6" : "$7"} fontWeight="900" color="#007AFF">
                                                {medicine.price ?? '199₽'}
                                            </Text>
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                                Цена
                                            </Text>
                                        </YStack>
                                        <YStack alignItems="center">
                                            <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#FF9500">
                                                {medicine.expiryDate}
                                            </Text>
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                                Годен до
                                            </Text>
                                        </YStack>
                                    </XStack>

                                    <XStack space="$2" width="100%">
                                        <Button
                                            flex={1}
                                            size={isMobile ? "$4" : "$5"}
                                            backgroundColor={medicine.inStock ? "#007AFF" : "#6B7280"}
                                            borderRadius="$6"
                                            disabled={!medicine.inStock}
                                            onPress={() => alert(medicine.inStock ? 'Добавлено в корзину' : 'Товар под заказ')}
                                            pressStyle={{ scale: 0.98 }}
                                            shadowColor="#007AFF"
                                            shadowRadius={medicine.inStock ? 5 : 0}
                                            shadowOpacity={medicine.inStock ? 0.3 : 0}
                                        >
                                            <XStack alignItems="center" space="$2">
                                                <Ionicons 
                                                    name={medicine.inStock ? "cart" : "time"} 
                                                    size={isMobile ? 20 : 24} 
                                                    color="#fff" 
                                                />
                                                <Text fontSize={isMobile ? "$3" : "$4"} color="#fff" fontWeight="700">
                                                    {medicine.inStock ? 'Купить' : 'Заказать'}
                                                </Text>
                                            </XStack>
                                        </Button>

                                        {viewMode === 'user' && (
                                            <Button
                                                size={isMobile ? "$4" : "$5"}
                                                backgroundColor="rgba(52, 199, 89, 0.1)"
                                                borderWidth={1}
                                                borderColor="#34C759"
                                                borderRadius="$6"
                                                onPress={() => setShowConsultation(!showConsultation)}
                                                pressStyle={{ scale: 0.98 }}
                                            >
                                                <XStack alignItems="center" space="$1">
                                                    <Ionicons name="chatbubble-ellipses" size={isMobile ? 18 : 20} color="#34C759" />
                                                    <Text fontSize={isMobile ? "$2" : "$3"} color="#34C759" fontWeight="600">
                                                        Врач
                                                    </Text>
                                                </XStack>
                                            </Button>
                                        )}
                                    </XStack>
                                </YStack>
                            </YStack>
                        </YStack>
                    </Card>

                    {/* 👩‍⚕️ Консультация специалиста */}
                    {showConsultation && viewMode === 'user' && (
                        <Card
                            backgroundColor="rgba(52, 199, 89, 0.05)"
                            borderRadius="$6"
                            padding={isMobile ? "$3" : "$4"}
                            bordered
                            borderColor="rgba(52, 199, 89, 0.3)"
                        >
                            <YStack space="$3">
                                <XStack alignItems="center" space="$2">
                                    <Ionicons name="medical" size={isMobile ? 20 : 24} color="#34C759" />
                                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#34C759">
                                        Консультация специалиста
                                    </Text>
                                </XStack>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                    Получите профессиональную консультацию по применению препарата
                                </Text>
                                <YStack space="$2">
                                    {specialists.map(renderSpecialist)}
                                </YStack>
                            </YStack>
                        </Card>
                    )}

                    {/* 📋 Подробная информация */}
                    {viewMode === 'user' ? (
                        <YStack space="$4">
                            {/* Описание */}
                            <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$2">
                                        <Ionicons name="information-circle" size={isMobile ? 20 : 24} color="#007AFF" />
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#007AFF">
                                            Описание препарата
                                        </Text>
                                    </XStack>
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280" lineHeight="$1">
                                        {medicine.description}
                                    </Text>
                                    {medicine.activeIngredient && (
                                        <Card backgroundColor="rgba(0, 122, 255, 0.05)" padding="$2" borderRadius="$3">
                                            <XStack alignItems="center" space="$2">
                                                <Ionicons name="flask" size={isMobile ? 16 : 18} color="#007AFF" />
                                                <Text fontSize={isMobile ? "$2" : "$3"} color="#007AFF" fontWeight="600">
                                                    Активное вещество: {medicine.activeIngredient}
                                                </Text>
                                            </XStack>
                                        </Card>
                                    )}
                                </YStack>
                            </Card>

                            {/* Показания */}
                            <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                {renderInfoSection('Показания к применению', medicine.indications, '#34C759', 'checkmark-circle')}
                            </Card>

                            {/* Противопоказания */}
                            <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                {renderInfoSection('Противопоказания', medicine.contraindications, '#FF3B30', 'warning')}
                            </Card>

                            {/* Побочные эффекты */}
                            <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                {renderInfoSection('Возможные побочные эффекты', medicine.sideEffects, '#FF9500', 'alert-circle')}
                            </Card>
                        </YStack>
                    ) : (
                        /* Профессиональный режим */
                        <YStack space="$4">
                            {/* Фармакологическая информация */}
                            <Card
                                backgroundColor="rgba(255, 149, 0, 0.05)"
                                borderRadius="$6"
                                padding={isMobile ? "$3" : "$4"}
                                bordered
                                borderColor="rgba(255, 149, 0, 0.3)"
                            >
                                <YStack space="$3">
                                    <XStack alignItems="center" space="$2">
                                        <Ionicons name="library" size={isMobile ? 20 : 24} color="#FF9500" />
                                        <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#FF9500">
                                            Фармакологическая информация
                                        </Text>
                                    </XStack>
                                    <YStack space="$2">
                                        <XStack justifyContent="space-between">
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">МНН:</Text>
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E" fontWeight="600">
                                                {medicine.inn || 'Не указано'}
                                            </Text>
                                        </XStack>
                                        <XStack justifyContent="space-between">
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">АТХ код:</Text>
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E" fontWeight="600">
                                                {medicine.atcCode || 'Не указан'}
                                            </Text>
                                        </XStack>
                                        <XStack justifyContent="space-between">
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">Группа:</Text>
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E" fontWeight="600" flex={1} textAlign="right">
                                                {medicine.pharmacologyGroup || 'Не указана'}
                                            </Text>
                                        </XStack>
                                    </YStack>
                                    {medicine.mechanismOfAction && (
                                        <YStack space="$1">
                                            <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#FF9500">
                                                Механизм действия:
                                            </Text>
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                                {medicine.mechanismOfAction}
                                            </Text>
                                        </YStack>
                                    )}
                                </YStack>
                            </Card>

                            {/* Остальные профессиональные секции */}
                            {medicine.dosageInstructions && (
                                <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                    <YStack space="$2">
                                        <XStack alignItems="center" space="$2">
                                            <Ionicons name="calculator" size={isMobile ? 18 : 20} color="#007AFF" />
                                            <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#007AFF">
                                                Дозирование
                                            </Text>
                                        </XStack>
                                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                            {medicine.dosageInstructions}
                                        </Text>
                                    </YStack>
                                </Card>
                            )}

                            <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                {renderInfoSection('Лекарственные взаимодействия', medicine.drugInteractions, '#FF9500', 'swap-horizontal')}
                            </Card>

                            <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                {renderInfoSection('Противопоказания (детально)', medicine.detailedContraindications, '#FF3B30', 'warning')}
                            </Card>

                            <Card backgroundColor="#fff" borderRadius="$6" padding={isMobile ? "$3" : "$4"} bordered borderColor="$gray4">
                                {renderInfoSection('Побочные эффекты (детально)', medicine.detailedSideEffects, '#FF9500', 'alert-circle')}
                            </Card>

                            {medicine.clinicalData && (
                                <Card
                                    backgroundColor="rgba(52, 199, 89, 0.05)"
                                    borderRadius="$6"
                                    padding={isMobile ? "$3" : "$4"}
                                    bordered
                                    borderColor="rgba(52, 199, 89, 0.3)"
                                >
                                    <YStack space="$2">
                                        <XStack alignItems="center" space="$2">
                                            <Ionicons name="analytics" size={isMobile ? 18 : 20} color="#34C759" />
                                            <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#34C759">
                                                Клинические данные
                                            </Text>
                                        </XStack>
                                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                            {medicine.clinicalData}
                                        </Text>
                                    </YStack>
                                </Card>
                            )}
                        </YStack>
                    )}

                    {/* 💬 Отзывы и комментарии */}
                    <Card
                        backgroundColor="#fff"
                        borderRadius="$6"
                        padding={isMobile ? "$3" : "$4"}
                        bordered
                        borderColor="$gray4"
                        shadowColor="$shadowColor"
                        shadowRadius={6}
                        shadowOpacity={0.1}
                    >
                        <YStack space="$4">
                            <XStack alignItems="center" justifyContent="space-between">
                                <XStack alignItems="center" space="$2">
                                    <Ionicons name="chatbubbles" size={isMobile ? 20 : 24} color="#007AFF" />
                                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#007AFF">
                                        Отзывы пациентов
                                    </Text>
                                </XStack>
                                <XStack alignItems="center" space="$1">
                                    <Ionicons name="star" size={16} color="#f5c518" />
                                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                        4.3
                                    </Text>
                                    <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                        ({mockComments.length} отзыва)
                                    </Text>
                                </XStack>
                            </XStack>

                            {/* Форма добавления отзыва */}
                            <Card backgroundColor="#f8f9fa" borderRadius="$4" padding="$3">
                                <YStack space="$2">
                                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                        Поделитесь своим опытом
                                    </Text>
                                    <XStack alignItems="center" space="$2">
                                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">Ваша оценка:</Text>
                                        <XStack space="$1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Button
                                                    key={star}
                                                    size="$2"
                                                    backgroundColor="transparent"
                                                    padding="$1"
                                                    onPress={() => setNewRating(star)}
                                                >
                                                    <Ionicons
                                                        name="star"
                                                        size={20}
                                                        color={star <= newRating ? "#f5c518" : "#E5E5EA"}
                                                    />
                                                </Button>
                                            ))}
                                        </XStack>
                                    </XStack>
                                    <TextArea
                                        placeholder="Расскажите о своем опыте применения препарата..."
                                        value={newComment}
                                        onChangeText={setNewComment}
                                        borderRadius="$3"
                                        fontSize={isMobile ? "$2" : "$3"}
                                        minHeight={80}
                                    />
                                    <Button
                                        size={isMobile ? "$3" : "$4"}
                                        backgroundColor="#007AFF"
                                        borderRadius="$3"
                                        alignSelf="flex-start"
                                        onPress={() => {
                                            alert('Отзыв отправлен!')
                                            setNewComment('')
                                            setNewRating(5)
                                        }}
                                        pressStyle={{ scale: 0.96 }}
                                    >
                                        <XStack alignItems="center" space="$1">
                                            <Ionicons name="send" size={16} color="#fff" />
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#fff" fontWeight="600">
                                                Отправить отзыв
                                            </Text>
                                        </XStack>
                                    </Button>
                                </YStack>
                            </Card>

                            {/* Список комментариев */}
                            <YStack space="$3">
                                {mockComments.map(renderComment)}
                            </YStack>
                        </YStack>
                    </Card>
                </YStack>
            </ScrollView>

            {/* 📱 Нижнее меню (как в табах) */}
            <XStack
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                backgroundColor="#FFFFFF"
                borderTopWidth={1}
                borderTopColor="#E5E5EA"
                height={Platform.OS === 'ios' ? 88 : 70}
                paddingTop={8}
                paddingBottom={Platform.OS === 'ios' ? 34 : 10}
                shadowColor="#000"
                shadowOffset={{
                    width: 0,
                    height: -2,
                }}
                shadowOpacity={0.1}
                shadowRadius={8}
                elevation={8}
                zIndex={100}
            >
                <XStack flex={1} justifyContent="space-around" alignItems="center">
                    <Button
                        size="$3"
                        backgroundColor="transparent"
                        flexDirection="column"
                        space="$1"
                        onPress={() => router.push('/news')}
                        pressStyle={{ scale: 0.95 }}
                        paddingHorizontal="$2"
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="newspaper-outline" size={24} color="#8E8E93" />
                            <Text fontSize={12} color="#8E8E93" fontWeight="600" marginTop={2}>
                                Новости
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        size="$3"
                        backgroundColor="transparent"
                        flexDirection="column"
                        space="$1"
                        onPress={() => router.push('/search')}
                        pressStyle={{ scale: 0.95 }}
                        paddingHorizontal="$2"
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="search-outline" size={24} color="#8E8E93" />
                            <Text fontSize={12} color="#8E8E93" fontWeight="600" marginTop={2}>
                                Поиск
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        size="$3"
                        backgroundColor="transparent"
                        flexDirection="column"
                        space="$1"
                        onPress={() => router.push('/scanner')}
                        pressStyle={{ scale: 0.95 }}
                        paddingHorizontal="$2"
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="qr-code-outline" size={24} color="#8E8E93" />
                            <Text fontSize={12} color="#8E8E93" fontWeight="600" marginTop={2}>
                                Сканер
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        size="$3"
                        backgroundColor="transparent"
                        flexDirection="column"
                        space="$1"
                        onPress={() => router.push('/bookmarks')}
                        pressStyle={{ scale: 0.95 }}
                        paddingHorizontal="$2"
                        position="relative"
                    >
                        <YStack alignItems="center" space="$1">
                            <YStack position="relative">
                                <Ionicons name="bookmark-outline" size={24} color="#8E8E93" />
                                {/* Бейдж корзины */}
                                <XStack
                                    position="absolute"
                                    top={-6}
                                    right={-6}
                                    backgroundColor="#FF3B30"
                                    borderRadius="$6"
                                    width={16}
                                    height={16}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Text fontSize={10} color="#fff" fontWeight="600">
                                        2
                                    </Text>
                                </XStack>
                            </YStack>
                            <Text fontSize={12} color="#8E8E93" fontWeight="600" marginTop={2}>
                                Корзина
                            </Text>
                        </YStack>
                    </Button>

                    <Button
                        size="$3"
                        backgroundColor="transparent"
                        flexDirection="column"
                        space="$1"
                        onPress={() => router.push('/profile')}
                        pressStyle={{ scale: 0.95 }}
                        paddingHorizontal="$2"
                    >
                        <YStack alignItems="center" space="$1">
                            <Ionicons name="person-circle-outline" size={24} color="#8E8E93" />
                            <Text fontSize={12} color="#8E8E93" fontWeight="600" marginTop={2}>
                                Профиль
                            </Text>
                        </YStack>
                    </Button>
                </XStack>
            </XStack>
        </>
    )
}