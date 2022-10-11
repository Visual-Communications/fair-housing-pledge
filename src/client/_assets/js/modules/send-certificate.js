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
      //headerImage.src = "https://i.ibb.co/LS9ry52/FH-Pledge-BHG-H.jpg"
      //footerImage.src = "https://i.ibb.co/vxVfLsZ/FH-Pledge-BHG-F.jpg"
      headerImage.src = "/img/certificate/FH Pledge_BHG_H.jpg"
      footerImage.src = "/img/certificate/FH Pledge_BHG_F.jpg"
      break;
    }
    case "Century 21 Real Estate" : {
      console.log("brand: " + brand);
      //headerImage.src = "https://i.ibb.co/pQJ0kcm/FH-Pledge-C21-H.jpg"
      headerImage.src = "/img/certificate/C21-Header.jpg"
      //footerImage.src = "https://i.ibb.co/KqGJxXR/C21-Footer.jpg"
      footerImage.src = "/img/certificate/C21-Footer.jpg"
      break;
    }
    case "Coldwell Banker" : {
      console.log("brand: " + brand);
      headerImage.src = "/img/certificate/FH Pledge_CB_H.jpg"
      footerImage.src = "/img/certificate/FH Pledge_CB_F.jpg"
      break;
    }
    case "Coldwell Banker Commercial" : {
      console.log("brand: " + brand);
      headerImage.src = "/img/certificate/FH Pledge_CBC_H.jpg"
      footerImage.src = "/img/certificate/FH Pledge_CBC_F.jpg"
      break;
    }
    case "Corcoran" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/XzRG9ym/FH-Pledge-Corcoran-H.jpg"
      footerImage.src = "https://i.ibb.co/NxTRSN5/FH-Pledge-Corcoran-F.jpg"
      break;
    }
    case "ERA Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/Jy4CP10/FH-Pledge-ERA-H.jpg"
      footerImage.src = "https://i.ibb.co/b1kdzZX/FH-Pledge-ERA-F.jpg"
      break; 
    }
    case "Sotheby's International Realty" : {
      console.log("brand: " + brand);
      headerImage.src = "/img/certificate/FH Pledge_SIR_H.jpg"
      footerImage.src = "/img/certificate/FH Pledge_SIR_F.jpg"
      break; 
    }
    case "AREAA" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/3WffJWc/AREAA-Header.jpg"
      footerImage.src = "https://i.ibb.co/w7W4N04/AREAA-Footer.jpg"
      break; 
    }
    case "LGBTQ+ Real Estate Alliance" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/0QdMzvK/Alliance-Header.jpg"
      footerImage.src = "https://i.ibb.co/n8cWPwW/Alliance-Footer.jpg"
      break; 
    }
    case "NAHREP" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/MDZ85n0/NAHREP-Header.jpg"
      footerImage.src = "https://i.ibb.co/nRFNcch/NAHREP-Footer.jpg"
      break; 
    }
    case "NAREB" : { 
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/ryK3sCL/NAREB-Header.gif"
      footerImage.src = "https://i.ibb.co/gWMLsVK/NAREB-Footer.jpg"
      break; 
    }
    case "NAMMBA" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/BGq95hg/NAMMBA-Header.jpg"
      footerImage.src = "https://i.ibb.co/pWqW9VM/NAMMBA-Footer.jpg"
      break; 
    }                        

    default : {
      headerImage.src = "https://i.ibb.co/nBS6HJv/FH Pledge_Generic_H.jpg";
      footerImage.src = "https://i.ibb.co/d5p5Q1C/FH Pledge_Generic_F.jpg";
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