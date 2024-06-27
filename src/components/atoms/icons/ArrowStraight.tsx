import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowStraightProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function ArrowStraight({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = '#000',
}: ArrowStraightProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} testID="ArrowStraight">
      <Path
        testID="ArrowStraightPath"
        d="M7.29252 8.29327L11.2883 4.29327C11.6486 3.93262 12.2157 3.90456 12.6082 4.20931L12.7024 4.29243L16.7077 8.29243C17.0984 8.6827 17.0988 9.31586 16.7086 9.70664C16.3483 10.0674 15.7811 10.0955 15.3886 9.7907L15.2944 9.70757L13.001 7.417L13.001 19.0007C13.001 19.5135 12.615 19.9362 12.1176 19.9939L12.001 20.0007C11.4882 20.0007 11.0655 19.6146 11.0077 19.1173L11.001 19.0007L11.001 7.41L8.70748 9.70673C8.34719 10.0674 7.77997 10.0954 7.38752 9.79062L7.29327 9.70748C6.93259 9.34719 6.90456 8.77997 7.20938 8.38752L7.29252 8.29327L11.2883 4.29327L7.29252 8.29327Z"
        fill={fill}
      />
    </Svg>
  );
}
