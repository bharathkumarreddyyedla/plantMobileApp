import { getDeviceTypeAsync } from "expo-device";

export const Constants = {
  ROLE: "DOCTOR",
  COUNTRY_CODE: "+91",
  ErrorMessage: {
    NAME_REQUIRED: "Name cannot be blank",
    MINLENGTH_REQUIRED: "Name should have 4 charcters",
    EMAIL_REQUIRED: "Email cannot be blank",
    AGE_REQUIRED: "Age is required",
    ACCREDITATION_REQUIRED: "Accredition is required",
    CERTIFICATION_REQUIRED: "Certification is required",
    EMAIL_REGX: "Email is invalid",
    EMAIL_PSWRD_REGEX: "Invalid email/password",
    PSWRD_VALIDATION:
      "A password must between 8 - 15 and also have at least one Capital letter, Number, and only these special Characters @, $, _",
    PSWRD_NOT_UPDATED:
      "Password not updated, please verify phone Number to set your password",
    SET_PSWRD_INFO:
      "Please set the password and try logging in again. Click forgot password to set the password",
    PASSWORD_REQUIRD: "Please enter password",
    PASSWORD_MATCH: "Password and confirm password does not match",
    CPASSWORD_REQUIRD: "Please enter Confirm password",
    FNAME_REQUIRED: "First name cannot be blank",
    APPOINTMENT_TIME: "Appointment time is required",
    MOBILE_REQUIRD: "Mobile number cannot be blank",
    MOBILE_PATTERN: "Please enter 10 digit mobile number",
    MOBILE_EMAIL_REQUIRD: "Mobile/Email cannot be blank",
    OTP_REQUIRED: "OTP cannot be blank",
    OTP_REGX:
      "In-complete OTP. Please enter 6 digit OTP received on your number",
    STATE_REQUIRED: "Enter state",
    STREET_REQUIRED: "Street cannot be blank",
    CITY_REQUIRED: "Enter city",
    PIN_REQUIRED: "Enter pin",
    LNAME_REQUIRED: "Last name cannot be blank",
    ZIPCODE_REQUIRED: "Zip code cannot be blank",
    GENDER_REQUIRED: "Gender cannot be blank",
    DOB_REQUIRED: "Date of birth cannot be blank",
    HEART_RATE_REQUIRED: "Enter heart rate",
    PULSE_REQUIRED: "Enter pulse",
    WEIGHT_REQUIRED: "Enter weight",
    HEIGHT_REQUIRED: "Enter height",
    SPO2_REQUIRED: "Enter SPO2",
    BLOOD_PRESSURE_REQUIRED: "Enter blood pressure",
    BG_REQUIRED: "Enter blood group",
    TEMPERATURE_REQUIRED: "Enter body temperature",
    ACCEPT_CONDITION: "Please Accept",
    EXPLANATION_REQUIRD: "Enter the health complain",
    INSURANCENAME_REQUIRD: "Insurance name cannot be blank",
    INSURANCENUMBER_REQUIRD: "Insurance number cannot be blank",
    VOICEVIDEOSELECT_REQUIRED: "Please select voice or video call to proceed",
    PIN_PATTERN: "Enter a valid pin code",
    AADHAR_REQUIRED: "Aadhar number cannot be blank",
    ALPHABET:
      "Please enter only alphabets. Special characters or numbers or alpha-numeric or combination of all these characters is not allowed",
    AADHAR: "Aadhar number must be 12 digits",
    ZIPCODE: "Pincode must be 6 digit number",
    CLINIC_LOGO_REQ: "Clinic logo is required",
    NUMBER: "Enter only numbers",
    MANDATORY: "This field cannot be blank",
    BLOOD_PRESSURE: "Invalid data",
    RELATION_REQUIRED: "Please select relationship",
    MEDICINE_NAME: "Medicine name cannot be blank",
    MEDICINE_TYPE: "Medicine type cannot be blank",
    MEDICINE_DOSE: "Medicine dose cannot be blank",
    MEDICINE_CAPSULE: "Please mention number of capsules you want to take",
    MEDICINE_SDATE: "Start date cannot be blank",
    MEDICINE_EDATE: "End date cannot be blank",
    MEDICINE_REPEAT: "Select when to repeat",
    MEDICINE_SCHEDULE: "Please schedule time to get reminder",
    MEDICINE_APLHANUMERIC: "Medicine Name contains only AlphaNumeric",
    HOUSE_NUM_REQUIRED: "House Number cannot be blank",
    HOUSE_NUM_REGEX: "Invaild House Number",
    INVALID_NUM: "Invalid Phone Number",
    USER_NOT_FND: "User Not Found",
    APLHANUMERIC: "Enter only Alpha Numeric",
    PRIMARY_SPECIALITY: "Primary Speciality cannot be blank",
    PACKAGE_TYPE_REQUIRED: "Package type cannot be blank",
    PACKAGE_DESC_REQUIRED: "Package description cannot be blank",
    TERMS_AND_CON_REQUIRED: "Terms and conditions are required",
    ACTUAL_PRICE_REQUIRED: "Actual price cannot be blank",
    CONSULATION_FRQUENCY_REQUIRED: "Consultation frequency required",
    ALPHABETS: "Enter only Alphabets",
    NAME_ERROR_MSG: "Name Cannot start with invalid Character or a Number",
    SLCT_DIFF_SLOT:
      "the Patient has an appointment with another Doctor on this same date and time, please select different slot",
    ANOTHER_SLOT:
      "Selected slot is already booked by another user, please select another slot",
    DOCTOR_NOT_AVAILABLE: "Doctor is Not Available on selected Date",
    SYMPTOM_ADDED: "Symptom already added",
    HSPTL_CLINIC_REQUIRED: "Hospital/Clinic name is required",
    REGISTERATION_NUM_REQUIRED: "Registration number is required",
    CONSULT_FEE_REQUIRED: "Consultation fee is required",
    ADDRESS_REQUIRED: "Address is required",
    STREET_LOC_REQUIRED: "Street/Locality is required",
    STATE_REQ: "State is required",
    CITY_REQ: "City is required",
    PINCODE_REQ: "Pincode is required",
  },
  Text: {
    FORGOT_PASSWORD_HEADING: "Forgot Password",
    FORGOT_PASSWORD_TEXT: "Enter mobile number for OTP.",
    RESET_PASSWORD_HEADING: "Reset Password",
    SEE_ALL: "See All",
    MOBILE_PASSWORD_INVALID: "Mobile number Or password are Invalid",
    NO_SLOT_AVAILABLE_FOR_TODAY: "No slots available for selected date",
    NO_SLOT_AVAILABLE: "No Slots available",
    NEXT_DAY_AVAILABILITY: "Next day availablitiy on",
    DATETIME: "DATE & TIME",
    BOOK_APPOINTMENT: "Book appointment",
    BOOKING_CNFRMED: "Booking Confirmed",
    CONS_FEES: "Consultation Fees",
    ACCEPT_CONDITION: "I agree with the terms & Condition",
    FORGOT_PASS_LINK: "Forgot Password?",
    No_ACC_REGISTER: "Don't have an account?",
    REGISTER_LINK: "Register",
    SIGN_IN_TEXT: "Already have an account?",
    SIGN_IN_LINK: "Sign In",
    RESEND_TEXT: "Did not receive the OTP?",
    RESEND_LINK: "Resend",
    OTP_VERIFY: "OTP VERIFICATION",
    OTP_VERIFY_Text1: "We will send you an",
    OTP_VERIFY_TEXT2: "One Time Password ",
    OTP_VERIFY_TEXT3: "to your mobile number.",
    OTP_MISMATCH: "OTP MISMATCH",
    OTP_SUCCESS: "OTP Has Successfully Sent to Your Mobile Number",
    ENTER_OTP: "Please enter OTP Received on your mobile number",
    SUCCESS_OK: "OK",
    OTP_EXP: "Otp Expired",
    OTP_INVALID: "Invalid OTP",
    CREATE_PWD: "CREATE NEW PASSWORD",
    PWD_TEXT:
      "Your new password must be different from previous used passwords.",
    MOBILE_CONFIRM:
      "User is already registered in Docisn Application, if you want to add this user as your family member, please verify with their mobile number ",
    SERVER_DOWN: "Server down, Please retry after some time...",
    NO_INTERNET: "Internet Not Found !!!",
    INTERNET_BACK: "We are Back...",
    USER_LOGIN_TXT: "userLoginCredentials",
    USER_NOT_FND_WMN: "User not found with Mobile Number",
    PROFILE_UPDTED_SUCCESS: "Profile Updated Successfully",
  },
  ButtonText: {
    BTN_LOGIN: "Login",
    BTN_OTP: "Get OTP",
    BTN_VERIFY_CONTINUE: "Verify and Continue",
  },

  LABEL: {
    LABEL_U_NAME: "USER NAME",
    LABEL_SIGNIN_MOBILE: "MOBILE",
    LABEL_PASSWORD: "PASSWORD",
    LABEL_NAME: "Name",
    LABEL_EMAIL: "Email",
    LABEL_MOBILE: "MOBILE",
    LABEL_OTP: "OTP",
  },
  APIURL: {
    LOGIN: "login",
    GENERATE_OTP: "generateOTP",
    VERIFY_OTP: "verify",
    SET_PASSWORD: "newRegister",
    FORGOT_PASSWORD_GENERATE_OTP: "forgotPassword",
    RESET_PASSWORD: "memberResetPassword",
  },
  PLACEHOLDER: {
    PASSWORD: "Enter password",
    EMAIL: "Enter email",
    F_NAME: "First name",
    L_NAME: "Last name",
    PH_NUMBER: "Phone number",
    C_PASSWORD: "Confirm password",
    USER_NAME: "Enter username",
    NAME: "Enter name",
    MOBILE: "Enter mobile",
    OTP: "Enter OTP",
    CONFIRM_PASSWORD: "Enter confirm password",
  },
  VALIDATIONS_TYPE: {
    ALPHABET: "Alphabet",
    NUMBER: "Number",
    MINLENGTH: "minlength",
    REQ: "required",
    EMAIL_PATERN: "emailPattern",
    PHNE_PATERN: "phonePattern",
    OTP_PATERN: "otpPattern",
    PSWRD: "password",
    MATCH_PASWRD: "matchPasword",
  },
  NAVIGATION: {
    FORGOT_PASSWORD: "Forgot Password",
    PASSWORD_HEADING: "password",
    PASSWORD_HEADING1: "Password",
    BILLING_PAYMENTS_SCREEN: "billingAndPaymentScreen",
    LOGIN: "login",
    HOME: "Home",
  },
};

export const tabletDimensions = {
  tabletView: getDeviceTypeAsync() === "Tablet",
};
export const aToE = ["A", "B", "C", "D", "E"];
export const fToJ = ["F", "G", "H", "I", "J"];
export const kToO = ["K", "L", "M", "N", "O"];
export const pToT = ["P", "Q", "R", "S", "T"];
export const uToZ = ["U", "V", "W", "X", "Y", "Z"];

export const plantCycleList = [
  { label: "perennial", value: "perennial" },
  { label: "annual", value: "annual" },
  { label: "biennial", value: "biennial" },
  { label: "biannual", value: "biannual" },
];
export const plantWateringList = [
  { label: "frequent", value: "frequent" },
  { label: "average", value: "average" },
  { label: "minimum", value: "minimum" },
  { label: "none", value: "none" },
];
export const plantSunExposureList = [
  { label: "Full Shade", value: "full_shade" },
  { label: "Part Shade", value: "part_shade" },
  { label: "Sun-part Shade", value: "sun-part_shade" },
  { label: "Full Sun", value: "full_sun" },
];

export const careLevel = [
  { label: "High" },
  { label: "Medium" },
  { label: "Low" },
];
export const yesOrNO = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export const plantFAQ = [
  {
    id: 0,
    question: "What kind of plant you would like to grow ?",
    options: ["Indoor Plant", "Outdoor Plant"],
  },
];
export const indoorPlantFAQ = [
  {
    id: 0,
    tag: "Cycle",
    question: "Are you looking for a plant to come back to life?",
    options: [
      {
        id: 0,
        label:
          "I want a plant that's a botanical phoenix, reblooming each year",
        value: "perennial",
      },
      {
        id: 1,
        label: "One life is enough for plants",
        value: "annual",
      },
      {
        id: 2,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 1,
    tag: "Watering",
    question: "Are you a person that has time to water?",
    options: [
      {
        id: 0,
        label: "Yes I got all the time in the world",
        value: "frequent",
      },
      {
        id: 1,
        label: "I might have a minute or two!",
        value: "average",
      },
      {
        id: 2,
        label: "I can barely sit down",
        value: "minimum",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 2,
    tag: "Sunlight",
    question: "How much sunlight do you get?",
    options: [
      {
        id: 0,
        label: "I'm drowning in sunlight",
        value: "full_sun",
      },
      {
        id: 1,
        label: "I get it then and there",
        value: "part_shade",
      },
      {
        id: 2,
        label: "What's sunlight?!",
        value: "full_shade",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
];
export const indoorPlantFAQlabels = ["Cycle", "Watering", "Sunlight"];
export const outdoorPlantFAQlabels = ["Cycle", "Watering", "Sunlight"];
export const outdoorPlantFAQ = [
  {
    id: 0,
    tag: "Cycle",
    question: "Are you looking for a plant to come back to life?",
    options: [
      {
        id: 0,
        label:
          "I want a plant that's a botanical phoenix, reblooming each year",
        value: "perennial",
      },
      {
        id: 1,
        label: "One life is enough for plants",
        value: "annual",
      },
      {
        id: 2,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 1,
    tag: "Watering",
    question: "Are you a person that has time to water?",
    options: [
      {
        id: 0,
        label: "Yes I got all the time in the world",
        value: "frequent",
      },
      {
        id: 1,
        label: "I might have a minute or two!",
        value: "average",
      },
      {
        id: 2,
        label: "I can barely sit down",
        value: "minimum",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 2,
    tag: "Sunlight",
    question: "How much sunlight do you get?",
    options: [
      {
        id: 0,
        label: "I'm drowning in sunlight",
        value: "full_sun",
      },
      {
        id: 1,
        label: "I get it then and there",
        value: "part_shade",
      },
      {
        id: 2,
        label: "What's sunlight?!",
        value: "full_shade",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
];

export const calenderTypes = [
  {
    label: "Daily",
    value: "DAILY",
  },
  {
    label: "Weekly",
    value: "WEEKLY",
  },
  {
    label: "Monthly",
    value: "MONTHLY",
  },
];
