import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Most external View
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },

  containerShort: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
  },

  // ------ Headings -------
  h1: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
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
    //flex: 1,
    width: "20%",
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ------ Images ------
  // Icon sizing
  icon: {
    width: 50,
    height: 70,
  },

  // Larger image
  image: {
    margin: 20,
    marginTop: 0,
    resizeMode: "contain",
    width: 300,
  },

  // Images in creator screen list
  listImage: {
    width: 80,
    height: 112,
  },

  // ------- Misc --------
  // Adds margin above and below
  cushion: {
    marginTop: 15,
    marginBottom: 0,
  },

  // Divider bar
  div: {
    marginTop: 15,
    marginBottom: 15,
    height: 1,
    backgroundColor: 'lightgray',
    width: '100%',
  },

  button: {
    color: '#f194ff',
  },

  inputName: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 110,
    marginRight: 30,
  },

  errorText: {
    color: 'firebrick'
  },

});