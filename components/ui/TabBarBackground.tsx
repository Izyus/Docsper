import { BlurView } from 'expo-blur'

export default function TabBarBackground() {
  return (
    <BlurView
      intensity={100}
      tint="light"
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    />
  )
}

const StyleSheet = {
  absoluteFillObject: {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
}
