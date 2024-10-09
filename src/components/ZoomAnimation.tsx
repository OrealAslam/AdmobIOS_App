import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

function ZoomAnimation() {
  const [active, setactive] = useState(false);
  const [width, setwidth] = useState(0);
  const [height, setheight] = useState(0);
  const widthStart = new Animated.Value(350);
  const heightStart = new Animated.Value(350);

  const widthEnd = new Animated.Value(300);
  const heightEnd = new Animated.Value(300);
  const startAnimation = (
    widthFrom: any,
    widthTo: any,
    heightFrom: any,
    heightTo: any,
  ) => {
    setwidth(widthFrom);
    setheight(heightFrom);
    Animated.timing(
      widthFrom, // The animated value to drive
      {
        toValue: widthTo, // Animate to opacity: 1 (opaque)
        duration: 300, // Make it take a while
        useNativeDriver: false,
      },
    ).start(() => {
      setactive(!active);
    }); // Starts the animation
    Animated.timing(
      heightFrom, // The animated value to drive
      {
        toValue: heightTo, // Animate to opacity: 1 (opaque)
        duration: 300, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  };

  useEffect(() => {
    //   startAnimation(width, widthEnd, height, heightEnd);
    if (active) {
      startAnimation(widthStart, widthEnd, heightStart, heightEnd);
    } else {
      startAnimation(widthEnd, widthStart, heightEnd, heightStart);
    }
  }, [active]);

  return (
      <Animated.Image
        source={require('../assets/animate.png')}
        style={{
          width: width,
          height: height,
        }}
      />
  );
}
export default ZoomAnimation;