let nextAccountId = 0
export const addAccount = (text) => {
  return {
    type: 'ADD_ACCOUNT',
    id: nextAccountId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleAccount = (id) => {
  return {
    type: 'TOGGLE_ACCOUNT',
    id
  }
}
