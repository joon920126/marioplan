import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
        return(
        <div className="project-list section">
            {/** projects &&를 맵 앞에 붙이는 이유는
                &&이 지닌 특성, 즉 앞의 것이 false라면 뒤의 연산은 아예 실행하지 않는 것을
                응용한 것. 만약 project가 존재하지 않아 false가 나온다면 매핑 자체를 실행하지 않는다 */}
            {projects && projects.map(project=>{
                return(
                    <Link to={'/project/'+project.id} key={project.id}>
                        <ProjectSummary project={project} />
                    </Link>
                )
            })}
        </div>
    )
}

export default ProjectList