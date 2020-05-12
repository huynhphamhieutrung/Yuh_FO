export default {
  get uniqueId() {
    return Math.random().toString(36).replace('.', '_');
  },

  generateArrayEntity(arr, entityType) {
    if (!arr || !arr[0]) {
      return [];
    }

    const result = [];

    for (const item of arr) {
      const entity = new entityType(item);
      result.push(entity);
    }

    return result;
  }
}
