import { takeLatest, put, call, all } from 'redux-saga/effects';
import { savePasswordRequest, savePasswordSuccess, savePasswordFailure, IPassword } from './passwordSlice'; // Import actions from reducer with types
import axios from 'axios';
import { serializeAxiosError } from 'app/shared/redux/slices/reducer.utils';
import { PayloadAction } from '@reduxjs/toolkit';

const apiUrl = 'api/account';

function* savePasswordSaga(action: PayloadAction<IPassword>) {
  try {
    const response = yield call(axios.post, `${apiUrl}/change-password`, action.payload);
    // eslint-disable-next-line no-console
    console.log('Password Saga API response - ', response);
    yield put(savePasswordSuccess());
  } catch (error) {
    const formattedError = serializeAxiosError(error);
    yield put(savePasswordFailure(formattedError));
  }
}

function* passwordSagas() {
  yield all([takeLatest(savePasswordRequest.type, savePasswordSaga)]);
}

export default passwordSagas;
