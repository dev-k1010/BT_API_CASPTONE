import { https } from "../services/service.js";
import {
  layThongTinForm,
  renderPhoneList,
  searchName,
  showData,
} from "./controller-admin.js";
import { Phone } from "../model/phone.js";
import { Validate } from "./validate.js";
import { Untils } from "./untils.js";
let selectedId = null;
const validate = new Validate();
const untils = new Untils();
let listPhone = [];

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
// Search
window.searchPhone = () => {
  listPhone = searchName(listPhone);
  renderPhoneList(listPhone);
};