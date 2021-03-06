function a() { return 1;}
function b() { return 1;}
function c() {
  this.a();
  this.b();
}
function d() { this.c(); }
function f() { return 0; }
function g() { return 0; }
function text(message) {
  console.log(`${message} feature 002`);
}