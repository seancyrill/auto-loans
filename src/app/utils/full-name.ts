type GetFullNameParams = {
  firstName: string
  middleName?: string
  lastName: string
  nameSuffix?: string
}

export const getFullName = ({ firstName, lastName, middleName, nameSuffix }: GetFullNameParams) =>
  `${firstName}${
    middleName
      ? ` ${middleName
          .split(" ")
          .map((mn) => `${mn[0]}.`)
          .join("")}`
      : ""
  } ${lastName}
      ${nameSuffix ? ` ${nameSuffix.toUpperCase()}` : ""}`
