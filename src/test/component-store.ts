export const state = () => ({
    components: [],//component
  })
   
  export const mutations = {
    addComponent(state, component) {
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