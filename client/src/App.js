import { Route, Routes } from 'react-router-dom';
import ActorSignupScreen from './screens/ActorSignupScreen';
import AppLaunchScreen from './screens/AppLaunchScreen';
import ActorLoginScreen from './screens/ActorLoginScreen';
import ActorHomeScreen from './screens/ActorHomeScreen';
import AppExploreScreen from './screens/AppExploreScreen';
import ActorProtect from './utils/ActorProtect';
import DirectorProtect from './utils/DirectorProtect';
import Public from './utils/Public';
import DirectorSignupScreen from './screens/DirectorSignupScreen';
import DirectorLoginScreen from './screens/DirectorLoginScreen';
import DirectorHomeScreen from './screens/DirectorHomeScreen';
import DirectorCastingCallsScreen from './screens/DirectorCastingCallsScreen';
import DirectorAddCastingCallScreen from './screens/DirectorAddCastingCallScreen';
import ActorProfilePage from './screens/ActorProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CastingCallDetailsScreen from './screens/CastingCallDetailsScreen';
import ActorOtpVerificationScreen from './screens/ActorOtpVerificationScreen';
import AdminActorManagement from './screens/AdminActorManagement';
import AdminLoginScreen from './screens/AdminLoginScreen';
import AdminProtect from './utils/AdminProtect';
import DirectorApplicationsScreen from './screens/DirectorApplicationsScreen';
import DirectorApplicantsListScreen from './screens/DirectorApplicantsListScreen';
import ActorApplicationsScreen from './screens/ActorApplicationsScreen';
import DirectorOtpVerificationScreen from './screens/DirectorOtpVerificationScreen';
import AdminDirectorManagement from './screens/AdminDirectorManagement';
import AdminDirectorRequestsScreen from './screens/AdminDirectorRequestsScreen';
import ActorListDirectorsScreen from './screens/ActorListDirectorsScreen';
import DirectorProfileScreen from './screens/DirectorProfileScreen';
import ApplicantDetailsScreen from './screens/ApplicantDetailsScreen';
import GooglePasswordVerificationScreen from './screens/GooglePasswordVerificationScreen';

function App() {
  return (
    <>
      <Routes>

        <Route element={<Public role='actor' />}>
          <Route path='/' element={<AppLaunchScreen />} />
          <Route path='/explore' element={<AppExploreScreen />} />
          <Route path='/actor/signup' element={<ActorSignupScreen />} />
          <Route path='/actor/login' element={<ActorLoginScreen />} />
          <Route path='/actor/verifyotp' element={<ActorOtpVerificationScreen />} />
          <Route path='/actor/verifygooglepassword' element={<GooglePasswordVerificationScreen />} />
        </Route>

        <Route element={<Public role='director' />}>
          <Route path='/' element={<AppLaunchScreen />} />
          <Route path='/explore' element={<AppExploreScreen />} />
          <Route path='/director/signup' element={<DirectorSignupScreen />} />
          <Route path='/director/login' element={<DirectorLoginScreen />} />
          <Route path='/director/verifyotp' element={<DirectorOtpVerificationScreen />} />
        </Route>

        <Route element={<Public role='admin' />} >
          <Route path='/admin/login' element={<AdminLoginScreen />} />
        </Route>

        <Route element={<ActorProtect />}>
          <Route path='/actor/home' element={<ActorHomeScreen />} />
          <Route path='/actor/viewprofile' element={<ActorProfilePage />} />
          <Route path='/actor/castingcalldetails/:id' element={<CastingCallDetailsScreen />} />
          <Route path='/actor/applications' element={<ActorApplicationsScreen />} />
          <Route path='/actor/listdirectors' element={<ActorListDirectorsScreen />} />
        </Route>

        <Route element={<DirectorProtect />}>
          <Route path='/director/home' element={<DirectorHomeScreen />} />
          <Route path='/director/castingcalls' element={<DirectorCastingCallsScreen />} />
          <Route path='/director/addcastingcall' element={<DirectorAddCastingCallScreen />} />
          <Route path='/director/applications' element={<DirectorApplicationsScreen />} />
          <Route path='/director/applications/:id' element={<DirectorApplicantsListScreen />} />
          <Route path='/director/viewprofile' element={<DirectorProfileScreen />} />
          <Route path='/director/getactordetails' element={<ApplicantDetailsScreen />} />
        </Route>

        <Route element={<AdminProtect />}>
          <Route path='/admin/getallactors' element={<AdminActorManagement />} />
          <Route path='/admin/getalldirectors' element={<AdminDirectorManagement />} />
          <Route path='/admin/getdirectorrequests' element={<AdminDirectorRequestsScreen />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
