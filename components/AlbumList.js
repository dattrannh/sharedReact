import React, { Component } from 'react';
import { Text, View} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail.js';
class AlbumList extends Component{
    state={album :[]};
    componentWillMount(){
        var url='https://rallycoding.herokuapp.com/api/music_albums';
        axios.get(url).then(response=>this.setState({album :response.data}));
        // console.log('how are you, Good afternoon. I love you love ');
    }
    renderAlbums(){
        return this.state.album.map(data=><AlbumDetail name={data.title}/>);
    }
    render() {
        console.log(this.state.album);
        return (
        <View>
            {this.renderAlbums()}
        </View>
        );
    }
}
export default AlbumList;
