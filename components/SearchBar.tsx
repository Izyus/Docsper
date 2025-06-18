import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button, Input, XStack } from 'tamagui'
import { setQuery } from '../redux/medicinesSlice'

export default function SearchBar() {
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
            px={isMobile ? "$2" : "$3"}
            py="$2"
            mx={isMobile ? "$2" : "$4"}
            my="$2"
            borderRadius={isMobile ? 8 : 12}
            bg="$gray2"
        >
            <Ionicons name="search" size={isMobile ? 18 : 20} color="#666" />

            <Input
                flex={1}
                placeholder="Поиск лекарства"
                value={text}
                onChangeText={setText}
                onSubmitEditing={onSubmit}
                returnKeyType="search"
                fontSize={isMobile ? "$3" : "$4"}
                borderWidth={0}
                bg="transparent"
                placeholderTextColor="#999"
            />

            <Button
                chromeless
                onPress={() => {
                    alert('Голосовой поиск в разработке')
                }}
                size={isMobile ? "$2" : "$3"}
            >
                <Ionicons name="mic-outline" size={isMobile ? 18 : 20} color="#666" />
            </Button>
        </XStack>
    )
}