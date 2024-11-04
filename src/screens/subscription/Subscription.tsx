import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Image, Text, ScrollView, Alert, ActivityIndicator, TouchableOpacity, NativeModules } from 'react-native';
import * as RNIap from 'react-native-iap';
import Packages from './component/Packages';
import LinearGradient from 'react-native-linear-gradient';
import { set_async_data } from '../../Helper/AppHelper';
const { width, height } = Dimensions.get('window');

const IMG_WIDTH = width - 15;
const IMG_RATIO = IMG_WIDTH / 1608;

// Define the product IDs for your subscriptions (these should match your App Store Connect setup)
const itemSkus = ['pulse_weekly_trial', 'pulse_yearly_subscription'];

export default function Subscription({ navigation }: { navigation: any }) {
    const [products, setProducts] = useState([]);
    // const [availablePurchase, setavailablePurchase] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purchaseLoader, setpurchaseLoader] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [packageId, setpackageId] = useState('pulse_yearly_subscription');

    // Fetch products from the App Store
    const fetchProducts = async () => {
        try {
            const products = await RNIap.getProducts({ skus: itemSkus });
            // console.log(products);
            if (products) {
                setProducts(products);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchProducts();
        return () => {
            RNIap.endConnection();
            setpurchaseLoader(false);
        };
    }, []);

    // Make the purchase
    const purchaseSubscription = async (productId: any) => {
        console.log(productId);
        try {
            // Initialize the connection
            const connected = await RNIap.initConnection();
            if (!connected) {
                Alert.alert('Connection Error', 'Unable to connect to the store.');
                return;
            }
            setpurchaseLoader(true);
    
            // Request the subscription
            const purchase = await RNIap.requestSubscription({ sku: productId });
            
            // Handle successful purchase
            if (purchase) {
                console.log(purchase)
                Alert.alert('Purchase Successful', `You have subscribed to ${productId}`);
                await set_async_data('subscription', purchase);
            }
        } catch (err) {
            // Handle errors more gracefully
            if (err && typeof err === 'object' && 'code' in err) {
                console.log(`Error code: ${err.code}, Message: ${err}`);
            } else {
                console.warn('Unexpected error format:', err);
            }
            console.log(err)
            Alert.alert('Purchase Failed', 'Something went wrong', err);
        } finally {
            // Close the connection and reset loader
            setpurchaseLoader(false);
            await RNIap.endConnection();
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('CheckSubscription')}>
                    <Text style={styles.heading}>Subscription</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: width, height: height * 0.82, paddingTop: 10 }}>
                <Image style={{ width: IMG_WIDTH, height: 1440 * IMG_RATIO, alignSelf: 'center', marginBottom: 10 }} source={require('../../assets/images/subscription_watermark.png')} />
                {
                    loading ? <ActivityIndicator size={'large'} /> : (
                        <>
                            <View style={styles.pkgListContainer}>
                                <Packages products={products} setpackageId={setpackageId} />
                            </View>
                            {products.length > 0 && purchaseLoader != true ? (<LinearGradient onTouchEnd={() => { purchaseSubscription(packageId) }} colors={['#FF9C55', '#FF9B20']} style={styles.btn} start={{ x: 0, y: 0 }}
                                end={{ x: 2, y: 2 }}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </LinearGradient>) : (<ActivityIndicator size={'large'} />)}
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