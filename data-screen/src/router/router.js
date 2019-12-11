import React from 'react';
import DataScreen from '@view/dataScreen/dataScreen.js';
import { Switch, Route, HashRouter  } from 'react-router-dom';

function myRouter() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" component={DataScreen}>
                    
                </Route>
            </Switch>   
        </HashRouter>
    )
};

export default myRouter;