import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { Card, ScrollView, Text, XStack, YStack } from 'tamagui'

const popularArticles = [
    {
        id: 1,
        title: 'Новый метод лечения диабета',
        views: '12.5K',
        time: '2 часа',
        icon: 'flask-outline',
        color: '#007AFF'
    },
    {
        id: 2,
        title: 'ИИ в диагностике заболеваний',
        views: '8.2K',
        time: '4 часа',
        icon: 'brain-outline',
        color: '#34C759'
    },
    {
        id: 3,
        title: 'Прорыв в вакцинологии',
        views: '6.7K',
        time: '6 часов',
        icon: 'medical-outline',
        color: '#FF9500'
    }
]

export default function PopularToday() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <YStack space="$3">
            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                Популярное сегодня
            </Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: isMobile ? 0 : 8,
                }}
            >
                <XStack space="$3">
                    {popularArticles.map((article) => (
                        <Card
                            key={article.id}
                            backgroundColor="#fff"
                            borderRadius="$5"
                            padding={isMobile ? "$3" : "$4"}
                            bordered
                            borderColor="$gray4"
                            pressStyle={{ scale: 0.98 }}
                            width={isMobile ? 280 : 320}
                        >
                            <YStack space="$3">
                                <XStack space="$3" alignItems="center">
                                    <YStack
                                        width={isMobile ? 48 : 56}
                                        height={isMobile ? 48 : 56}
                                        backgroundColor={article.color + '15'}
                                        borderRadius="$4"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Ionicons 
                                            name={article.icon as any} 
                                            size={isMobile ? 24 : 28} 
                                            color={article.color} 
                                        />
                                    </YStack>

                                    <YStack flex={1}>
                                        <Text 
                                            fontSize={isMobile ? "$3" : "$4"} 
                                            fontWeight="700" 
                                            color="#1C1C1E"
                                            numberOfLines={2}
                                        >
                                            {article.title}
                                        </Text>
                                    </YStack>
                                </XStack>

                                <XStack justifyContent="space-between" alignItems="center">
                                    <XStack space="$2" alignItems="center">
                                        <Ionicons name="eye-outline" size={16} color="#6B7280" />
                                        <Text fontSize="$2" color="#6B7280">
                                            {article.views}
                                        </Text>
                                    </XStack>

                                    <XStack space="$2" alignItems="center">
                                        <Ionicons name="time-outline" size={16} color="#6B7280" />
                                        <Text fontSize="$2" color="#6B7280">
                                            {article.time}
                                        </Text>
                                    </XStack>
                                </XStack>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </ScrollView>
        </YStack>
    )
} 