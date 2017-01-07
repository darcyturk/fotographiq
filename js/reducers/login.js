import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  auto: 'none',
  fields: {
    email: {
      autoCapitalize: 'none',
      placeholder: 'e-mail',
      keyboardType: 'email-address',
      error: 'Invalid Email',
      stylesheet: formStyle,
      maxLength: 200
    },
    password: {
      placeholder: 'password',
      secureTextEntry: true,
      maxLength: 72,
      error: 'Must be at least 8 characters',
      stylesheet: formStyle
    }
  },
  email: null,
  password: null
};

function login(state = initialState, action) {
  switch (action.type) {
    case 'INVALID_LOGIN':
      return {
        ...state,
        isLoading: false,
        fields: {
          email: {
            ...state.fields.email,
            editable: true
          },
          password: {
            ...state.fields.password,
            hasError: true,
            editable: true,
            error: 'Your email or password was incorrect.'
          }
        }
      };
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        fields: {
          email: {
            ...state.fields.email,
            editable: false
          },
          password: {
            ...state.fields.password,
            editable: false
          }
        },
        isLoading: true,
        email: action.data.email,
        password: action.data.password
      };
    case 'LOGGED_IN':
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = login;
