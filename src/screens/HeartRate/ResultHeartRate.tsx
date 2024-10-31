import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    Linking,
    SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LineChartAdComponent from './components/LineChartAdComponent';
// import PieChartAdComponent from './components/PieChartAdComponent';
import Recomandations from '../../components/Recomandations';
import { disableAds, set_async_data } from '../../Helper/AppHelper';
import { INTERSITIAL_AD_ID, NATIVE_AD_ID_ONE } from '../../Helper/AdManager';
import { NativeAd150 } from '../../Helper/NativeAd150';
import DisplayAd from '../../components/DisplayAd';
import { lang } from '../../../global';
import PieChartAdComponent from './components/PieChartAdComponent';

const { width, height } = Dimensions.get('window');
const itemWidth = width - 80;
const ratio = itemWidth / 1140;

export default function ResultHeartRate({ navigation }: { navigation: any }) {
    const [loader, setloader] = useState(false);
    const [back, setback] = useState(false);
    const [hidead, sethidead] = useState(true);
    const [chartPercentage, setchartPercentage] = useState(8);
    const [pressurelevel, setpressurelevel] = useState('Normal');
    const [language, setlanguage] = useState({
        dashobard: { bs: '', SugarConcentration: '' },
        main: {
            date: '',
            time: '',
            systolic: '',
            diastolic: '',
            pulse: '',
            save: '',
            note: '',
            okay: '',
            cancel: '',
            Hypertension: '',
            Normal: 'Normal',
            Elevated: 'Elevated',
            HypertensionStage1: 'Hypertension-Stage 1',
            HypertensionStage2: 'Hypertension-Stage 1',
            Hypersensitive: 'Hypersensitive',
        },
        options: {
            AfterMeal: '',
            BeforeMeal: '',
            AfterSleep: '',
            Fasting: '',
            Other: '',
        },
    });
    const [langstr, setlangstr] = useState({
        dashobard: { bs: '', SugarConcentration: '' },
        main: {
            date: '',
            time: '',
            systolic: '',
            diastolic: '',
            pulse: '',
            save: '',
            note: '',
            okay: '',
            cancel: '',
            Hypertension: '',
            Normal: 'Normal',
            Elevated: 'Elevated',
            HypertensionStage1: 'Hypertension-Stage 1',
            HypertensionStage2: 'Hypertension-Stage 1',
            Hypersensitive: 'Hypersensitive',
        },
        options: {
            AfterMeal: '',
            BeforeMeal: '',
            AfterSleep: '',
            Fasting: '',
            Other: '',
        },
    });

    const showAd = async (type: any) => {
        await set_async_data('hide_ad', 'hide'); // purposly to hide tary ad
        setloader(true);
        if (type == 'line') {
            await set_async_data('line_chart_heart_ad', 'seen');
        } else {
            await set_async_data('pie_chart_heart_ad', 'seen');
        }
    };

    const _continue = async () => {
        setloader(false);
        if (back == true) {
            setback(false);
            navigation.navigate('HomeScreen', { tab: 'home' });
        } else {
            navigation.navigate('ResultHeartRate');
        }
    };

    const navigateScreen = (screenName: any) => {
        navigation.navigate(screenName, {
            tab: 'insight',
        });
    };

    useEffect(() => {
        (async () => {
            try {
                // await analytics().logEvent('add_blood_sugar_screen');
                let lan = await lang();
                let res = await disableAds();
                sethidead(res);
                setlanguage(lan);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        setlangstr(language);
    }, [language]);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    {
                        !hidead ?
                            <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
                                <Image style={{ width: 128, height: 42, resizeMode: 'contain' }} source={require('../../assets/images/premium.png')} />
                            </TouchableOpacity> : (<></>)
                    }
                </View>

                <ScrollView style={{ flex: 1 }}>
                    {/* <View style={styles.colouredBg}>
                        <TouchableOpacity
                            style={styles.ibutton}
                            onPress={() =>
                                Linking.openURL('https://medlineplus.gov/vitalsigns.html')
                            }>
                            <Image
                                style={{ width: 25, height: 20 }}
                                source={require('../../assets/images/ibutton.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>The result of your Heart Rate Level is</Text>
                        <View style={{ marginVertical: 25 }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 18,
                                    color: '#5F5F5F',
                                    marginBottom: 15,
                                }}>
                                {pressurelevel}
                            </Text>
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    width: itemWidth,
                                    height: 68 * ratio,
                                }}
                                source={require('../../assets/images/barchart.png')}
                            />
                            <Image
                                style={{
                                    width: 17,
                                    height: 14,
                                    marginLeft: 23,
                                    position: 'relative',
                                    top: 7,
                                    left: `${chartPercentage}%`,
                                }}
                                source={require('../../assets/icons/pointer.png')}
                            />
                        </View>
                    </View> */}

                    <LineChartAdComponent
                        navigation={navigation}
                        langstr={langstr}
                        showAd={showAd}
                        loader={loader}
                        hidead={hidead}
                    />
                    <View style={styles.NativeAd}>
                        {!hidead ? <NativeAd150 /> : <></>}
                    </View>
                    <PieChartAdComponent
                        navigation={navigation}
                        langstr={langstr}
                        showAd={showAd}
                        loader={loader}
                        hidead={hidead}
                    />

                    <View style={styles.recomandation}>
                        <Recomandations
                            putScreen={'HomeScreen'}
                            navigateScreen={navigateScreen}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            {loader && (
                <DisplayAd _continue={_continue} adId={INTERSITIAL_AD_ID} />
            )}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#F8FFF8',
    },
    headerContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    heading: {
        color: '#2E2E2E',
        fontSize: 20,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 15,
    },
    colouredBg: {
        width: width * 0.87,
        alignSelf: 'center',
        backgroundColor: '#F0FEF0',
        borderRadius: 12,
        paddingTop: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#C9E9BC'
    },
    title: {
        alignSelf: 'center',
        color: '#5E9368',
        fontSize: 14,
        fontFamily: 'Raleway-Medium',
    },
    NativeAd: {
        width: width * 0.87,
        alignSelf: 'center',
        backgroundColor: '#F0FEF0',
        borderRadius: 12,
        elevation: 2,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#C9E9BC'
    },
    recomandation: {
        width: width,
        marginBottom: 15,
    },
    ibutton: {
        alignSelf: 'flex-end',
        top: -9,
    },
});