import { https } from "../services/service.js";
import {
  Arrange,
  layThongTinForm,
  searchName,
  renderPhoneList,
  showData,
} from "./controller-admin.js";
import { Phone } from "../model/phone.js";
import { Validate } from "./validate.js";
import { Untils } from "./untils.js";

let listPhone = [];
let selectedId = null;
const validate = new Validate();
const untils = new Untils();
const arrange = new Arrange();
// Render
let fectPhoneList = () => {
  https
    .get(`/product`)
    .then((res) => {
      listPhone = res.data;
      renderPhoneList(listPhone.reverse());
    })
    .catch((err) => {
      console.log(err.data);
    });
};
window.fectPhoneList = fectPhoneList;
fectPhoneList();
// delete
window.deletePhone = (id) => {
  https
    .delete(`/product/${id}`)
    .then((res) => {
      fectPhoneList();
    })
    .catch((err) => {
      console.log("🙂 ~ window.deletePhone ~ err:", err);
    });
};
// Add
window.addPhone = () => {
  const inputs = untils.getInputValue();

  let phone = new Phone("", ...inputs);
  console.log("🙂 ~ phone:", phone);
  if (!validate.isValid(listPhone)) return;

  https
    .post(`/product`, phone)
    .then((res) => {
      $("#exampleModal").modal("hide");
      fectPhoneList();
    })
    .catch((err) => {
      console.log("🙂 ~ err:", err);
    });
};
// Edit
window.editPhone = (id) => {
  selectedId = id;
  https
    .get(`/product/${id}`)
    .then((res) => {
      $("#exampleModal").modal("show");
      showData(res.data);
    })
    .catch((err) => {
      console.log("🙂 ~ err:", err);
    });
};
// Update
window.updatePhone = () => {
  const inputs = untils.getInputValue();

  let phone = new Phone("", ...inputs);
  console.log("🙂 ~ phone:", phone);
  if (!validate.isValid(listPhone)) return;
  https
    .put(`/product/${selectedId}`, phone)
    .then((res) => {
      console.log("🙂 ~ .then ~ res:", res);

      $("#exampleModal").modal("hide");
      fectPhoneList();
    })
    .catch((err) => {
      console.log("🙂 ~ window.deletePhone ~ err:", err);
    });
};

window.searchPhone = () => {
  let resultSearch = searchName(listPhone);
  renderPhoneList(resultSearch);
};

window.upPrice = () => {
  let resultArrange = arrange.arrangePrice(listPhone, 1);
  renderPhoneList(resultArrange);
};

window.downPrice = () => {
  let resultArrange = arrange.arrangePrice(listPhone, -1);
  renderPhoneList(resultArrange);
};
