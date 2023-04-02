import React from 'react';
import { faker } from '@faker-js/faker';

const Card = ({ driver, start, end, fee, rating }: any) => {
  return (
    <div className="card">
      <div className="header">
        <h2>{driver}</h2>
        <div className="rating">{rating} stars</div>
      </div>
      <div className="body">
        <div className="destination">
          <div className="start">{start}</div>
          <div className="end">{end}</div>
        </div>
        <div className="fee">${fee}</div>
      </div>
    </div>
  );
};

export const Dummy = () => {
  const drivers = [];
  for (let i = 0; i < 10; i++) {
    const driver = {
      name: faker.name.fullName(),
      start: faker.address.city(),
      end: faker.address.city(),
      fee: faker.finance.amount(),
      rating: faker.random.numeric(5),
    };
    drivers.push(driver);
  }

  return (
    <div className="app">
      {drivers.map((driver, index) => (
        <Card
          key={index}
          driver={driver.name}
          start={driver.start}
          end={driver.end}
          fee={driver.fee}
          rating={driver.rating}
        />
      ))}
    </div>
  );
};
