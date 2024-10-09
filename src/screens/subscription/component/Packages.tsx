import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Packages(props: any) {
    const [checked, setchecked] = useState('');
    const packages = [{
        duartion: 'yearly',
        pricing: 'US$69.99/year'
    }, {
        duartion: 'monthly',
        pricing: 'US$16.99/month'
    }, {
        duartion: '3 days free',
        pricing: 'then US$6.99/week'
    }];

    const displayPackages = () => {
        let list = packages.map((item, index) => {
            return (
                <TouchableOpacity onPress={() => setchecked(item.duartion)} style={[styles.pkgBtn, checked == item.duartion ? { borderColor: '#009F8B' } : { borderColor: '#bfbfbf' }]} key={index}>
                    <View style={{justifyContent: 'center', width: '13%'}}>
                        {checked == item.duartion && (<Image style={styles.icon} source={require('../../../assets/icons/tickbtn.png')}/>)}
                    </View>
                    <View>
                        <Text style={[styles.title, checked == item.duartion ? { color: '#009F8B' } : { color: '#bfbfbf' }]}>{item.duartion}</Text>
                        <Text style={[styles.rate, checked == item.duartion ? { color: '#009F8B' } : { color: '#bfbfbf' }]}>{item.pricing}</Text>
                    </View>

                </TouchableOpacity>
            )
        });
        return list;
    }

    return (
        <View style={styles.pkgContainer}>
            {displayPackages()}
        </View>
    )
}
const styles = StyleSheet.create({
    pkgContainer: {
        width: width * 0.90,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pkgBtn: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 14,
        borderWidth: 3,
        // borderColor: '#009F8B',
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 4,
        flexDirection: 'row'
    },
    icon: {
        width: 18,
        height: 18
    },
    title: {
        color: '#989898',
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 3,
        textTransform: 'capitalize'
    },
    rate: {
        color: '#989898',
        fontSize: 17,
        fontWeight: '400',
        marginVertical: 5
    }
});