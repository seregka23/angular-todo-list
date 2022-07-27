import { createFeatureSelector } from "@ngrx/store";
import { UserState } from "../reducers/user.reducer";

export const USER_FEATURE_KEY = 'user';

export const selectUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);