import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class FrameService implements IService<ICar> {
  private _frame:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._frame = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._frame.create(obj);
  }

  public async readOne(_id:string):Promise<ICar> {
    const frame = await this._frame.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async read():Promise<ICar[]> {
    const frame = await this._frame.read();
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async update(_id:string, obj:ICar):Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._frame.update(_id, obj);
  }

  public async delete(_id:string):Promise<ICar | null> {
    await this.readOne(_id);
    return this._frame.delete(_id);
  }
}

export default FrameService;