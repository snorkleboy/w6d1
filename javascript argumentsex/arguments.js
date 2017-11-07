function sum(...args){
  return args.reduce(function (acc, value){
    return acc+value;
  });
}

Function.prototype.myBind = function(context, ...args)  {
  return (...callArgs) => this.apply(context, args.concat(callArgs));
};
///curriedSum(2)(3)(4)
function curriedSum(numargs){
  const numbers=[];

  return function _curriedSum(number){
    numbers.push(number);

    if (numbers.length===numargs){
      return numbers.reduce(function (acc, value){
        return acc+value;
      });
    } else {
      return _curriedSum;
    }
  };
}

Function.prototype.curry = function (numArgs){
  const arglist = [];
  let that = this;
  return function _curry(argument){
    arglist.push(argument);

    if (arglist.length === numArgs){
      // that(...arglist);
      return that.apply(null, arglist);
    } else {
      return _curry;
    }
  };
};
