let CustomerName:string;
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