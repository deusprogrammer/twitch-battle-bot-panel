import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import EncounterPanel from './routes/EncounterPanel';
import NotificationPanel from './routes/NotificationPanel';
 
class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/encounters" component={EncounterPanel} />
                        <Route path="/notifications" component={NotificationPanel} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
