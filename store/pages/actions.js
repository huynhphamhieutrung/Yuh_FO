export default {
    async create({}, page) {
        const formData = new FormData();
            formData.append('project_id', page.project_id);
            formData.append('type', page.type);
            formData.append('position', page.position);
            formData.append('image', page.image);
        return await this.$axios.post('/api/admin/createpage', formData);
    },

    async edit({commit}, {page, project_id}) {
        const formData = new FormData();
            formData.append('project_id', project_id);
            formData.append('id', page.id);
            formData.append('type', page.type);
            formData.append('position', page.position);
            formData.append('image', page.image);
        return await this.$axios.post('/api/admin/editpage', formData);
    },

    async editNoImage({commit}, {page, project_id}) {
        const formData = new FormData();
            formData.append('project_id', project_id);
            formData.append('id', page.id);
            formData.append('type', page.type);
            formData.append('position', page.position);
        return await this.$axios.post('/api/admin/editpage', formData);
    },
}
