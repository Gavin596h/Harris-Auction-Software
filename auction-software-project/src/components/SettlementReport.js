import React, { useState, useEffect } from "react"
import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer'

// Create styles

function SettlementReport() {
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


  const [currentAuctionNumber, setCurrentAuctionNumber] = useState(null);

  useEffect(() => {
    const auctionNumber = localStorage.getItem('currentAuctionNumber');
    setCurrentAuctionNumber(auctionNumber);
  }, []);


    return (
      <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Settlement Sheet</Text>
          <Text>{}</Text>
        </View>
            <View>
              <Text>{}</Text>
              <Text>{}</Text>
          </View>
      </Page>
    </Document>

  );
}

export default SettlementReport;