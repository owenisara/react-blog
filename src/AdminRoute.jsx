import { getUser } from "../service/authorize";

import { Navigate, Outlet } from 'react-router-dom';
const AdminRoute=()=>(
  getUser() ? (<Outlet /> ): (<Navigate to="/login" replace />)
     

)

export default AdminRoute;


