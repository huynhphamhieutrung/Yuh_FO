import {BaseModel} from './base.model';
import Common from '../utils/common';
import {Page} from './page.model';

export class UserModel extends BaseModel {

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value || null;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value || '';
  }

  get icon() {
    return this._icon;
  }

  set icon(value) {
    this._icon = value || '';
  }

  get thumbLarge() {
    return this._thumbLarge;
  }

  set thumbLarge(value) {
    this._thumbLarge = value || '';
  }

  get thumbLargeUrl() {
    return this.thumbLarge ? `${config.env.baseImageUrl}/${this.thumbLarge}` : '';
  }

  get thumbSmall() {
    return this._thumbSmall;
  }

  set thumbSmall(value) {
    this._thumbSmall = value || '';
  }

  get thumbSmallUrl() {
    return this.thumbSmall ? `${config.env.baseImageUrl}/${this.thumbSmall}` : '';
  }

  get desc() {
    return this._desc;
  }

  set desc(value) {
    this._desc = value || '';
  }

  get shortDesc() {
    return this._shortDesc;
  }

  set shortDesc(value) {
    this._shortDesc = value || '';
  }

  get projectType() {
    return this._projectType;
  }

  set projectType(value) {
    this._projectType = value || '';
  }

  get demos() {
    return this._demos;
  }

  set demos(value) {
    this._demos = value || null;
  }

  get client() {
    return this._client;
  }

  set client(value) {
    this._client = value || '';
  }

  get pages() {
    return this._pages ? this._pages : [];
  }

  set pages(value) {
    this._pages = value ? Common.generateArrayEntity(value, Page) : [];
    let pageData = {};
    this.pages.map(page => {
      if (!pageData[page.type]) {
        pageData[page.type] = [];
      }
      pageData[page.type].push(new Page(page));
    });
    this.pagesFormat = pageData;
  }

  get pagesFormat() {
    return this._pagesFormat;
  }

  set pagesFormat(value) {
    if (value) {
      let typeArr = [];
      for (let key in value) {
        typeArr.push(key);
      }
      this.typesDemo = typeArr;
    }

    this._pagesFormat = value;
  }

  get typesDemo() {
    return this._typesDemo ? this._typesDemo : [];
  }

  set typesDemo(value) {
    this._typesDemo = value || [];
  }

  get pagesCount() {
    return this._pagesCount;
  }

  set pagesCount(value) {
    this._pagesCount = value || 0;
  }
}
