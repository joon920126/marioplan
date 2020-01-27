import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
    state={
        title: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    /**1. submit 클릭시 this.props에 있는 createProject 호출하고 this.state를 인자로 집어넣음
     * props는 아래의 mapDispatchToProps로 인해 생성됨?
    */
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createProject(this.state)
        this.props.history.push('/')
    }
    render() {
        const {auth} = this.props
        if(!auth.uid) return <Redirect to='/signin'/>
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create new project</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-fidle">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

/**2. dispatch를 받고 자바스크립트 오브젝트 반환하는데 이 오브젝트는 createProject라는 속성을 가지고 있음
 * 3. createProject는 project라는 인자를 받아 맨 위에서 받은 dispatch 함수(?)를 실행하는 함수 형태의 속성
 * 4. dispatch함수의 인자로는 projectActions에서 import해온 createProject라는 함수가 들어감
 * 5. createProject함수는 createProject속성에서 인자로 받은 project인자를 받아 실행
 */

const mapStateToProps = (state) => {
    return  {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}
//connect에서 어찌저찌해서 mapDispatchToProps로 props를 만들어서 createProject를 리덕스로 연결?
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)