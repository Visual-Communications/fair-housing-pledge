# Courses

Add this Google Analytics tracking code snippet to the `<head>` element of each `story.html` file, just before the closing `</head>` tag, before deployment to Netlify.

```javascript
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-164050142-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-164050142-1');
  </script>
```