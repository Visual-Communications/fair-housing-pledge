<<<<<<< HEAD
module.exports = {
    contentType: 'page',
    title: 'course certificate',
    layout: 'sendCertificate',
    // layout: 'base',
    slug: 'course-certificate',
    permalink: './{{ slug }}/index.html',

    scripts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        parameters: [
          'integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="', 
          'crossorigin="anonymous"'
        ]
      },
        {
      src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js",
      parameters:  [
        'integrity="sha512-ToRWKKOvhBSS8EtqSflysM/S7v9bB9V0X3B1+E7xo7XZBEZCPL3VX5SFIp8zxY19r7Sz0svqQVbAOx+QcLQSAQ=="',
        'crossorigin="anonymous"'
       ] }
    ]   
  }
=======
const pages = {
    contentType: 'page',
    title: 'course certificate',
    layout: 'sendCertificate',
    // layout: 'base',
    slug: 'course-certificate',
    permalink: './{{ slug }}/index.html',

    scripts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        parameters: [
          'integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="', 
          'crossorigin="anonymous"'
        ]
      },
        {
      src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js",
      parameters:  [
        'integrity="sha512-ToRWKKOvhBSS8EtqSflysM/S7v9bB9V0X3B1+E7xo7XZBEZCPL3VX5SFIp8zxY19r7Sz0svqQVbAOx+QcLQSAQ=="',
        'crossorigin="anonymous"'
       ] }
    ]   
  }
  
  module.exports = pages
  
>>>>>>> a39121be46b879b306d2e8f5ba39dbe7376b2640
