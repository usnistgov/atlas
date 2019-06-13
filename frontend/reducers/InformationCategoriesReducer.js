import type { Action } from './types';
import * as InformationCategoriesActions from '../actions/InformationCategories'

const initialState = {
    information_categories: [],
    isLoadingInformationCategories: true,
    latestInformationCategory: {}

};

export default function InformationCategoriesReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES:
        return {...state,  isLoadingInformationCategories: true};
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_SUCCESS:
        return {...state, isLoadingInformationCategories: false,  information_categories: action.res};
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_ERROR400:
        console.log(action.res);
        break;
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_ERROR500:
        console.log(action.res);
        break;
     case InformationCategoriesActions.GET_INFORMATION_CATEGORIES_FAILURE:
        return {...state, isLoadingInformationCategories: false}

     // CREATE
     case InformationCategoriesActions.POST_INFORMATION_CATEGORY:
        break;
     case InformationCategoriesActions.POST_INFORMATION_CATEGORY_SUCCESS:
        return {...state, latestInformationCategory: action.res};
     case InformationCategoriesActions.POST_INFORMATION_CATEGORY_ERROR400:
        console.log(action.res);
        break;
     case InformationCategoriesActions.POST_INFORMATION_CATEGORY_ERROR500:
        console.log(action.res);
        break;
     case InformationCategoriesActions.POST_INFORMATION_CATEGORY_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case InformationCategoriesActions.PUT_INFORMATION_CATEGORY:
        break;
     case InformationCategoriesActions.PUT_INFORMATION_CATEGORY_SUCCESS:
        break;
     case InformationCategoriesActions.PUT_INFORMATION_CATEGORY_ERROR400:
        console.log(action.res);
        break;
     case InformationCategoriesActions.PUT_INFORMATION_CATEGORY_ERROR500:
        console.log(action.res);
        break;
     case InformationCategoriesActions.PUT_INFORMATION_CATEGORY_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case InformationCategoriesActions.DELETE_INFORMATION_CATEGORY:
        break;
     case InformationCategoriesActions.DELETE_INFORMATION_CATEGORY_SUCCESS:
        break;
     case InformationCategoriesActions.DELETE_INFORMATION_CATEGORY_ERROR400:
        console.log(action.res);
        break;
     case InformationCategoriesActions.DELETE_INFORMATION_CATEGORY_ERROR500:
        console.log(action.res);
        break;
     case InformationCategoriesActions.DELETE_INFORMATION_CATEGORY_FAILURE:
        console.log(action.res);
        break;

  }

  return state
}