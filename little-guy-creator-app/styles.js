import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export const styles = StyleSheet.create({
  // Most external View
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },

  // ------ Headings -------
  h1: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
  },

  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  bold: {
    fontWeight: 'bold',
  },

  // Text center
  tcenter: {
    textAlign: 'center',
  },


  // ------ Table -------
  // Container for a single row of a table
  table: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },

  // Cell of the above table
  cell: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ------- Misc --------
  // Adds margin above and below
  cushion: {
    marginTop: 25,
    marginBottom: 10,
  },

  // Icon sizing
  icon: {
    width: 50,
    height: 70,
  },

  // Divider bar
  div: {
    marginTop: 25,
    marginBottom: 25,
    height: 1,
    backgroundColor: 'lightgray',
    width: '100%',
  },


});