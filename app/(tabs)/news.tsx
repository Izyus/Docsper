import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui'
import BlogCard from '../../components/BlogCard'
import CategorySwitcher from '../../components/CategorySwitcher'
import NewsHeaderBanner from '../../components/NewsHeaderBanner'
import PopularToday from '../../components/PopularToday'
import QuickStatsCard from '../../components/QuickStatsCard'
import RecentComments from '../../components/RecentComments'
import { blogPosts } from '../../data/blog'

export default function NewsPage() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <ScrollView backgroundColor="#fff">
            <YStack px={isMobile ? "$3" : "$4"} py="$4" space="$5" pb="$24">
                {/* 🔝 Сначала категории */}
                <CategorySwitcher />

                {/* 🎨 Градиентный баннер */}
                <NewsHeaderBanner />

                {/* 📊 Быстрая статистика */}
                <QuickStatsCard />

                {/* 🔥 Популярное сегодня */}
                <PopularToday />

                {/* 💬 Последние комментарии */}
                <RecentComments />

                {/* 📰 Все статьи блога */}
                <YStack space="$4">
                    <XStack alignItems="center" justifyContent="space-between">
                        <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                            Все статьи
                        </Text>
                        <Button
                            size="$2"
                            backgroundColor="transparent"
                            pressStyle={{ scale: 0.96 }}
                        >
                            <XStack alignItems="center" space="$1">
                                <Text fontSize="$3" color="#007AFF" fontWeight="600">Фильтры</Text>
                                <Ionicons name="options-outline" size={16} color="#007AFF" />
                            </XStack>
                        </Button>
                    </XStack>

                    {isMobile ? (
                        // На мобильных - одна карточка в столбец
                        <YStack space="$4">
                            {blogPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </YStack>
                    ) : (
                        // На больших экранах - две в ряд
                        <XStack flexWrap="wrap" justifyContent="space-between" space="$4">
                            {blogPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </XStack>
                    )}
                </YStack>
            </YStack>
        </ScrollView>
    )
}