import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import {
    Button,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'
import BlogList from '../../components/BlogList'
import CategorySwitcher from '../../components/CategorySwitcher'
import PopularToday from '../../components/PopularToday'
import RecentComments from '../../components/RecentComments'
import TabHeader from '../../components/ui/TabHeader'

export default function NewsPage() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <ScrollView backgroundColor="#f8f9fa">
            <YStack px={isMobile ? "$3" : "$4"} py="$4" space="$5" pb="$8">
                <TabHeader 
                    icon="newspaper"
                    title="Новости и статьи"
                    subtitle="Актуальные новости из мира медицины"
                    accentColor="#007AFF"
                    stats={[
                        {
                            value: "1,234",
                            label: "Статей",
                            color: "#007AFF"
                        },
                        {
                            value: "5,678",
                            label: "Читателей",
                            color: "#34C759"
                        },
                        {
                            value: "98%",
                            label: "Точность",
                            color: "#FF9500"
                        }
                    ]}
                />

                {/* 🔝 Сначала категории */}
                <CategorySwitcher />

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

                    <BlogList />
                </YStack>
            </YStack>
        </ScrollView>
    )
}