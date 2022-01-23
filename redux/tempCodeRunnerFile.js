const counter = (function (init) {
   // private variable
   let count = init

   function getValue() {
      return count
   }

   function increase() {
      count++
   }

   // private method
   function reset() {
      count = init
      console.log(count);
   }

   return {
      getValue,
      increase,
   }
})(10)

counter.increase()
console.log(counter.getValue()) // 11
console.log(counter.count) // undefined
counter.reset() // error