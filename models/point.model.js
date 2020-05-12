import {BaseModel} from './base.model';

export class Point extends BaseModel {
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value || null;
  }

  get pageId() {
    return this._pageId;
  }

  set pageId(value) {
    this._pageId = value || null;
  }

  get left() {
    return this._left;
  }

  set left(value) {
    this._left = value || null;
  }

  get top() {
    return this._top;
  }

  set top(value) {
    this._top = value || null;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value || null;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value || null;
  }

  get target() {
    return this._target;
  }

  set target(value) {
    this._target = value || null;
  }
}
