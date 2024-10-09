import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Platform,
  Text,
  View,
} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
  ImageView,
} from 'react-native-admob-native-ads';
import {NATIVE_AD_ID} from './AdManager';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const NativeAd100 = React.memo(() => {
  const nativeAdViewRef = useRef(NativeAdView);
  const [loaded, setLoaded] = useState(false);
  const [visible, setvisible] = useState(false);
  const [shownative, setshownative] = useState(true);

  useEffect(() => {
    // const adLoadedListener = nativeAdViewRef.current?._onAdLoaded( () => {
    //   setVisible(true);
    // });

    setTimeout(() => {
      setvisible(true);
    }, 3000);

    // Clean up event listener when component unmounts
    // return () => {
    //   adLoadedListener();
    // };
  }, []);
  useEffect(() => {
    // Load the native ad
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      ref={nativeAdViewRef}
      adUnitID={NATIVE_AD_ID}
      style={{
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
      }}
      onNativeAdLoaded={load => {
        setvisible(true);
      }}
      adChoicesPlacement="topRight"
      onAdOpened={e => console.log('open console ', e)}
      mediaAspectRatio="any"
      onAdFailedToLoad={e => {
        console.log('ad load error', e);
        setshownative(false);
      }}
      videoOptions={{
        customControlsRequested: true,
      }}>
      {shownative && (
        <View
          style={{
            width: '99%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            borderRadius: 15,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingTop: 10,
            }}>
            <View
              style={{
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ShimmerPlaceholder
                style={{width: '100%', height: 73}}
                visible={visible}
                shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
                <ImageView
                  style={{
                    width: '80%',
                    height: 73,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                  }}
                />
              </ShimmerPlaceholder>
            </View>

            <View
              style={{
                width: '46%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ShimmerPlaceholder
                visible={visible}
                style={{width: '100%', marginBottom: 10}}
                shimmerColors={['#E1E5FF', '#D3D2FE', '#e6e6fe']}>
                <TaglineView
                  numberOfLines={2}
                  style={{
                    fontSize: 11,
                    fontFamily: 'Montserrat-Light',
                    width: '100%',
                    color: '#6C6C6C',
                  }}
                />
              </ShimmerPlaceholder>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignSelf: 'flex-start',
                }}>
                <IconView style={{width: 35, height: 35}} />
              </View>
            </View>
          </View>

          {visible == false ? null : (
            <View
              style={{
                width: 18,
                height: 18,
                position: 'absolute',
                left: 0,
                top: 0,
                backgroundColor: '#3980FF',
                borderTopLeftRadius: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 10,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}>
                Ad
              </Text>
            </View>
          )}

          <View
            style={{
              width: '100%',
              backgroundColor: `rgba(0, 159,139, 0.7)`,
              alignSelf: 'center',
              borderRadius: 13,
              marginTop: 10,
              // opacity: 0.7
            }}>
            <CallToActionView
              style={{
                width: 300,
                minHeight: 50,
                paddingHorizontal: 12,
                alignSelf: 'center',
                backgroundColor: 'transparent',
              }}
              allCaps
              textStyle={{
                fontSize: 18,
                flexWrap: 'wrap',
                textAlign: 'center',
                textTransform: 'capitalize',
                color: '#fff',
                fontFamily: 'Montserrat-SemiBold',
                fontWeight: '600'
              }}
            />
          </View>
        </View>
      )}
    </NativeAdView>
  );
});
