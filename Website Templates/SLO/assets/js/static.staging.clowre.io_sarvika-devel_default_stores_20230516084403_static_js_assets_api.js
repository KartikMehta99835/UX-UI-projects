async function getCustomerGQL(query, showLoader=true) {
	const url = `${store.urls.base}/graph/query`;
	try {
		const res = await postHttp(url, JSON.stringify({
			query
		}), null, showLoader);
		return res;
	} catch (error) {
		throw error;
	}
}

function getLogin() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
			if (xmlhttp.status >= 200 && xmlhttp.status <= 299) {
				var response = JSON.parse(xmlhttp.responseText)
				loginData = response;
				customer = response.username;
				showLoginData(response);
			} else if (xmlhttp.status >= 400 && xmlhttp.status <= 499) {
				//window.location.href = store.urls.base
			} else {}
		}
	};
	xmlhttp.open("GET", `${store.urls.identity}/basic/introspect/self`, false);
	xmlhttp.withCredentials = true;
	XMLHttpRequest.responseType = "json";
	xmlhttp.send();
}

async function callRegisterApi(data) {
	const url = `${store.urls.base}/api/register`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callForgotPasswordApi(data) {
	const url = `${store.urls.base}/api/forgot-password`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function getLoginApi() {
	const url = `${store.urls.identity}/basic/introspect/self`;
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function getCategoryApi() {
	try {
		let fetchRes = await fetch(`${store.urls.base}/api/categories/${store.code}/children`);
		return await fetchRes.json();
	} catch (error) {

	}
}

async function getSubMenuApi(id) {
	try {
		let fetchRes = await fetch(`${store.urls.base}/api/categories/${id}/children`);
		return await fetchRes.json();
	} catch (error) {

	}
}

async function callGetCountriesById() {
	const url = `${mdsUrl}${btoa(
    storeUrn
  )}/country?per_page=10000&page=1`;
	try {
		const res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callGetStatesById(countryCode) {
	const url = `${mdsUrl}countries/${countryCode}/state`;
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callRetailAddressListApi(pageDetails) {
	const url = `${baseUrl}/store-shipping/api/retail/fetch/${store.tenant_id}?page=${pageDetails?.page}&per_page=${pageDetails?.per_page}&store=${store?.urn}&sort_by=${pageDetails?.sort_by}&sort_order=${pageDetails?.sort_order}&q=${pageDetails?.q}`
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callGetCountriesApi() {
	const url = `${mdsUrl}countries?per_page=999&page=1`;
	try {
		const res = await getHttp(url);
		return res.data;
	} catch (error) {
		throw error;
	}
}

async function callGetStoreCountriesApi() {
	const url = `${mdsUrl}mds/${btoa(store.urn)}/countries`;
	try {
		const res = await getHttp(url);
		return res.data;
	} catch (error) {
		throw error;
	}
}

async function fetchAllCurrencies(key, defaultCurrency) {
	const url = `https://v6.exchangerate-api.com/v6/${key}/latest/${defaultCurrency}`;
	try {
		const res = await getHttp(url);
		return res.data;
	} catch (error) {
		throw error;
	}
}

async function fetchAllExchangeRates(key, defaultCurrency) {
	const url = `https://v6.exchangerate-api.com/v6/${key}/latest/${defaultCurrency}`;
	try {
		const res = await getHttp(url);
		return res.data;
	} catch (error) {
		throw error;
	}
}


async function callGetStatesApi(countryCode) {
	const url = `${mdsUrl}countries/${countryCode}/state?per_page=999&page=1`;
	try {
		let res = await getHttp(url);
		return res.data;
	} catch (error) {
		throw error;
	}
}

async function callGetStoreStatesApi(countryCode) {
	const url = `${mdsUrl}mds/${btoa(store.urn)}/country/${countryCode}/states`;
	try {
		let res = await getHttp(url);
		return res.data;
	} catch (error) {
		throw error;
	}
}

async function callGetCartApi() {
    let cartId = getCookie('cartId') || null;
	<!--let cartId = localStorage.getItem('cartId')-->
	let url = "";
	if (customer) {
		url = `${baseUrlCart}${store.tenant_id}/${store.code}?customer=${customer}`;
	} else {
		url = `${baseUrlCart}${store.tenant_id}/${store.code}?cart_id=${cartId}`;
	}

	try {
		const res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callCreateCartApi(data) {
	const url = `${baseUrlCart}${store.tenant_id}/${store.code}?customer=${customer}`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callUpdateCartApi(data) {
    let cartId = getCookie('cartId') || null;
	<!--let cartId = localStorage.getItem('cartId')-->
	let url = "";
	if (customer) {
		url = `${baseUrlCart}${store.tenant_id}/${store.code}?customer=${customer}`;
	} else {
		url = `${baseUrlCart}${store.tenant_id}/${store.code}?cart_id=${cartId}`;
	}

	try {
		const res = await putHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callAddNewProductApi(data) {
    let cartId = getCookie('cartId') || null;
	<!--let cartId = localStorage.getItem('cartId');-->
	if (!cartId) {
		cartId = null;
	}
	let url = "";
	if (customer) {
		url = `${baseUrlCart}${store.tenant_id}/${store.code}/new?customer=${customer}`;
	} else {
		url = `${baseUrlCart}${store.tenant_id}/${store.code}/new?cart_id=${cartId}`;
	}

	try {
		const res = await putHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callAttachCustomerApi() {
    let cartId = getCookie('cartId') || null;
	<!--let cartId = localStorage.getItem('cartId');-->
	const url = `${baseUrlCart}${store.tenant_id}/${store.code}/customer?customer=${customer}&cart_id=${cartId}`;
	try {
		let res = await putHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callUpdateCartProductApi(data) {
	if (customer) {
		const url = `${baseUrlCart}${store.tenant_id}/${store.code}/new?customer=${customer}`;
	} else {
		const url = `${baseUrlCart}${store.tenant_id}/${store.code}/new?cart_id=${cartId}`;
	}

	try {
		const res = await putHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callDeleteProductFromCartApi(cartId, cartProductId) {
	const url = `${baseUrlCart}${store.tenant_id}/${store.code}/${cartId}?customer=${customer}&cart_product_id=${cartProductId}`;
	try {
		const res = await deleteHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callAllCartsApi() {
	const url = `${baseUrlCart}${store.tenant_id}/${store.code}/save/all?customer=${customer}`;
	try {
		const res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callRestoreCartApi(cartId) {
	const url = `${baseUrlCart}${store.tenant_id}/${store.code}/save/restore?cart_id=${cartId}&customer=${customer}`;
	try {
		const res = await putHttp(url, "");
		return res;
	} catch (error) {
		throw error;
	}
}

async function callSaveCartApi(cartId, name) {
	const url = `${baseUrlCart}${store.tenant_id}/${store.code}/save/${name}?cart_id=${cartId}&customer=${customer}`
	try {
		const res = await putHttp(url, "")
		return res;
	} catch (err) {
		throw err;
	}
}

async function callDeleteCartApi(cartId) {
	const url = `${baseUrlCart}${store.tenant_id}/${store.code}/save?cart_id=${cartId}&customer=${customer}`;
	try {
		const res = await deleteHttp(url);
		return res;
	} catch (err) {
		throw err;
	}
}

async function callCheckoutApi(data) {
	const url = `${baseUrlCheckout}${store.tenant_id}/${store.code}?customer=${customer}&realm=${loginData.issuer.Name}&mode=order`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function validateAddressApi(data) {
	const url = `${baseUrlCheckout}${store.tenant_id}/${store.code}/address/validation`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callGetCheckoutDataApi(mode, data) {
	const url = `${baseUrlCheckout}${store.tenant_id}/${store.code}?customer=${customer}&realm=${loginData.issuer.Name}&mode=${mode}`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

// async function callPromotionDataApi(mode,data){
//     const url = `${baseUrlCheckout}${store.tenant_id}/${store.code}?customer=${customer}&realm=${loginData.issuer.Name}&mode=${mode}`;
//      try{
//         const res = await postHttp(url,JSON.stringify(data));
//         return res;
//      }
//      catch(error){
//           throw error;
//      }
// }

async function callGetAllAddressesApi(q) {
	const url = `${store.urls.base}/api/account/addresses?from=1&page=1&query=&perPage=5`;
	try {
		const res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callGetAddressApi(addressId) {
	const url = `${store.urls.base}/api/account/addresses/${addressId}`;
	const options = {
		credentials: 'include',
	}
	try {
		let res = await getHttp(url, options);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callUpdateAddressApi(addressId, data) {
	const url = `${store.urls.base}/api/account/addresses/${addressId}`;
	const options = {
		credentials: 'include',
	}
	try {
		let res = await putHttp(url, JSON.stringify(data), options);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callGetAppIdApi() {
	const url = `${baseUrlPayment}app_master/STORE:${store.code}`;
	const options = {
		headers: {
			'X-Cw-Tenant-Id': store.tenant_id
		}
	}
	try {
		let res = await getHttp(url, options);
		return res;
	} catch (error) {
		throw error;
	}
}

async function getWalletAmount(user_id, app_id) {
	const url = `${baseUrlPayment}/wallet/${user_id}`;
	const options = {
		headers: {
			'X-Cw-Tenant-Id': store.tenant_id,
			'Application-Id': app_id
		}
	}
	try {
		const res = await getHttp(url, options);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callPaymentApi(data) {
	const url = `${baseUrlOrder}oms/payment/${store.tenant_id}/${store.code}/initiate`;
	try {
		let res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callOrderStatusApi(orderId) {
	const url = `${baseUrlOrder}/order/status/${store.tenant_id}/${orderId}`
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

<!--async function callOrderSingleItemDataApi(orderId) {-->
<!--	const url = `${baseUrlOrder}/oms/order/${orderId}?storeId=${store.urn}&tenantId=${store.tenant_id}`-->
<!--	const options = {-->
<!--	    headers: {-->
<!--			'X-Cw-Tenant-Id': store.tenant_id,-->
<!--		}-->
<!--	}-->
<!--	try {-->
<!--		let res = await getHttp(url, options);-->
<!--		return res;-->
<!--	} catch (error) {-->
<!--		throw error;-->
<!--	}-->
<!--}-->

async function callGetPaymentGatewaysApi(appId, amount) {
	const url = `${baseUrlPayment}gateway?amount=${amount}`;
	const options = {
		headers: {
			'X-Cw-Tenant-Id': store.tenant_id,
			'Application-ID': appId
		}
	}

	try {
		let res = await getHttp(url, options);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callOrderListApi(pageDetails) {
	const url = `${baseUrlOrder}oms/order/search?storeId=${store.code}&page=${pageDetails.currentPage}&query=${pageDetails.query}&perPage=${pageDetails.perPage}&sortBy=${pageDetails.sortBy}&sortOrder=${pageDetails.sortOrder}&customerId=${loginData.cust_id}&tenantId=${store.tenant_id}&realm=${store.realm_name}&loginName=${loginData.username}`
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callQuestionListApi(pageDetails, products) {
	const url = `${baseUrl}/store-reviews/api/question/${store.tenant_id}?store=${store.urn}&page=${pageDetails.currentPage}&rateable=${products}&perPage=${pageDetails.perPage}&sortBy=${pageDetails.sortBy}&sortOrder=${pageDetails.sortOrder}`
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callInventoryListApi(sku) {
	const url = `${baseUrl}/inventory/api/inventory/${store.tenant_id}/ssku/${sku}`
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callCreateQuestionApi(data) {
	const url = `${baseUrl}/store-reviews/api/question/${store.tenant_id}`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callReviewListApi(pageDetails, products) {
	const url = `${baseUrl}/store-reviews/api/review/${store.tenant_id}?store=${store.urn}&page=${pageDetails.currentPage}&rateable=${products}&perPage=${pageDetails.perPage}&sortBy=${pageDetails.sortBy}&sortOrder=${pageDetails.sortOrder}`
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {

		throw error;
	}
}

async function callCreateReviewApi(data) {
	const url = `${baseUrl}/store-reviews/api/review/${store.tenant_id}`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callCreateReviewMedia(data, sku) {
	const url = `${store.urls.api}/media-manager/-/spaces/default/files/-/stores/${store.code}/review/${sku}`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callAvgRatingApi(products) {
	const url = `${baseUrl}/store-reviews/api/review/${store.tenant_id}/avg?rateable=${products}&store=${store.urn}`;
	try {
		let res = await getHttp(url);
		return res;
	} catch (error) {
		throw error;
	}
}

async function callFeaturesApi(data) {
	const url = `${baseUrl}/store-reviews/api/feature/${store.tenant_id}?store=${store.urn}`;
	try {
		const res = await postHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callQusFeedbackApi(id, data) {
	const url = `${baseUrl}/store-reviews/api/question/${store.tenant_id}/feedback/${id}`
	try {
		const res = await putHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}

async function callReviewFeedbackApi(id, data) {
	const url = `${baseUrl}/store-reviews/api/review/${store.tenant_id}/feedback/${id}`
	try {
		const res = await putHttp(url, JSON.stringify(data));
		return res;
	} catch (error) {
		throw error;
	}
}