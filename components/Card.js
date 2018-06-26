import React  from 'react';
import { Text, View} from 'react-native';
const  Card=(props)=>{
    return(
        <View style={styles.container}>
            {props.children}
        </View>
    );
}
const styles={
    container:{
        borderWidth: 1,
        borderRadius:2,
        borderColor:'#ddd',
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
}
export default Card;