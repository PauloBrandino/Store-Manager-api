const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  },
  {
    "productId": 3,
    "quantity": 2
  }
];

const newSaleInvalid = [
  {
    "productId": 99,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  },
]

module.exports = {
  newSale,
  newSaleInvalid
}