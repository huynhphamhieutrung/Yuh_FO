import {ProjectModel} from '../../models/project.model';
import {PagingModel} from '../../models/paging.model';

export default {

  async create({}, user) {
        return await this.$axios.post('/user/register', {
            "username": user.username,
            "password": user.password,
            "name": user.name,
            "age": user.age,
            "gender": user.gender,
            "email":  user.email,
            "position": user.position,
            "role": user.role,
            "phone": user.phone,
            "address": user.address
        });

  },

  async edit({}, user) {
        return await this.$axios.post('/api/admin/editproject', formData);
  },

  async delete({}, project) {
      const id = project.id;
      return await this.$axios.get('/api/admin/deleteproject/'+ id );
  },

  async fetch() {
    return await this.$axios.get(`/user/all?limit=100`);
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


