import axios, { isAxiosError } from 'axios';
import { translate } from 'react-jhipster';
import { create } from 'zustand';

const apiUrl = 'api/account';

interface IPassword {
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

type PasswordStore = PasswordState & {
  savePassword: (password: IPassword) => Promise<void>;
  reset: () => void;
};

export const usePasswordStore = create<PasswordStore>(set => ({
  ...initialState,
  async savePassword(password: IPassword) {
    try {
      set({ loading: true, errorMessage: null });
      await axios.post(`${apiUrl}/change-password`, password);
      set({ loading: false, updateSuccess: true, updateFailure: false, successMessage: translate('password.messages.success') });
    } catch (error) {
      set({
        loading: false,
        updateSuccess: false,
        updateFailure: true,
        errorMessage: isAxiosError(error) ? `Error: ${error.response?.data?.detail}` : translate('password.messages.error'),
      });
    }
  },
  reset: () => set({ ...initialState }),
}));

export const { getState } = usePasswordStore;
