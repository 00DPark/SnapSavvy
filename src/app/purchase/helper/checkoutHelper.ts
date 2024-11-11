let CustomerName: string = loadFromLocalStorage("CustomerName") || "";
let AddressStreet: string = loadFromLocalStorage("AddressStreet") || "";
let AddressCity: string = loadFromLocalStorage("AddressCity") || "";
let AddressState: string = loadFromLocalStorage("AddressState") || "";
let AddressPostalCode: string = loadFromLocalStorage("AddressPostalCode") || "";
let AddressCountry: string = loadFromLocalStorage("AddressCountry") || "";

/**
 * Saves a value to localStorage
 * @param key The key to save in localStorage
 * @param value The value to save
 */
function saveToLocalStorage(key: string, value: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

/**
 * Loads a value from localStorage
 * @param key The key to load from localStorage
 * @returns The stored value, or null if not set
 */
function loadFromLocalStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}

/**
 * Gets the name of the customer
 * @returns the customer name
 */
export function getCustomerName() {
  return CustomerName;
}

/**
 * Sets the customer name and saves it to localStorage
 * @param name holds the name of the customer
 */
export function setCustomerName(name: string) {
  CustomerName = name;
  saveToLocalStorage("CustomerName", name);
}

/**
 * Sets the customer street address and saves it to localStorage
 * @param street holds the street address
 */
export function setCustomerAddressStreet(street: string) {
  AddressStreet = street;
  saveToLocalStorage("AddressStreet", street);
}

/**
 * Gets the customer street address
 * @returns the address street
 */
export function getCustomerAddressStreet() {
  return AddressStreet;
}

/**
 * Sets the customer city and saves it to localStorage
 * @param city holds the address city
 */
export function setCustomerAddressCity(city: string) {
  AddressCity = city;
  saveToLocalStorage("AddressCity", city);
}

/**
 * Gets the customer city
 * @returns the address city
 */
export function getCustomerAddressCity() {
  return AddressCity;
}

/**
 * Sets the customer state and saves it to localStorage
 * @param state holds the address state
 */
export function setCustomerAddressState(state: string) {
  AddressState = state;
  saveToLocalStorage("AddressState", state);
}

/**
 * Gets the customer state
 * @returns the address state
 */
export function getCustomerAddressState() {
  return AddressState;
}

/**
 * Sets the postal code and saves it to localStorage
 * @param code holds the postal code
 */
export function setCustomerAddressPostalCode(code: string) {
  AddressPostalCode = code;
  saveToLocalStorage("AddressPostalCode", code);
}

/**
 * Gets the postal code
 * @returns the postal code
 */
export function getCustomerAddressPostalCode() {
  return AddressPostalCode;
}

/**
 * Sets the country and saves it to localStorage
 * @param country holds the address country
 */
export function setCustomerAddressCountry(country: string) {
  AddressCountry = country;
  saveToLocalStorage("AddressCountry", country);
}

/**
 * Gets the country
 * @returns the address country
 */
export function getCustomerAddressCountry() {
  return AddressCountry;
}
