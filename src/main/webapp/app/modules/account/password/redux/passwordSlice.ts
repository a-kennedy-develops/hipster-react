import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';

export interface IPassword {
  currentPassword: string;
  newPassword: string;
}

interface PasswordState {
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  updateSuccess: boolean;
  updateFailure: boolean;
}

const initialState: PasswordState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  updateSuccess: false,
  updateFailure: false,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    savePasswordRequest(state, _action: PayloadAction<IPassword>) {
      state.errorMessage = null;
      state.updateSuccess = false;
      state.loading = true;
    },
    savePasswordSuccess(state) {
      state.loading = false;
      state.updateSuccess = true;
      state.updateFailure = false;
      state.successMessage = 'password.messages.success';
    },
    savePasswordFailure(state, action: PayloadAction<AxiosError | SerializedError>) {
      state.loading = false;
      state.updateSuccess = false;
      state.updateFailure = true;
      if (isAxiosError(action.payload)) {
        state.errorMessage = action.payload.response?.data.detail;
      } else {
        state.errorMessage = '<strong>An error has occurred!</strong> The password could not be changed.';
      }
    },
    reset(_state) {
      return initialState;
    },
  },
});

export const { savePasswordRequest, savePasswordSuccess, savePasswordFailure, reset } = passwordSlice.actions;

export default passwordSlice.reducer;
