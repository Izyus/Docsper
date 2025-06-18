import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { Button, Card, Image, Text, XStack, YStack } from 'tamagui'

const popularItems = [
    {
        id: 1,
        title: 'Прорыв в терапии диабета: препарат нового поколения',
        excerpt: 'Клинические испытания показали снижение уровня сахара на 40% у пациентов с диабетом 2 типа. Революционный препарат может изменить подходы к лечению.',
        image: 'https://source.unsplash.com/400x300/?diabetes,medicine',
        date: '15 июн',
        author: 'Др. Мария Соколова',
        authorAvatar: '👩‍⚕️',
        comments: 12,
        likes: 248,
        views: 1420,
        category: 'Исследования',
        readTime: '5 мин'
    },
    {
        id: 2,
        title: 'Список жизненно важных лекарств обновлен',
        excerpt: 'Минздрав России включил в перечень ЖНВЛП 15 новых препаратов, включая современные противораковые средства и лекарства для редких заболеваний.',
        image: 'https://source.unsplash.com/400x300/?pharmacy,pills',
        date: '14 июн',
        author: 'Анна Кузнецова',
        authorAvatar: '👩‍💼',
        comments: 8,
        likes: 156,
        views: 890,
        category: 'Регуляция',
        readTime: '3 мин'
    },
    {
        id: 3,
        title: 'Новая вакцина против гриппа прошла все испытания',
        excerpt: 'Четырехвалентная вакцина показала эффективность 95% против всех штаммов гриппа. Массовая вакцинация начнется уже этой осенью.',
        image: 'https://source.unsplash.com/400x300/?vaccine,medical',
        date: '13 июн',
        author: 'Профессор Иванов',
        authorAvatar: '👨‍⚕️',
        comments: 21,
        likes: 387,
        views: 2340,
        category: 'Профилактика',
        readTime: '4 мин'
    },
]

export default function PopularToday() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const router = useRouter()
    const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({})
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({})

    const handleLike = (itemId: number, currentLikes: number) => {
        const isLiked = likedItems[itemId]
        setLikedItems(prev => ({ ...prev, [itemId]: !isLiked }))
        setLikeCounts(prev => ({ 
            ...prev, 
            [itemId]: isLiked ? (prev[itemId] || currentLikes) - 1 : (prev[itemId] || currentLikes) + 1 
        }))
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Исследования': return '#007AFF'
            case 'Регуляция': return '#FF9500'
            case 'Профилактика': return '#34C759'
            default: return '#6B7280'
        }
    }

    return (
        <YStack space={isMobile ? "$3" : "$4"}>
            <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" space="$2">
                    <Ionicons name="trending-up" size={isMobile ? 20 : 24} color="#FF9500" />
                    <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                        Популярное сегодня
                    </Text>
                </XStack>
                <Button
                    size="$2"
                    backgroundColor="transparent"
                    pressStyle={{ scale: 0.96 }}
                    onPress={() => router.push('/news')}
                >
                    <XStack alignItems="center" space="$1">
                        <Text fontSize="$2" color="#007AFF" fontWeight="600">Все новости</Text>
                        <Ionicons name="arrow-forward" size={14} color="#007AFF" />
                    </XStack>
                </Button>
            </XStack>

            <YStack space={isMobile ? "$3" : "$4"}>
                {popularItems.map((item, index) => (
                    <Card
                        key={item.id}
                        backgroundColor="#fff"
                        padding={0}
                        borderRadius="$6"
                        bordered
                        borderColor="$gray4"
                        pressStyle={{ scale: 0.98 }}
                        shadowColor="$shadowColor"
                        shadowRadius={8}
                        shadowOpacity={0.12}
                        overflow="hidden"
                        onPress={() => router.push(`/blog/${item.id}`)}
                    >
                        <XStack space={0}>
                            {/* 🖼 Картинка */}
                            <YStack
                                width={isMobile ? 120 : 140}
                                height={isMobile ? 120 : 140}
                                backgroundColor="$gray2"
                                justifyContent="center"
                                alignItems="center"
                                overflow="hidden"
                                position="relative"
                                flexShrink={0}
                            >
                                <Ionicons name="newspaper-outline" size={isMobile ? 24 : 28} color="#999" />
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    resizeMode="cover"
                                />

                                {/* Номер популярности */}
                                <XStack
                                    position="absolute"
                                    top="$2"
                                    left="$2"
                                    backgroundColor={getCategoryColor(item.category)}
                                    width={isMobile ? 24 : 28}
                                    height={isMobile ? 24 : 28}
                                    borderRadius="$6"
                                    justifyContent="center"
                                    alignItems="center"
                                    shadowColor={getCategoryColor(item.category)}
                                    shadowRadius={3}
                                    shadowOpacity={0.4}
                                >
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#fff" fontWeight="900">
                                        {index + 1}
                                    </Text>
                                </XStack>

                                {/* Время чтения */}
                                <XStack
                                    position="absolute"
                                    bottom="$2"
                                    right="$2"
                                    backgroundColor="rgba(0, 0, 0, 0.7)"
                                    paddingHorizontal="$1"
                                    paddingVertical="$0.5"
                                    borderRadius="$3"
                                    alignItems="center"
                                    space="$0.5"
                                >
                                    <Ionicons name="time-outline" size={10} color="#fff" />
                                    <Text fontSize="$1" color="#fff" fontWeight="600">
                                        {item.readTime}
                                    </Text>
                                </XStack>
                            </YStack>

                            {/* 📄 Контент */}
                            <YStack flex={1} padding={isMobile ? "$3" : "$4"} space="$2" justifyContent="space-between">
                                <YStack space="$2">
                                    {/* Автор */}
                                    <XStack alignItems="center" space="$1">
                                        <Text fontSize="$3">{item.authorAvatar}</Text>
                                        <Text fontSize={isMobile ? "$2" : "$3"} fontWeight="600" color="#007AFF">
                                            {item.author}
                                        </Text>
                                        <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280">
                                            • {item.date}
                                        </Text>
                                    </XStack>

                                    {/* Заголовок */}
                                    <Text 
                                        numberOfLines={2} 
                                        fontWeight="700" 
                                        fontSize={isMobile ? "$3" : "$4"}
                                        color="#1C1C1E"
                                        lineHeight="$1"
                                    >
                                        {item.title}
                                    </Text>

                                    {/* Превью */}
                                    <Text 
                                        fontSize={isMobile ? "$2" : "$3"} 
                                        color="#6B7280"
                                        numberOfLines={2}
                                        lineHeight="$1"
                                    >
                                        {item.excerpt}
                                    </Text>
                                </YStack>

                                {/* Статистика и действия */}
                                <XStack justifyContent="space-between" alignItems="center">
                                    <XStack space="$3" alignItems="center">
                                        {/* Лайки */}
                                        <Button
                                            size="$2"
                                            backgroundColor="transparent"
                                            padding="$1"
                                            onPress={(e) => {
                                                e.stopPropagation()
                                                handleLike(item.id, item.likes)
                                            }}
                                            pressStyle={{ scale: 0.9 }}
                                        >
                                            <XStack alignItems="center" space="$1">
                                                <Ionicons 
                                                    name={likedItems[item.id] ? "heart" : "heart-outline"} 
                                                    size={isMobile ? 14 : 16} 
                                                    color={likedItems[item.id] ? "#FF3B30" : "#6B7280"} 
                                                />
                                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                                                    {likeCounts[item.id] || item.likes}
                                                </Text>
                                            </XStack>
                                        </Button>

                                        {/* Просмотры */}
                                        <XStack alignItems="center" space="$1">
                                            <Ionicons name="eye-outline" size={isMobile ? 14 : 16} color="#6B7280" />
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                                                {item.views}
                                            </Text>
                                        </XStack>

                                        {/* Комментарии */}
                                        <XStack alignItems="center" space="$1">
                                            <Ionicons name="chatbubble-ellipses-outline" size={isMobile ? 14 : 16} color="#6B7280" />
                                            <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                                                {item.comments}
                                            </Text>
                                        </XStack>
                                    </XStack>

                                    {/* Поделиться */}
                                    <Button
                                        size="$2"
                                        backgroundColor="transparent"
                                        padding="$1"
                                        onPress={(e) => {
                                            e.stopPropagation()
                                            alert('Поделиться статьей')
                                        }}
                                        pressStyle={{ scale: 0.9 }}
                                    >
                                        <Ionicons name="share-outline" size={isMobile ? 16 : 18} color="#007AFF" />
                                    </Button>
                                </XStack>
                            </YStack>
                        </XStack>
                    </Card>
                ))}
            </YStack>
        </YStack>
    )
}