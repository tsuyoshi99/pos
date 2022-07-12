const Profile = require('../../src/api/profile/model')

const createProfile = async (profileData) => {
  const profile = await Profile.create(profileData)
  return profile
}

module.exports = { createProfile }
