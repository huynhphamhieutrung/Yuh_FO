export default {
  setProjects(state, projects) {
    state.list = projects.map(project => new Project(project));
  },
}
