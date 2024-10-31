import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as RNIap from 'react-native-iap';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'

const { width, height } = Dimensions.get('window');

export default function CheckSubscription({ navigation }: { navigation: any }) {
    const [availablePurchase, setavailablePurchase] = useState([]);
    const [loader, setloader] = useState(true);
    const [text, settext] = useState('');

    const [date, setDate] = useState(new Date())


    useEffect(() => {
        setloader(false);
        (async () => {
            const purchases = await RNIap.getAvailablePurchases();
            console.log('array length', purchases.length);
            if (purchases && purchases[0].transactionDate) {
                settext('Purchased');
                console.log(purchases[0].transactionDate);
                console.log(purchases[0].productId);
                console.log(purchases[0].transactionId);
                console.log(purchases[0].transactionReceipt);

                setloader(false);
            } else {
                settext('not purchased yet')
            }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', textDecorationLine: 'underline', marginBottom: 50 }}>Available Purchase</Text>
            <View style={{ paddingHorizontal: 15 }}>
                {
                    loader == true ? (<ActivityIndicator size={'large'} />) : (<Text>{text}</Text>)
                }
            </View>

            <DatePicker date={date} onDateChange={setDate} />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#F8FFF8',
    }
});