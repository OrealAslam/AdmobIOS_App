import { View} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProgressIndicator = ({ calorieCount }) => {
    return (
        <View>
            <CircularProgress
                activeStrokeColor='#00CEB4'
                inActiveStrokeColor='#F3F3F3'
                value={calorieCount}
                maxValue={10000}
                radius={80}
                inActiveStrokeOpacity={0.7}
                activeStrokeWidth={20}
                inActiveStrokeWidth={20}
                progressValueStyle={{ fontWeight: '700', color: '#2E2E2E', fontSize: 27.84, fontFamily: 'Montserrat-Bold' }}
                title='Total Kcal'
                titleFontSize={11.3}
                titleStyle={{fontFamily: 'Montserrat-Regular', color: '#2E2E2E'}}
            />
        </View>
    )
}

export default ProgressIndicator;