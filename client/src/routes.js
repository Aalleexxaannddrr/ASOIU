import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { CompetitionRegisterPage } from './pages/CompetitionRegisterPage'
import { CompetitionPage } from './pages/CompetitionPage'
import { ReportPage } from './pages/ReportPage'
import { ReportRequestPage } from './pages/ReportRequestPage'
import { AuthPage } from './pages/AuthPage'
import { RegisterPage } from './pages/RegisterPage'
import { SpecialRegisterPage } from './pages/SpecialRegisterPage'
import { CompetitionInfoPage } from './pages/CompetitionInfoPage'
import { StreamPage } from './pages/StreamPage'

export const useRoutes = (isAuthenticated, isOrganizer) => {
    if (isAuthenticated && isOrganizer){
        return (
            <Switch>
            <Route path="/main" exact>
                <MainPage />
            </Route>
            <Route path="/competition_register/:id" exact>
                <CompetitionRegisterPage />
            </Route>
            <Route path="/stream/:id" exact>
                <StreamPage />
            </Route>
            <Route path="/competition" exact>
                <CompetitionPage />
            </Route>
            <Route path="/report" exact>
                <ReportPage />
            </Route>
            <Route path="/report_request" exact>
                <ReportRequestPage />
            </Route>
            <Route path="/competition_info/:id" exact>
                <CompetitionInfoPage />
            </Route>
            <Redirect to="/main" />
        </Switch>    
        )
    }
    if (isAuthenticated && !isOrganizer) {
        return (
            <Switch>
            <Route path="/main" exact>
                <MainPage />
            </Route>
            <Route path="/stream/:id" exact>
                <StreamPage />
            </Route>
            <Route path="/competition_info/:id" exact>
                <CompetitionInfoPage />
            </Route>
            <Route path="/competition" exact>
                <CompetitionPage />
            </Route>
            <Route path="/report" exact>
                <ReportPage />
            </Route>
            <Route path="/report_request" exact>
                <ReportRequestPage />
            </Route>
            <Redirect to="/main" />
        </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/main" exact>
                <MainPage />
            </Route>
            <Route path="/stream/:id" exact>
                <StreamPage />
            </Route>
            <Route path="/competition_info/:id" exact>
                <CompetitionInfoPage />
            </Route>
        <Route path="/auth" exact>
            <AuthPage />
        </Route>
        <Route path="/register" exact>
            <RegisterPage />
        </Route>
        <Route path="/special_register" exact>
            <SpecialRegisterPage />
        </Route>
        <Route path="/report" exact>
                <ReportPage />
            </Route>
            <Route path="/report_request" exact>
                <ReportRequestPage />
            </Route>
            <Route path="/competition" exact>
                <CompetitionPage />
            </Route>
        <Redirect to="/main" />
    </Switch>
    )
}