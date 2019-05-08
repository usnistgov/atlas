import type { Action } from './types';
import * as InformationCategoriesActions from '../actions/InformationCategories'

const initialState = {
    information_categories: [],
    isLoadingInformationCategories: true

};

export default function InformationCategoriesReducer(state=initialState, action: Action) {

  switch (action.type) {
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES:
        return {...state,  isLoadingInformationCategories: true};
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_SUCCESS:
        return {...state, isLoadingInformationCategories: false,  information_categories: action.res};
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_ERROR400:
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_ERROR500:
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_FAILURE:
        return {...state, isLoadingInformationCategories: false}

  }

  return state
}