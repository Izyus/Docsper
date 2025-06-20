import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import {
    Button,
    Card,
    Paragraph,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'

const doctors = [
    {
        id: 1,
        name: 'Стоматолог',
        icon: 'medical-outline',
        color: '#007AFF',
        description: 'Лечение зубов, протезирование, отбеливание',
        available: true,
        rating: 4.8,
        reviews: 127,
        price: 'от 2000₽'
    },
    {
        id: 2,
        name: 'Хирург',
        icon: 'cut-outline',
        color: '#FF3B30',
        description: 'Операции, консультации, диагностика',
        available: true,
        rating: 4.9,
        reviews: 89,
        price: 'от 5000₽'
    },
    {
        id: 3,
        name: 'Терапевт',
        icon: 'fitness-outline',
        color: '#34C759',
        description: 'Общее обследование, лечение, профилактика',
        available: true,
        rating: 4.7,
        reviews: 234,
        price: 'от 1500₽'
    },
    {
        id: 4,
        name: 'Психолог',
        icon: 'brain-outline',
        color: '#5856D6',
        description: 'Консультации, терапия, поддержка',
        available: true,
        rating: 4.6,
        reviews: 156,
        price: 'от 3000₽'
    },
    {
        id: 5,
        name: 'Кардиолог',
        icon: 'heart-outline',
        color: '#FF9500',
        description: 'Сердце, сосуды, ЭКГ, УЗИ',
        available: true,
        rating: 4.9,
        reviews: 98,
        price: 'от 3500₽'
    },
    {
        id: 6,
        name: 'Невролог',
        icon: 'pulse-outline',
        color: '#AF52DE',
        description: 'Нервная система, головные боли, диагностика',
        available: true,
        rating: 4.8,
        reviews: 112,
        price: 'от 2800₽'
    },
    {
        id: 7,
        name: 'Офтальмолог',
        icon: 'eye-outline',
        color: '#5AC8FA',
        description: 'Глаза, зрение, очки, линзы',
        available: true,
        rating: 4.7,
        reviews: 145,
        price: 'от 2200₽'
    },
    {
        id: 8,
        name: 'Дерматолог',
        icon: 'body-outline',
        color: '#FF6B35',
        description: 'Кожа, аллергия, косметология',
        available: true,
        rating: 4.6,
        reviews: 178,
        price: 'от 1800₽'
    }
]

const dentalServices = {
    kazakhstan: [
        {
            id: 1,
            name: 'Виниры',
            description: 'Керамические накладки на зубы',
            price: 'от 25,000₸',
            duration: '2-3 дня',
            rating: 4.9,
            reviews: 89
        },
        {
            id: 2,
            name: 'Аллонфо',
            description: 'Полная замена зубов на импланты',
            price: 'от 450,000₸',
            duration: '3-6 месяцев',
            rating: 4.8,
            reviews: 156
        },
        {
            id: 3,
            name: 'Коронки',
            description: 'Керамические коронки',
            price: 'от 35,000₸',
            duration: '1-2 недели',
            rating: 4.7,
            reviews: 234
        },
        {
            id: 4,
            name: 'Импланты',
            description: 'Титановые импланты',
            price: 'от 120,000₸',
            duration: '3-6 месяцев',
            rating: 4.9,
            reviews: 198
        },
        {
            id: 5,
            name: 'Отбеливание',
            description: 'Профессиональное отбеливание',
            price: 'от 15,000₸',
            duration: '1 час',
            rating: 4.6,
            reviews: 145
        },
        {
            id: 6,
            name: 'Брекеты',
            description: 'Исправление прикуса',
            price: 'от 180,000₸',
            duration: '1-2 года',
            rating: 4.8,
            reviews: 167
        }
    ],
    turkey: [
        {
            id: 1,
            name: 'Виниры',
            description: 'Керамические накладки на зубы',
            price: 'от $300',
            duration: '3-5 дней',
            rating: 4.9,
            reviews: 234
        },
        {
            id: 2,
            name: 'Аллонфо',
            description: 'Полная замена зубов на импланты',
            price: 'от $8,000',
            duration: '5-7 дней',
            rating: 4.8,
            reviews: 189
        },
        {
            id: 3,
            name: 'Коронки',
            description: 'Керамические коронки',
            price: 'от $250',
            duration: '2-3 дня',
            rating: 4.7,
            reviews: 456
        },
        {
            id: 4,
            name: 'Импланты',
            description: 'Титановые импланты',
            price: 'от $800',
            duration: '3-5 дней',
            rating: 4.9,
            reviews: 345
        },
        {
            id: 5,
            name: 'Отбеливание',
            description: 'Профессиональное отбеливание',
            price: 'от $150',
            duration: '1 час',
            rating: 4.6,
            reviews: 278
        },
        {
            id: 6,
            name: 'Брекеты',
            description: 'Исправление прикуса',
            price: 'от $2,500',
            duration: '1-2 года',
            rating: 4.8,
            reviews: 234
        }
    ]
}

const recentAppointments = [
    {
        id: 1,
        doctor: 'Стоматолог',
        date: '15 марта',
        time: '14:30',
        status: 'Подтверждена'
    },
    {
        id: 2,
        doctor: 'Терапевт',
        date: '18 марта',
        time: '10:00',
        status: 'Ожидает подтверждения'
    }
]

export default function AppointmentsScreen() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const [selectedCountry, setSelectedCountry] = useState<'kazakhstan' | 'turkey'>('kazakhstan')
    const [activeSection, setActiveSection] = useState<'all' | 'dental'>('all')

    return (
        <ScrollView backgroundColor="#fff">
            <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4" pb="$24">
                
                {/* 🎯 Заголовок */}
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
                    <YStack space="$2" alignItems="center">
                        <YStack
                            width={isMobile ? 60 : 80}
                            height={isMobile ? 60 : 80}
                            backgroundColor="rgba(0, 122, 255, 0.1)"
                            borderRadius="$6"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="calendar" size={isMobile ? 32 : 40} color="#007AFF" />
                        </YStack>
                        <Text 
                            fontSize={isMobile ? "$6" : "$7"} 
                            fontWeight="900" 
                            color="#1C1C1E"
                            textAlign="center"
                        >
                            Запись к врачу
                        </Text>
                        <Paragraph 
                            fontSize={isMobile ? "$3" : "$4"} 
                            color="#6B7280"
                            textAlign="center"
                            numberOfLines={isMobile ? 3 : undefined}
                        >
                            Выберите специалиста и запишитесь на прием в удобное время
                        </Paragraph>
                    </YStack>
                </Card>

                {/* 🔄 Переключатель секций */}
                <Card
                    backgroundColor="rgba(0, 122, 255, 0.05)"
                    borderRadius="$4"
                    padding="$2"
                    borderColor="rgba(0, 122, 255, 0.2)"
                >
                    <XStack space="$2">
                        <Button
                            flex={1}
                            backgroundColor={activeSection === 'all' ? '#007AFF' : 'transparent'}
                            borderRadius="$3"
                            paddingVertical="$3"
                            onPress={() => setActiveSection('all')}
                        >
                            <XStack alignItems="center" space="$2" justifyContent="center">
                                <Ionicons 
                                    name="people" 
                                    size={16} 
                                    color={activeSection === 'all' ? 'white' : '#007AFF'} 
                                />
                                <Text 
                                    fontSize="$3" 
                                    fontWeight="600"
                                    color={activeSection === 'all' ? 'white' : '#007AFF'}
                                >
                                    Все врачи
                                </Text>
                            </XStack>
                        </Button>
                        <Button
                            flex={1}
                            backgroundColor={activeSection === 'dental' ? '#FFD700' : 'transparent'}
                            borderRadius="$3"
                            paddingVertical="$3"
                            onPress={() => setActiveSection('dental')}
                        >
                            <XStack alignItems="center" space="$2" justifyContent="center">
                                <Ionicons 
                                    name="diamond" 
                                    size={16} 
                                    color={activeSection === 'dental' ? '#1C1C1E' : '#FFD700'} 
                                />
                                <Text 
                                    fontSize="$3" 
                                    fontWeight="600"
                                    color={activeSection === 'dental' ? '#1C1C1E' : '#FFD700'}
                                >
                                    Стоматология VIP
                                </Text>
                            </XStack>
                        </Button>
                    </XStack>
                </Card>

                {/* 📅 Ближайшие записи */}
                {recentAppointments.length > 0 && (
                    <YStack space="$3">
                        <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                            📅 Ближайшие записи
                        </Text>
                        
                        <YStack space="$2">
                            {recentAppointments.map((appointment) => (
                                <Card
                                    key={appointment.id}
                                    backgroundColor="#fff"
                                    borderRadius="$6"
                                    padding={isMobile ? "$3" : "$4"}
                                    bordered
                                    borderColor="$gray4"
                                >
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
                                                <Ionicons name="calendar-outline" size={20} color="#007AFF" />
                                            </YStack>
                                            <YStack>
                                                <Text fontSize="$4" fontWeight="700" color="#1C1C1E">
                                                    {appointment.doctor}
                                                </Text>
                                                <Text fontSize="$2" color="#6B7280">
                                                    {appointment.date} в {appointment.time}
                                                </Text>
                                            </YStack>
                                        </XStack>
                                        <Text 
                                            fontSize="$2" 
                                            color={appointment.status === 'Подтверждена' ? '#34C759' : '#FF9500'}
                                            fontWeight="600"
                                        >
                                            {appointment.status}
                                        </Text>
                                    </XStack>
                                </Card>
                            ))}
                        </YStack>
                    </YStack>
                )}

                {/* 👨‍⚕️ Секция "Все врачи" */}
                {activeSection === 'all' && (
                    <YStack space="$3">
                        <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                            👨‍⚕️ Выберите специалиста
                        </Text>
                        
                        <YStack space={isMobile ? "$2" : "$3"}>
                            {doctors.map((doctor) => (
                                <Card
                                    key={doctor.id}
                                    backgroundColor="#fff"
                                    borderRadius="$6"
                                    padding={isMobile ? "$3" : "$4"}
                                    bordered
                                    borderColor="$gray4"
                                    pressStyle={{ scale: 0.98 }}
                                >
                                    <Button
                                        chromeless
                                        padding="$0"
                                        onPress={() => alert(`Запись к ${doctor.name} (демо)`)}

                                    >
                                        <XStack alignItems="center" space={isMobile ? "$3" : "$4"} width="100%">
                                            <YStack
                                                width={isMobile ? 50 : 60}
                                                height={isMobile ? 50 : 60}
                                                backgroundColor={doctor.color + '15'}
                                                borderRadius="$5"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Ionicons 
                                                    name={doctor.icon as any} 
                                                    size={isMobile ? 24 : 28} 
                                                    color={doctor.color} 
                                                />
                                            </YStack>

                                            <YStack flex={1} space="$1">
                                                <XStack alignItems="center" justifyContent="space-between">
                                                    <Text 
                                                        fontSize={isMobile ? "$4" : "$5"} 
                                                        fontWeight="700" 
                                                        color="#1C1C1E"
                                                    >
                                                        {doctor.name}
                                                    </Text>
                                                    <Text 
                                                        fontSize={isMobile ? "$2" : "$3"} 
                                                        color="#007AFF"
                                                        fontWeight="600"
                                                    >
                                                        {doctor.price}
                                                    </Text>
                                                </XStack>
                                                <Text 
                                                    fontSize={isMobile ? "$2" : "$3"} 
                                                    color="#6B7280"
                                                    numberOfLines={2}
                                                >
                                                    {doctor.description}
                                                </Text>
                                                <XStack alignItems="center" space="$2">
                                                    <XStack alignItems="center" space="$1">
                                                        <Ionicons name="star" size={12} color="#FFD700" />
                                                        <Text fontSize="$2" color="#6B7280">
                                                            {doctor.rating}
                                                        </Text>
                                                    </XStack>
                                                    <Text fontSize="$2" color="#6B7280">
                                                        ({doctor.reviews} отзывов)
                                                    </Text>
                                                </XStack>
                                            </YStack>

                                            <Ionicons 
                                                name="chevron-forward" 
                                                size={isMobile ? 16 : 20} 
                                                color="#C7C7CC" 
                                            />
                                        </XStack>
                                    </Button>
                                </Card>
                            ))}
                        </YStack>
                    </YStack>
                )}

                {/* 🦷 Секция "Стоматология VIP" */}
                {activeSection === 'dental' && (
                    <Card
                        backgroundColor="#fff"
                        borderRadius="$6"
                        padding={isMobile ? "$4" : "$5"}
                        bordered
                        borderColor="#FFD700"
                        borderWidth={2}
                        shadowColor="#FFD700"
                        shadowRadius={8}
                        shadowOpacity={0.2}
                    >
                        <YStack space="$4">
                            {/* Заголовок секции */}
                            <YStack space="$2" alignItems="center">
                                <YStack
                                    width={isMobile ? 50 : 60}
                                    height={isMobile ? 50 : 60}
                                    backgroundColor="rgba(255, 215, 0, 0.1)"
                                    borderRadius="$5"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Ionicons name="diamond" size={isMobile ? 24 : 28} color="#FFD700" />
                                </YStack>
                                <Text 
                                    fontSize={isMobile ? "$5" : "$6"} 
                                    fontWeight="900" 
                                    color="#1C1C1E"
                                    textAlign="center"
                                >
                                    🦷 Стоматология VIP
                                </Text>
                                <Text 
                                    fontSize={isMobile ? "$2" : "$3"} 
                                    color="#6B7280"
                                    textAlign="center"
                                >
                                    Выберите страну для лечения
                                </Text>
                            </YStack>

                            {/* Переключатель стран */}
                            <Card
                                backgroundColor="rgba(255, 215, 0, 0.05)"
                                borderRadius="$4"
                                padding="$2"
                                borderColor="rgba(255, 215, 0, 0.2)"
                            >
                                <XStack space="$2">
                                    <Button
                                        flex={1}
                                        backgroundColor={selectedCountry === 'kazakhstan' ? '#FFD700' : 'transparent'}
                                        borderRadius="$3"
                                        paddingVertical="$2"
                                        onPress={() => setSelectedCountry('kazakhstan')}
                                    >
                                        <XStack alignItems="center" space="$2" justifyContent="center">
                                            <Text fontSize="$1">🇰🇿</Text>
                                            <Text 
                                                fontSize="$3" 
                                                fontWeight="600"
                                                color={selectedCountry === 'kazakhstan' ? '#1C1C1E' : '#6B7280'}
                                            >
                                                Казахстан
                                            </Text>
                                        </XStack>
                                    </Button>
                                    <Button
                                        flex={1}
                                        backgroundColor={selectedCountry === 'turkey' ? '#FFD700' : 'transparent'}
                                        borderRadius="$3"
                                        paddingVertical="$2"
                                        onPress={() => setSelectedCountry('turkey')}
                                    >
                                        <XStack alignItems="center" space="$2" justifyContent="center">
                                            <Text fontSize="$1">🇹🇷</Text>
                                            <Text 
                                                fontSize="$3" 
                                                fontWeight="600"
                                                color={selectedCountry === 'turkey' ? '#1C1C1E' : '#6B7280'}
                                            >
                                                Турция
                                            </Text>
                                        </XStack>
                                    </Button>
                                </XStack>
                            </Card>

                            {/* Услуги стоматологии */}
                            <YStack space="$3">
                                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="800" color="#1C1C1E">
                                    Популярные услуги в {selectedCountry === 'kazakhstan' ? 'Казахстане' : 'Турции'}
                                </Text>
                                
                                <YStack space="$2">
                                    {dentalServices[selectedCountry].map((service) => (
                                        <Card
                                            key={service.id}
                                            backgroundColor="#fff"
                                            borderRadius="$4"
                                            padding={isMobile ? "$3" : "$4"}
                                            bordered
                                            borderColor="$gray4"
                                            pressStyle={{ scale: 0.98 }}
                                        >
                                            <Button
                                                chromeless
                                                padding="$0"
                                                onPress={() => alert(`Запись на ${service.name} (демо)`)}
                                            >
                                                <XStack alignItems="center" justifyContent="space-between" width="100%">
                                                    <YStack flex={1} space="$1">
                                                        <XStack alignItems="center" justifyContent="space-between">
                                                            <Text 
                                                                fontSize={isMobile ? "$4" : "$5"} 
                                                                fontWeight="700" 
                                                                color="#1C1C1E"
                                                            >
                                                                {service.name}
                                                            </Text>
                                                            <Text 
                                                                fontSize={isMobile ? "$3" : "$4"} 
                                                                color="#FFD700"
                                                                fontWeight="700"
                                                            >
                                                                {service.price}
                                                            </Text>
                                                        </XStack>
                                                        <Text 
                                                            fontSize={isMobile ? "$2" : "$3"} 
                                                            color="#6B7280"
                                                        >
                                                            {service.description}
                                                        </Text>
                                                        <XStack alignItems="center" space="$3">
                                                            <XStack alignItems="center" space="$1">
                                                                <Ionicons name="time-outline" size={12} color="#6B7280" />
                                                                <Text fontSize="$2" color="#6B7280">
                                                                    {service.duration}
                                                                </Text>
                                                            </XStack>
                                                            <XStack alignItems="center" space="$1">
                                                                <Ionicons name="star" size={12} color="#FFD700" />
                                                                <Text fontSize="$2" color="#6B7280">
                                                                    {service.rating}
                                                                </Text>
                                                            </XStack>
                                                            <Text fontSize="$2" color="#6B7280">
                                                                ({service.reviews} отзывов)
                                                            </Text>
                                                        </XStack>
                                                    </YStack>
                                                    <Ionicons 
                                                        name="chevron-forward" 
                                                        size={isMobile ? 16 : 20} 
                                                        color="#C7C7CC" 
                                                    />
                                                </XStack>
                                            </Button>
                                        </Card>
                                    ))}
                                </YStack>
                            </YStack>

                            {/* Кнопка записи */}
                            <Button
                                backgroundColor="#FFD700"
                                borderRadius="$6"
                                paddingVertical="$3"
                                onPress={() => alert(`Запись к стоматологу в ${selectedCountry === 'kazakhstan' ? 'Казахстане' : 'Турции'} (демо)`)}
                            >
                                <XStack alignItems="center" space="$2" justifyContent="center">
                                    <Ionicons name="calendar" size={20} color="#1C1C1E" />
                                    <Text color="#1C1C1E" fontWeight="700" fontSize="$4">
                                        Записаться к стоматологу
                                    </Text>
                                </XStack>
                            </Button>
                        </YStack>
                    </Card>
                )}

                {/* 💡 Быстрая запись */}
                <Card
                    backgroundColor="rgba(0, 122, 255, 0.05)"
                    borderRadius="$6"
                    padding={isMobile ? "$4" : "$5"}
                    bordered
                    borderColor="rgba(0, 122, 255, 0.2)"
                >
                    <YStack space="$3" alignItems="center">
                        <YStack
                            width={isMobile ? 50 : 60}
                            height={isMobile ? 50 : 60}
                            backgroundColor="rgba(0, 122, 255, 0.1)"
                            borderRadius="$5"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="flash" size={isMobile ? 24 : 28} color="#007AFF" />
                        </YStack>
                        <YStack alignItems="center" space="$1">
                            <Text 
                                fontSize={isMobile ? "$4" : "$5"} 
                                fontWeight="700" 
                                color="#1C1C1E"
                                textAlign="center"
                            >
                                Быстрая запись
                            </Text>
                            <Text 
                                fontSize={isMobile ? "$2" : "$3"} 
                                color="#6B7280"
                                textAlign="center"
                            >
                                Не знаете к какому врачу? Пройдите тест и получите рекомендацию
                            </Text>
                        </YStack>
                        <Button
                            backgroundColor="#007AFF"
                            color="white"
                            borderRadius="$6"
                            paddingHorizontal="$4"
                            paddingVertical="$2"
                            onPress={() => alert('Тест для выбора врача (демо)')}
                        >
                            <XStack alignItems="center" space="$2">
                                <Ionicons name="play" size={16} color="white" />
                                <Text color="white" fontWeight="600">Пройти тест</Text>
                            </XStack>
                        </Button>
                    </YStack>
                </Card>

            </YStack>
        </ScrollView>
    )
} 