import themeColors from "@/assets/colors";
import { Chip, LinearProgress } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

type CountdownProps = {
  endTime: Date;
};

const Countdown: React.FC<CountdownProps> = ({ endTime }) => {
  const [countdown, setCountdown] = useState("");
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(new Date());

  useEffect(() => {
    const totalDuration = endTime.getTime() - startTime.getTime();

    const updateCountdown = () => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown("00:00:00");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );

      const elapsedTime = totalDuration - difference;
      const progressPercentage = elapsedTime / totalDuration;
      setProgress(progressPercentage);
    };

    // Update the countdown immediately
    updateCountdown();

    // Then update every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [endTime]);
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Chip
        type={"solid"}
        buttonStyle={{
          backgroundColor:
            countdown === "00:00:00"
              ? themeColors.grey0
              : themeColors.secondaryShaded[500],
        }}
        titleStyle={{
          fontSize: 40,
          fontFamily: "UrbanistBold",
        }}
        title={countdown}
      />
      <LinearProgress
        style={{
          width: "100%",
          height: 10,
          borderRadius: 10,
        }}
        color={themeColors.secondaryShaded[500]}
        variant="determinate"
        value={progress}
      />
    </View>
  );
};

export default Countdown;
