import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: 'Uno',
  year: 1992,
  color: 'red',
  status: true,
  buyValue: 20000,
  doorsQty: 4,
  seatsQty: 5,
};

const carMockWithId: ICar & { _id: string } = {
	_id: '62cf1fc6498565d94eba52cd',
  model: 'Uno',
  year: 1992,
  color: 'red',
  status: true,
  buyValue: 20000,
  doorsQty: 4,
  seatsQty: 5,
};

const carMockForChange: ICar = {
  model: 'Uno Mille',
  year: 1992,
  color: 'red',
  status: true,
  buyValue: 20000,
  doorsQty: 4,
  seatsQty: 5,
};

const carMockForChangeWithId: ICar & { _id: string } = {
	_id: '62cf1fc6498565d94eba52cd',
  model: 'Uno Mille',
  year: 1992,
  color: 'red',
  status: true,
  buyValue: 20000,
  doorsQty: 4,
  seatsQty: 5,
};

const allCarMock: ICar[] & { _id: string }[] = [
	{
    _id: '62cf1fc6498565d94eba52cd',
    model: 'Uno Mille',
    year: 1992,
    color: 'red',
    status: true,
    buyValue: 20000,
    doorsQty: 4,
    seatsQty: 5,
	},
	{
    _id: '62cf1fc6498565d94eba52cd',
    model: 'Uno Vivance',
    year: 1994,
    color: 'red',
    status: true,
    buyValue: 20000,
    doorsQty: 4,
    seatsQty: 5,
	}
];

export {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId,
  allCarMock
};
