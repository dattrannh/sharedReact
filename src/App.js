import React ,{Component}from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import PHOTOS from './data';
import { processImages, buildRows, normalizeRows } from './utils';
import PhotoGallery from './PhotoGallery';
import GridItem from './GridItem';

const maxWidth = Dimensions.get('window').width;

export default class App extends Component{
  componentWillMount() {
    const processedImages = processImages(PHOTOS);
    let rows = buildRows(processedImages, maxWidth);
    rows = normalizeRows(rows, maxWidth);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(rows)
    };
  }

  renderRow = (onPhotoOpen, row) =>
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between'
      }}
    >
      {row.map(item =>
        <GridItem item={item} key={item.id} onPhotoOpen={onPhotoOpen} />
      )}
    </View>;

  render() {
    return (
      <PhotoGallery
        renderContent={({ onPhotoOpen }) =>  
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this, onPhotoOpen)}
          /> 
          }
      />
    );
  }
}
{/* <FlatList
          data={this.state.dataSource}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={this.renderRow.bind(this, onPhotoOpen)}
        /> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
