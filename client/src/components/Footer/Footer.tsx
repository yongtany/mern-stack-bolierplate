import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            backgroundColor: '#1A181F',
            borderTop: '1px solid white',
            color: 'white',
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> Happy Coding  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer