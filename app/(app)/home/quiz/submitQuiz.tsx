import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";

type Props = {};

const SubmitQuiz = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const options = ["intranet", "extra-net", "structure", "hyper-net"];

  return (
    <View style={styles.container}>
      <Text>Text</Text>
      {/* <View style={styles.header}>
        <Text style={styles.questionNumber}>Question 2/3</Text>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBar} />
        </View>
      </View>
      <Text style={styles.questionText}>
        What do you call a network that includes clients, vendors, and
        suppliers?
      </Text>
      {options.map((option, index) => (
        <Button
          key={index}
          title={option}
          type={selectedOption === index ? "solid" : "outline"}
          buttonStyle={
            selectedOption === index ? styles.selectedButton : styles.button
          }
          onPress={() => setSelectedOption(index)}
        />
      ))}
      <Button
        title="Next"
        buttonStyle={styles.nextButton}
        containerStyle={styles.nextButtonContainer}
      /> */}
    </View>
  );
};

export default SubmitQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "500",
  },
  progressBarBackground: {
    height: 8,
    width: "70%",
    backgroundColor: "#C4C4C4",
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    width: "66.66%", // 2/3 of the background
    backgroundColor: "#FFD700",
    borderRadius: 4,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 25,
  },
  button: {
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 15,
  },
  selectedButton: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    paddingVertical: 15,
  },
  nextButtonContainer: {
    marginTop: 20,
  },
});
