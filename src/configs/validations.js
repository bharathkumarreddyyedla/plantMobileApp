let passwordVariable = "";

const validateRegxEmail = (email) => {
  const regx = /^[a-zA-Z0-9._-]+@[a-zA-z]+\.[a-z]{2,4}$/;
  return regx.test(email);
};

const validateRegxPhoneNo = (phoneNo) => {
  const regx = /^\d{10}$/;
  return regx.test(phoneNo);
};

const validateOTP = (otp) => {
  const regx = /^\d{6}$/;
  return regx.test(otp);
};

const validatePassword = (password) => {
  const regex = /^\d{20}$/;
  passwordVariable = password;
  return regex.test(password);
};

const validateConfirmPassword = (confirmPassword) => {
  if (passwordVariable === confirmPassword) {
    return true;
  } else {
    return false;
  }
};
const validateSlashinNumber = (value) => {
  const regex = /^(\d{2,3})*\/(\d{2,3})*$/;
  return regex.test(value);
};
const validateString = (stringValue) => {
  if (stringValue.length === 0) {
  }
};

const validateonlyalphabets = (value) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(value);
};
const validateonlyNumbers = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};
const validateAadhar = (value) => {
  const regex = /^\d{12}$/;
  return regex.test(value);
};
const validateDose = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};
const validateZipcode = (value) => {
  const regex = /^\d{6}$/;
  return regex.test(value);
};
const validateEmptyArray = (value) => {
  if (value.length === 0) {
    return false;
  } else {
    return true;
  }
};

const validateAlphaNumeric = (value) => {
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(value);
};

const validateHouseNumber = (value) => {
  const regex = /^[a-zA-Z0-9:#\/\-\s]+$/g;
  return regex.test(value);
};

export const validateUserName = (phoneNo) => {
  if (!phoneNo.trim()) {
    return "Please provide a PhoneNo.";
  } else if (!validateRegxPhoneNo(phoneNo)) {
    return "Please enter a valid PhoneNo";
  }
  return "";
};

export const validateInput = (controls) => {
  const errors = {};
  Object.keys(controls).forEach((controlName) => {
    const { validations, value } = controls[controlName];
    if (validations && Array.isArray(validations)) {
      validations.forEach((validation) => {
        const { type, message, length, matchControl } = validation;
        if (
          type === "required" &&
          (!value || (typeof value === "string" && value.trim() === ""))
        ) {
          errors[controlName] = message;
        } else if (type === "minlength" && value.length < length) {
          errors[controlName] = message;
        } else if (type === "maxlength" && value.length > length) {
          errors[controlName] = message;
        } else if (type === "emailPattern" && !validateRegxEmail(value)) {
          errors[controlName] = message;
        } else if (type === "phonePattern" && !validateRegxPhoneNo(value)) {
          errors[controlName] = message;
        } else if (
          type === "match" &&
          controls[matchControl] &&
          value !== controls[matchControl].value
        ) {
          errors[controlName] = message;
        } else if (type === "password" && !validatePassword(value)) {
          errors[(controlName = message)];
        } else if (type === "empty" && !validateString(value)) {
          errors[(controlName = message)];
        } else if (type === "matchPasword" && !validateConfirmPassword(value)) {
          errors[controlName] = message;
        } else if (type === "otpPattern" && !validateOTP(value)) {
          errors[controlName] = message;
        } else if (type === "Alphabet" && !validateonlyalphabets(value)) {
          errors[controlName] = message;
        } else if (type === "Aadhar" && !validateAadhar(value)) {
          errors[controlName] = message;
        } else if (type === "ZipCodepattern" && !validateZipcode(value)) {
          errors[controlName] = message;
        } else if (type === "Number" && !validateonlyNumbers(value)) {
          errors[controlName] = message;
        } else if (type === "SlashInNumber" && !validateSlashinNumber(value)) {
          errors[controlName] = message;
        } else if (type === "requiredArray" && !validateEmptyArray(value)) {
          errors[controlName] = message;
        } else if (type === "dose" && !validateDose(value)) {
          errors[controlName] = message;
        } else if (type === "alphanumeric" && !validateAlphaNumeric(value)) {
          errors[controlName] = message;
        } else if (type === "houseNumber" && !validateHouseNumber(value)) {
          errors[controlName] = message;
        }
      });
    }
  });
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
