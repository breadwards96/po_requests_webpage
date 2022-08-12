function fetchFile(file, callback) {
    fetch(file)
        .then(x => x.text())
        .then(y => callback(y))
}

function fieldSetup(){
    fetchFile("./csvs/Vendors.csv", popVendors)
    fetchFile("./csvs/Location List.csv", popLocations)
    fetchFile("./csvs/CostCenters.csv", popCostCenters)
    fetchFile("./csvs/Departments.csv", popDepartments)
    popShipMeths()
}

function popGLA(GLList){
    let newList = []
    let tempList = GLList.trim().split("\n")
    let currVend = $("#vendor").val().trim()
    for(let line in tempList){
        newList.push(tempList[line].split(","))
    }

    $(".GLAccount").empty()
    let tempSel = document.getElementsByClassName("GLAccount")
    for(let y in tempSel){
        let tempEl = document.createElement("option")
        tempEl.textContent = "NONE"
        tempEl.value = "NONE"
        try {
            tempSel[parseInt(y)].append(tempEl)
        }catch (TypeError){
            break
        }
    }
    for (let GL in newList) {
        if(newList[GL][0] === currVend){
            console.log("match found")
            let sel = document.getElementsByClassName("GLAccount")
            for(let x in sel) {
                let el = document.createElement("option")
                el.textContent = newList[GL][2]
                el.value = newList[GL][2]
                try {
                    sel[parseInt(x)].append(el)
                }catch (TypeError){
                    break
                }
            }
        }
    }
}

function popVendors(vendorList){
    let propVendList = vendorList.trim().split(";")
    for (let vendor in propVendList) {
        const sel = document.getElementById("vendor")
        const el = document.createElement("option")
        el.textContent = propVendList[vendor]
        el.value = propVendList[vendor]
        sel.appendChild(el)
    }
}

function popLocations(locList) {
    let propLocList = locList.trim().split("\n")
    for (let loc in propLocList) {
        let sel = document.getElementById("location")
        let el = document.createElement("option")
        el.textContent = propLocList[loc]
        el.value = propLocList[loc]
        sel.appendChild(el)
    }
}

function popShipMeths(){
    const methods = ["CUSTOMER PICKUP", "HICKMANS CALIFORNIA", "SAFEWAY CROSSDOCK",
        "HICKMANS COLORADO", "DELIVERED DIRECT", "HICKMAN TRANSPORTATION",
        "HICKMANS LOGISTICS", "OUTSIDE CARRIER"]
    for(let method in methods){
        const sel = document.getElementById("ShipMethod")
        const el = document.createElement("option")
        el.textContent = methods[method]
        el.value = methods[method]
        sel.appendChild(el)
    }
}

function popCostCenters(CCList) {
    let propCCList = CCList.trim().split("\n")
    for( let CC in propCCList){
        const sel = document.getElementById("CostCenter")
        const el = document.createElement("option")
        el.textContent = propCCList[CC]
        el.value = propCCList[CC]
        sel.appendChild(el)
    }
}

function popDepartments(deptList){
    let tempDeptList = deptList.split("\n")
    let finDeptList = []
    for(let dept in tempDeptList) {
        finDeptList.push(tempDeptList[dept].trim().split(","))
    }
    for(let dept in finDeptList) {
        const sel = document.getElementById("Dept")
        const el = document.createElement("option")
        el.textContent = finDeptList[dept][1]
        el.value = finDeptList[dept][1]
        sel.append(el)
    }
}

function cloneItemTbl(){
    let elem = document.getElementById("tableForm")
    let clone = elem.cloneNode(true)
    let container = document.getElementById("itemForms")
    container.appendChild(clone)
}

function delItemTbl(){
    let elem = document.getElementsByClassName("itemForm")
    let len = elem.length
    let cont = document.getElementById("itemForms")
    cont.removeChild(elem[len-1])
}

function validate(){

}