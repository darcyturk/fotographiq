import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
  auto: 'none',
  fields: {
    email: {
      autoCapitalize: 'none',
      placeholder: 'e-mail',
      keyboardType: 'email-address',
      error: 'invalid email',
      stylesheet: formStyle,
      maxLength: 200
    }
  }
};

function forgotPassword(state = initialState, action) {
  switch (action.type) {
    case 'INVALID_SEND_RESET_PASSWORD':
      return {
        ...state,
        isLoading: false,
        fields: {
          email: {
            ...state.fields.email,
            hasError: true,
            error: "Could't send password reset",
            editable: true
          }
        }
      };
    case 'REQUEST_SEND_RESET_PASSWORD':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          email: {
            ...state.fields.email,
            editable: false
          }
        },
        email: action.data.email
      };
    case 'RESET_PASSWORD_SENT':
      return {
        ...initialState,
        success: true
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = forgotPassword;
