import React from 'react'
import { MdVisibilityOff } from 'react-icons/md'
import { FormField } from '@sanity/base/components'
import { TextInput, Stack, Label } from '@sanity/ui'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { useId } from '@reach/auto-id'

export const IconUI = React.forwardRef((props, ref) => {
	const {
		type,
		value,
		readOnly,
		placeholder,
		markers,
		presence,
		compareValue,
		onFocus,
		onBlur,
		onChange
	} = props

	const handleChange = React.useCallback(
		event => {
			const inputValue = event.currentTarget.value
			onChange(PatchEvent.from(inputValue ? set(inputValue) : unset))
		},
		[onChange]
	)

	const inputId = useId()

  return (
  	<FormField
  		description={type.description}
  		title={type.title}
  		compareValue={compareValue}
  		__unstable_markers={markers}
  		__unstable_presence={presence}
  		inputId={inputId}
  		style={{ gridTemplateColumns: 'max-content max-content', columnGap: '16px', alignItems: 'center' }}
  	>
  		<div style={{ display: 'flex', width: '75%' }}>
	  		{type.options.list.map((item, index) => {
	  			const checked = item.value == value
	  			const itemId = useId()
	  			return (
		  			<div>
		  				<label
		  					htmlFor={itemId}
		  					title={item.title}
		  					style={{
		  						display: 'Flex',
		  						alignItems: 'center',
		  						justifyContent: 'center',
			  					minWidth: '42px',
			  					height: '36px',
			  					fontSize: '24px',
			  					boxSizing: 'border-box',
			  					marginRight: '-1px',
			  					position: 'relative',
			  					border: checked ? '2px solid var(--card-focus-ring-color)' : '1px solid var(--card-border-color)',
			  					zIndex: checked ? '2' : '1',
			  					cursor: 'pointer',
			  				}}
		  				>{item.icon || item.title}</label>
			  			<input
			  				type='radio'
			  				value={item.value}
			  				id={itemId}
			  				onChange={handleChange}
			  				checked={checked}
			  				name={inputId + 'fieldset'}
			  				style={{ display: 'none' }}
			  			/>
		  			</div>
		  		)
	  		})}
  		</div>
    </FormField>
  )
})

export default IconUI
