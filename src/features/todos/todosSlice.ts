// @ts-nocheck

const initialState =
    [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
    ]


function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

// Use the initialState as a default value
export default function todosReducer(state = initialState, action: any) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case 'todos/todoAdded': {
            // We need to return a new state object
            return [

                // with all of the old todos
                ...state,
                // and the new todo object
                // Use an auto-incrementing numeric ID for this example
                {
                    id: nextTodoId(state),
                    text: action.payload,
                    completed: false
                }
            ]
        }
        case 'todos/todoToggled': {
            return state.map(todo => {
                // If this isn't the todo item we're looking for, leave it alone
                if (todo.id !== action.payload) {
                    return todo
                }

                // We've found the todo that has to change. Return a copy:
                return {
                    ...todo,
                    // Flip the completed flag
                    completed: !todo.completed
                }
            })
        }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}