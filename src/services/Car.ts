import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class FrameService implements IService<ICar> {
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async readOne(_id:string):Promise<ICar> {
    const frame = await this._car.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async read():Promise<ICar[]> {
    const frame = await this._car.read();
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async update(_id:string, obj:ICar):Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._car.update(_id, obj);
  }

  public async delete(_id:string):Promise<ICar | null> {
    await this.readOne(_id);
    return this._car.delete(_id);
  }
}

export default FrameService;