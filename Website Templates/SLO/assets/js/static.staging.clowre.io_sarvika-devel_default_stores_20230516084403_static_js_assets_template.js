async function countryTemplate(){
    var countryTemplate = "";
    var phoneTemplate = "";
    let isDefaultContry;
    let defaultIsoCode;
    let mobilePreFix;
    var data123 = await callGetStoreCountriesApi().then(data => {
        defaultIsoCode = data[0].isoCode,
        isDefaultContry = data[0].isDefaultCountry
        mobilePreFix = data[0].phoneCode
        Object.values(data).forEach(function(item,index){
        if(item.isDefaultCountry){
            defaultIsoCode = item.isoCode,
            isDefaultContry = item.isDefaultCountry
            mobilePreFix = item.phoneCode
        }
            countryTemplate+=`<option value="${item.isoCode}">${item.name}</option>`
            <!--phoneTemplate+=`<option data-content="<span class='country-flag ${item.isoCode.toLowerCase()}'></span><span class='text'>${item.phoneCode}</span>" data-phonecode="${item.phoneCode}" data-isocode="${item.isoCode}" value="${item.isoCode}">${item.phoneCode}</option>`-->
            phoneTemplate+=`<option data-phonecode="${item.phoneCode ? item.phoneCode : ''}" data-isocode="${item.isoCode}" value="${item.phoneCode ? item.phoneCode : ''}">
                +${item.phoneCode}</option>`
        })
        
        return {
            countryTemplate:countryTemplate,
            phoneTemplate:phoneTemplate,
            isDefaultContry: isDefaultContry,
            defaultIsoCode: defaultIsoCode,
            mobilePreFix: mobilePreFix
        }
    })
    
    return data123;
}


async function statesTemplate(country){
    var statesTemplate = "";
    var data123 = await callGetStoreStatesApi(country).then(data => {
        Object.values(data).forEach(function(item, index){
            statesTemplate+=`<option value="${item.isoCode}">${item.name}</option>`
        })
        
        return statesTemplate;
    })
    
    return data123;
}

function addressTemplate(obj, index) {
            return `<div class="col-md-6 mb-3">
              <div class="addsbox checkout__address_info">
                <input type="radio" id="${obj.id}${index}" class="d-block me-2" name="address_${obj.addressType}" value="${obj.id}" onchange="isShipAddressChecked(this)"/>
                <label for="${obj.id}${index}" class="theme__box-shadow">
                    <h6 class="d-flex justify-content-between">
                      <span>${obj.nickname}</span>
                      <div class="d-flex align-items-center">
                        <a class="new_edit_btn me-2" href="javascript:void(0)" data-id="${obj.id}" onclick="editAddress(this)">
                          <!--<i class="ti-pencil"></i>-->
                          Edit
                        </a>
                        <a href="javascript:void(0)" class="theme__clr--secondary-danger d-flex" data-id="${obj.id}" onclick="openConfirmDeleteAddress(event,this);">
                          <i class="ti-trash"></i>
                        </a>
                      </div>                          
                    </h6>
                    <p class="mt-2 typo__p--14"><span>${obj.address1}</span>, <span>${obj.city}</span>, <span>${obj.state}</span>, <span>${obj.zip}</span>, <span>${obj.country}</span></p>
                </label>
              </div>                        
            </div>`
        }

        function addAddressBoxTemplate(type) {
            return `<div class="col-md-6 col-xl-3 mb-3">
                    <div class="addsbox text-primary" onclick="addNewAddress('${type}')">   
                        <label for="addnewaddress" class="text-center">
                            <i class="fa fa-plus-square-o typo__h5"></i>
                            <p class="mt-2 typo__p--14">Add New Address</p>
                        </label>
                      </div>
                   </div>`
        }
        
        function myAccountAddressTemplate(obj){
            return `<div class="col-md-6 col-xl-4 mb-3 mt-3">
          <div class="addsbox active">   
          <span class="address__default">${obj.addressType}</span>
            <h6 class="d-flex justify-content-between">
                
              <span>${obj.nickname}</span>
              <div>
                <a href="javascript:void(0)">
                  <i class="ti-pencil" data-id=${obj.id} onClick="editAddress(this)"></i>
                </a>
                &nbsp;&nbsp;
                <a href="javascript:void(0)" data-id="${obj.id}" onclick="openConfirmDeleteAddress(event,this);" class="theme__clr--secondary-danger">
                  <i class="ti-trash"></i>
                </a>
              </div>                          
            </h6>
            <p class="mt-2 typo__p--14"><span>${obj.address1}</span>,<br> <span>${obj.city}</span>, <span>${obj.state}</span>, <span>${obj.zip}</span>, <span>${obj.country}</span></p>                        
          </div>                        
        </div>`
        }






        

        