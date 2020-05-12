import {ProjectModel} from '../../models/project.model';
import {PagingModel} from '../../models/paging.model';

export default {

  async create({}, project) {
    const formData = new FormData();
        formData.append('name', project.name);
        formData.append('short_desc', project.short_desc);
        formData.append('client', project.client);
        formData.append('desc', project.desc);
        formData.append('thumb_small', project.thumb_small);
        formData.append('thumb_large', project.thumb_large);
        formData.append('project_type', project.project_type);  

        return await this.$axios.post('/api/admin/createproject', formData );
  },

  async edit({}, project) {
    const formData = new FormData();
        formData.append('id', project.id);
        formData.append('name', project.name);
        formData.append('short_desc', project.short_desc);
        formData.append('client', project.client);
        formData.append('thumb_small', project.thumb_small);
        formData.append('thumb_large', project.thumb_large);
        formData.append('desc', project.desc);
        formData.append('project_type', project.project_type);  

        return await this.$axios.post('/api/admin/editproject', formData );
  },

  async delete({}, project) {
      const id = project.id;
      return await this.$axios.get('/api/admin/deleteproject/'+ id );
  },

  async fetch() {
    return await this.$axios.get(`/market/any?q={}&limit=1000`);
  },

  async fetchDelete({commit}, {currentIndex, category, query, pageSize}) {
    return await this.$axios.get(`/api/admin/projects?pageIndex=${currentIndex}&category=${category}&mode=deactive&query=${query}&pageSize=${pageSize}`);
  },

  async search({commit, state}, {keyword, category}) {
    keyword = keyword ? keyword.toLowerCase() : '';

    const result = state.list.filter(project => {
      if (category && 'all' !== category && project.type !== category) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      return project.name.toLowerCase().includes(keyword) || project.desc.toLowerCase().includes(keyword);
    });

    commit('setProjects', result);
    return result;
  },

  async find(id, state) {
    let result;

    if (state.list && state.list.length) {
      result = state.list.find(project => {
        return project.id = id;
      });
    }

    return new Project(result);
  },

  async getDetail({state}, projectId) {
    const projectData = await this.$axios.get(`/api/demo/project/${projectId}`);
    return new ProjectModel(projectData['project']);
  },

  async getProject({state}, projectId) {
    return await this.$axios.get(`/api/demo/project/${projectId}`);
  },

}


