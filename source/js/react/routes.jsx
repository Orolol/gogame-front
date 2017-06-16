import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import PostsIndex from './pages/PostsIndex';
import PostsNew from './pages/PostsNew';
import PostsShow from './pages/PostsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPwd from './pages/ForgotPwd';
import ValidateEmail from './pages/ValidateEmail';
import Profile from './pages/Profile';

export default (
    <Router history={browserHistory}>
           <Route path="/" component={App} >
             <Route path="(/:account/:category)" component={ModuleManager}>
               <Route path="*"/>
             </Route>
           </Route>
           <Route path="/" >
           </Route>
         </Router>
);
