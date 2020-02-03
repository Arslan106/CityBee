import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { scale, verticalScale } from '../Components/scaling'
import { Button } from 'native-base'
import yellowPlay from '../../assests/yellowPlay.png'
import { yelloColor } from './Helper/colors';
import email from 'react-native-email'
import Mystorage from '../Screens/Mystorage';

class PureRow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            findingIndex:[],
            lastVideo:''

        };
    }

    handleDelete = (_item, _index) => {
        // console.log('here i amasdasdasd ', _item)
        new Mystorage().getVideo().then((resp) => {
            let data = JSON.parse(resp);
            data.splice(_index, 1)
            // console.log('sdfasdfasdfasdf', data)
            // new Mystorage().AddVideo(data)

        })
        this.props.handleStateDelete(_item , _index)
    }

    render() {
        
        // let videoFlag = false
        const { item, index,lastItem, title, } = this.props
       
        console.log('last item',lastItem)
        return (
            <View
                activeOpacity={0.9}
                key={index}
                style={{
                    flexDirection: "row",
                    backgroundColor: '#fff',
                    marginLeft: 8,
                    marginRight: 8,
                    marginTop: 3,
                    marginBottom: verticalScale(12),
                    borderRadius: 4,
                    padding: 8
                    // alignItems: "center"
                }} >
                    <View style={{position: 'absolute',zIndex:2,borderRadius:5, borderColor:'white',borderWidth:1, backgroundColor:yelloColor,width:scale(70),justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'black',fontWeight:'bold'}}>{ item.data == lastItem ? 'New' : 'Pervious'}</Text>
                    </View>
                <TouchableOpacity
                    onPress={() => { this.openArticleDetail(item.data) }}
                    style={{ flex: 0.50 }}>
                    <Image
                        source={yellowPlay}
                        style={{
                            flex: 0.50,
                            width: "100%",
                            height: 120,
                            borderWidth: 0.75,
                            borderColor: "#CCCCCC"
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flex: 0.50,
                        marginLeft: 12,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        // onPress={this.handleEmail}
                        onPress={() => this.props.nav.navigate('UploadVideo',{VideoLink:item})}
                        full style={{ backgroundColor: yelloColor, borderRadius: 10, }}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}> Send Video </Text>
                    </Button>
                    <Button
                        onPress={() => this.handleDelete(item, index)}
                        full style={{ backgroundColor: yelloColor, borderRadius: 10, }}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}> Delete </Text>
                    </Button>

                </View>
            </View>
        );
    }

    openArticleDetail = (item) => {

        console.log('item is ',item)
        const { navigate } = this.props.nav;
        navigate("VideoPlayer",
            {
                videoUrl: item
            },
        );
    }
}

export default PureRow;