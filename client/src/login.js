import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles.css";

ReactDOM.render(<App />, document.getElementById('root'));


<% if (!user) { %>
  <div style="width:500px;height:180px;">
    <h2 style="font-size:40px;">Welcome! Please log in.</h2>
    <a href="/auth/facebook"><img src="fb-login.jpg" width="151" height="24"></a>
    </div>
<% } else { %>
    <h2>Hello, <%= user.username %>.</h2>
<% } %>


// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{latest-api-version}'
//     });
//
//     FB.AppEvents.logPageView();
//
//   };
//
//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>
