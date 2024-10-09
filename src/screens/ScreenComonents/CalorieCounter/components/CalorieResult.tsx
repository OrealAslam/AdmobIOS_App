import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { PieChart } from "react-native-gifted-charts";
const { width } = Dimensions.get('screen');

const CalorieResult = (props: any) => {
    const [totalNutrients, settotalNutrients] = useState(0);
    const [pieData, setpieData] = useState([
        { value: 54, color: '#F575D9' },
        { value: 40, color: '#66BFFF' },
        { value: 20, color: '#F5AD3D' },
        { value: 34, color: '#7D65EF' }
    ]);

    useEffect(() => {
        let total = Object.values(props.dataset).reduce((acc: any, value: any) => acc + value, 0);
        settotalNutrients(total);
        setpieData([
            { value: props.dataset.carbohydrates_total_g, color: '#F575D9' },
            { value: props.dataset.protein_g, color: '#66BFFF' },
            { value: props.dataset.fat_total_g, color: '#F5AD3D' },
            { value: props.dataset.sugar_g, color: '#7D65EF' }
        ]);
    }, []);

    const calculatePercentage = (val: any) => {
        let num = (val / totalNutrients) * 100;
        return num.toFixed(2);
    }

    const displayTable = () => {
        let jsx = <></>;
        if (props.apires.length > 0) {
            jsx = props.apires.map((item: any, index: any) => {
                return (
                    <View key={index} style={{width: width * 0.90, alignSelf: 'center', marginBottom: 15}}>
                        <Text style={styles.item}>{item.name}</Text>

                        <View style={[styles.row, {marginBottom: 0}]}>
                            <View style={styles.thead}>
                                <Text style={[styles.title, { color: '#fff', fontWeight: '800', fontSize: 14, marginLeft: '12%' }]}>Fats</Text>
                            </View>

                            <View style={styles.thead}>
                                <Text style={[styles.title, { color: '#fff', fontWeight: '800', fontSize: 14 }]}>Carbs</Text>
                            </View>

                            <View style={styles.thead}>
                                <Text style={[styles.title, { color: '#fff', fontWeight: '800', fontSize: 14 }]}>Protein</Text>
                            </View>

                            <View style={styles.thead}>
                                <Text style={[styles.title, { color: '#fff', fontWeight: '800', fontSize: 14 }]}>Calories</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.title}>{item.fat_total_g.toFixed(2)}</Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.title}>{item.carbohydrates_total_g.toFixed(2)} g</Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.title}>{calculatePercentage(item.protein_g)}g</Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.title}>{calculatePercentage(item.calories)}g</Text>
                            </View>
                        </View>
                    </View>
                )
            });
        }
        return jsx;
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    accessibilityLabel="Back"
                    onPress={() => { props.setresultview(false) }}>
                    <Image
                        style={{ width: 14, height: 14 }}
                        source={require('../../../../assets/images/dashboard_icons/navigate_back_new.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.heading}>{props.title}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical>
                <View style={styles.pieChartContainer}>
                    <PieChart
                        data={pieData}
                        radius={80}          
                        donut
                        textColor="black"
                        strokeWidth={0}
                        // innerCircleBorderWidth={70}
                        innerRadius={65}
                        animationDuration={2000}
                        isAnimated
                        showGradient
                    />
                    <View style={{ position: 'absolute', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: width * 0.28 }}>
                        <Text style={{ textAlign: 'center', fontSize: 23, fontWeight: '800' }}>{props.dataset.calories}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: '400' }}>Total Kcal</Text>
                    </View>
                </View>
                {/* <View style={styles.titlecontainer}>
                    <Text style={styles.pageTitle}>Today You have {`\n`}comsumed <Text style={{ color: '#069C8B', fontSize: 20 }}>{props.dataset.calories.toFixed(2)} cal</Text></Text>
                </View> */}

                <View style={styles.tableContainer}>
                    {displayTable()}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    heading: {
        color: '#2E2E2E',
        fontSize: 20,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 15,
    },
    titlecontainer: {
        width: width * 0.82,
        alignSelf: 'center',
        marginVertical: 15,
    },
    pageTitle: {
        color: '#2E2E2E',
        fontSize: 22,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    },
    pieChartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
    tableContainer: {
        width: width * 0.96,
        alignSelf: 'center',
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        marginBottom: 15
    },
    item: {
        fontSize: 16,
        textTransform: 'capitalize',
        marginBottom: 12,
        fontWeight: '700'
    },
    thead: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01A490',
        paddingVertical: 10
    },
    column: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        // backgroundColor: 'red',
        backgroundColor: '#EFEFEF',
        padding: 10,
        borderRightWidth: 4,
        borderRightColor: '#fff',
    },
    dotColor: {
        width: 14,
        height: 14,
        borderRadius: 50
    },
    title: {
        fontSize: 12,
        fontFamily: 'Roboto',
        fontWeight: '400',
    }
});
export default CalorieResult;