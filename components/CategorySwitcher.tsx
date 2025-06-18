import { ScrollView, Text, XStack, YStack } from 'tamagui'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'

const mockCategories = [
    'Все',
    'Новинки',
    'Исследования',
    'Здоровье',
    'Регуляция',
    'Рынок',
    'COVID',
    'Педиатрия',
    'Онкология',
]

export default function CategorySwitcher() {
    const [selected, setSelected] = useState('Все')

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} px="$4" py="$2">
            <XStack space="$5" alignItems="center">
                {mockCategories.map((cat) => {
                    const isActive = selected === cat
                    return (
                        <TouchableOpacity key={cat} onPress={() => setSelected(cat)}>
                            <YStack alignItems="center">
                                <Text
                                    fontSize="$4"
                                    fontWeight={isActive ? '700' : '400'}
                                    color="#1C1C1E"
                                >
                                    {cat}
                                </Text>
                                {isActive && (
                                    <XStack
                                        mt="$1"
                                        height={2}
                                        borderRadius={999}
                                        width="100%"
                                        backgroundColor="#0A84FF"
                                    />
                                )}
                            </YStack>
                        </TouchableOpacity>
                    )
                })}
            </XStack>
        </ScrollView>
    )
}