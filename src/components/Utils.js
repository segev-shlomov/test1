const users = [['First name',
    'Username',
    'Contact Number',
    'Manager',
    'Email',
    'Job Description',
    'Level',
    'Reason'],
['Samantha',
    'Samantha_Sunflower',
    '(555) 555-0123',
    'John Smith',
    'SamanthaSmith@test.com',
    'Software Engineer',
    "5",
    'Poor performance'],
['Benjamin',
    'Benjamin_Bear',
    '(555) 555-4567',
    'Jessica Williams',
    'BenjaminWilliams@test.com',
    'Data Scientist',
    "6",
    null],
['Emily',
    'Emily_Butterfly',
    '(555) 555-8901',
    'David Brown',
    'EmilyBrown@test.com',
    'Technical Project Manager',
    "7",
    'Misconduct'],
['Michael',
    'Michael_Mountain',
    '(555) 555-8102',
    'Sarah Johnson',
    'MichaelJohnson@test.com',
    'DevOps Engineer',
    "8",
    null],
['Olivia',
    'Olivia_Ocean',
    '(555) 555-8903',
    'Michael Davis',
    'OliviaDavis@test.com',
    'Security Engineer',
    "9",
    'Detrimental behavior'],
['Ethan',
    'Ethan_Eagle',
    '(555) 555-9904',
    'Rachel Anderson',
    'EthanAnderson@test.com',
    'Technical Writer',
    "10",
    null],
['Sophia',
    'Sophia_Sunshine',
    '(555) 555-0905',
    'Robert Garcia',
    'SophiaGarcia@test.com',
    'Quality Assurance Engineer',
    "11",
    'Position no longer necessary'],
['David',
    'David_Dragon',
    '(555) 555-8106',
    'Lisa Martin',
    'DavidMartin@test.com',
    'Front-End Developer',
    "12",
    null],
['Abigail',
    'Abigail_Apple',
    '(555) 555-8007',
    'Thomas Rodriguez',
    'AbigailRodriguez@test.com',
    'Network Engineer',
    "13",
    null],
['Alexander',
    'Alexander_Asteroid',
    '(555) 555-8208',
    'Jennifer Thompson',
    'AlexanderThompson@test.com',
    'Cloud Architect',
    "14",
    'Violation of company policies']]


function userExists(username) {
    let i = 1
    for (let user of users) {
        if (user[1] == username && i % 2 == 0) {
            return true
        }
        i++;
    }
    return false
}

function verifyFormType(score, result, type){
    let heads = ['First name',
        'Username',
        'Contact Number',
        'Manager',
        'Email',
        'Job Description',
        'Level']
    let usersCopy = JSON.parse(JSON.stringify(users))
    for (let user of usersCopy) {
        user.pop()
    }
    usersCopy = usersCopy.map(u => u.join("#"))
    for (let res of result) {
        let mapRes = {}
        res.map(i => mapRes[(i.name).toString()] = i.value)
        let expected = heads.map(h => mapRes[h])
        if(type=='add'){
            let found = usersCopy.indexOf(expected.join("#")) != -1 && userExists(mapRes['Username'])
            if(!found){
                score -= 10
            }
        }
        if(type=='remove'){
            let found = usersCopy.indexOf(expected.join("#")) != -1 && !userExists(mapRes['Username'])
            if(!found){
                score -= 10
            }
        }
    }
    return score
}
function calcScoreAdvanced(result_add, result_remove) {
    let score = 100
    console.log('res add', result_add)
    console.log('res remove', result_remove)
    score = verifyFormType(score, result_add, 'add')
    score = verifyFormType(score, result_remove, 'remove')
    return score
}

function calcScore(result) {
    let score = 100
    let heads = ['First name',
        'Username',
        'Contact Number',
        'Manager',
        'Email',
        'Job Description',
        'Level']
    let usersCopy = JSON.parse(JSON.stringify(users))
    for (let user of usersCopy) {
        user.pop()
    }
    usersCopy = usersCopy.map(u => u.join("#"))
    for (let res of result) {
        let mapRes = {}
        res.map(i => mapRes[(i.name).toString()] = i.value)
        let expected = heads.map(h => mapRes[h])
        let found = usersCopy.indexOf(expected.join("#"))
        if (found == -1) {
            score -= 10
        }
    }
    return score
}
module.exports = {
    users: users,
    userExists: userExists,
    calcScoreAdvanced: calcScoreAdvanced,
    calcScore: calcScore
}