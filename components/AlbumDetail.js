import React from 'react';
import {Text, View} from 'react-native';
import Card from './Card';

const AlbumDetail = (props) => {
    return (
        <View>
            <Card>
                <Text>{props.name}</Text>
            </Card>
        </View>
    );
}
export default AlbumDetail;