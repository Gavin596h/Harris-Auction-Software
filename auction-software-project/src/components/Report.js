import React, { useState } from "react"
import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });


const Report = ({bids}) => (
    <>
    <button></button>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Current Bid Board</Text>
        </View>
          {bids.map?.((bid) => (
            <View>
              <Text>{bid.Bidder}</Text>
              <Text>{bid.BidAmount}</Text>
              <Text>{bid.ToLead}</Text>
              <Text>{bid.PerAcre}</Text>
              <Text>{bid.High ? 'Yes' : 'No'}</Text>
              <Text>{bid.Bidder}</Text>
              <Text>{bid.Tract}</Text> 
          </View>
         ))}
      </Page>
    </Document>
    
    </>
  );

  export default Report;