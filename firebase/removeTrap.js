const {database} = require('./firebase')
const md5 = require('md5')

const removeTrap = async ({id, trapID}) => {
  let ref = database.ref(`accounts/${id}/traps`)
  console.log(id)
  const snapshot = await ref.once('value')
  const traps = snapshot.val()
  console.log(traps)
  if (traps) {
    const trapKey = Object.keys(traps).find(key => traps[key].trapID === trapID)
    console.log(trapKey)
    if (trapKey) {
      await ref.child(trapKey).remove()
      let ownerRef = database.ref(`/traps/${trapID}`)
      const snapShot = await ownerRef.once('value')
      const trap = snapShot.val()

      if (trap && trap.owner === id) {
        await ownerRef.remove()
        return true
      }
    }
  }

  return false
}

module.exports = removeTrap
