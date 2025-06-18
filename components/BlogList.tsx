import { Dimensions } from 'react-native'
import { XStack, YStack } from 'tamagui'
import { blogPosts } from '../data/blog'
import BlogCard from './BlogCard'

export default function BlogList() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return isMobile ? (
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
    )
}