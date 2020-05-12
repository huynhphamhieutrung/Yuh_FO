import {BaseModel} from './base.model';
import Common from '../utils/common';

export class PagingModel extends BaseModel {
  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value) {
    this._currentPage = value;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

  get total() {
    return this._total;
  }

  set total(value) {
    this._total = value;
  }

  get nextPageUrl() {
    return this._nextPageUrl;
  }

  set nextPageUrl(value) {
    this._nextPageUrl = value;
  }

  get prevPageUrl() {
    return this._prevPageUrl;
  }

  set prevPageUrl(value) {
    this._prevPageUrl = value;
  }

  static getModelPaging(data, entityType) {
    data['data'] = Common.generateArrayEntity(data['data'], entityType);
    return new PagingModel(data);
  }
}
