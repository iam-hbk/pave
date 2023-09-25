import themeColors from "@/assets/colors";
import { Chip } from "@rneui/themed";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

type CountdownProps = {
  endTime: Date;
};

const Countdown: React.FC<CountdownProps> = ({ endTime }) => {
  const [countdown, setCountdown] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = new Date();
    const totalDuration = endTime.getTime() - startTime.getTime();

    const updateCountdown = () => {
      const now = new Date();
      if (endTime.getTime() <= now.getTime()) {
        setCountdown("00:00:00");
        setProgress(100);
        return;
      }

      let difference = endTime.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown("Time's up!");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      difference -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(difference / (1000 * 60));
      difference -= minutes * (1000 * 60);

      const seconds = Math.floor(difference / 1000);

      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
      const elapsedTime = totalDuration - difference;
      const progressPercentage = (elapsedTime / totalDuration) * 100;
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
    <View>
      <CircularProgressBase
        value={progress} // Use progress directly
        radius={120}
        maxValue={100} // Set maxValue to 100 for percentage
        initialValue={0} // Start from 0
        clockwise={false} // Default
        activeStrokeWidth={15}
        inActiveStrokeWidth={15}
        activeStrokeColor={"#f39c12"}
        inActiveStrokeColor={"#9b59b6"}
        inActiveStrokeOpacity={0.5}
        //   inActiveStrokeWidth={40}
        //   activeStrokeWidth={20}
        duration={1000} // Set duration to 1000 for 1 second
        onAnimationComplete={() => {
          if (countdown === "00:00:00") {
            alert("time out");
          }
        }}
      >
        <Chip
          type={"solid"}
          buttonStyle={{
            backgroundColor:
              countdown === "00:00:00"
                ? themeColors.grey0
                : themeColors.secondaryShaded[300],
          }}
          titleStyle={{
            fontSize: 40,
            fontFamily: "UrbanistBold",
          }}
          title={countdown}
        />
      </CircularProgressBase>
    </View>
  );
};

export default Countdown;
