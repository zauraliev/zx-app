import './style.css'
import { appRegisterService, appList } from './service'
import Hello from './hello'

;(function(){
  "use strict";
  
  appRegisterService("newApp");

  console.log("Apps => ", appList);

  const hello = document.getElementById("hello"); // hello div
  const apps = document.getElementById("app-list"); // app-list ul

  const helloBody = new Hello({
    target: hello
  });
  helloBody.run();

  // hello.appendChild();

  appList.forEach((element, i) => {
    logger(`Element${i} ${element}`);

    let item = document.createElement("li"); // app-list li

    item.appendChild(document.createTextNode(`${appList[i]} >>> `)); // app-list li text
    
    let button = document.createElement('input');
    button.id = `button-00${i}`;
    button.type = 'button';
    button.value = 'Get Info';
    button.className = 'btn';

    item.appendChild(button) // Adding button into app-list

    button.onclick = function() {

      let span = document.createElement("span"); // app-list info span
      span.id = `span-00${i}`;
    
      item.appendChild(span); // Adding app-list info span into app-list

      logger(appList[i] + ' ' + span.id);

      document.getElementById(span.id).innerHTML = ` >>> ${appList[i]}`;
      
    };

    

    apps.appendChild(item)
  });

  function a() { return 1;}
  function b() { return 1;}
  function c() {
    this.a();
    this.b();
    console.log("Called funcs a and b");
  }
  function d() { this.c(); }
  function f() { return 0; }
  function g() { return 0; }
  function text(message) {
    console.log(`${message} feature 002`);
  }
  function logger(log) {
    console.log(`${log}`);
  }
  function textAlert(message){
    alert(`${message}`);
  }
})();