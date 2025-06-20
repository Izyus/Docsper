import { BlurView } from 'expo-blur'

export default function TabBarBackground() {
  return (
    <BlurView
      intensity={95}
      tint="systemUltraThinMaterialLight"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
    />
  )
}
