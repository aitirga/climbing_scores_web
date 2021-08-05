const addNewClimber = document.querySelector('#add_climber-btn')
const climberTable = document.querySelector('#climber_data-table')

loadEventListeners()
loadFromLocalStorage()

function loadEventListeners() {
    addNewClimber.addEventListener('click', createNewClimber)
    climberTable.addEventListener('click', removeTask)
    // document.addEventListener('click', saveToLocalStorage)
    document.addEventListener('keyup', saveToLocalStorage)
}

function createNewClimber() {
    const firstRow = $('#climber_data-table tr').eq(1)
    const lastID = parseInt(firstRow.attr('id'))

    var row = climberTable.insertRow(1)
    row.id = lastID + 1
    row.innerHTML='      <td><input class="input climberName" type="text" placeholder="Name"></td>\n' +
        '      <td><input class="input speedTime" type="text" placeholder="Ranking"></td>\n' +
        '      <td><input class="input boulder1" type="text" placeholder="Boulder 1"</td>\n' +
        '      <td><input class="input boulder2" type="text" placeholder="Boulder 2"></td>\n' +
        '      <td><input class="input boulder3" type="text" placeholder="Boulder 3"></td>\n' +
        '      <td><input class="input boulder4" type="text" placeholder="Boulder 4"></td>\n' +
        '      <td><input class="input height" type="text" placeholder="Steps"></td>\n' +
        '      <td><div><button class="delete"></button></div></td>'
    // console.log(JSON.stringify(climberTable))
    saveToLocalStorage()
}

function removeTask(e) {
    // Check I am clicking the fa fa-remove class
    if (e.target.classList.contains('delete')) {
        saveToLocalStorage()
        e.target.parentElement.parentElement.parentElement.remove()
        saveToLocalStorage()
        }
    }

function saveToLocalStorage() {
    const climberTable = document.querySelector('#climber_data-table')
    let row_dict;
    var table = []
    for (var i = 1, row; row = climberTable.rows[i]; i++) {
        const row_id = row.id
        const climberName = row.getElementsByClassName('climberName').item(0).value
        const speedTime = row.getElementsByClassName('speedTime').item(0).value
        const boulder1 = row.getElementsByClassName('boulder1').item(0).value
        const boulder2 = row.getElementsByClassName('boulder2').item(0).value
        const boulder3 = row.getElementsByClassName('boulder3').item(0).value
        const boulder4 = row.getElementsByClassName('boulder4').item(0).value
        const height = row.getElementsByClassName('height').item(0).value

        row_dict = {
            'idx': row_id,
            'climberName': climberName,
            'speedTime': speedTime,
            'boulder1': boulder1,
            'boulder2': boulder2,
            'boulder3': boulder3,
            'boulder4': boulder4,
            'height':height,
        }
        table.push(row_dict)
    }
    localStorage.setItem('climberTable', JSON.stringify(table))
    updateRankingTable(table)
}

function loadFromLocalStorage() {
    let climberTable
    if (localStorage.getItem('climberTable') === null) {
        climberTable = []
    } else {
        climberTable = JSON.parse(localStorage.getItem('climberTable'))
    }
    createClimberTable(climberTable)
    return climberTable
}

function createClimberTable(table) {
    const climberTable = document.querySelector('#climber_data-table')
    if (table.length === 0) {
            var row = climberTable.insertRow(1)
            // console.log(index)
            row.id = '0'
            row.innerHTML=`      <td><input class="input climberName" type="text" placeholder="Name"></td>\n
              <td><input class="input speedTime" type="text" placeholder="Ranking"></td>\n
              <td><input class="input boulder1" type="text" placeholder="Boulder 1"</td>\n
              <td><input class="input boulder2" type="text" placeholder="Boulder 2"></td>\n
              <td><input class="input boulder3" type="text" placeholder="Boulder 3"></td>\n
              <td><input class="input boulder4" type="text" placeholder="Boulder 4"></td>\n
              <td><input class="input height" type="text" placeholder="Steps"></td>\n
              <td><div><button class="delete"></button></div></td>`
    } else {
    table.forEach(function (climber) {
            var row = climberTable.insertRow()
            // console.log(index)
            row.id = climber.idx
            row.innerHTML=`<td><input class="input climberName" type="text" placeholder="Name"></td>\n
              <td><input class="input speedTime" type="text" placeholder="Ranking"></td>\n
              <td><input class="input boulder1" type="text" placeholder="Boulder 1"</td>\n
              <td><input class="input boulder2" type="text" placeholder="Boulder 2"></td>\n
              <td><input class="input boulder3" type="text" placeholder="Boulder 3"></td>\n
              <td><input class="input boulder4" type="text" placeholder="Boulder 4"></td>\n
              <td><input class="input height" type="text" placeholder="Steps"></td>\n
              <td><div><button class="delete"></button></div></td>`
            let climberName = row.getElementsByClassName('climberName').item(0)
            let speedTime = row.getElementsByClassName('speedTime').item(0)
            let boulder1 = row.getElementsByClassName('boulder1').item(0)
            let boulder2 = row.getElementsByClassName('boulder2').item(0)
            let boulder3 = row.getElementsByClassName('boulder3').item(0)
            let boulder4 = row.getElementsByClassName('boulder4').item(0)
            let height = row.getElementsByClassName('height').item(0)
            if (climber.climberName !== '') {
                climberName.value = climber.climberName
            }
            if (climber.speedTime !== '') {
                speedTime.value = climber.speedTime
            }
            if (climber.boulder1 !== '') {
                boulder1.value = climber.boulder1
            }
            if (climber.boulder2 !== '') {
                boulder2.value = climber.boulder2
            }
            if (climber.boulder3 !== '') {
            boulder3.value = climber.boulder3
            }
            if (climber.boulder4 !== '') {
            boulder4.value = climber.boulder4
            }
            if (climber.height !== '') {
            height.value = climber.height
            }
})}
}


function updateRankingTable(table) {
    var tbody = document.getElementById('climber_ranking-body')
    var new_tbody = document.createElement('tbody')
    new_tbody.id = 'climber_ranking-body'
    tbody.parentNode.replaceChild(new_tbody, tbody)
    var finalRank = {}
    var boulderRank = []
    var leadRank = []
    var speedRank = []

    for (var i=0, climber; climber=table[i]; i++) {

        // Create final dict
        finalRank[climber.idx] = {'speedRank': 1.0, 'boulderRank': 1.0, 'leadRank': 1.0, 'climberName': climber.climberName}

        // Compute Speed block ranking
        var speedBlockScore = climber.speedTime
        if (speedBlockScore === null || speedBlockScore === undefined || speedBlockScore === '')  {
            speedBlockScore = 1.0
        }
        finalRank[climber.idx]['speedRank'] = parseFloat(speedBlockScore)
        // Compute Boulder ranking

        if (climber.boulder1 === '') {
            climber.boulder1 = 0.0
        }
        if (climber.boulder2 === '') {
            climber.boulder2 = 0.0
        }
        if (climber.boulder3 === '') {
            climber.boulder3 = 0.0
        }
        if (climber.boulder4 === '') {
            climber.boulder4 = 0.0
        }

        var boulderScore = parseFloat(climber.boulder1) + parseFloat(climber.boulder2) + parseFloat(climber.boulder3) + parseFloat(climber.boulder4)
        var boulderDict = {}
        boulderDict['idx'] = climber.idx
        boulderDict['score'] = boulderScore
        boulderRank.push(boulderDict)
        // Compute Lead ranking
        var leadDict = {}
        if (climber.height === '') {
            climber.height = 0.0
        }
        leadDict['height'] = climber.height
        leadDict['idx'] = climber.idx
        leadRank.push(leadDict)


    }
    // Sort Speed and find ranking
    const sortedSpeedDict = speedRank.sort(function (a, b) {
        return a.rank - b.rank
    })
    sortedSpeedDict.reverse().forEach(function (value, idx) {
        finalRank[value.idx]['speedRank'] = idx + 1
    })

    // Sort Boulder and find ranking
    const boulderLeadDict = boulderRank.sort(function (a, b) {
        return a.score - b.score
    })
    boulderLeadDict.reverse().forEach(function (value, idx) {
        finalRank[value.idx]['boulderRank'] = idx + 1
    })
    // Sort Lead and find ranking
    const sortedLeadDict = leadRank.sort(function (a, b) {
        return a.height - b.height
    })
    sortedLeadDict.reverse().forEach(function (value, idx) {
        finalRank[value.idx]['leadRank'] = idx + 1
    })

    // console.log(finalRank)
    // finalRank.forEach(function (value) {
    //     console.log(value)
    // })
    Object.keys(finalRank).forEach(function(key) {
        finalRank[key]['finalScore'] = finalRank[key]['speedRank']
            * finalRank[key]['boulderRank']
            * finalRank[key]['leadRank']
    })

    // Create ranking table
    var data = Object.entries(finalRank)
    var finalRankList = []
    // console.log(Object.values(data))
    data.forEach(function (value, index, array) {
        var tempDict = value[1]
        tempDict['idx'] = value[0]
        finalRankList.push(tempDict)
    })
    var finalRankListSort = finalRankList.sort(function (a, b) {
        return a.finalScore - b.finalScore
    })

    finalRankListSort.forEach(function (climber, idx) {
        var tempRow = document.createElement('tr')
        var climberNameTD = document.createElement('td')
        var speedBlockRanking = document.createElement('td')
        var boulderBlockRanking = document.createElement('td')
        var leadBlockRanking = document.createElement('td')
        var finalScore = document.createElement('td')
        var finalRank = document.createElement('td')


        climberNameTD.appendChild(document.createTextNode(climber.climberName))
        speedBlockRanking.appendChild(document.createTextNode(climber.speedRank))
        boulderBlockRanking.appendChild(document.createTextNode(climber.boulderRank))
        leadBlockRanking.appendChild(document.createTextNode(climber.leadRank))
        finalScore.appendChild(document.createTextNode(climber.finalScore))
        finalRank.appendChild(document.createTextNode(idx + 1))

        tempRow.appendChild(climberNameTD)
        tempRow.appendChild(speedBlockRanking)
        tempRow.appendChild(boulderBlockRanking)
        tempRow.appendChild(leadBlockRanking)
        tempRow.appendChild(finalScore)
        tempRow.appendChild(finalRank)

        new_tbody.appendChild(tempRow)
    })



}