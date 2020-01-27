export const createProject = (project) => {
    /**파이어베이스와 파이어스토어를 받아 상호작용이 가능해짐 */
    /**6. 호출된 createProject는 this.state를 받아 새 함수를 반환
     * 프로젝트를 받아 getFirestore를 이용해 데이터베이스에 프로젝트를 저장하고 나서
     * action을 dispatch한다
     */
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()//getFirestore를 초기화하고 결과물을 const로 저장해 db로의 레퍼런스 마련
        const profile = getState().firebase.profile
        const autherId = getState().firebase.auth.uid
        firestore.collection('projects').add({//firestore의 projects컬렉션에 오브젝트 추가.
            //이 오브젝트는 컬렉션에 추가할 document를 나타냄
            /**this.state가 mapDispatchToProps의 createProject의 project로 패스돼서
             * 이 createProject의 project에 title과 content가 있음
            */
           ...project,
           autherFirstName: profile.firstName,
           authorLastName: profile.lastName,
           autherId: autherId,
           createdAt: new Date()
        }).then((value) => {
            console.log('value-',value);
            /**dispatch는 db에 위 문서가 올라가기 전까지 실행되지 않아야 함
             * add는 시간이 좀 걸리기 때문에 promise를 하나 반환함
             * .then으로 묶어주면 기다렸다가 add 끝나고 나서 실행함
             */
            dispatch({type:'CREATE_PROJECT', project})
        }).catch((err) => {
            /**add가 어떤 에러로 인해 끝나지 못할 경우를 캐치해줌 */
            dispatch({type:'CREATE_PROJECT_ERROR', err})
        })
    }
}

export const deleteProject = (project) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        console.log(getState().firestore.data.projects)
        // const firestore=getFirestore()
        // const projectId=getState().firestore.data.projects
        // firestore.collection('projects').doc(projectId).delete()
        //     .then(() => { 
        //         dispatch({type:'DELETE_PROJECT', project})
        //     }).catch((err) => {
        //         dispatch({type:'DELETE_PROJECT_ERROR', err})
        //     })
    }
}