import React, { Component } from 'react';
import { StyleSheet, Button, View, Linking } from 'react-native'
import email from 'react-native-email'
import { yelloColor } from '../Components/Helper/colors';


export default class SendEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Button style={{backgroundColor:yelloColor}} title="Send Mail" onPress={this.handleEmail} />

            </View>
        )
    }

    handleEmail = () => {

        const to = ['arslan.bajwa106@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            cc: ['', ''], // string or array of email addresses
            bcc: '', // string or array of email addresses
            subject: 'Video',
            body: 'Some body right here'
        }).catch(console.error)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})