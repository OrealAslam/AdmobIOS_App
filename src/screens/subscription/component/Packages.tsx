import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Packages(props: any) {
    const [checked, setchecked] = useState('Yearly');

    const displayPackages = () => {
        // console.log(props.products)
        let list = props.products.map((item: any, index: any) => {
            let duration = item.title.split("Pulse - ").pop();
            duration = duration.split(" ");
            return (
                <TouchableOpacity disabled={props.checkdisable()} onPress={() => choosepackage(item)} style={styles.pkgBtn} key={index}>
                    <Text style={styles.cutText}>$5.99/{duration[0]}</Text>
                    <Text style={styles.origText}>{item.localizedPrice}/{duration[0]}</Text>
                    <Image style={{ width: 24, height: 24, marginTop: 20 }} source={duration[0] == checked ? require('../../../assets/icons/radio_checked.png') : require('../../../assets/icons/radio_unchecked.png')} />
                    {duration[0] == 'Yearly' ? (<LinearGradient colors={['#7ADC57', '#5DC983']} style={styles.offerBadge} start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 2 }}>
                        <Text style={{color: '#fff', fontSize: 8, fontWeight: '500'}}>50% OFF</Text>
                    </LinearGradient>): null}
                </TouchableOpacity>
            )
        });
        return list.reverse();
    }

    const choosepackage = (pkg: any) => {
        let duration = pkg.title.split("Pulse - ").pop();
        duration = duration.split(" ");
        setchecked(duration[0]);
        props.setpackageId(pkg.productId)
    }

    return (
        <>
            <View style={styles.pkgContainer}>
                {displayPackages()}
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    pkgContainer: {
        width: width * 0.75,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pkgBtn: {
        alignSelf: 'center',
        marginVertical: 14,
        borderWidth: 3,
        borderColor: '#C9E9BC',
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 14,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
    },
    cutText: {
        fontSize: 11,
        color: '#A9BEAD',
        textDecorationLine: 'line-through'
    },
    origText: {
        fontSize: 14,
        color: '#A9BEAD',
        fontWeight: '500',
        marginTop: 7
    },
    offerBadge: {
        position: 'absolute',
        top: -20,
        right: -15,
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 7
    }
});