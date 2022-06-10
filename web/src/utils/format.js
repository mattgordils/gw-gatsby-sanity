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

export const slugify = (text, separator = '-') => {
	if (!text) {
		return ''
	}
	return text
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, separator)
}

export const getSlugLink = (link, prefix, hash = '') => {
	const currentLink = link?.content?.main?.slug?.current
	if (hash) {
		hash = '#' + hash
	}
	if (currentLink && prefix) {
		return '/' + prefix + '/' + currentLink + hash
	} else if (currentLink === 'home') {
		return '/' + hash
	} else if (currentLink) {
		return '/' + currentLink + hash
	}
	return '/' + hash
}

export const getSanityLink = item => {
  const linkSlug = item?.link?.content?.main?.slug?.current
  const pageParent = item?.link?.content?.main?.parentPage?.content?.main?.slug?.current
  let renderedLink = getSlugLink(linkSlug, pageParent)
  if (item?.type === 'externalLink') {
    renderedLink = item.externalLink
  } else if (item?.type === 'fileLink') {
    renderedLink = item?.file?.asset?.url
  } else if (item?.type === 'phoneLink') {
    renderedLink = 'tel:' + item?.phoneLink
  } else if (item?.type === 'emailLink') {
    renderedLink = 'mailto:' + item?.emailLink
  }
  return renderedLink
}
