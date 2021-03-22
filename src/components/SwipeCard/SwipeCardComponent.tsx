import React, { useEffect, useState } from 'react'
import { 
  View,
  Animated,
  PanResponder,  
  PanResponderInstance,
  Dimensions,
  Image,
  Text
} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Users = [
  { id: "1", uri: 'https://raw.githubusercontent.com/instamobile/tinder-react-native/master/assets/1.jpg' },
  { id: "2", uri: 'https://raw.githubusercontent.com/instamobile/tinder-react-native/master/assets/2.jpg' },
  { id: "3", uri: 'https://raw.githubusercontent.com/instamobile/tinder-react-native/master/assets/3.jpg' }, 
  { id: "4", uri: 'https://raw.githubusercontent.com/instamobile/tinder-react-native/master/assets/4.jpg' },
  { id: "5", uri: 'https://raw.githubusercontent.com/instamobile/tinder-react-native/master/assets/5.jpg' },
]

export function SwipeCardComponent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [panResponder, setPanResponder] = useState<PanResponderInstance>()
  const [position, setPosition] = useState(new Animated.ValueXY())
  const [likeOpacity, setLikeOpacity] = useState<Animated.AnimatedInterpolation>()
  const [dislikeOpacity, setDislikeOpacity] = useState<Animated.AnimatedInterpolation>()
  const [nextCardOpacity , setNextCardOpacity ] = useState<Animated.AnimatedInterpolation>()
  const [nextCardScale , setNextCardScale] = useState<Animated.AnimatedInterpolation>()
  useEffect(() => {
    setPanResponder(PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy })
      }
    }))
  }, [])
  useEffect(() => {
    if (position) {
      setLikeOpacity(position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
      }))
      setDislikeOpacity(position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
      }))
      setNextCardOpacity(position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
      }))
      setNextCardScale(position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
      }))
    }
  }, [position])
  const renderUsers = () => {
    return Users.map((item, i) => {
      if (i < currentIndex) {
        return null
      } else if (currentIndex === i) {
        return (
          <Animated.View>
            <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>
            <Image 
              style={{ flex: 1, resizeMode: 'cover', borderRadius: 20 }}
              source={{ uri : item.uri }} />
          </Animated.View>
        )
      } else if (!nextCardScale) {
        return null
      } else {

        <Animated.View
          key={item.id} style={[{
            opacity: nextCardOpacity,
            transform: [{ scale: nextCardScale }],
            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
          }]}>
          <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

          </Animated.View>

          <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

          </Animated.View>

          <Image
            style={{ flex: 1, resizeMode: 'cover', borderRadius: 20 }}
            source={{ uri: item.uri}} />

        </Animated.View>
      }
    }).reverse()
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60, borderWidth: 1, borderColor: 'red' }}>

      </View>
      <View style={{ flex: 1, borderWidth: 1, borderColor: 'green' }}>
        {JSON.stringify(renderUsers())}
      </View>
      <View style={{ height: 60,borderWidth: 1, borderColor: 'black' }}>

      </View>


    </View>
  )
}