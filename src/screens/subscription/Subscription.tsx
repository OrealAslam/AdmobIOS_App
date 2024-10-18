import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Image, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as RNIap from 'react-native-iap';
import Packages from './component/Packages';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

const IMG_WIDTH = width - 15;
const IMG_RATIO = IMG_WIDTH / 1608;

// Define the product IDs for your subscriptions (these should match your App Store Connect setup)
const itemSkus = ['pulse_weekly_trial', 'pulse_yearly_subscription'];

export default function Subscription({ navigation }: { navigation: any }) {
    const [products, setProducts] = useState([]);
    const [availablePurchase, setavailablePurchase] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [packageId, setpackageId] = useState('pulse_yearly_subscription');

    // Fetch products from the App Store
    const fetchProducts = async () => {
        try {
            const products = await RNIap.getProducts({ skus: itemSkus });
            if (products) {
                setProducts(products);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        // const fetchAvailablePurchases = async () => {
        //     try {
        //         // Initialize the IAP connection
        //         await RNIap.initConnection();
        //         console.log('IAP connection initialized');

        //         // Get all available purchases
        //         const availablePurchases = await RNIap.getAvailablePurchases();

        //         // Log the available purchases to inspect the data
        //         console.log('Available Purchases:', availablePurchases);

        //         // Set the retrieved purchases to the state
        //         setPurchases(availablePurchases);
        //         setLoading(false);
        //     } catch (error) {
        //         console.error('Error fetching available purchases:', error);
        //         Alert.alert('Error', 'Could not retrieve available purchases');
        //         setLoading(false);
        //     } finally {
        //         // End the IAP connection after completing the process
        //         await RNIap.endConnection();
        //     }
        // };
        fetchProducts();
        // fetchAvailablePurchases();

        // Cleanup function to end connection on component unmount
        return () => {
            RNIap.endConnection();
        };
    }, []);

    // Make the purchase
    const purchaseSubscription = async (productId: any) => {
        // console.log(productId)
        try {
            const purchase = await RNIap.requestSubscription(productId);
            console.log('Subscription successful: ', purchase);
            Alert.alert('Purchase Successful', `You have subscribed to ${productId}`);
        } catch (err) {
            if(err instanceof RNIap.PurchaseError) {
                console.log(`error code : ${err.code}, Message: ${err.message} `)
            }
            console.warn('error while purchasing subscription', err);
            Alert.alert('Purchase Failed', 'Something went wrong');
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Subscription</Text>
            </View>
            <ScrollView style={{ width: width, height: height * 0.82, paddingTop: 10 }}>
                <Image style={{ width: IMG_WIDTH, height: 1440 * IMG_RATIO, alignSelf: 'center', marginBottom: 10 }} source={require('../../assets/images/subscription_watermark.png')} />
                {
                    loading ? <ActivityIndicator size={'large'} /> : (
                        <>
                            <View style={styles.pkgListContainer}>
                                <Packages products={products} setpackageId={setpackageId} />
                            </View>
                            {products.length > 0 && (<LinearGradient onTouchEnd={() => { purchaseSubscription(packageId) }} colors={['#FF9C55', '#FF9B20']} style={styles.btn} start={{ x: 0, y: 0 }}
                                end={{ x: 2, y: 2 }}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </LinearGradient>)}
                        </>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#F8FFF8'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        verticalAlign: 'middle',
        paddingTop: 25,
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    col: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        color: '#241B5B',
        fontSize: 26,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10,
    },
    pkgListContainer: {
        // marginTop: '20%'
    },
    btn: {
        width: width * 0.92,
        paddingVertical: 20,
        borderRadius: 35,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff', fontSize: 16, fontFamily: 'Raleway-ExtraBold', textAlign: 'center'
    },
})