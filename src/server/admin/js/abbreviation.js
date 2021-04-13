/**
 * Abbreviate brand name.
 *
 * @since 2.3.0
 *
 * @param  {string} brand Brand name.
 * @return {string}       Abbreviated brand name.
 */
export function abbreviateBrandName (brand) {
  return brand
    ? brand
      .replace('Better Homes and Gardens Real Estate', 'BHGRE')
      .replace('Century 21 Real Estate', 'C21')
      .replace('Coldwell Banker - Company Owned (previously NRT)', 'CB/Own')
      .replace('Coldwell Banker - Affiliates', 'CB/Aff')
      .replace('Corcoran', 'COR')
      .replace('ERA Real Estate', 'ERA')
      .replace('Realogy Corporate', 'RLG')
      .replace('Realogy Title Group', 'RTG')
      .replace('Sotheby\'s International Realty', 'SIR')
    : ''
}

/**
 * Abbreviate state.
 *
 * @since 2.3.0
 *
 * @param  {string} state State.
 * @return {string}       Abbreviated State.
 */
export function abbreviateState (state) {
  return state
    ? state
      .toUpperCase()
      // State.
      .replace('ALABAMA', 'AL')
      .replace('ALASKA', 'AK')
      .replace('ARIZONA', 'AZ')
      .replace('ARKANSAS', 'AR')
      .replace('CALIFORNIA', 'CA')
      .replace('COLORADO', 'CO')
      .replace('CONNECTICUT', 'CT')
      .replace('DISTRICT OF COLUMBIA', 'DC')
      .replace('DELAWARE', 'DE')
      .replace('FLORIDA', 'FL')
      .replace('GEORGIA', 'GA')
      .replace('HAWAII', 'HI')
      .replace('IDAHO', 'ID')
      .replace('ILLINOIS', 'IL')
      .replace('INDIANA', 'IN')
      .replace('IOWA', 'IA')
      .replace('KANSAS', 'KS')
      .replace('KENTUCKY', 'KY')
      .replace('LOUISIANA', 'LA')
      .replace('MAINE', 'ME')
      .replace('MARYLAND', 'MD')
      .replace('MASSACHUSETTS', 'MA')
      .replace('MICHIGAN', 'MI')
      .replace('MINNESOTA', 'MN')
      .replace('MISSISSIPPI', 'MS')
      .replace('MISSOURI', 'MO')
      .replace('MONTANA', 'MT')
      .replace('NEBRASKA', 'NE')
      .replace('NEVADA', 'NV')
      .replace('NEW HAMPSHIRE', 'NH')
      .replace('NEW JERSEY', 'NJ')
      .replace('NEW MEXICO', 'NM')
      .replace('NEW YORK', 'NY')
      .replace('NORTH CAROLINA', 'NC')
      .replace('NORTH DAKOTA', 'ND')
      .replace('OHIO', 'OH')
      .replace('OKLAHOMA', 'OK')
      .replace('OREGON', 'OR')
      .replace('PENNSYLVANIA', 'PA')
      .replace('RHODE ISLAND', 'RI')
      .replace('SOUTH CAROLINA', 'SC')
      .replace('SOUTH DAKOTA', 'SD')
      .replace('TENNESSEE', 'TN')
      .replace('TEXAS', 'TX')
      .replace('UTAH', 'UT')
      .replace('VERMONT', 'VT')
      .replace('VIRGINIA', 'VA')
      .replace('WASHINGTON', 'WA')
      .replace('WEST VIRGINIA', 'WV')
      .replace('WISCONSIN', 'WI')
      .replace('WYOMING', 'WY')
      // Country.
      .replace('CANADA', 'CAN')
      .replace('NWT CAN', 'CAN')
      .replace('HAUTS DE SEINE _ FRANCE', 'FRA')
      // Wrong spelling.
      .replace('WA DC', 'DC')
      .replace('NEW JERSEU', 'NJ')
      .replace('NY631', 'NY')
      .replace('ARIOZNA', 'AZ')
      .replace('NEE YORK', 'NY')
      .replace('NEW YOFK', 'NY')
      .replace('NEWYORK', 'NY')
      .replace('NRE HAMPSHIRE', 'NH')
      .replace('CONNNECTICUT', 'CT')
      .replace('WEST VA', 'WV')
      // Not a state.
      .replace('STATE', '')
      .replace('UNITED S', '')
      .replace('UNITED STATES', '')
      .replace('64D2C4AA-68BB-4325-8359-A7B1D2EDC40E', '')
      .replace('CENTURY 21 AFFILIATED', '')
      .replace('11233', '')
      .replace('SELECT AN OPTIONÂ€¦', '')
      .replace('- SELECT PROVINCE/ -', '')
      .replace('NUMBER:31', '')
      .replace('OTHER', '')
      .replace('FALSE', '')
      .replace('SELECT', '')
      .replace('COLDWELL BANKER', '')
      // Wrong format.
      .replace(/(.*) (.*)/, '$1')
      .replace(/(.*) [-+&] (.*)/, '$1')
      .replace(/(.*)[-+&](.*)/, '$1')
      .replace(/(.*) AND (.*)/, '$1')
      .replace(/(.*),(.*)/, '$1')
      .replace(/(.*), (.*)/, '$1')
      .replace(/(.*)\(.*\)/, '$1')
      .replace(/(.*) \(.*\)/, '$1')
      .replace(/(.*) \/ (.*)/, '$1/$2')
    : ''
}
