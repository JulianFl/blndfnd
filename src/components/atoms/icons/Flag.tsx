import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FlagProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function Flag({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = '#000',
}: FlagProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} testID="Flag">
      <Path
        testID="FlagPath"
        d="M3 3.74707C3 3.33286 3.33579 2.99707 3.75 2.99707H20.2541C20.8722 2.99707 21.225 3.70272 20.8541 4.19713L16.6898 9.74829L20.8541 15.2995C21.225 15.7939 20.8722 16.4995 20.2541 16.4995L4.5 16.4991V21.2489C4.5 21.6286 4.21785 21.9424 3.85177 21.9921L3.75 21.9989C3.3703 21.9989 3.05651 21.7167 3.00685 21.3507L3 21.2489V3.74707Z"
        fill={fill}
      />
    </Svg>
  );
}
