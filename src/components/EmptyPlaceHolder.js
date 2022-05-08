import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function EmptyPlaceHolder({ message }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 40,
        textAlign: 'center',
        color: '#333',
        fontSize: 18,
        fontFamily: 'Barlow-Regular',
    }
})
