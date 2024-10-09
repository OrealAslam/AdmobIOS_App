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
  AdBadge,
} from 'react-native-admob-native-ads';

export const NativeAd150 = React.memo(props => {
  const nativeAdViewRef = useRef(NativeAdView);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      ref={nativeAdViewRef}
      adUnitID={props.adId}
      style={{
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
      }}
      adChoicesPlacement="topRight"
      mediaAspectRatio="any"
      onAdFailedToLoad={e => console.log('Native Ad error', e)}
      videoOptions={{
        customControlsRequested: true,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 13,
          padding: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexGrow: 1,
              flexShrink: 1,
              paddingHorizontal: 6,
            }}>
            <HeadlineView
              style={{
                fontWeight: '800',
                fontSize: 18,
                color: '#000',
                textAlign: 'center',
              }}
            />
            <TaglineView
              numberOfLines={2}
              style={{
                fontSize: 12,
              }}
            />
            <AdvertiserView
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            />
          </View>
        </View>
        <IconView
          style={{
            width: 60,
            height: 60,
            marginVertical: 20,
          }}
        />
        <AdBadge
          style={{
            backgroundColor: '#3980FF',
            width: 21,
            height: 19,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '10%',
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            borderWidth: 0,
          }}
          textStyle={{color: '#fff'}}
        />
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            borderRadius: 13,
            marginTop: 10,
            backgroundColor: `rgba(0, 159,139, 0.7)`,
          }}>
          <CallToActionView
            style={{
              width: 300,
              minHeight: 45,
              paddingHorizontal: 12,
              alignSelf: 'center',
              backgroundColor: 'transparent',
            }}
            allCaps
            textStyle={{
              fontSize: 19,
              flexWrap: 'wrap',
              textAlign: 'center',
              textTransform: 'capitalize',
              color: '#fff',
              fontFamily: 'Roboto Light',
            }}
          />
        </View>
      </View>
    </NativeAdView>
  );
});
