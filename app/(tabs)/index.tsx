import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import {
    Card,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'
import BlogCard from '../../components/BlogCard'
import MedicineCard from '../../components/MedicineCard'
import TabHeader from '../../components/ui/TabHeader'
import { blogPosts } from '../../data/blog'
import { RootState } from '../../redux/store'

const quickActions = [
    {
        id: 1,
        icon: 'qr-code-outline',
        title: 'Сканировать',
        subtitle: 'QR-код',
        color: '#007AFF',
        route: '/scanner'
    },
    {
        id: 2,
        icon: 'search-outline',
        title: 'Поиск',
        subtitle: 'Лекарств',
        color: '#34C759',
        route: '/search'
    },
    {
        id: 3,
        icon: 'newspaper-outline',
        title: 'Новости',
        subtitle: 'Медицины',
        color: '#FF9500',
        route: '/news'
    }
]

type MixedContent = {
    type: 'medicine' | 'news';
    data: any; // Используем any временно, в реальном проекте нужно определить точные типы
}

export default function HomePage() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const router = useRouter()
    const medicines = useSelector((state: RootState) => state.medicines.items)
    
    // Показываем только первые 3 лекарства
    const popularMedicines = medicines.slice(0, 3)
    // Показываем только первые 3 новости
    const recentNews = blogPosts.slice(0, 3)

    // Смешиваем лекарства и новости
    const mixedContent: MixedContent[] = [
        ...popularMedicines.map(item => ({ type: 'medicine' as const, data: item })),
        ...recentNews.map(item => ({ type: 'news' as const, data: item }))
    ].sort(() => Math.random() - 0.5)

    return (
        <ScrollView backgroundColor="#f8f9fa">
            <YStack px={isMobile ? "$3" : "$4"} py="$4" space="$4" pb="$20">
                <TabHeader 
                    icon="home"
                    title="Добро пожаловать!"
                    subtitle="Ваш персональный помощник в мире медицины"
                    accentColor="#007AFF"
                    stats={[
                        {
                            value: "+2,847",
                            label: "Новых пользователей",
                            color: "#34C759"
                        },
                        {
                            value: "85,432",
                            label: "Всего пользователей",
                            color: "#007AFF"
                        }
                    ]}
                />

                {/* ⚡ Быстрые действия */}
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                        Быстрые действия
                    </Text>
                    
                    <XStack flexWrap="wrap" gap="$3">
                        {quickActions.map((action) => (
                            <Card
                                key={action.id}
                                backgroundColor="#fff"
                                borderRadius="$5"
                                padding={isMobile ? "$3" : "$4"}
                                bordered
                                borderColor="$gray4"
                                pressStyle={{ scale: 0.98 }}
                                onPress={() => router.push(action.route as any)}
                                width={isMobile ? "48%" : "31%"}
                            >
                                <YStack space="$2" alignItems="center">
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
                                    >
                                        {action.title}
                                    </Text>
                                    <Text 
                                        fontSize={isMobile ? "$2" : "$3"} 
                                        color="#6B7280"
                                        textAlign="center"
                                    >
                                        {action.subtitle}
                                    </Text>
                                </YStack>
                            </Card>
                        ))}
                    </XStack>
                </YStack>

                {/* 📱 Смешанный контент */}
                <YStack space="$3">
                    <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                        Рекомендации для вас
                    </Text>
                    
                    <YStack space={isMobile ? "$2" : "$3"}>
                        {mixedContent.map((item, index) => (
                            item.type === 'medicine' ? (
                                <MedicineCard key={`medicine-${index}`} medicine={item.data} proMode={false} />
                            ) : (
                                <BlogCard key={`news-${index}`} post={item.data} />
                            )
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
                    </YStack>
                </Card>
            </YStack>
        </ScrollView>
    )
} 