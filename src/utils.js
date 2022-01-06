export const trasformCasesData = (data) => {
    let filterData = {}
    if(data.length > 0) {
        const result = data.map((item, i, arr) => {
            let temp = {}
            temp["key"] = i.toString()
            temp["state_name"] = item.state_name
            temp["new_active"] = item.new_active
            temp["new_positive"] = item.new_positive
            temp["new_cured"] = item.new_cured
            temp["new_death"] = item.new_death
            return temp
        })
        console.log(result)
        
        const filteredResult = result.filter(item => {
            if(item.state_name === "") {
                 filterData["country"] = item
                 return false
             }
             return true

        })
        filterData["state"] = filteredResult
        return filterData
    } 
}

export const getStateFilter = (stateData) => {

  let result = []
  stateData.forEach(item => {
    let temp = {}
    temp["text"] = item.state_name
    temp["value"] = item.state_name
    result.push(temp)
  })

  return result

}