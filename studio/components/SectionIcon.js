import React from 'react'
import { MdVisibilityOff } from 'react-icons/md'

const SectionIcon = ({ children, hidden }) => {
	return (
		<div 
			style={{ 
				borderRadius: '3px',
				width: '40px',
				height: '40px',
				background: '#e4e8ed',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '18px',
			}}
		>
			{hidden ? <MdVisibilityOff size='24px' style={{ color: '#a5b1c4' }}/> : children}
		</div>)
}

export default SectionIcon;
