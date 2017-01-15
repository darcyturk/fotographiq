import formStyle from '../forms/style';
import addressForm from '../forms/Address';

const initialState = {
  isLoading: false,
  isRequestingInfo: false,
  success: false,
  auto: 'none',
  fields: {
    zipcode: {
      placeholder: 'CEP',
      keyboardType: 'numeric',
      error: 'Type the zip code',
      stylesheet: formStyle,
      help: 'Only enter numbers',
      maxLength: 8
    },
    street: {
      placeholder: 'Street',
      error: 'Type street',
      stylesheet: formStyle,
      maxLength: 200
    },
    district: {
      placeholder: 'Neighborhood',
      error: 'Enter the neighborhood',
      stylesheet: formStyle,
      maxLength: 200
    },
    number: {
      placeholder: 'Number',
      keyboardType: 'numeric',
      error: 'Enter the number',
      stylesheet: formStyle,
      maxLength: 10
    },
    city: {
      placeholder: 'City',
      error: 'Enter the city',
      stylesheet: formStyle,
      maxLength: 200
    },
    state: {
      placeholder: 'State',
      error: 'Type the state',
      stylesheet: formStyle,
      maxLength: 2
    },
  },
  template: addressForm,
  zipcode: null,
  street: null,
  district: null,
  number: null,
  city: null,
  state: null
};

function address(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ADDRESS_INFO':
      return {
        ...state,
        isRequestingInfo: true,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: false
          },
          street: {
            ...state.fields.street,
            editable: false
          },
          district: {
            ...state.fields.district,
            editable: false
          },
          number: {
            ...state.fields.number,
            editable: false
          },
          city: {
            ...state.fields.city,
            editable: false
          },
          state: {
            ...state.fields.state,
            editable: false
          },
        },
        zipcode: action.zipcode
      };
    case 'REQUEST_ADDRESS_INFO_FAILED':
      return {
        ...state,
        isRequestingInfo: false,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: true
          },
          street: {
            ...state.fields.street,
            editable: true
          },
          district: {
            ...state.fields.district,
            editable: true
          },
          number: {
            ...state.fields.number,
            editable: true
          },
          city: {
            ...state.fields.city,
            editable: true
          },
          state: {
            ...state.fields.state,
            editable: true
          },
        },
      };
    case 'ZIPCODE_LOADED':
      return {
        ...state,
        isRequestingInfo: false,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: true
          },
          street: {
            ...state.fields.street,
            editable: true
          },
          district: {
            ...state.fields.district,
            editable: true
          },
          number: {
            ...state.fields.number,
            editable: true
          },
          city: {
            ...state.fields.city,
            editable: true
          },
          state: {
            ...state.fields.state,
            editable: true
          },
        },
        street: action.data.logradouro,
        district: action.data.bairro,
        city: action.data.localidade.replace('Birigüi', 'Birigui'),
        state: action.data.uf
      };
    case 'INVALID_ADDRESS':
      var data = action.data || {};
      var {zipcode, street, district, number, city} = data;
      var zipcodeError = !!zipcode ? zipcode[0] : state.fields.zipcode.error;
      var streetError = !!street ? street[0] : state.fields.street.error;
      var districtError = !!district ? district[0] : state.fields.district.error;
      var numberError = !!number ? number[0] : state.fields.number.error;
      var cityError = !!city ? city[0] : state.fields.city.error;
      var stateError = !!data.state ? data.state[0] : state.fields.state.error;

      return {
        ...state,
        isLoading: false,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            hasError: !!zipcode,
            error: zipcodeError,
            editable: true
          },
          street: {
            ...state.fields.street,
            hasError: !!street,
            error: streetError,
            editable: true
          },
          district: {
            ...state.fields.district,
            hasError: !!district,
            error: districtError,
            editable: true
          },
          number: {
            ...state.fields.number,
            hasError: !!number,
            error: numberError,
            editable: true
          },
          city: {
            ...state.fields.city,
            hasError: !!city,
            error: cityError,
            editable: true
          },
          state: {
            ...state.fields.state,
            hasError: !!data.state,
            error: stateError,
            editable: true
          },
        }
      };
    case 'REQUEST_ADDRESS':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: false
          },
          street: {
            ...state.fields.street,
            editable: false
          },
          district: {
            ...state.fields.district,
            editable: false
          },
          number: {
            ...state.fields.number,
            editable: false
          },
          city: {
            ...state.fields.city,
            editable: false
          },
          state: {
            ...state.fields.state,
            editable: false
          },
        },
        zipcode: action.data.zipcode,
        street: action.data.street,
        district: action.data.district,
        number: action.data.number,
        city: action.data.city,
        state: action.data.state
      };
    case 'ADDRESS_CREATED':
      return {
        ...initialState,
        isLoading: false,
        success: true
      };
    case 'REQUEST_LOAD_ADDRESS':
      return {
        ...state,
        success: false,
        isRequestingInfo: true,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: false
          },
          street: {
            ...state.fields.street,
            editable: false
          },
          district: {
            ...state.fields.district,
            editable: false
          },
          number: {
            ...state.fields.number,
            editable: false
          },
          city: {
            ...state.fields.city,
            editable: false
          },
          state: {
            ...state.fields.state,
            editable: false
          }
        }
      };
    case 'ADDRESS_LOADED':
      var {address} = action.data;
      return {
        ...state,
        isRequestingInfo: false,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: true
          },
          street: {
            ...state.fields.street,
            editable: true
          },
          district: {
            ...state.fields.district,
            editable: true
          },
          number: {
            ...state.fields.number,
            editable: true
          },
          city: {
            ...state.fields.city,
            editable: true
          },
          state: {
            ...state.fields.state,
            editable: true
          }
        },
        zipcode: address.zipcode,
        street: address.street,
        district: address.district,
        number: address.number,
        city: address.city,
        state: address.state
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = address;
