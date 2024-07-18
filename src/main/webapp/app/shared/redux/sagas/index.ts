import { all } from 'redux-saga/effects';
import passwordSagas from 'app/modules/account/password/redux/passwordSaga';

export default function* rootSaga() {
  yield all([passwordSagas()]);
}
