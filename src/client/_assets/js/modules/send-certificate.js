<<<<<<< HEAD
init();
// ================
// PDF Generation
// ================

import jsPDF from 'jspdf'


    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    $('#cmd').click(function () {
      doc.fromHTML($('#content').html(), 15, 15, {
          'width': 170,
              'elementHandlers': specialElementHandlers
      });
      doc.save('sample-file.pdf');
  });


//Your  Draft
// function generatePDF() {
//     console.log("FUNCTION IS FIRING AGAIN");
//       var doc = new jsPDF();
//       doc.fromHTML($('#certificateContents').get(0), 10,10) 
       
//       doc.save('document.pdf');
//   }
  
//     var button1 = document.querySelector('#testB')
// if (button1) {
//     button1.addEventListener('click', generatePDF)
// }

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
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_BHG_H.jpg?token=AIK53GK6X2JZMAJJECSHDB27GXDXG"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_BHG_F.jpg?token=AIK53GMD5Z6MKSMVYCW5WVK7GXDY4"
      break;
    }
    case "Century 21 Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_C21_H.jpg?token=AIK53GOAB3RDMFPJEHDUY4S7GWVFA"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/C21-Footer.jpg?token=AIK53GPQSYKPFXJ2WHAPSSS7GXDJU"
      break;
    }
    //TODO: Add Coldwell Banker Images
    case "Coldwell Banker – Company Owned (previously NRT)" :
    case "Coldwell Banker – Affiliates" :
    case "Coldwell Banker Commercial" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_CB_H.jpg?token=AIK53GISHE2ZBXCJTKF2VYC7G2WK6"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_CB_F.jpg?token=AIK53GI2TSE7G3DGSNAKSMS7G2WPM"
      break;
    }
    case "Corcoran" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Corcoran_H.jpg?token=AIK53GJB7VLX4BCLJHQ2XNK7GXDNA"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Corcoran_F.jpg?token=AIK53GOP4F57AOUXR3FO5427GXDPG"
      break;
    }
    case "ERA Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_ERA_H.jpg?token=AIK53GN4UXHLW3AHKKJDLFS7GXDRO"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_ERA_F.jpg?token=AIK53GICA54W4A3EIJDACSS7GXDTO"
      break; 
    }
    case "Sotheby’s International Realty" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_SIR_H.jpg?token=AIK53GOQHRQTLPQPBUESPH27GXD26"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_SIR_F.jpg?token=AIK53GKPTVF6RLQM63KRXDK7GXD4U"
      break; 
    }    
    //TODO: Add default?
    default : {
      headerImage.src = null;
      footerImage.src = null;
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
=======
init();
// ================
// PDF Generation
// ================

import jsPDF from 'jspdf'


    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    $('#cmd').click(function () {
      doc.fromHTML($('#content').html(), 15, 15, {
          'width': 170,
              'elementHandlers': specialElementHandlers
      });
      doc.save('sample-file.pdf');
  });


//Your  Draft
// function generatePDF() {
//     console.log("FUNCTION IS FIRING AGAIN");
//       var doc = new jsPDF();
//       doc.fromHTML($('#certificateContents').get(0), 10,10) 
       
//       doc.save('document.pdf');
//   }
  
//     var button1 = document.querySelector('#testB')
// if (button1) {
//     button1.addEventListener('click', generatePDF)
// }

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
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_BHG_H.jpg?token=AIK53GK6X2JZMAJJECSHDB27GXDXG"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_BHG_F.jpg?token=AIK53GMD5Z6MKSMVYCW5WVK7GXDY4"
      break;
    }
    case "Century 21 Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_C21_H.jpg?token=AIK53GOAB3RDMFPJEHDUY4S7GWVFA"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/C21-Footer.jpg?token=AIK53GPQSYKPFXJ2WHAPSSS7GXDJU"
      break;
    }
    //TODO: Add Coldwell Banker Images
    case "Coldwell Banker – Company Owned (previously NRT)" :
    case "Coldwell Banker – Affiliates" :
    case "Coldwell Banker Commercial" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_CB_H.jpg?token=AIK53GISHE2ZBXCJTKF2VYC7G2WK6"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_CB_F.jpg?token=AIK53GI2TSE7G3DGSNAKSMS7G2WPM"
      break;
    }
    case "Corcoran" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Corcoran_H.jpg?token=AIK53GJB7VLX4BCLJHQ2XNK7GXDNA"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_Corcoran_F.jpg?token=AIK53GOP4F57AOUXR3FO5427GXDPG"
      break;
    }
    case "ERA Real Estate" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_ERA_H.jpg?token=AIK53GN4UXHLW3AHKKJDLFS7GXDRO"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_ERA_F.jpg?token=AIK53GICA54W4A3EIJDACSS7GXDTO"
      break; 
    }
    case "Sotheby’s International Realty" : {
      console.log("brand: " + brand);
      headerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_SIR_H.jpg?token=AIK53GOQHRQTLPQPBUESPH27GXD26"
      footerImage.src = "https://raw.githubusercontent.com/Visual-Communications/fair-housing-pledge/master/src/client/_assets/img/certificate/FH%20Pledge_SIR_F.jpg?token=AIK53GKPTVF6RLQM63KRXDK7GXD4U"
      break; 
    }    
    //TODO: Add default?
    default : {
      headerImage.src = null;
      footerImage.src = null;
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
>>>>>>> a39121be46b879b306d2e8f5ba39dbe7376b2640
  // console.log(`brand is currently ${brand}`)