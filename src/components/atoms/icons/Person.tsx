import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PersonProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function Person({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
}: PersonProps) {
  return (
    <Svg
      fill={fill}
      height={height}
      width={width}
      viewBox={viewBox}
      testID="Person"
    >
      <Path
        testID="PersonPath"
        d="M17.7543 13.9997C18.9963 13.9997 20.0032 15.0065 20.0032 16.2486V17.167C20.0032 17.7404 19.8239 18.2994 19.4906 18.7659C17.9447 20.9292 15.4204 22.0008 12.0001 22.0008C8.57915 22.0008 6.05619 20.9287 4.51403 18.7643C4.18207 18.2984 4.00366 17.7406 4.00366 17.1685V16.2486C4.00366 15.0065 5.01052 13.9997 6.25254 13.9997H17.7543ZM12.0001 2.00439C14.7615 2.00439 17.0001 4.24297 17.0001 7.00439C17.0001 9.76582 14.7615 12.0044 12.0001 12.0044C9.2387 12.0044 7.00012 9.76582 7.00012 7.00439C7.00012 4.24297 9.2387 2.00439 12.0001 2.00439Z"
        fill={fill}
      />
    </Svg>
  );
}
