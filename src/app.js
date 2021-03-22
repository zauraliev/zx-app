import './style.css'
import { appRegisterService, appList } from './service'
import Hello from './hello'

;(function(){
  "use strict";
  let _app = {
    name: "zx-app",
    id: "zx".padStart(10, "0")
  }
  appRegisterService(_app);

  console.log("Apps => ", appList);

  const hello = document.getElementById("hello"); // hello div
  const apps = document.getElementById("app-list"); // app-list ul

  const helloBody = new Hello({
    target: hello
  });
  helloBody.run();

  // hello.appendChild();

  appList.forEach((element, i) => {
    logger(`Element${i} ${element.id}`);

    let item = document.createElement("li"); // app-list li

    item.appendChild(document.createTextNode(`${appList[i].name} >>> `)); // app-list li text
    
    // Get Info button
    let button = document.createElement('input');
    button.id = `button-00${i}`;
    button.type = 'button';
    button.value = 'Get Info';
    button.className = 'btn';

    // Appending Get Info button into app-list
    item.appendChild(button) 

    // Get Info button function
    button.onclick = function() {

      let span = document.createElement("span"); // app-list info span
      span.id = `span-00${i}`;
    
      item.appendChild(span); // Adding app-list info span into app-list

      logger(`${appList[i].name} ${span.id}`);

      document.getElementById(span.id).innerHTML = ' Loading... ';
      setTimeout(()=> {
        document.getElementById(span.id).innerHTML = ` >>> ${appList[i].id}`;
      }, 500)
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