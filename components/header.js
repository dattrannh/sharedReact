import React from 'react';
import { Text, View} from 'react-native';

const Header = (props)=>{
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </View>
    );
}
const styles= {
    viewStyle :{
        backgroundColor: '#9C27B0',
        height:56,
        justifyContent: 'center',
        alignItems: 'center',
        elevation :4,
        shadowColor: '#9C27B0',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0,height:2},
    },
    // elevationLow: {
    //     ...Platform.select({
    //         ios: {
    //             shadowColor: '#000',
    //             shadowOffset: { width: 0, height: 2 },
    //             shadowOpacity: 0.8,
    //             shadowRadius: 2,
    //         },
    //         android: {
    //             elevation: 5,
    //         },
    //     }),
    // },
    textStyle :{
        fontSize :20,
        color:'white'
    }
};
export default Header;