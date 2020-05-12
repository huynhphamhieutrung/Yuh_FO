import {BaseModel} from './base.model';
import Common from '../utils/common';

export class Page extends BaseModel {
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value || null;
  }

  get projectId() {
    return this._projectId;
  }

  set projectId(value) {
    this._projectId = value || null;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value || null;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value || null;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value || null;
  }

  get imageUrl() {
    return this.image ? `${config.env.baseImageUrl}/${this.image}` : '';
  }
}
