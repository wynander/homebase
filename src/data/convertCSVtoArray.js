export const convertCSVtoArray = (data) => {
  const dataArray = []
  const rows = data.split('\n')
  rows.forEach((row) => {
    const columns = row.split(',')
    dataArray.push(columns)
  })
  return dataArray
}
