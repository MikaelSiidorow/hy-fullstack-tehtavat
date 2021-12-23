const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data].sort( (a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data.sort( (a, b) => b.votes - a.votes)
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote).sort( (a, b) => b.votes - a.votes)
    default: return state.sort( (a, b) => b.votes - a.votes)
  }

}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const voteOn = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer