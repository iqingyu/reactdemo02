import React from 'react'  
import { render } from 'react-dom'  
import { Provider } from 'react-redux'

import  globalStore from '../configs/globalStore';

import RouterPage from '../routers/routerPage'  


render(     
      <Provider store={ globalStore }>
            <RouterPage/>
      </Provider>
    ,  
    document.getElementById('root')  
) 