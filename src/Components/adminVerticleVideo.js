import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { scale, verticalScale } from '../Components/scaling'
import { Button } from 'native-base'
import yellowPlay from '../../assests/yellowPlay.png'
import { yelloColor } from './Helper/colors';
import email from 'react-native-email'
import Mystorage from '../Screens/Mystorage';

class PureRowAdmin extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { item, index, title } = this.props;
        console.log('item in render pure admin row', item)
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
                <TouchableOpacity
                    onPress={() => { this.openArticleDetail(item.videoUrl) }}
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
                        flex: 0.80,
                        marginLeft: 12,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                   
                    <View style={{ flexDirection: 'row' ,flex:1}}>
                        <View>
                            <Text style={{ fontSize: 11,color:'black', fontWeight: 'bold' }}>{'USERNAME'}</Text>
                            <Text style={{ fontSize: 11 }}>{item.username}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row' ,flex:1}}>
                        <View>
                            <Text style={{ fontSize: 11, color:'black',fontWeight: 'bold' }}>{'LOCATION'}</Text>
                            <Text style={{ fontSize: 11 }}>{item.location}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row',flex:1 }}>
                        <View>
                            <Text style={{ fontSize: 11,color:'black', fontWeight: 'bold' }}>{'DATE & TIME'}</Text>
                            <Text style={{ fontSize: 11 }}>{item.dataTime}</Text>
                        </View>

                    </View>
                </View>
            </View>
        );
    }

    openArticleDetail = (item) => {
        console.log("****TTTT", item)
        console.log()
        const { navigate } = this.props.nav;
        navigate("VideoPlayer",
            {
                videoUrl: item
            },
        );
    }

}

export default PureRowAdmin;