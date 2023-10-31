let getEle = (id) => document.getElementById(id);
let id=null
export class Untils {
  // arr key
  inpArr = [
    "name",
    "price",
    "screen",
    "backCam",
    "frontCam",
    "img",
    "desc",
    "type",
  ];
  // arr id span
  tbArr = [
    "tbname",
    "tbprice",
    "tbscreen",
    "tbbackCam",
    "tbfrontCam",
    "tbimg",
    "tbdesc",
    "tbtype",
  ];

  getInputValue() {
    return this.inpArr.map((ele) => getEle(ele).value);
  }
  fill(arr) {
    let fields = this.inpArr.map((ele) => getEle(ele));
    fields.forEach((ele, id) => {
      ele.value = arr[id];
    });
  }
  clearTB() {
    let fields = this.tbArr.map((ele) => getEle(ele));
    fields.forEach((ele) => {
      ele.innerHTML = "&#8205";
    });
  }
}
