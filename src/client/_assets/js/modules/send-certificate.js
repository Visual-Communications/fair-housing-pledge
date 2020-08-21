init();

// =================
// initializing
// =================

function init() {
  console.log('init is running')
  const body = document.querySelector('.page-sendCertificate')
  if (!body) {
    return false;
  }
  const storage = JSON.parse(sessionStorage.getItem('fhp'))
  console.log(storage)
  const pledge = JSON.parse(storage.pledge)

  //Set company variable
  const company = pledge.company
  const company1 = document.querySelector('#brokerage1')
  const company2 = document.querySelector('#brokerage2')
  company1.textContent = company;
  company2.textContent = company;

  const brand = pledge.brand

  console.log("Brand is: " + brand)
var headerImage = document.getElementById('brandHeaderID')
var footerImage = document.getElementById('brandFooterID')
  switch(brand) {
    case "Better Homes and Gardens Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_BHG_H.jpg?token=AIK53GM7MCW4NHBVKN6BXAK7JE4NG"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_BHG_F.jpg?token=AIK53GK55MSMEFM53UY7RQC7JE4PO"
      break;
    }
    case "Century 21 Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_C21_H.jpg?token=AIK53GIR2LXYGC7SRKXG44C7JE4RA"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_C21_F.jpg?token=AIK53GOPC5YHYFV3JHQWFL27JE4SU"
      break;
    }
    //TODO: Add Coldwell Banker Images
    case "Coldwell Banker – Company Owned (previously NRT)" :
    case "Coldwell Banker – Affiliates" :
    case "Coldwell Banker Commercial" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_CB_H.jpg?token=AIK53GPZIB5L2VDDIKV64HS7JE4VQ"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_CB_F.jpg?token=AIK53GJTY5OCHS6N6AB3B7K7JE4XC"
      break;
    }
    case "Corcoran" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Corcoran_H.jpg?token=AIK53GMM2LDSS6OMAG3ZCCC7JE254"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Corcoran_F.jpg?token=AIK53GKLZ7UAHHDU6T6WLPK7JE3WO"
      break;
    }
    case "ERA Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_ERA_H.jpg?token=AIK53GP36XNQNXSA523YK2K7JE4Y4"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_ERA_F.jpg?token=AIK53GP7NAQWYI7UY3PWV3K7JE42M"
      break; 
    }
    case "Sotheby’s International Realty" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_SIR_H.jpg?token=AIK53GM3JX2XHC35CNQ2K4C7JE43O"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_SIR_F.jpg?token=AIK53GL4UVHQ43ES56ANKCK7JE44U"
      break; 
    }    

    default : {
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Generic_H.jpg?token=AIK53GMT6LQLESLLHRKW4YS7JE46G";
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Generic_F.jpg?token=AIK53GJTZCVZ5N7E4OHHO727JE47E";
    }

  }

  pickHeader();

}

function pickHeader() {
  var headerImage = document.getElementById('brandHeaderID')
  // if (brand == "Other") {
  //     headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_C21_H.jpg?token=AIK53GOAB3RDMFPJEHDUY4S7GWVFA"
  // }
  //   else
  //     headerImage.src = "WOOP"
}
  // console.log(`brand is currently ${brand}`)