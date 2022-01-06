export const toPrice = (num, minVariantPrice) => Intl.NumberFormat(undefined, {
  currency: minVariantPrice ? minVariantPrice.currencyCode : 'USD',
  minimumFractionDigits: 2,
  style: 'currency',
}).format(num)

export const getProductName = product => {
	let name = false
	name = product.options && product.options.filter(option => option.name === 'Title')
	if (name && name[0]) {
		name = name[0].values[0]
	}
	if (name === 'Default Title') {
		name = false
		if (product.vendor) {
			name = product.vendor
		}
	}
	if (product.options && product.options.filter(option => option.name === 'Color')[0]) {
		name = product.options.filter(option => option.name === 'Color')[0].values[0]
	}
	return name
}

export const getProductArrangement = product => {
	let arrangement = false
	if (product.options && product.options.filter(option => option.name === 'Arrangement')[0]) {
		arrangement = product.options.filter(option => option.name === 'Arrangement')[0].values[0]
	}
	return arrangement
}

export const getVariantOption = (item, name) => {
	let option = false
	const { selectedOptions } = item.variant
	if (selectedOptions && selectedOptions.filter(option => option.name === name)[0]) {
		option = selectedOptions.filter(option => option.name === name)[0].value
	}
	return option
}

export const getSlugLink = (link, prefix) => {
	const currentLink = link?.link?.content?.main?.slug?.current
	if (currentLink && prefix) {
		return '/' + prefix + '/' + currentLink
	} else if (currentLink === 'home') {
		return '/'
	} else if (currentLink) {
		return '/' + currentLink
	}
	return '/'
}
