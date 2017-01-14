import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
  auto: 'none',
  fields: {
    password: {
      placeholder: 'New Password',
      secureTextEntry: true,
      maxLength: 72,
      error: 'Must be at least 8 characters',
      stylesheet: formStyle
    },
    password_confirmation: {
      placeholder: 'Confirm the new password',
      secureTextEntry: true,
      maxLength: 72,
      error: 'Must be at least 8 characters',
      stylesheet: formStyle
    }
  }
};

function password(state = initialState, action) {
  switch (action.type) {
    case 'INVALID_PASSWORD_UPDATE':
      var {password, password_confirmation} = action.data;
      var passwordError = !!password ? password[0] : state.fields.password.error;
      var passwordConfirmationError = !!password_confirmation ? password_confirmation[0] : state.fields.password_confirmation.error;

      return {
        ...state,
        isLoading: false,
        fields: {
          password: {
            ...state.fields.password,
            hasError: !!password,
            error: passwordError,
            editable: true
          },
          password_confirmation: {
            ...state.fields.password_confirmation,
            hasError: !!password_confirmation,
            error: passwordConfirmationError,
            editable: true
          }
        }
      };
    case 'REQUEST_PASSWORD_UPDATE':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          password: {
            ...state.fields.password,
            editable: false
          },
          password_confirmation: {
            ...state.fields.password_confirmation,
            editable: false
          }
        },
        password: action.data.password,
        password_confirmation: action.data.password_confirmation
      };
    case 'PASSWORD_UPDATED':
      return {
        ...initialState,
        success: true,
        fields: {
          password: {
            ...state.fields.password,
            editable: true
          },
          password_confirmation: {
            ...state.fields.password_confirmation,
            editable: true
          }
        }
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = password;
