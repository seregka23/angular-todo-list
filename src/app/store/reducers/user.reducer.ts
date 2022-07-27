import { createReducer } from "@ngrx/store";
import { IUser } from "src/app/models/IUser";

export interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: ''
}



export const userReducer = createReducer(
    initialState
)