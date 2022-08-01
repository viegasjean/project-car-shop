import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class FrameService implements IService<IMotorcycle> {
  private _motorcycle:IModel<IMotorcycle>;
  constructor(model:IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj:IMotorcycle):Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorcycle.create(obj);
  }

  public async readOne(_id:string):Promise<IMotorcycle> {
    const frame = await this._motorcycle.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async read():Promise<IMotorcycle[]> {
    const frame = await this._motorcycle.read();
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async update(_id:string, obj:IMotorcycle):Promise<IMotorcycle | null> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._motorcycle.update(_id, obj);
  }

  public async delete(_id:string):Promise<IMotorcycle | null> {
    await this.readOne(_id);
    return this._motorcycle.delete(_id);
  }
}

export default FrameService;