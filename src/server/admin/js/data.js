/**
 * Get brands data.
 *
 * @since unreleased
 *
 * @param  {array} pledges Array of pledge objects.
 * @return {Object}        Brands data object.
 */
export function getBrandsData (pledges) {
  /**
   * Filter pledges data by brand.
   *
   * @since 1.5.0
   *
   * @param  {string}  string  String to filter pledge brand name by.
   * @return {array}           Filtered array of pledge objects.
   */
  function getPledgesBrand(string) {
    return pledges.filter(pledge => pledge.brand.includes(string))
  }

  // Build brands pledges data.
  const brands = {
    bhgre: { pledges: getPledgesBrand('Better Homes') },
    c21: { pledges: getPledgesBrand('Century') },
    cb: { pledges: getPledgesBrand('Coldwell Banker') },
    corcoran: { pledges: getPledgesBrand('Corcoran') },
    era: { pledges: getPledgesBrand('ERA') },
    other: { pledges: getPledgesBrand('Other') },
    realogy: { pledges: getPledgesBrand('Realogy Corporate') },
    rtg: { pledges: getPledgesBrand('Realogy Title Group') },
    sir: { pledges: getPledgesBrand('Sotheby\'s') },
    total: { pledges: pledges }
  }

  Object.keys(brands).forEach(brand => {
    // Add brand name.
    brands[brand].name = brands[brand].pledges[0].brand

    // Add pledges count.
    brands[brand].pledgesCount = brands[brand].pledges.length

    // Add courseCompleted count.
    brands[brand].courseCompletedCount =
      brands[brand].pledges.filter(pledge => 'true' === pledge.courseCompleted)
        .length
  })

  // Update brand names.
  brands.bhgre.name = 'BHGRE'
  brands.c21.name = 'Century 21'
  brands.cb.name = 'Coldwell Banker'
  brands.era.name = 'ERA'
  brands.sir.name = 'Sotheby\'s'
  brands.total.name = 'Total'

  return brands
}
