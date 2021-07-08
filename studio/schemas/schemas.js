import React from 'react'
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import blockText from './blockText'
import siteSettings from './siteSettings'

// Content Types
import page from './types/page'
import siteGlobal from './types/siteGlobal'
import menus from './types/menus'
import post from './types/post'
import doc from './types/doc'
// Ecommerce Types
// import product from './types/ecommerce/product'
// import variant from './types/ecommerce/variant'
// import collection from './types/ecommerce/collection'
// import subscription from './types/ecommerce/subscription'

// Modules
import textSection from './modules/textSection'

//
import externalLink from './modules/externalLink'
import internalLink from './modules/internalLink'
import metaCard from './modules/metaCard'
import social from './modules/social'
import socialLink from './modules/socialLink'
import nestedPages from './modules/nestedPages'
import pageItem from './modules/pageItem'
import pageModule from './modules/pageModule'
import imageModule from './modules/imageModule'
import standardText from './modules/standardText'
import moduleContent from './modules/moduleContent'
// Ecommerce Modules
// import productGrid from './modules/ecommerce/productGrid'
// import productModule from './modules/ecommerce/productModule'
// import shopifyProductModule from './modules/ecommerce/shopifyProductModule'
// import shopifyVariantModule from './modules/ecommerce/shopifyVariantModule'
// import variantModule from './modules/ecommerce/variantModule'
// import defaultVariant from './modules/ecommerce/defaultVariant'


// GraphQL Tab Modules
import globalContent from './tabs/globalContent'
import pageContent from './tabs/pageContent'
// Ecommerce Tab Modules
// import variantContent from './tabs/ecommerce/variantContent'
// import productContent from './tabs/ecommerce/productContent'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    siteGlobal,
    page,
    post,
    doc,
    menus,
    // collection,
    // product,
    // variant,
    // subscription, // This can be disabled/hidden if not using recharge
    // Modules
    textSection,
    //
    externalLink,
    internalLink,
    // productGrid,
    pageModule,
    nestedPages,
    pageItem,
    social,
    socialLink,
    standardText,
    imageModule,
    moduleContent,
    metaCard,
    blockContent,
    blockText,
    // Product Specific Modules
    // productModule,
    // shopifyProductModule,
    // shopifyVariantModule,
    // variantModule,
    // defaultVariant,
    // GrapqhQL Tab Things
    globalContent,
    pageContent,
    // productContent,
    // variantContent

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
