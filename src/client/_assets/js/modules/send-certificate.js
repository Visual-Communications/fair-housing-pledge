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
      headerImage.src = "https://i.ibb.co/LS9ry52/FH-Pledge-BHG-H.jpg"
      footerImage.src = "https://i.ibb.co/vxVfLsZ/FH-Pledge-BHG-F.jpg"
      break;
    }
    case "Century 21 Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/pQJ0kcm/FH-Pledge-C21-H.jpg"
      footerImage.src = "https://i.ibb.co/KqGJxXR/C21-Footer.jpg"
      break;
    }
    case "Coldwell Banker - Company Owned (previously NRT)" :
    case "Coldwell Banker - Affiliates" :
    case "Coldwell Banker Commercial" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/fkGbTCK/FH-Pledge-CB-H.jpg"
      footerImage.src = "https://i.ibb.co/k0mCHtK/FH-Pledge-CB-F.jpg"
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
      headerImage.src = "https://i.ibb.co/J7ftVMD/FH-Pledge-SIR-H.jpg"
      footerImage.src = "https://i.ibb.co/TBDzTZj/FH-Pledge-SIR-F.jpg"
      break; 
    }
    case "AREAA" : {
      console.log("brand: " + brand);
      headerImage.src = "https://ibb.co/82zzh29"
      footerImage.src = "https://i.ibb.co/w7W4N04/AREAA-Footer.jpg"
      break; 
    }
    case "LGBTQ+ Real Estate Alliance" : {
      console.log("brand: " + brand);
      headerImage.src = "https://i.ibb.co/0QdMzvK/Alliance-Header.jpg"
      footerImage.src = "https://ibb.co/M5VXBgX"
      break; 
    }
    case "NAHREP" : {
      console.log("brand: " + brand);
      headerImage.src = "https://ibb.co/TBYKqc3"
      footerImage.src = "https://i.ibb.co/nRFNcch/NAHREP-Footer.jpg"
      break; 
    }
    case "NAREB" : { //NAREB OR NAHREB????
      console.log("brand: " + brand);
      headerImage.src = "https://ibb.co/82zzh29"
      footerImage.src = "https://i.ibb.co/gWMLsVK/NAREB-Footer.jpg"
      break; 
    }
    case "NAMMBA" : { //NAREB OR NAHREB????
      console.log("brand: " + brand);
      headerImage.src = "https://ibb.co/MfMmxzR"
      footerImage.src = "https://i.ibb.co/pWqW9VM/NAMMBA-Footer.jpg"
      break; 
    }                        

    default : {
      headerImage.src = "https://i.ibb.co/nBS6HJv/FH-Pledge-Generic-H.jpg";
      footerImage.src = "https://i.ibb.co/d5p5Q1C/FH-Pledge-Generic-F.jpg";
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