import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type ActivitiesStateType = {
  +activities: object
};

export type ActorsStateType = {
  +actors: object
};

export type CyberSecurityThreatsStateType = {
  +cybersecurity_threats: object
};

export type RespondingOrganizationsStateType = {
  +responding_organizations: object
};

export type TechnologiesStateType = {
  +technologies: object
};

export type DisciplinesStateType = {
  +disciplines: object
};

export type InformationCategoriesStateType = {
  +information_categories: object
};

export type InformationTypesStateType = {
  +information_types: object
};

export type LocationsStateType = {
  +locations: object
};

export type UseCasesStateType = {
  +use_cases: object
};

export type Action = {
  +type: string
};

export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;