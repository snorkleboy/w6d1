// Function.prototype.inherits= function inherit(parent){
//
//   function Surrogate () {}
//   Surrogate.prototype = parent.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
//
// };


Function.prototype.inherits= function inherit(parent){

  // function Surrogate () {}
  // Surrogate.prototype = parent.prototype;
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;

};
