import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import {
  allCarMock, carMock, carMockForChange,
  carMockForChangeWithId, carMockWithId
} from '../../mocks/carMock';

describe('Car Model', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
		sinon.stub(Model, 'find').resolves(allCarMock);
		sinon.stub(Model, 'findByIdAndRemove').resolves(carMockForChangeWithId);
	});

	after(() => {
		sinon.restore();
	})

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('changing a car', () => {
		it('successfully changed', async () => {
			const carsChanged = await carModel.update('62cf1fc6498565d94eba52cd', carMockForChange);
			expect(carsChanged).to.be.deep.equal(carMockForChangeWithId);
		});

		it('_id not found to change', async () => {
			try {
				await carModel.update('123ERRADO', carMockForChange);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('searching all cars', () => {
		it('successfully found all cars', async () => {
			const carFound = await carModel.read();
			expect(carFound).to.be.deep.equal(allCarMock);
		});
	});

	describe('removing a car', () => {
		it('successfully removed', async () => {
			const carsChanged = await carModel.delete('62cf1fc6498565d94eba52cd');
			expect(carsChanged).to.be.deep.equal(carMockForChangeWithId);
		});

		it('_id not found to remove', async () => {
			try {
				await carModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});


});
