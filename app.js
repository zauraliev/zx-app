import { appRegisterService, appList } from './service.js'
;(function(){
  "use strict";

  appRegisterService("newApp");

  console.log("Apps => ", appList);

  const apps = document.getElementById("app-list"); // app-list ul

  appList.forEach((element, i) => {
    logger(`Element${i} ${element}`);

    let item = document.createElement("li"); // app-list li

    item.appendChild(document.createTextNode(`${appList[i]} `)); // app-list li text
    
    let button = document.createElement('input');
    button.id = `button-00${i}`;
    button.type = 'button';
    button.value = 'Get Info';
    button.className = 'btn';
  
    button.onclick = function() {
      logger(appList[i]);
    };

    item.appendChild(button)

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