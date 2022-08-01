import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
// import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { allCarMock, carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'update').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null)
			.onCall(2).resolves(carMockWithId)
			.onCall(3).resolves(carMockWithId);
		sinon.stub(carModel, 'read').resolves(allCarMock);
		sinon.stub(carModel, 'delete').resolves(carMockWithId);
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});
		it('Failure', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error:any) {
				// expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Update Car', () => {
		it('Success', async () => {
		  const cars = await carService.update('62cf1fc6498565d94eba52cd', carMock);
		  expect(cars).to.be.deep.equal(carMockWithId);
		});
	});

	describe('Read All Cars', () => {
		it('Success', async () => {
			const cars = await carService.read();

			expect(cars).to.be.deep.equal(allCarMock);
		});
	});

	describe('Delete Car', () => {
		it('Success', async () => {
		  const carDeleted = await carService.delete('62cf1fc6498565d94eba52cd');
		  expect(carDeleted).to.be.deep.equal(carMockWithId);
		});
	});
});