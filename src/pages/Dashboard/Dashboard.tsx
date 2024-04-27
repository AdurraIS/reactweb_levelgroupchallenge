

import { Navigate } from 'react-router-dom';

export default function Dashboard(){

    
    if(localStorage.getItem('token') === null){
        return <Navigate to="/signin" replace />;
    }

    
    
    return (

        <div className='flex flex-row'>

        </div>

    )
}

