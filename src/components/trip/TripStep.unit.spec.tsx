import { render } from '@testing-library/react-native';
import React from 'react';

import { TripStep } from '@/components/trip/TripStep';

describe('TripStep', () => {
  const mockIcon = <div />;

  it('renders correctly with notOnRoute true', () => {
    const { getByText } = render(
      <TripStep notOnRoute icon={mockIcon} instruction="Turn right" />
    );

    expect(
      getByText(
        'Du befindest dich nicht auf der Route. Möchtest du die Route neu berechnen?'
      )
    ).toBeTruthy();
    expect(getByText('Reroute')).toBeTruthy();
    expect(getByText('Turn right')).toBeTruthy();
  });

  it('renders correctly with notOnRoute false', () => {
    const { getByText, queryByText } = render(
      <TripStep notOnRoute={false} icon={mockIcon} instruction="Turn right" />
    );

    expect(
      queryByText(
        'Du befindest dich nicht auf der Route. Möchtest du die Route neu berechnen?'
      )
    ).toBeNull();
    expect(queryByText('Reroute')).toBeNull();
    expect(getByText('Turn right')).toBeTruthy();
  });

  it('renders correctly with null instruction', () => {
    const { queryByText } = render(
      <TripStep notOnRoute icon={mockIcon} instruction={null} />
    );

    expect(queryByText('Turn right')).toBeNull();
  });

  it('renders correctly with undefined instruction', () => {
    const { queryByText } = render(
      <TripStep notOnRoute icon={mockIcon} instruction={undefined} />
    );

    expect(queryByText('Turn right')).toBeNull();
  });
});
