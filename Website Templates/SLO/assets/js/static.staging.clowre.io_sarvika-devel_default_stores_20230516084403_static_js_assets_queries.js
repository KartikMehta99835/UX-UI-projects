function getAllAddresQuery() {
    const q = `query {
                      addresses(perPage: 100, page: 1) {
                        total
                        lastPage
                        addresses {
                          id
                          addressType
                          nickname
                          firstName
                          lastName
                          middleName
                          email
                          address1
                          address2
                          address3
                          mobilePrefix
                          mobile
                          phonePrefix
                          phoneAreaCode
                          phone
                          faxAreaCode
                          fax
                          city
                          state
                          country
                          zip
                          company
                          companyType
                        }
                      }
                    }`

    return q;
}

function getVariantFacets(category, storeUrn) {
    const q = `query {
        variantFacets(category: "${category}", store: "${storeUrn}") {
        key
        type
        values {
          key
          value
        }
      }
    }`
    return q;
}

function getBehaviourFacets(category, storeUrn) {
    const q = `query {
        behaviourFacets(category: "${category}", store: "${storeUrn}") {
        key
        type
        values {
          key
          value
        }
      }
    }`
    return q;
}

function getAllStoreCategory(storeCode) {
    const q = `query {
      allCategories(categoryRequest:{name:["${storeCode}"]}){
        sub_categories
       }
    }`
    return q;
}

function getAllSubCategory(ids) {
let categoryIds = JSON.stringify(ids)
    const q = `query {
      allCategories(categoryRequest: {id: ${categoryIds}}){
        name
        display_name
        id
        position
        short_description
        page_title
        products{
            position
            sku
          }
        sub_categories  
      slug
       }
    }`
    return q;
}



function getAddresQuery(id) {
    const q = `query {
              address(addressID:"${id}") {
                        id
                          addressType
                          nickname
                          firstName
                          lastName
                          middleName
                          email
                          address1
                          address2
                          address3
                          mobilePrefix
                          mobile
                          phonePrefix
                          phoneAreaCode
                          phone
                          faxAreaCode
                          fax
                          city
                          state
                          country
                          zip
                          company
                          companyType
                          
                }
            }`

    return q;
}


function getWalletPoints(store_Id) {
let store_code = JSON.stringify(store_Id)
    const q = `query {
    getWalletAmount(store_id: ${store_code}) {
        amount
        error
        status
    }
 }`
return q;
}


function getAllWalletDetails(storeCode, sortData) {
let store_code = JSON.stringify(storeCode)
    const q = `query {
     getWalletDetail(store_id: ${store_code}, ${sortData ? `pageRequest:{page: ${sortData.page}, perPage: ${sortData.perPage}}` : ''}){
        from
        lastPage
        to
        total
        perPage
        currentPage
        content {
            user_id
            transaction_key
            payment_type
            payment_method
            wallet_transaction_id
            points
            balance
            status_text
            reason
            updated_at
        }  
     }
 }`
return q;
}






function getItemsBySkuQuery(skus) {
    let productSkus = JSON.stringify(skus)
    const q = `query {
              getSource(itemRequest: {sku: ${productSkus}}) {
                    attributable
                  available
                  basic_uom
                  cross_sell_products
                  custom_behavior{
                    key
                    value
                }
                variants{
                    sku
                    options{
                      display_text
                      option_name
                    }
                  }
                  default_currency
                  display_availability
                  display_stock_quantity
                  end_date
                  id
                  list_price
                  long_description
                  media{
                    kind
                    path
                  }
                  meta_description
                  meta_title
                  obsolete
                  prices{
                    sell_price
                    breakups{
                      end_qty
                      start_qty
                      value
                    }
                    currency
                    enable_breakup
                    minimum_sell_price
                    price_list_name
                  }
                  searchable
                  short_description
                  sku
                  slug
                  start_date
                  sys_sku
                  template
                  tenant_id
                  title
                  up_sell_products
                  urn 
                }
            }`

    return q;
}


function getAllOrders(store_Id, sortData) {

let store_code = JSON.stringify(store_Id)
    const q = `query {
       allOrders(orderRequest: {storeId: ${store_code}}, ${sortData ? `pageRequest:{sortBy: "${sortData.sortBy}", sortOrder: "${sortData.sortOrder}", page: ${sortData.page}, 
       perPage: ${sortData.perPage}}` : ''}) {
        from
        lastPage
        perPage
        to
        total
        currentPage
        content{
          id
          orderId
          orderTotal
          orderDiscount
          addresses{
          nickName
            type
            address1
            address2
            address3
            city
            postal
            country
            zoneId
            province
          }
          items{
            itemTitle
            quantity
            itemPrice
            thumbnailImageUrl
          }
          status
          shipTotal
          customerEmail
          taxTotal
          createdAt
            updatedAt
            updatedBy
            createdBy
        }
      }
    }`
    return q;
}


function getOnlyOrderDetails(order_id){
    let uniqOrder = JSON.stringify(order_id)
    const q = `query {
        getOrder(id: ${uniqOrder}){
            id
            orderTotal
            orderDiscount
            orderId
            orderRefId
            addresses {
              nickName
              type
              address1
              address2
              address3
              city
              postal
              province
              country
              zoneId
            }
            items {
              itemTitle
              quantity
              itemPrice
              thumbnailImageUrl
              sku
              quantity
            }
            payments {
              amount
              status
              transactionId
              orderId
              orderPaymentId
              method
            }
            status
            sub_total
            shipTotal
            customerEmail
            giftWrapName
            giftWrapPrice
            taxTotal
            createdAt
            updatedAt
            updatedBy
            createdBy
        }
        }`
    return q;
}



function getItemsBySysSkuQuery(sysSkus) {
    let productSysSkus = JSON.stringify(sysSkus)
    const q = `query {
              getSource(itemRequest: {sys_sku: ${productSysSkus}}) {
                    attributable
                  available
                  basic_uom
                  cross_sell_products
                  custom_behavior{
                    key
                    value
                }
                variants{
                    sku
                    options{
                      display_text
                      option_name
                    }
                  }
                  default_currency
                  display_availability
                  display_stock_quantity
                  end_date
                  id
                  list_price
                  long_description
                  media{
                    kind
                    path
                  }
                  meta_description
                  meta_title
                  obsolete
                  prices{
                    sell_price
                    breakups{
                      end_qty
                      start_qty
                      value
                    }
                    currency
                    enable_breakup
                    minimum_sell_price
                    price_list_name
                  }
                  searchable
                  short_description
                  sku
                  slug
                  start_date
                  sys_sku
                  template
                  tenant_id
                  title
                  up_sell_products
                  urn 
                }
            }`

    return q;
}

function getItemsByIdQuery(ids) {
    let productIds = JSON.stringify(ids)
    const q = `query {
              getSource(itemRequest: {id: ${productIds}}) {
                    attributable
                  available
                  basic_uom
                  cross_sell_products
                  custom_behavior{
                    key
                    value
                }
                variants{
                    sku
                    options{
                      display_text
                      option_name
                    }
                  }
                  default_currency
                  display_availability
                  display_stock_quantity
                  end_date
                  id
                  list_price
                  long_description
                  media{
                    kind
                    path
                  }
                  meta_description
                  meta_title
                  obsolete
                  prices{
                    sell_price
                    breakups{
                      end_qty
                      start_qty
                      value
                    }
                    currency
                    enable_breakup
                    minimum_sell_price
                    price_list_name
                  }
                  searchable
                  short_description
                  sku
                  slug
                  start_date
                  sys_sku
                  template
                  tenant_id
                  title
                  up_sell_products
                  urn 
                }
            }`

    return q;
}

function getItemPriceQuery(skus) {
    let productSkus = JSON.stringify(skus)
    const q = `query {
              getPriceSource(priceRequest: {sku: ${productSkus}}) {
    id
    sku
    currency
    minimum_sell_price
    sell_price
    breakups {
      value
      start_qty
      end_qty
    }
  }
    }`
    return q;
}

function getCategoryByNameQuery(name) {
    let categoryName = JSON.stringify(name)
    const q = `query {
  allCategories(categoryRequest: {name: ${categoryName}}){
    name
    display_name
    id
    position
    short_description
    page_title
    products{
      position
      sku
    }
    slug
    sub_categories
  }
}`
    return q;
}

function getProductsByCategoryNameQuery(name, pageRequest, filterRequest) {
    let variants = JSON.stringify(filterRequest?.variants)
    variants = variants?.replace(/"([^"]+)":/g, '$1:')
    let behaviours = JSON.stringify(filterRequest?.behaviours)
    behaviours = behaviours?.replace(/"([^"]+)":/g, '$1:')
    let categoryName = JSON.stringify(name)
    const q = `query {
    productsByCategory(
        productRequest: { name: ${categoryName} }, 
        pageRequest: {page: ${pageRequest.page || 1}, 
        perPage: ${pageRequest.perPage || 5}
        ${pageRequest.sortBy ? `, sortBy: "${pageRequest.sortBy || ""}", sortOrder: "${pageRequest.sortOrder || ""}"` : "" } }, 
        filterRequest: {${filterRequest.min ? `min:${filterRequest.min}, max:${filterRequest.max},` : ""}${filterRequest.variants ? `variants: ${variants},` : ''}${filterRequest.behaviours ? `behaviours: ${behaviours}` : ''}}
        )
    {
    content{
      attributable
    available
    basic_uom
    cross_sell_products
    custom_behavior {
        key
        value
    }
    variants{
        sku
        options{
          display_text
          option_name
        }
  }
    default_currency
    display_availability
    display_stock_quantity
    end_date
    id
    list_price
    long_description
    media {
        kind
        path
    }
    meta_description
    meta_title
    obsolete
    prices {
      sell_price
      breakups {
        end_qty
        start_qty
        value
      }
      currency
      enable_breakup
      minimum_sell_price
      price_list_name
    }
    searchable
    short_description
    sku
    slug
    start_date
    sys_sku
    template
    tenant_id
    title
    up_sell_products
    urn
    }
    facets{
      key
      type
      label
      parentKey
      values{
        key
        value
      }
    }
    currentPage
    from
    lastPage
    perPage
    to
    total
  }
}`
    return q;
}

function getSearchProductsQuery(query, pageRequest) {
    let categoryName = JSON.stringify(name)
    const q = `query {
    search( key:"${query}",
            field:["sku","title"],
            pageRequest: {page: ${pageRequest.page || 1}, 
                    perPage: ${pageRequest.perPage || 5}
                    ${pageRequest.sortBy ? `, sortBy: "${pageRequest.sortBy || ""}", sortOrder: "${pageRequest.sortOrder || ""}"` : "" } }) 
    {
    content{
      attributable
    available
    basic_uom
    cross_sell_products
    custom_behavior {
      key
      value
    }
    default_currency
    display_availability
    display_stock_quantity
    end_date
    id
    list_price
    long_description
    media {
      kind
      path
    }
    meta_description
    meta_title
    obsolete
    prices {
      sell_price
      breakups {
        end_qty
        start_qty
        value
      }
      currency
      enable_breakup
      minimum_sell_price
      price_list_name
    }
    searchable
    short_description
    sku
    slug
    start_date
    sys_sku
    template
    tenant_id
    title
    up_sell_products
    urn
    }
    currentPage
    from
    lastPage
    perPage
    to
    total
  }
}`
    return q;
}

function getCategoryByIdQuery(ids) {
    let categoryIds = JSON.stringify(ids)
    const q = `query {
  allCategories(categoryRequest: {id: ${categoryIds}}){
    name
    display_name
    id
    position
    short_description
    page_title
    products{
      position
      sku
    }
    slug
    sub_categories
  }
}`
    return q;
}





function addAddressQuery(obj) {
    const q = `mutation{
                  addAddress(
                    addr: {
                     addressType: "${obj.addressType ? `${obj.addressType}` : ""}"
                      nickname: "${obj.nickname ? `${obj.nickname}` : ""}"
                      firstName: "${obj.firstName ? `${obj.firstName}` : ""}"
                      lastName: "${obj.lastName ? `${obj.lastName}` : ""}"
                      middleName: "${obj.middleName ? `${obj.middleName}` : ""}"
                      email: "${obj.email ? `${obj.email}` : ""}"
                      address1: "${obj.address1 ? `${obj.address1}` : ""}"
                      address2: "${obj.address2 ? `${obj.address2}` : ""}"
                      address3: "${obj.address3 ? `${obj.address3}` : ""}"
                      mobilePrefix: "${obj.mobilePrefix ? `${obj.mobilePrefix}` : ""}"
                      mobile: "${obj.mobile ? `${obj.mobile}` : ""}"
                      phonePrefix: "${obj.phonePrefix ? `${obj.phonePrefix}` : ""}"
                      phoneAreaCode: "${obj.phoneAreaCode ? `${obj.phoneAreaCode}` : ""}"
                      phone: "${obj.phone ? `${obj.phone}` : ""}"
                      faxAreaCode: "${obj.faxAreaCode ? `${obj.faxAreaCode}` : ""}"
                      fax: "${obj.fax ? `${obj.fax}` : ""}"
                      city: "${obj.city ? `${obj.city}` : ""}"
                      state: "${obj.state ? `${obj.state}` : ""}"
                      country: "${obj.country ? `${obj.country}` : ""}"
                      zip: "${obj.zip ? `${obj.zip}` : ""}"
                      company: "${obj.company ? `${obj.company}` : ""}"
                      companyType: "${obj.companyType ? `${obj.companyType}` : ""}"
                    }
                  ) {
                    nickname
                    firstName
                    lastName
                  }
                }`

    return q;
}



function checkOutModuleQuery(mode, obj, code) {
    let giftCode;
    let address_billing_id = obj?.address[0]?.address_id;
    let address_billing_type = obj?.address[0]?.address_type;
    let address_shipping_id = obj?.address[1]?.address_id;
    let address_shipping_type = obj?.address[1]?.address_type;
    let sameAsBilling = obj?.address[1]?.same_as_billing;
    console.log(obj, 'obj')
    const q = `mutation{
    orderCreate(
        checkoutRequest: {
          address: [
                    {addressId:"${address_billing_id ? address_billing_id : ''}", addressType:${address_billing_type ? address_billing_type : ''}},
                    {addressId:"${address_shipping_id ? address_shipping_id: ''}", addressType:${address_shipping_type ? address_shipping_type : ''}, sameAsBilling: ${sameAsBilling ? sameAsBilling : false}}
                   ]
                   ${obj.gift_code ? `giftCode:["${obj.gift_code}"]` : ''}
                   ${obj.promotion_code ? `promotionCode:"${obj.promotion_code}"`: ''}
                   ${obj.gift_wrap_name ? `giftWrapName:"${obj.gift_wrap_name}"`: ''}
                   ${obj.gift_wrap_message ? `giftWrapMessage:"${obj.gift_wrap_message}"`: ''}
                   ${obj.gift_wrap_image ? `giftWrapImage:"${obj.gift_wrap_image}"`: ''}
        }
    mode: "${mode}"
    entity: "${code}"
  ){
    orderId
    tenantId
    store
    storeUrn
    products {
      sku
      systemSku
      customData {
        type
      }
      quantity
      itemTitle
      itemDescription
      salePrice
      taxable
      itemTax
      taxCode
      shipmentCost
      shipmentTax
      itemDiscount
      thumbnailImageUrl
      shipmentId
      itemWidth
      weightUnit
      itemHeight
      itemLength
      itemWeight
      dimensionUnit
    }
    shippingMethod {
      name
      code
      displayName
      rate
    }
    shipping
    promotionCode
    promotionStatus
    discountType
    discount
    promotionMessage
    giftMessage
    subTotal
    totalTax
    totalShipping
    total
    giftCertificateObject {
      giftCode
      giftMessage
      giftAmount
      giftUsedAmount
      status
    }
    giftWraps {
      name
      message
      price
      image
    }
    giftWrapObject {
      message
      image
      price
      status
      name
    }
    customer{
      customerId
      loginName
      name
      email
      realm
    }
}
}`
    return q;
}









function changePasswodQuery(obj) {
    const q = `mutation {
                changePassword(oldPassword: "${obj.inputOldPassword}", newPassword: "${obj.inputNewPassword}")
            }`
    return q
}

function fetchPriceFacetQuery(difference, categoryName) {
    const q = `query {
                priceFacets(difference:${difference}, category:["${categoryName}"])  {
                        from
                        to
                        doc_count
                        key
                }
            }`
    return q
}

function getCustomerQuery() {
    const q = `query {
  currentUser{
    username
    urn
    custID
    primaryEmail
    alternateEmail
    active
    verified
    attributes{
      key
      values
    }
    firstName
    middleName
    lastName
    nickname
    prefix
    suffix
    gender
    ethnicity
    homePhonePrefix
    homePhone
    mobilePhonePrefix
    mobilePhone
    faxAreaCode
    fax
    birthday
    lastLoginTime
    segment 
  }
}`
    return q
}

function updateCustomerQuery(obj) {
    const q = `mutation {
                updateCustomer(cust: {
                    email: "${obj.primaryEmail ? `${obj.primaryEmail}` : ""}"
                    alternateEmail : "${obj.alternateEmail ? `${obj.alternateEmail}` : ""}"
                    active : ${obj.active ? true : false}
                    verified : ${obj.verified ? true : false}
                    firstName : "${obj.firstName ? `${obj.firstName}` : ""}"
                    middleName :"${obj.middleName ? `${obj.middleName}` : ""}"
                    lastName : "${obj.lastName ? `${obj.lastName}` : ""}"
                    nickname : "${obj.nickname ? `${obj.nickname}` : ""}"
                    prefix : "${obj.prefix ? `${obj.prefix}` : ""}"
                    suffix : "${obj.suffix ? `${obj.suffix}` : ""}"
                    gender : "${obj.gender ? `${obj.gender}` : ""}"
                    ethnicity : "${obj.ethnicity ? `${obj.ethnicity}` : ""}"
                    homePhonePrefix : "${obj.homePhonePrefix ? `${obj.homePhonePrefix}` : ""}"
                    homePhone : "${obj.homePhone ? `${obj.homePhone}` : ""}"
                    mobilePhonePrefix : "${obj.mobilePhonePrefix ? `${obj.mobilePhonePrefix}` : ""}"
                    mobilePhone : "${obj.mobilePhone ? `${obj.mobilePhone}` : ""}"
                    faxAreaCode : "${obj.faxAreaCode ? `${obj.faxAreaCode}` : ""}"
                    fax : "${obj.fax ? `${obj.fax}` : ""}"
                    birthday : ${obj.birthday ? obj.birthday : 0}
                    avatar: "${obj.avatar ? `${obj.avatar}` : ""}"
                    attributes: [${obj.attributes.map(attr => `{key: "${attr.key}", values: [${attr.values.map(v => `"${v}"`)}]}`)}]
                }){
                firstName
                lastName
                alternateEmail
                }
            }`
    return q
}

function updateAddressQuery(obj) {
    const q = `mutation {
                      modifyAddress(
                        id: "${obj.id}"
                        addr: {
                          addressType: "${obj.addressType ? `${obj.addressType}` : ""}"
                          nickname: "${obj.nickname ? `${obj.nickname}` : ""}"
                          firstName: "${obj.firstName ? `${obj.firstName}` : ""}"
                          lastName: "${obj.lastName ? `${obj.lastName}` : ""}"
                          middleName: "${obj.middleName ? `${obj.middleName}` : ""}"
                          email: "${obj.email ? `${obj.email}` : ""}"
                          address1: "${obj.address1 ? `${obj.address1}` : ""}"
                          address2: "${obj.address2 ? `${obj.address2}` : ""}"
                          address3: "${obj.address3 ? `${obj.address3}` : ""}"
                          mobilePrefix: "${obj.mobilePrefix ? `${obj.mobilePrefix}` : ""}"
                          mobile: "${obj.mobile ? `${obj.mobile}` : ""}"
                          phonePrefix: "${obj.phonePrefix ? `${obj.phonePrefix}` : ""}"
                          phoneAreaCode: "${obj.phoneAreaCode ? `${obj.phoneAreaCode}` : ""}"
                          phone: "${obj.phone ? `${obj.phone}` : ""}"
                          faxAreaCode: "${obj.faxAreaCode ? `${obj.faxAreaCode}` : ""}"
                          fax: "${obj.fax ? `${obj.fax}` : ""}"
                          city: "${obj.city ? `${obj.city}` : ""}"
                          state: "${obj.state ? `${obj.state}` : ""}"
                          country: "${obj.country ? `${obj.country}` : ""}"
                          zip: "${obj.zip ? `${obj.zip}` : ""}"
                          company: "${obj.company ? `${obj.company}` : ""}"
                          companyType: "${obj.companyType ? `${obj.companyType}` : ""}"
                        }
                      ) {
                        nickname
                        firstName
                        lastName
                      }
                    }`

    return q;
}


function deleteAddressQuery(id) {
    const q = `mutation {
                      deleteAddress(id: "${id}")
                }`
    return q;
}