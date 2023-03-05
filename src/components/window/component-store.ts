export const state = () => ({
    components: [],//component
  })
   
  export const mutations = {
    addWindow(state, component) {
      state.components.push({
        component:component
      })
    }
  }
   
  export const getters = {
    components: (state) => {
      return state.components
    }
  }