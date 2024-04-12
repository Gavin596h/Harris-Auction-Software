import React, { useState, useEffect } from "react"
import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer'

// Create styles

function Report() {
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

  const [bids, setBids] = useState([]);

  const [currentAuctionNumber, setCurrentAuctionNumber] = useState(null);

  const fetchBids = async (auctionNumber) => {
    try {
      const url = `http://localhost:3001/api/bids?auctionNumber=${9}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBids(data);
    } catch (error) {
      console.error('There was an error fetching the bids:', error);
    }
  };

  useEffect(() => {
    const auctionNumber = localStorage.getItem('currentAuctionNumber');
    setCurrentAuctionNumber(auctionNumber);
    fetchBids(auctionNumber);
  }, []);


    return (
      <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Current Bid Board</Text>
        </View>
          {bids.map((bid) => (
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

  );
}

export default Report;