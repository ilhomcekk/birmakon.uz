export const conditionalRowStyles = [
  {
    when: (row) => row.status === "completed",
    style: {
      backgroundColor: "green",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.status === "unsuccessful",
    style: {
      backgroundColor: "red",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

export const columns = [
  {
    name: "Vaqt",
    selector: "createdAt",
    sortable: true,
  },
  {
    name: "Karta raqam",
    selector: "cart_number",
    sortable: true,
  },
  {
    name: "Narx",
    selector: "quantity",
    sortable: true,
  },
  {
    name: "Tafsif",
    selector: "description",
    sortable: true,
  },
  {
    name: "Holat",
    selector: "status",
    sortable: true,
  },
];

export const order_columns = [
  {
    name: "Oqim",
    selector: "product",
    sortable: true,
  },
  {
    name: "Xaridor ismi",
    selector: "customer_name",
    sortable: true,
  },
  {
    name: "Xaridor raqami",
    selector: "customer_phone",
    sortable: true,
  },
  {
    name: "Viloyati",
    selector: "region",
    sortable: true,
  },
  {
    name: "Holat",
    selector: "status",
    sortable: true,
  },
];
