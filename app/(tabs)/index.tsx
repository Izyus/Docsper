import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import {
    Button,
    Card,
    Paragraph,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'
import MedicineCard from '../../components/MedicineCard'
import { RootState } from '../../redux/store'

const quickActions = [
    {
        id: 1,
        icon: 'search-outline',
        title: 'Поиск аналогов',
        subtitle: 'Найдите замену препарата',
        color: '#007AFF',
        route: '/search',
    },
    {
        id: 2,
        icon: 'qr-code-outline',
        title: 'Сканер QR',
        subtitle: 'Отсканируйте упаковку',
        color: '#34C759',
        route: '/scanner',
    },
    {
        id: 3,
        icon: 'chatbubble-outline',
        title: 'Чат с ИИ',
        subtitle: 'Консультация врача',
        color: '#FF9500',
        route: '/search',
    },

]

const recentNews = [
    {
        id: 1,
        title: 'Запуск нового проекта Docsper.io',
        excerpt: 'Революционная платформа для врачей и пациентов с ИИ-диагностикой',
        time: '2 часа назад',
        category: 'Объявления',
        color: '#FF9500'
    },
    {
        id: 2,
        title: 'Новый препарат от диабета показал отличные результаты',
        excerpt: 'Снижение уровня сахара на 40% за месяц применения',
        time: '4 часа назад',
        category: 'Исследования',
        color: '#007AFF'
    },
    {
        id: 3,
        title: 'ИИ-диагностика теперь доступна в мобильном приложении',
        excerpt: 'Анализ симптомов и рекомендации по лечению',
        time: '1 день назад',
        category: 'Технологии',
        color: '#34C759'
    }
]

export default function HomePage() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const router = useRouter()
    const medicines = useSelector((state: RootState) => state.medicines.items)
    
    // Показываем только первые 3 лекарства
    const popularMedicines = medicines.slice(0, 3)

    return (
        <ScrollView backgroundColor="#f8f9fa">
            {/* Градиентный фон для шапки */}
            <YStack
                backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                position="absolute"
                top={0}
                left={0}
                right={0}
                height={300}
                zIndex={-1}
            />
            
            <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4" pb="$24">
                
                {/* 🎨 Главный баннер с Docsper.io */}
                <Card
                    backgroundColor="rgba(255,255,255,0.95)"
                    backdropFilter="blur(10px)"
                    borderRadius="$6"
                    padding={isMobile ? "$4" : "$5"}
                    overflow="hidden"
                    position="relative"
                    borderWidth={1}
                    borderColor="rgba(255,255,255,0.3)"
                    shadowColor="$shadowColor"
                    shadowRadius={12}
                    shadowOpacity={0.25}
                >
                    <YStack space="$3">
                        <XStack alignItems="center" space="$2">
                            <YStack
                                backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                borderRadius="$3"
                                padding="$2"
                            >
                                <Ionicons name="rocket" size={isMobile ? 20 : 24} color="#fff" />
                            </YStack>
                            <Text 
                                fontSize={isMobile ? "$2" : "$3"} 
                                fontWeight="600" 
                                color="#667eea"
                            >
                                НОВЫЙ ПРОЕКТ
                            </Text>
                        </XStack>
                        
                        <Text 
                            fontSize={isMobile ? "$6" : "$7"} 
                            fontWeight="900" 
                            color="#1C1C1E"
                            lineHeight={isMobile ? "$1" : "$2"}
                        >
                            Docsper.io запущен!
                        </Text>
                        <Paragraph 
                            fontSize={isMobile ? "$3" : "$4"} 
                            color="#6B7280"
                            numberOfLines={isMobile ? 4 : undefined}
                        >
                            Революционная платформа для врачей и пациентов с ИИ-диагностикой, телемедициной и персонализированными рекомендациями
                        </Paragraph>
                        <XStack space="$2" flexWrap="wrap">
                            <Button
                                size={isMobile ? "$3" : "$4"}
                                backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                borderRadius="$4"
                                mt="$2"
                                onPress={() => alert('Перенаправление на Docsper.io')}
                                pressStyle={{ scale: 0.96 }}
                                shadowColor="$shadowColor"
                                shadowRadius={8}
                                shadowOpacity={0.2}
                            >
                                <XStack alignItems="center" space="$2">
                                    <Ionicons name="globe" size={isMobile ? 16 : 20} color="#fff" />
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#fff" fontWeight="700">
                                        Посетить Docsper.io
                                    </Text>
                                </XStack>
                            </Button>
                            <Button
                                size={isMobile ? "$3" : "$4"}
                                backgroundColor="rgba(255,255,255,0.1)"
                                borderWidth={1}
                                borderColor="#E5E5EA"
                                borderRadius="$4"
                                mt="$2"
                                onPress={() => router.push('/search')}
                                pressStyle={{ scale: 0.96 }}
                            >
                                <XStack alignItems="center" space="$2">
                                    <Ionicons name="search" size={isMobile ? 16 : 20} color="#667eea" />
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#667eea" fontWeight="600">
                                        Поиск лекарств
                                    </Text>
                                </XStack>
                            </Button>
                        </XStack>
                    </YStack>
                </Card>

                {/* 📊 Статистика новых пользователей */}
                <Card
                    backgroundColor="#fff"
                    borderRadius="$6"
                    padding={isMobile ? "$4" : "$5"}
                    bordered
                    borderColor="$gray4"
                    shadowColor="$shadowColor"
                    shadowRadius={6}
                    shadowOpacity={0.1}
                >
                    <YStack space="$3" alignItems="center">
                        <XStack alignItems="center" space="$2">
                            <Ionicons name="people" size={isMobile ? 20 : 24} color="#34C759" />
                            <Text 
                                fontSize={isMobile ? "$4" : "$5"} 
                                fontWeight="700" 
                                color="#1C1C1E"
                            >
                                Растущее сообщество
                            </Text>
                        </XStack>
                        
                        <XStack space={isMobile ? "$4" : "$6"} justifyContent="center">
                            <YStack alignItems="center">
                                <Text fontSize={isMobile ? "$7" : "$8"} fontWeight="900" color="#34C759">
                                    +2,847
                                </Text>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                    Новых пользователей
                                </Text>
                                <Text fontSize={isMobile ? "$1" : "$2"} color="#34C759" fontWeight="600">
                                    За эту неделю
                                </Text>
                            </YStack>
                            
                            <YStack alignItems="center">
                                <Text fontSize={isMobile ? "$7" : "$8"} fontWeight="900" color="#007AFF">
                                    85,432
                                </Text>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                    Всего пользователей
                                </Text>
                                <Text fontSize={isMobile ? "$1" : "$2"} color="#007AFF" fontWeight="600">
                                    И растем каждый день
                                </Text>
                            </YStack>
                        </XStack>
                    </YStack>
                </Card>

                {/* ⚡ Быстрые действия */}
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                        Быстрые действия
                    </Text>
                    
                    <XStack flexWrap="wrap" justifyContent="space-between" space={isMobile ? "$2" : "$3"}>
                        {quickActions.map((action) => (
                            <Card
                                key={action.id}
                                backgroundColor="#fff"
                                borderRadius="$5"
                                padding={isMobile ? "$3" : "$4"}
                                bordered
                                borderColor="$gray4"
                                width={isMobile ? "48%" : "23%"}
                                pressStyle={{ scale: 0.96 }}
                                shadowColor="$shadowColor"
                                shadowRadius={4}
                                shadowOpacity={0.08}
                                mb="$2"
                            >
                                <Button
                                    chromeless
                                    padding="$0"
                                    onPress={() => router.push(action.route as any)}
                                >
                                    <YStack alignItems="center" space="$2">
                                        <YStack
                                            width={isMobile ? 48 : 56}
                                            height={isMobile ? 48 : 56}
                                            backgroundColor={action.color + '15'}
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons 
                                                name={action.icon as any} 
                                                size={isMobile ? 24 : 28} 
                                                color={action.color} 
                                            />
                                        </YStack>
                                        <Text 
                                            fontSize={isMobile ? "$3" : "$4"} 
                                            fontWeight="700" 
                                            color="#1C1C1E"
                                            textAlign="center"
                                            numberOfLines={1}
                                        >
                                            {action.title}
                                        </Text>
                                        <Text 
                                            fontSize={isMobile ? "$2" : "$3"} 
                                            color="#6B7280"
                                            textAlign="center"
                                            numberOfLines={2}
                                        >
                                            {action.subtitle}
                                        </Text>
                                    </YStack>
                                </Button>
                            </Card>
                        ))}
                    </XStack>
                </YStack>

                {/* 📰 Последние новости */}
                <YStack space="$3">
                    <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                            Последние новости
                        </Text>
                        <Button
                            size={isMobile ? "$2" : "$3"}
                            chromeless
                            onPress={() => router.push('/news')}
                            pressStyle={{ scale: 0.96 }}
                        >
                            <XStack alignItems="center" space="$1">
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#007AFF" fontWeight="600">
                                    Все новости
                                </Text>
                                <Ionicons name="arrow-forward" size={14} color="#007AFF" />
                            </XStack>
                        </Button>
                    </XStack>
                    
                    <YStack space={isMobile ? "$2" : "$3"}>
                        {recentNews.map((news) => (
                            <Card
                                key={news.id}
                                backgroundColor="#fff"
                                borderRadius="$5"
                                padding={isMobile ? "$3" : "$4"}
                                bordered
                                borderColor="$gray4"
                                pressStyle={{ scale: 0.98 }}
                                shadowColor="$shadowColor"
                                shadowRadius={4}
                                shadowOpacity={0.08}
                                onPress={() => router.push('/news')}
                            >
                                <XStack space="$3" alignItems="center">
                                    <YStack
                                        width={isMobile ? 60 : 72}
                                        height={isMobile ? 60 : 72}
                                        backgroundColor={news.color + '15'}
                                        borderRadius="$4"
                                        justifyContent="center"
                                        alignItems="center"
                                        flexShrink={0}
                                    >
                                        <Ionicons 
                                            name={news.id === 1 ? 'rocket' : news.id === 2 ? 'flask' : 'analytics'} 
                                            size={isMobile ? 24 : 28} 
                                            color={news.color} 
                                        />
                                    </YStack>
                                    
                                    <YStack flex={1} space="$1">
                                        <XStack alignItems="center" space="$2">
                                            <XStack
                                                backgroundColor={news.color + '15'}
                                                paddingHorizontal="$2"
                                                paddingVertical="$1"
                                                borderRadius="$3"
                                            >
                                                <Text fontSize="$1" color={news.color} fontWeight="600">
                                                    {news.category.toUpperCase()}
                                                </Text>
                                            </XStack>
                                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280">
                                                {news.time}
                                            </Text>
                                        </XStack>
                                        
                                        <Text 
                                            fontSize={isMobile ? "$3" : "$4"} 
                                            fontWeight="700" 
                                            color="#1C1C1E"
                                            numberOfLines={2}
                                        >
                                            {news.title}
                                        </Text>
                                        <Text 
                                            fontSize={isMobile ? "$2" : "$3"} 
                                            color="#6B7280"
                                            numberOfLines={2}
                                        >
                                            {news.excerpt}
                                        </Text>
                                    </YStack>
                                    
                                    <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                                </XStack>
                            </Card>
                        ))}
                    </YStack>
                </YStack>

                {/* 💊 Популярные лекарства */}
                <YStack space="$3">
                    <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                            Популярные препараты
                        </Text>
                        <Button
                            size={isMobile ? "$2" : "$3"}
                            chromeless
                            onPress={() => router.push('/search')}
                            pressStyle={{ scale: 0.96 }}
                        >
                            <XStack alignItems="center" space="$1">
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#007AFF" fontWeight="600">
                                    Смотреть все
                                </Text>
                                <Ionicons name="arrow-forward" size={14} color="#007AFF" />
                            </XStack>
                        </Button>
                    </XStack>
                    
                    <YStack space={isMobile ? "$2" : "$3"}>
                        {popularMedicines.map((medicine) => (
                            <MedicineCard key={medicine.id} medicine={medicine} proMode={false} />
                        ))}
                    </YStack>
                </YStack>

                {/* 📊 Общая статистика экономии */}
                <Card
                    backgroundColor="linear-gradient(135deg, #34C759 0%, #32D74B 100%)"
                    borderRadius="$6"
                    padding={isMobile ? "$4" : "$5"}
                    overflow="hidden"
                    position="relative"
                >
                    <YStack space="$3" alignItems="center">
                        <XStack alignItems="center" space="$2">
                            <Ionicons name="trending-up" size={isMobile ? 20 : 24} color="#fff" />
                            <Text 
                                fontSize={isMobile ? "$4" : "$5"} 
                                fontWeight="800" 
                                color="#fff"
                            >
                                Ваша экономия с нами
                            </Text>
                        </XStack>
                        
                        <XStack space={isMobile ? "$4" : "$6"} justifyContent="center">
                            <YStack alignItems="center">
                                <Text fontSize={isMobile ? "$7" : "$8"} fontWeight="900" color="#fff">
                                    2,450₽
                                </Text>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="rgba(255,255,255,0.8)">
                                    Сэкономлено
                                </Text>
                            </YStack>
                            
                            <YStack alignItems="center">
                                <Text fontSize={isMobile ? "$7" : "$8"} fontWeight="900" color="#fff">
                                    127
                                </Text>
                                <Text fontSize={isMobile ? "$2" : "$3"} color="rgba(255,255,255,0.8)">
                                    Аналогов найдено
                                </Text>
                            </YStack>
                        </XStack>
                        
                        <Paragraph 
                            fontSize={isMobile ? "$2" : "$3"} 
                            color="rgba(255,255,255,0.9)"
                            textAlign="center"
                        >
                            Благодаря поиску аналогов и сравнению цен
                        </Paragraph>
                    </YStack>
                </Card>
            </YStack>
        </ScrollView>
    )
} 