import { render } from '@testing-library/react-native';
import React from 'react';

import { CurrentLocation } from '@/components/atoms/icons/CurrentLocation';

describe('CurrentLocation component', () => {
  it('renders correctly with default props', async () => {
    const { getByTestId, getAllByTestId } = render(<CurrentLocation />);

    const svg = getByTestId('CurrentLocation');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);
    expect(svg.props.fill).toBe('currentColor');

    const paths = getAllByTestId('CurrentLocationPath');
    expect(paths.length).toBe(3);
    expect(paths[0].props.fill).toBeTruthy();
    expect(paths[1].props.fill).toBeTruthy();
    expect(paths[2].props.fill).toBeTruthy();
    expect(paths[0].props.d).toBe(
      'M9.00091 2.72523C9.02809 2.3119 9.38519 1.99888 9.79851 2.02606C15.7912 2.42016 20.5815 7.21147 20.974 13.2046C21.001 13.6179 20.6879 13.9749 20.2746 14.002C19.8613 14.0291 19.5042 13.7159 19.4772 13.3026C19.1339 8.06056 14.9417 3.86754 9.70008 3.52283C9.28676 3.49564 8.97373 3.13855 9.00091 2.72523Z'
    );
    expect(paths[1].props.d).toBe(
      'M7.58761 21.3864L7.97617 21.7722C8.26864 22.0625 8.74101 22.062 9.03344 21.7717L10.3787 20.4352C11.1067 19.7117 11.9466 18.8762 12.391 18.4318C14.5374 16.2854 14.5374 12.8053 12.391 10.6589C10.2446 8.51247 6.76454 8.51247 4.61812 10.6589C2.47169 12.8053 2.47169 16.2854 4.61812 18.4318C5.10235 18.916 5.94219 19.7514 6.66027 20.4651C7.01946 20.8221 7.34843 21.1489 7.58761 21.3864ZM8.49999 15.7499C7.80963 15.7499 7.24999 15.1903 7.24999 14.4999C7.24999 13.8096 7.80963 13.2499 8.49999 13.2499C9.19034 13.2499 9.74999 13.8096 9.74999 14.4999C9.74999 15.1903 9.19034 15.7499 8.49999 15.7499Z'
    );
    expect(paths[2].props.d).toBe(
      'M9.81842 5.50259C9.40588 5.46537 9.04128 5.76962 9.00406 6.18216C8.96684 6.5947 9.27109 6.9593 9.68363 6.99652C13.0318 7.29863 15.6997 9.96572 16.003 13.3135C16.0404 13.7261 16.4051 14.0302 16.8176 13.9928C17.2302 13.9554 17.5343 13.5907 17.4969 13.1782C17.1282 9.1087 13.8883 5.86982 9.81842 5.50259Z'
    );
  });

  it('renders correctly with custom props', async () => {
    const { getByTestId, getAllByTestId } = render(
      <CurrentLocation
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="#ff0000"
      />
    );

    const svg = getByTestId('CurrentLocation');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);
    // expect(svg.props.viewBox).toBe('0 0 24 24');
    expect(svg.props.fill).toBe('#ff0000');

    const paths = getAllByTestId('CurrentLocationPath');
    expect(paths.length).toBe(3);
    expect(paths[0].props.fill).toBeTruthy();
    expect(paths[1].props.fill).toBeTruthy();
    expect(paths[2].props.fill).toBeTruthy();
  });
});
