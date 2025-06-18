import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button, Input, XStack } from 'tamagui'
import { setQuery } from '../redux/medicinesSlice'

export default function SearchBar({ 
    onFocus, 
    onBlur, 
    showActionButtons = false 
}: { 
    onFocus?: () => void, 
    onBlur?: () => void,
    showActionButtons?: boolean 
}) {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    const onSubmit = () => {
        if (!text.trim()) return
        dispatch(setQuery(text))
        router.push('/search')
    }

    return (
        <XStack
            space="$2"
            alignItems="center"
            width="100%"
        >
            {/* Кнопка Назад */}
            <Button
                size={isMobile ? "$3" : "$4"}
                backgroundColor="#fff"
                borderRadius="$4"
                onPress={() => router.back()}
                pressStyle={{ scale: 0.96 }}
                bordered
                borderColor="$gray4"
            >
                <Ionicons name="arrow-back" size={isMobile ? 18 : 20} color="#007AFF" />
            </Button>
            
            <XStack flex={1} space="$2" alignItems="center">
                <Input
                    flex={1}
                    placeholder="Поиск лекарств..."
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={onSubmit}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    size={isMobile ? "$4" : "$5"}
                    backgroundColor="#fff"
                    borderRadius="$4"
                    borderColor="$gray4"
                    fontSize={isMobile ? "$4" : "$5"}
                    paddingHorizontal="$3"
                    paddingVertical="$2"
                />
                
                {/* Иконка микрофона */}
                <Button
                    size={isMobile ? "$3" : "$4"}
                    backgroundColor="#fff"
                    borderRadius="$4"
                    onPress={() => alert('Голосовой поиск в разработке')}
                    pressStyle={{ scale: 0.96 }}
                    bordered
                    borderColor="$gray4"
                >
                    <Ionicons name="mic-outline" size={isMobile ? 18 : 20} color="#6B7280" />
                </Button>
            </XStack>

            {/* Кнопки Лайк и Шаринг - только на страницах новостей и лекарств */}
            {showActionButtons && (
                <XStack space="$2">
                    <Button
                        size={isMobile ? "$3" : "$4"}
                        backgroundColor="#fff"
                        borderRadius="$4"
                        onPress={() => alert('Добавлено в избранное')}
                        pressStyle={{ scale: 0.96 }}
                        bordered
                        borderColor="$gray4"
                    >
                        <Ionicons name="heart-outline" size={isMobile ? 18 : 20} color="#FF3B30" />
                    </Button>

                    <Button
                        size={isMobile ? "$3" : "$4"}
                        backgroundColor="#fff"
                        borderRadius="$4"
                        onPress={() => alert('Поделиться')}
                        pressStyle={{ scale: 0.96 }}
                        bordered
                        borderColor="$gray4"
                    >
                        <Ionicons name="share-outline" size={isMobile ? 18 : 20} color="#6B7280" />
                    </Button>
                </XStack>
            )}
        </XStack>
    )
}