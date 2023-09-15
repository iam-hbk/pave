import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function HomeOutlined(props: IconProps) {
  return (
    <Svg
      width={props.width ?? 26}
      height={props.height ?? 28}
      viewBox="0 0 26 28"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M21.5 26.119H4a3 3 0 01-3-3V11.323a3 3 0 011.212-2.41l8.585-6.37a3 3 0 013.539-.026l8.915 6.407a3 3 0 011.249 2.437v11.758a3 3 0 01-3 3z"
        stroke={props.color ?? "#26395B"}
        strokeWidth={2}
      />
    </Svg>
  );
}

export function HomeFilled(props: IconProps) {
  return (
    <Svg
      width={props.width ?? 26}
      height={props.height ?? 28}
      viewBox="0 0 26 28"
      fill="none"
    >
      <Path
        d="M21.5 26.119H4a3 3 0 01-3-3V11.323a3 3 0 011.212-2.41l8.585-6.37a3 3 0 013.539-.026l8.915 6.407a3 3 0 011.249 2.437v11.758a3 3 0 01-3 3z"
        fill={props.color ?? "#26395B"}
        stroke={props.color ?? "#26395B"}
        strokeWidth={2}
      />
    </Svg>
  );
}

export function UserFilled(props: IconProps) {
  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 28}
      viewBox="0 0 24 28"
      fill="none"
    >
      <Path
        d="M17.857 6.857a5.857 5.857 0 11-11.714 0 5.857 5.857 0 1111.714 0zM12 17.286c1.463 0 2.857-.31 4.118-.857h.682c3.423 0 6.2 2.777 6.2 6.2v2.228c0 .867-.704 1.572-1.571 1.572H2.57A1.572 1.572 0 011 24.857V22.63c0-3.423 2.777-6.2 6.2-6.2h.682a10.34 10.34 0 004.118.857z"
        fill={props.color ?? "#26395B"}
        stroke={props.color ?? "#26395B"}
        strokeWidth={2}
      />
    </Svg>
  );
}
export function UserOutlined(props: IconProps) {
  return (
    <Svg width={24} height={28} viewBox="0 0 24 28" fill="none">
      <Path
        d="M17.857 6.857a5.857 5.857 0 11-11.714 0 5.857 5.857 0 1111.714 0zM12 17.286c1.463 0 2.857-.31 4.118-.857h.682c3.423 0 6.2 2.777 6.2 6.2v2.228c0 .867-.704 1.572-1.571 1.572H2.57A1.572 1.572 0 011 24.857V22.63c0-3.423 2.777-6.2 6.2-6.2h.682a10.34 10.34 0 004.118.857z"
        stroke={props.color ?? "#26395B"}
        strokeWidth={2}
      />
    </Svg>
  );
}
