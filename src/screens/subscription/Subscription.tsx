import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import * as RNIap from 'react-native-iap';
import { Banner } from '../../Helper/AdManager';
import Packages from './component/Packages';
const { width, height } = Dimensions.get('window');

// Define the product IDs for your subscriptions (these should match your App Store Connect setup)
const itemSkus = ['pulse_weekly_trial', 'pulse_yearly_subscription'];

export default function Subscription({ navigation }: { navigation: any }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        RNIap.initConnection()
            .then(() => {
                console.log('IAP connected');
                fetchProducts();
            })
            .catch((error) => {
                console.error('IAP connection error:', error);
            });

        RNIap.endConnection();
    }, []);

    // Fetch products from the App Store
    const fetchProducts = async () => {
        try {
            const products = await RNIap.getProducts({ skus: itemSkus });
            console.log('Products', products);
            // setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.col}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                        onPress={() => navigation.navigate('HomeScreen')}
                        accessibilityLabel="Back">
                        <Image
                            style={{ width: 14, height: 14 }}
                            source={require('../../assets/images/dashboard_icons/navigate_back_new.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Subscription</Text>
                </View>
            </View>

            <View style={styles.pkgListContainer}>
                <Packages />
            </View>

            <View style={styles.bannerAd}>
                <Banner />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    bannerAd: {
        position: 'absolute',
        bottom: 0
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
        color: '#2E2E2E',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10,
    },
    pkgListContainer: {
        // backgroundColor: '#2e2e2e',
        marginTop: '20%'
    }
})