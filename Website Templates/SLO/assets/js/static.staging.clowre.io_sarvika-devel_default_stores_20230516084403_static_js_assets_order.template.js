function viewOrderTemplate(order){
    var itemsDetail = getItemsDetail(order.items);
    var template = ``;
    var mediaExtra = `/stores/${store.code}`
    let retail = ""
    let shipping = ""
    order.addresses.forEach(s => {
        if(s.type === 'SHIPPING'){
            shipping = s.type
        }else if(s.type === 'RETAIL'){
            retail = s.type
        }
    })
    let addType = shipping !== "" ? shipping : retail
    template+=`<div class="modal-content">
                   <div class="modal-header">
                      <h5 class="modal-title" id="vieworderModal">Your Order Details</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-body">
                      <div class="row mb-3 align-items-center">
                         <div class="col-md-5 d-flex align-items-center">
                            <p class="typo__p--16">Order ID :</p>
                            <p> ${order.orderId}</p>
                         </div>
                         <div class="col-md-3"><a class="track_order_btn ${order.orderRefId ? '' : 'd-none'}" target="_blank" href="${order.orderRefId ? order.orderRefId : ''}">Track Order</a></div>
                         <div class="col-md-4 d-flex justify-content-end align-items-center">
                            <p class="typo__p--16">Status
                            ${getOrderStatusTemplate(order.status)}
                               
                            </p>
                            <div class="dropdown">
                            ${order.status.toLowerCase() == "payment_failed" || order.status.toLowerCase() == "payment_pending" ? (`<button type="button" class="store_btn store_btn-sm store_btn--outline dropdown-toggle btn-edit js-edit" id="dropdownMenuLink" data-bs-toggle="dropdown">Retry Payment </button>`) : ""}
                           <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                           ${Object.values(paymentGateways).map((item,i)=>(
                            `<li><a data-order='${JSON.stringify(order)}' data-item='${JSON.stringify(item)}' class="dropdown-item" href="javascript:void(0)" onclick="retryPayment(this)">${item.name}</a></li>`)).join('')}
                           </ul>
                         </div>
                      </div>
                      </div>
                      <div class="vieworderproduct ">
                         ${order.items.map((item,i)=>{
                            var imageUrl = item.thumbnailImageUrl ? store.urls.media+item.thumbnailImageUrl : store.urls.media+"/static/images/products/small/no_image.jpg"
                            return `<div class="vieworderproduct__row vieworder">
                            <div class="row align-items-center">
                               <div class="col-lg-6">
                                  <div class="d-flex align-items-center">
                                     <div class="vieworderproduct__thumb flex-shrink-0">
                                        <a href="javascript:void(0)">
                                        
                                        <img src='${imageUrl}' height="60px" /></a>
                                     </div>
                                     <div class="vieworderproduct__item_detail flex-grow-1 ms-3">
                                        <h6 class="vieworderproduct__item_title typo__p--18">
                                           <a href="${store.urls.base}/p-${item.sku.toLowerCase()}">${item.itemTitle}</a>
                                        </h6>
                                        <div class="vieworderproduct__item_property">
                                        <p class="typo__p--14">
                                          <span class="vieworderproduct__item_property--key">Qty</span>
                                          <span class="vieworderproduct__item_property--value light_text">${item.quantity}</span>
                                          </p>
                                          </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>`
                         }).join('')}
                      </div>
                      <div class="row mt-4">
                         <div class="col-md-6">
                            <p class="typo__p--14">Subtotal (${order.items.length} items) :</p>
                            <p class="typo__p--14">Shipping Charges :</p>
                            <p class="typo__p--14">Tax Applied :</p>
                            ${order.giftWrapName ? '<p class="typo__p--14">Gift Wrap Applied :</p>' : ''}
                            ${order.orderDiscount ? '<p class="typo__p--14">Coupon Applied :</p>' : ''}
                            <p class="typo__p--16">Total :</p>
                         </div>
                         <div class="col-md-6">
                            <p class="typo__p--14 d-flex align-items-center"> ${storeCurrencySymbol} ${RoundToTwoDecimal(order.sub_total)} <span class="currency-converted d-block ms-2" data-price="${RoundToTwoDecimal(order.sub_total)}"></span></p>
                            <p class="typo__p--14 d-flex align-items-center"> ${storeCurrencySymbol} ${RoundToTwoDecimal(order.shipTotal)} <span class="currency-converted d-block ms-2" data-price="${RoundToTwoDecimal(order.shipTotal)}"></span></p>
                            <p class="typo__p--14 d-flex align-items-center"> ${storeCurrencySymbol} ${RoundToTwoDecimal(order.taxTotal)} <span class="currency-converted d-block ms-2" data-price="${RoundToTwoDecimal(order.taxTotal)}"></span></p>
                            ${order.giftWrapName ? `<p class="typo__p--14 d-flex align-items-center">${storeCurrencySymbol} ${RoundToTwoDecimal(order.giftWrapPrice)} <span class="currency-converted d-block ms-2" data-price="${RoundToTwoDecimal(order.giftWrapPrice)}"></span></p>` : ''}
                            ${order.orderDiscount ? `<p class="typo__p--14 d-flex align-items-center">-${storeCurrencySymbol} ${RoundToTwoDecimal(order.orderDiscount)} <span class="currency-converted d-block ms-2" data-price="${RoundToTwoDecimal(order.orderDiscount)}"></span></p>` : ''}
                            <p class="typo__p--16 d-flex align-items-center"> ${storeCurrencySymbol} ${RoundToTwoDecimal(order.orderTotal)} <span class="currency-converted d-block ms-2" data-price="${RoundToTwoDecimal(order.orderTotal)}"></span></p>
                         </div>
                      </div>
                      <div class="row">
                         <div class="col-md-12">
                            <p class="typo__p--16 mt-3"> Payment Information</p>
                         </div>
                      </div>
                      <div class="row">
                          <div class="table-responsive">
                          <table class="table">
                              <thead>
                                  <th>Payment Method</th>
                                  <th>Transaction ID</th>
                                  <th>Amount</th>
                                  <th>Status</th>
                              </thead>
                              <tbody>
                                ${order.payments.map(item => `<tr><td >${item.method}</td> <td>${item.transactionId}</td><td>${item.amount} <span class="currency-converted d-block me-2" data-price="${RoundToTwoDecimal(item.amount)}"></span></td> <td><span class="${item.status === 'SUCCESS' ? 'badge rounded-pill bg-success' : item.status === 'FAILED' ? 'badge rounded-pill bg-danger' : 'badge rounded-pill bg-warning text-dark' }">${item.status}</span></td></tr>`).join("")}
                              </tbody>
                          </table>
                          </div>
                         <!--<div class="col-md-6">-->
                         <!--   <p class="typo__p--14">Payment Method :</p>-->
                         <!--   <p class="typo__p--14">Transaction ID :</p>-->
                         <!--</div>-->
                         <!--<div class="col-md-6">-->
                         <!--   <p class="typo__p--14"> ${order.payments[0].method}</p>-->
                         <!--   <p class="typo__p--14"> ${order.payments[0].transactionId}</p>-->
                         <!--</div>-->
                      </div>
                      <div class="row mt-3">
                         <div class="col-md-6">
                            <div class="form-group">
                               <p class="typo__p--16">Date</p>
                               <!--<p>${getDateTime(order.created_at)}</p>-->
                               <p>${moment(order.createdAt).format('MMM Do YYYY, h:mm:ss A')}</p>
                            </div>
                         </div>
                         <div class="col-md-6">
                            <div class="form-group">
                               <p class="typo__p--16">Email</p>
                               <p>${order.customerEmail}</p>
                            </div>
                         </div>
                      </div>
                      <!--<div class="row mt-3">-->
                      <!--   <div class="col-md-6">-->
                      <!--      <div class="form-group">-->
                      <!--         <p class="typo__p--16">Email</p>-->
                      <!--         <p>${order.customerEmail}</p>-->
                      <!--      </div>-->
                      <!--   </div>-->
                      <!--</div>-->
                      <div class="row mt-3">
                         <div class="col-md-6">
                            <div class="form-group">
                               <p class="typo__p--16">Shipping Address</p>
                               <p>${getAddress(getObjectfromArray('type', addType, order.addresses))}</p>
                            </div>
                         </div>
                         <div class="col-md-6">
                            <div class="form-group">
                               <p class="typo__p--16">Billing Address</p>
                               <p>${getAddress(getObjectfromArray('type', 'BILLING', order.addresses))}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>`;
                return template;
}

function getOrdersListingTemplate(array){
    var templete = ``;
    if(array?.length > 0){
        for(order of array){
                var orderString = JSON.stringify(order)
                let retail = ""
                let shipping = ""
                order.addresses.forEach(s => {
                    if(s.type === 'SHIPPING'){
                        shipping = s.type
                    }else if(s.type === 'RETAIL'){
                        retail = s.type
                    }
                })
                let addType = shipping !== "" ? shipping : retail
                templete+=`<tr>
                              <th scope="row"> <p>${order.orderId} </p></th>
                              <td><p>${moment(order.createdAt).format('MMM Do YYYY, h:mm:ss A')}</p></td>
                              <td> <p>${getAddress(getObjectfromArray('type', addType,  order.addresses))}</p></td>
                              <td><p>${storeCurrencySymbol} ${order.orderTotal} <span class="currency-converted d-block me-2" data-price="${RoundToTwoDecimal(order.orderTotal)}"></span></p></td>
                              <td> ${getOrderStatusTemplate(order.status)}</td>
                              <td><div class="dropdown">
                                  <a class="more-btn" id="dropdownMenuLink" data-bs-toggle="dropdown">
                                     <span class="more-dot"></span>
                                     <span class="more-dot"></span>
                                     <span class="more-dot"></span>
                               </a>   
                               <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                   <li class="more-menu-item">
                                     <a data-id="${order.id}" class="more-menu-btn" role="menuitem" onclick="openOrderDataModal()">
                                         <i class="ti-eye actionicon"></i> View</a>
                                   </li>
                                   <li class="more-menu-item d-none" role="presentation">
                                     <a class="more-menu-btn" role="menuitem">
                                     <i class="ti-location-pin actionicon"></i> Track</a>
                                   </li>
                               </ul>
                               </td>
                             </tr>`;
            }
    } else {
        get('[data-id = "orderDetail"]').innerHTML = '<h4 class="noProducts"> No Orders Found</h4>'
    }
    
    return templete;
}