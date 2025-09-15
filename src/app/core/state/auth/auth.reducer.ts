import { createReducer, on } from '@ngrx/store';
import { loginSuccess, authLogout, login, loginFailure } from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    loaded: boolean;
    restoring: boolean
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
    loaded: false,
    restoring: false,
};
export const authFeatureKey = 'auth';
export const authReducer = createReducer(
    initialAuthState,
    on(login, (state) => ({
        ...state,
        loading: true,
        error: null,
        loaded: false,
    })),
    on(loginSuccess, (state, { user, token }) => ({
        ...state,
        isAuthenticated: true,
        user,
        token,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        isAuthenticated: false,
        loaded: true

    })),
    on(authLogout, () => initialAuthState)
);