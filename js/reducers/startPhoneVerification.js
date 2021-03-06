import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
  auto: 'none',
  fields: {
    phone: {
      placeholder: 'mobile number',
      keyboardType: 'numeric',
      error: 'Enter your phone number',
      stylesheet: formStyle,
      help: 'Enter your mobile number, including area code',
      maxLength: 10
    }
  },
  phone: null
};

function startPhoneVerification(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PHONE_VERIFICATION_ERROR':
      return {
        ...state,
        isLoading: false,
        fields: {
          phone: {
            ...state.fields.phone,
            hasError: true,
            editable: true,
            error: 'Invalid Phone Number'
          }
        }
      };
    case 'REQUEST_START_PHONE_VERIFICATION':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          phone: {
            ...state.fields.phone,
            editable: false
          }
        },
        phone: action.data.phone
      };
    case 'PHONE_VERIFICATION_SENT':
      return {
        ...state,
        isLoading: false,
        success: true
      };
    case 'SET_PHONE_EDIT_MODE':
      return {
        ...state,
        success: false,
        fields: {
          phone: {
            ...state.fields.phone,
            editable: true
          }
        },
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = startPhoneVerification;
