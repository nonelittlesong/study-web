const obj = {
  gear: 2,
  getGear: function () {
    return this.gear;
  }
}

const shortObj = {
  gear: 3,
  getGear() {
    return this.gear;
  }
}

const lambdaObj = {
  gear: 4,
  getGear: () => {
    return this.gear;
  }
}

console.log('obj', obj.getGear());             // 2
console.log('shortObj', shortObj.getGear());   // 3
console.log('lambdaObj', lambdaObj.getGear()); // undefined
