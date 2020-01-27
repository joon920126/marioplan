import React, { Component } from 'react'
import Notifications from './Notification'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'

class Dashboard extends Component{
    render() {
        const {projects, auth, notifications} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/> 
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects}/>
                    </div>  
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>                    
                </div>  
            </div>
        )
    }
}

const mapStateToProps = (state) => { //스토어의 state를 받아 이 컴포넌트의 props로 내보냄
    //console.log(state)
    return {
        //rootreducer의 project(projectReducer) 내의 projects 프로퍼티
        //projects: state.project.projects
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'projects', orderBy:['createdAt', 'desc']},
        {collection:'notifications', limit:3, orderBy:['time','desc']}
    ])
)(Dashboard)