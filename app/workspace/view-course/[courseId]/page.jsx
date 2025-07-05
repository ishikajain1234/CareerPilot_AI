
import React from 'react'
import EditCourse from '../../edit-course/[courseId]/page';

const page = () => {
  // const {courseId}=useParams();
  return (
    <div>
      <EditCourse  viewCourse={true}/>
    </div>
  )
}

export default page