// @flow
// import I18n from 'react-native-i18n';

// action types
export const actionTypes = {
  SWITCH_TRANSLATION_ACTION: {
    SUCCESS: 'SWITCH_TRANSLATION_ACTION_SUCCESS',
    REQUEST: 'SWITCH_TRANSLATION_ACTION_REQUEST',
    API_LOADING_START: 'SWITCH_TRANSLATION_ACTION_API_LOADING_START',
    API_LOADING_STOP: 'SWITCH_TRANSLATION_ACTION_API_LOADING_STOP',
  },
};

export const switchLanguageActionCreator = (currentLanguage: string) =>
  ({
    type: actionTypes.SWITCH_TRANSLATION_ACTION.REQUEST,
    currentLanguage,
  });

const currentLocale = 'fr'; // I18n.currentLocale();

const initialState: TranslationStateType = {
  currentLanguage: (currentLocale.indexOf('en') && currentLocale.indexOf('fr')) === -1 ? 'fr' : currentLocale,
};

export function translationReducer(state: TranslationStateType = initialState, action: any) {
  switch (action.type) {
    case actionTypes.SWITCH_TRANSLATION_ACTION.SUCCESS:
      return {
        ...state,
        currentLanguage: action.currentLanguage,
      };
    default:
      return state;
  }
}
