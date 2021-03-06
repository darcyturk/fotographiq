import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
  auto: 'none',
  fields: {
    verification_code: {
      placeholder: 'verification code',
      keyboardType: 'numeric',
      error: 'Enter the verification code',
      stylesheet: formStyle,
      maxLength: 4
    }
  },
  verification_code: null
};

function verifyPhone(state = initialState, action) {
  switch (action.type) {
    case 'PHONE_VERIFICATION_ERROR':
      return {
        ...state,
        isLoading: false,
        fields: {
          verification_code: {
            ...state.fields.verification_code,
            hasError: true,
            editable: true,
            error: 'Invalid Code'
          }
        }
      };
    case 'REQUEST_VERIFY_PHONE':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          verification_code: {
            ...state.fields.verification_code,
            editable: false
          }
        },
        verification_code: action.data.verification_code
      };
    case 'PHONE_VERIFIED':
      return {
        ...initialState,
        success: true
      };
    case 'REQUEST_START_PHONE_VERIFICATION':
      return {
        ...state,
        isResequestingCode: true
      };
    case 'PHONE_VERIFICATION_SENT':
      return {
        ...state,
        isResequestingCode: false
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = verifyPhone;
