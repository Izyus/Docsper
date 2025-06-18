import { useState } from 'react'
import { Dimensions } from 'react-native'
import { Button, ScrollView, Text, XStack } from 'tamagui'

const categories = [
    { id: 'all', name: 'Все', color: '#007AFF' },
    { id: 'medicine', name: 'Медицина', color: '#34C759' },
    { id: 'research', name: 'Исследования', color: '#FF9500' },
    { id: 'technology', name: 'Технологии', color: '#5856D6' },
    { id: 'society', name: 'Общество', color: '#FF2D55' },
    { id: 'education', name: 'Образование', color: '#AF52DE' },
]

export default function CategorySwitcher() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: isMobile ? 0 : 8,
            }}
        >
            <XStack space="$2">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        size="$3"
                        backgroundColor={selectedCategory === category.id ? category.color : '$gray2'}
                        pressStyle={{ scale: 0.96 }}
                        onPress={() => setSelectedCategory(category.id)}
                    >
                        <Text 
                            fontSize={isMobile ? "$2" : "$3"} 
                            color={selectedCategory === category.id ? '#fff' : '#1C1C1E'}
                            fontWeight="600"
                        >
                            {category.name}
                        </Text>
                    </Button>
                ))}
            </XStack>
        </ScrollView>
    )
} 