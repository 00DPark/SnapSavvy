let CustomerName:string;
let AddressStreet:string;
let AddressCity:string;
let AddressState:string;
let AddressPostalCode:string;
let AddressCountry:string;
/**
 * Gets the name of the customer
 * @returns the customer name
 */
export function getCustomerName()
{
  return CustomerName;
}

/**
 * Allows for the customer name to be set
 * @param name holds the name of the customer
 */
export function setCustomerName(name:string)
{
  CustomerName = name;
}

/**
 * Allows for the address value to be set
 * @param name holds the name of the customer
 */
export function setCustomerAddressStreet(street:string)
{
  AddressStreet= street;
}

/**
 * Gets the name of the customer
 * @returns the address section
 */
export function getCustomerAddressStreet()
{
  return AddressStreet;
}

/**
 * Allows for the address value to be set
 * @param city holds the address city
 */
export function setCustomerAddressCity(city:string)
{
  AddressCity= city;
}

/**
 * Gets the name of the customer
 * @returns the address section
 */
export function getCustomerAddressCity()
{
  return AddressCity;
}

/**
 * Allows for the address value to be set
 * @param state holds the address state
 */
export function setCustomerAddressState(state:string)
{
  AddressState= state;
}

/**
 * Gets the name of the customer
 * @returns the address section
 */
export function getCustomerAddressState()
{
  return AddressState;
}

/**
 * Allows for the address value to be set
 * @param code holds the postal code
 */
export function setCustomerAddressPostalCode(code:string)
{
  AddressPostalCode= code;
}

/**
 * Gets the name of the customer
 * @returns the address section
 */
export function getCustomerAddressPostalCode()
{
  return AddressPostalCode;
}

/**
 * Allows for the address value to be set
 * @param country holds the address country
 */
export function setCustomerAddressCountry(country:string)
{
  AddressCountry= country;
}

/**
 * Gets the name of the customer
 * @returns the address section
 */
export function getCustomerAddressCountry()
{
  return AddressCountry;
}