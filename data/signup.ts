export const phoneCountryCodeOptions = [
  { country: "Saudi Arabia", code: "+966" },
] as const;

export const defaultPhoneCountryCode = phoneCountryCodeOptions[0].code;

export const genderOptions = [
  { value: "female", labelKey: "female" },
  { value: "male", labelKey: "male" },
] as const;

export const collegeOptions = [
  { value: "Computer Science", labelKey: "computerScience" },
  { value: "Information Technology", labelKey: "informationTechnology" },
  { value: "Engineering", labelKey: "engineering" },
] as const;

export const majorOptions = [
  { value: "Software Engineering", labelKey: "softwareEngineering" },
  { value: "Information Systems", labelKey: "informationSystems" },
  { value: "Cybersecurity", labelKey: "cybersecurity" },
  { value: "Data Science", labelKey: "dataScience" },
] as const;

export const eventRegistrationMembershipValues = ["yes", "no"] as const;