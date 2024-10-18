import { View} from 'react-native';
import React from 'react';

import CircularProgress from 'react-native-circular-progress-indicator';

const ProgressIndicator = ({ calorieCount }) => {
    return (
        <View>
            <CircularProgress
                activeStrokeColor='#7ADC57'
                inActiveStrokeColor='#E2FFDE'
                value={calorieCount}
                maxValue={10000}
                radius={80}
                inActiveStrokeOpacity={0.7}
                activeStrokeWidth={20}
                inActiveStrokeWidth={20}
                progressValueStyle={{ fontWeight: '700', color: '#2A5B1B', fontSize: 40, fontFamily: 'Montserrat-Bold' }}
                title='Total Kcal'
                titleFontSize={11.3}
                titleStyle={{fontFamily: 'Montserrat-Regular', color: '#5E9368', fontSize: 18, fontWeight: '500'}}
            />
        </View>
    )
}

export default ProgressIndicator;