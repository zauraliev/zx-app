function a() { return 1;}
function b() { return 1;}
function c() {
  this.a();
  this.b();
}
