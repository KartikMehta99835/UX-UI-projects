

jQuery("#carousel").owlCarousel({
  autoplay: true,
  margin: 20,
  /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoHeight: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  dots:false,
  nav: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 4
    }
  }
});


jQuery("#carousel2").owlCarousel({
  autoplay: true,
  rewind: true, /* use rewind if you don't want loop */
  margin: 20,
  /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 7000,
  smartSpeed: 800,
  dots:false,
  nav: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 4
    }
  }
});
    
    
    function getLoginData(){
        if(get(".merc-login-link")){
            get(".merc-login-link").setAttribute("href",loginUrl);
        }
    }
    
    const searchProduct = (event) => {
        var searchText = get("#header_search").value
        if(!searchText){
            return
        }
        if(event.key === 'Enter'){
         window.location.href = `${storeBase}/search?q=${searchText}`
        }else if(btn) {
            window.location.href = `${storeBase}/search?q=${searchText}`
        }
    }
    
    
    let categoryLinkItems = {
        storeCode: store.code,
        allId:''
    }
    
    
    function getCategories(){
        getCustomerGQL(getAllStoreCategory(store.code)).then(async function(response){
         if(response?.data.data.allCategories.length >= 1 && response?.data.data.allCategories[0].sub_categories.length >= 1){
            getCustomerGQL(getAllSubCategory(response.data.data.allCategories[0].sub_categories)).then(async function(response){
                if(response?.data.data.allCategories.length >= 1){
                    getTemplate(response.data.data.allCategories)
                }
            }).catch(function(err){
                notificationbar("error",err.code);
            })
         
         }
        }).catch(function(err){
                notificationbar("error",err.code);
            })
    }
    
    
    
    
    
    
    
          function createQuestion(formValidateObject){
               let element = get('#addQuestion')
             let backDrop = get('body')
             let removeBackDrop = get('.modal-backdrop')
        var data = {
            store: store.urn,
            customer_name:loginData.username,
            // store:get("#questionForm #store").value,
            rateable:get("#questionForm #rateable").value,
            question:get("#questionForm #question").value,
        }
        
        callCreateQuestionApi(data).then(function(res){
            notificationbar("success", checkErrorFromLocalAndGlobal('es_questonAdded'));
               element.classList.remove("show");
                backDrop.classList.remove('modal-open')
                element.style.display = 'none'
                removeBackDrop.style.display = 'none'
                removeBackDrop.classList.remove('modal-backdrop')
                get('[name="questionForm"]').reset();
        }).catch(function(error){
            setApiErrors(formValidateObject,error.data.field_errors)
            notificationbar("error", error.status === 400 ? checkErrorFromLocalAndGlobal('es_questonExist') : error.code );
        })
    }
          function storeReviewMedia(){
              let sku = document.querySelector('[data-id="productDetails"]').getAttribute("data-sku")
              let data;
              callCreateReviewMedia(data, sku).then(function(res){
                    notificationbar("success", checkErrorFromLocalAndGlobal('es_reviewAdded'));
                    // createReviews(formValidateObject)
                }).catch(function(error){
                notificationbar("error", error.code);
            })
          }

        function createReviews(formValidateObject){
                let featureArray = []
                 let starRating = 0
                
                let featureGetData = document.querySelectorAll("#feature_rating_title")
                 let featureInputValue = document.querySelectorAll(".fe_star")
                 let getFeatureID = document.querySelectorAll(".feature_ratings_wrapper")
                 for(var i = 0; i < featureGetData.length; i++) {
                    var current = featureGetData[i];
                     let featureName = current.attributes['data-name'].value
                        let featureId = current.attributes['data-id'].value
                        let featureValue = ''
                   let featureRatings = document.querySelectorAll(`[name="${current.attributes['data-name'].value}"]`)
                    for(let i = 0; i < featureRatings.length; i++) {
                    let currentInput = featureRatings[i];
                if(currentInput.checked ){
                  featureValue = currentInput.value
                }
                 }
                featureArray.push({
                    feature_id: featureId,
                    name: featureName,
                    rating: featureValue,
                })
                 }
                 
                 let stars = document.querySelectorAll(".star")
                 stars.forEach(star => {
                     if(star.checked){
                         starRating = star.value
                     }
                 })
                 
        var data = {
            store: store.urn,
            rateable:get("#reviewForm #rateable").value,
            rating: starRating,
            title:get("#reviewForm #title").value,
            customer_name:loginData.first_name,
            customer:loginData.username,
            text:get("#reviewForm #text").value,
            feature_ratings: featureArray,
            created_at:Date.parse(get("#reviewForm #created_at").value),
        //     feature_ratings: [
        //     {
        //         name:get("#reviewForm #rating").value,
        //         rating:get("#reviewForm .starThree").value,
        //         rating:get("#reviewForm .starThree").value,
        //         rating: starRating,
        //         feature_id:get("#reviewForm #rate").value,
        //         text:get("#reviewForm #rating").value,
        //     }
        // ],
    media: [
    {
      kind:kind,
      path:src,
    }
  ],
          
            
        }
        let element = get('#rateProduct')
        let backDrop = get('body')
        let removeBackDrop = get('.modal-backdrop')
        callCreateReviewApi(data).then(function(res){
            notificationbar("success",checkErrorFromLocalAndGlobal('es_reviewAdded'));
                reviewsForm.reset()
               element.classList.remove("show");
                backDrop.classList.remove('modal-open')
                element.style.display = 'none'
                removeBackDrop.style.display = 'none'
                removeBackDrop.classList.remove('modal-backdrop')
        }).catch(function(error){
            setApiErrors(formValidateObject,error.data.field_errors)
            notificationbar("error", error.code === 'ERR_REVIEW_EXIST' ? checkErrorFromLocalAndGlobal('es_reviewExist'): error.code);
            
        })
    }

    function createFeatures(formValidateObject){
        var data = {
            // key:get("#reviewForm #key").value,
            // value:get("#reviewForm #value").value, rateable
            key: 'product',
            value:get("#rateable").value,
        }
        callFeaturesApi(data).then(function(res){
            <!--notificationbar("success","features is successfully added");-->
            if(res.length > 1){
                notificationbar("success", checkErrorFromLocalAndGlobal('es_reviewAdded'));
            }
        }).catch(function(error){
        setApiErrors(formValidateObject,error.data.field_errors)
            notificationbar("error", error.code);
        })
    }
    
      function updateReviewFeedback(event){
          let id = event.attributes["data-id"].value
          let HELPFUL = event.attributes["data-one"]?.value
          let NOT_HELPFUL = event.attributes["data-two"]?.value
          let ABUSE = event.attributes["data-three"]?.value
          let data;
          if(HELPFUL) {
              data = {
                customer:loginData.username,
                status: 'HELPFUL',
            }
          }else if(NOT_HELPFUL){
               data = {
                customer:loginData.username,
                status: 'NOT_HELPFUL',
             }
          }else if(ABUSE){
              data = {
                customer:loginData.username,
                status: 'ABUSE',
            }
          }
        callReviewFeedbackApi(id, data).then(function(res){
            notificationbar("success", checkErrorFromLocalAndGlobal('es_feedbackAdded'));
        }).catch(function(error){
            notificationbar("error", error.code);
        })
    }
  function createRegistration(formValidateObject){
        var data = {
            first_name:get("#registrationForm #first_name").value,
            last_name:get("#registrationForm #last_name").value,
            email:get("#registrationForm #email").value,
            preferred_username:get("#registrationForm #preferred_username").value,
            flexCheckDefault:get("#registrationForm #inputEmail").value,
            preferred_password:get("#registrationForm #preferred_password").value,
            mobile_phone:get("#registrationForm #mobile_phone").value,
            mobile_phone_prefix:get("#registrationForm #mobile_phone_prefix").value,
            birthday:Date.parse(get("#registrationForm #birthday").value),
            type:get('#registrationForm [name="type"]').value,
            // getStates(response.data.country, getStateTemplate, response.data.state)
            // getCountries(getCountriesTemplete,response.data.country, response.data.mobile_phone_prefix);
            
        }
        callRegisterApi(data).then(function(res){
            notificationbar("success",checkErrorFromLocalAndGlobal('es_redistrationAdded'));
            window.location.href=loginUrl
        }).catch(function(error){
            <!--setApiErrors(formValidateObject,error.data.err)-->
            if(error.data?.field_errors?.preferred_username.length > 0){
                notificationbar("error", 'The minimum length must be greater than 8 characters');
            }else {
                notificationbar("error", error.data.err);
            }
        })
    }
    

    function forgotPassword(){
        var data = {
            email:"bharat.agrawal@sarvika.com",
        }
        callForgotPasswordApi(data).then(function(res){
            notificationbar("success",checkErrorFromLocalAndGlobal('es_passwordCreated'));
            //window.location.href=loginUrl
        }).catch(function(error){
        //setApiErrors(formValidateObject,error.data.field_errors)
            notificationbar("error", error.code);
        })
    }
    
 
    
    <!--function getTemplate(array){-->
    <!--    var template = ``;-->
    <!--    if(array && array.length){-->
    <!--    for(value of array){-->
    <!--        if(value.name && value.name!=store.code){-->
    <!--            if(value && value.sub_categories && value.sub_categories.length){-->
    <!--                template+= `<li class="nav-item dropdown submenu level0-menuItem">-->
    <!--                <a data-id=${value.slug} class="nav-link dropdown-toggle sml-none-icon" href="${value.slug}" onclick="window.location.href='${value.slug}'" data-bs-toggle="dropdown" onmouseover="getSubMenu(this)">-->
    <!--                ${value.display_name}-->
    <!--                </a>-->
    <!--                <button id="drp-toggle-sml" data-id=${value.slug} class="dropdown-toggle mobile-subMenu-button" data-bs-toggle="dropdown" onclick="getSubMenu(this)"></button>-->
    <!--                </li>`;-->
    <!--            }-->
    <!--            else{-->
    <!--                template+= `<li class="nav-item"><a class="nav-link" href="${value.slug}">${value.display_name}</a></li>`;-->
    <!--            }-->
    <!--        }-->
            
    <!--    }-->
    <!--    }-->
    <!--    get(".xsnav").innerHTML = template;-->
    <!--}-->
    
    
    
    // new sub menu
    
    function getTemplate(array){
        var template = ``;
        if(array && array.length){
        for(value of array){
            if(value.name && value.name!=store.code){
                if(value && value.sub_categories && value.sub_categories.length){
                    template+= `<li class="nav-item dropdown submenu level0-menuItem">
                    <a data-id=${value.slug} class="nav-link dropdown-toggle sml-none-icon" href="${value.slug}" onclick="window.location.href='${value.slug}'" data-bs-toggle="dropdown" onmouseover="getSubMenu(this)">
                    ${value.display_name}
                    </a>
                    <button id="drp-toggle-sml" data-id=${value.slug} class="dropdown-toggle mobile-subMenu-button" data-bs-toggle="dropdown" onclick="getSubMenu(this)"></button>
                    </li>`;
                }
                else{
                    template+= `<li class="nav-item"><a class="nav-link" href="${value.slug}">${value.display_name}</a></li>`;
                }
            }
            
        }
        }
        get(".xsnav").innerHTML = template;
    }
    
    
    
    
    
    
    
    function getSubTemplate(array,level){
        var template = ``;
        template+=`<ul class="dropdown-menu header-dropdown m-0 keep-open level${level}-menu">`;
        for(value of array){
            if(value.name && value.name!=store.code){
                if(value && value.sub_categories && value.sub_categories.length){
          template+=`<li class="nav-item dropdown submenu level${level}-menuItem"><a data-id=${value.slug} class="dropdown-item" href="${value.slug}" onmouseover="getSubMenu(this)">${value.display_name}</a></li>`;
                }
                else{
                    template+=`<li class="level${level}-menuItem"><a data-id=${value.slug} class="dropdown-item" href="${value.slug}">${value.display_name}</a></li>`;
                }
                }
        }
        template+=`</ul>`
        return template;
    }
    
    
    function getChildSubMenus(obj){
    var id = obj.getAttribute("data-id");
    var level = jQuery(obj).parents('ul').length;
        getSubMenuApi(id).then(data => {
             //insertAfter(getSubTemplate(data),obj)
             jQuery(obj).after(getSubTemplate(data,level));
            })
    }
    
    
    //Get Sub Categories
    function getSubMenu(thisObj){
        get('#drp-toggle-sml').classList.toggle('mobileSubMenu')
        if(jQuery(thisObj).siblings("ul").length == 0){
           getChildSubMenus(thisObj)
        }
    }
    
    
    function myAcountTemplates(){
        if(loginData && Object.keys(loginData).length == 0){
            window.location.href = loginUrl;
        }
        else{
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('myacc');
            jQuery(".JS_profileSection").hide();
            
            switch(myParam){
                case "myProfile":
                    jQuery('[data-id="myProfile"]').show();
                    get(".myaccount__options ul li:first-child a").classList.add('active');
                    getMyProfileData();
                    break;
                case "orderDetail":
                    jQuery('[data-id="orderDetail"]').show();
                    get(".myaccount__options ul li:nth-child(2) a").classList.add('active');
                    break;
                case "walletDetail":
                    jQuery('[data-id="walletDetail"]').show();
                    get(".myaccount__options ul li:nth-child(3) a").classList.add('active');
                    break;
                case "manage-address":
                    jQuery('[data-id="manageAddress"]').show();
                    get(".myaccount__options ul li:nth-child(4) a").classList.add('active');
                    break;

                case "change-password":
                    jQuery('[data-id="changePassword"]').show();
                    get(".myaccount__options ul li:nth-child(5) a").classList.add('active');
                    break;
            }
        }
        
    }
    
    function getMyProfileData(){
        try{
            document.myProfileForm.firstName.value = loginData.first_name
            document.myProfileForm.lastName.value = loginData.last_name
            document.myProfileForm.primaryEmail.value = loginData.primary_email
            document.myProfileForm.userName.value = loginData.username
            document.myProfileForm.alternateEmail.value = loginData.secondary_email
            document.myProfileForm.customerID.value = loginData.cust_id
        }
        catch{
            
        }
    }

    function showLoginData(response){
        var displayHeaderNameEle = get(".display_username_header");
        var displayUserNameEle = get(".display_username");
        var displayUserEmailEle = get(".display_useremail");
          if(response){
              displayHeaderNameEle.innerHTML = `<a class="nav-link" href="content/myaccount?myacc=myProfile">${response.first_name}</a><a onclick="logout()" href="javascript:void(0);" class="nav-link logout_acnhor"><i class="iconly-Logout"><i/></a>`;
              if(displayUserNameEle) displayUserNameEle.innerText = response.first_name + " " + response.last_name;
              if(displayUserEmailEle) displayUserEmailEle.innerText = response.username;
          }
    }
    
    
    function logout(){
        removeCookie('promotion')
        removeCookie('giftwrap')
        window.location.href = logoutUrl;
        removeCookie('cartId')
        <!--window.localStorage.removeItem('cartId');-->
        
    }
    
    function eventTrigger(event,element){
        switch (event){
            case "change":
                if ("createEvent" in document) {
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    element.dispatchEvent(evt);
                }
                else{
                    element.fireEvent(event);
                }
                break;
        }
    }

    function addNewProduct(data, redirectUrl){
        callAddNewProductApi(data).then(function(res){
        setCookie("cartId", res.data.cart_id)
              <!--localStorage.setItem('cartId', res.data.cart_id);-->
            window.location.href = redirectUrl;
        }).catch(function(error){
        let customError = error.data?.field_errors[data.products[0].sku].toString()
        let inventory = document.querySelector('#inven') ? document.querySelector('#inven').getAttribute('data-invetory') : ''
        let cmnError = error.data.field_errors[data.products[0].sku] || error.code
           notificationbar("error", customError === 'ERR_INVENTORY_NOT_SUFFICIENT' && inventory > 1 ?  checkErrorFromLocalAndGlobal('es_countIsOutOfStock') : cmnError);
        })
    }
    
    function updateCartProduct(data,redirectUrl){
        callUpdateCartProductApi(data).then(function(res){
            window.location.href = redirectUrl;
        }).catch(function(error){
            notificationbar("error", error.code);
        })
    }
    
    
    
    
    
    
    function notificationbar(className,value){
        var template = `<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-body ${className}">
            <span>${value}</span>
          </div>
        </div>`;
        
        get("#notificationbar").innerHTML = template;
        setTimeout(function(){
            get("#notificationbar").innerHTML = "";
        },100000)
    }
    
    
    
    function setDefaultData(){
            get('[name="billingRadio"]:first-child').checked = true;
            get('[name="shippingRadio"]:first-child').checked = true;
            get('[name="billingAddressId"]').value = get('[name="billingRadio"]:first-child').id
            get('[name="shippingAddressId"]').value = get('[name="shippingRadio"]:first-child').id
            
            $("input[name='shippingRadio']").click(function () {
              if ($("#radioBillingDiff").is(":checked")) {
                $(".checkout__shipping--form").slideDown();
              } else {
                $(".checkout__shipping--form").slideUp();
              }
            });
    }
    
    function getCheckoutCart(){
        callGetCartApi().then(function(res){
            get('[data-id="subtotal"]').innerHTML = res.data.cart_total.toFixed(2);
        }).catch(function(error){
            notificationbar("error", error.code);
        })
    }
    
    
    
    function resetAddressForm(){
        get('#addressForm').reset();
        $(".manage__address--edit").slideUp();
    }
    
    
    
    function changeCustomerPassword(){
        let data = fetchFormData(jQuery('[name="passwordForm"]'))

        getCustomerGQL(changePasswodQuery(data)).then(function(response){
                        if(response.data.errors){
                            notificationbar("error", response.data.errors[0].message);
                        }else{
                            notificationbar("success",checkErrorFromLocalAndGlobal('es_passwordUpdated'))
                        }
                    }).catch(function(err){
                        notificationbar("error",err);
                    })    
    }
    function updateCustomerAvatar(remove = false){
        let profileImg = get('#img-url').getAttribute('data-img') || ''
        getCustomerGQL(getCustomerQuery()).then(function(response){
            let custData = response.data?.data?.currentUser
            let attributes = []
             let obj = {...loginData?.attributes}
            if(remove){
                delete obj.avatar
                jQuery('#profile-photo').attr('src', "")
                get('#userFirstChar').classList.remove('d-none')
                get('.profile-circle').classList.remove('profile-delete')
                get('.profile-circle').classList.add('circle-bg')
                custData.avatar = ''
                get('#img-url').setAttribute('data-img', '')
            }
            Object.keys(obj).map(k => attributes.push({key: k, values: obj[k]}))
            custData.attributes = attributes
            custData.avatar = profileImg
          getCustomerGQL(updateCustomerQuery(custData)).then(function(response){
          if(response.data.errors.length > 0){
                throw response.data.errors[0].message
            }
              if(remove){
                notificationbar("error","Profile Data has been removed")
              }else {
                notificationbar("success","Profile Data has been update")
              }
                        
                        let customerDetail = response?.data?.data?.updateCustomer
                        loginData.first_name = customerDetail?.firstName
                        loginData.last_name = customerDetail?.lastName
                        loginData.secondary_email = customerDetail?.alternateEmail
                        showLoginData(loginData)
                        getMyProfileData();
                    }).catch(function(err){
                        notificationbar("error",err);
                    }) 
        }).catch(function(err){
                        notificationbar("error",err);
                    }) 
            
    }
    
    function updateCustomerProfile(){
        let data = fetchFormData(jQuery('[name="myProfileForm"]'))
        getCustomerGQL(getCustomerQuery()).then(function(response){
            let custData = response?.data?.data?.currentUser
            custData.firstName = data?.firstName
            custData.lastName = data?.lastName
            custData.alternateEmail = data?.alternateEmail
            let attributes = []
            let obj = {...loginData?.attributes}
            Object.keys(obj).map(k => attributes.push({key: k, values: obj[k]}))
            custData.attributes = attributes
            
          getCustomerGQL(updateCustomerQuery(custData)).then(function(response){
                        notificationbar("success","Profile Data has been updated")
                        let customerDetail = response?.data?.data?.updateCustomer
                        loginData.first_name = customerDetail?.firstName
                        loginData.last_name = customerDetail?.lastName
                        loginData.secondary_email = customerDetail?.alternateEmail
                        showLoginData(loginData)
                        getMyProfileData();
                    }).catch(function(err){
                        notificationbar("error",err);
                    }) 
        }).catch(function(err){
                        notificationbar("error",err);
                    }) 
            
    }
    
    function fetchCustomerSegment(){
        getCustomerGQL(getCustomerQuery()).then(function(response){
            let segmentTemp = "";
            if(response?.data?.data?.currentUser?.segment.length > 0){
                get('#groups').classList.remove('d-none')
            }
            response?.data?.data?.currentUser?.segment.map(s => {
                segmentTemp += `<span class="badge me-2 rounded-pill" style="background:#ffeded;color:#f54a42;font-weight:normal">${s}</span>`
            })
            get('#segment-content').innerHTML = segmentTemp
        }).catch(function(err){
            notificationbar("error",err);
        }) 
            
    }
    
    
    
    function eventTrigger(event,element){
        switch (event){
            case "change":
                if ("createEvent" in document) {
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    element.dispatchEvent(evt);
                }
                else{
                    element.fireEvent(event);
                }
                break;
        }
    }
    
      function updateQAFeedback(event){
           let ids = event.attributes["data-id"].value
          let HELPFUL = event.attributes["data-one"]?.value
          let NOT_HELPFUL = event.attributes["data-two"]?.value
          let ABUSE = event.attributes["data-three"]?.value
          let data;
          if(HELPFUL) {
              data = {
                customer:loginData.username,
                status: 'HELPFUL',
            }
          }else if(NOT_HELPFUL){
               data = {
                customer:loginData.username,
                status: 'NOT_HELPFUL',
             }
              
          }
          if(ABUSE){
              data = {
                customer:loginData.username,
                status: 'ABUSE',
            }
          }
        
        
        callQusFeedbackApi(ids, data).then(function(res){
            notificationbar("success",checkErrorFromLocalAndGlobal('es_feedbackAdded'));
        }).catch(function(error){
            notificationbar("error", error.code);
        })
    }
        
    
    
    
    function getDateTime(string){
        var d = new Date(string);
        var date = d.getUTCDate();
        var month = d.getUTCMonth() + 1;
        var year = d.getUTCFullYear();
        var hour = d.getUTCHours();
        var min = d.getUTCMinutes();
        var sec = d.getUTCSeconds();
        
        var fullDate = `${month}/${date}/${year} ${hour}:${min}:${sec}`
        return fullDate;
        
    }
    
     function getAddress(address){
        return `${address[0].nickName ? address[0].nickName + "<br/>" : ""} ${address[0].address1?address[0].address1+",":""} ${address[0].address2?address[0].address2+",":""} ${address[0].address3?address[0].address3+",":""} <br/> ${address[0].city?address[0].city:""}, 
        ${address[0].province?address[0].province:""}, 
        ${address[0].country?address[0].country:""}, ${address[0].postal ? address[0].postal : address[0].postal_code}`
    }

    function getOrderStatusTemplate(status){
        var template = ""
        switch(status) {
          case "CONFIRMED":
            template = `<span class="badgestatus bg-success">Order Confirmed</span>`
            break;
          case "PAYMENT_PENDING":
            template = `<span class="badgestatus bg-pending me-2">Payment Pending</span>`
            break;
          case "PAYMENT_FAILED":
            template = `<span class="badgestatus bg-failed me-2">Payment Failed</span>`
            break;
          default:
            template = `<span class="badgestatus bg-completed">${status}</span>`
        }
        return template;
    }
    
    function openOrderDataModal(){
        // var orderString = jQuery(thisObj).attr("data-order")
        var orderid = event.currentTarget.attributes['data-id'].value;
        // var order = JSON.parse(orderString)
        let result = orderList.filter(function(a){
            return a.id == orderid
        });
        var order = result[0]
        <!--get('[data-id="orderDetailModalData"]').innerHTML = viewOrderTemplate(order);-->
        jQuery("#orderDetailModal").modal('show');
         getCustomerGQL(getOnlyOrderDetails(orderid)).then(async function(response){
            let orderDetail = response.data.data.getOrder;
            get('[data-id="orderDetailModalData"]').innerHTML = viewOrderTemplate(orderDetail);
            defaultCurrencyEcxhange()
        })
    }
    
    
    
    

    <!--function getObjectfromArray(parameter, value, array){-->
    <!--    return array.find(x => x[parameter] == value);-->
    <!--}-->
    
<!--function getObjectfromArray(type, value, array){-->
<!--    let addressObj = array.filter(i => i[type] === value)-->
<!--    return addressObj-->
<!--}-->

<!--function getObjectfromArray(value, retail, array){-->
<!--    var obj = {}-->
<!--        array.forEach(el => {-->
<!--            if(el["type"] === value || el["type"] === retail){-->
<!--                obj = el-->
<!--            }else if(el["type" === value])(-->
<!--                obj = el-->
<!--            )-->
<!--        })-->
        
<!--        return obj-->
<!--    }-->
function getObjectfromArray(type, value, array){
        let addressObj = array.filter(i => i[type] === value)
        return addressObj
    }
    
    
    function getItemsDetail(array){
        var obj = {
            total:0,
            shipping:0,
            tax:0
        }
        for(item of array){
            obj.total += item.item_price * item.quantity;
            obj.shipping += item.shipment_cost;
            obj.tax += item.item_tax;
        }
        
        return obj;
    }

    function retryPayment(thisObj){
        var order = JSON.parse(jQuery(thisObj).attr("data-order"));
        var gateway = JSON.parse(jQuery(thisObj).attr("data-item"));
        var data = {
            "app_id": paymentData.app_id,
            "cancel_url": `${store.urls.base}/content/order-complete?orderId=${order.id}`,
            "id": paymentData.id,
            "payment_gateway_configuration_id": gateway.id,
            "return_url": `${store.urls.base}/content/order-complete?orderId=${order.id}`,
            "user_id": loginData.username,
            "ipn_url": `${baseUrlOrder}oms/payment/${store.tenant_id}/${store.code}/status`,
            "amount": order.order_total,
            "order_id": order.id,
            "prog_id":"zzz",
            "website_name":store.name,
            "vendor_id":store.code,
            "phone_no":"1111111111",
            "customer_email": order.customer_email,
            "customer_code":loginData.cust_id,
            "gateway_name":gateway.name
        }
        callPaymentApi(data).then(function(res){
            window.location.href = res.data.approval_url
        }).catch(function(error){
            notificationbar("error", error.code);
        })
    }
    

<!--    function getAllOrdersQuery(){-->
<!--     getCustomerGQL(getAllOrders(store.code, sortings)).then(async function(response){-->
<!--        get('[data-id="orderListContainer"]').innerHTML = getOrdersListingTemplate(response?.data?.data?.allOrders?.content);-->
        
<!--     })-->
<!--}-->
    
    
    
    function getPaginationData(data){
        var temp = Object.assign({}, data);
        delete temp.content;
        return temp;
    }
    
    var orderList = [];
    
    function getOrderListing(pageData){
        var templete123 = ``;
        var paginationData = {};
        callOrderListApi(pageData).then(function(data){
            <!--paginationData = getPaginationData(data.data)-->
            <!--pageData = paginate(paginationData);-->
            <!--get('[data-id="pagination"]').innerHTML = drawOrderPagination(pageData);-->
            orderList = data.data.content;
            <!--get('[data-id="orderListContainer"]').innerHTML = getOrdersListingTemplate(data.data.content);-->
        }).catch(function(error){
            notificationbar("error", error.code);
        })
    }
    
    function getSingleOrderData(orderId){
        callOrderSingleItemDataApi(orderId).then(function(data){
        }).catch(function(error){
            notificationbar("error", error.code);
        })
    }
    
    
    function getAllOrdersQuery(allOrdersQueryPageData, isSearch, orderId){
     let obj = get("#order_sorting_dropdown")
     let sortings;
    
    let paginationData = {};
    createSortingAndPaginationWithQuery(obj, allOrdersQueryPageData, isSearch, orderId)
    } 
    

  function changeOrderSorting(obj){
  
  let selectedPage
  let sortings;
  get('#search').value = ''
  
  createSortingAndPaginationWithQuery(obj, allOrdersQueryPageData, false,)
  
    }
    
    
    function createSortingAndPaginationWithQuery(obj, allOrdersQueryPageData, isSearch = false, orderId){
    
    
        let sortings;
        let paginationData = {};
        if(obj.value.toLowerCase() === 'newest' && !isSearch){
        sortings = {sortBy:"createdAt", sortOrder:"desc", page:allOrdersQueryPageData.page || allOrdersQueryPageData.currentPage, perPage: allOrdersQueryPageData.perPage}
         getCustomerGQL(getAllOrders(store.code, sortings)).then(async function(response){
            paginationData = getPaginationData(response?.data?.data?.allOrders)
            allOrdersQueryPageData = paginate(paginationData);
            get('[data-id="pagination"]').innerHTML = drawOrderPagination(allOrdersQueryPageData)
            get('[data-id="orderListContainer"]').innerHTML = getOrdersListingTemplate(response?.data?.data?.allOrders?.content);
         })
        }else if(obj.value.toLowerCase() === 'oldest' && !isSearch){
           sortings = {sortBy:"createdAt", sortOrder:"asc", page:allOrdersQueryPageData.page || allOrdersQueryPageData.currentPage, perPage: allOrdersQueryPageData.perPage}
         getCustomerGQL(getAllOrders(store.code, sortings)).then(async function(response){
            paginationData = getPaginationData(response?.data?.data?.allOrders)
            allOrdersQueryPageData = paginate(paginationData);
            get('[data-id="pagination"]').innerHTML = drawOrderPagination(allOrdersQueryPageData)
            get('[data-id="orderListContainer"]').innerHTML = getOrdersListingTemplate(response?.data?.data?.allOrders?.content);
         }) 
        }else if(obj.value === 'Order Amount(Low to High)' && !isSearch){
           sortings = {sortBy:"order_total", sortOrder:"asc", page:allOrdersQueryPageData.page || allOrdersQueryPageData.currentPage, perPage: allOrdersQueryPageData.perPage}
         getCustomerGQL(getAllOrders(store.code, sortings)).then(async function(response){
            paginationData = getPaginationData(response?.data?.data?.allOrders)
            allOrdersQueryPageData = paginate(paginationData);
            get('[data-id="pagination"]').innerHTML = drawOrderPagination(allOrdersQueryPageData)
            get('[data-id="orderListContainer"]').innerHTML = getOrdersListingTemplate(response?.data?.data?.allOrders?.content);
         }) 
        }else if(obj.value === 'Order Amount(High to Low)' && !isSearch){
           sortings = {sortBy:"order_total", sortOrder:"desc", page:allOrdersQueryPageData.page || allOrdersQueryPageData.currentPage, perPage: allOrdersQueryPageData.perPage}
             getCustomerGQL(getAllOrders(store.code, sortings)).then(async function(response){
                paginationData = getPaginationData(response?.data?.data?.allOrders)
                allOrdersQueryPageData = paginate(paginationData);
                get('[data-id="pagination"]').innerHTML = drawOrderPagination(allOrdersQueryPageData)
                get('[data-id="orderListContainer"]').innerHTML = getOrdersListingTemplate(response?.data?.data?.allOrders?.content);
             }) 
        }
        if(isSearch){
            sortings = {sortBy:"createdAt", sortOrder:"desc", page:allOrdersQueryPageData.page || allOrdersQueryPageData.currentPage, perPage: allOrdersQueryPageData.perPage}
             getCustomerGQL(getAllOrders(store.code, sortings)).then(async function(response){
                let content = response?.data?.data?.allOrders?.content?.filter(order => order.orderId === orderId)
                paginationData = getPaginationData(response?.data?.data?.allOrders)
                allOrdersQueryPageData = paginate(paginationData);
                get('[data-id="pagination"]').innerHTML = drawOrderPagination(allOrdersQueryPageData)
                get('[data-id="orderListContainer"]').innerHTML = getOrdersListingTemplate(content);
             })
        }
    
    }
    
    
    
    
    function getAllWalletDetailsQuery(allOrdersQueryPageData){
    let paginationData = {};
    let sortings = {page:allOrdersQueryPageData.page || allOrdersQueryPageData.currentPage, perPage: allOrdersQueryPageData.perPage}
     getCustomerGQL(getAllWalletDetails(store.code, sortings)).then(async function(response){
     if(response.data.data?.getWalletDetail?.content.length > 0){
        paginationData = getPaginationData(response?.data?.data?.getWalletDetail)
        allOrdersQueryPageData = paginate(paginationData);
        get('[data-id="pagination_wallet"]').innerHTML = drawWalletDetailsPagination(allOrdersQueryPageData)
        let res = response.data.data.getWalletDetail.content
        createWalletDetailTemplate(res)
     }else {
        get('.wallet_detail').style.height = '500px'
        get('.wallet_detail').innerHTML = '<h2 class="typo_h2 text-center" style="line-height:500px">No data found.</h2>'
     }
     })
    }
    
    
    
    
    

    document.addEventListener("DOMContentLoaded", function(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(element){
        return new bootstrap.Tooltip(element);
    });
});
