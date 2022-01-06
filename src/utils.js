export const columnsMeta = [{
    title: 'State Name',
    dataIndex: 'state_name',
    key: 'state_name',
  },
  {
    title: 'Active',
    dataIndex: 'new_active',
    key: 'new_active',
  },
  {
    title: 'Positive',
    dataIndex: 'new_positive',
    key: 'new_positive',
  },
  {
    title: 'Cured',
    dataIndex: 'new_cured',
    key: 'new_cured',
  },
  {
    title: 'Death(s)',
    dataIndex: 'new_death',
    key: 'new_death',
  }
];

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
             if( item.state_name !== "" ) {
                 return true
             } else if(item.state_name === "") {
                 filterData["country"] = item
                 return false
             }

        })
        filterData["state"] = filteredResult
        return filterData
    } 
}