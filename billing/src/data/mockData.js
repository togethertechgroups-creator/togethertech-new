export const DEFAULT_CUSTOMERS = [
  {
    id: "CUST-001",
    name: "ARUNRAJ .S",
    tier: "Standard Partner",
    gstin: "33AAACKH3W1Z1",
    email: "arunraj@kh3wellness.com",
    phone: "+91 98765 43210",
    status: "ACTIVE",
    spend: 8999,
    address: "KH3 WELLNESS\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-002",
    name: "MICRO LASER ART",
    tier: "Standard Partner",
    gstin: "33AAACMLA1Z2",
    email: "info@microlaserart.com",
    phone: "+91 98765 43211",
    status: "ACTIVE",
    spend: 4200,
    address: "MICRO LASER ART\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-003",
    name: "GOWTHAM",
    tier: "Standard Partner",
    gstin: "33AAACOLY1Z3",
    email: "gowtham@olympiagym.com",
    phone: "+91 98765 43212",
    status: "ACTIVE",
    spend: 5000,
    address: "Olympia gym\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-004",
    name: "ANJUGAM",
    tier: "Standard Partner",
    gstin: "33AAACANJ1Z4",
    email: "anjugam@anjugamhotel.com",
    phone: "+91 98765 43213",
    status: "ACTIVE",
    spend: 2500,
    address: "ANJUGAM HOTEL\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-005",
    name: "VICKY",
    tier: "Standard Partner",
    gstin: "33AAACBUN1Z5",
    email: "vicky@beastfitness.com",
    phone: "+91 98765 43214",
    status: "ACTIVE",
    spend: 10000,
    address: "BEAST UNISEX FITNESS\nChennai, Tamil Nadu"
  }
];

export const DEFAULT_DOCUMENTS = [
  {
    id: "INV-099644",
    client: "ARUNRAJ .S",
    type: "Invoice",
    date: "2026-05-14",
    dueDate: "2026-05-24",
    status: "PAID",
    amount: 8999.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "KH3 WELLNESS\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Wellness Services / Gym Membership', qty: 1, price: 8999.00 }
    ]
  },
  {
    id: "INV-559714",
    client: "MICRO LASER ART",
    type: "Invoice",
    date: "2026-04-18",
    dueDate: "2026-04-28",
    status: "PAID",
    amount: 4200.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "MICRO LASER ART\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Laser Art / Laser Cut Work', qty: 1, price: 4200.00 }
    ]
  },
  {
    id: "INV-587307",
    client: "GOWTHAM",
    type: "Invoice",
    date: "2026-04-02",
    dueDate: "2026-04-12",
    status: "PAID",
    amount: 5000.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "Olympia gym\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Fitness Training & Gym Services', qty: 1, price: 5000.00 }
    ]
  },
  {
    id: "INV-581573",
    client: "ANJUGAM",
    type: "Invoice",
    date: "2026-04-02",
    dueDate: "2026-04-12",
    status: "PAID",
    amount: 2500.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "ANJUGAM HOTEL\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Catering / Hotel Services', qty: 1, price: 2500.00 }
    ]
  },
  {
    id: "INV-156309",
    client: "VICKY",
    type: "Invoice",
    date: "2026-04-02",
    dueDate: "2026-04-12",
    status: "PAID",
    amount: 10000.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "BEAST UNISEX FITNESS\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Personal Training / Gym Services', qty: 1, price: 10000.00 }
    ]
  }
];
